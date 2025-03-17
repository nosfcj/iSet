/**
 * WebSocket Server Implementation
 * @lastModified 2025-03-15 21:27:15
 * @modifiedBy nosfcj
 */
import { Server, Namespace } from 'socket.io';
import { Server as HttpServer } from 'http';
import { WebSocketEvents } from './interfaces/WebSocketEvents';
import { authMiddleware, checkPermission, AuthenticatedSocket } from './middleware/auth.middleware';
import { AppDataSource } from '../data-source';
import { Acao } from '../models/Acao';
import { Atendimento } from '../models/Atendimento';
import { Monitor } from '../models/Monitor';
import { Dispositivo } from '../models/Dispositivo';
import { Guiche } from '../models/Guiche';
import { Not, In } from 'typeorm';
import { Usuario } from '../models/Usuario'; // Adicionar esta importação

export class WebSocketServer {
  private io: Server;

  constructor(httpServer: HttpServer) {
    this.io = new Server(httpServer, {
      cors: {
        origin: process.env.CORS_ORIGIN,
        methods: ['GET', 'POST'],
        credentials: true
      }
    });

    this.initialize();
  }

  private initialize(): void {
    this.io.use(authMiddleware);
    this.setupNamespaces();

    this.io.on('connection', (socket: AuthenticatedSocket) => {
      console.log(`Cliente conectado: ${socket.id} - Usuário: ${socket.user?.login}`);

      socket.on('disconnect', () => {
        console.log(`Cliente desconectado: ${socket.id} - Usuário: ${socket.user?.login}`);
      });

      socket.on('error', (error: Error) => {
        console.error(`Erro no socket ${socket.id}:`, error);
      });
    });
  }

  private setupNamespaces(): void {
    const atendimentoNsp = this.io.of('/atendimento');
    atendimentoNsp.use(checkPermission(['ATENDENTE', 'ADMIN']));

    const monitorNsp = this.io.of('/monitor');
    monitorNsp.use(checkPermission(['ATENDENTE', 'ADMIN', 'MONITOR']));

    const dispositivoNsp = this.io.of('/dispositivo');
    dispositivoNsp.use(checkPermission(['ADMIN']));

    this.setupAtendimentoHandlers(atendimentoNsp);
    this.setupMonitorHandlers(monitorNsp);
    this.setupDispositivoHandlers(dispositivoNsp);
  }

  private setupAtendimentoHandlers(namespace: Namespace): void {
    namespace.on('connection', async (socket: AuthenticatedSocket) => {
      console.log(`Cliente conectado ao namespace atendimento: ${socket.id}`);

      socket.on('acao:chamar', async (data: { guicheId: number }) => {
        try {
          const acaoRepo = AppDataSource.getRepository(Acao);
          const guicheRepo = AppDataSource.getRepository(Guiche);
          const usuarioRepo = AppDataSource.getRepository(Usuario);

          const guiche = await guicheRepo.findOne({
            where: { id: data.guicheId }
          });

          if (!guiche) {
            return socket.emit('error', { message: 'Guichê não encontrado' });
          }

          // Buscar usuário completo do banco
          const usuario = socket.user?.id ? await usuarioRepo.findOne({
            where: { id: socket.user.id }
          }) : null;

          if (!usuario) {
            return socket.emit('error', { message: 'Usuário não encontrado' });
          }

          const proximaAcao = await acaoRepo.findOne({
            where: { status: 0 },
            order: { posicao: 'ASC' },
            relations: ['atendimento', 'servico']
          });

          if (!proximaAcao) {
            return socket.emit('error', { message: 'Não há ações pendentes' });
          }

          proximaAcao.guiche = guiche;
          proximaAcao.usuario = usuario; // Agora atribuímos a entidade Usuario completa
          proximaAcao.data = new Date();
          proximaAcao.horaInicio = new Date().toTimeString().split(' ')[0];
          proximaAcao.status = 1; // Em atendimento

          await acaoRepo.save(proximaAcao);

          const atendimentoRepo = AppDataSource.getRepository(Atendimento);
          const atendimento = proximaAcao.atendimento;
          if (atendimento.status === 0) {
            atendimento.status = 1; // Em atendimento
            await atendimentoRepo.save(atendimento);
          }

          namespace.emit('acao:iniciada', {
            acao: proximaAcao,
            atendimento: atendimento,
            timestamp: new Date(),
            origem: socket.id
          });

          this.io.of('/monitor').emit('painel:senha', {
            senha: atendimento.senha,
            guiche: guiche.id,
            servicoNome: proximaAcao.servico.titulo,
            timestamp: new Date(),
            origem: socket.id
          });

        } catch (error: unknown) {
          socket.emit('error', {
            message: 'Erro ao chamar próxima ação',
            error: error instanceof Error ? error.message : 'Erro desconhecido'
          });
        }
      });

      socket.on('acao:finalizar', async (data: { 
        id: number, 
        status: 2 | 3,
        proximaData?: Date,
        anotacao?: string 
      }) => {
        try {
          const acaoRepo = AppDataSource.getRepository(Acao);
          const acao = await acaoRepo.findOne({
            where: { id: data.id },
            relations: ['atendimento']
          });

          if (!acao) {
            throw new Error('Ação não encontrada');
          }

          acao.status = data.status;
          acao.horaFim = new Date().toTimeString().split(' ')[0];
          if (data.anotacao) acao.anotacao = data.anotacao;
          if (data.status === 3 && data.proximaData) acao.data = data.proximaData;

          await acaoRepo.save(acao);

          const acoesRestantes = await acaoRepo.count({
            where: { 
              atendimento: { id: acao.atendimento.id },
              status: Not(In([2, 3]))
            }
          });

          if (acoesRestantes === 0) {
            const atendimentoRepo = AppDataSource.getRepository(Atendimento);
            acao.atendimento.status = 2;
            acao.atendimento.dataFinal = new Date();
            await atendimentoRepo.save(acao.atendimento);
          }

          const eventName = data.status === 2 ? 'acao:finalizada' : 'acao:adiada';
          namespace.emit(eventName, {
            acao,
            atendimento: acao.atendimento,
            proximaData: data.proximaData,
            timestamp: new Date(),
            origem: socket.id
          });

        } catch (error: unknown) {
          socket.emit('error', {
            message: 'Erro ao finalizar ação',
            error: error instanceof Error ? error.message : 'Erro desconhecido'
          });
        }
      });
    });
  }

  private setupMonitorHandlers(namespace: Namespace): void {
    namespace.on('connection', async (socket: AuthenticatedSocket) => {
      console.log(`Cliente conectado ao namespace monitor: ${socket.id}`);

      socket.on('monitor:status', async (data: { dispositivoId: number, status: number }) => {
        try {
          const monitorRepo = AppDataSource.getRepository(Monitor);
          const monitor = await monitorRepo.findOne({
            where: { dispositivoId: data.dispositivoId }
          });

          if (!monitor) {
            throw new Error('Monitor não encontrado');
          }

          monitor.status = data.status;
          
          await monitorRepo.save(monitor);

          namespace.emit('monitor:status', {
            dispositivoId: monitor.dispositivoId,
            status: monitor.status
          });
        } catch (error: unknown) {
          socket.emit('error', {
            message: 'Erro ao atualizar status do monitor',
            error: error instanceof Error ? error.message : 'Erro desconhecido'
          });
        }
      });
    });
  }

  private setupDispositivoHandlers(namespace: Namespace): void {
    namespace.on('connection', async (socket: AuthenticatedSocket) => {
      console.log(`Cliente conectado ao namespace dispositivo: ${socket.id}`);

      socket.on('dispositivo:status', async (data: { id: number, status: number }) => {
        try {
          const dispositivoRepo = AppDataSource.getRepository(Dispositivo);
          const dispositivo = await dispositivoRepo.findOne({
            where: { id: data.id }
          });

          if (!dispositivo) {
            throw new Error('Dispositivo não encontrado');
          }

          dispositivo.status = data.status;

          await dispositivoRepo.save(dispositivo);

          namespace.emit('dispositivo:status', {
            dispositivo,
            status: data.status,
            timestamp: new Date(),
            origem: socket.id
          });
        } catch (error: unknown) {
          socket.emit('error', {
            message: 'Erro ao atualizar status do dispositivo',
            error: error instanceof Error ? error.message : 'Erro desconhecido'
          });
        }
      });
    });
  }

  public emitAtendimento(event: WebSocketEvents, payload: any): void {
    this.io.of('/atendimento').emit(event, payload);
  }

  public emitMonitor(event: WebSocketEvents, payload: any): void {
    this.io.of('/monitor').emit(event, payload);
  }

  public emitDispositivo(event: WebSocketEvents, payload: any): void {
    this.io.of('/dispositivo').emit(event, payload);
  }
}
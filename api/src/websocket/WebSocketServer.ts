/**
 * WebSocket Server Implementation
 * @file api/src/websocket/WebSocketServer.ts
 * @lastModified 2025-03-18 16:10:20
 * @modifiedBy nosfcj
 * @description Implementação do servidor WebSocket para gerenciamento de atendimentos em tempo real
 */
import { Server, Namespace } from 'socket.io';
import { Server as HttpServer } from 'http';
import { WebSocketEvents } from './interfaces/WebSocketEvents';
import { authMiddleware, checkPermission, AuthenticatedSocket } from './middleware/auth.middleware';
import { AppDataSource } from '../config/database.config';
import { Atendimento } from '../models/Atendimento';
import { Acao } from '../models/Acao';
import { Monitor } from '../models/Monitor';
import { Dispositivo } from '../models/Dispositivo';
import { Guiche } from '../models/Guiche';
import { Not, In } from 'typeorm';
import { Usuario } from '../models/Usuario';

/**
 * Enums para status das entidades
 * @lastModified 2025-03-18 16:10:20
 */
enum AtendimentoStatus {
  NAO_FINALIZADO = 0,
  EM_ATENDIMENTO = 1,
  FINALIZADO = 2,
  AGUARDANDO_RETORNO = 3
}

enum AtendimentoTipo {
  COMUM = 0,
  PRIORIDADE = 1,
  RETORNO = 2
}

enum AcaoStatus {
  AGUARDANDO = 0,
  EM_ATENDIMENTO = 1,
  FINALIZADO = 2,
  REAGENDADO = 3,
  AGUARDANDO_CONFIRMACAO = 4
}

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

      /**
       * Handler para mudança de status do atendimento
       * @event atendimento:status
       * @lastModified 2025-03-18 16:15:31
       * @modifiedBy nosfcj
       */
      socket.on('atendimento:status', async (data: { 
        id: number, 
        status: AtendimentoStatus,
        dataRetorno?: Date 
      }) => {
        try {
          const atendimentoRepo = AppDataSource.getRepository(Atendimento);
          const atendimento = await atendimentoRepo.findOne({
            where: { id: data.id },
            relations: ['acoes', 'cidadao', 'local']
          });

          if (!atendimento) {
            throw new Error('Atendimento não encontrado');
          }

          // Validações específicas para cada status
          switch (data.status) {
            case AtendimentoStatus.AGUARDANDO_RETORNO:
              if (!data.dataRetorno) {
                throw new Error('Data de retorno é obrigatória para atendimentos adiados');
              }
              // Atualiza todas as ações não finalizadas para aguardando
              for (const acao of atendimento.acoes) {
                if (acao.status !== AcaoStatus.FINALIZADO) {
                  acao.status = AcaoStatus.AGUARDANDO;
                  acao.data = data.dataRetorno;
                }
              }
              break;

            case AtendimentoStatus.FINALIZADO:
              const acoesNaoFinalizadas = atendimento.acoes.some(
                acao => acao.status !== AcaoStatus.FINALIZADO
              );
              if (acoesNaoFinalizadas) {
                throw new Error('Não é possível finalizar um atendimento com ações pendentes');
              }
              atendimento.dataFinal = new Date();
              break;

            case AtendimentoStatus.EM_ATENDIMENTO:
              if (!socket.user) {
                throw new Error('Usuário não autenticado');
              }
              // Atualiza o usuário responsável pelo atendimento
              const usuarioRepo = AppDataSource.getRepository(Usuario);
              const usuario = await usuarioRepo.findOne({
                where: { id: socket.user.id }
              });
              if (!usuario) {
                throw new Error('Usuário não encontrado');
              }
              atendimento.usuario = usuario;
              break;
          }

          atendimento.status = data.status;
          await atendimentoRepo.save(atendimento);

          // Emite evento com base no novo status
          const eventName = this.getAtendimentoEventName(data.status);
          namespace.emit(eventName, {
            atendimento,
            dataRetorno: data.dataRetorno,
            timestamp: new Date(),
            origem: socket.id,
            local: atendimento.local?.nome
          });

          // Se for aguardando retorno, notifica os monitores
          if (data.status === AtendimentoStatus.AGUARDANDO_RETORNO) {
            this.io.of('/monitor').emit('monitor:retorno', {
              senha: atendimento.senha,
              cidadaoNome: atendimento.cidadao.nome,
              dataRetorno: data.dataRetorno,
              local: atendimento.local?.nome,
              timestamp: new Date(),
              origem: socket.id
            });
          }

        } catch (error: unknown) {
          socket.emit('error', {
            message: 'Erro ao atualizar status do atendimento',
            error: error instanceof Error ? error.message : 'Erro desconhecido'
          });
        }
      });

      /**
       * Handler para verificar disponibilidade de retorno
       * @event atendimento:verificar_retorno
       * @lastModified 2025-03-18 16:15:31
       * @modifiedBy nosfcj
       */
      socket.on('atendimento:verificar_retorno', async (data: { 
        cidadaoId: number,
        localId?: number 
      }) => {
        try {
          const atendimentoRepo = AppDataSource.getRepository(Atendimento);
          const whereClause: any = {
            cidadao: { id: data.cidadaoId },
            status: AtendimentoStatus.AGUARDANDO_RETORNO
          };

          // Se localId for fornecido, inclui na busca
          if (data.localId) {
            whereClause.local = { id: data.localId };
          }

          const retornoPendente = await atendimentoRepo.findOne({
            where: whereClause,
            relations: ['acoes', 'cidadao', 'local']
          });

          if (retornoPendente) {
            socket.emit('atendimento:retorno_pendente', {
              atendimento: retornoPendente,
              timestamp: new Date()
            });
          }

        } catch (error: unknown) {
          socket.emit('error', {
            message: 'Erro ao verificar retorno',
            error: error instanceof Error ? error.message : 'Erro desconhecido'
          });
        }
      });

      // ... outros handlers existentes ...
    });
  }

  /**
   * Retorna o nome do evento com base no status do atendimento
   * @param status Status do atendimento
   * @returns Nome do evento a ser emitido
   * @lastModified 2025-03-18 16:15:31
   * @modifiedBy nosfcj
   */
  private getAtendimentoEventName(status: AtendimentoStatus): string {
    switch (status) {
      case AtendimentoStatus.NAO_FINALIZADO:
        return 'atendimento:pendente';
      case AtendimentoStatus.EM_ATENDIMENTO:
        return 'atendimento:iniciado';
      case AtendimentoStatus.FINALIZADO:
        return 'atendimento:finalizado';
      case AtendimentoStatus.AGUARDANDO_RETORNO:
        return 'atendimento:adiado';
      default:
        return 'atendimento:status_alterado';
    }
  }

  // ... outros métodos existentes (setupMonitorHandlers, setupDispositivoHandlers) ...
}

export default WebSocketServer;
import { Server, Namespace } from 'socket.io';
import { Server as HttpServer } from 'http';
import { WebSocketEvents } from './interfaces/WebSocketEvents';
import { authMiddleware, checkPermission, AuthenticatedSocket } from './middleware/auth.middleware';

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
    // Middleware global de autenticação
    this.io.use(authMiddleware);

    // Configuração de namespaces
    this.setupNamespaces();

    // Tratamento de conexões
    this.io.on('connection', (socket: AuthenticatedSocket) => {
      console.log(`Cliente conectado: ${socket.id} - Usuário: ${socket.user?.login}`);

      // Log de desconexão
      socket.on('disconnect', () => {
        console.log(`Cliente desconectado: ${socket.id} - Usuário: ${socket.user?.login}`);
      });

      // Log de erros
      socket.on('error', (error) => {
        console.error(`Erro no socket ${socket.id}:`, error);
      });
    });
  }

  private setupNamespaces(): void {
    // Namespace para atendimento - requer permissões específicas
    const atendimentoNsp = this.io.of('/atendimento');
    atendimentoNsp.use(checkPermission(['ATENDENTE', 'ADMIN']));

    // Namespace para monitores - permissões mais abertas
    const monitorNsp = this.io.of('/monitor');
    monitorNsp.use(checkPermission(['ATENDENTE', 'ADMIN', 'MONITOR']));

    // Namespace para dispositivos - apenas admin
    const dispositivoNsp = this.io.of('/dispositivo');
    dispositivoNsp.use(checkPermission(['ADMIN']));

    // Configurar handlers específicos para cada namespace
    this.setupAtendimentoHandlers(atendimentoNsp);
    this.setupMonitorHandlers(monitorNsp);
    this.setupDispositivoHandlers(dispositivoNsp);
  }

  // Métodos para configuração de handlers específicos com tipos corretos
  private setupAtendimentoHandlers(namespace: Namespace): void {
    // Implementação futura
  }

  private setupMonitorHandlers(namespace: Namespace): void {
    // Implementação futura
  }

  private setupDispositivoHandlers(namespace: Namespace): void {
    // Implementação futura
  }

  // Métodos públicos para emitir eventos
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
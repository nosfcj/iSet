import { AuthenticatedSocket } from '../middleware/auth.middleware';
import { 
  AtendimentoPayload, 
  GuichePayload, 
  MonitorPayload, 
  DispositivoPayload 
} from './WebSocketPayloads';

export interface AtendimentoHandlers {
  'atendimento:novo': (data: AtendimentoPayload) => void;
  'atendimento:atualizar': (data: AtendimentoPayload) => void;
  'atendimento:chamar': (data: { id: number, guiche: number }) => void;
  'atendimento:finalizar': (data: { id: number }) => void;
}

export interface MonitorHandlers {
  'monitor:atualizar': (data: MonitorPayload) => void;
  'monitor:status': (data: { id: number, status: string }) => void;
  'monitor:conteudo': (data: { id: number, conteudo: string }) => void;
}

export interface DispositivoHandlers {
  'dispositivo:status': (data: DispositivoPayload) => void;
  'dispositivo:comando': (data: { id: number, comando: string }) => void;
  'dispositivo:configurar': (data: { id: number, config: any }) => void;
}
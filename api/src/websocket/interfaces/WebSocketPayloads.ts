import { Atendimento } from '../../models/Atendimento';
import { Guiche } from '../../models/Guiche';
import { Monitor } from '../../models/Monitor';
import { Dispositivo } from '../../models/Dispositivo';

export interface BasePayload {
  timestamp: Date;
  origem: string;
}

export interface AtendimentoPayload extends BasePayload {
  atendimento: Atendimento;
  guiche?: Guiche;
}

export interface GuichePayload extends BasePayload {
  guiche: Guiche;
  status: 'DISPONIVEL' | 'OCUPADO' | 'AUSENTE';
}

export interface MonitorPayload extends BasePayload {
  monitor: Monitor;
  conteudo?: string;
}

export interface DispositivoPayload extends BasePayload {
  dispositivo: Dispositivo;
  status: 'ONLINE' | 'OFFLINE' | 'ERRO';
}

export interface ErrorPayload extends BasePayload {
  erro: string;
  codigo: number;
  detalhes?: any;
}
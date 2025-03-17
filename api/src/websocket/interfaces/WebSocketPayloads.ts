import { Atendimento } from '../../models/Atendimento';
import { Acao } from '../../models/Acao';
import { Guiche } from '../../models/Guiche';

export interface BasePayload {
  timestamp: Date;
  origem: string;
}

export interface AtendimentoPayload extends BasePayload {
  atendimento: Atendimento;
  status: number;
}

export interface AcaoPayload extends BasePayload {
  acao: Acao;
  atendimento: Atendimento;
  guiche?: Guiche;
  proximaData?: Date; // Para ações adiadas
}

export interface GuichePayload extends BasePayload {
  guiche: Guiche;
  status: 'DISPONIVEL' | 'OCUPADO' | 'AUSENTE';
}

export interface PainelPayload extends BasePayload {
  senha: string;
  guiche: number;
  servico: string;
}
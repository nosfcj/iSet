/**
 * Atendimento Entity
 * @file api/src/models/Atendimento.ts
 * @lastModified 2025-03-18 19:36:09
 * @modifiedBy nosfcj
 * @description Entidade que representa os atendimentos prestados aos cidadãos
 */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Cidadao } from './Cidadao';
import { Usuario } from './Usuario';
import { Local } from './Local';
import { Acao } from './Acao';
import { Avaliacao } from './Avaliacao';

/**
 * Enum para status do atendimento
 */
export enum AtendimentoStatus {
  NAO_FINALIZADO = 0,
  EM_ATENDIMENTO = 1,
  FINALIZADO = 2,
  AGUARDANDO_RETORNO = 3
}

/**
 * Enum para tipo/prioridade do atendimento
 */
export enum AtendimentoTipo {
  COMUM = 0,
  PRIORITARIO = 1,
  RETORNO = 2
}

@Entity({ 
  name: 'Atendimento',
  comment: 'Contém informações dos atendimentos gerados para prestação de serviços aos cidadãos. Pode ser inserido por um atendente de triagem ou pelo cidadão via app'
})
export class Atendimento {
  @PrimaryGeneratedColumn({ 
    name: 'ID',
    type: 'int',
    comment: 'Identificador único do atendimento'
  })
  id!: number;

  @Column({
    name: 'status',
    type: 'int',
    default: AtendimentoStatus.NAO_FINALIZADO,
    nullable: false,
    comment: 'Status: 0-não finalizado, 1-em atendimento, 2-finalizado, 3-aguardando retorno',
    enum: AtendimentoStatus
  })
  status!: AtendimentoStatus;

  @Column({
    name: 'tipo',
    type: 'int',
    nullable: false,
    comment: 'Tipo/Prioridade: 0-comum, 1-prioritário, 2-retorno. Quanto maior o tipo ou mais idoso o cidadão, maior a prioridade',
    enum: AtendimentoTipo
  })
  tipo!: AtendimentoTipo;

  @Column({
    name: 'senha',
    type: 'varchar',
    length: 11,
    nullable: false,
    comment: 'Senha no formato LLLLL-NNNNN (L=letras do serviço, N=número sequencial)'
  })
  senha!: string;

  @Column({
    name: 'dataCadastro',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
    comment: 'Data e hora da solicitação do atendimento'
  })
  dataCadastro!: Date;

  @Column({
    name: 'dataFinal',
    type: 'timestamp',
    nullable: true,
    default: null,
    comment: 'Data e hora da finalização do atendimento'
  })
  dataFinal!: Date | null;

  @Column({
    name: 'Cidadao_ID',
    type: 'int',
    nullable: false,
    comment: 'ID do cidadão que solicitou o atendimento'
  })
  cidadaoId!: number;

  @Column({
    name: 'Usuario_ID',
    type: 'int',
    nullable: true,
    comment: 'ID do usuário que realizou o atendimento'
  })
  usuarioId!: number | null;

  @Column({
    name: 'Local_ID',
    type: 'int',
    nullable: true,
    comment: 'ID do local onde o atendimento foi realizado'
  })
  localId!: number | null;

  // Relação com Cidadao (obrigatória)
  @ManyToOne(() => Cidadao, (cidadao: Cidadao) => cidadao.atendimentos)
  @JoinColumn({ name: 'Cidadao_ID' })
  cidadao!: Cidadao;

  // Relação com Usuario (opcional)
  @ManyToOne(() => Usuario, (usuario: Usuario) => usuario.atendimentos)
  @JoinColumn({ name: 'Usuario_ID' })
  usuario!: Usuario | null;

  // Relação com Local (opcional)
  @ManyToOne(() => Local, (local: Local) => local.atendimentos)
  @JoinColumn({ name: 'Local_ID' })
  local!: Local | null;

  // Relação com Acao
  @OneToMany(() => Acao, (acao: Acao) => acao.atendimento)
  acoes!: Acao[];

  // Relação com Avaliacao (opcional)
  @OneToOne(() => Avaliacao, (avaliacao: Avaliacao) => avaliacao.atendimento)
  avaliacao!: Avaliacao;
}
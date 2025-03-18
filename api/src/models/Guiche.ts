/**
 * Guiche Entity
 * @file api/src/models/Guiche.ts
 * @lastModified 2025-03-18 20:24:12
 * @modifiedBy nosfcj
 * @description Entidade que representa os guichês de atendimento e sua disponibilidade
 */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Local } from './Local';
import { Usuario } from './Usuario';
import { Acao } from './Acao';
import { Direcionamento } from './Direcionamento';

/**
 * Enum para status do guichê
 */
export enum GuicheStatus {
  OFFLINE = 0,
  ONLINE = 1
}

/**
 * Enum para disponibilidade do guichê
 */
export enum GuicheDisponibilidade {
  FORA_ATENDIMENTO = 0,
  AGUARDANDO_ATENDIMENTO = 1,
  EM_ATENDIMENTO = 2,
  ATENDIMENTO_SUSPENSO = 3
}

@Entity({ 
  name: 'Guiche',
  comment: 'Contém informações dos guichês, seu status e disponibilidade para atendimentos no sistema'
})
export class Guiche {
  @PrimaryGeneratedColumn({ 
    name: 'ID',
    type: 'int',
    comment: 'Identificador único do guichê'
  })
  id!: number;

  @Column({
    name: 'status',
    type: 'tinyint',
    default: GuicheStatus.ONLINE,
    nullable: false,
    comment: 'Status do guichê: 0-offline, 1-online',
    enum: GuicheStatus
  })
  status!: GuicheStatus;

  @Column({
    name: 'identificacao',
    type: 'int',
    width: 3,
    zerofill: true,
    nullable: false,
    comment: 'Número sequencial do guichê no local de atendimento (001-999)'
  })
  identificacao!: number;

  @Column({
    name: 'disponibilidade',
    type: 'int',
    default: GuicheDisponibilidade.FORA_ATENDIMENTO,
    nullable: false,
    comment: 'Disponibilidade via WebSocket: 0-fora, 1-aguardando, 2-em atendimento, 3-suspenso',
    enum: GuicheDisponibilidade
  })
  disponibilidade!: GuicheDisponibilidade;

  @Column({
    name: 'Local_ID',
    type: 'int',
    nullable: false,
    comment: 'ID do local onde este guichê está localizado'
  })
  localId!: number;

  @Column({
    name: 'Usuario_ID',
    type: 'int',
    nullable: true,
    comment: 'ID do usuário que está utilizando este guichê (quando em uso)'
  })
  usuarioId!: number | null;

  // Relação com Local (obrigatória)
  @ManyToOne(() => Local, (local: Local) => local.guiches, { nullable: false })
  @JoinColumn({ name: 'Local_ID' })
  local!: Local;

  // Relação com Usuario (opcional)
  @ManyToOne(() => Usuario, (usuario: Usuario) => usuario.guiches, { nullable: true })
  @JoinColumn({ name: 'Usuario_ID' })
  usuario!: Usuario | null;

  // Relação com Acao
  @OneToMany(() => Acao, (acao: Acao) => acao.guiche)
  acoes!: Acao[];

  // Relação com Direcionamento
  @OneToMany(() => Direcionamento, (direcionamento: Direcionamento) => direcionamento.guiche)
  direcionamentos!: Direcionamento[];
}
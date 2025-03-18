/**
 * SubAgregador Entity
 * @file api/src/models/SubAgregador.ts
 * @lastModified 2025-03-18 19:13:36
 * @modifiedBy nosfcj
 * @description Entidade que representa as divisões dentro de um agregador, como setores de uma central de atendimento
 */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Agregador } from './Agregador';
import { Local } from './Local';
import { Monitor } from './Monitor';

/**
 * Enum para status do subagregador
 */
export enum SubAgregadorStatus {
  DESATIVADO = 0,
  ATIVADO = 1
}

@Entity({ 
  name: 'SubAgregador',
  comment: 'Contém informações sobre as divisões de locais agregadores, como setores de uma central de atendimento'
})
export class SubAgregador {
  @PrimaryGeneratedColumn({ 
    name: 'ID',
    type: 'int',
    comment: 'Identificador único do subagregador'
  })
  id!: number;

  @Column({
    name: 'status',
    type: 'tinyint',
    default: SubAgregadorStatus.ATIVADO,
    nullable: false,
    comment: 'Status: 0-desativado, 1-ativado. A desativação afeta todos os serviços vinculados',
    enum: SubAgregadorStatus
  })
  status!: SubAgregadorStatus;

  @Column({
    name: 'nome',
    type: 'text',
    nullable: false,
    comment: 'Nome do subagregador'
  })
  nome!: string;

  @Column({
    name: 'Agregador_ID',
    type: 'int',
    nullable: false,
    comment: 'ID do agregador ao qual este subagregador pertence'
  })
  agregadorId!: number;

  // Relação com Agregador (obrigatória)
  @ManyToOne(() => Agregador, (agregador: Agregador) => agregador.subAgregadores)
  @JoinColumn({ name: 'Agregador_ID' })
  agregador!: Agregador;

  // Relação com Local
  @OneToMany(() => Local, (local: Local) => local.subAgregador)
  locais!: Local[];

  // Relação com Monitor
  @OneToMany(() => Monitor, (monitor: Monitor) => monitor.subAgregador)
  monitores!: Monitor[];
}
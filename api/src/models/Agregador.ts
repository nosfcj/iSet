/**
 * Agregador Entity
 * @file api/src/models/Agregador.ts
 * @lastModified 2025-03-18 19:13:36
 * @modifiedBy nosfcj
 * @description Entidade que representa os agregadores de locais de atendimento
 */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SubAgregador } from './SubAgregador';
import { Local } from './Local';

/**
 * Enum para status do agregador
 */
export enum AgregadorStatus {
  DESATIVADO = 0,
  ATIVADO = 1
}

@Entity({ 
  name: 'Agregador',
  comment: 'Contém informações sobre os agregadores de locais de atendimento'
})
export class Agregador {
  @PrimaryGeneratedColumn({ 
    name: 'ID',
    type: 'int',
    comment: 'Identificador único do agregador'
  })
  id!: number;

  @Column({
    name: 'status',
    type: 'tinyint',
    nullable: false,
    default: AgregadorStatus.ATIVADO,
    comment: 'Status: 0-desativado, 1-ativado',
    enum: AgregadorStatus
  })
  status!: AgregadorStatus;

  @Column({
    name: 'nome',
    type: 'varchar',
    length: 45,
    nullable: false,
    comment: 'Nome do agregador de locais'
  })
  nome!: string;

  // Relação com SubAgregador
  @OneToMany(() => SubAgregador, (subAgregador: SubAgregador) => subAgregador.agregador)
  subAgregadores!: SubAgregador[];

  // Relação com Local
  @OneToMany(() => Local, (local: Local) => local.agregador)
  locais!: Local[];
}
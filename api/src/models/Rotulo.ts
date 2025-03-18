/**
 * Rotulo Entity
 * @file api/src/models/Rotulo.ts
 * @lastModified 2025-03-18 19:09:23
 * @modifiedBy nosfcj
 * @description Entidade que representa os rótulos padronizados para categorização dos pré-requisitos
 */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Requisito } from './Requisito';

/**
 * Enum para status do rótulo
 */
export enum RotuloStatus {
  INATIVO = 0,
  ATIVO = 1
}

@Entity({ 
  name: 'Rotulo',
  comment: 'Contém os rótulos padronizados para categorização dos pré-requisitos dos serviços'
})
export class Rotulo {
  @PrimaryGeneratedColumn({ 
    name: 'ID',
    type: 'int',
    comment: 'Identificador único do rótulo'
  })
  id!: number;

  @Column({
    name: 'status',
    type: 'tinyint',
    default: RotuloStatus.ATIVO,
    nullable: false,
    comment: 'Status do rótulo: 0-inativo, 1-ativo',
    enum: RotuloStatus
  })
  status!: RotuloStatus;

  @Column({
    name: 'rotulo',
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'Título do rótulo usado para padronizar e categorizar os pré-requisitos'
  })
  rotulo!: string;

  // Relação com Requisito
  @OneToMany(() => Requisito, (requisito: Requisito) => requisito.rotulo)
  requisitos!: Requisito[];
}
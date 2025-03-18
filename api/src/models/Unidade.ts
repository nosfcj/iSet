/**
 * Unidade Entity
 * @file api/src/models/Unidade.ts
 * @lastModified 2025-03-18 16:54:01
 * @modifiedBy nosfcj
 * @description Entidade que representa as unidades (órgãos) do sistema
 */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Servico } from './Servico';
import { Local } from './Local';
import { Usuario } from './Usuario';

/**
 * Enum para status da unidade
 */
export enum UnidadeStatus {
  INATIVO = 0,
  ATIVO = 1
}

@Entity({ 
  name: 'Unidade',
  comment: 'Contém informações sobre as unidades (órgãos) do sistema'
})
export class Unidade {
  @PrimaryGeneratedColumn({ 
    name: 'ID',
    type: 'int',
    comment: 'Identificador único da unidade'
  })
  id!: number;

  @Column({
    name: 'status',
    type: 'tinyint',
    nullable: false,
    default: UnidadeStatus.ATIVO,
    comment: 'Status: 0 - inativo, 1 - ativo',
    enum: UnidadeStatus
  })
  status!: UnidadeStatus;

  @Column({
    name: 'nome',
    type: 'varchar',
    length: 45,
    nullable: false,
    comment: 'Nome da unidade no sistema'
  })
  nome!: string;

  // Relação com Servico
  @OneToMany(() => Servico, (servico: Servico) => servico.unidade)
  servicos!: Servico[];

  // Relação com Local
  @OneToMany(() => Local, (local: Local) => local.unidade)
  locais!: Local[];

  // Relação com Usuario
  @OneToMany(() => Usuario, (usuario: Usuario) => usuario.unidade)
  usuarios!: Usuario[];
}
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Agregador } from './Agregador';
import { Local } from './Local';

@Entity({ name: 'SubAgregado', comment: 'Subdivisões de agregadores' })
export class SubAgregado {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({
    type: 'tinyint',
    default: 1,
    comment: 'Status: 0 - desativado, 1 - ativado',
  })
  status!: number;

  @Column({
    type: 'text',
    nullable: false,
    comment: 'Nome do sub-agregador',
  })
  nome!: string;

  // Relação com Agregador (ManyToOne)
  @ManyToOne(() => Agregador, (agregador) => agregador.subAgregados)
  @JoinColumn({ name: 'Agregador_ID' })
  agregador!: Agregador;

  // Relação com Local (OneToMany)
  @OneToMany(() => Local, (local) => local.subAgregado)
  locais!: Local[];
}
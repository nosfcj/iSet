import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SubAgregado } from './SubAgregado';
import { Local } from './Local';

@Entity({ name: 'Agregador', comment: 'Agregadores de locais de atendimento' })
export class Agregador {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({
    type: 'tinyint',
    nullable: false,
    comment: 'Status: 0 - desativado, 1 - ativado',
  })
  status!: number;

  @Column({
    length: 45,
    nullable: false,
    comment: 'Nome do agregador',
  })
  nome!: string;

  // Relação com SubAgregado (OneToMany)
  @OneToMany(() => SubAgregado, (subAgregado) => subAgregado.agregador)
  subAgregados!: SubAgregado[];

  // Relação com Local (OneToMany)
  @OneToMany(() => Local, (local) => local.agregador)
  locais!: Local[];
}
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SubAgregador } from './SubAgregador';
import { Local } from './Local';

@Entity({ 
  name: 'Agregador',
  comment: 'Agregadores de locais de atendimento'
})
export class Agregador {
  @PrimaryGeneratedColumn({ 
    name: 'ID',
    type: 'int'
  })
  id!: number;

  @Column({
    name: 'status',
    type: 'tinyint',
    nullable: false,
    comment: 'Status: 0 - desativado, 1 - ativado'
  })
  status!: number;

  @Column({
    name: 'nome',
    type: 'varchar',
    length: 45,
    nullable: false,
    comment: 'Nome do agregador'
  })
  nome!: string;

  // Relação com SubAgregado (OneToMany)
  @OneToMany(() => SubAgregador, (subAgregador) => subAgregador.agregadores)
  subAgregadores!: SubAgregador[];

  // Relação com Local (OneToMany)
  @OneToMany(() => Local, (local) => local.agregador)
  locais!: Local[];
}
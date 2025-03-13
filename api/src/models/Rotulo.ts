import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Requisito } from './Requisito';

@Entity({ name: 'Rotulo', comment: 'Rótulos para padronização de pré-requisitos' })
export class Rotulo {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({
    type: 'tinyint',
    default: 1,
    comment: 'Status: 0 - inativo, 1 - ativo',
  })
  status!: number;

  @Column({
    length: 255,
    nullable: false,
    comment: 'Título do rótulo',
  })
  rotulo!: string;

  // Relação com Requisito (OneToMany)
  @OneToMany(() => Requisito, (requisito) => requisito.rotulo)
  requisitos!: Requisito[];
}
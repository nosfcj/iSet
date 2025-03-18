import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Local } from './Local';

@Entity({ name: 'Cidade' })
export class Cidade {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({
    type: 'tinyint',
    default: 1,
    nullable: false,
    comment: 'Status que define a cidade no sistema: 0 - inativo, 1 ativo.',
  })
  status!: number;

  @Column({
    type: 'text',
    nullable: false,
    comment: 'Nome da cidade.',
  })
  nome!: string;

  @Column({
    type: 'text',
    name: 'Estado',
    nullable: false,
    comment: 'Nome do estado.',
  })
  estado!: string;

  // Relação com Local
  @OneToMany(() => Local, (local) => local.cidade)
  locais!: Local[];
}
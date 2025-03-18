import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Servico } from './Servico';
import { Local } from './Local';
import { Usuario } from './Usuario';

@Entity({ name: 'Unidade' })
export class Unidade {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({
    type: 'tinyint',
    default: 1,
    comment: 'Status atual do órgão no sistema: 0 - inativo, 1 - ativo',
  })
  status!: number;

  @Column({
    length: 45,
    nullable: false,
    comment: 'Nome do órgão no sistema.',
  })
  nome!: string;

  // Relação com Servico
  @OneToMany(() => Servico, (servico) => servico.unidade)
  servicos!: Servico[];

  // Relação com Local
  @OneToMany(() => Local, (local) => local.unidade)
  locais!: Local[];

  // Relação com Usuario
  @OneToMany(() => Usuario, (usuario) => usuario.unidade)
  usuarios!: Usuario[];
}
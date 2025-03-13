import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Servico } from './Servico';
import { Local } from './Local';
import { Usuario } from './Usuario'; // Importação adicionada

@Entity({ name: 'Orgao' })
export class Orgao {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({
    type: 'tinyint',
    default: 1,
    comment: 'Status atual do órgão: 0 - inativo, 1 - ativo',
  })
  status!: number;

  @Column({
    length: 45,
    nullable: false,
    comment: 'Nome do órgão',
  })
  nome!: string;

  // Relação com Servico
  @OneToMany(() => Servico, (servico) => servico.orgao)
  servicos!: Servico[];

  // Relação com Local
  @OneToMany(() => Local, (local) => local.orgao)
  locais!: Local[];

  // Relação com Usuario (adicionada)
  @OneToMany(() => Usuario, (usuario) => usuario.orgao)
  usuarios!: Usuario[];
}
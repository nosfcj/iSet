import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Unidade } from './Unidade';
import { Conteudo } from './Conteudo';
import { Direcionamento } from './Direcionamento';
import { Acao } from './Acao';

@Entity({ name: 'Servico' })
export class Servico {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({
    type: 'tinyint',
    nullable: false,
    comment: 'Define status do serviço: 0 - desativado, 1 - disponível',
  })
  status!: number;

  @Column({
    length: 255,
    nullable: false,
    comment: 'Título do serviço disponibilizado',
  })
  titulo!: string;

  @Column({
    length: 5,
    nullable: true,
    unique: true,
    comment: 'Rótulo, no formato \'LLLLL\', que irá compor a identificação da senha no ticket.',
  })
  rotulo!: string;

  @ManyToOne(() => Unidade, (unidade) => unidade.servicos)
  @JoinColumn({ name: 'Unidade_ID' })
  unidade!: Unidade;

  @OneToMany(() => Acao, (acao) => acao.servico)
  acoes!: Acao[];

  @OneToMany(() => Conteudo, (conteudo) => conteudo.servico)
  conteudos!: Conteudo[];

  @OneToMany(() => Direcionamento, (direcionamento) => direcionamento.servico)
  direcionamentos!: Direcionamento[];
}
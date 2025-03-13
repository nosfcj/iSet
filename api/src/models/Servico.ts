import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Orgao } from './Orgao';
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
    comment: 'Status: 0 - desativado, 1 - disponível',
  })
  status!: number;

  @Column({
    length: 255,
    nullable: false,
    comment: 'Título do serviço',
  })
  titulo!: string;

  // Relação com Orgao
  @ManyToOne(() => Orgao, (orgao) => orgao.servicos)
  @JoinColumn({ name: 'Orgao_ID' })
  orgao!: Orgao;

  // Relação com Conteudo
  @OneToMany(() => Conteudo, (conteudo) => conteudo.servico)
  conteudos!: Conteudo[];

  // Relação com Direcionamento (adicionada)
  @OneToMany(() => Direcionamento, (direcionamento) => direcionamento.servico)
  direcionamentos!: Direcionamento[];

  @OneToMany(() => Acao, (acao) => acao.servico)
  acoes!: Acao[];

}
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Orgao } from './Orgao';
import { Conteudo } from './Conteudo';
import { Direcionamento } from './Direcionamento';
import { Acao } from './Acao'; // Adicione esta importação

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
    comment: 'Título do serviço disponibilizado',
  })
  titulo!: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    comment: 'Última atualização relevante para o cache de serviços (mudanças de status, conteúdo, requisitos)',
    name: 'ultimaAtualizacao'
  })
  ultimaAtualizacao!: Date;

  // Adicione esta nova relação com Acao
  @OneToMany(() => Acao, (acao) => acao.servico)
  acoes!: Acao[];

  @ManyToOne(() => Orgao, (orgao) => orgao.servicos)
  @JoinColumn({ name: 'Orgao_ID' })
  orgao!: Orgao;

  @OneToMany(() => Conteudo, (conteudo) => conteudo.servico)
  conteudos!: Conteudo[];

  @OneToMany(() => Direcionamento, (direcionamento) => direcionamento.servico)
  direcionamentos!: Direcionamento[];
}
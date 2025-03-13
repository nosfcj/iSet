import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Servico } from './Servico';
import { Local } from './Local';
import { Requisito } from './Requisito';

@Entity({ name: 'Conteudo', comment: 'Serviços disponibilizados para atendimento' })
export class Conteudo {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({
    type: 'tinyint',
    default: 1,
    comment: 'Status: 0 - indisponível, 1 - disponível',
  })
  status!: number;

  @Column({
    type: 'text',
    nullable: false,
    comment: 'Descrição detalhada do serviço',
  })
  descricao!: string;

  // Relação com Servico (ManyToOne)
  @ManyToOne(() => Servico, (servico) => servico.conteudos)
  @JoinColumn({ name: 'Servico_ID' })
  servico!: Servico;

  // Relação com Local (ManyToOne)
  @ManyToOne(() => Local, (local) => local.conteudos)
  @JoinColumn({ name: 'Local_ID' })
  local!: Local;

  // Relação com Requisito (OneToMany)
  @OneToMany(() => Requisito, (requisito) => requisito.conteudo)
  requisitos!: Requisito[];
}
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Servico } from './Servico';
import { Local } from './Local';
import { Requisito } from './Requisito';

@Entity({ 
  name: 'Conteudo',
  comment: 'Essa tabela contém informações sobre os serviços disponibilizados para o atendimento ao cidadão.'
})
export class Conteudo {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({
    type: 'tinyint',
    default: 1,
    nullable: false,
    comment: 'Status que define disponibilidade do conteúdo: 0 - indisponível, 1 - disponível',
  })
  status!: number;

  @Column({
    type: 'text',
    nullable: false,
    comment: 'Descrição inicial do serviço disponível',
  })
  descricao!: string;

  // Relação com Servico
  @ManyToOne(() => Servico, (servico) => servico.conteudos)
  @JoinColumn({ name: 'Servico_ID' })
  servico!: Servico;

  // Relação com Local
  @ManyToOne(() => Local, (local) => local.conteudos)
  @JoinColumn({ name: 'Local_ID' })
  local!: Local;

  // Relação com Requisito
  @OneToMany(() => Requisito, (requisito) => requisito.conteudo)
  requisitos!: Requisito[];
}
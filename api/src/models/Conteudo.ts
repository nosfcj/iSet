/**
 * Conteudo Entity
 * @file api/src/models/Conteudo.ts
 * @lastModified 2025-03-18 19:00:22
 * @modifiedBy nosfcj
 * @description Entidade que representa as informações e requisitos dos serviços disponibilizados
 */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Servico } from './Servico';
import { Local } from './Local';
import { Requisito } from './Requisito';

/**
 * Enum para status do conteúdo
 */
export enum ConteudoStatus {
  INDISPONIVEL = 0,
  DISPONIVEL = 1
}

@Entity({ 
  name: 'Conteudo',
  comment: 'Contém informações e requisitos sobre os serviços disponibilizados para o atendimento ao cidadão'
})
export class Conteudo {
  @PrimaryGeneratedColumn({ 
    name: 'ID',
    type: 'int',
    comment: 'Identificador único do conteúdo'
  })
  id!: number;

  @Column({
    name: 'status',
    type: 'tinyint',
    default: ConteudoStatus.DISPONIVEL,
    nullable: false,
    comment: 'Status que define disponibilidade do conteúdo: 0-indisponível, 1-disponível',
    enum: ConteudoStatus
  })
  status!: ConteudoStatus;

  @Column({
    name: 'descricao',
    type: 'text',
    nullable: false,
    comment: 'Descrição detalhada do serviço disponível'
  })
  descricao!: string;

  @Column({
    name: 'Servico_ID',
    type: 'int',
    nullable: false,
    comment: 'ID do serviço ao qual este conteúdo pertence'
  })
  servicoId!: number;

  @Column({
    name: 'Local_ID',
    type: 'int',
    nullable: false,
    comment: 'ID do local onde este conteúdo está disponível'
  })
  localId!: number;

  // Relação com Servico (obrigatória)
  @ManyToOne(() => Servico, (servico: Servico) => servico.conteudos)
  @JoinColumn({ name: 'Servico_ID' })
  servico!: Servico;

  // Relação com Local (obrigatória)
  @ManyToOne(() => Local, (local: Local) => local.conteudos)
  @JoinColumn({ name: 'Local_ID' })
  local!: Local;

  // Relação com Requisito
  @OneToMany(() => Requisito, (requisito: Requisito) => requisito.conteudo)
  requisitos!: Requisito[];
}
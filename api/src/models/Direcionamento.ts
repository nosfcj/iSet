/**
 * Direcionamento Entity
 * @file api/src/models/Direcionamento.ts
 * @lastModified 2025-03-18 19:00:22
 * @modifiedBy nosfcj
 * @description Entidade que representa o mapeamento entre guichês e serviços que podem ser atendidos
 */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Guiche } from './Guiche';
import { Servico } from './Servico';

/**
 * Enum para status do direcionamento
 */
export enum DirecionamentoStatus {
  INDISPONIVEL = 0,
  DISPONIVEL = 1
}

/**
 * Enum para tipo de guichê
 */
export enum TipoGuiche {
  TRIAGEM = 1,
  ATENDIMENTO = 2
}

@Entity({ 
  name: 'Direcionamento',
  comment: 'Mapeia os serviços que podem ser atendidos por cada guichê'
})
export class Direcionamento {
  @PrimaryGeneratedColumn({ 
    name: 'ID',
    type: 'int',
    comment: 'Identificador único do direcionamento'
  })
  id!: number;

  @Column({
    name: 'status',
    type: 'tinyint',
    nullable: false,
    default: DirecionamentoStatus.DISPONIVEL,
    comment: 'Status que define disponibilidade: 0-indisponível, 1-disponível',
    enum: DirecionamentoStatus
  })
  status!: DirecionamentoStatus;

  @Column({
    name: 'tipo',
    type: 'int',
    nullable: false,
    default: TipoGuiche.TRIAGEM,
    comment: 'Define tipo de guichê: 1-triagem, 2-atendimento',
    enum: TipoGuiche
  })
  tipo!: TipoGuiche;

  @Column({
    name: 'Guiche_ID',
    type: 'int',
    nullable: false,
    comment: 'ID do guichê ao qual este direcionamento pertence'
  })
  guicheId!: number;

  @Column({
    name: 'Servico_ID',
    type: 'int',
    nullable: false,
    comment: 'ID do serviço que pode ser atendido neste guichê'
  })
  servicoId!: number;

  // Relação com Guiche (obrigatória)
  @ManyToOne(() => Guiche, (guiche: Guiche) => guiche.direcionamentos)
  @JoinColumn({ name: 'Guiche_ID' })
  guiche!: Guiche;

  // Relação com Servico (obrigatória)
  @ManyToOne(() => Servico, (servico: Servico) => servico.direcionamentos)
  @JoinColumn({ name: 'Servico_ID' })
  servico!: Servico;
}
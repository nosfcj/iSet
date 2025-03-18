import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Atendimento } from './Atendimento';

/**
 * Enum para estrelas da avaliação
 */
export enum AvaliacaoEstrelas {
  PESSIMO = 1,
  RUIM = 2,
  RAZOAVEL = 3,
  OTIMO = 4,
  PERFEITO = 5
}

@Entity({ 
  name: 'Avaliacao',
  comment: 'Essa tabela contém informações sobre a avaliação que o cidadão faz ao atendimento oferecido.'
})
export class Avaliacao {
  @PrimaryColumn({ 
    name: 'Atendimento_ID',
    comment: 'Esse ID se refere ao atendimento dos serviços'
  })
  atendimentoId!: number;

  @Column({
    type: 'int',
    width: 1,
    nullable: false,
    name: 'avaliacao',
    comment: 'As estrelas se refere a avaliação do atendimento através de estrelas: 1 - péssimo , 2 - ruim , 3 - razoável,  4 - ótimo, 5 - perfeito.'
  })
  avaliacao!: number;

  @Column({
    type: 'text',
    nullable: true,
    default: null,
    comment: 'Comentário, opcional, exclusivo do cidadão'
  })
  comentario!: string | null;

  // Relação OneToOne com Atendimento
  @OneToOne(() => Atendimento, (atendimento) => atendimento.avaliacao)
  @JoinColumn({ name: 'Atendimento_ID' })
  atendimento!: Atendimento;
}
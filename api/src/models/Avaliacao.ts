import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Atendimento } from './Atendimento';

@Entity({ name: 'Avaliacao', comment: 'Avaliações dos cidadãos sobre atendimentos' })
export class Avaliacao {
  @PrimaryColumn({ name: 'Atendimento_ID' })
  atendimentoId!: number; // PK compartilhada com Atendimento

  @Column({
    type: 'int',
    width: 1,
    nullable: false,
    comment: 'Avaliação em estrelas: 1 (péssimo) a 5 (perfeito)',
  })
  estrelas!: number;

  @Column({
    type: 'text',
    nullable: true,
    comment: 'Comentário opcional do cidadão',
  })
  comentario!: string | null;

  // Relação OneToOne com Atendimento (bidirecional)
  @OneToOne(() => Atendimento, (atendimento) => atendimento.avaliacao)
  @JoinColumn({ name: 'Atendimento_ID' })
  atendimento!: Atendimento;
}
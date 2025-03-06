import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Atendimento } from "./Atendimento";

/**
 * Entidade que representa a avaliação feita pelo cidadão após um atendimento.
 * Cada avaliação pertence exclusivamente a um atendimento.
 */
@Entity("Avaliacao")
export class Avaliacao {
  /** Identificador do atendimento associado (Chave Primária e Estrangeira) */
  @PrimaryColumn({ name: "Atendimento_ID", comment: "ID do atendimento avaliado" })
  atendimentoId!: number;

  /** Nota: 1 - Péssimo, 2 - Ruim, 3 - Razoável, 4 - Ótimo, 5 - Perfeito */
  @Column({
    type: "int",
    nullable: false,
    comment: "Nota: 1 - Péssimo, 2 - Ruim, 3 - Razoável, 4 - Ótimo, 5 - Perfeito"
  })
  estrelas!: number;

  /** Comentário opcional sobre o atendimento */
  @Column({
    type: "text",
    nullable: true,
    comment: "Comentário do cidadão sobre o atendimento"
  })
  comentario?: string;

  /** 
   * Relação N:1 - Cada avaliação pertence a um único atendimento.
   * O atendimento é a entidade proprietária da relação.
   */
  @ManyToOne(() => Atendimento, (atendimento) => atendimento.avaliacoes, {
    nullable: false,
    onDelete: "NO ACTION"
  })
  @JoinColumn({ name: "Atendimento_ID" }) // Mapeia a coluna FK
  atendimentoRef!: Atendimento;
}
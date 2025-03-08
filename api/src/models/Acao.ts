import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Atendimento } from "./Atendimento";
import { Guiche } from "./Guiche";
import { Usuario } from "./Usuario";
import { Servico } from "./Servico";

/**
 * Representa cada serviço individual de um atendimento. A finalização de todas as ações 
 * determina o status final do atendimento.
 */
@Entity("Acao")
export class Acao {
  /** Identificador único da ação */
  @PrimaryGeneratedColumn({ name: "ID", comment: "Identificador único da ação" })
  id!: number;

  /** Situação: 0 - Aguardando, 1 - Em atendimento, 2 - Finalizado, 3 - Adiado */
  @Column({
    type: "int",
    default: 0,
    comment: "Situação: 0 - Aguardando, 1 - Em atendimento, 2 - Finalizado, 3 - Adiado"
  })
  status!: number;

  /** Posição do serviço na fila do atendimento */
  @Column({
    type: "int",
    nullable: false,
    comment: "Posição do serviço na fila do atendimento"
  })
  posicao!: number;

  /** Data efetiva do atendimento deste serviço */
  @Column({
    type: "date",
    name: "data",
    nullable: true,
    comment: "Data efetiva do atendimento deste serviço"
  })
  dataAtendimento?: Date;

  /** Hora de início do atendimento (formato HH:MM:SS) */
  @Column({
    type: "time",
    name: "horaInicio",
    nullable: true,
    comment: "Hora de início do atendimento",
    transformer: {
      to: (value: string) => value,
      from: (value: string) => value,
    }
  })
  horaInicio?: string;

  /** Hora de conclusão do atendimento (formato HH:MM:SS) */
  @Column({
    type: "time",
    name: "horaFim",
    nullable: true,
    comment: "Hora de conclusão do atendimento",
    transformer: {
      to: (value: string) => value,
      from: (value: string) => value,
    }
  })
  horaFim?: string;

  /** Observações registradas pelo atendente */
  @Column({
    type: "text",
    nullable: true,
    comment: "Observações registradas pelo atendente"
  })
  anotacao?: string;

  // --- RELACIONAMENTOS ---

  /** Guichê onde a ação foi atendida */
  @ManyToOne(() => Guiche, (guiche) => guiche.acoes)
  @JoinColumn({ name: "Guiche_ID" })
  guicheRef!: Guiche;

  /** Atendimento ao qual esta ação pertence */
  @ManyToOne(() => Atendimento, (atendimento) => atendimento.acoes)
  @JoinColumn({ name: "Atendimento_ID" })
  atendimentoRef!: Atendimento;

  /** Serviço relacionado a esta ação */
  @ManyToOne(() => Servico, (servico) => servico.acoes)
  @JoinColumn({ name: "Servico_ID" })
  servicoRef!: Servico;

  /** Usuário que executou esta ação (⚠️ Agora é obrigatório) */
  @ManyToOne(() => Usuario, (usuario) => usuario.acoes, { nullable: false })
  @JoinColumn({ name: "Usuario_ID" })
  usuarioRef!: Usuario;
}

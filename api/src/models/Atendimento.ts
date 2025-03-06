import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Cidadao } from "./Cidadao";
import { Usuario } from "./Usuario";
import { Local } from "./Local";
import { Acao } from "./Acao";
import { Avaliacao } from "./Avaliacao";

/**
 * Entidade que representa um atendimento realizado para um cidadão.
 * Um atendimento pode conter várias ações e ser avaliado pelo cidadão.
 */
@Entity("Atendimento")
export class Atendimento {
  /** Identificador único do atendimento (Chave Primária) */
  @PrimaryGeneratedColumn({ comment: "Identificador único do atendimento" })
  ID!: number;

  /** Status: 0 - Não finalizado, 1 - Em atendimento, 2 - Finalizado, 3 - Aguardando retorno */
  @Column({ 
    type: "int", 
    default: 0, 
    comment: "Status: 0 - Não finalizado, 1 - Em atendimento, 2 - Finalizado, 3 - Aguardando retorno" 
  })
  status!: number;

  /** Tipo: 0 - Comum, 1 - Prioridade, 2 - Retorno, 3 - Retorno com prioridade */
  @Column({ 
    type: "int", 
    nullable: false, 
    comment: "Tipo: 0 - Comum, 1 - Prioridade, 2 - Retorno, 3 - Retorno com prioridade" 
  })
  tipo!: number;

  /** Senha no formato 'LLL-000' */
  @Column({ 
    type: "varchar", 
    length: 9, 
    nullable: false, 
    comment: "Senha no formato 'LLL-000'" 
  })
  senha!: string;

  /** Data de solicitação do atendimento */
  @Column({ 
    type: "timestamp", 
    default: () => "CURRENT_TIMESTAMP", 
    comment: "Data de solicitação do atendimento" 
  })
  dataCadastro!: Date;

  /** Data de finalização (opcional) */
  @Column({ 
    type: "timestamp", 
    nullable: true, 
    comment: "Data de finalização do atendimento" 
  })
  dataFinal?: Date;

  // --- RELACIONAMENTOS ---

  /** Cidadão que solicitou o atendimento */
  @ManyToOne(() => Cidadao, (cidadao) => cidadao.atendimentos, { 
    nullable: false 
  })
  @JoinColumn({ name: "Cidadao_ID" }) // ✅ FK explícita
  cidadaoRef!: Cidadao;

  /** Usuário que registrou o atendimento (opcional) */
  @ManyToOne(() => Usuario, (usuario) => usuario.atendimentos, { 
    nullable: true 
  })
  @JoinColumn({ name: "Usuario_ID" }) // ✅ FK explícita
  usuarioRef?: Usuario;

  /** Local onde o atendimento foi registrado */
  @ManyToOne(() => Local, (local) => local.atendimentos, { 
    nullable: true 
  })
  @JoinColumn({ name: "Local_ID" }) // ✅ FK explícita
  localRef?: Local;

  /** Ações vinculadas a este atendimento */
  @OneToMany(() => Acao, (acao) => acao.atendimentoRef)
  acoes!: Acao[];

  /** Avaliação associada ao atendimento */
  @OneToMany(() => Avaliacao, (avaliacao) => avaliacao.atendimentoRef)
  avaliacoes!: Avaliacao[];
}
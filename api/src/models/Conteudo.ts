import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Servico } from "./Servico";
import { Local } from "./Local";
import { Requisito } from "./Requisito";

/**
 * Entidade que representa o conteúdo de um serviço disponível em um local específico.
 * Cada conteúdo está vinculado a um serviço e a um local de atendimento.
 */
@Entity("Conteudo")
export class Conteudo {
  /** Identificador único do conteúdo (Chave Primária) */
  @PrimaryGeneratedColumn({ comment: "Identificador único do conteúdo" })
  ID!: number;

  /** Status: 0 - Indisponível, 1 - Disponível */
  @Column({ 
    type: "tinyint", 
    default: 1, 
    comment: "Status: 0 - Indisponível, 1 - Disponível" 
  })
  status!: number;

  /** Descrição do conteúdo (formato HTML) */
  @Column({ 
    type: "text", 
    nullable: false, 
    comment: "Descrição detalhada do serviço em HTML" 
  })
  descricao!: string;

  // --- RELACIONAMENTOS ---

  /** Serviço ao qual este conteúdo pertence */
  @ManyToOne(() => Servico, (servico) => servico.conteudos, { 
    nullable: false 
  })
  @JoinColumn({ name: "Servico_ID" }) // ✅ FK explícita
  servicoRef!: Servico;

  /** Local onde este conteúdo é oferecido */
  @ManyToOne(() => Local, (local) => local.conteudos, { 
    nullable: false 
  })
  @JoinColumn({ name: "Local_ID" }) // ✅ FK explícita
  localRef!: Local;

  /** Requisitos associados a este conteúdo */
  @OneToMany(() => Requisito, (requisito) => requisito.conteudoRef)
  requisitos!: Requisito[];
}
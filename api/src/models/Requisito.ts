import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Conteudo } from "./Conteudo";
import { Rotulo } from "./Rotulo";

/**
 * Entidade que representa os pré-requisitos necessários para um serviço.
 * Cada requisito está vinculado a um conteúdo e a um rótulo para padronização.
 */
@Entity("Requisito")
export class Requisito {
  /** Identificador único do requisito (Chave Primária) */
  @PrimaryGeneratedColumn({ comment: "Identificador único do pré-requisito" })
  ID!: number;

  /** Status: 0 - Indisponível, 1 - Disponível */
  @Column({ 
    type: "tinyint", 
    default: 1, 
    comment: "Status: 0 - Indisponível, 1 - Disponível" 
  })
  status!: number;

  /** Conteúdo do pré-requisito (formato HTML) */
  @Column({ 
    type: "text", 
    nullable: false, 
    comment: "Conteúdo do pré-requisito em HTML" 
  })
  conteudo!: string;

  // --- RELACIONAMENTOS ---

  /** Conteúdo ao qual este pré-requisito pertence */
  @ManyToOne(() => Conteudo, (conteudo) => conteudo.requisitos, { 
    nullable: false 
  })
  @JoinColumn({ name: "Conteudo_ID" }) // ✅ FK explícita
  conteudoRef!: Conteudo;

  /** Rótulo que categoriza este pré-requisito */
  @ManyToOne(() => Rotulo, (rotulo) => rotulo.requisitos, { 
    nullable: false 
  })
  @JoinColumn({ name: "Rotulo_ID" }) // ✅ FK explícita
  rotuloRef!: Rotulo;
}
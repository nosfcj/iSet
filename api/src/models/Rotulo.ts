import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Requisito } from "./Requisito";

/**
 * Entidade que representa um rótulo para categorizar pré-requisitos de serviços.
 * Cada rótulo pode estar associado a múltiplos requisitos.
 */
@Entity("Rotulo")
export class Rotulo {
  /** Identificador único do rótulo (Chave Primária) */
  @PrimaryGeneratedColumn({ comment: "Identificador único do rótulo" })
  ID!: number;

  /** Status: 0 - Inativo, 1 - Ativo */
  @Column({ 
    type: "tinyint", 
    default: 1, 
    comment: "Status: 0 - Inativo, 1 - Ativo" 
  })
  status!: number;

  /** Nome do rótulo (ex: 'Documentos Obrigatórios') */
  @Column({ 
    type: "varchar", 
    length: 255, 
    nullable: false, 
    comment: "Rótulo com o título do pré-requisito para padronização de conteúdos" 
  })
  rotulo!: string;

  // --- RELACIONAMENTOS ---

  /** Requisitos categorizados por este rótulo */
  @OneToMany(() => Requisito, (requisito) => requisito.rotuloRef)
  requisitos!: Requisito[];
}
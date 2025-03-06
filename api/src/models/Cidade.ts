import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Local } from "./Local";

/**
 * Entidade que representa uma cidade cadastrada no sistema.
 * Cada cidade pode ter vários locais de atendimento associados.
 */
@Entity("Cidade")
export class Cidade {
  /** Identificador único da cidade (Chave Primária) */
  @PrimaryGeneratedColumn({ comment: "Identificador único da cidade" })
  ID!: number;

  /** Status: 0 - Inativa, 1 - Ativa */
  @Column({ 
    type: "tinyint", 
    default: 1, 
    comment: "Status: 0 - Inativa, 1 - Ativa" 
  })
  status!: number;

  /** Nome da cidade (ex: 'São Paulo') */
  @Column({ 
    type: "text", 
    nullable: false, 
    comment: "Nome da cidade" 
  })
  nome!: string;

  /** Nome do estado (ex: 'SP') */
  @Column({ 
    type: "text", 
    nullable: false, 
    comment: "Nome do estado onde a cidade está localizada" 
  })
  estado!: string;

  // --- RELACIONAMENTOS ---

  /** Locais de atendimento nesta cidade */
  @OneToMany(() => Local, (local) => local.cidadeRef)
  locais!: Local[];
}
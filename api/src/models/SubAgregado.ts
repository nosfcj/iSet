import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Agregador } from "./Agregador";
import { Local } from "./Local";

/**
 * Entidade que representa um sub-agregador de serviços (ex: setor dentro de uma central).
 * Cada sub-agregador pertence a um agregador principal e pode conter vários locais.
 */
@Entity("SubAgregado")
export class SubAgregado {
  /** Identificador único do sub-agregador (Chave Primária) */
  @PrimaryGeneratedColumn({ comment: "Identificador único do sub-agregador" })
  ID!: number;

  /** Status: 0 - Desativado, 1 - Ativado */
  @Column({ 
    type: "tinyint", 
    default: 1, 
    comment: "Status: 0 - Desativado, 1 - Ativado" 
  })
  status!: number;

  /** Nome do sub-agregador (ex: 'Setor de Atendimento Prioritário') */
  @Column({ 
    type: "text", 
    nullable: false, 
    comment: "Nome do sub-agregador de serviços" 
  })
  nome!: string;

  // --- RELACIONAMENTOS ---

  /** Agregador principal ao qual este sub-agregador pertence */
  @ManyToOne(() => Agregador, (agregador) => agregador.subAgregados, { 
    nullable: false 
  })
  @JoinColumn({ name: "Agregador_ID" }) // ✅ FK explícita
  agregadorRef!: Agregador;

  /** Locais associados a este sub-agregador */
  @OneToMany(() => Local, (local) => local.subAgregadoRef)
  locais!: Local[];
}
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm";
import { SubAgregado } from "./SubAgregado";
import { Local } from "./Local";

/**
 * Entidade que representa um agregador de serviços (ex: central de atendimento).
 * Um agregador pode conter sub-agregadores e estar vinculado a vários locais.
 */
@Entity("Agregador")
export class Agregador {
  /** Identificador único do agregador (Chave Primária) */
  @PrimaryGeneratedColumn({ comment: "Identificador único do agregador" })
  ID!: number;

  /** Status: 0 - Desativado, 1 - Ativado */
  @Column({ 
    type: "tinyint", 
    default: 1, 
    comment: "Status: 0 - Desativado, 1 - Ativado" 
  })
  status!: number;

  /** Nome do agregador (ex: 'Central Norte') */
  @Column({ 
    type: "varchar", 
    length: 45, 
    nullable: false, 
    comment: "Nome do agregador de serviços" 
  })
  nome!: string;

  // --- RELACIONAMENTOS ---

  /** Sub-agregadores vinculados (ex: setores da central) */
  @OneToMany(() => SubAgregado, (subAgregado) => subAgregado.agregadorRef)
  @JoinColumn({ name: "Agregador_ID" }) // ✅ FK explícita
  subAgregados!: SubAgregado[];

  /** Locais associados a este agregador */
  @OneToMany(() => Local, (local) => local.agregadorRef)
  locais!: Local[];
}
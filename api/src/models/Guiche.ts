import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Local } from "./Local";
import { Usuario } from "./Usuario";
import { Acao } from "./Acao";

/**
 * Entidade que representa um guichê de atendimento dentro de um local.
 * Cada guichê está vinculado a um local e pode ser operado por um usuário.
 */
@Entity("Guiche")
export class Guiche {
  /** Identificador único do guichê (Chave Primária) */
  @PrimaryGeneratedColumn({ comment: "Identificador único do guichê" })
  ID!: number;

  /** Status: 0 - Indisponível, 1 - Disponível */
  @Column({ 
    type: "tinyint", 
    default: 1, 
    comment: "Status: 0 - Indisponível, 1 - Disponível" 
  })
  status!: number;

  /** Número do guichê (ex: 001, 002) */
  @Column({ 
    type: "int", 
    width: 3, 
    nullable: false, 
    comment: "Número do guichê (formato 000)" 
  })
  numero!: number;

  // --- RELACIONAMENTOS ---

  /** Local onde o guichê está instalado */
  @ManyToOne(() => Local, (local) => local.guiches, { 
    nullable: false 
  })
  @JoinColumn({ name: "Local_ID" }) // ✅ FK explícita
  localRef!: Local;

  /** Usuário responsável pelo atendimento neste guichê */
  @ManyToOne(() => Usuario, (usuario) => usuario.guiches, { 
    nullable: false 
  })
  @JoinColumn({ name: "Usuario_ID" }) // ✅ FK explícita
  usuarioRef!: Usuario;

  /** Ações de atendimento realizadas neste guichê */
  @OneToMany(() => Acao, (acao) => acao.guicheRef)
  acoes!: Acao[];
}
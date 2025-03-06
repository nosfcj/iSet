import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Usuario } from "./Usuario";

/**
 * Entidade que registra eventos importantes no sistema para fins de auditoria.
 * Cada registro está associado a um usuário que realizou a ação.
 */
@Entity("Auditoria")
export class Auditoria {
  /** Identificador único do registro de auditoria (Chave Primária) */
  @PrimaryGeneratedColumn()
  ID!: number;

  /** Código do evento de auditoria */
  @Column({ type: "varchar", length: 45, nullable: false, comment: "Código do evento de auditoria" })
  codigo!: string;

  /** Timestamp do evento registrado */
  @Column({ type: "timestamp", nullable: true, comment: "Data e hora do evento registrado" })
  timestamp?: Date;

  /** 
   * Relação N:1 - Muitos registros de auditoria pertencem a um único usuário. 
   */
  @ManyToOne(() => Usuario, (usuario) => usuario.auditorias, { nullable: false, onDelete: "NO ACTION", onUpdate: "NO ACTION" })
  usuarioRef!: Usuario;
}

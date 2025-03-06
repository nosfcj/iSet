import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Servico } from "./Servico";
import { Local } from "./Local";
import { Usuario } from "./Usuario";

/**
 * Entidade que representa um órgão cadastrado no sistema.
 * Um órgão pode oferecer serviços, ter locais de atendimento e usuários associados.
 */
@Entity("Orgao")
export class Orgao {
  /** Identificador único do órgão (Chave Primária) */
  @PrimaryGeneratedColumn({ comment: "Identificador único do órgão" })
  ID!: number;

  /** Status: 0 - Inativo, 1 - Ativo */
  @Column({ 
    type: "tinyint", 
    default: 1, 
    comment: "Status: 0 - Inativo, 1 - Ativo" 
  })
  status!: number;

  /** Nome do órgão (ex: 'Secretaria da Saúde') */
  @Column({ 
    type: "varchar", 
    length: 45, 
    nullable: false, 
    comment: "Nome do órgão no sistema" 
  })
  nome!: string;

  // --- RELACIONAMENTOS ---

  /** Serviços oferecidos por este órgão */
  @OneToMany(() => Servico, (servico) => servico.orgaoRef)
  servicos!: Servico[];

  /** Locais de atendimento vinculados a este órgão */
  @OneToMany(() => Local, (local) => local.orgaoRef)
  locais!: Local[];

  /** Usuários associados a este órgão */
  @OneToMany(() => Usuario, (usuario) => usuario.orgaoRef)
  usuarios!: Usuario[];
}
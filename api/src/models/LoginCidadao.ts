import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Cidadao } from "./Cidadao";

/**
 * Entidade que armazena as credenciais de login dos cidadãos.
 * Cada cidadão possui um único login vinculado ao seu CPF.
 */
@Entity("LoginCidadao")
export class LoginCidadao {
  /** ID do cidadão (Chave Primária e Estrangeira) */
  @PrimaryColumn({ 
    name: "Cidadao_ID", 
    comment: "ID do cidadão vinculado ao login" 
  })
  cidadaoId!: number;

  /** CPF único do cidadão (com formatação) */
  @Column({ 
    type: "varchar", 
    length: 32, 
    unique: true, 
    nullable: false, 
    comment: "CPF formatado (ex: 123.456.789-09)" 
  })
  CPF!: string;

  /** Senha criptografada (default 'Default' até ser alterada) */
  @Column({ 
    type: "varchar", 
    length: 32, 
    default: "Default", 
    comment: "Senha criptografada. Valor padrão: 'Default'" 
  })
  senha!: string;

  /** 
   * Relação 1:1 - Cada login pertence a um único cidadão. 
   * A FK é a própria PK (Cidadao_ID).
   */
  @OneToOne(() => Cidadao, (cidadao) => cidadao.login, { 
    nullable: false, 
    onDelete: "NO ACTION" 
  })
  @JoinColumn({ name: "Cidadao_ID" }) // ✅ Define a coluna FK/PK
  cidadaoRef!: Cidadao;
}
import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Usuario } from "./Usuario";

/**
 * Entidade que armazena as credenciais de login dos usuários do sistema.
 * Cada usuário possui um único login vinculado à sua conta.
 */
@Entity("LoginUsuario")
export class LoginUsuario {
  /** ID do usuário (Chave Primária e Estrangeira) */
  @PrimaryColumn({ 
    name: "Usuario_ID", 
    comment: "ID do usuário vinculado ao login" 
  })
  usuarioId!: number;

  /** Nome de usuário único no sistema */
  @Column({ 
    type: "text", 
    nullable: false, 
    comment: "Nome de usuário para autenticação" 
  })
  usuario!: string;

  /** Senha criptografada */
  @Column({ 
    type: "text", 
    nullable: false, 
    comment: "Senha criptografada para segurança" 
  })
  senha!: string;

  /** 
   * Relação 1:1 - Cada login pertence a um único usuário. 
   * A FK é a própria PK (Usuario_ID).
   */
  @OneToOne(() => Usuario, (usuario) => usuario.login, { 
    nullable: false, 
    onDelete: "NO ACTION" 
  })
  @JoinColumn({ name: "Usuario_ID" }) // ✅ Define a coluna FK/PK
  usuarioRef!: Usuario;
}
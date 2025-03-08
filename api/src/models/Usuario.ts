import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { Orgao } from "./Orgao";
import { Atendimento } from "./Atendimento";
import { Guiche } from "./Guiche";
import { Acao } from "./Acao";
import { Auditoria } from "./Auditoria";
import { Dispositivo } from "./Dispositivo";
import { Monitor } from "./Monitor";
import { LoginUsuario } from "./LoginUsuario";

/**
 * Entidade que representa os usuários do sistema.
 * Cada usuário pertence a um órgão e pode atuar em atendimentos, guichês e auditorias.
 */
@Entity("Usuario")
export class Usuario {
  /** Identificador único do usuário (Chave Primária) */
  @PrimaryGeneratedColumn({ comment: "Identificador único do usuário" })
  ID!: number;

  /** Status do usuário: 0 - Inativo, 1 - Ativo */
  @Column({ 
    type: "tinyint", 
    default: 1, 
    comment: "Status do usuário: 0 - Inativo, 1 - Ativo" 
  })
  status!: number;

  /** Disponibilidade para atendimento: 0 - Indisponível, 1 - Disponível */
  @Column({ 
    type: "tinyint", 
    default: 1, 
    comment: "Disponibilidade para atendimento: 0 - Indisponível, 1 - Disponível" 
  })
  disponibilidade!: number;

  /** 
   * Nível de acesso: 0 - Cidadão, 1 - Administrador, 2 - Atendente, 3 - Supervisor, 4 - Editor, 5 - Gestor 
   */
  @Column({ 
    type: "int", 
    nullable: false, 
    comment: "Nível de acesso: 0 - Cidadão, 1 - Administrador, 2 - Atendente, 3 - Supervisor, 4 - Editor, 5 - Gestor" 
  })
  nivel!: number;

  /** Nome completo do usuário */
  @Column({ 
    type: "varchar", 
    length: 45, 
    nullable: false, 
    comment: "Nome completo do usuário" 
  })
  nome!: string;

  // --- RELACIONAMENTOS ---

  /** Órgão ao qual o usuário pertence */
  @ManyToOne(() => Orgao, (orgao) => orgao.usuarios, { 
    nullable: false, 
    onDelete: "NO ACTION" 
  })
  @JoinColumn({ name: "Orgao_ID" }) // ✅ FK explícita
  orgaoRef!: Orgao;

  /** Atendimentos registrados por este usuário */
  @OneToMany(() => Atendimento, (atendimento) => atendimento.usuarioRef)
  atendimentos!: Atendimento[];

  /** Guichês operados por este usuário */
  @OneToMany(() => Guiche, (guiche) => guiche.usuarioRef)
  guiches!: Guiche[];

  /** Ações de atendimento executadas por este usuário */
  @OneToMany(() => Acao, (acao) => acao.usuarioRef)
  acoes!: Acao[];

  /** Auditorias geradas por este usuário */
  @OneToMany(() => Auditoria, (auditoria) => auditoria.usuarioRef)
  auditorias!: Auditoria[];

  /** Dispositivos cadastrados por este usuário */
  @OneToMany(() => Dispositivo, (dispositivo) => dispositivo.usuarioRef)
  dispositivos!: Dispositivo[];

  /** Monitores de senha cadastrados por este usuário */
  @OneToMany(() => Monitor, (monitor) => monitor.usuarioRef)
  monitores!: Monitor[];

  /** Credencial de login associada a este usuário (1:1) */
  @OneToOne(() => LoginUsuario, (login) => login.usuarioRef)
  login!: LoginUsuario; // ✅ Relação 1:1
}
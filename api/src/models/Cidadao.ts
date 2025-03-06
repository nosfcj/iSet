import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from "typeorm";
import { Atendimento } from "./Atendimento";
import { Dispositivo } from "./Dispositivo";
import { LoginCidadao } from "./LoginCidadao";

/**
 * Entidade que representa um cidadão cadastrado no sistema.
 * Um cidadão pode solicitar atendimentos, possuir dispositivos registrados e ter um login associado.
 */
@Entity("Cidadao")
export class Cidadao {
  /** Identificador único do cidadão (Chave Primária) */
  @PrimaryGeneratedColumn({ comment: "Identificador único do cidadão" })
  ID!: number;

  /** Nome completo do cidadão */
  @Column({ 
    type: "text", 
    nullable: false, 
    comment: "Nome completo do cidadão" 
  })
  nome!: string;

  /** Status: 0 - Inativo, 1 - Ativo */
  @Column({ 
    type: "tinyint", 
    default: 1, 
    comment: "Status: 0 - Inativo, 1 - Ativo" 
  })
  status!: number;

  /** Cidade de residência (opcional) */
  @Column({ 
    type: "text", 
    nullable: true, 
    comment: "Cidade de residência do cidadão" 
  })
  cidade?: string;

  /** Telefones de contato (separados por ';') */
  @Column({ 
    type: "text", 
    nullable: true, 
    comment: "Telefones do cidadão, separados por ponto e vírgula" 
  })
  telefone?: string;

  /** Email do cidadão (opcional) */
  @Column({ 
    type: "text", 
    nullable: true, 
    comment: "Endereço de email do cidadão" 
  })
  email?: string;

  /** Dados de autenticação via redes sociais (JSON) */
  @Column({ 
    type: "text", 
    nullable: true, 
    comment: "Dados de autenticação via Google ou Facebook (formato JSON)" 
  })
  auth0?: string;

  /** Data/hora do cadastro */
  @Column({ 
    type: "timestamp", 
    default: () => "CURRENT_TIMESTAMP", 
    comment: "Data e hora do cadastro do cidadão" 
  })
  dataHoraCadastro!: Date;

  /** Prioridade: NULL - Sem prioridade, 1 - Idoso, 2 - Patologia */
  @Column({ 
    type: "int", 
    nullable: true, 
    comment: "Prioridade no atendimento: 1 - Idoso, 2 - Patologia" 
  })
  prioridade?: number;

  /** Data de nascimento (opcional) */
  @Column({ 
    type: "date", 
    nullable: true, 
    comment: "Data de nascimento do cidadão" 
  })
  dataNascimento?: Date;

  /** Último acesso ao sistema */
  @Column({ 
    type: "timestamp", 
    nullable: true, 
    default: () => "CURRENT_TIMESTAMP", 
    comment: "Último acesso do cidadão ao sistema" 
  })
  ultimoAcesso?: Date;

  // --- RELACIONAMENTOS ---

  /** Atendimentos solicitados pelo cidadão */
  @OneToMany(() => Atendimento, (atendimento) => atendimento.cidadaoRef)
  atendimentos!: Atendimento[];

  /** Dispositivos cadastrados pelo cidadão */
  @OneToMany(() => Dispositivo, (dispositivo) => dispositivo.cidadaoRef)
  dispositivos!: Dispositivo[];

  /** Credencial de login do cidadão (1:1) */
  @OneToOne(() => LoginCidadao, (login) => login.cidadaoRef)
  login!: LoginCidadao;
}
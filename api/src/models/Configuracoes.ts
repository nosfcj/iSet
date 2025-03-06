import { Entity, PrimaryColumn, Column } from "typeorm";

/**
 * Entidade que armazena configurações globais do sistema.
 * Como é uma tabela de configuração única, não possui chave primária auto incrementável.
 */
@Entity("Configuracoes")
export class Configuracoes {
  /** Identificador único da configuração (sempre terá um único registro) */
  @PrimaryColumn()
  ID!: number;

  /** Quantidade de senhas exibidas no monitor de chamadas */
  @Column({ type: "int", width: 2, nullable: false, comment: "Quantidade de senhas exibidas no monitor de chamadas" })
  qtdSenhasExibidasNoMonitor!: number;
}

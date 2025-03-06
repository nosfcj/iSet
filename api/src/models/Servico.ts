import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Orgao } from "./Orgao";
import { Acao } from "./Acao";
import { Conteudo } from "./Conteudo";

/**
 * Entidade que representa um serviço oferecido por um órgão.
 * Cada serviço pertence a um órgão e pode estar relacionado a várias ações e conteúdos.
 */
@Entity("Servico")
export class Servico {
  /** Identificador único do serviço */
  @PrimaryGeneratedColumn({ comment: "Identificador único do serviço" })
  ID!: number;

  /** Status: 0 - Desativado, 1 - Disponível */
  @Column({ 
    type: "tinyint", 
    default: 1, 
    comment: "Status: 0 - Desativado, 1 - Disponível" 
  })
  status!: number;

  /** Prefixo da senha (3 letras) */
  @Column({ 
    type: "varchar", 
    length: 5, 
    nullable: false, 
    comment: "Identificação do serviço para composição de senhas" 
  })
  identificacao!: string;

  /** Nome completo do serviço */
  @Column({ 
    type: "varchar", 
    length: 255, 
    nullable: false, 
    comment: "Título descritivo do serviço" 
  })
  titulo!: string;

  // --- RELACIONAMENTOS ---

  /** Órgão responsável pelo serviço */
  @ManyToOne(() => Orgao, (orgao) => orgao.servicos, { 
    nullable: false 
  })
  @JoinColumn({ name: "Orgao_ID" }) // ✅ FK explícita
  orgaoRef!: Orgao;

  /** Ações vinculadas a este serviço */
  @OneToMany(() => Acao, (acao) => acao.servicoRef)
  acoes!: Acao[];

  /** Conteúdos relacionados a este serviço */
  @OneToMany(() => Conteudo, (conteudo) => conteudo.servicoRef)
  conteudos!: Conteudo[];
}
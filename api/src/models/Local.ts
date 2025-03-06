import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Orgao } from "./Orgao";
import { Cidade } from "./Cidade";
import { Agregador } from "./Agregador";
import { SubAgregado } from "./SubAgregado";
import { Conteudo } from "./Conteudo";
import { Atendimento } from "./Atendimento";
import { Guiche } from "./Guiche";

/**
 * Entidade que representa um local de atendimento de um serviço.
 * Cada local pertence a um órgão e pode estar associado a um agregador e sub-agregador.
 */
@Entity("Local")
export class Local {
  /** Identificador único do local (Chave Primária) */
  @PrimaryGeneratedColumn({ comment: "Identificador único do local" })
  ID!: number;

  /** Status: 0 - Desativado, 1 - Ativado */
  @Column({ 
    type: "tinyint", 
    default: 1, 
    comment: "Status: 0 - Desativado, 1 - Ativado" 
  })
  status!: number;

  /** Endereço físico do local */
  @Column({ 
    type: "text", 
    nullable: true, 
    comment: "Endereço completo do local de atendimento" 
  })
  endereco?: string;

  /** Link do Google Maps para a localização */
  @Column({ 
    type: "text", 
    nullable: true, 
    comment: "Link do Google Maps com a localização exata" 
  })
  linkMaps?: string;

  /** Telefones de contato (separados por ';') */
  @Column({ 
    type: "text", 
    nullable: true, 
    comment: "Telefones do local, separados por ponto e vírgula" 
  })
  telefone?: string;

  /** CEP do local */
  @Column({ 
    type: "varchar", 
    length: 15, 
    nullable: true, 
    comment: "CEP do local de atendimento" 
  })
  CEP?: string;

  // --- RELACIONAMENTOS ---

  /** Órgão responsável pelo local */
  @ManyToOne(() => Orgao, (orgao) => orgao.locais, { 
    nullable: false 
  })
  @JoinColumn({ name: "Orgao_ID" }) // ✅ FK explícita
  orgaoRef!: Orgao;

  /** Cidade onde o local está situado */
  @ManyToOne(() => Cidade, (cidade) => cidade.locais, { 
    nullable: false 
  })
  @JoinColumn({ name: "Cidade_ID" }) // ✅ FK explícita
  cidadeRef!: Cidade;

  /** Agregador associado (opcional) */
  @ManyToOne(() => Agregador, (agregador) => agregador.locais, { 
    nullable: true 
  })
  @JoinColumn({ name: "Agregador_ID" }) // ✅ FK explícita
  agregadorRef?: Agregador;

  /** Sub-agregador associado (opcional) */
  @ManyToOne(() => SubAgregado, (subAgregado) => subAgregado.locais, { 
    nullable: true 
  })
  @JoinColumn({ name: "SubAgregado_ID" }) // ✅ FK explícita
  subAgregadoRef?: SubAgregado;

  /** Conteúdos disponíveis neste local */
  @OneToMany(() => Conteudo, (conteudo) => conteudo.localRef)
  conteudos!: Conteudo[];

  /** Atendimentos realizados neste local */
  @OneToMany(() => Atendimento, (atendimento) => atendimento.localRef)
  atendimentos!: Atendimento[];

  /** Guichês disponíveis neste local */
  @OneToMany(() => Guiche, (guiche) => guiche.localRef)
  guiches!: Guiche[];
}
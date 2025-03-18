/**
 * Local Entity
 * @file api/src/models/Local.ts
 * @lastModified 2025-03-18 20:20:07
 * @modifiedBy nosfcj
 * @description Entidade que representa os locais de atendimento de serviços
 */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Unidade } from './Unidade';
import { Agregador } from './Agregador';
import { SubAgregador } from './SubAgregador';
import { Cidade } from './Cidade';
import { Conteudo } from './Conteudo';
import { Guiche } from './Guiche';
import { Atendimento } from './Atendimento';

/**
 * Enum para status do local
 */
export enum LocalStatus {
  DESATIVADO = 0,
  ATIVO = 1
}

@Entity({
  name: 'Local',
  comment: 'Contém informações dos locais físicos onde são prestados os serviços de atendimento'
})
export class Local {
  @PrimaryGeneratedColumn({
    name: 'ID',
    type: 'int',
    comment: 'Identificador único do local'
  })
  id!: number;

  @Column({
    name: 'status',
    type: 'tinyint',
    nullable: false,
    default: LocalStatus.ATIVO,
    comment: 'Status: 0-desativado, 1-ativo',
    enum: LocalStatus
  })
  status!: LocalStatus;

  @Column({
    name: 'endereco',
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: 'Endereço físico completo do local de atendimento'
  })
  endereco!: string | null;

  @Column({
    name: 'linkMaps',
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: 'Link do Google Maps para localização do estabelecimento'
  })
  linkMaps!: string | null;

  @Column({
    name: 'telefone',
    type: 'text',
    nullable: true,
    comment: 'Lista de telefones separados por ponto e vírgula (;)'
  })
  telefone!: string | null;

  @Column({
    name: 'CEP',
    type: 'varchar',
    length: 15,
    nullable: true,
    comment: 'CEP do local no formato 00000-000'
  })
  cep!: string | null;

  @Column({
    name: 'Orgao_ID',
    type: 'int',
    nullable: false,
    comment: 'ID da unidade (órgão) ao qual este local pertence'
  })
  unidadeId!: number;

  @Column({
    name: 'Agregador_ID',
    type: 'int',
    nullable: false,
    comment: 'ID do agregador ao qual este local está vinculado'
  })
  agregadorId!: number;

  @Column({
    name: 'SubAgregador_ID',
    type: 'int',
    nullable: true,
    comment: 'ID do subagregador ao qual este local está vinculado (opcional)'
  })
  subAgregadorId!: number | null;

  @Column({
    name: 'Cidade_ID',
    type: 'int',
    nullable: false,
    comment: 'ID da cidade onde o local está situado'
  })
  cidadeId!: number;

  // Relação com Unidade (anteriormente Orgao)
  @ManyToOne(() => Unidade, (unidade: Unidade) => unidade.locais, { nullable: false })
  @JoinColumn({ name: 'Orgao_ID' })
  unidade!: Unidade;

  // Relação com Agregador
  @ManyToOne(() => Agregador, (agregador: Agregador) => agregador.locais, { nullable: false })
  @JoinColumn({ name: 'Agregador_ID' })
  agregador!: Agregador;

  // Relação com SubAgregador (opcional)
  @ManyToOne(() => SubAgregador, (subAgregador: SubAgregador) => subAgregador.locais, { nullable: true })
  @JoinColumn({ name: 'SubAgregador_ID' })
  subAgregador!: SubAgregador | null;

  // Relação com Cidade
  @ManyToOne(() => Cidade, (cidade: Cidade) => cidade.locais, { nullable: false })
  @JoinColumn({ name: 'Cidade_ID' })
  cidade!: Cidade;

  // Relação com Conteudo
  @OneToMany(() => Conteudo, (conteudo: Conteudo) => conteudo.local)
  conteudos!: Conteudo[];

  // Relação com Guiche
  @OneToMany(() => Guiche, (guiche: Guiche) => guiche.local)
  guiches!: Guiche[];

  // Relação com Atendimento
  @OneToMany(() => Atendimento, (atendimento: Atendimento) => atendimento.local)
  atendimentos!: Atendimento[];
}
/**
 * Servico Entity
 * @file api/src/models/Servico.ts
 * @lastModified 2025-03-18 16:58:01
 * @modifiedBy nosfcj
 * @description Entidade que representa os serviços disponibilizados pelas unidades
 */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Unidade } from './Unidade';
import { Conteudo } from './Conteudo';
import { Direcionamento } from './Direcionamento';
import { Acao } from './Acao';

/**
 * Enum para status do serviço
 */
export enum ServicoStatus {
  DESATIVADO = 0,
  DISPONIVEL = 1
}

@Entity({ 
  name: 'Servico',
  comment: 'Contém informações sobre os serviços disponibilizados pelas unidades'
})
export class Servico {
  @PrimaryGeneratedColumn({ 
    name: 'ID',
    type: 'int',
    comment: 'Identificador único do serviço'
  })
  id!: number;

  @Column({
    name: 'status',
    type: 'tinyint',
    nullable: false,
    default: ServicoStatus.DISPONIVEL,
    comment: 'Status: 0 - desativado, 1 - disponível',
    enum: ServicoStatus
  })
  status!: ServicoStatus;

  @Column({
    name: 'titulo',
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'Título do serviço disponibilizado'
  })
  titulo!: string;

  @Column({
    name: 'rotulo',
    type: 'varchar',
    length: 5,
    nullable: true,
    unique: true,
    comment: 'Rótulo no formato "LLLLL" que compõe a identificação da senha no ticket'
  })
  rotulo!: string | null;

  @Column({
    name: 'Unidade_ID',
    type: 'int',
    nullable: false,
    comment: 'ID da unidade que oferece este serviço'
  })
  unidadeId!: number;

  // Relação com Unidade
  @ManyToOne(() => Unidade, (unidade: Unidade) => unidade.servicos)
  @JoinColumn({ name: 'Unidade_ID' })
  unidade!: Unidade;

  // Relação com Acao
  @OneToMany(() => Acao, (acao: Acao) => acao.servico)
  acoes!: Acao[];

  // Relação com Conteudo
  @OneToMany(() => Conteudo, (conteudo: Conteudo) => conteudo.servico)
  conteudos!: Conteudo[];

  // Relação com Direcionamento
  @OneToMany(() => Direcionamento, (direcionamento: Direcionamento) => direcionamento.servico)
  direcionamentos!: Direcionamento[];
}
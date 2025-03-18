/**
 * Requisito Entity
 * @file api/src/models/Requisito.ts
 * @lastModified 2025-03-18 19:04:59
 * @modifiedBy nosfcj
 * @description Entidade que representa os pré-requisitos necessários para os serviços
 */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Conteudo } from './Conteudo';
import { Rotulo } from './Rotulo';

/**
 * Enum para status do requisito
 */
export enum RequisitoStatus {
  INDISPONIVEL = 0,
  DISPONIVEL = 1
}

@Entity({ 
  name: 'Requisito',
  comment: 'Contém informações sobre os pré-requisitos dos serviços oferecidos ao cidadão'
})
export class Requisito {
  @PrimaryGeneratedColumn({ 
    name: 'ID',
    type: 'int',
    comment: 'Identificador único do requisito'
  })
  id!: number;

  @Column({
    name: 'status',
    type: 'tinyint',
    default: RequisitoStatus.DISPONIVEL,
    nullable: false,
    comment: 'Status de disponibilidade: 0-indisponível, 1-disponível',
    enum: RequisitoStatus
  })
  status!: RequisitoStatus;

  @Column({
    name: 'conteudo',
    type: 'text',
    nullable: false,
    comment: 'Descrição detalhada do pré-requisito do serviço'
  })
  conteudo!: string;

  @Column({
    name: 'Conteudo_ID',
    type: 'int',
    nullable: false,
    comment: 'ID do conteúdo ao qual este requisito pertence'
  })
  conteudoId!: number;

  @Column({
    name: 'Rotulo_ID',
    type: 'int',
    nullable: false,
    comment: 'ID do rótulo associado a este requisito'
  })
  rotuloId!: number;

  // Relação com Conteudo (obrigatória)
  @ManyToOne(() => Conteudo, (conteudo: Conteudo) => conteudo.requisitos)
  @JoinColumn({ name: 'Conteudo_ID' })
  conteudoRelacionado!: Conteudo;

  // Relação com Rotulo (obrigatória)
  @ManyToOne(() => Rotulo, (rotulo: Rotulo) => rotulo.requisitos)
  @JoinColumn({ name: 'Rotulo_ID' })
  rotulo!: Rotulo;
}
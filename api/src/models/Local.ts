import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Unidade } from './Unidade';
import { Agregador } from './Agregador';
import { SubAgregador } from './SubAgregador';
import { Cidade } from './Cidade';
import { Conteudo } from './Conteudo';
import { Guiche } from './Guiche';
import { Atendimento } from './Atendimento';

@Entity({
  name: 'Local',
  comment: 'Locais de atendimento de serviços'
})
export class Local {
  @PrimaryGeneratedColumn({
    name: 'ID',
    type: 'int'
  })
  id!: number;

  @Column({
    name: 'status',
    type: 'tinyint',
    nullable: false,
    default: 1,
    comment: 'Status: 0 - desativado, 1 - ativo'
  })
  status!: number;

  @Column({
    name: 'endereco',
    type: 'text',
    nullable: true,
    comment: 'Endereço físico do local'
  })
  endereco!: string | null;

  @Column({
    name: 'linkMaps',
    type: 'text',
    nullable: true,
    comment: 'Link do Google Maps'
  })
  linkMaps!: string | null;

  @Column({
    name: 'telefone',
    type: 'text',
    nullable: true,
    comment: 'Telefones (separados por ";")'
  })
  telefone!: string | null;

  @Column({
    name: 'CEP',
    type: 'varchar',
    length: 15,
    nullable: true,
    comment: 'CEP do local'
  })
  cep!: string | null;

  @Column({
    name: 'Orgao_ID',
    type: 'int',
    nullable: false
  })
  orgaoId!: number;

  @Column({
    name: 'Agregador_ID',
    type: 'int',
    nullable: false
  })
  agregadorId!: number;

  @Column({
    name: 'SubAgregador_ID',
    type: 'int',
    nullable: true
  })
  subAgregadorId!: number | null;

  @Column({
    name: 'Cidade_ID',
    type: 'int',
    nullable: false
  })
  cidadeId!: number;

  // Relação com Orgao (ManyToOne)
  @ManyToOne(() => Unidade)
  @JoinColumn({ name: 'Orgao_ID' })
  unidade!: Unidade;

  // Relação com Agregador (ManyToOne)
  @ManyToOne(() => Agregador, (agregador) => agregador.locais)
  @JoinColumn({ name: 'Agregador_ID' })
  agregador!: Agregador;

  // Relação com SubAgregador (ManyToOne - opcional)
  @ManyToOne(() => SubAgregador, (subAgregador) => subAgregador.locais, { nullable: true })
  @JoinColumn({ name: 'SubAgregador_ID' })
  subAgregador!: SubAgregador | null;

  // Relação com Cidade (ManyToOne)
  @ManyToOne(() => Cidade)
  @JoinColumn({ name: 'Cidade_ID' })
  cidade!: Cidade;

  // Relação com Conteudo (OneToMany)
  @OneToMany(() => Conteudo, (conteudo) => conteudo.local)
  conteudos!: Conteudo[];

  // Relação com Guiche (OneToMany)
  @OneToMany(() => Guiche, (guiche) => guiche.local)
  guiches!: Guiche[];

  // Relação com Atendimento (OneToMany)
  @OneToMany(() => Atendimento, (atendimento) => atendimento.local)
  atendimentos!: Atendimento[];
}

/**
 * @lastModified 2025-03-17 23:29:00
 * @modifiedBy nosfcj
 */
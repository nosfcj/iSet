import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Orgao } from './Orgao';
import { Agregador } from './Agregador';
import { SubAgregado } from './SubAgregado';
import { Cidade } from './Cidade';
import { Conteudo } from './Conteudo'; // Importe a entidade Conteudo
import { Guiche } from './Guiche';
import { Atendimento } from './Atendimento';

@Entity({ name: 'Local', comment: 'Locais de atendimento de serviços' })
export class Local {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({
    type: 'tinyint',
    default: 1,
    comment: 'Status: 0 - desativado, 1 - ativo',
  })
  status!: number;

  @Column({
    type: 'text',
    nullable: true,
    comment: 'Endereço físico do local',
  })
  endereco!: string | null;

  @Column({
    type: 'text',
    name: 'linkMaps',
    nullable: true,
    comment: 'Link do Google Maps',
  })
  linkMaps!: string | null;

  @Column({
    type: 'text',
    nullable: true,
    comment: 'Telefones (separados por ";")',
  })
  telefone!: string | null;

  @Column({
    type: 'varchar',
    length: 15,
    name: 'CEP',
    nullable: true,
    comment: 'CEP do local',
  })
  cep!: string | null;

  // Relação com Orgao (ManyToOne)
  @ManyToOne(() => Orgao, (orgao) => orgao.locais)
  @JoinColumn({ name: 'Orgao_ID' })
  orgao!: Orgao;

  // Relação com Agregador (ManyToOne)
  @ManyToOne(() => Agregador, (agregador) => agregador.locais)
  @JoinColumn({ name: 'Agregador_ID' })
  agregador!: Agregador;

  // Relação com SubAgregado (ManyToOne - opcional)
  @ManyToOne(() => SubAgregado, (subAgregado) => subAgregado.locais, { nullable: true })
  @JoinColumn({ name: 'SubAgregado_ID' })
  subAgregado!: SubAgregado | null;

  // Relação com Cidade (ManyToOne)
  @ManyToOne(() => Cidade, (cidade) => cidade.locais)
  @JoinColumn({ name: 'Cidade_ID' })
  cidade!: Cidade;

  // Adicione esta relação com Conteudo (OneToMany)
  @OneToMany(() => Conteudo, (conteudo) => conteudo.local)
  conteudos!: Conteudo[]; // Propriedade faltante

  // Relação com Guiche (OneToMany)
  @OneToMany(() => Guiche, (guiche) => guiche.local)
  guiches!: Guiche[]; // Propriedade faltante

  // Adicione esta relação com Conteudo (OneToMany)
  @OneToMany(() => Atendimento, (atendendo) => atendendo.local)
  atendimentos!: Atendimento[]; // Propriedade faltante


}
/**
 * Cidadao Entity
 * @file api/src/models/Cidadao.ts
 * @lastModified 2025-03-18 19:30:12
 * @modifiedBy nosfcj
 * @description Entidade que representa os cidadãos que buscam atendimento nos órgãos
 */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { Atendimento } from './Atendimento';
import { LoginCidadao } from './LoginCidadao';
import { Dispositivo } from './Dispositivo';

/**
 * Enum para prioridade do cidadão
 */
export enum CidadaoPrioridade {
  IDOSO = 1,
  PATOLOGIA = 2
}

@Entity({ 
  name: 'Cidadao',
  comment: 'Contém informações dos cidadãos que buscam atendimento nos órgãos'
})
export class Cidadao {
  @PrimaryGeneratedColumn({ 
    name: 'ID',
    type: 'int',
    comment: 'Identificador único do cidadão'
  })
  id!: number;

  @Column({
    name: 'nome',
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'Nome completo do cidadão'
  })
  nome!: string;

  @Column({
    name: 'cidade',
    type: 'varchar',
    length: 100,
    nullable: true,
    comment: 'Cidade de residência do cidadão'
  })
  cidade!: string | null;

  @Column({
    name: 'telefone',
    type: 'text',
    nullable: true,
    comment: 'Lista de telefones separados por ponto e vírgula (;). Telefones com * no início possuem WhatsApp'
  })
  telefone!: string | null;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: 'Endereço de e-mail do cidadão'
  })
  email!: string | null;

  @Column({
    name: 'dataHoraCadastro',
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Data e hora do cadastro do cidadão'
  })
  dataHoraCadastro!: Date;

  @Column({
    name: 'prioridade',
    type: 'int',
    nullable: true,
    comment: 'Prioridade: 1-idoso, 2-patologia, null-sem prioridade',
    enum: CidadaoPrioridade
  })
  prioridade!: CidadaoPrioridade | null;

  @Column({
    name: 'dataNascimento',
    type: 'date',
    nullable: true,
    comment: 'Data de nascimento do cidadão (necessária para prioridade por idade)'
  })
  dataNascimento!: Date | null;

  @Column({
    name: 'ultimoAcesso',
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Data e hora do último acesso do cidadão'
  })
  ultimoAcesso!: Date | null;

  // Relação com Atendimento
  @OneToMany(() => Atendimento, (atendimento: Atendimento) => atendimento.cidadao)
  atendimentos!: Atendimento[];

  // Relação com Dispositivo
  @OneToMany(() => Dispositivo, (dispositivo: Dispositivo) => dispositivo.cidadao)
  dispositivos!: Dispositivo[];

  // Relação com LoginCidadao (OneToMany)
  @OneToMany(() => LoginCidadao, (login: LoginCidadao) => login.cidadao)
  logins!: LoginCidadao[];

  // Relação com LoginCidadao ativo (OneToOne)
  @OneToOne(() => LoginCidadao, (login: LoginCidadao) => login.cidadao)
  login!: LoginCidadao;
}
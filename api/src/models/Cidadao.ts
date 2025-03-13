import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { Atendimento } from './Atendimento';
import { LoginCidadao } from './LoginCidadao';
import { Dispositivo } from './Dispositivo';

@Entity({ name: 'Cidadao' })
export class Cidadao {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({
    type: 'text',
    nullable: false,
    comment: 'Nome do cidadão',
  })
  nome!: string;

  @Column({
    type: 'tinyint',
    default: 1,
    comment: 'Status: 0 - inativo, 1 - ativo',
  })
  status!: number;

  @Column({
    type: 'text',
    nullable: true,
    comment: 'Cidade de residência',
  })
  cidade!: string | null;

  @Column({
    type: 'text',
    nullable: true,
    comment: 'Telefones (separados por ";")',
  })
  telefone!: string | null;

  @Column({
    type: 'text',
    nullable: true,
  })
  email!: string | null;

  @Column({
    type: 'text',
    name: 'Auth0',
    nullable: true,
    comment: 'Dados de autenticação externa (JSON)',
  })
  auth0!: string | null;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Data/hora do cadastro',
  })
  dataHoraCadastro!: Date;

  @Column({
    type: 'int',
    width: 1,
    nullable: true,
    comment: 'Prioridade: NULL - sem, 1 - idoso, 2 - patologia',
  })
  prioridade!: number | null;

  @Column({
    type: 'date',
    nullable: true,
    comment: 'Data de nascimento (opcional)',
  })
  dataNascimento!: Date | null;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    comment: 'Último acesso ao sistema',
  })
  ultimoAcesso!: Date;

  // Relação com Atendimento
  @OneToMany(() => Atendimento, (atendimento) => atendimento.cidadao)
  atendimentos!: Atendimento[];

  // Relação com LoginCidadao
  @OneToMany(() => LoginCidadao, (login) => login.cidadao)
  logins!: LoginCidadao[];

  // Relação com Dispositivo
  @OneToMany(() => Dispositivo, (dispositivo) => dispositivo.cidadao)
  dispositivos!: Dispositivo[];

  @OneToOne(() => LoginCidadao, (login) => login.cidadao)
  login!: LoginCidadao;

}
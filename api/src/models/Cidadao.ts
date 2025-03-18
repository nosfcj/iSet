import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { Atendimento } from './Atendimento';
import { LoginCidadao } from './LoginCidadao';
import { Dispositivo } from './Dispositivo';

@Entity({ 
  name: 'Cidadao',
  comment: 'Essa tabela contém informações sobre o cidadão que procura atendimento de algum órgão.'
})
export class Cidadao {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({
    type: 'text',
    nullable: false,
    comment: 'Nome do cidadão.'
  })
  nome!: string;

  @Column({
    type: 'text',
    nullable: true,
    comment: 'Cidade em que o cidadão mora.'
  })
  cidade!: string | null;

  @Column({
    type: 'text',
    nullable: true,
    comment: 'Telefone usado pelo cidadão, podendo ter vários, separados por ponto e virgula. Telefones com * no início estarão disponíveis no WhatsApp.'
  })
  telefone!: string | null;

  @Column({
    type: 'text',
    nullable: true,
    comment: 'Email do cidadão.'
  })
  email!: string | null;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Data e hora em que o cidadão foi cadastrado no sistema.'
  })
  dataHoraCadastro!: Date;

  @Column({
    type: 'int',
    width: 1,
    nullable: true,
    comment: 'Define a prioridade definitiva do cidadão: NULL - sem prioridade, 1 - idoso, 2 - patologia.'
  })
  prioridade!: number | null;

  @Column({
    type: 'date',
    nullable: true,
    comment: 'Data de nascimento é opcional. Mas sua ausência não dará a prerrogativa da idade no caso de senha prioritária.'
  })
  dataNascimento!: Date | null;

  @Column({
    type: 'timestamp',
    name: 'UltimoAcesso',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP'
  })
  ultimoAcesso!: Date | null;

  // Relação com Atendimento
  @OneToMany(() => Atendimento, (atendimento) => atendimento.cidadao)
  atendimentos!: Atendimento[];

  // Relação com LoginCidadao
  @OneToMany(() => LoginCidadao, (login) => login.cidadao)
  logins!: LoginCidadao[];

  // Relação com Dispositivo
  @OneToMany(() => Dispositivo, (dispositivo) => dispositivo.cidadao)
  dispositivos!: Dispositivo[];

  // Relação com LoginCidadao (OneToOne)
  @OneToOne(() => LoginCidadao, (login) => login.cidadao)
  login!: LoginCidadao;
}
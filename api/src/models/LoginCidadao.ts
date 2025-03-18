import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Cidadao } from './Cidadao';

@Entity({ 
  name: 'LoginCidadao',
  comment: 'Login para que cidadão cadastrado no sistema tenha acesso ao aplicativo de celular.'
})
export class LoginCidadao {
  @PrimaryColumn({ 
    name: 'Cidadao_ID',
    comment: 'ID que define a que cidadão este login pertence.'
  })
  cidadaoId!: number;

  @Column({
    name: 'CPF',
    type: 'varchar',
    length: 32,
    unique: true,
    nullable: true,
    default: null,
    comment: 'O nome de usuário que o cidadão irá utilizar - campo CPF deve ter conteudo completo do CPF, com pontos e traços e ser único.'
  })
  CPF!: string | null;

  @Column({
    type: 'varchar',
    length: 32,
    nullable: true,
    default: null,
    comment: 'Campo com senha, codificada. Se Default, deverá ser gerada pelo usuário no primeiro acesso.'
  })
  senha!: string | null;

  @Column({
    type: 'json',
    nullable: true,
    default: null,
    unique: true,
    comment: 'JSON, com objeto disponibilizado por login via Auth0: GOV.br - 1; Facebook - 2, Google - 3; NULL - cadastro via login no sistema.'
  })
  Auth0!: Record<string, any> | null;

  // Relação OneToOne com Cidadao
  @OneToOne(() => Cidadao, (cidadao) => cidadao.login)
  @JoinColumn({ name: 'Cidadao_ID' })
  cidadao!: Cidadao;
}
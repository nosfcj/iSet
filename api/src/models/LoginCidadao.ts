import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Cidadao } from './Cidadao';

@Entity({ name: 'LoginCidadao', comment: 'Credenciais de login dos cidadãos' })
export class LoginCidadao {
  @PrimaryColumn({ name: 'Cidadao_ID' })
  cidadaoId!: number; // PK compartilhada com Cidadao

  @Column({
    type: 'varchar',
    length: 32,
    unique: true,
    nullable: false,
    comment: 'CPF único (com pontuação)',
  })
  CPF!: string;

  @Column({
    type: 'varchar',
    length: 32,
    default: 'Default',
    comment: 'Senha codificada. "Default" requer atualização no primeiro acesso.',
  })
  senha!: string;

  // Relação OneToOne com Cidadao (bidirecional)
  @OneToOne(() => Cidadao, (cidadao) => cidadao.login)
  @JoinColumn({ name: 'Cidadao_ID' })
  cidadao!: Cidadao;
}
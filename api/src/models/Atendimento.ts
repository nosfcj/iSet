import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Cidadao } from './Cidadao';
import { Usuario } from './Usuario';
import { Local } from './Local';
import { Acao } from './Acao';
import { Avaliacao } from './Avaliacao';

@Entity({ name: 'Atendimento' })
export class Atendimento {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({
    type: 'int',
    default: 0,
    comment: 'Status: 0-Não finalizado, 1-Em atendimento, 2-Finalizado, 3-Aguardando retorno',
  })
  status!: number;

  @Column({
    type: 'int',
    nullable: false,
    comment: 'Tipo: 0-Comum, 1-Prioridade, 2-Retorno, 3-Retorno com prioridade',
  })
  tipo!: number;

  @Column({
    length: 9,
    nullable: false,
    comment: 'Senha no formato "LLL-000"',
  })
  senha!: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Data de cadastro do atendimento',
  })
  dataCadastro!: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    comment: 'Data de conclusão/finalização',
  })
  dataFinal!: Date | null;

  // Relação com Cidadao
  @ManyToOne(() => Cidadao, (cidadao) => cidadao.atendimentos)
  @JoinColumn({ name: 'Cidadao_ID' })
  cidadao!: Cidadao;

  // Relação com Usuario (opcional)
  @ManyToOne(() => Usuario, (usuario) => usuario.atendimentos, { nullable: true })
  @JoinColumn({ name: 'Usuario_ID' })
  usuario!: Usuario | null;

  // Relação com Local (opcional)
  @ManyToOne(() => Local, (local) => local.atendimentos, { nullable: true })
  @JoinColumn({ name: 'Local_ID' })
  local!: Local | null;

  // Relação com Acao
  @OneToMany(() => Acao, (acao) => acao.atendimento)
  acoes!: Acao[];

  // Relação com Avaliacao
  @OneToOne(() => Avaliacao, (avaliacao) => avaliacao.atendimento)
  avaliacao!: Avaliacao;
}
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Local } from './Local';
import { Usuario } from './Usuario';
import { Acao } from './Acao';
import { Direcionamento } from './Direcionamento';

@Entity({ 
  name: 'Guiche',
  comment: 'Esta tabela contem informações dos guichês, usuários que estão a utilizar e sua disponibilidade em relação aos atendimentos dos serviços.'
})
export class Guiche {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({
    type: 'tinyint',
    default: 1,
    nullable: false,
    comment: 'Status que define o status do guichê: 0 - offline; 1 - online.'
  })
  status!: number;

  @Column({
    type: 'int',
    width: 3,
    zerofill: true,
    nullable: false,
    comment: 'Define o numero do guichê disponivel no local de atendimento.'
  })
  identificacao!: number;

  @Column({
    type: 'int',
    default: 0,
    nullable: false,
    comment: 'Define situação de atividade, vindos de WebSocket, do atendimento de guiches: 0 - fora de atendimento, 1 - aguardando atendimento, 2 - em atendimento, 3 - atendimento suspenso'
  })
  disponibilidade!: number;

  // Relação com Local (obrigatória)
  @ManyToOne(() => Local, (local) => local.guiches)
  @JoinColumn({ name: 'Local_ID' })
  local!: Local;

  // Relação com Usuario (opcional)
  @ManyToOne(() => Usuario, (usuario) => usuario.guiches)
  @JoinColumn({ name: 'Usuario_ID' })
  usuario!: Usuario | null;

  // Relação com Acao
  @OneToMany(() => Acao, (acao) => acao.guiche)
  acoes!: Acao[];

  // Relação com Direcionamento
  @OneToMany(() => Direcionamento, (direcionamento) => direcionamento.guiche)
  direcionamentos!: Direcionamento[];
}
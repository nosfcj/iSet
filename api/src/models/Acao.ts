import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Atendimento } from './Atendimento';
import { Guiche } from './Guiche';
import { Usuario } from './Usuario';
import { Servico } from './Servico';

@Entity({ name: 'Acao', comment: 'Ações de atendimento vinculadas a serviços' })
export class Acao {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({
    type: 'int',
    default: 0,
    comment: 'Status: 0 - aguardando, 1 - em atendimento, 2 - finalizado, 3 - adiado',
  })
  status!: number;

  @Column({
    type: 'int',
    nullable: false,
    comment: 'Posição na fila de atendimento',
  })
  posicao!: number;

  @Column({
    type: 'date',
    nullable: true,
    comment: 'Data do atendimento',
  })
  data!: Date | null;

  @Column({
    type: 'time',
    nullable: true,
    comment: 'Hora de início do atendimento',
  })
  horaInicio!: string | null;

  @Column({
    type: 'time',
    nullable: true,
    comment: 'Hora de término do atendimento',
  })
  horaFim!: string | null;

  @Column({
    type: 'text',
    nullable: true,
    comment: 'Anotações do atendente',
  })
  anotacao!: string | null;

  // Relação com Atendimento (obrigatória)
  @ManyToOne(() => Atendimento, (atendimento) => atendimento.acoes, { nullable: false })
  @JoinColumn({ name: 'Atendimento_ID' })
  atendimento!: Atendimento;

  // Relação com Guiche (obrigatória)
  @ManyToOne(() => Guiche, (guiche) => guiche.acoes, { nullable: false })
  @JoinColumn({ name: 'Guiche_ID' })
  guiche!: Guiche;

  // Relação com Servico (obrigatória)
  @ManyToOne(() => Servico, (servico) => servico.acoes, { nullable: false })
  @JoinColumn({ name: 'Servico_ID' })
  servico!: Servico;

  // Relação com Usuario (opcional)
  @ManyToOne(() => Usuario, (usuario) => usuario.acoes, { nullable: true })
  @JoinColumn({ name: 'Usuario_ID' })
  usuario!: Usuario | null;
}
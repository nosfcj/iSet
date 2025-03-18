import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Atendimento } from './Atendimento';
import { Guiche } from './Guiche';
import { Usuario } from './Usuario';
import { Servico } from './Servico';

@Entity({ 
  name: 'Acao',
  comment: 'Essa tabela contém informações sobre cada serviço de um atendimento. Ação finalizado somente por usuário atendente.'
})
export class Acao {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({
    type: 'int',
    default: 0,
    nullable: false,
    comment: 'Situação do atendimento deste serviço: 0 - Aguardando chamada (na fila); 1 - Em atendimento, 2 - Finalizado, 3 - Reagendado (com data futura), 4 - Aguardando confirmação (quando chegar a data agendada).'
  })
  status!: number;

  @Column({
    type: 'int',
    nullable: false,
    comment: 'Posição do serviço na fila do atendimento.'
  })
  posicao!: number;

  @Column({
    type: 'date',
    nullable: true,
    default: null,
    comment: 'Data em que o atendimento foi atendido.'
  })
  data!: Date | null;

  @Column({
    type: 'time',
    nullable: true,
    default: null,
    comment: 'Hora que marca o início do atendimento deste serviço.'
  })
  horaInicio!: string | null;

  @Column({
    type: 'time',
    nullable: true,
    default: null,
    comment: 'Hora que marca o fim do atendimento deste serviço.'
  })
  horaFim!: string | null;

  @Column({
    type: 'text',
    nullable: true,
    default: null,
    comment: 'Possível anotação do atendente neste serviço.'
  })
  anotacao!: string | null;

  // Relação com Atendimento (obrigatória)
  @ManyToOne(() => Atendimento, (atendimento) => atendimento.acoes)
  @JoinColumn({ name: 'Atendimento_ID' })
  atendimento!: Atendimento;

  // Relação com Guiche (opcional)
  @ManyToOne(() => Guiche, (guiche) => guiche.acoes)
  @JoinColumn({ name: 'Guiche_ID' })
  guiche!: Guiche | null;

  // Relação com Usuario (opcional)
  @ManyToOne(() => Usuario, (usuario) => usuario.acoes)
  @JoinColumn({ name: 'Usuario_ID' })
  usuario!: Usuario | null;

  // Relação com Servico (obrigatória)
  @ManyToOne(() => Servico, (servico) => servico.acoes)
  @JoinColumn({ name: 'Servico_ID' })
  servico!: Servico;
}
/**
 * Acao Entity
 * @file api/src/models/Acao.ts
 * @lastModified 2025-03-18 17:11:54
 * @modifiedBy nosfcj
 * @description Entidade que representa as ações de atendimento para cada serviço solicitado
 */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Atendimento } from './Atendimento';
import { Guiche } from './Guiche';
import { Usuario } from './Usuario';
import { Servico } from './Servico';

/**
 * Enum para status da ação
 */
export enum AcaoStatus {
  AGUARDANDO_CHAMADA = 0,  // Na fila
  EM_ATENDIMENTO = 1,      // Em atendimento
  FINALIZADO = 2,          // Finalizado
  REAGENDADO = 3,          // Com data futura
  AGUARDANDO_CONFIRMACAO = 4 // Quando outro órgão precisa confirmar
}

@Entity({ 
  name: 'Acao',
  comment: 'Contém informações sobre cada serviço de um atendimento. Ação finalizada somente por usuário atendente.'
})
export class Acao {
  @PrimaryGeneratedColumn({ 
    name: 'ID',
    type: 'int',
    comment: 'Identificador único da ação'
  })
  id!: number;

  @Column({
    name: 'status',
    type: 'int',
    default: AcaoStatus.AGUARDANDO_CHAMADA,
    nullable: false,
    comment: 'Status da ação: 0-Aguardando chamada, 1-Em atendimento, 2-Finalizado, 3-Reagendado, 4-Aguardando confirmação',
    enum: AcaoStatus
  })
  status!: AcaoStatus;

  @Column({
    name: 'posicao',
    type: 'int',
    nullable: false,
    comment: 'Posição do serviço na fila do atendimento'
  })
  posicao!: number;

  @Column({
    name: 'data',
    type: 'date',
    nullable: true,
    default: null,
    comment: 'Data em que o atendimento foi realizado'
  })
  data!: Date | null;

  @Column({
    name: 'horaInicio',
    type: 'time',
    nullable: true,
    default: null,
    comment: 'Hora que marca o início do atendimento deste serviço'
  })
  horaInicio!: string | null;

  @Column({
    name: 'horaFim',
    type: 'time',
    nullable: true,
    default: null,
    comment: 'Hora que marca o fim do atendimento deste serviço'
  })
  horaFim!: string | null;

  @Column({
    name: 'anotacao',
    type: 'text',
    nullable: true,
    default: null,
    comment: 'Possível anotação do atendente neste serviço'
  })
  anotacao!: string | null;

  @Column({
    name: 'Atendimento_ID',
    type: 'int',
    nullable: false,
    comment: 'ID do atendimento ao qual esta ação pertence'
  })
  atendimentoId!: number;

  @Column({
    name: 'Guiche_ID',
    type: 'int',
    nullable: true,
    comment: 'ID do guichê onde esta ação está sendo ou foi atendida'
  })
  guicheId!: number | null;

  @Column({
    name: 'Usuario_ID',
    type: 'int',
    nullable: true,
    comment: 'ID do usuário que está atendendo ou atendeu esta ação'
  })
  usuarioId!: number | null;

  @Column({
    name: 'Servico_ID',
    type: 'int',
    nullable: false,
    comment: 'ID do serviço que está sendo executado nesta ação'
  })
  servicoId!: number;

  // Relação com Atendimento (obrigatória)
  @ManyToOne(() => Atendimento, (atendimento: Atendimento) => atendimento.acoes)
  @JoinColumn({ name: 'Atendimento_ID' })
  atendimento!: Atendimento;

  // Relação com Guiche (opcional)
  @ManyToOne(() => Guiche, (guiche: Guiche) => guiche.acoes)
  @JoinColumn({ name: 'Guiche_ID' })
  guiche!: Guiche | null;

  // Relação com Usuario (opcional)
  @ManyToOne(() => Usuario, (usuario: Usuario) => usuario.acoes)
  @JoinColumn({ name: 'Usuario_ID' })
  usuario!: Usuario | null;

  // Relação com Servico (obrigatória)
  @ManyToOne(() => Servico, (servico: Servico) => servico.acoes)
  @JoinColumn({ name: 'Servico_ID' })
  servico!: Servico;
}
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Agregador } from './Agregador';
import { Local } from './Local';
import { Monitor } from './Monitor';


@Entity({ 
  name: 'SubAgregador', 
  comment: 'Essa tabela contem informações sobre os agrupamentos pertencentes a um local agregador, como divisões de uma central de atendimento.'
})
export class SubAgregador {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({
    type: 'tinyint',
    default: 1,
    nullable: false,
    comment: 'Status que define situação do sub-agregador disponibilizados pelo agregador: 0 - desativado, 1 ativado. Quando um agregador for desativado, todos os serviços da unidade desse subagregador, bem como todos os serviços deverão ser desativados.',
  })
  status!: number;

  @Column({
    type: 'text',
    nullable: false,
    comment: 'Nome do agregador',
  })
  nome!: string;

  // Relação com Agregador
  @ManyToOne(() => Agregador, (agregador) => agregador.subAgregadores)
  @JoinColumn({ name: 'Agregador_ID' })
  agregadores!: Agregador;

  // Relação com Local
  @OneToMany(() => Local, (local) => local.subAgregador)
  locais!: Local[];

  // Relação com Monitor
  @OneToMany(() => Monitor, (monitor) => monitor.subAgregador)
  monitores!: Monitor[];

}
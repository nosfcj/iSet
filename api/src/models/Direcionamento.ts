import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Guiche } from './Guiche';
import { Servico } from './Servico';

@Entity({ 
  name: 'Direcionamento',
  comment: 'Tabela que agrega os serviços que podem ser chamados por um guichê'
})
export class Direcionamento {
  @PrimaryGeneratedColumn({ 
    name: 'ID',
    type: 'int' 
  })
  id!: number;

  @Column({
    name: 'status',
    type: 'tinyint',
    nullable: false,
    default: 1,
    comment: 'Status que define disposição: 0 - indisponível, 1 disponível.'
  })
  status!: number;

  @Column({
    name: 'tipo',
    type: 'int',
    nullable: false,
    default: 1,
    comment: 'Define tipo de guichê: 1 - triagem, 2 - atendimento'
  })
  tipo!: number;

  @Column({
    name: 'Guiche_ID',
    type: 'int',
    nullable: false,
    comment: 'A que guichê estas informações pertencem.'
  })
  guicheId!: number;

  @Column({
    name: 'Servico_ID',
    type: 'int',
    nullable: false,
    comment: 'Que serviço este guichê pode chamar.'
  })
  servicoId!: number;

  // Relação com Guiche (obrigatória)
  @ManyToOne(() => Guiche)
  @JoinColumn({ name: 'Guiche_ID' })
  guiche!: Guiche;

  // Relação com Servico (obrigatória)
  @ManyToOne(() => Servico)
  @JoinColumn({ name: 'Servico_ID' })
  servico!: Servico;
}
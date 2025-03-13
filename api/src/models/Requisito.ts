import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Conteudo } from './Conteudo';
import { Rotulo } from './Rotulo';

@Entity({ name: 'Requisito', comment: 'Pré-requisitos dos serviços oferecidos' })
export class Requisito {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({
    type: 'tinyint',
    default: 1,
    comment: 'Status: 0 - indisponível, 1 - disponível',
  })
  status!: number;

  @Column({
    type: 'text',
    nullable: false,
    comment: 'Descrição do pré-requisito',
  })
  conteudo!: string;

  // Relação com Conteudo (ManyToOne)
  @ManyToOne(() => Conteudo, (conteudo) => conteudo.requisitos)
  @JoinColumn({ name: 'Conteudo_ID' })
  conteudoRelacionado!: Conteudo;

  // Relação com Rotulo (ManyToOne)
  @ManyToOne(() => Rotulo, (rotulo) => rotulo.requisitos)
  @JoinColumn({ name: 'Rotulo_ID' })
  rotulo!: Rotulo;
}
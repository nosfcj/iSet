import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Conteudo } from './Conteudo';
import { Rotulo } from './Rotulo';

@Entity({ 
  name: 'Requisito',
  comment: 'Essa tabela contém informações sobre os vários pré-requisitos do serviços que serão oferecidos em serviços oferecidos ao cidadão.'
})
export class Requisito {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({
    type: 'tinyint',
    default: 1,
    nullable: false,
    comment: 'Define o status de disponibilidade do conteúdo: 0 - indisponível, 1 - disponível. '
  })
  status!: number;

  @Column({
    type: 'text',
    nullable: false,
    comment: 'Conteúdo de um pré requisito de um serviço'
  })
  conteudo!: string;

  // Relação com Conteudo
  @ManyToOne(() => Conteudo, (conteudo) => conteudo.requisitos)
  @JoinColumn({ name: 'Conteudo_ID' })
  conteudoRelacionado!: Conteudo;

  // Relação com Rotulo
  @ManyToOne(() => Rotulo, (rotulo) => rotulo.requisitos)
  @JoinColumn({ name: 'Rotulo_ID' })
  rotulo!: Rotulo;
}
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Requisito } from './Requisito';

@Entity({ 
  name: 'Rotulo',
  comment: 'Essa tabela contém os rótulos descritos nos pré requisitos.'
})
export class Rotulo {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({
    type: 'tinyint',
    default: 1,
    nullable: false
  })
  status!: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'Rótulo com o título do pré-requisito que serão utilizados para padronizar conteúdo.'
  })
  rotulo!: string;

  // Relação com Requisito
  @OneToMany(() => Requisito, (requisito) => requisito.rotulo)
  requisitos!: Requisito[];
}
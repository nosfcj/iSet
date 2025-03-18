import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ 
  name: 'Configuracao',
  comment: 'Contém as configurações pertinentes ao funcionamento do sistema.'
})
export class Configuracao {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
    comment: 'Data e hora da última atualização da configuração.'
  })
  dataHoraAtualizacao!: Date;
}

/**
 * @lastModified 2025-03-18 00:40:53
 * @modifiedBy nosfcj
 */
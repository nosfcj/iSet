import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ 
  name: 'Codigos',
  comment: 'Esta tabela contém todos os códigos utilizados para a auditoria dos dados do sistema, bem como suas descrições.'
})
export class Codigos {
  @PrimaryColumn({
    name: 'codigo',
    type: 'varchar',
    length: 15,
    comment: 'Código que define a ação a ser auditada.'
  })
  codigo!: string;

  @Column({
    name: 'descricao',
    type: 'varchar',
    length: 200,
    nullable: false,
    comment: 'Contém descrição inteligível sobre a ação a ser auditada.'
  })
  descricao!: string;
}
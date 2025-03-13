import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Guiche } from './Guiche';
import { Servico } from './Servico';

@Entity({ 
  name: 'Direcionamento',
  comment: 'Direcionamento de serviços para guichês' 
})
export class Direcionamento {
  @PrimaryColumn({ name: 'ID' })
  id!: number; // Não é AUTO_INCREMENT no SQL, então usamos @PrimaryColumn

  @Column({
    type: 'tinyint',
    default: 1,
    comment: 'Status: 0 - indisponível, 1 - disponível',
  })
  status!: number;

  @Column({
    type: 'int',
    default: 1,
    comment: 'Tipo: 1 - triagem, 2 - atendimento',
  })
  tipo!: number;

  @Column({
    length: 4,
    nullable: false,
    comment: 'Rótulo do direcionamento (ex: "TRI-")',
  })
  rotulo!: string;

  // Relação com Guiche (obrigatória)
  @ManyToOne(() => Guiche, (guiche) => guiche.direcionamentos, { nullable: false })
  @JoinColumn({ name: 'Guiche_ID' })
  guiche!: Guiche;

  // Relação com Servico (obrigatória)
  @ManyToOne(() => Servico, (servico) => servico.direcionamentos, { nullable: false })
  @JoinColumn({ name: 'Servico_ID' })
  servico!: Servico;

}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Local } from './Local';
import { Usuario } from './Usuario';
import { Acao } from './Acao';
import { Direcionamento } from './Direcionamento';

@Entity({ name: 'Guiche', comment: 'Guichês de atendimento disponíveis' })
export class Guiche {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({
    type: 'tinyint',
    default: 1,
    comment: 'Status: 0 - indisponível, 1 - disponível',
  })
  status!: number;

  @Column({
    type: 'int',
    unsigned: true,
    width: 3,
    zerofill: true,
    comment: 'Número do guichê (3 dígitos zerofill)',
  })
  identificacao!: number;

  @Column({
    type: 'int',
    default: 0,
    comment: 'Disponibilidade: 0 - fora, 1 - aguardando, 2 - atendendo, 3 - suspenso',
  })
  disponibilidade!: number;

  // Relação com Local (obrigatória)
  @ManyToOne(() => Local, (local) => local.guiches, { nullable: false })
  @JoinColumn({ name: 'Local_ID' })
  local!: Local;

  // Relação com Usuario (obrigatória)
  @ManyToOne(() => Usuario, (usuario) => usuario.guiches, { nullable: false })
  @JoinColumn({ name: 'Usuario_ID' })
  usuario!: Usuario;

  // Relação com Acao (OneToMany)
  @OneToMany(() => Acao, (acao) => acao.guiche)
  acoes!: Acao[];

  // Relação com Direcionamento (OneToMany - adicionada)
  @OneToMany(() => Direcionamento, (direcionamento) => direcionamento.guiche)
  direcionamentos!: Direcionamento[];
}
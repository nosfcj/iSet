import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Usuario } from './Usuario';
import { Cidadao } from './Cidadao';
import { Monitor } from './Monitor';

@Entity({ name: 'Dispositivo', comment: 'Dispositivos autorizados a acessar o sistema' })
export class Dispositivo {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({
    type: 'tinyint',
    default: 1,
    comment: 'Status: 0 - inativo, 1 - ativo',
  })
  status!: number;

  @Column({
    type: 'int',
    width: 1,
    nullable: false,
    comment: 'Tipo: 1 - Web, 2 - Desktop, 3 - Portátil',
  })
  tipo!: number;

  @Column({
    length: 45,
    nullable: false,
    comment: 'Hash de identificação do dispositivo',
  })
  identificacao!: string;

  @Column({
    length: 45,
    default: 'Rótulo que identifica o dispositivo',
    comment: 'Nome amigável do dispositivo',
  })
  rotulo!: string;

  // Relação com Usuario (opcional)
  @ManyToOne(() => Usuario, (usuario) => usuario.dispositivos, { nullable: true })
  @JoinColumn({ name: 'Usuario_ID' })
  usuario!: Usuario | null;

  // Relação com Cidadao (opcional)
  @ManyToOne(() => Cidadao, (cidadao) => cidadao.dispositivos, { nullable: true })
  @JoinColumn({ name: 'Cidadao_ID' })
  cidadao!: Cidadao | null;

  // Relação com Monitor (OneToOne - adicionada)
  @OneToOne(() => Monitor, (monitor) => monitor.dispositivo)
  monitor!: Monitor;
}
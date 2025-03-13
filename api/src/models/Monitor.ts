import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Dispositivo } from './Dispositivo';
import { Usuario } from './Usuario';

@Entity({ name: 'Monitor', comment: 'Monitores de chamada de senha' })
export class Monitor {
  @PrimaryColumn({ name: 'Dispositivo_ID' })
  dispositivoId!: number; // PK compartilhada com Dispositivo

  @Column({
    type: 'tinyint',
    default: 1,
    comment: 'Status: 0 - Inativo, 1 - Ativo',
  })
  status!: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: 'Rótulo para identificação do monitor',
  })
  rotulo!: string | null;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Data de cadastro do monitor',
  })
  dataCadastro!: Date;

  @Column({
    type: 'json',
    nullable: true,
    comment: 'Guichês vinculados (IDs em formato JSON)',
  })
  guiches!: number[] | null;

  // Relação com Usuario (obrigatória)
  @ManyToOne(() => Usuario, (usuario) => usuario.monitores, { nullable: false })
  @JoinColumn({ name: 'Usuario_ID' })
  usuario!: Usuario;

  // Relação OneToOne com Dispositivo (PK compartilhada)
  @OneToOne(() => Dispositivo)
  @JoinColumn({ name: 'Dispositivo_ID' })
  dispositivo!: Dispositivo;
}
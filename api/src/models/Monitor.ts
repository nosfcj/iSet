/**
 * Monitor Entity
 * @file api/src/models/Monitor.ts
 * @lastModified 2025-03-20 16:43:15
 * @modifiedBy nosfcj
 * @description Entidade que representa os monitores chamadores de senha
 */
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Dispositivo } from './Dispositivo';
import { Usuario } from './Usuario';
import { SubAgregador } from './SubAgregador';

/**
 * Enum para status do monitor
 */
export enum MonitorStatus {
  INATIVO = 0,
  ATIVO = 1
}

@Entity({ 
  name: 'Monitor',
  comment: 'Contém informações dos monitores chamadores de senha e suas configurações'
})
export class Monitor {
  @PrimaryColumn({ 
    name: 'Dispositivo_ID',
    type: 'int',
    comment: 'ID do dispositivo que terá as configurações de Monitor de Senhas'
  })
  dispositivoId!: number;

  @Column({
    name: 'status',
    type: 'tinyint',
    nullable: false,
    default: 1,
    comment: 'Status do Monitor: 0-inativo, 1-ativo'
  })
  status!: MonitorStatus;

  @Column({
    name: 'rotulo',
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'Rótulo de identificação do Monitor de Senhas'
  })
  rotulo!: string;

  @Column({
    name: 'dataCadastro',
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Data e hora do cadastro do Monitor'
  })
  dataCadastro!: Date;

  @Column({
    name: 'Usuario_ID',
    type: 'int',
    nullable: false,
    comment: 'ID do usuário que cadastrou este Monitor'
  })
  usuarioId!: number;

  @Column({
    name: 'SubAgregador_ID',
    type: 'int',
    nullable: false,
    comment: 'ID do SubAgregador ao qual este Monitor está vinculado'
  })
  subAgregadorId!: number;

  // Relação OneToOne com Dispositivo (PK compartilhada)
  @OneToOne(() => Dispositivo, (dispositivo: Dispositivo) => dispositivo.monitor)
  @JoinColumn({ name: 'Dispositivo_ID' })
  dispositivo!: Dispositivo;

  // Relação com Usuario (obrigatória)
  @ManyToOne(() => Usuario, (usuario: Usuario) => usuario.monitores)
  @JoinColumn({ name: 'Usuario_ID' })
  usuario!: Usuario;

  // Relação com SubAgregador (obrigatória)
  @ManyToOne(() => SubAgregador, (subAgregador: SubAgregador) => subAgregador.monitores)
  @JoinColumn({ name: 'SubAgregador_ID' })
  subAgregador!: SubAgregador;
}
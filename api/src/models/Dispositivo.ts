/**
 * Dispositivo Entity
 * @file api/src/models/Dispositivo.ts
 * @lastModified 2025-03-18 19:27:38
 * @modifiedBy nosfcj
 * @description Entidade que representa os dispositivos autorizados a acessar o sistema
 */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Usuario } from './Usuario';
import { Cidadao } from './Cidadao';
import { Monitor } from './Monitor';

/**
 * Enum para status do dispositivo
 */
export enum DispositivoStatus {
  INATIVO = 0,
  ATIVO = 1
}

/**
 * Enum para tipo do dispositivo
 */
export enum DispositivoTipo {
  WEB = 1,
  DESKTOP = 2,
  PORTATIL = 3
}

@Entity({ 
  name: 'Dispositivo',
  comment: 'Contém informações dos dispositivos autorizados a acessar o sistema. Apenas Supervisores, Gestores e Administradores podem cadastrar dispositivos web/desktop.'
})
export class Dispositivo {
  @PrimaryGeneratedColumn({ 
    name: 'ID',
    type: 'int',
    comment: 'Identificador único do dispositivo'
  })
  id!: number;

  @Column({
    name: 'status',
    type: 'tinyint',
    nullable: false,
    default: DispositivoStatus.ATIVO,
    comment: 'Status: 0-inativo, 1-ativo',
    enum: DispositivoStatus
  })
  status!: DispositivoStatus;

  @Column({
    name: 'tipo',
    type: 'int',
    nullable: false,
    comment: 'Tipo: 1-Web, 2-Desktop, 3-Portátil',
    enum: DispositivoTipo
  })
  tipo!: DispositivoTipo;

  @Column({
    name: 'chave',
    type: 'varchar',
    length: 45,
    nullable: false,
    comment: 'Hash que identifica o navegador/dispositivo autorizado'
  })
  chave!: string;

  @Column({
    name: 'rotulo',
    type: 'varchar',
    length: 45,
    nullable: true,
    default: null,
    comment: 'Nome de identificação do dispositivo'
  })
  rotulo!: string | null;

  @Column({
    name: 'Usuario_ID',
    type: 'int',
    nullable: true,
    comment: 'ID do usuário que cadastrou o dispositivo web/desktop'
  })
  usuarioId!: number | null;

  @Column({
    name: 'Cidadao_ID',
    type: 'int',
    nullable: true,
    comment: 'ID do cidadão que cadastrou o dispositivo portátil'
  })
  cidadaoId!: number | null;

  // Relação com Usuario (opcional)
  @ManyToOne(() => Usuario, (usuario: Usuario) => usuario.dispositivos)
  @JoinColumn({ name: 'Usuario_ID' })
  usuario!: Usuario | null;

  // Relação com Cidadao (opcional)
  @ManyToOne(() => Cidadao, (cidadao: Cidadao) => cidadao.dispositivos)
  @JoinColumn({ name: 'Cidadao_ID' })
  cidadao!: Cidadao | null;

  // Relação inversa com Monitor (opcional)
  @OneToOne(() => Monitor, (monitor: Monitor) => monitor.dispositivo)
  monitor!: Monitor;
}
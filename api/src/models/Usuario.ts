/**
 * Usuario Entity
 * @file api/src/models/Usuario.ts
 * @lastModified 2025-03-18 19:24:41
 * @modifiedBy nosfcj
 * @description Entidade que representa os usuários do sistema responsáveis pela gestão e atendimento
 */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Unidade } from './Unidade';
import { Atendimento } from './Atendimento';
import { Guiche } from './Guiche';
import { LoginUsuario } from './LoginUsuario';
import { AuditoriaInterna } from './AuditoriaInterna';
import { Dispositivo } from './Dispositivo';
import { Monitor } from './Monitor';
import { Acao } from './Acao';

/**
 * Enum para status do usuário
 */
export enum UsuarioStatus {
  INATIVO = 0,
  ATIVO = 1
}

/**
 * Enum para nível de acesso do usuário
 */
export enum UsuarioNivel {
  ATENDENTE = 1,
  SUPERVISOR = 2,
  EDITOR = 3,
  GESTOR = 4,
  ADMINISTRADOR = 5
}

@Entity({ 
  name: 'Usuario',
  comment: 'Contém informações dos usuários responsáveis pela gestão e atendimento no sistema'
})
export class Usuario {
  @PrimaryGeneratedColumn({ 
    name: 'ID',
    type: 'int',
    comment: 'Identificador único do usuário'
  })
  id!: number;

  @Column({
    name: 'status',
    type: 'tinyint',
    default: UsuarioStatus.ATIVO,
    nullable: false,
    comment: 'Status: 0-inativo, 1-ativo',
    enum: UsuarioStatus
  })
  status!: UsuarioStatus;

  @Column({
    name: 'nivel',
    type: 'int',
    nullable: false,
    comment: 'Nível: 1-atendente, 2-supervisor, 3-editor, 4-gestor, 5-administrador',
    enum: UsuarioNivel
  })
  nivel!: UsuarioNivel;

  @Column({
    name: 'nome',
    type: 'varchar',
    length: 45,
    nullable: false,
    comment: 'Nome completo do usuário'
  })
  nome!: string;

  @Column({
    name: 'Unidade_ID',
    type: 'int',
    nullable: true,
    comment: 'ID da unidade à qual o usuário está vinculado'
  })
  unidadeId!: number | null;

  // Relação com Unidade (opcional)
  @ManyToOne(() => Unidade, (unidade: Unidade) => unidade.usuarios)
  @JoinColumn({ name: 'Unidade_ID' })
  unidade!: Unidade | null;

  // Relação com Atendimento
  @OneToMany(() => Atendimento, (atendimento: Atendimento) => atendimento.usuario)
  atendimentos!: Atendimento[];

  // Relação com Guiche
  @OneToMany(() => Guiche, (guiche: Guiche) => guiche.usuario)
  guiches!: Guiche[];

  // Relação com Auditoria
  @OneToMany(() => AuditoriaInterna, (auditoria: AuditoriaInterna) => auditoria.usuario)
  auditorias!: AuditoriaInterna[];

  // Relação com Dispositivo
  @OneToMany(() => Dispositivo, (dispositivo: Dispositivo) => dispositivo.usuario)
  dispositivos!: Dispositivo[];

  // Relação com Monitor
  @OneToMany(() => Monitor, (monitor: Monitor) => monitor.usuario)
  monitores!: Monitor[];

  // Relação com LoginUsuario
  @OneToOne(() => LoginUsuario, (login: LoginUsuario) => login.usuario)
  login!: LoginUsuario;

  // Relação com Acao
  @OneToMany(() => Acao, (acao: Acao) => acao.usuario)
  acoes!: Acao[];
}
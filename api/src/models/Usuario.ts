import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Unidade } from './Unidade';
import { Atendimento } from './Atendimento';
import { Guiche } from './Guiche';
import { LoginUsuario } from './LoginUsuario';
import { AuditoriaInterna } from './AuditoriaInterna';
import { Dispositivo } from './Dispositivo';
import { Monitor } from './Monitor';
import { Acao } from './Acao';

@Entity({ 
  name: 'Usuario',
  comment: 'Essa tabela é referente aos dados dos usuários que participam da gestão de informação e atendimento.'
})
export class Usuario {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({
    type: 'tinyint',
    default: 1,
    nullable: false,
    comment: 'Define status: 0 - inativo, 1 - ativo\n'
  })
  status!: number;

  @Column({
    type: 'int',
    nullable: false,
    comment: 'Define o nivel de acesso do usuário do sistema: 0 - administrador, 1 - atendente de serviços, 2 - editor de serviços na carta, 3 - supervisor de atendimento, 4 - gestor do sistema. Iniciando do atendente, a ordem crescente herda o nível do anterior. o Administrador é o único que herda todos e faz registro de usuários do sistema. Demais funções, vide documentação. '
  })
  nivel!: number;

  @Column({
    type: 'varchar',
    length: 45,
    nullable: false,
    comment: 'Nome real do usuário do sistema'
  })
  nome!: string;

  // Relação com Unidade
  @ManyToOne(() => Unidade, (unidade) => unidade.usuarios)
  @JoinColumn({ name: 'Unidade_ID' })
  unidade!: Unidade | null;

  // Relação com Atendimento
  @OneToMany(() => Atendimento, (atendimento) => atendimento.usuario)
  atendimentos!: Atendimento[];

  // Relação com Guiche
  @OneToMany(() => Guiche, (guiche) => guiche.usuario)
  guiches!: Guiche[];

  // Relação com Auditoria
  @OneToMany(() => AuditoriaInterna, (AuditoriaInterna) => AuditoriaInterna.usuario)
  AuditoriasInternas!: AuditoriaInterna[];

  // Relação com Dispositivo
  @OneToMany(() => Dispositivo, (dispositivo) => dispositivo.usuario)
  dispositivos!: Dispositivo[];

  // Relação com Monitor
  @OneToMany(() => Monitor, (monitor) => monitor.usuario)
  monitores!: Monitor[];

  // Relação com LoginUsuario
  @OneToOne(() => LoginUsuario, (login) => login.usuario)
  login!: LoginUsuario;

  // Relação com Acao
  @OneToMany(() => Acao, (acao) => acao.usuario)
  acoes!: Acao[];
}
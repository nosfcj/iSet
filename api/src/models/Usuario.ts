import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Orgao } from './Orgao';
import { Atendimento } from './Atendimento';
import { Guiche } from './Guiche';
import { LoginUsuario } from './LoginUsuario';
import { Auditoria } from './Auditoria';
import { Dispositivo } from './Dispositivo';
import { Monitor } from './Monitor';
import { Acao } from './Acao'; // Adicione esta linha

@Entity({ name: 'Usuario' })
export class Usuario {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({
    type: 'tinyint',
    default: 1,
    comment: 'Status: 0 - inativo, 1 - ativo',
  })
  status!: number;

  @Column({
    type: 'tinyint',
    default: 1,
    comment: 'Disponibilidade: 0 - indisponível, 1 - disponível',
  })
  disponibilidade!: number;

  @Column({
    type: 'int',
    nullable: false,
    comment: 'Nível de acesso (0-4). 0 = Administrador',
  })
  nivel!: number;

  @Column({
    length: 45,
    nullable: false,
    comment: 'Nome real do usuário',
  })
  nome!: string;

  // Relação com Orgao
  @ManyToOne(() => Orgao, (orgao) => orgao.usuarios)
  @JoinColumn({ name: 'Orgao_ID' })
  orgao!: Orgao;

  // Relação com Atendimento
  @OneToMany(() => Atendimento, (atendimento) => atendimento.usuario)
  atendimentos!: Atendimento[];

  // Relação com Guiche
  @OneToMany(() => Guiche, (guiche) => guiche.usuario)
  guiches!: Guiche[];

  // Relação com Auditoria
  @OneToMany(() => Auditoria, (auditoria) => auditoria.usuario)
  auditorias!: Auditoria[];

  // Relação com Dispositivo
  @OneToMany(() => Dispositivo, (dispositivo) => dispositivo.usuario)
  dispositivos!: Dispositivo[];

  // Relação com Monitor
  @OneToMany(() => Monitor, (monitor) => monitor.usuario)
  monitores!: Monitor[];

  // Relação com LoginUsuario
  @OneToOne(() => LoginUsuario, (login) => login.usuario)
  login!: LoginUsuario;

  // Relação com Acao (OneToMany)
  @OneToMany(() => Acao, (acao) => acao.usuario)
  acoes!: Acao[]; // Propriedade faltante

}
import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Dispositivo } from './Dispositivo';
import { Usuario } from './Usuario';
import { SubAgregador } from './SubAgregador';

@Entity({ 
  name: 'Monitor',
  comment: 'Contém cadastro dos monitores chamadores de senha e quais senhas cada um chamará.'
})
export class Monitor {
  @PrimaryColumn({ 
    name: 'Dispositivo_ID',
    comment: 'ID que define qual dispositivo cadastrado no sistema terá as configurações de Monitor de Senhas.'
  })
  dispositivoId!: number;

  @Column({
    name: 'status',
    type: 'tinyint',
    nullable: false,
    default: 1,
    comment: 'Define status do Monitor de Senhas: 0 - Inativo, 1 - Ativo.'
  })
  status!: number;

  @Column({
    name: 'rotulo',
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'Rótulo que irá nomear o Monitor de Senhas, para identificações.'
  })
  rotulo!: string;

  @Column({
    name: 'dataCadastro',
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Data do cadastro do Monitor de Senhas.'
  })
  dataCadastro!: Date;

  @Column({
    name: 'Usuario_ID',
    type: 'int',
    nullable: false,
    comment: 'Usuário que cadastrou este Monitor de Senhas.'
  })
  usuarioId!: number;

  @Column({
    name: 'SubAgregado_ID',
    type: 'int',
    nullable: false,
    comment: 'De quais orgãos pertencentes ao SubAgregador serão chamados os serviços.'
  })
  subAgregadoId!: number;

  // Relação OneToOne com Dispositivo (PK compartilhada)
  @OneToOne(() => Dispositivo)
  @JoinColumn({ name: 'Dispositivo_ID' })
  dispositivo!: Dispositivo;

  // Relação com Usuario (obrigatória)
  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'Usuario_ID' })
  usuario!: Usuario;

  // Relação com SubAgregador (obrigatória)
  @ManyToOne(() => SubAgregador)
  @JoinColumn({ name: 'SubAgregado_ID' })
  subAgregador!: SubAgregador;
}
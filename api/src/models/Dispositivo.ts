import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from './Usuario';
import { Cidadao } from './Cidadao';

@Entity({ 
  name: 'Dispositivo',
  comment: 'Contém as informações dos dispositivos com permição de acessar dados no sistema. Apenas Supervisores, Gestores e Administradores tem permissão de cadastro de dispositivos web/desktop. Cidadão só tem permissão para cadastrar dispositivos Portáteis.'
})
export class Dispositivo {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({
    name: 'status',
    type: 'tinyint',
    nullable: false,
    default: 1,
    comment: 'Status que define estado do dispositivo no sistema: 0 - inativo, 1 - ativo.'
  })
  status!: number;

  @Column({
    name: 'tipo',
    type: 'int',
    width: 1,
    nullable: false,
    comment: 'O tipo define qual o tipo de dispositivo está permitido acessar o sistema: 1 - Web, 2 - Desktop, 3 - Portátil.'
  })
  tipo!: number;

  @Column({
    name: 'chave',
    type: 'varchar',
    length: 45,
    nullable: false,
    comment: 'Chave em hash, que define navegador permitido para acessar o sistema.'
  })
  chave!: string;

  @Column({
    name: 'rotulo',
    type: 'varchar',
    length: 45,
    nullable: true,
    default: null,
    comment: 'Nome que irá apelidar este dispositivo'
  })
  rotulo!: string | null;

  @Column({
    name: 'Usuario_ID',
    type: 'int',
    nullable: true,
    comment: 'Define que usuário que cadastrou o dispositivo web/desktop no sistema.'
  })
  usuarioId!: number | null;

  @Column({
    name: 'Cidadao_ID',
    type: 'int',
    nullable: true,
    comment: 'Define que cidadão que cadastrou o app portátil no sistema.'
  })
  cidadaoId!: number | null;

  // Relação com Usuario (opcional)
  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'Usuario_ID' })
  usuario!: Usuario | null;

  // Relação com Cidadao (opcional)
  @ManyToOne(() => Cidadao)
  @JoinColumn({ name: 'Cidadao_ID' })
  cidadao!: Cidadao | null;
}
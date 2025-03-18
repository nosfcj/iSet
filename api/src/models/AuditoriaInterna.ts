/**
 * AuditoriaInterna Entity
 * @file api/src/models/AuditoriaInterna.ts
 * @lastModified 2025-03-18 20:46:31
 * @modifiedBy nosfcj
 * @description Entidade que registra logs de auditoria do sistema incluindo erros, mudanças significativas e atividades incomuns
 */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from './Usuario';
import { Codigos } from './Codigos';

@Entity({ 
  name: 'AuditoriaInterna',
  comment: 'Contém registros de auditoria do sistema como erros, mudanças em dados sensíveis e atividades incomuns'
})
export class AuditoriaInterna {
  @PrimaryGeneratedColumn({ 
    name: 'ID',
    type: 'int',
    comment: 'Identificador único do registro de auditoria'
  })
  id!: number;

  @Column({
    name: 'detalhe',
    type: 'json',
    nullable: true,
    comment: 'Dados detalhados do evento em formato JSON (IP, localização, servidores)'
  })
  detalhe!: Record<string, any> | null;

  @Column({
    name: 'timestamp',
    type: 'timestamp',
    nullable: true,
    comment: 'Data e hora do registro do evento'
  })
  timestamp!: Date | null;

  @Column({
    name: 'Codigos',
    type: 'varchar',
    length: 15,
    nullable: false,
    comment: 'Código que identifica o tipo de evento registrado'
  })
  codigos!: string;

  @Column({
    name: 'Usuario_ID',
    type: 'int',
    nullable: true,
    comment: 'ID do usuário relacionado ao evento'
  })
  usuarioId!: number | null;

  // Relação ManyToOne com Usuario (opcional)
  @ManyToOne(() => Usuario, (usuario: Usuario) => usuario.AuditoriasInternas, { nullable: true })
  @JoinColumn({ name: 'Usuario_ID' })
  usuario!: Usuario | null;

  @Column({
    name: 'Codigos_ID',
    type: 'varchar',
    length: 15,
    nullable: false,
    comment: 'ID do código que classifica o evento'
  })
  codigosId!: string;

  // Relação ManyToOne com Codigos (obrigatória)
  @ManyToOne(() => Codigos, (codigo: Codigos) => codigo.auditorias, { nullable: false })
  @JoinColumn({ name: 'Codigos' })
  codigosRelacionado!: Codigos;
}
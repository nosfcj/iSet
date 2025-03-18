/**
 * LoginUsuario Entity
 * @file api/src/models/LoginUsuario.ts
 * @lastModified 2025-03-18 19:26:12
 * @modifiedBy nosfcj
 * @description Entidade que representa as credenciais de acesso dos usuários ao sistema
 */
import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Usuario } from './Usuario';


@Entity({ 
  name: 'LoginUsuario',
  comment: 'Contém as credenciais de acesso dos usuários ao sistema'
})
export class LoginUsuario {
  @PrimaryColumn({ 
    name: 'Usuario_ID',
    type: 'int',
    comment: 'ID do usuário ao qual este login pertence (PK/FK)'
  })
  usuarioId!: number;

  @Column({
    name: 'usuario',
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'Nome de usuário para login no sistema'
  })
  usuario!: string;

  @Column({
    name: 'senha',
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'Hash da senha do usuário'
  })
  senha!: string;

  // Relação OneToOne com Usuario (PK compartilhada)
  @OneToOne(() => Usuario, (usuario: Usuario) => usuario.login)
  @JoinColumn({ name: 'Usuario_ID' })
  usuario_relacionado!: Usuario;
}
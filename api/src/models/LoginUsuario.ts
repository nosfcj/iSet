import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Usuario } from './Usuario';

@Entity({ name: 'LoginUsuario', comment: 'Credenciais de login dos usuários do sistema' })
export class LoginUsuario {
  @PrimaryColumn({ name: 'Usuario_ID' })
  usuarioId!: number; // PK compartilhada com Usuario

  @Column({
    type: 'text',
    nullable: false,
    comment: 'Nome de usuário único',
  })
  usuario!: string;

  @Column({
    type: 'text',
    nullable: false,
    comment: 'Senha codificada',
  })
  senha!: string;

  // Relação OneToOne bidirecional com Usuario
  @OneToOne(() => Usuario, (usuario) => usuario.login)
  @JoinColumn({ name: 'Usuario_ID' })
  usuarioRelacionado!: Usuario;
}
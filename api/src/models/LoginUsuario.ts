import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Usuario } from './Usuario';

@Entity({ 
  name: 'LoginUsuario',
  comment: 'Essa tabela possui as informações de login no sistema.'
})
export class LoginUsuario {
  @PrimaryColumn({ 
    name: 'Usuario_ID',
    comment: 'Define a que usuário este login pertence.'
  })
  usuarioId!: number;

  @Column({
    type: 'text',
    nullable: false,
    comment: 'ID que define o nome de usuário do sistema.'
  })
  usuario!: string;

  @Column({
    type: 'text',
    nullable: false,
    comment: 'Senha, codificada para privacidade'
  })
  senha!: string;

  // Relação OneToOne com Usuario
  @OneToOne(() => Usuario, (usuario) => usuario.login)
  @JoinColumn({ name: 'Usuario_ID' })
  usuarioRelacionado!: Usuario;
}
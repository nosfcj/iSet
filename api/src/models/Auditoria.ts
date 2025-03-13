import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from './Usuario';

@Entity({ name: 'Auditoria', comment: 'Registros de auditoria de atividades do sistema' })
export class Auditoria {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({
    length: 45,
    nullable: false,
    comment: 'Código do evento (formato: CÓDIGO-JSON-IP-TIPO_ATOR-GUICHE-...)',
  })
  codigo!: string;

  // Relação com Usuario (obrigatória)
  @ManyToOne(() => Usuario, (usuario) => usuario.auditorias, { nullable: false })
  @JoinColumn({ name: 'Usuario_ID' })
  usuario!: Usuario;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Data/hora do evento auditado',
  })
  timestamp!: Date;
}
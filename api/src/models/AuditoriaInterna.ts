import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from './Usuario';
import { Codigos } from './Codigos';

@Entity({ 
  name: 'AuditoriaInterna',
  comment: 'Tabela que contém dados de erros, mudanças significativas nos  dados de usuários, locais, logins, atendimentos, cadastros de dispositivos e atividades incomuns.'
})
export class AuditoriaInterna {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id!: number;

  @Column({
    type: 'json',
    nullable: true,
    comment: 'Amostra que contém informações no formato JSON com informações de IP, localização e servidores na rede.'
  })
  detalhe!: Record<string, any> | null;

  @Column({
    type: 'timestamp',
    nullable: true,
    comment: 'Data e hora da coleta das informações.'
  })
  timestamp!: Date | null;

  @Column({
    name: 'Codigos',
    type: 'varchar',
    length: 15,
    nullable: false,
    comment: 'Qual código define essa ação.'
  })
  codigos!: string;

  // Relação ManyToOne com Usuario
  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'Usuario_ID' })
  usuario!: Usuario;

  // Relação ManyToOne com Codigos
  @ManyToOne(() => Codigos)
  @JoinColumn({ name: 'Codigos' })
  codigosRelacionado!: Codigos;
}
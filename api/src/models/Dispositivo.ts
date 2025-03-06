import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { Usuario } from "./Usuario";
import { Cidadao } from "./Cidadao";
import { Monitor } from "./Monitor";

/**
 * Entidade que representa dispositivos cadastrados no sistema.
 * Dispositivos podem pertencer a usuários (web/desktop) ou cidadãos (portáteis).
 */
@Entity("Dispositivo")
export class Dispositivo {
  /** Identificador único do dispositivo (Chave Primária) */
  @PrimaryGeneratedColumn({ comment: "Identificador único do dispositivo" })
  ID!: number;

  /** Status: 0 - Inativo, 1 - Ativo */
  @Column({ 
    type: "tinyint", 
    default: 1, 
    comment: "Status: 0 - Inativo, 1 - Ativo" 
  })
  status!: number;

  /** Tipo: 1 - Web, 2 - Desktop, 3 - Portátil */
  @Column({ 
    type: "int", 
    width: 1, 
    nullable: false, 
    comment: "Tipo: 1 - Web, 2 - Desktop, 3 - Portátil" 
  })
  tipo!: number;

  /** Chave hash de identificação do dispositivo */
  @Column({ 
    type: "varchar", 
    length: 45, 
    nullable: false, 
    comment: "Chave hash que identifica o dispositivo" 
  })
  identificacao!: string;

  // --- RELACIONAMENTOS ---

  /** Usuário que cadastrou o dispositivo (opcional) */
  @ManyToOne(() => Usuario, (usuario) => usuario.dispositivos, { 
    nullable: true 
  })
  @JoinColumn({ name: "Usuario_ID" })
  usuarioRef?: Usuario;

  /** Cidadão que cadastrou o dispositivo (opcional) */
  @ManyToOne(() => Cidadao, (cidadao) => cidadao.dispositivos, { 
    nullable: true 
  })
  @JoinColumn({ name: "Cidadao_ID" })
  cidadaoRef?: Cidadao;

  /** Monitor de senha vinculado a este dispositivo (1:1) */
  @OneToOne(() => Monitor, (monitor) => monitor.dispositivoRef)
  monitor!: Monitor; // ✅ Obrigatório se o dispositivo for um monitor
}
import { Entity, PrimaryColumn, Column, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { Dispositivo } from "./Dispositivo";
import { Usuario } from "./Usuario";

/**
 * Entidade que representa um monitor de senhas no sistema.
 * Cada monitor está vinculado a um dispositivo e a um usuário que o cadastrou.
 */
@Entity("Monitor")
export class Monitor {
  /** Dispositivo associado (Chave Primária e Estrangeira) */
  @PrimaryColumn({ 
    name: "Dispositivo_ID", 
    comment: "ID do dispositivo que atua como monitor de senhas" 
  })
  dispositivoId!: number;

  /** Status: 0 - Inativo, 1 - Ativo */
  @Column({ 
    type: "tinyint", 
    default: 1, 
    comment: "Status do monitor: 0 - Inativo, 1 - Ativo" 
  })
  status!: number;

  /** Rótulo para identificação personalizada */
  @Column({ 
    type: "varchar", 
    length: 255, 
    nullable: true, 
    comment: "Rótulo para identificação do monitor" 
  })
  rotulo?: string;

  /** Data de cadastro do monitor */
  @Column({ 
    type: "timestamp", 
    nullable: true, 
    default: () => "CURRENT_TIMESTAMP", 
    comment: "Data de cadastro do monitor" 
  })
  dataCadastro?: Date;

  /** Guichês vinculados (formato JSON) */
  @Column({ 
    type: "json", 
    nullable: true, 
    comment: "Lista de guichês associados ao monitor (formato JSON)" 
  })
  guiches?: object;

  // --- RELACIONAMENTOS ---

  /** Dispositivo vinculado (1:1) */
  @OneToOne(() => Dispositivo, (dispositivo) => dispositivo.monitor)
  @JoinColumn({ name: "Dispositivo_ID" })
  dispositivoRef!: Dispositivo;

  /** Usuário que cadastrou o monitor */
  @ManyToOne(() => Usuario, (usuario) => usuario.monitores, { 
    nullable: false 
  })
  @JoinColumn({ name: "Usuario_ID" })
  usuarioRef!: Usuario;
}
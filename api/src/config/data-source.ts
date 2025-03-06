import "reflect-metadata";
import { DataSource } from "typeorm";
import { Usuario } from "../models/Usuario";
import { Orgao } from "../models/Orgao";
import { Local } from "../models/Local";
import { Agregador } from "../models/Agregador";
import { SubAgregado } from "../models/SubAgregado";
import { Servico } from "../models/Servico";
import { Requisito } from "../models/Requisito";
import { Rotulo } from "../models/Rotulo";
import { Conteudo } from "../models/Conteudo";
import { Atendimento } from "../models/Atendimento";
import { Acao } from "../models/Acao";
import { Auditoria } from "../models/Auditoria";
import { Avaliacao } from "../models/Avaliacao";
import { Cidadao } from "../models/Cidadao";
import { Cidade } from "../models/Cidade";
import { Dispositivo } from "../models/Dispositivo";
import { Guiche } from "../models/Guiche";
import { Monitor } from "../models/Monitor";
import { LoginUsuario } from "../models/LoginUsuario";
import { LoginCidadao } from "../models/LoginCidadao";
import { Configuracoes } from "../models/Configuracoes";

export const AppDataSource = new DataSource({
  type: "mysql", // Alterar para "postgres" se estiver usando PostgreSQL
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306, // Use 5432 para PostgreSQL
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "UltraDMA",
  database: process.env.DB_NAME || "iSet",
  synchronize: false, // Sempre false em produção
  logging: true, // Log de queries no console
  entities: [
    Usuario,
    Orgao,
    Local,
    Agregador,
    SubAgregado,
    Servico,
    Requisito,
    Rotulo,
    Conteudo,
    Atendimento,
    Acao,
    Auditoria,
    Avaliacao,
    Cidadao,
    Cidade,
    Dispositivo,
    Guiche,
    Monitor,
    LoginUsuario,
    LoginCidadao,
    Configuracoes,
  ],
  migrations: ["src/migrations/*.ts"],
});

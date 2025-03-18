import { DataSource } from "typeorm";
import { Acao } from "../models/Acao";
import { Agregador } from "../models/Agregador";
import { Atendimento } from "../models/Atendimento";
import { AuditoriaInterna } from "../models/AuditoriaInterna";
import { Avaliacao } from "../models/Avaliacao";
import { Cidadao } from "../models/Cidadao";
import { Cidade } from "../models/Cidade";
import { Codigos } from "../models/Codigos";
import { Configuracao } from "../models/Configuracao";
import { Conteudo } from "../models/Conteudo";
import { Direcionamento } from "../models/Direcionamento";
import { Dispositivo } from "../models/Dispositivo";
import { Guiche } from "../models/Guiche";
import { Local } from "../models/Local";
import { LoginCidadao } from "../models/LoginCidadao";
import { LoginUsuario } from "../models/LoginUsuario";
import { Monitor } from "../models/Monitor";
import { Requisito } from "../models/Requisito";
import { Rotulo } from "../models/Rotulo";
import { Servico } from "../models/Servico";
import { SubAgregador } from "../models/SubAgregador";
import { Unidade } from "../models/Unidade";
import { Usuario } from "../models/Usuario";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306"),
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "UltraDMA",
    database: process.env.DB_NAME || "iSet",
    synchronize: false,
    logging: false,
    entities: [
        Acao,
        Agregador,
        Atendimento,
        AuditoriaInterna,
        Avaliacao,
        Cidadao,
        Cidade,
        Codigos,
        Configuracao,
        Conteudo,
        Direcionamento,
        Dispositivo,
        Guiche,
        Local,
        LoginCidadao,
        LoginUsuario,
        Monitor,
        Requisito,
        Rotulo,
        Servico,
        SubAgregador,
        Unidade,
        Usuario
    ],
    migrations: ["../migrations/*.ts"],
    subscribers: []
});

// Função para testar a conexão com o banco de dados
export const testConnection = async () => {
    try {
        await AppDataSource.initialize();
        console.log("✅ Conexão com o banco de dados estabelecida com sucesso!");
        return true;
    } catch (error) {
        console.error("❌ Erro ao conectar ao banco de dados:", error);
        return false;
    }
};

/**
 * @lastModified 2025-03-18 00:38:19
 * @modifiedBy nosfcj
 */
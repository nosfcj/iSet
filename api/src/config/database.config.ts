import { DataSource } from "typeorm";
import { join } from "path";

export const AppDataSource = new DataSource({
    type: "mariadb",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306"),
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "UltraDMA",
    database: process.env.DB_NAME || "iSet",
    synchronize: false,
    logging: false,
    entities: [join(__dirname, "..", "models", "*.{ts,js}")],
    migrations: [join(__dirname, "..", "migrations", "*.{ts,js}")],
    subscribers: [],
    extra: {
        connectionLimit: 10,
        charset: "utf8mb4"
    }
});

// Função para testar a conexão com o banco de dados
export const testConnection = async () => {
    try {
        await AppDataSource.initialize();
        console.log("✅ Conexão com o banco de dados estabelecida com sucesso!");
        const version = await AppDataSource.query('SELECT VERSION() as version');
        console.log(`📊 Versão do MariaDB: ${version[0].version}`);
        return true;
    } catch (error) {
        console.error("❌ Erro ao conectar ao banco de dados:", error);
        return false;
    }
};

/**
 * @description Arquivo de configuração da conexão com o banco de dados
 * @lastModified 2025-03-22
 * @modifiedBy nosfcj
 * @version 1.0.1
 */
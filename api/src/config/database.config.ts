import "dotenv/config"; // Deve ser o primeiro import
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { join } from "path";
import "dotenv/config";

// Adicione este log para debug
console.log('Variáveis de ambiente:', {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    database: process.env.DB_NAME
  });

// Interface para validação das variáveis de ambiente
interface DbEnvConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  charset?: string;
}

// Função para validar variáveis de ambiente
const validateDbConfig = (): DbEnvConfig => {
  const config = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    charset: process.env.DB_CHARSET
  };

  // Validação básica das variáveis obrigatórias
  const requiredFields: (keyof DbEnvConfig)[] = ['host', 'port', 'username', 'password', 'database'];
  for (const field of requiredFields) {
    if (!config[field]) {
      throw new Error(`Configuração do banco de dados inválida: ${field} não definido`);
    }
  }

  return config as DbEnvConfig;
};

// Configuração do DataSource
const dbConfig = validateDbConfig();

const dataSourceOptions: DataSourceOptions = {
  type: "mysql",
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  charset: dbConfig.charset,
  synchronize: false, // Sempre false em produção - usando migrations
  logging: process.env.NODE_ENV !== 'production', // Log apenas em desenvolvimento
  entities: [join(__dirname, "..", "models", "*.{ts,js}")],
  migrations: [join(__dirname, "..", "migrations", "*.{ts,js}")],
  // Configurações adicionais de performance
  extra: {
    connectionLimit: 10,
    maxPoolSize: 20,
  }
};

// Exporta a instância do DataSource
export const AppDataSource = new DataSource(dataSourceOptions);

// Exporta função de teste de conexão
export const testConnection = async () => {
  try {
    await AppDataSource.initialize();
    console.log("✅ Conexão com banco de dados estabelecida com sucesso");
    return true;
  } catch (error) {
    console.error("❌ Erro ao conectar com banco de dados:", error);
    return false;
  }
};
import { DataSource } from "typeorm";
import "dotenv/config";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false, // Usaremos migrations para controle do schema
  logging: true,
  entities: ["src/models/*.ts"], // Modelos das tabelas
  migrations: ["src/migrations/*.ts"], // Scripts de migração
  charset: process.env.DB_CHARSET
});

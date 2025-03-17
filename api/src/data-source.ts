import { DataSource } from "typeorm";
import { Acao } from "./models/Acao";
import { Atendimento } from "./models/Atendimento";
import { Monitor } from "./models/Monitor";
import { Dispositivo } from "./models/Dispositivo";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306"),
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "iset",
    synchronize: false,
    logging: false,
    entities: [
        Acao,
        Atendimento,
        Monitor,
        Dispositivo
    ],
    migrations: ["src/migrations/*.ts"],
    subscribers: []
});
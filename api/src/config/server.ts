/**
 * Configuração do Servidor Express
 * @file api/src/config/server.ts
 * @description Configurações e middlewares do servidor Express
 * @createdBy Nosf!
 * @modifiedBy Jarvis
 */

import express from "express";
import cors from "cors";
import "express-async-errors";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares básicos
app.use(express.json());
app.use(cors());

// Rota de teste/status
app.get("/status", (req, res) => {
  res.json({
    status: "online",
    name: "iSet API",
    version: process.env.npm_package_version || "1.0.0",
    timestamp: new Date(),
    environment: process.env.NODE_ENV || "development"
  });
});

// Handler de erros global
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("❌ Erro não tratado:", err);
  res.status(500).json({
    error: "Erro interno do servidor",
    message: process.env.NODE_ENV === "development" ? err.message : undefined
  });
});

export { app, PORT };

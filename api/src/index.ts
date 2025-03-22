/**
 * Servidor Principal iSet
 * @file api/src/index.ts
 * @description Inicialização do servidor e configurações principais
 * @lastModified 2025-03-22 14:30:00
 * @createdBy Nosf!
 * @modifiedBy Jarvis
 */

import { app, PORT } from "./config/server";
import { testConnection } from "./config/database.config";
import { CacheManager } from "./utils/cacheManager";

// Inicializa o servidor
async function initServer() {
  try {
    // Testa conexão com banco de dados
    const connected = await testConnection();
    
    if (!connected) {
      throw new Error("Falha na conexão com o banco de dados");
    }

    // Inicializa cache do sistema
    await CacheManager.getOrSet("system:status", async () => ({
      startTime: new Date(),
      environment: process.env.NODE_ENV || "development"
    }));

    // Inicia o servidor
    app.listen(PORT, () => {
      console.log(`
🚀 Servidor iSet iniciado com sucesso!
📡 API rodando em http://localhost:${PORT}
🔧 Ambiente: ${process.env.NODE_ENV || "development"}
      `);
    });

  } catch (error) {
    console.error("❌ Erro fatal ao inicializar aplicação:", error);
    process.exit(1);
  }
}

initServer();
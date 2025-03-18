import { app, PORT } from "./config/server";
import { testConnection } from "./config/database.config";

// Inicializa a conexão com o banco de dados e inicia o servidor
testConnection()
  .then((connected) => {
    if (connected) {
      app.listen(PORT, () => {
        console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
      });
    } else {
      process.exit(1); // Encerra se não conseguir conectar ao banco
    }
  })
  .catch((error) => {
    console.error("❌ Erro fatal ao inicializar aplicação:", error);
    process.exit(1);
  });

/**
 * @lastModified 2025-03-18 00:01:05
 * @modifiedBy nosfcj
 */
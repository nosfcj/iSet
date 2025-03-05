import { app, PORT } from "./config/server";
import { AppDataSource } from "./config/ormconfig";

// Inicializa a conexão com o banco de dados e inicia o servidor
AppDataSource.initialize()
  .then(() => {
    console.log("✅ Conectado ao banco de dados com sucesso!");

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Erro ao conectar no banco de dados:", error);
  });

import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares básicos
app.use(express.json());
app.use(cors());

// Rota de teste
app.get("/", (req, res) => {
  res.send("🚀 API iSet rodando com sucesso!");
});

export { app, PORT };

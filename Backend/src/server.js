import "dotenv/config"; // Variáveis de ambiente .env
import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";

const app = express();

// Porta configurável via .env
const PORT = process.env.PORT || 5000;

// Conexão MongoDB
connectDB();

// Middlewares globais
app.use(express.json()); 
app.use(cors());

// Rotas da API
app.get("/", (req, res) => {
  res.send("🚀 API está rodando...");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});

export default app;

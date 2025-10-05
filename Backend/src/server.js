import "dotenv/config"; // Variáveis de ambiente .env
import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import SimulationRoutes from "./routes/SimulationRoutes.js";
import ProductRoutes from "./routes/ProductRoutes.js";

/// Inicializando o Express
const app = express();

/// Porta configurável via .env
const PORT = process.env.PORT || 5000;

/// Conexão MongoDB
connectDB();

/// Middlewares globais
app.use(express.json()); 
app.use(cors());

/// Consumindo API dos Correios pelo CEP
const limpaCEP = (cep) => cep.replace(/(\D)/g, ''); // remover tudo que não é número

const eNumero = (num) => /^[0-9]+$/.test(num); //verificação se contém apenas números

const cepValido = (cep) => cep.length === 8 && eNumero(cep); // verificação se contém 8 digitos e somente números

/// Função Buscar CEP
const buscaCEP = async (req, res) => {
  const cep = limpaCEP(req.params.cep);

  const url = `https://viacep.com.br/ws/${cep}/json/`;
  if (cepValido(cep)) {
    const dados = await fetch(url);
    const endereco = await dados.json();
    if (endereco.erro) {
      return res.status(400).json({ message: "CEP não encontrado" }); //depois vincular a resposta de erro no front
    } else {
      adcEndereco(endereco); // função para adicionar endereço ao front
      return res.status(200).json(endereco);
    }
  } else {
    return res.status(400).json({ message: "CEP inválido" }); //depois vincular a resposta de erro no front
  }
};

cep.addEventListener("focusout", buscaCEP); // Chamar a função ao perder o foco


//// Rotas da API

// Rotas de Módulos
app.use("/api/produtos", ProductRoutes);
app.use("/api/frete", SimulationRoutes);

// Rotas Simulação de Frete
// Rota Busca de CEP
app.get("/cep/:cep", buscaCEP);


// Rotas de Produtos
// Rota Busca de Produtos
app.get("/produtos", ProductRoutes);

// Rota Busca de Produto por ID
app.get("/produtos/:id", ProductRoutes);

// Rotas de Criação
app.post("/produtos", ProductRoutes);

// Rotas de Atualização
app.put("/produtos/:id", ProductRoutes);

// Rotas de Exclusão
app.delete("/produtos/:id", ProductRoutes);



/// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});

/// Exportando o servidor
export default app;

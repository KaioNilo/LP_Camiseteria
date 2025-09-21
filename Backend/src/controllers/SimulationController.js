import { Simulation } from '../models/Simulation.js'; // Importe seu modelo de Simulação
import axios from 'axios'; // Para fazer a requisição HTTP à API dos Correios
// import NodeCache from 'node-cache'; // Se você quiser usar um cache em memória além do DB
// const myCache = new NodeCache({ stdTTL: 600 }); // Cache de 10 minutos em memória, opcional

// @desc    Simular frete (PAC e SEDEX)
// @route   POST /api/frete
// @access  Public
export const simulateFreight = async (req, res) => {
  const { cep } = req.body;

  // --- 1. Validação Básica do CEP (Opcional, pois o Middleware fará isso) ---
  // Se você tiver um middleware de validação de CEP, ele já faria isso.
  // Mas é bom ter uma validação mínima aqui ou garantir que o middleware seja executado.
  if (!cep || !/^\d{5}-?\d{3}$/.test(cep)) {
    return res.status(400).json({ message: 'CEP inválido. Forneça um CEP no formato XXXXX-XXX ou XXXXXXXX.' });
  }

  try {
    // --- 2. Verificar o Cache no MongoDB ---
    // Busca a simulação mais recente para este CEP que ainda não expirou
    const cachedSimulation = await Simulation.findOne({ cep: cep }).sort({ date: -1 });

    if (cachedSimulation) {
      console.log(`[Cache Hit] Frete para ${cep} encontrado no cache.`);
      return res.status(200).json(cachedSimulation.results);
    }

    console.log(`[Cache Miss] Frete para ${cep} não encontrado no cache. Consultando API externa.`);

    // --- 3. Fazer a Chamada à API dos Correios (ou serviço de frete externo) ---
    // ATENÇÃO: Esta é uma simulação. Você precisará substituir esta lógica
    // pela chamada real à API dos Correios ou a um serviço intermediário.
    // Exemplo: https://api.correios.com.br/token/v1/precos/nacional
    // Ou usar uma biblioteca como 'correios-api' ou 'rastreamento-correios-api'

    const simulatedFreightResults = await fetchFreightFromExternalAPI(cep); // Função a ser implementada abaixo

    // Se a API externa não retornar resultados válidos
    if (!simulatedFreightResults || simulatedFreightResults.length === 0) {
      return res.status(500).json({ message: 'Não foi possível obter resultados de frete para o CEP informado.' });
    }

    // --- 4. Salvar o Resultado no Banco de Dados (Cache) ---
    const newSimulation = new Simulation({
      cep: cep,
      results: simulatedFreightResults,
      // 'date' e 'expires' são definidos automaticamente pelo schema
    });
    await newSimulation.save();
    console.log(`[Cache Saved] Frete para ${cep} salvo no banco de dados.`);

    // --- 5. Retornar o Resultado para o Cliente ---
    res.status(200).json(simulatedFreightResults);

  } catch (error) {
    console.error(`Erro ao simular frete para ${cep}:`, error.message);
    res.status(500).json({ message: 'Erro interno do servidor ao simular frete.', error: error.message });
  }
};


// --- Função de Exemplo para Simular a Chamada à API Externa ---
// ATENÇÃO: Esta função precisa ser substituída pela sua integração real com os Correios.
async function fetchFreightFromExternalAPI(cep) {
  // Nesta função, você faria a chamada real à API dos Correios.
  // Por exemplo, usando axios para uma URL específica com seus parâmetros.

  // Exemplo de como seria a estrutura de uma chamada AXIOS (apenas para ilustrar)
  /*
  try {
    const response = await axios.get(`https://api.correios.com.br/v1/frete?cep=${cep}&peso=1&altura=10&largura=10&comprimento=10`, {
      headers: {
        'Authorization': `Bearer ${process.env.CORREIOS_API_TOKEN}` // Exemplo de autenticação
      }
    });
    // Você precisaria transformar a resposta da API dos Correios para o formato do seu schema
    const pac = response.data.services.find(s => s.code === '04510'); // Exemplo de código PAC
    const sedex = response.data.services.find(s => s.code === '04014'); // Exemplo de código SEDEX

    let results = [];
    if (pac) results.push({ service: 'PAC', price: pac.valor, delivery: pac.prazo });
    if (sedex) results.push({ service: 'SEDEX', price: sedex.valor, delivery: sedex.prazo });
    return results;

  } catch (apiError) {
    console.error("Erro ao consultar API dos Correios:", apiError.message);
    return []; // Retorna array vazio em caso de erro
  }
  */

  // --- Dados MOCK para Teste (APAGAR DEPOIS DE INTEGRAR A API REAL) ---
  // Estes dados simulam a resposta da API externa
  const randomPricePAC = (Math.random() * (30 - 15) + 15).toFixed(2);
  const randomPriceSEDEX = (Math.random() * (50 - 25) + 25).toFixed(2);
  const randomDeliveryPAC = Math.floor(Math.random() * (10 - 5) + 5);
  const randomDeliverySEDEX = Math.floor(Math.random() * (5 - 2) + 2);

  return [
    { service: 'PAC', price: parseFloat(randomPricePAC), delivery: randomDeliveryPAC },
    { service: 'SEDEX', price: parseFloat(randomPriceSEDEX), delivery: randomDeliverySEDEX }
  ];
}
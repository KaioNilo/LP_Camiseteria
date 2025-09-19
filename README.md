# LP_Camiseteria
Projeto de Landing Page de uma Camiseteria

🛍️ Camiseteria Landing Page

Landing page de uma camisetaria com listagem de produtos, simulação de frete via Correios (PAC + SEDEX) e integração com WhatsApp para envio do valor do frete diretamente para a loja.

-----------------------------------------------------------------------------------------------------------------------

📌 Funcionalidades

 CRUD de produtos (nome, preço, tamanhos, imagens).

 Simulação de frete (PAC + SEDEX) via API dos Correios.

 Armazenamento de simulações no MongoDB.

 Envio de valor de frete diretamente para o WhatsApp da loja.

 Estrutura modular de backend e frontend.

 Deploy preparado com HTTPS, Docker e MongoDB Atlas.

-----------------------------------------------------------------------------------------------------------------------

📂 Estrutura do Projeto
camiseteria-landing-page/
│── docs/                # Planejamento e documentação
│── design/              # Arquivos de UI/UX (Figma, protótipos)
│── frontend/            # React + Vite
│── backend/             # Node.js + Express + MongoDB
│── deploy/              # Docker, CI/CD, configs de deploy
│── scripts/             # Scripts utilitários (seed, backup)
│── .env.example         # Exemplo de variáveis de ambiente
│── README.md

-----------------------------------------------------------------------------------------------------------------------

🚀 Tecnologias
Frontend
----------------
React + Vite

Axios (requisições HTTP)

TailwindCSS ou Styled Components (estilização)


Backend
---------------
Node.js + Express

MongoDB + Mongoose

Axios (integração Correios)

Node-cache (cache local para simulações)

Dotenv (variáveis de ambiente)


Deploy
--------------
Frontend → Vercel/Netlify

Backend → Render/Heroku ou VPS com Docker

Banco → MongoDB Atlas

Proxy reverso → Nginx (com SSL via Let’s Encrypt)

-----------------------------------------------------------------------------------------------------------------------

⚙️ Instalação Local
1️⃣ Clonar o repositório
git clone https://github.com/seuusuario/camiseteria-landing-page.git
cd camiseteria-landing-page

2️⃣ Configurar o Backend
cd backend
npm install
cp .env.example .env


No arquivo .env, configure:

PORT=5000
MONGO_URI=sua-string-mongodb
CORREIOS_URL=https://api.correios.com.br/ws
WHATSAPP_NUMERO=5599999999999  # número da loja no formato internacional


Rodar servidor:

npm run dev

3️⃣ Configurar o Frontend
cd ../frontend
npm install
npm run dev


Frontend estará rodando em http://localhost:5173 🚀

-----------------------------------------------------------------------------------------------------------------------

📡 Rotas da API
Produtos
------------
GET /api/produtos → listar produtos

POST /api/produtos → cadastrar

PUT /api/produtos/:id → atualizar

DELETE /api/produtos/:id → remover


Frete
-----------
POST /api/frete

{
  "cep": "01001-000"
}


Resposta:

{
  "pac": { "valor": 25.90, "prazo": "7 dias" },
  "sedex": { "valor": 39.50, "prazo": "3 dias" },
  "codigo": "66f8d9a23f9c2"
}


GET /api/frete/:codigo → retorna simulação salva

-----------------------------------------------------------------------------------------------------------------------

🔒 Segurança e Proteção de Dados

Apenas CEP e valor do frete são armazenados no banco (sem dados sensíveis).

Variáveis de ambiente protegidas em .env.

Logs não expõem dados pessoais.

Deploy sempre em HTTPS.

Backup automático do banco via script (scripts/backup.js).

-----------------------------------------------------------------------------------------------------------------------

☁️ Deploy
Frontend (Vercel)
cd frontend
npm run build
vercel deploy

Backend (Render/Heroku)
cd backend
git push render main

MongoDB Atlas

Criar cluster gratuito

Copiar connection string

Colar em .env do backend

Docker (opcional)
docker-compose up -d

-----------------------------------------------------------------------------------------------------------------------

📱 Integração WhatsApp

Ao calcular o frete, o cliente verá um botão:
👉 "Enviar para WhatsApp"

Isso abrirá uma conversa no WhatsApp da loja com a mensagem:

Olá! Simulei meu frete para o CEP 01001-000.
Opções:
- PAC: R$ 25,90 (7 dias)
- SEDEX: R$ 39,50 (3 dias)

-----------------------------------------------------------------------------------------------------------------------

✅ Checklist Antes do Deploy

 Definir variáveis de ambiente no servidor

 Configurar HTTPS (Let's Encrypt ou Cloudflare)

 Habilitar CORS apenas para o domínio da loja

 Testar simulação de frete em diferentes cenários

 Validar LGPD: não armazenar dados desnecessários
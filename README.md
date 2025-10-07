# VoiceAI Pro - Plataforma SaaS de Chamadas Telefônicas com IA

Plataforma completa para oferecer serviços de chamadas telefônicas com IA ultra-realistas, baseada na API da Bland.ai.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Executando o Projeto](#executando-o-projeto)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [API Endpoints](#api-endpoints)
- [Deploy](#deploy)
- [Integração com Bland.ai](#integração-com-blandai)

## 🎯 Visão Geral

O VoiceAI Pro é uma plataforma SaaS completa que permite aos seus clientes utilizarem o serviço de chamadas telefônicas com IA da Bland.ai através de uma interface própria e personalizada. A plataforma inclui:

- **Site Institucional** com landing page, preços e documentação
- **Dashboard Completo** com gerenciamento de chamadas, pathways e bases de conhecimento
- **Sistema de Autenticação** seguro com JWT
- **Banco de Dados PostgreSQL** com Prisma ORM
- **API REST** completa para todas as operações
- **Integração com Bland.ai** para chamadas telefônicas com IA

## ✨ Funcionalidades

### Site Institucional
- Landing page atraente com hero section e CTAs
- Página de preços com 3 planos (Básico, Profissional, Empresarial)
- Documentação completa da API e serviços
- Design responsivo e moderno

### Dashboard
- **Painel Principal**: Estatísticas em tempo real, gráficos e atividade recente
- **Gerenciamento de Chamadas**: Iniciar, listar e visualizar detalhes de chamadas
- **Pathways**: Criar e gerenciar fluxos de conversação personalizados
- **Base de Conhecimento**: Gerenciar conteúdo que os agentes de IA podem acessar
- **Configurações**: Gerenciar API key da Bland.ai, webhooks e perfil
- **Faturamento**: Visualizar uso e custos

### Backend
- Autenticação JWT com sessões
- CRUD completo para todas as entidades
- Validação de dados com Zod
- Integração com API da Bland.ai
- Webhooks para notificações em tempo real

## 🛠 Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca JavaScript para interfaces
- **React Router DOM** - Navegação entre páginas
- **Tailwind CSS** - Framework CSS utilitário
- **shadcn/ui** - Componentes UI reutilizáveis
- **Lucide Icons** - Ícones modernos
- **Recharts** - Gráficos e visualizações
- **Vite** - Build tool e dev server

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Prisma** - ORM para banco de dados
- **PostgreSQL** - Banco de dados relacional
- **JWT** - Autenticação
- **Bcrypt** - Hash de senhas
- **Zod** - Validação de schemas

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **PostgreSQL** 14+ ([Download](https://www.postgresql.org/download/))
- **pnpm** (ou npm/yarn)
- **Conta na Bland.ai** ([Criar conta](https://app.bland.ai/))

## 🚀 Instalação

### 1. Clone o repositório (ou extraia o ZIP)

\`\`\`bash
cd bland-saas
\`\`\`

### 2. Instale as dependências do Frontend

\`\`\`bash
pnpm install
\`\`\`

### 3. Instale as dependências do Backend

\`\`\`bash
cd server
pnpm install
cd ..
\`\`\`

## ⚙️ Configuração

### 1. Configurar Banco de Dados

Crie um banco de dados PostgreSQL:

\`\`\`bash
# Conecte ao PostgreSQL
psql -U postgres

# Crie o banco de dados
CREATE DATABASE bland_saas;

# Saia do psql
\\q
\`\`\`

### 2. Configurar Variáveis de Ambiente

Copie o arquivo de exemplo e configure:

\`\`\`bash
cp .env.example .env
\`\`\`

Edite o arquivo \`.env\` e configure:

\`\`\`env
# Database
DATABASE_URL="postgresql://postgres:sua_senha@localhost:5432/bland_saas?schema=public"

# Bland.ai API (opcional - pode ser configurado no dashboard)
BLAND_API_KEY="sk-..."

# JWT Secret (gere uma chave aleatória segura)
JWT_SECRET="sua-chave-secreta-muito-segura-aqui"

# App
NODE_ENV="development"
PORT=3000

# Frontend URL
FRONTEND_URL="http://localhost:5173"
\`\`\`

### 3. Executar Migrações do Banco de Dados

\`\`\`bash
cd server
pnpm prisma generate
pnpm prisma migrate dev --name init
cd ..
\`\`\`

## 🏃 Executando o Projeto

### Desenvolvimento

Execute o frontend e backend simultaneamente:

**Terminal 1 - Frontend:**
\`\`\`bash
pnpm run dev
\`\`\`

**Terminal 2 - Backend:**
\`\`\`bash
cd server
pnpm run dev
\`\`\`

Acesse:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000

### Produção

**Build do Frontend:**
\`\`\`bash
pnpm run build
\`\`\`

**Executar Backend:**
\`\`\`bash
cd server
pnpm start
\`\`\`

## 📁 Estrutura do Projeto

\`\`\`
bland-saas/
├── src/                          # Frontend
│   ├── components/               # Componentes React
│   │   ├── ui/                   # Componentes shadcn/ui
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── DashboardSidebar.jsx
│   │   └── DashboardLayout.jsx
│   ├── pages/                    # Páginas da aplicação
│   │   ├── Home.jsx              # Landing page
│   │   ├── Pricing.jsx           # Preços
│   │   ├── Documentation.jsx     # Documentação
│   │   ├── Login.jsx             # Login
│   │   ├── Register.jsx          # Registro
│   │   ├── Dashboard.jsx         # Painel principal
│   │   ├── Calls.jsx             # Chamadas
│   │   ├── Pathways.jsx          # Pathways
│   │   ├── KnowledgeBase.jsx     # Base de conhecimento
│   │   └── Settings.jsx          # Configurações
│   ├── services/                 # Serviços
│   │   └── blandApi.js           # Cliente API Bland.ai
│   ├── contexts/                 # Contexts React
│   │   └── BlandApiContext.jsx   # Context da API
│   ├── App.jsx                   # Componente principal
│   └── main.jsx                  # Entry point
├── server/                       # Backend
│   ├── routes/                   # Rotas da API
│   │   ├── auth.js               # Autenticação
│   │   ├── calls.js              # Chamadas
│   │   ├── pathways.js           # Pathways
│   │   ├── knowledgeBases.js     # Bases de conhecimento
│   │   └── user.js               # Usuário
│   ├── middleware/               # Middlewares
│   │   └── auth.js               # Middleware de autenticação
│   ├── index.js                  # Entry point do servidor
│   └── package.json              # Dependências do backend
├── prisma/                       # Prisma ORM
│   └── schema.prisma             # Schema do banco de dados
├── public/                       # Arquivos estáticos
├── .env.example                  # Exemplo de variáveis de ambiente
├── package.json                  # Dependências do frontend
└── README.md                     # Este arquivo
\`\`\`

## 🔌 API Endpoints

### Autenticação
- \`POST /api/auth/register\` - Criar nova conta
- \`POST /api/auth/login\` - Fazer login
- \`POST /api/auth/logout\` - Fazer logout
- \`GET /api/auth/me\` - Obter dados do usuário autenticado

### Chamadas
- \`GET /api/calls\` - Listar chamadas
- \`GET /api/calls/:id\` - Obter detalhes de uma chamada
- \`POST /api/calls\` - Criar nova chamada
- \`GET /api/calls/stats/summary\` - Obter estatísticas

### Pathways
- \`GET /api/pathways\` - Listar pathways
- \`GET /api/pathways/:id\` - Obter detalhes de um pathway
- \`POST /api/pathways\` - Criar novo pathway
- \`PUT /api/pathways/:id\` - Atualizar pathway
- \`DELETE /api/pathways/:id\` - Deletar pathway

### Bases de Conhecimento
- \`GET /api/knowledge-bases\` - Listar bases
- \`GET /api/knowledge-bases/:id\` - Obter detalhes de uma base
- \`POST /api/knowledge-bases\` - Criar nova base
- \`PUT /api/knowledge-bases/:id\` - Atualizar base
- \`DELETE /api/knowledge-bases/:id\` - Deletar base

### Usuário
- \`GET /api/user/profile\` - Obter perfil
- \`PUT /api/user/profile\` - Atualizar perfil
- \`DELETE /api/user/account\` - Deletar conta

## 🚢 Deploy

### Frontend (Vercel)

1. Faça push do código para um repositório Git (GitHub, GitLab, Bitbucket)

2. Acesse [Vercel](https://vercel.com) e importe seu repositório

3. Configure as variáveis de ambiente:
   - \`VITE_API_URL\` - URL do backend em produção

4. Deploy automático!

### Backend (Railway, Render, ou VPS)

**Opção 1: Railway**
1. Acesse [Railway](https://railway.app)
2. Crie novo projeto e conecte seu repositório
3. Adicione PostgreSQL database
4. Configure variáveis de ambiente
5. Deploy automático!

**Opção 2: Render**
1. Acesse [Render](https://render.com)
2. Crie novo Web Service
3. Adicione PostgreSQL database
4. Configure variáveis de ambiente
5. Deploy automático!

**Opção 3: VPS (DigitalOcean, AWS, etc)**
1. Configure servidor com Node.js e PostgreSQL
2. Clone o repositório
3. Configure variáveis de ambiente
4. Execute migrações do Prisma
5. Use PM2 para gerenciar o processo:
   \`\`\`bash
   npm install -g pm2
   pm2 start server/index.js --name bland-saas-api
   pm2 startup
   pm2 save
   \`\`\`

## 🔗 Integração com Bland.ai

### 1. Obter API Key

1. Acesse [Bland.ai Dashboard](https://app.bland.ai/)
2. Vá em **Settings** → **API Keys**
3. Crie uma nova API key
4. Copie a chave (começa com \`sk-\`)

### 2. Configurar no Dashboard

1. Faça login na plataforma
2. Vá em **Configurações**
3. Cole sua API key da Bland.ai
4. Clique em **Salvar API Key**

### 3. Usar a API

O serviço \`blandApi.js\` já está configurado com todos os endpoints principais:

\`\`\`javascript
import { getBlandApi } from './services/blandApi';

const api = getBlandApi();

// Enviar chamada
const call = await api.sendCall({
  phone_number: '+5511999999999',
  task: 'Fazer uma pesquisa de satisfação',
  pathway_id: 'pw_123',
  language: 'pt-BR'
});

// Listar chamadas
const calls = await api.listCalls();

// Obter detalhes
const callDetails = await api.getCall(call.call_id);
\`\`\`

### Endpoints Disponíveis

- **Chamadas**: \`sendCall\`, \`listCalls\`, \`getCall\`, \`getCallTranscript\`, \`getCallRecording\`
- **Pathways**: \`createPathway\`, \`listPathways\`, \`getPathway\`, \`updatePathway\`, \`deletePathway\`
- **Knowledge Bases**: \`createKnowledgeBase\`, \`listKnowledgeBases\`, \`getKnowledgeBase\`, \`updateKnowledgeBase\`, \`deleteKnowledgeBase\`
- **Vozes**: \`listVoices\`
- **Analytics**: \`getAnalytics\`

## 📝 Notas Importantes

### Segurança
- **NUNCA** commite o arquivo \`.env\` com credenciais reais
- Use senhas fortes para JWT_SECRET
- Configure CORS adequadamente em produção
- Use HTTPS em produção

### Banco de Dados
- Faça backups regulares do banco de dados
- Use connection pooling em produção
- Configure índices adequados para performance

### Bland.ai
- Monitore o uso da API para evitar custos inesperados
- Configure webhooks para notificações em tempo real
- Teste chamadas em ambiente de desenvolvimento primeiro

## 🐛 Troubleshooting

### Erro de conexão com banco de dados
- Verifique se o PostgreSQL está rodando
- Confirme as credenciais no \`.env\`
- Execute as migrações: \`pnpm prisma migrate dev\`

### Erro de autenticação
- Verifique se o JWT_SECRET está configurado
- Limpe o localStorage do navegador
- Verifique se o token não expirou

### Erro na API da Bland.ai
- Confirme se a API key está correta
- Verifique se tem créditos na conta Bland.ai
- Consulte a [documentação oficial](https://docs.bland.ai/)

## 📞 Suporte

Para dúvidas sobre:
- **Bland.ai**: [docs.bland.ai](https://docs.bland.ai/)
- **Prisma**: [prisma.io/docs](https://www.prisma.io/docs)
- **React**: [react.dev](https://react.dev/)

## 📄 Licença

Este projeto é fornecido como está, sem garantias. Você é livre para modificar e usar conforme necessário.

---

**Desenvolvido por Ramon Cerqueira, com ❤️ para oferecer a melhor experiência em chamadas telefônicas com IA**

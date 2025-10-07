# 🚀 Guia de Início Rápido - VoiceAI Pro

Este guia vai te ajudar a colocar a plataforma no ar em menos de 10 minutos!

## Passo 1: Instalar Dependências

\`\`\`bash
# Instalar dependências do frontend
pnpm install

# Instalar dependências do backend
cd server
pnpm install
cd ..
\`\`\`

## Passo 2: Configurar Banco de Dados

### Criar banco PostgreSQL

\`\`\`bash
# Conectar ao PostgreSQL
psql -U postgres

# Criar banco
CREATE DATABASE bland_saas;

# Sair
\\q
\`\`\`

### Configurar .env

\`\`\`bash
# Copiar arquivo de exemplo
cp .env.example .env
\`\`\`

Edite o \`.env\` e configure:

\`\`\`env
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/bland_saas?schema=public"
JWT_SECRET="gere-uma-chave-aleatoria-segura-aqui"
\`\`\`

### Executar migrações

\`\`\`bash
cd server
pnpm prisma generate
pnpm prisma migrate dev --name init
cd ..
\`\`\`

## Passo 3: Iniciar Aplicação

### Terminal 1 - Frontend

\`\`\`bash
pnpm run dev
\`\`\`

### Terminal 2 - Backend

\`\`\`bash
cd server
pnpm run dev
\`\`\`

## Passo 4: Acessar a Plataforma

1. Abra o navegador em: **http://localhost:5173**
2. Clique em **Começar Agora** ou **Login**
3. Crie sua conta
4. Faça login

## Passo 5: Configurar Bland.ai

1. Acesse [Bland.ai](https://app.bland.ai/) e crie uma conta
2. Vá em **Settings** → **API Keys**
3. Copie sua API key (começa com \`sk-\`)
4. No dashboard da plataforma, vá em **Configurações**
5. Cole a API key e clique em **Salvar**

## 🎉 Pronto!

Agora você pode:
- ✅ Criar chamadas telefônicas com IA
- ✅ Gerenciar pathways (fluxos de conversação)
- ✅ Criar bases de conhecimento
- ✅ Visualizar estatísticas e relatórios

## 📚 Próximos Passos

1. **Explore o Dashboard**: Navegue pelas diferentes seções
2. **Crie um Pathway**: Defina fluxos de conversação personalizados
3. **Adicione Conhecimento**: Crie bases de conhecimento para seus agentes
4. **Faça uma Chamada Teste**: Teste o serviço com um número real

## ⚠️ Importante

- A API da Bland.ai cobra **$0.09 por minuto** de chamada
- Monitore seu uso no dashboard da Bland.ai
- Configure webhooks para receber notificações em tempo real

## 🆘 Problemas?

### Erro ao conectar no banco
\`\`\`bash
# Verificar se PostgreSQL está rodando
sudo service postgresql status

# Iniciar PostgreSQL
sudo service postgresql start
\`\`\`

### Erro nas migrações
\`\`\`bash
# Resetar banco (CUIDADO: apaga todos os dados)
cd server
pnpm prisma migrate reset
pnpm prisma migrate dev
\`\`\`

### Porta já em uso
\`\`\`bash
# Frontend (porta 5173)
lsof -ti:5173 | xargs kill -9

# Backend (porta 3000)
lsof -ti:3000 | xargs kill -9
\`\`\`

## 📖 Documentação Completa

Consulte o [README.md](./README.md) para documentação completa, incluindo:
- Estrutura do projeto
- API endpoints
- Deploy em produção
- Troubleshooting detalhado

---

**Bom desenvolvimento! 🚀**

# 🚢 Guia de Deploy - VoiceAI Pro

Este guia detalha como fazer o deploy da plataforma em produção.

## 📋 Pré-requisitos

- Conta no [Vercel](https://vercel.com) (frontend)
- Conta no [Railway](https://railway.app) ou [Render](https://render.com) (backend + banco)
- Repositório Git (GitHub, GitLab ou Bitbucket)
- API Key da Bland.ai

## 🎯 Opção 1: Deploy Completo (Recomendado)

### Frontend no Vercel + Backend no Railway

Esta é a opção mais simples e recomendada para produção.

---

## 📦 Parte 1: Deploy do Backend (Railway)

### 1. Preparar o Projeto

Certifique-se de que o código está commitado no Git:

\`\`\`bash
git add .
git commit -m "Preparar para deploy"
git push origin main
\`\`\`

### 2. Criar Projeto no Railway

1. Acesse [Railway.app](https://railway.app)
2. Clique em **New Project**
3. Selecione **Deploy from GitHub repo**
4. Autorize o Railway a acessar seu repositório
5. Selecione o repositório do projeto

### 3. Adicionar PostgreSQL

1. No projeto do Railway, clique em **+ New**
2. Selecione **Database** → **PostgreSQL**
3. Aguarde a criação do banco

### 4. Configurar Variáveis de Ambiente

No serviço do backend, adicione:

\`\`\`env
# Será preenchido automaticamente pelo Railway
DATABASE_URL=${{Postgres.DATABASE_URL}}

# Gere uma chave aleatória segura
JWT_SECRET=sua-chave-jwt-super-secreta-aqui

# Produção
NODE_ENV=production
PORT=3000

# URL do frontend (será atualizada depois)
FRONTEND_URL=https://seu-dominio.vercel.app
\`\`\`

### 5. Configurar Build

No Railway, configure:

- **Root Directory**: \`server\`
- **Build Command**: \`pnpm install && pnpm prisma generate && pnpm prisma migrate deploy\`
- **Start Command**: \`pnpm start\`

### 6. Deploy

1. Clique em **Deploy**
2. Aguarde o build e deploy
3. Copie a URL do serviço (ex: \`https://bland-saas-api.up.railway.app\`)

---

## 🌐 Parte 2: Deploy do Frontend (Vercel)

### 1. Preparar Build

Edite o \`package.json\` e adicione:

\`\`\`json
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview"
  }
}
\`\`\`

### 2. Criar Projeto no Vercel

1. Acesse [Vercel.com](https://vercel.com)
2. Clique em **Add New** → **Project**
3. Importe seu repositório do GitHub
4. Configure o projeto:
   - **Framework Preset**: Vite
   - **Root Directory**: \`./\` (raiz)
   - **Build Command**: \`pnpm run build\`
   - **Output Directory**: \`dist\`

### 3. Configurar Variáveis de Ambiente

Adicione as variáveis:

\`\`\`env
VITE_API_URL=https://seu-backend.up.railway.app
\`\`\`

### 4. Deploy

1. Clique em **Deploy**
2. Aguarde o build
3. Acesse a URL gerada (ex: \`https://voiceai-pro.vercel.app\`)

### 5. Atualizar CORS no Backend

Volte ao Railway e atualize a variável \`FRONTEND_URL\`:

\`\`\`env
FRONTEND_URL=https://voiceai-pro.vercel.app
\`\`\`

---

## 🎯 Opção 2: Deploy no Render

### Backend + Banco de Dados

1. Acesse [Render.com](https://render.com)
2. Crie um **PostgreSQL** database
3. Crie um **Web Service**:
   - **Root Directory**: \`server\`
   - **Build Command**: \`pnpm install && pnpm prisma generate && pnpm prisma migrate deploy\`
   - **Start Command**: \`pnpm start\`
4. Configure variáveis de ambiente
5. Deploy!

---

## 🎯 Opção 3: Deploy em VPS (DigitalOcean, AWS, etc)

### 1. Configurar Servidor

\`\`\`bash
# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Instalar PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Instalar pnpm
npm install -g pnpm

# Instalar PM2
npm install -g pm2
\`\`\`

### 2. Configurar PostgreSQL

\`\`\`bash
# Criar banco e usuário
sudo -u postgres psql

CREATE DATABASE bland_saas;
CREATE USER bland_user WITH ENCRYPTED PASSWORD 'senha_segura';
GRANT ALL PRIVILEGES ON DATABASE bland_saas TO bland_user;
\\q
\`\`\`

### 3. Clonar e Configurar Projeto

\`\`\`bash
# Clonar repositório
git clone https://github.com/seu-usuario/bland-saas.git
cd bland-saas

# Instalar dependências
pnpm install
cd server
pnpm install

# Configurar .env
nano .env
# Cole as variáveis de ambiente

# Executar migrações
pnpm prisma generate
pnpm prisma migrate deploy
\`\`\`

### 4. Build do Frontend

\`\`\`bash
cd ..
pnpm run build
\`\`\`

### 5. Configurar Nginx

\`\`\`bash
sudo apt install -y nginx

# Criar configuração
sudo nano /etc/nginx/sites-available/bland-saas
\`\`\`

Cole:

\`\`\`nginx
server {
    listen 80;
    server_name seu-dominio.com;

    # Frontend
    location / {
        root /home/ubuntu/bland-saas/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
\`\`\`

Ative:

\`\`\`bash
sudo ln -s /etc/nginx/sites-available/bland-saas /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
\`\`\`

### 6. Iniciar Backend com PM2

\`\`\`bash
cd server
pm2 start index.js --name bland-saas-api
pm2 startup
pm2 save
\`\`\`

### 7. Configurar SSL (Certbot)

\`\`\`bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d seu-dominio.com
\`\`\`

---

## 🔒 Segurança em Produção

### 1. Variáveis de Ambiente

- ✅ Use senhas fortes e únicas
- ✅ Nunca commite o arquivo \`.env\`
- ✅ Use secrets managers em produção

### 2. CORS

Configure CORS adequadamente no backend:

\`\`\`javascript
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
\`\`\`

### 3. Rate Limiting

Adicione rate limiting para proteger a API:

\`\`\`bash
cd server
pnpm add express-rate-limit
\`\`\`

\`\`\`javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // limite de 100 requests
});

app.use('/api/', limiter);
\`\`\`

### 4. HTTPS

- ✅ Use sempre HTTPS em produção
- ✅ Configure certificados SSL/TLS
- ✅ Redirecione HTTP para HTTPS

---

## 📊 Monitoramento

### Logs

**Railway/Render**: Logs disponíveis no dashboard

**VPS com PM2**:
\`\`\`bash
pm2 logs bland-saas-api
pm2 monit
\`\`\`

### Uptime Monitoring

Configure monitoramento com:
- [UptimeRobot](https://uptimerobot.com)
- [Pingdom](https://www.pingdom.com)
- [Better Uptime](https://betteruptime.com)

---

## 🔄 Atualizações

### Vercel (Auto-deploy)

Commits na branch \`main\` fazem deploy automático.

### Railway (Auto-deploy)

Commits na branch \`main\` fazem deploy automático.

### VPS (Manual)

\`\`\`bash
cd bland-saas
git pull origin main

# Atualizar frontend
pnpm install
pnpm run build

# Atualizar backend
cd server
pnpm install
pnpm prisma migrate deploy
pm2 restart bland-saas-api
\`\`\`

---

## ✅ Checklist de Deploy

Antes de ir para produção:

- [ ] Banco de dados configurado e com backup
- [ ] Variáveis de ambiente configuradas
- [ ] CORS configurado corretamente
- [ ] SSL/HTTPS ativado
- [ ] Rate limiting implementado
- [ ] Logs configurados
- [ ] Monitoramento ativo
- [ ] Domínio personalizado configurado
- [ ] Testes realizados em produção
- [ ] Documentação atualizada

---

## 🆘 Troubleshooting

### Erro de CORS

Verifique se \`FRONTEND_URL\` está correto no backend.

### Erro de Database

Verifique se as migrações foram executadas:
\`\`\`bash
pnpm prisma migrate deploy
\`\`\`

### Build falha

Verifique os logs de build e certifique-se de que todas as dependências estão instaladas.

---

**Deploy bem-sucedido! 🎉**

Para suporte adicional, consulte:
- [Documentação Vercel](https://vercel.com/docs)
- [Documentação Railway](https://docs.railway.app)
- [Documentação Render](https://render.com/docs)

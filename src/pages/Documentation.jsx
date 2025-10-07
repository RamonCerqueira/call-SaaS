import { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { 
  Book, 
  Code, 
  Webhook, 
  Key, 
  Phone, 
  FileText,
  Copy,
  Check
} from 'lucide-react';

export default function Documentation() {
  const [copiedCode, setCopiedCode] = useState(null);

  const sections = [
    { id: 'intro', title: 'Introdução', icon: Book },
    { id: 'quickstart', title: 'Início Rápido', icon: FileText },
    { id: 'auth', title: 'Autenticação', icon: Key },
    { id: 'calls', title: 'Enviar Chamadas', icon: Phone },
    { id: 'webhooks', title: 'Webhooks', icon: Webhook },
    { id: 'examples', title: 'Exemplos de Código', icon: Code }
  ];

  const [activeSection, setActiveSection] = useState('intro');

  const copyToClipboard = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const codeExamples = {
    curl: `curl --request POST \\
  --url https://api.voiceaipro.com/v1/calls \\
  --header 'Content-Type: application/json' \\
  --header 'Authorization: Bearer YOUR_API_KEY' \\
  --data '{
    "phone_number": "+5511999999999",
    "task": "Você é um assistente de vendas. Apresente nossos produtos e agende uma demonstração.",
    "voice": "pt-BR-neural",
    "language": "pt-BR"
  }'`,
    
    python: `import requests

url = "https://api.voiceaipro.com/v1/calls"

headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_API_KEY"
}

payload = {
    "phone_number": "+5511999999999",
    "task": "Você é um assistente de vendas. Apresente nossos produtos e agende uma demonstração.",
    "voice": "pt-BR-neural",
    "language": "pt-BR"
}

response = requests.post(url, json=payload, headers=headers)
print(response.json())`,

    javascript: `const axios = require('axios');

const url = 'https://api.voiceaipro.com/v1/calls';

const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer YOUR_API_KEY'
};

const data = {
  phone_number: '+5511999999999',
  task: 'Você é um assistente de vendas. Apresente nossos produtos e agende uma demonstração.',
  voice: 'pt-BR-neural',
  language: 'pt-BR'
};

axios.post(url, data, { headers })
  .then(response => console.log(response.data))
  .catch(error => console.error(error));`,

    webhook: `{
  "event": "call.completed",
  "call_id": "call_abc123xyz",
  "timestamp": "2025-10-05T12:34:56Z",
  "data": {
    "phone_number": "+5511999999999",
    "duration": 125.5,
    "status": "completed",
    "cost": 0.19,
    "answered_by": "human",
    "transcript": [
      {
        "speaker": "assistant",
        "text": "Olá! Como posso ajudar você hoje?",
        "timestamp": "2025-10-05T12:35:01Z"
      },
      {
        "speaker": "user",
        "text": "Gostaria de saber mais sobre seus produtos.",
        "timestamp": "2025-10-05T12:35:05Z"
      }
    ],
    "summary": "Cliente demonstrou interesse nos produtos. Agendada demonstração para próxima semana.",
    "sentiment": "positive"
  }
}`
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-2">
              <h2 className="font-semibold text-foreground mb-4 px-3">
                Navegação
              </h2>
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    activeSection === section.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  }`}
                >
                  <section.icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{section.title}</span>
                </button>
              ))}
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 max-w-4xl">
            {/* Introdução */}
            {activeSection === 'intro' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl font-bold text-foreground mb-4">
                    Documentação da API
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Bem-vindo à documentação da VoiceAI Pro. Aqui você encontrará tudo o que precisa para integrar chamadas telefônicas com IA em sua aplicação.
                  </p>
                </div>

                <div className="p-6 rounded-xl border border-border bg-card">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    O que você pode fazer
                  </h2>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Enviar chamadas telefônicas automatizadas com IA conversacional</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Criar fluxos de conversação personalizados (Pathways)</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Receber webhooks em tempo real sobre o status das chamadas</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Analisar transcrições e sentimentos das conversas</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Integrar com seus sistemas existentes via API REST</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
                  <h3 className="font-semibold text-foreground mb-2">
                    Base URL da API
                  </h3>
                  <code className="text-sm text-primary">
                    https://api.voiceaipro.com/v1
                  </code>
                </div>
              </div>
            )}

            {/* Início Rápido */}
            {activeSection === 'quickstart' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl font-bold text-foreground mb-4">
                    Início Rápido
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Faça sua primeira chamada com IA em menos de 5 minutos.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-6 rounded-xl border border-border bg-card">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold">
                        1
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">
                        Crie sua conta
                      </h3>
                    </div>
                    <p className="text-muted-foreground ml-10">
                      Registre-se gratuitamente em{' '}
                      <a href="/register" className="text-primary hover:underline">
                        voiceaipro.com/register
                      </a>
                      {' '}e receba créditos de teste.
                    </p>
                  </div>

                  <div className="p-6 rounded-xl border border-border bg-card">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold">
                        2
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">
                        Obtenha sua API Key
                      </h3>
                    </div>
                    <p className="text-muted-foreground ml-10">
                      Acesse o dashboard em{' '}
                      <span className="text-primary">Configurações → API Keys</span>
                      {' '}e copie sua chave de autenticação.
                    </p>
                  </div>

                  <div className="p-6 rounded-xl border border-border bg-card">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold">
                        3
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">
                        Faça sua primeira chamada
                      </h3>
                    </div>
                    <p className="text-muted-foreground ml-10 mb-4">
                      Use o código abaixo para enviar sua primeira chamada:
                    </p>
                    <div className="ml-10 relative">
                      <pre className="bg-background p-4 rounded-lg overflow-x-auto text-sm border border-border">
                        <code>{codeExamples.curl}</code>
                      </pre>
                      <button
                        onClick={() => copyToClipboard(codeExamples.curl, 'quickstart-curl')}
                        className="absolute top-2 right-2 p-2 rounded-lg bg-card hover:bg-accent transition-colors"
                      >
                        {copiedCode === 'quickstart-curl' ? (
                          <Check className="h-4 w-4 text-primary" />
                        ) : (
                          <Copy className="h-4 w-4 text-muted-foreground" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="p-6 rounded-xl border border-border bg-card">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold">
                        4
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">
                        Monitore sua chamada
                      </h3>
                    </div>
                    <p className="text-muted-foreground ml-10">
                      Acompanhe o status em tempo real no dashboard ou configure webhooks para receber notificações.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Autenticação */}
            {activeSection === 'auth' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl font-bold text-foreground mb-4">
                    Autenticação
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Todas as requisições à API devem ser autenticadas usando sua API Key.
                  </p>
                </div>

                <div className="p-6 rounded-xl border border-border bg-card">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    Como autenticar
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Inclua sua API Key no header <code className="bg-background px-2 py-1 rounded">Authorization</code> de todas as requisições:
                  </p>
                  <div className="relative">
                    <pre className="bg-background p-4 rounded-lg overflow-x-auto text-sm border border-border">
                      <code>Authorization: Bearer YOUR_API_KEY</code>
                    </pre>
                  </div>
                </div>

                <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
                  <h3 className="font-semibold text-foreground mb-2 flex items-center space-x-2">
                    <Key className="h-5 w-5 text-primary" />
                    <span>Importante</span>
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Nunca compartilhe sua API Key publicamente ou a inclua em código client-side. 
                    Mantenha-a segura e use apenas em requisições server-side.
                  </p>
                </div>

                <div className="p-6 rounded-xl border border-border bg-card">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Exemplo de requisição autenticada
                  </h3>
                  <div className="relative">
                    <pre className="bg-background p-4 rounded-lg overflow-x-auto text-sm border border-border">
                      <code>{codeExamples.curl}</code>
                    </pre>
                    <button
                      onClick={() => copyToClipboard(codeExamples.curl, 'auth-curl')}
                      className="absolute top-2 right-2 p-2 rounded-lg bg-card hover:bg-accent transition-colors"
                    >
                      {copiedCode === 'auth-curl' ? (
                        <Check className="h-4 w-4 text-primary" />
                      ) : (
                        <Copy className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Enviar Chamadas */}
            {activeSection === 'calls' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl font-bold text-foreground mb-4">
                    Enviar Chamadas
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Endpoint principal para criar e enviar chamadas telefônicas com IA.
                  </p>
                </div>

                <div className="p-6 rounded-xl border border-border bg-card">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm font-semibold">
                      POST
                    </span>
                    <code className="text-sm text-foreground">/v1/calls</code>
                  </div>
                  <p className="text-muted-foreground">
                    Cria uma nova chamada telefônica com IA conversacional.
                  </p>
                </div>

                <div className="p-6 rounded-xl border border-border bg-card">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Parâmetros
                  </h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-primary pl-4">
                      <div className="flex items-center space-x-2 mb-1">
                        <code className="text-sm font-semibold text-foreground">phone_number</code>
                        <span className="text-xs bg-destructive/20 text-destructive px-2 py-0.5 rounded">required</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Número de telefone no formato E.164 (ex: +5511999999999)
                      </p>
                    </div>

                    <div className="border-l-4 border-primary pl-4">
                      <div className="flex items-center space-x-2 mb-1">
                        <code className="text-sm font-semibold text-foreground">task</code>
                        <span className="text-xs bg-destructive/20 text-destructive px-2 py-0.5 rounded">required</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Instruções para o agente de IA sobre o objetivo da chamada
                      </p>
                    </div>

                    <div className="border-l-4 border-muted pl-4">
                      <div className="flex items-center space-x-2 mb-1">
                        <code className="text-sm font-semibold text-foreground">voice</code>
                        <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">optional</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Voz do agente (padrão: pt-BR-neural)
                      </p>
                    </div>

                    <div className="border-l-4 border-muted pl-4">
                      <div className="flex items-center space-x-2 mb-1">
                        <code className="text-sm font-semibold text-foreground">language</code>
                        <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">optional</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Idioma da conversa (padrão: pt-BR)
                      </p>
                    </div>

                    <div className="border-l-4 border-muted pl-4">
                      <div className="flex items-center space-x-2 mb-1">
                        <code className="text-sm font-semibold text-foreground">pathway_id</code>
                        <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">optional</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        ID do fluxo conversacional personalizado
                      </p>
                    </div>

                    <div className="border-l-4 border-muted pl-4">
                      <div className="flex items-center space-x-2 mb-1">
                        <code className="text-sm font-semibold text-foreground">webhook</code>
                        <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">optional</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        URL para receber notificações sobre a chamada
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-xl border border-border bg-card">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Resposta de Sucesso
                  </h3>
                  <div className="relative">
                    <pre className="bg-background p-4 rounded-lg overflow-x-auto text-sm border border-border">
                      <code>{`{
  "status": "success",
  "message": "Chamada enviada com sucesso",
  "call_id": "call_abc123xyz",
  "estimated_cost": 0.15
}`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            )}

            {/* Webhooks */}
            {activeSection === 'webhooks' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl font-bold text-foreground mb-4">
                    Webhooks
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Receba notificações em tempo real sobre eventos das suas chamadas.
                  </p>
                </div>

                <div className="p-6 rounded-xl border border-border bg-card">
                  <h2 className="text-2xl font-semibold text-foreground mb-4">
                    Como funcionam
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Webhooks são requisições HTTP POST enviadas para uma URL que você configura. 
                    Eles notificam sua aplicação quando eventos importantes acontecem, como:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span><code className="bg-background px-2 py-0.5 rounded">call.started</code> - Chamada iniciada</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span><code className="bg-background px-2 py-0.5 rounded">call.completed</code> - Chamada concluída</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span><code className="bg-background px-2 py-0.5 rounded">call.failed</code> - Chamada falhou</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span><code className="bg-background px-2 py-0.5 rounded">call.recording_ready</code> - Gravação disponível</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 rounded-xl border border-border bg-card">
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Exemplo de Payload
                  </h3>
                  <div className="relative">
                    <pre className="bg-background p-4 rounded-lg overflow-x-auto text-sm border border-border">
                      <code>{codeExamples.webhook}</code>
                    </pre>
                    <button
                      onClick={() => copyToClipboard(codeExamples.webhook, 'webhook-payload')}
                      className="absolute top-2 right-2 p-2 rounded-lg bg-card hover:bg-accent transition-colors"
                    >
                      {copiedCode === 'webhook-payload' ? (
                        <Check className="h-4 w-4 text-primary" />
                      ) : (
                        <Copy className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-6 rounded-xl border border-primary/50 bg-primary/5">
                  <h3 className="font-semibold text-foreground mb-2">
                    Segurança
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Todos os webhooks incluem um header <code className="bg-background px-2 py-0.5 rounded">X-Signature</code> 
                    {' '}que você pode usar para verificar a autenticidade da requisição.
                  </p>
                </div>
              </div>
            )}

            {/* Exemplos de Código */}
            {activeSection === 'examples' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl font-bold text-foreground mb-4">
                    Exemplos de Código
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    Exemplos práticos em diferentes linguagens de programação.
                  </p>
                </div>

                {/* Python */}
                <div className="p-6 rounded-xl border border-border bg-card">
                  <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center space-x-2">
                    <Code className="h-5 w-5 text-primary" />
                    <span>Python</span>
                  </h3>
                  <div className="relative">
                    <pre className="bg-background p-4 rounded-lg overflow-x-auto text-sm border border-border">
                      <code>{codeExamples.python}</code>
                    </pre>
                    <button
                      onClick={() => copyToClipboard(codeExamples.python, 'python')}
                      className="absolute top-2 right-2 p-2 rounded-lg bg-card hover:bg-accent transition-colors"
                    >
                      {copiedCode === 'python' ? (
                        <Check className="h-4 w-4 text-primary" />
                      ) : (
                        <Copy className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>

                {/* JavaScript */}
                <div className="p-6 rounded-xl border border-border bg-card">
                  <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center space-x-2">
                    <Code className="h-5 w-5 text-primary" />
                    <span>JavaScript (Node.js)</span>
                  </h3>
                  <div className="relative">
                    <pre className="bg-background p-4 rounded-lg overflow-x-auto text-sm border border-border">
                      <code>{codeExamples.javascript}</code>
                    </pre>
                    <button
                      onClick={() => copyToClipboard(codeExamples.javascript, 'javascript')}
                      className="absolute top-2 right-2 p-2 rounded-lg bg-card hover:bg-accent transition-colors"
                    >
                      {copiedCode === 'javascript' ? (
                        <Check className="h-4 w-4 text-primary" />
                      ) : (
                        <Copy className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>

                {/* cURL */}
                <div className="p-6 rounded-xl border border-border bg-card">
                  <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center space-x-2">
                    <Code className="h-5 w-5 text-primary" />
                    <span>cURL</span>
                  </h3>
                  <div className="relative">
                    <pre className="bg-background p-4 rounded-lg overflow-x-auto text-sm border border-border">
                      <code>{codeExamples.curl}</code>
                    </pre>
                    <button
                      onClick={() => copyToClipboard(codeExamples.curl, 'curl')}
                      className="absolute top-2 right-2 p-2 rounded-lg bg-card hover:bg-accent transition-colors"
                    >
                      {copiedCode === 'curl' ? (
                        <Check className="h-4 w-4 text-primary" />
                      ) : (
                        <Copy className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

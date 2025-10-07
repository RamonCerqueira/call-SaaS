import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';
import { Check, X, ArrowRight, Zap, Building2, Rocket } from 'lucide-react';

export default function Pricing() {
  const plans = [
    {
      name: 'Básico',
      icon: Zap,
      price: '49',
      description: 'Perfeito para pequenas empresas começando com IA',
      features: [
        '500 minutos incluídos/mês',
        '1 pathway ativo',
        'Até 10 chamadas simultâneas',
        '1 voice clone customizado',
        'Suporte por email',
        'Acesso à API',
        'Webhooks básicos',
        'Análise de sentimento'
      ],
      notIncluded: [
        'Pathways ilimitados',
        'Suporte prioritário',
        'SLA garantido',
        'Infraestrutura dedicada'
      ],
      cta: 'Começar com Básico',
      popular: false
    },
    {
      name: 'Profissional',
      icon: Rocket,
      price: '149',
      description: 'Ideal para empresas em crescimento',
      features: [
        '2.000 minutos incluídos/mês',
        '10 pathways ativos',
        'Até 50 chamadas simultâneas',
        '5 voice clones customizados',
        'Suporte prioritário',
        'Acesso completo à API',
        'Webhooks avançados',
        'Análise avançada com IA',
        'Integrações com CRM',
        'Base de conhecimento',
        'Transferência de chamadas',
        'Gravação de chamadas'
      ],
      notIncluded: [
        'SLA garantido',
        'Infraestrutura dedicada'
      ],
      cta: 'Começar com Profissional',
      popular: true
    },
    {
      name: 'Empresarial',
      icon: Building2,
      price: 'Custom',
      description: 'Solução completa para grandes empresas',
      features: [
        'Minutos ilimitados',
        'Pathways ilimitados',
        'Chamadas simultâneas ilimitadas',
        'Voice clones ilimitados',
        'Suporte dedicado 24/7',
        'API com rate limit customizado',
        'Webhooks enterprise',
        'IA customizada e fine-tuning',
        'Integrações personalizadas',
        'Infraestrutura dedicada',
        'SLA de 99.99% garantido',
        'Consultoria estratégica',
        'Treinamento da equipe',
        'Gerente de conta dedicado'
      ],
      notIncluded: [],
      cta: 'Falar com Vendas',
      popular: false
    }
  ];

  const additionalPricing = [
    {
      item: 'Minutos adicionais',
      price: '$0,09/min',
      description: 'Cobrado por segundo, apenas tempo ativo de chamada'
    },
    {
      item: 'SMS (entrada/saída)',
      price: '$0,02/msg',
      description: 'Mensagens de texto para complementar suas chamadas'
    },
    {
      item: 'Transferência de chamada',
      price: '$0,025/min',
      description: 'Transferir chamadas para agentes humanos (grátis com BYOT)'
    },
    {
      item: 'Chamadas que não conectam',
      price: '$0,015/tentativa',
      description: 'Taxa mínima por tentativa de chamada outbound'
    }
  ];

  const faqs = [
    {
      question: 'Como funciona a cobrança?',
      answer: 'Cobramos mensalmente pelo plano escolhido, que inclui uma quantidade de minutos. Minutos adicionais são cobrados por segundo a $0,09/min. Não há taxas de setup ou cancelamento.'
    },
    {
      question: 'Posso mudar de plano a qualquer momento?',
      answer: 'Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. Mudanças entram em vigor no próximo ciclo de cobrança.'
    },
    {
      question: 'Existe período de teste gratuito?',
      answer: 'Sim, oferecemos créditos gratuitos para novos usuários testarem a plataforma. Não é necessário cartão de crédito para começar.'
    },
    {
      question: 'O que acontece se eu ultrapassar os minutos incluídos?',
      answer: 'Minutos adicionais são cobrados automaticamente a $0,09/min. Você pode configurar alertas para ser notificado quando estiver próximo do limite.'
    },
    {
      question: 'Vocês oferecem desconto para ONGs?',
      answer: 'Sim! Oferecemos descontos especiais para organizações sem fins lucrativos e instituições educacionais. Entre em contato conosco para mais informações.'
    },
    {
      question: 'Qual é a política de reembolso?',
      answer: 'Oferecemos reembolso total dentro de 14 dias se você não estiver satisfeito com o serviço. Sem perguntas, sem complicações.'
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Preços Simples e Transparentes
            </h1>
            <p className="text-xl text-muted-foreground">
              Escolha o plano ideal para o seu negócio. Sem taxas ocultas, sem surpresas.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <div 
                key={index}
                className={`relative rounded-2xl border ${
                  plan.popular 
                    ? 'border-primary shadow-xl scale-105' 
                    : 'border-border'
                } bg-card p-8 flex flex-col`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    Mais Popular
                  </div>
                )}

                <div className="flex items-center space-x-3 mb-4">
                  <div className={`p-2 rounded-lg ${plan.popular ? 'bg-primary' : 'bg-primary/10'}`}>
                    <plan.icon className={`h-6 w-6 ${plan.popular ? 'text-primary-foreground' : 'text-primary'}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                </div>

                <p className="text-muted-foreground mb-6">
                  {plan.description}
                </p>

                <div className="mb-6">
                  {plan.price === 'Custom' ? (
                    <div className="text-4xl font-bold text-foreground">
                      Personalizado
                    </div>
                  ) : (
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-foreground">
                        ${plan.price}
                      </span>
                      <span className="text-muted-foreground ml-2">/mês</span>
                    </div>
                  )}
                </div>

                <Link to={plan.price === 'Custom' ? '/contact' : '/register'} className="mb-6">
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                    size="lg"
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>

                <div className="space-y-3 flex-grow">
                  <div className="font-semibold text-foreground mb-3">
                    Incluído:
                  </div>
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.notIncluded.length > 0 && (
                    <>
                      <div className="font-semibold text-foreground mb-3 mt-6">
                        Não incluído:
                      </div>
                      {plan.notIncluded.map((feature, i) => (
                        <div key={i} className="flex items-start space-x-3">
                          <X className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Pricing */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Preços Adicionais
              </h2>
              <p className="text-lg text-muted-foreground">
                Cobranças transparentes para serviços além do plano.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {additionalPricing.map((item, index) => (
                <div 
                  key={index}
                  className="p-6 rounded-xl border border-border bg-background"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-foreground">{item.item}</h3>
                    <span className="text-primary font-bold">{item.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Perguntas Frequentes
              </h2>
              <p className="text-lg text-muted-foreground">
                Tudo o que você precisa saber sobre nossos preços.
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div 
                  key={index}
                  className="p-6 rounded-xl border border-border bg-card"
                >
                  <h3 className="font-semibold text-foreground mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
              Ainda tem dúvidas?
            </h2>
            <p className="text-xl text-primary-foreground/90">
              Nossa equipe está pronta para ajudar você a escolher o melhor plano.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/contact">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                  Falar com Especialista
                </Button>
              </Link>
              <Link to="/register">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 py-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  Começar Gratuitamente
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

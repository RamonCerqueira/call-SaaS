import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';
import { 
  Phone, 
  Globe, 
  Clock, 
  Zap, 
  Shield, 
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Star,
  Users,
  BarChart3
} from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: Phone,
      title: 'IA Ultra-Realista',
      description: 'Agentes de IA que soam completamente humanos, impossíveis de distinguir de uma pessoa real.'
    },
    {
      icon: Globe,
      title: 'Qualquer Idioma',
      description: 'Suporte para mais de 30 idiomas com pronúncia nativa e compreensão contextual perfeita.'
    },
    {
      icon: Clock,
      title: 'Disponível 24/7',
      description: 'Seus agentes de IA nunca dormem, nunca tiram férias e estão sempre prontos para atender.'
    },
    {
      icon: Zap,
      title: 'Auto-Escalável',
      description: 'Infraestrutura que escala automaticamente para lidar com milhares de chamadas simultâneas.'
    },
    {
      icon: Shield,
      title: 'Seguro e Confiável',
      description: 'Dados criptografados end-to-end com conformidade total com LGPD e regulamentações internacionais.'
    },
    {
      icon: TrendingUp,
      title: 'Análise Avançada',
      description: 'Insights detalhados sobre cada conversa com análise de sentimento e métricas de performance.'
    }
  ];

  const useCases = [
    {
      title: 'Atendimento ao Cliente',
      description: 'Resolva dúvidas, processe solicitações e ofereça suporte excepcional 24/7.',
      icon: Users
    },
    {
      title: 'Vendas e Prospecção',
      description: 'Qualifique leads, agende reuniões e feche negócios com conversas naturais.',
      icon: TrendingUp
    },
    {
      title: 'Pesquisas e Feedback',
      description: 'Colete dados valiosos através de conversas envolventes e naturais.',
      icon: BarChart3
    }
  ];

  const testimonials = [
    {
      name: 'Carlos Silva',
      role: 'CEO, TechCorp',
      content: 'Reduzimos nossos custos de atendimento em 70% enquanto melhoramos a satisfação do cliente. Incrível!',
      rating: 5
    },
    {
      name: 'Ana Santos',
      role: 'Diretora de Vendas, SalesHub',
      content: 'Nossa equipe de vendas consegue focar em fechar negócios enquanto a IA qualifica os leads. Game changer!',
      rating: 5
    },
    {
      name: 'Roberto Lima',
      role: 'CTO, FinanceApp',
      content: 'A integração foi super simples e a qualidade das conversas é impressionante. Recomendo fortemente!',
      rating: 5
    }
  ];

  const stats = [
    { value: '10M+', label: 'Chamadas Realizadas' },
    { value: '99.9%', label: 'Uptime Garantido' },
    { value: '30+', label: 'Idiomas Suportados' },
    { value: '5000+', label: 'Empresas Confiam' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background -z-10" />
        
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium animate-in fade-in slide-in-from-top duration-500">
              <Star className="h-4 w-4" />
              <span>Líder em Chamadas com IA no Brasil</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight animate-in fade-in slide-in-from-bottom duration-700">
              Chamadas Telefônicas com{' '}
              <span className="text-primary">IA Ultra-Realistas</span>
            </h1>

            {/* Description */}
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom duration-700 delay-100">
              Automatize atendimento, vendas e suporte com agentes de IA que soam humanos, 
              falam qualquer idioma e trabalham 24/7. Comece em minutos.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom duration-700 delay-200">
              <Link to="/register">
                <Button size="lg" className="text-lg px-8 py-6 group">
                  Começar Grátis
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/documentation">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                  Ver Documentação
                </Button>
              </Link>
            </div>

            {/* Pricing Badge */}
            <p className="text-sm text-muted-foreground animate-in fade-in duration-700 delay-300">
              A partir de <span className="font-bold text-foreground">$0,09/minuto</span> • 
              Sem taxas de setup • Cancele quando quiser
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-card border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-3xl md:text-4xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Por que escolher VoiceAI Pro?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A plataforma mais avançada para automação de chamadas telefônicas com inteligência artificial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Casos de Uso
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transforme qualquer processo de comunicação com IA conversacional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div 
                key={index}
                className="p-8 rounded-xl border border-border bg-background hover:border-primary/50 transition-all duration-300"
              >
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <useCase.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">
                  {useCase.title}
                </h3>
                <p className="text-muted-foreground">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              O que nossos clientes dizem
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Empresas de todos os tamanhos confiam na VoiceAI Pro.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="p-6 rounded-xl border border-border bg-card"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
              Pronto para transformar sua comunicação?
            </h2>
            <p className="text-xl text-primary-foreground/90">
              Comece gratuitamente hoje e veja a diferença que a IA pode fazer no seu negócio.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/register">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-6 group">
                  Começar Agora
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Ver Preços
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

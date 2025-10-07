import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button.jsx';
import { Target, Users, Zap, Heart, ArrowRight } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Target,
      title: 'Inovação Constante',
      description: 'Estamos sempre na vanguarda da tecnologia de IA conversacional, trazendo as últimas inovações para nossos clientes.'
    },
    {
      icon: Users,
      title: 'Foco no Cliente',
      description: 'Nosso sucesso é medido pelo sucesso dos nossos clientes. Trabalhamos incansavelmente para superar expectativas.'
    },
    {
      icon: Zap,
      title: 'Simplicidade',
      description: 'Tecnologia complexa não precisa ser complicada. Tornamos a IA acessível para todos, sem necessidade de expertise técnica.'
    },
    {
      icon: Heart,
      title: 'Transparência',
      description: 'Preços claros, sem taxas ocultas. Comunicação aberta e honesta em todas as nossas interações.'
    }
  ];

  const team = [
    {
      name: 'Maria Silva',
      role: 'CEO & Co-fundadora',
      bio: '15 anos de experiência em telecomunicações e IA'
    },
    {
      name: 'João Santos',
      role: 'CTO & Co-fundador',
      bio: 'Ex-engenheiro líder em empresas de tecnologia do Vale do Silício'
    },
    {
      name: 'Ana Costa',
      role: 'Head of Product',
      bio: 'Especialista em UX e design de produtos SaaS'
    },
    {
      name: 'Carlos Oliveira',
      role: 'Head of Engineering',
      bio: 'PhD em Machine Learning e NLP'
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Transformando a Comunicação com IA
            </h1>
            <p className="text-xl text-muted-foreground">
              Somos uma empresa brasileira dedicada a democratizar o acesso à tecnologia de 
              chamadas telefônicas com inteligência artificial ultra-realista.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Nossa Missão
                </h2>
                <p className="text-muted-foreground">
                  Capacitar empresas de todos os tamanhos a automatizar e melhorar sua comunicação 
                  através de inteligência artificial conversacional de última geração. Acreditamos 
                  que toda empresa deveria ter acesso a tecnologia de ponta sem a necessidade de 
                  grandes investimentos ou conhecimento técnico especializado.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Nossa Visão
                </h2>
                <p className="text-muted-foreground">
                  Ser a plataforma líder de IA conversacional na América Latina, reconhecida pela 
                  qualidade excepcional de nossas soluções, suporte ao cliente incomparável e 
                  compromisso com a inovação contínua. Queremos ser o parceiro de confiança de 
                  milhares de empresas em sua jornada de transformação digital.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Nossos Valores
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Os princípios que guiam cada decisão que tomamos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div 
                key={index}
                className="text-center space-y-4"
              >
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Nosso Time
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Conheça as pessoas por trás da VoiceAI Pro.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <div 
                key={index}
                className="text-center space-y-3"
              >
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 mx-auto flex items-center justify-center">
                  <Users className="h-16 w-16 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-sm text-primary font-medium">
                    {member.role}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              VoiceAI Pro em Números
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-primary">
                5000+
              </div>
              <div className="text-sm text-muted-foreground">
                Empresas Clientes
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-primary">
                10M+
              </div>
              <div className="text-sm text-muted-foreground">
                Chamadas Realizadas
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-primary">
                99.9%
              </div>
              <div className="text-sm text-muted-foreground">
                Uptime
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-bold text-primary">
                4.9/5
              </div>
              <div className="text-sm text-muted-foreground">
                Satisfação
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">
              Quer fazer parte da nossa história?
            </h2>
            <p className="text-xl text-primary-foreground/90">
              Junte-se a milhares de empresas que já transformaram sua comunicação com a VoiceAI Pro.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/register">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-6 group">
                  Começar Gratuitamente
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 py-6 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  Falar com Vendas
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

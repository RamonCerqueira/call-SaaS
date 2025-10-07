import { 
  Phone, 
  Clock, 
  TrendingUp, 
  DollarSign,
  ArrowUp,
  ArrowDown,
  PhoneCall,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';

export default function Dashboard() {
  // Mock data - será substituído por dados reais da API
  const stats = [
    {
      title: 'Total de Chamadas',
      value: '1,234',
      change: '+12.5%',
      trend: 'up',
      icon: Phone,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      title: 'Minutos Utilizados',
      value: '8,456',
      change: '+8.2%',
      trend: 'up',
      icon: Clock,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      title: 'Taxa de Sucesso',
      value: '94.2%',
      change: '+2.1%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      title: 'Custo Médio',
      value: '$0.12',
      change: '-5.3%',
      trend: 'down',
      icon: DollarSign,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    }
  ];

  const recentCalls = [
    {
      id: 'call_001',
      phone: '+55 11 98765-4321',
      status: 'completed',
      duration: '3:45',
      cost: '$0.34',
      date: '2025-10-05 14:30'
    },
    {
      id: 'call_002',
      phone: '+55 21 99876-5432',
      status: 'completed',
      duration: '2:15',
      cost: '$0.20',
      date: '2025-10-05 14:15'
    },
    {
      id: 'call_003',
      phone: '+55 11 97654-3210',
      status: 'failed',
      duration: '0:05',
      cost: '$0.02',
      date: '2025-10-05 14:00'
    },
    {
      id: 'call_004',
      phone: '+55 85 96543-2109',
      status: 'completed',
      duration: '5:20',
      cost: '$0.48',
      date: '2025-10-05 13:45'
    },
    {
      id: 'call_005',
      phone: '+55 11 95432-1098',
      status: 'completed',
      duration: '1:30',
      cost: '$0.14',
      date: '2025-10-05 13:30'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-destructive" />;
      case 'in_progress':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'completed':
        return 'Concluída';
      case 'failed':
        return 'Falhou';
      case 'in_progress':
        return 'Em andamento';
      default:
        return 'Desconhecido';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Painel</h1>
        <p className="text-muted-foreground mt-1">
          Visão geral das suas chamadas e estatísticas
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className={`flex items-center space-x-1 text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-500' : 'text-destructive'
              }`}>
                {stat.trend === 'up' ? (
                  <ArrowUp className="h-4 w-4" />
                ) : (
                  <ArrowDown className="h-4 w-4" />
                )}
                <span>{stat.change}</span>
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.title}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calls Chart */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Chamadas por Dia
          </h3>
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <PhoneCall className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Gráfico de chamadas será implementado</p>
            </div>
          </div>
        </div>

        {/* Status Distribution */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Distribuição por Status
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Concluídas</span>
                <span className="text-sm font-medium text-foreground">1,164 (94.2%)</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: '94.2%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Falhadas</span>
                <span className="text-sm font-medium text-foreground">62 (5.0%)</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-destructive" style={{ width: '5%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Em andamento</span>
                <span className="text-sm font-medium text-foreground">8 (0.8%)</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500" style={{ width: '0.8%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Calls */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">
            Atividade Recente
          </h3>
          <a href="/dashboard/calls" className="text-sm text-primary hover:text-primary/80 font-medium">
            Ver todas
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  ID
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Número
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Duração
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Custo
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Data
                </th>
              </tr>
            </thead>
            <tbody>
              {recentCalls.map((call) => (
                <tr 
                  key={call.id}
                  className="border-b border-border last:border-0 hover:bg-accent/50 transition-colors cursor-pointer"
                >
                  <td className="py-3 px-4 text-sm font-mono text-foreground">
                    {call.id}
                  </td>
                  <td className="py-3 px-4 text-sm text-foreground">
                    {call.phone}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(call.status)}
                      <span className="text-sm text-foreground">
                        {getStatusLabel(call.status)}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-foreground">
                    {call.duration}
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-foreground">
                    {call.cost}
                  </td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">
                    {call.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

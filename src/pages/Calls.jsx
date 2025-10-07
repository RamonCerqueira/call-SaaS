import { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { 
  Plus, 
  Search, 
  Filter,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Phone,
  Download,
  Eye
} from 'lucide-react';

export default function Calls() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showNewCallModal, setShowNewCallModal] = useState(false);

  // Mock data
  const calls = [
    {
      id: 'call_001',
      phone: '+55 11 98765-4321',
      status: 'completed',
      duration: '3:45',
      cost: '$0.34',
      date: '2025-10-05 14:30',
      pathway: 'Vendas - Qualificação',
      answeredBy: 'human'
    },
    {
      id: 'call_002',
      phone: '+55 21 99876-5432',
      status: 'completed',
      duration: '2:15',
      cost: '$0.20',
      date: '2025-10-05 14:15',
      pathway: 'Suporte - Atendimento',
      answeredBy: 'human'
    },
    {
      id: 'call_003',
      phone: '+55 11 97654-3210',
      status: 'failed',
      duration: '0:05',
      cost: '$0.02',
      date: '2025-10-05 14:00',
      pathway: 'Vendas - Qualificação',
      answeredBy: 'voicemail'
    },
    {
      id: 'call_004',
      phone: '+55 85 96543-2109',
      status: 'completed',
      duration: '5:20',
      cost: '$0.48',
      date: '2025-10-05 13:45',
      pathway: 'Pesquisa - Satisfação',
      answeredBy: 'human'
    },
    {
      id: 'call_005',
      phone: '+55 11 95432-1098',
      status: 'completed',
      duration: '1:30',
      cost: '$0.14',
      date: '2025-10-05 13:30',
      pathway: 'Suporte - Atendimento',
      answeredBy: 'human'
    },
    {
      id: 'call_006',
      phone: '+55 11 94321-0987',
      status: 'in_progress',
      duration: '0:45',
      cost: '$0.07',
      date: '2025-10-05 15:00',
      pathway: 'Vendas - Qualificação',
      answeredBy: 'human'
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

  const filteredCalls = calls.filter(call => {
    const matchesSearch = call.phone.includes(searchTerm) || call.id.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || call.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Chamadas</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie e monitore todas as suas chamadas
          </p>
        </div>
        <Button 
          onClick={() => setShowNewCallModal(true)}
          className="group"
        >
          <Plus className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform" />
          Nova Chamada
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Buscar por número ou ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="all">Todos os status</option>
              <option value="completed">Concluídas</option>
              <option value="failed">Falhadas</option>
              <option value="in_progress">Em andamento</option>
            </select>
          </div>

          {/* Export */}
          <Button variant="outline">
            <Download className="h-5 w-5 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-sm text-muted-foreground mb-1">Total</div>
          <div className="text-2xl font-bold text-foreground">{calls.length}</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-sm text-muted-foreground mb-1">Concluídas</div>
          <div className="text-2xl font-bold text-green-500">
            {calls.filter(c => c.status === 'completed').length}
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-sm text-muted-foreground mb-1">Falhadas</div>
          <div className="text-2xl font-bold text-destructive">
            {calls.filter(c => c.status === 'failed').length}
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-sm text-muted-foreground mb-1">Em andamento</div>
          <div className="text-2xl font-bold text-yellow-500">
            {calls.filter(c => c.status === 'in_progress').length}
          </div>
        </div>
      </div>

      {/* Calls Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
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
                  Pathway
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
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCalls.map((call) => (
                <tr 
                  key={call.id}
                  className="border-t border-border hover:bg-accent/50 transition-colors"
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
                    {call.pathway}
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
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-border px-4 py-3 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Mostrando {filteredCalls.length} de {calls.length} chamadas
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled>
              Anterior
            </Button>
            <Button variant="outline" size="sm">
              Próxima
            </Button>
          </div>
        </div>
      </div>

      {/* New Call Modal */}
      {showNewCallModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Nova Chamada
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Número de Telefone
                </label>
                <input
                  type="tel"
                  placeholder="+55 11 99999-9999"
                  className="block w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Pathway
                </label>
                <select className="block w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option>Vendas - Qualificação</option>
                  <option>Suporte - Atendimento</option>
                  <option>Pesquisa - Satisfação</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Instruções (Opcional)
                </label>
                <textarea
                  rows="3"
                  placeholder="Instruções adicionais para o agente..."
                  className="block w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowNewCallModal(false)}
              >
                Cancelar
              </Button>
              <Button className="flex-1">
                <Phone className="h-4 w-4 mr-2" />
                Iniciar Chamada
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

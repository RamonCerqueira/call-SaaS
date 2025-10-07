import { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { 
  Plus, 
  Search, 
  GitBranch,
  Edit,
  Trash2,
  Copy,
  Play
} from 'lucide-react';

export default function Pathways() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewPathwayModal, setShowNewPathwayModal] = useState(false);

  // Mock data
  const pathways = [
    {
      id: 'pw_001',
      name: 'Vendas - Qualificação',
      description: 'Pathway para qualificar leads de vendas',
      nodes: 12,
      calls: 456,
      lastModified: '2025-10-04',
      status: 'active'
    },
    {
      id: 'pw_002',
      name: 'Suporte - Atendimento',
      description: 'Pathway para atendimento ao cliente',
      nodes: 8,
      calls: 823,
      lastModified: '2025-10-03',
      status: 'active'
    },
    {
      id: 'pw_003',
      name: 'Pesquisa - Satisfação',
      description: 'Pathway para pesquisa de satisfação',
      nodes: 6,
      calls: 234,
      lastModified: '2025-10-02',
      status: 'active'
    },
    {
      id: 'pw_004',
      name: 'Cobrança - Lembretes',
      description: 'Pathway para lembretes de pagamento',
      nodes: 5,
      calls: 145,
      lastModified: '2025-10-01',
      status: 'draft'
    }
  ];

  const filteredPathways = pathways.filter(pathway =>
    pathway.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pathway.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Pathways</h1>
          <p className="text-muted-foreground mt-1">
            Crie e gerencie fluxos de conversação personalizados
          </p>
        </div>
        <Button 
          onClick={() => setShowNewPathwayModal(true)}
          className="group"
        >
          <Plus className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform" />
          Novo Pathway
        </Button>
      </div>

      {/* Search */}
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder="Buscar pathways..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-sm text-muted-foreground mb-1">Total</div>
          <div className="text-2xl font-bold text-foreground">{pathways.length}</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-sm text-muted-foreground mb-1">Ativos</div>
          <div className="text-2xl font-bold text-green-500">
            {pathways.filter(p => p.status === 'active').length}
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-sm text-muted-foreground mb-1">Rascunhos</div>
          <div className="text-2xl font-bold text-yellow-500">
            {pathways.filter(p => p.status === 'draft').length}
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-sm text-muted-foreground mb-1">Total de Chamadas</div>
          <div className="text-2xl font-bold text-foreground">
            {pathways.reduce((sum, p) => sum + p.calls, 0)}
          </div>
        </div>
      </div>

      {/* Pathways Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPathways.map((pathway) => (
          <div 
            key={pathway.id}
            className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors group"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <GitBranch className="h-6 w-6 text-primary" />
              </div>
              <div className={`px-2 py-1 rounded text-xs font-medium ${
                pathway.status === 'active' 
                  ? 'bg-green-500/10 text-green-500' 
                  : 'bg-yellow-500/10 text-yellow-500'
              }`}>
                {pathway.status === 'active' ? 'Ativo' : 'Rascunho'}
              </div>
            </div>

            {/* Content */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {pathway.name}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {pathway.description}
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-4 mb-4 text-sm text-muted-foreground">
              <div>
                <span className="font-medium text-foreground">{pathway.nodes}</span> nós
              </div>
              <div>
                <span className="font-medium text-foreground">{pathway.calls}</span> chamadas
              </div>
            </div>

            <div className="text-xs text-muted-foreground mb-4">
              Modificado em {pathway.lastModified}
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1">
                <Edit className="h-4 w-4 mr-1" />
                Editar
              </Button>
              <Button variant="outline" size="sm">
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Play className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPathways.length === 0 && (
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <GitBranch className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Nenhum pathway encontrado
          </h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm 
              ? 'Tente buscar com outros termos' 
              : 'Crie seu primeiro pathway para começar'}
          </p>
          {!searchTerm && (
            <Button onClick={() => setShowNewPathwayModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Criar Pathway
            </Button>
          )}
        </div>
      )}

      {/* New Pathway Modal */}
      {showNewPathwayModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Novo Pathway
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nome do Pathway
                </label>
                <input
                  type="text"
                  placeholder="Ex: Vendas - Qualificação"
                  className="block w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Descrição
                </label>
                <textarea
                  rows="3"
                  placeholder="Descreva o objetivo deste pathway..."
                  className="block w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Template
                </label>
                <select className="block w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option>Começar do zero</option>
                  <option>Template de Vendas</option>
                  <option>Template de Suporte</option>
                  <option>Template de Pesquisa</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowNewPathwayModal(false)}
              >
                Cancelar
              </Button>
              <Button className="flex-1">
                <Plus className="h-4 w-4 mr-2" />
                Criar Pathway
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

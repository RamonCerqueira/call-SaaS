import { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { 
  Plus, 
  Search, 
  BookOpen,
  Edit,
  Trash2,
  FileText,
  Upload,
  Link as LinkIcon
} from 'lucide-react';

export default function KnowledgeBase() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewKBModal, setShowNewKBModal] = useState(false);

  // Mock data
  const knowledgeBases = [
    {
      id: 'kb_001',
      name: 'Catálogo de Produtos',
      description: 'Informações sobre todos os produtos disponíveis',
      type: 'document',
      items: 45,
      size: '2.3 MB',
      lastModified: '2025-10-04',
      status: 'active'
    },
    {
      id: 'kb_002',
      name: 'FAQ - Perguntas Frequentes',
      description: 'Respostas para as dúvidas mais comuns dos clientes',
      type: 'text',
      items: 28,
      size: '156 KB',
      lastModified: '2025-10-03',
      status: 'active'
    },
    {
      id: 'kb_003',
      name: 'Políticas da Empresa',
      description: 'Políticas de devolução, garantia e privacidade',
      type: 'document',
      items: 12,
      size: '890 KB',
      lastModified: '2025-10-02',
      status: 'active'
    },
    {
      id: 'kb_004',
      name: 'Scripts de Vendas',
      description: 'Scripts e melhores práticas para vendas',
      type: 'text',
      items: 8,
      size: '234 KB',
      lastModified: '2025-10-01',
      status: 'draft'
    }
  ];

  const filteredKBs = knowledgeBases.filter(kb =>
    kb.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    kb.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeIcon = (type) => {
    switch (type) {
      case 'document':
        return FileText;
      case 'link':
        return LinkIcon;
      default:
        return BookOpen;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Base de Conhecimento</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie o conhecimento que seus agentes de IA podem acessar
          </p>
        </div>
        <Button 
          onClick={() => setShowNewKBModal(true)}
          className="group"
        >
          <Plus className="h-5 w-5 mr-2 group-hover:rotate-90 transition-transform" />
          Nova Base
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
            placeholder="Buscar bases de conhecimento..."
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
          <div className="text-2xl font-bold text-foreground">{knowledgeBases.length}</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-sm text-muted-foreground mb-1">Ativas</div>
          <div className="text-2xl font-bold text-green-500">
            {knowledgeBases.filter(kb => kb.status === 'active').length}
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-sm text-muted-foreground mb-1">Total de Itens</div>
          <div className="text-2xl font-bold text-foreground">
            {knowledgeBases.reduce((sum, kb) => sum + kb.items, 0)}
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-sm text-muted-foreground mb-1">Tamanho Total</div>
          <div className="text-2xl font-bold text-foreground">3.5 MB</div>
        </div>
      </div>

      {/* Knowledge Bases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredKBs.map((kb) => {
          const TypeIcon = getTypeIcon(kb.type);
          return (
            <div 
              key={kb.id}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <TypeIcon className="h-6 w-6 text-primary" />
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  kb.status === 'active' 
                    ? 'bg-green-500/10 text-green-500' 
                    : 'bg-yellow-500/10 text-yellow-500'
                }`}>
                  {kb.status === 'active' ? 'Ativa' : 'Rascunho'}
                </div>
              </div>

              {/* Content */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {kb.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {kb.description}
                </p>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-4 mb-4 text-sm text-muted-foreground">
                <div>
                  <span className="font-medium text-foreground">{kb.items}</span> itens
                </div>
                <div>
                  <span className="font-medium text-foreground">{kb.size}</span>
                </div>
              </div>

              <div className="text-xs text-muted-foreground mb-4">
                Modificado em {kb.lastModified}
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="h-4 w-4 mr-1" />
                  Editar
                </Button>
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredKBs.length === 0 && (
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Nenhuma base de conhecimento encontrada
          </h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm 
              ? 'Tente buscar com outros termos' 
              : 'Crie sua primeira base de conhecimento para começar'}
          </p>
          {!searchTerm && (
            <Button onClick={() => setShowNewKBModal(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Criar Base de Conhecimento
            </Button>
          )}
        </div>
      )}

      {/* New Knowledge Base Modal */}
      {showNewKBModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Nova Base de Conhecimento
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  placeholder="Ex: FAQ - Perguntas Frequentes"
                  className="block w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Descrição
                </label>
                <textarea
                  rows="3"
                  placeholder="Descreva o conteúdo desta base..."
                  className="block w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Tipo de Conteúdo
                </label>
                <select className="block w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option>Texto</option>
                  <option>Documentos (PDF, DOCX)</option>
                  <option>Links/URLs</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Upload de Arquivos
                </label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Clique para fazer upload ou arraste arquivos aqui
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Suporta PDF, DOCX, TXT (máx. 10MB)
                  </p>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowNewKBModal(false)}
              >
                Cancelar
              </Button>
              <Button className="flex-1">
                <Plus className="h-4 w-4 mr-2" />
                Criar Base
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

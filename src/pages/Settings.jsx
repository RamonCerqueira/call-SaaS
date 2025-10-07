import { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { 
  Key, 
  Save, 
  Eye, 
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { useBlandApi } from '../contexts/BlandApiContext';

export default function Settings() {
  const { apiKey, isInitialized, updateApiKey, clearApiKey } = useBlandApi();
  const [showApiKey, setShowApiKey] = useState(false);
  const [newApiKey, setNewApiKey] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveApiKey = () => {
    if (newApiKey.trim()) {
      updateApiKey(newApiKey.trim());
      setNewApiKey('');
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const handleClearApiKey = () => {
    if (confirm('Tem certeza que deseja remover a API key? Você não poderá fazer chamadas sem ela.')) {
      clearApiKey();
      setNewApiKey('');
    }
  };

  const maskApiKey = (key) => {
    if (!key) return '';
    if (key.length <= 8) return '••••••••';
    return key.substring(0, 4) + '••••••••' + key.substring(key.length - 4);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie suas configurações e integrações
        </p>
      </div>

      {/* API Configuration */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-primary/10 p-3 rounded-lg">
            <Key className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              API Key da Bland.ai
            </h3>
            <p className="text-sm text-muted-foreground">
              Configure sua chave de API para conectar com os serviços da Bland.ai
            </p>
          </div>
        </div>

        {/* Status */}
        <div className="mb-6">
          {isInitialized ? (
            <div className="flex items-center space-x-2 text-green-500">
              <CheckCircle2 className="h-5 w-5" />
              <span className="text-sm font-medium">API conectada e funcionando</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2 text-yellow-500">
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm font-medium">API não configurada</span>
            </div>
          )}
        </div>

        {/* Current API Key */}
        {isInitialized && apiKey && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-2">
              API Key Atual
            </label>
            <div className="flex items-center space-x-2">
              <div className="flex-1 px-4 py-2 bg-muted rounded-lg font-mono text-sm text-foreground">
                {showApiKey ? apiKey : maskApiKey(apiKey)}
              </div>
              <button
                onClick={() => setShowApiKey(!showApiKey)}
                className="p-2 rounded-lg hover:bg-accent transition-colors"
              >
                {showApiKey ? (
                  <EyeOff className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <Eye className="h-5 w-5 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>
        )}

        {/* New API Key Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-foreground mb-2">
            {isInitialized ? 'Atualizar API Key' : 'Inserir API Key'}
          </label>
          <input
            type="text"
            value={newApiKey}
            onChange={(e) => setNewApiKey(e.target.value)}
            placeholder="sk-..."
            className="block w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-mono"
          />
          <p className="text-xs text-muted-foreground mt-2">
            Você pode obter sua API key no{' '}
            <a 
              href="https://app.bland.ai/settings" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 inline-flex items-center"
            >
              painel da Bland.ai
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </p>
        </div>

        {/* Success Message */}
        {saveSuccess && (
          <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
            <div className="flex items-center space-x-2 text-green-500">
              <CheckCircle2 className="h-5 w-5" />
              <span className="text-sm font-medium">API Key salva com sucesso!</span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-3">
          <Button 
            onClick={handleSaveApiKey}
            disabled={!newApiKey.trim()}
            className="flex-1"
          >
            <Save className="h-4 w-4 mr-2" />
            Salvar API Key
          </Button>
          {isInitialized && (
            <Button 
              variant="outline"
              onClick={handleClearApiKey}
            >
              Remover
            </Button>
          )}
        </div>
      </div>

      {/* Account Settings */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Configurações da Conta
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Nome
            </label>
            <input
              type="text"
              defaultValue="Teste Usuário"
              className="block w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Email
            </label>
            <input
              type="email"
              defaultValue="teste@example.com"
              className="block w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Empresa (Opcional)
            </label>
            <input
              type="text"
              placeholder="Nome da sua empresa"
              className="block w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <Button>
            Salvar Alterações
          </Button>
        </div>
      </div>

      {/* Webhook Settings */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Configurações de Webhook
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              URL do Webhook
            </label>
            <input
              type="url"
              placeholder="https://seu-dominio.com/webhook"
              className="block w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Receba notificações em tempo real sobre o status das chamadas
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="webhook-enabled"
              className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
            />
            <label htmlFor="webhook-enabled" className="text-sm text-foreground">
              Ativar webhooks
            </label>
          </div>

          <Button variant="outline">
            Testar Webhook
          </Button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-card border border-destructive/20 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-destructive mb-4">
          Zona de Perigo
        </h3>
        
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground mb-3">
              Excluir sua conta removerá permanentemente todos os seus dados, incluindo histórico de chamadas, pathways e configurações.
            </p>
            <Button variant="destructive">
              Excluir Conta
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Link, useLocation } from 'react-router-dom';
import { 
  Phone, 
  LayoutDashboard, 
  PhoneCall, 
  GitBranch, 
  BookOpen, 
  Settings, 
  CreditCard,
  LogOut
} from 'lucide-react';

export default function DashboardSidebar() {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Painel' },
    { path: '/dashboard/calls', icon: PhoneCall, label: 'Chamadas' },
    { path: '/dashboard/pathways', icon: GitBranch, label: 'Pathways' },
    { path: '/dashboard/knowledge-base', icon: BookOpen, label: 'Base de Conhecimento' },
    { path: '/dashboard/settings', icon: Settings, label: 'Configurações' },
    { path: '/dashboard/billing', icon: CreditCard, label: 'Faturamento' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <Link to="/dashboard" className="flex items-center space-x-2 group">
          <div className="bg-primary rounded-lg p-2 group-hover:scale-110 transition-transform">
            <Phone className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground">VoiceAI Pro</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-border">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground transition-colors w-full"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Sair</span>
        </button>
      </div>
    </aside>
  );
}

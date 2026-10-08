import { 
  LayoutDashboard, 
  Megaphone, 
  CreditCard, 
  Users, 
  Database, 
  FolderTree,
  Settings,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Painel Geral', icon: LayoutDashboard },
  { id: 'promotions', label: 'Gestor de Promoções', icon: Megaphone },
  { id: 'loyalty', label: 'Fidelidade', icon: CreditCard },
  { id: 'customers', label: 'Clientes', icon: Users },
  { id: 'schema', label: 'Schema BD (SQL)', icon: Database },
  { id: 'structure', label: 'Estrutura Projeto', icon: FolderTree },
];

export default function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-slate-900 text-white flex flex-col z-50">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-red-500 rounded-lg flex items-center justify-center font-bold text-sm">
            LA
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">LusaApp</h1>
            <p className="text-xs text-slate-400">Builder MVP</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-green-600/20 text-green-400 border border-green-600/30'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700 space-y-2">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-400 hover:bg-slate-800 hover:text-white transition-all">
          <Settings size={18} />
          Definições
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-400 hover:bg-slate-800 hover:text-red-400 transition-all">
          <LogOut size={18} />
          Terminar Sessão
        </button>
      </div>
    </aside>
  );
}

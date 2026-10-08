import { Bell, Search, Menu } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onToggleMobileMenu?: () => void;
}

export default function Header({ title, subtitle, onToggleMobileMenu }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
          >
            <Menu size={20} />
          </button>
          <div>
            <h2 className="text-xl font-bold text-slate-900">{title}</h2>
            {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="hidden md:flex items-center bg-slate-100 rounded-lg px-3 py-2 gap-2">
            <Search size={16} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="Pesquisar..." 
              className="bg-transparent text-sm outline-none w-40 text-slate-700 placeholder:text-slate-400"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
            <Bell size={20} className="text-slate-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Avatar */}
          <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
              PM
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-slate-700">Pastelaria Minhota</p>
              <p className="text-xs text-slate-400">Comerciante</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

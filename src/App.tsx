import { useState } from 'react';
import { 
  LayoutDashboard, Megaphone, CreditCard, Users, Database, 
  FolderTree, Settings, LogOut, Bell, Search, Menu, Plus, 
  Edit3, Trash2, Eye, EyeOff, Calendar, Tag, X, Check, 
  Star, Gift, Shield, Copy, TrendingUp, ArrowUpRight, ArrowDownRight,
  Filter, MoreVertical, Globe, Smartphone, Server
} from 'lucide-react';

// ==================== SIDEBAR ====================
function Sidebar({ currentPage, onNavigate }: { currentPage: string; onNavigate: (p: string) => void }) {
  const menuItems = [
    { id: 'dashboard', label: 'Painel Geral', icon: LayoutDashboard },
    { id: 'promotions', label: 'Gestor de Promoções', icon: Megaphone },
    { id: 'loyalty', label: 'Fidelidade', icon: CreditCard },
    { id: 'customers', label: 'Clientes', icon: Users },
    { id: 'schema', label: 'Schema BD (SQL)', icon: Database },
    { id: 'structure', label: 'Estrutura Projeto', icon: FolderTree },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-slate-900 text-white flex flex-col z-50">
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

// ==================== HEADER ====================
function Header({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">{title}</h2>
          <p className="text-sm text-slate-500">{subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center bg-slate-100 rounded-lg px-3 py-2 gap-2">
            <Search size={16} className="text-slate-400" />
            <input type="text" placeholder="Pesquisar..." className="bg-transparent text-sm outline-none w-40 text-slate-700 placeholder:text-slate-400" />
          </div>
          <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
            <Bell size={20} className="text-slate-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-xs font-bold">PM</div>
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

// ==================== DASHBOARD ====================
function DashboardPage() {
  const stats = [
    { title: 'Clientes Ativos', value: '1.247', change: '+12%', trend: 'up', icon: Users, color: 'bg-blue-500' },
    { title: 'Promoções Ativas', value: '8', change: '+3', trend: 'up', icon: Megaphone, color: 'bg-green-500' },
    { title: 'Selos Emitidos (Mês)', value: '3.891', change: '+24%', trend: 'up', icon: CreditCard, color: 'bg-purple-500' },
    { title: 'Taxa de Retenção', value: '78%', change: '-2%', trend: 'down', icon: TrendingUp, color: 'bg-orange-500' },
  ];

  const recentActivity = [
    { action: 'Novo cliente registado', customer: 'Maria Silva', time: 'Há 5 min', type: 'customer' },
    { action: 'Selo de fidelidade atribuído', customer: 'João Santos', time: 'Há 12 min', type: 'loyalty' },
    { action: 'Promoção publicada', customer: 'Bolo Rei Especial', time: 'Há 1 hora', type: 'promo' },
    { action: 'Recompensa resgatada', customer: 'Ana Costa', time: 'Há 2 horas', type: 'reward' },
    { action: 'Novo cliente registado', customer: 'Pedro Ferreira', time: 'Há 3 horas', type: 'customer' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-6 text-white">
        <h3 className="text-2xl font-bold">Bom dia, Pastelaria Minhota! 🥐</h3>
        <p className="text-green-100 mt-1">Tem 8 promoções ativas e 1.247 clientes na sua app. Excelente trabalho!</p>
        <div className="flex gap-3 mt-4">
          <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors">Criar Nova Promoção</button>
          <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-medium transition-colors">Ver Estatísticas</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon size={20} className="text-white" />
                </div>
                <span className={`flex items-center gap-1 text-xs font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-500'}`}>
                  {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-sm text-slate-500 mt-1">{stat.title}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5">
          <h4 className="font-semibold text-slate-900 mb-4">Atividade Recente</h4>
          <div className="space-y-3">
            {recentActivity.map((activity, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                  activity.type === 'customer' ? 'bg-blue-100 text-blue-600' :
                  activity.type === 'loyalty' ? 'bg-purple-100 text-purple-600' :
                  activity.type === 'promo' ? 'bg-green-100 text-green-600' :
                  'bg-orange-100 text-orange-600'
                }`}>
                  {activity.type === 'customer' ? '👤' : activity.type === 'loyalty' ? '⭐' : activity.type === 'promo' ? '📢' : '🎁'}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-700">{activity.action}</p>
                  <p className="text-xs text-slate-400">{activity.customer}</p>
                </div>
                <span className="text-xs text-slate-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h4 className="font-semibold text-slate-900 mb-4">Ações Rápidas</h4>
          <div className="space-y-2">
            <button className="w-full text-left p-3 rounded-lg border border-slate-200 hover:border-green-300 hover:bg-green-50 transition-all">
              <p className="text-sm font-medium text-slate-700">📢 Nova Promoção</p>
              <p className="text-xs text-slate-400">Publicar no feed da app</p>
            </button>
            <button className="w-full text-left p-3 rounded-lg border border-slate-200 hover:border-purple-300 hover:bg-purple-50 transition-all">
              <p className="text-sm font-medium text-slate-700">⭐ Configurar Fidelidade</p>
              <p className="text-xs text-slate-400">Regras e recompensas</p>
            </button>
            <button className="w-full text-left p-3 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all">
              <p className="text-sm font-medium text-slate-700">📱 Ver App do Cliente</p>
              <p className="text-xs text-slate-400">Pré-visualizar a app</p>
            </button>
          </div>
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-xs font-medium text-amber-800">🇵🇹 Aviso RGPD</p>
            <p className="text-xs text-amber-600 mt-1">Todos os dados estão em conformidade com o RGPD.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== PROMOTIONS ====================
function PromotionsPage() {
  const [showForm, setShowForm] = useState(false);
  const [posts, setPosts] = useState([
    { id: '1', title: 'Bolo Rei Tradicional — 20% Desconto', description: 'Este Natal, celebre connosco! Bolo Rei feito à mão com frutos secos premium.', post_type: 'promocao', published: true, expires_at: '2024-12-31', created_at: '2024-12-01' },
    { id: '2', title: 'Novos Pastéis de Nata Sem Glúten', description: 'Já experimentou os nossos novos pastéis de nata sem glúten? Receita artesanal.', post_type: 'noticia', published: true, expires_at: null, created_at: '2024-11-28' },
    { id: '3', title: 'Workshop de Confeitaria — Janeiro 2025', description: 'Aprenda a fazer os nossos famosos travesseiros de Sintra. Vagas limitadas!', post_type: 'evento', published: false, expires_at: '2025-01-15', created_at: '2024-11-25' },
  ]);

  const [formData, setFormData] = useState({ title: '', description: '', post_type: 'promocao', expires_at: '', published: true });

  const getPostTypeLabel = (type: string) => {
    switch (type) {
      case 'promocao': return { label: 'Promoção', color: 'bg-green-100 text-green-700', emoji: '🏷️' };
      case 'noticia': return { label: 'Notícia', color: 'bg-blue-100 text-blue-700', emoji: '📰' };
      case 'evento': return { label: 'Evento', color: 'bg-purple-100 text-purple-700', emoji: '📅' };
      default: return { label: type, color: 'bg-slate-100 text-slate-700', emoji: '📌' };
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPost = { id: Date.now().toString(), ...formData, expires_at: formData.expires_at || null, created_at: new Date().toISOString().split('T')[0] };
    setPosts(prev => [newPost, ...prev]);
    setFormData({ title: '', description: '', post_type: 'promocao', expires_at: '', published: true });
    setShowForm(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Todas as Publicações</h3>
          <p className="text-sm text-slate-500">{posts.length} publicações no total</p>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg font-medium text-sm transition-colors shadow-sm">
          <Plus size={18} /> Nova Publicação
        </button>
      </div>

      <div className="grid gap-4">
        {posts.map((post) => {
          const typeInfo = getPostTypeLabel(post.post_type);
          return (
            <div key={post.id} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeInfo.color}`}>{typeInfo.emoji} {typeInfo.label}</span>
                    {post.published ? (
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">✓ Publicada</span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-500">Rascunho</span>
                    )}
                  </div>
                  <h4 className="font-semibold text-slate-900 text-base">{post.title}</h4>
                  <p className="text-sm text-slate-500 mt-1">{post.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><Calendar size={12} />Criado: {post.created_at}</span>
                    {post.expires_at && <span className="flex items-center gap-1"><Tag size={12} />Expira: {post.expires_at}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-2 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"><Edit3 size={16} /></button>
                  <button onClick={() => setPosts(prev => prev.filter(p => p.id !== post.id))} className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors"><Trash2 size={16} /></button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900">Nova Publicação</h3>
              <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-slate-100"><X size={20} className="text-slate-400" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Tipo de Publicação</label>
                <div className="grid grid-cols-3 gap-2">
                  {[{ value: 'promocao', label: '🏷️ Promoção' }, { value: 'noticia', label: '📰 Notícia' }, { value: 'evento', label: '📅 Evento' }].map(type => (
                    <button key={type.value} type="button" onClick={() => setFormData(prev => ({ ...prev, post_type: type.value }))}
                      className={`p-2.5 rounded-lg border-2 text-sm font-medium transition-all ${formData.post_type === type.value ? 'border-green-500 bg-green-50 text-green-700' : 'border-slate-200 text-slate-600'}`}>
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Título *</label>
                <input type="text" required value={formData.title} onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Ex: 20% desconto em todos os bolos" className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Descrição *</label>
                <textarea required rows={3} value={formData.description} onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Descreva a sua promoção..." className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Data de Validade</label>
                <input type="date" value={formData.expires_at} onChange={(e) => setFormData(prev => ({ ...prev, expires_at: e.target.value }))}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
              </div>
              {formData.title && (
                <div className="p-3 border border-dashed border-slate-300 rounded-lg bg-slate-50">
                  <p className="text-xs font-medium text-slate-500 mb-1">Pré-visualização na app:</p>
                  <div className="bg-white rounded-lg p-3 border border-slate-200">
                    <p className="font-semibold text-sm text-slate-900">{formData.title}</p>
                    {formData.description && <p className="text-xs text-slate-500 mt-1">{formData.description}</p>}
                  </div>
                </div>
              )}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">Cancelar</button>
                <button type="submit" className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium"><Check size={16} />Criar Publicação</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== LOYALTY ====================
function LoyaltyPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-3">
          <CreditCard size={24} />
          <h3 className="text-xl font-bold">Cartão de Fidelidade Digital</h3>
        </div>
        <p className="text-purple-100 text-sm">Configure a regra de fidelidade que aparece na app dos seus clientes.</p>
        <div className="mt-4 bg-white/10 rounded-xl p-4">
          <p className="text-sm font-medium text-purple-100">Regra Atual:</p>
          <p className="text-2xl font-bold mt-1">Compra 9, ganha 1 grátis 🎉</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2"><Star size={18} className="text-yellow-500" />Configuração dos Selos</h4>
          <div className="space-y-3">
            {[['Selos por compra', '1'], ['Selos necessários', '9'], ['Recompensa', '1 Produto Grátis'], ['Validade', 'Sem expiração']].map(([label, val]) => (
              <div key={label} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-sm text-slate-600">{label}</span>
                <span className="font-bold text-slate-900">{val}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2"><Gift size={18} className="text-green-500" />Estatísticas</h4>
          <div className="space-y-3">
            <div className="p-3 bg-green-50 rounded-lg"><p className="text-2xl font-bold text-green-700">342</p><p className="text-sm text-green-600">Recompensas resgatadas</p></div>
            <div className="p-3 bg-blue-50 rounded-lg"><p className="text-2xl font-bold text-blue-700">67%</p><p className="text-sm text-blue-600">Clientes que completaram</p></div>
            <div className="p-3 bg-purple-50 rounded-lg"><p className="text-2xl font-bold text-purple-700">4.2</p><p className="text-sm text-purple-600">Média de selos/cliente</p></div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h4 className="font-semibold text-slate-900 mb-4">Pré-visualização do Cartão (App do Cliente)</h4>
        <div className="flex justify-center">
          <div className="w-72 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-5 text-white shadow-lg">
            <div className="text-center mb-4">
              <p className="text-xs font-medium opacity-80">Pastelaria Minhota</p>
              <p className="text-lg font-bold">Cartão de Fidelidade</p>
            </div>
            <div className="grid grid-cols-5 gap-2 mb-4">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${i < 6 ? 'bg-white/90 text-orange-600' : 'bg-white/20 text-white/50'}`}>
                  {i < 6 ? '⭐' : '○'}
                </div>
              ))}
            </div>
            <div className="text-center">
              <p className="text-sm font-medium">6 de 9 selos</p>
              <p className="text-xs opacity-80">Faltam 3 para a recompensa!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== CUSTOMERS ====================
function CustomersPage() {
  const customers = [
    { name: 'Maria Silva', email: 'maria@email.pt', phone: '+351 912 345 678', stamps: 7, visits: 23, lastVisit: '2024-12-10' },
    { name: 'João Santos', email: 'joao@email.pt', phone: '+351 923 456 789', stamps: 3, visits: 12, lastVisit: '2024-12-09' },
    { name: 'Ana Costa', email: 'ana@email.pt', phone: '+351 934 567 890', stamps: 9, visits: 34, lastVisit: '2024-12-10' },
    { name: 'Pedro Ferreira', email: 'pedro@email.pt', phone: '+351 945 678 901', stamps: 1, visits: 3, lastVisit: '2024-12-08' },
    { name: 'Sofia Rodrigues', email: 'sofia@email.pt', phone: '+351 956 789 012', stamps: 5, visits: 18, lastVisit: '2024-12-10' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Clientes Registados</h3>
          <p className="text-sm text-slate-500">{customers.length} clientes na sua base de dados</p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center bg-slate-100 rounded-lg px-3 py-2 gap-2">
            <Search size={16} className="text-slate-400" />
            <input type="text" placeholder="Pesquisar..." className="bg-transparent text-sm outline-none w-40 placeholder:text-slate-400" />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-600 hover:bg-slate-50"><Filter size={16} />Filtrar</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4"><p className="text-sm text-slate-500">Total de Clientes</p><p className="text-2xl font-bold text-slate-900">1.247</p><p className="text-xs text-green-600 mt-1">+23 esta semana</p></div>
        <div className="bg-white rounded-xl border border-slate-200 p-4"><p className="text-sm text-slate-500">Clientes Ativos (30d)</p><p className="text-2xl font-bold text-slate-900">892</p><p className="text-xs text-green-600 mt-1">71.5% do total</p></div>
        <div className="bg-white rounded-xl border border-slate-200 p-4"><p className="text-sm text-slate-500">Novos Registos (Mês)</p><p className="text-2xl font-bold text-slate-900">156</p><p className="text-xs text-green-600 mt-1">+18% vs anterior</p></div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase">Cliente</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase">Contacto</th>
                <th className="text-center px-5 py-3 text-xs font-medium text-slate-500 uppercase">Selos</th>
                <th className="text-center px-5 py-3 text-xs font-medium text-slate-500 uppercase">Visitas</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-slate-500 uppercase">Última Visita</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {customers.map((c, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold">{c.name.split(' ').map(n => n[0]).join('')}</div>
                      <div><p className="text-sm font-medium text-slate-900">{c.name}</p><p className="text-xs text-slate-400">{c.email}</p></div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-sm text-slate-600">{c.phone}</td>
                  <td className="px-5 py-3 text-center"><div className="flex items-center justify-center gap-1"><Star size={14} className="text-yellow-500 fill-yellow-500" /><span className="text-sm font-medium">{c.stamps}/9</span></div></td>
                  <td className="px-5 py-3 text-center text-sm text-slate-600">{c.visits}</td>
                  <td className="px-5 py-3 text-sm text-slate-500">{c.lastVisit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <p className="text-sm font-medium text-amber-800">🇵🇹 Conformidade RGPD</p>
        <p className="text-xs text-amber-700 mt-1">Todos os dados pessoais são armazenados em conformidade com o RGPD. Consentimentos registados.</p>
      </div>
    </div>
  );
}

// ==================== SCHEMA ====================
function SchemaPage() {
  const [copied, setCopied] = useState(false);
  const sql = `-- LusaApp Builder — Schema SQL (Supabase/PostgreSQL)
-- Tabelas: profiles, apps_config, posts, customers, loyalty_transactions

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  business_name TEXT NOT NULL,
  nif TEXT CHECK (nif ~ '^[0-9]{9}$'),
  business_type TEXT CHECK (business_type IN ('restauracao','beleza','retalho','servicos')),
  phone TEXT, postal_code TEXT CHECK (postal_code ~ '^[0-9]{4}-[0-9]{3}$'),
  city TEXT, logo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.apps_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  app_name TEXT NOT NULL, template TEXT NOT NULL,
  primary_color TEXT DEFAULT '#16a34a',
  loyalty_enabled BOOLEAN DEFAULT true,
  loyalty_stamps_needed INTEGER DEFAULT 9,
  whatsapp_number TEXT, phone_number TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL, description TEXT NOT NULL,
  image_url TEXT, post_type TEXT CHECK (post_type IN ('promocao','noticia','evento')),
  published BOOLEAN DEFAULT false, expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  phone TEXT, email TEXT, first_name TEXT, last_name TEXT,
  loyalty_stamps INTEGER DEFAULT 0, total_visits INTEGER DEFAULT 0,
  rgpd_consent BOOLEAN DEFAULT false, rgpd_consent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.loyalty_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE,
  merchant_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  stamps_added INTEGER DEFAULT 0, stamps_removed INTEGER DEFAULT 0,
  reason TEXT NOT NULL, created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "merchant_own_profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "merchant_own_posts" ON public.posts FOR ALL USING (merchant_id = auth.uid());
CREATE POLICY "merchant_own_customers" ON public.customers FOR ALL USING (merchant_id = auth.uid());`;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2"><Database size={20} className="text-blue-500" />Schema da Base de Dados</h3>
          <p className="text-sm text-slate-500 mt-1">SQL completo para Supabase com RLS e validações PT</p>
        </div>
        <button onClick={() => { navigator.clipboard.writeText(sql); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-medium">
          {copied ? <Check size={16} /> : <Copy size={16} />}{copied ? 'Copiado!' : 'Copiar SQL'}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { name: 'profiles', desc: 'Comerciantes', icon: '👤' },
          { name: 'apps_config', desc: 'Config App', icon: '⚙️' },
          { name: 'posts', desc: 'Promoções', icon: '📢' },
          { name: 'customers', desc: 'Clientes', icon: '🛒' },
          { name: 'loyalty_tx', desc: 'Transações', icon: '⭐' },
        ].map(t => (
          <div key={t.name} className="bg-white rounded-xl border border-slate-200 p-3">
            <span className="text-lg">{t.icon}</span>
            <p className="text-xs font-mono font-bold text-slate-900 mt-1">{t.name}</p>
            <p className="text-xs text-slate-500">{t.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">
        <Shield size={20} className="text-blue-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-blue-800">Row Level Security (RLS) Ativo</p>
          <p className="text-xs text-blue-700 mt-1">Cada comerciante apenas acede aos seus próprios dados.</p>
        </div>
      </div>

      <div className="bg-slate-900 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
          <span className="text-xs font-mono text-slate-400">schema.sql</span>
        </div>
        <pre className="p-4 overflow-x-auto text-sm leading-relaxed"><code className="text-green-400 font-mono whitespace-pre">{sql}</code></pre>
      </div>
    </div>
  );
}

// ==================== STRUCTURE ====================
function StructurePage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2"><FolderTree size={20} className="text-orange-500" />Estrutura do Projeto</h3>
        <p className="text-sm text-slate-500 mt-1">Arquitetura monorepo Next.js + Expo + Supabase</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2"><Globe size={18} className="text-blue-600" /><h4 className="font-semibold text-blue-900">Dashboard</h4></div>
          <p className="text-xs text-blue-700">Next.js 14 + Tailwind + shadcn/ui</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2"><Smartphone size={18} className="text-green-600" /><h4 className="font-semibold text-green-900">App Mobile</h4></div>
          <p className="text-xs text-green-700">React Native + Expo (iOS/Android)</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2"><Server size={18} className="text-purple-600" /><h4 className="font-semibold text-purple-900">Backend</h4></div>
          <p className="text-xs text-purple-700">Supabase (PostgreSQL + Auth + Storage)</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-3 bg-blue-50 border-b border-blue-200">
          <p className="text-sm font-medium text-blue-800">📁 apps/web/ — Dashboard (Next.js 14)</p>
        </div>
        <div className="p-5 font-mono text-sm space-y-1">
          <p>📁 app/</p>
          <p className="pl-5">📁 (auth)/</p>
          <p className="pl-10">📄 login/page.tsx</p>
          <p className="pl-10">📄 register/page.tsx</p>
          <p className="pl-5">📁 (dashboard)/</p>
          <p className="pl-10">📄 layout.tsx <span className="text-slate-400">— Sidebar + Header</span></p>
          <p className="pl-10">📄 page.tsx <span className="text-slate-400">— Painel Geral</span></p>
          <p className="pl-10">📁 promocoes/page.tsx <span className="text-slate-400">— Gestor ★</span></p>
          <p className="pl-10">📁 fidelidade/page.tsx</p>
          <p className="pl-10">📁 clientes/page.tsx</p>
          <p>📁 components/</p>
          <p className="pl-5">📄 promotion-form.tsx</p>
          <p className="pl-5">📄 loyalty-config.tsx</p>
          <p className="pl-5">📄 customer-table.tsx</p>
          <p>📁 lib/supabase/</p>
          <p className="pl-5">📄 client.ts <span className="text-slate-400">— Browser client</span></p>
          <p className="pl-5">📄 server.ts <span className="text-slate-400">— Server client</span></p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-3 bg-green-50 border-b border-green-200">
          <p className="text-sm font-medium text-green-800">📁 apps/mobile/ — App Cliente (Expo)</p>
        </div>
        <div className="p-5 font-mono text-sm space-y-1">
          <p>📁 app/ <span className="text-slate-400">— Expo Router</span></p>
          <p className="pl-5">📄 index.tsx <span className="text-slate-400">— Feed Promoções</span></p>
          <p className="pl-5">📄 login.tsx</p>
          <p className="pl-5">📄 fidelidade.tsx <span className="text-slate-400">— Cartão + QR</span></p>
          <p>📁 components/</p>
          <p className="pl-5">📄 PromotionCard.tsx</p>
          <p className="pl-5">📄 LoyaltyCard.tsx</p>
          <p className="pl-5">📄 QRScanner.tsx</p>
          <p className="pl-5">📄 RGPDConsent.tsx</p>
          <p>📁 services/</p>
          <p className="pl-5">📄 supabase.ts</p>
          <p className="pl-5">📄 notifications.ts</p>
          <p className="pl-5">📄 payments.ts <span className="text-slate-400">— Stripe/MB Way</span></p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h4 className="font-semibold text-slate-900 mb-4">🛠️ Stack Tecnológica</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h5 className="text-sm font-medium text-blue-700">Frontend</h5>
            <ul className="text-xs text-slate-600 space-y-1 mt-2">
              <li>• Next.js 14 (App Router)</li>
              <li>• React 18 + TypeScript</li>
              <li>• Tailwind CSS + shadcn/ui</li>
              <li>• TanStack Query</li>
            </ul>
          </div>
          <div>
            <h5 className="text-sm font-medium text-green-700">Mobile</h5>
            <ul className="text-xs text-slate-600 space-y-1 mt-2">
              <li>• React Native + Expo SDK 50+</li>
              <li>• Expo Router</li>
              <li>• Push Notifications</li>
              <li>• expo-camera (QR)</li>
            </ul>
          </div>
          <div>
            <h5 className="text-sm font-medium text-purple-700">Backend</h5>
            <ul className="text-xs text-slate-600 space-y-1 mt-2">
              <li>• Supabase (PostgreSQL)</li>
              <li>• Supabase Auth + Storage</li>
              <li>• Edge Functions (Deno)</li>
              <li>• Vercel + EAS Build</li>
            </ul>
          </div>
          <div>
            <h5 className="text-sm font-medium text-orange-700">Portugal</h5>
            <ul className="text-xs text-slate-600 space-y-1 mt-2">
              <li>• Stripe + IfthenPay (MB Way)</li>
              <li>• WhatsApp Business API</li>
              <li>• RGPD nativo</li>
              <li>• NIF + Código Postal PT</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== MAIN APP ====================
const pageConfig: Record<string, { title: string; subtitle: string }> = {
  dashboard: { title: 'Painel Geral', subtitle: 'Visão geral da sua app' },
  promotions: { title: 'Gestor de Promoções', subtitle: 'Crie e publique promoções para a app dos seus clientes' },
  loyalty: { title: 'Cartão de Fidelidade', subtitle: 'Configure o programa de fidelidade digital' },
  customers: { title: 'Clientes', subtitle: 'Gerir a base de clientes da sua app' },
  schema: { title: 'PASSO 1 — Schema da Base de Dados', subtitle: 'SQL completo para Supabase com RLS' },
  structure: { title: 'PASSO 2 — Estrutura do Projeto', subtitle: 'Arquitetura monorepo Next.js + Expo' },
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const config = pageConfig[currentPage] || pageConfig.dashboard;

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <DashboardPage />;
      case 'promotions': return <PromotionsPage />;
      case 'loyalty': return <LoyaltyPage />;
      case 'customers': return <CustomersPage />;
      case 'schema': return <SchemaPage />;
      case 'structure': return <StructurePage />;
      default: return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="lg:ml-64">
        <Header title={config.title} subtitle={config.subtitle} />
        <main>{renderPage()}</main>
      </div>
    </div>
  );
}

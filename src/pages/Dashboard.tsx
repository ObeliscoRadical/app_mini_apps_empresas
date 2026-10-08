import { TrendingUp, Users, Megaphone, CreditCard, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function DashboardPage() {
  const stats = [
    {
      title: 'Clientes Ativos',
      value: '1.247',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Promoções Ativas',
      value: '8',
      change: '+3',
      trend: 'up',
      icon: Megaphone,
      color: 'bg-green-500',
    },
    {
      title: 'Selos Emitidos (Mês)',
      value: '3.891',
      change: '+24%',
      trend: 'up',
      icon: CreditCard,
      color: 'bg-purple-500',
    },
    {
      title: 'Taxa de Retenção',
      value: '78%',
      change: '-2%',
      trend: 'down',
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
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
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-6 text-white">
        <h3 className="text-2xl font-bold">Bom dia, Pastelaria Minhota! 🥐</h3>
        <p className="text-green-100 mt-1">
          Tem 8 promoções ativas e 1.247 clientes na sua app. Excelente trabalho!
        </p>
        <div className="flex gap-3 mt-4">
          <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Criar Nova Promoção
          </button>
          <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Ver Estatísticas
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon size={20} className="text-white" />
                </div>
                <span className={`flex items-center gap-1 text-xs font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-500'
                }`}>
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

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Feed */}
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
                  {activity.type === 'customer' ? '👤' : 
                   activity.type === 'loyalty' ? '⭐' :
                   activity.type === 'promo' ? '📢' : '🎁'}
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

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h4 className="font-semibold text-slate-900 mb-4">Ações Rápidas</h4>
          <div className="space-y-2">
            <button className="w-full text-left p-3 rounded-lg border border-slate-200 hover:border-green-300 hover:bg-green-50 transition-all group">
              <p className="text-sm font-medium text-slate-700 group-hover:text-green-700">📢 Nova Promoção</p>
              <p className="text-xs text-slate-400">Publicar no feed da app</p>
            </button>
            <button className="w-full text-left p-3 rounded-lg border border-slate-200 hover:border-purple-300 hover:bg-purple-50 transition-all group">
              <p className="text-sm font-medium text-slate-700 group-hover:text-purple-700">⭐ Configurar Fidelidade</p>
              <p className="text-xs text-slate-400">Regras e recompensas</p>
            </button>
            <button className="w-full text-left p-3 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all group">
              <p className="text-sm font-medium text-slate-700 group-hover:text-blue-700">📱 Ver App do Cliente</p>
              <p className="text-xs text-slate-400">Pré-visualizar a app</p>
            </button>
            <button className="w-full text-left p-3 rounded-lg border border-slate-200 hover:border-orange-300 hover:bg-orange-50 transition-all group">
              <p className="text-sm font-medium text-slate-700 group-hover:text-orange-700">💬 Enviar Mensagem</p>
              <p className="text-xs text-slate-400">Notificação push para clientes</p>
            </button>
          </div>

          {/* RGPD Notice */}
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-xs font-medium text-amber-800">🇵🇹 Aviso RGPD</p>
            <p className="text-xs text-amber-600 mt-1">
              Todos os dados de clientes estão em conformidade com o RGPD. Consentimentos registados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

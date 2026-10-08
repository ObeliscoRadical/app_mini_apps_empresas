import { Search, Filter, MoreVertical, Star } from 'lucide-react';
import { useState } from 'react';

const mockCustomers = [
  { id: '1', name: 'Maria Silva', email: 'maria@email.pt', phone: '+351 912 345 678', stamps: 7, visits: 23, lastVisit: '2024-12-10' },
  { id: '2', name: 'João Santos', email: 'joao@email.pt', phone: '+351 923 456 789', stamps: 3, visits: 12, lastVisit: '2024-12-09' },
  { id: '3', name: 'Ana Costa', email: 'ana@email.pt', phone: '+351 934 567 890', stamps: 9, visits: 34, lastVisit: '2024-12-10' },
  { id: '4', name: 'Pedro Ferreira', email: 'pedro@email.pt', phone: '+351 945 678 901', stamps: 1, visits: 3, lastVisit: '2024-12-08' },
  { id: '5', name: 'Sofia Rodrigues', email: 'sofia@email.pt', phone: '+351 956 789 012', stamps: 5, visits: 18, lastVisit: '2024-12-10' },
  { id: '6', name: 'Miguel Oliveira', email: 'miguel@email.pt', phone: '+351 967 890 123', stamps: 8, visits: 28, lastVisit: '2024-12-09' },
];

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = mockCustomers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Clientes Registados</h3>
          <p className="text-sm text-slate-500">{mockCustomers.length} clientes na sua base de dados</p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center bg-slate-100 rounded-lg px-3 py-2 gap-2">
            <Search size={16} className="text-slate-400" />
            <input
              type="text"
              placeholder="Pesquisar clientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent text-sm outline-none w-40 placeholder:text-slate-400"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-600 hover:bg-slate-50">
            <Filter size={16} />
            Filtrar
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Total de Clientes</p>
          <p className="text-2xl font-bold text-slate-900">1.247</p>
          <p className="text-xs text-green-600 mt-1">+23 esta semana</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Clientes Ativos (30 dias)</p>
          <p className="text-2xl font-bold text-slate-900">892</p>
          <p className="text-xs text-green-600 mt-1">71.5% do total</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Novos Registos (Mês)</p>
          <p className="text-2xl font-bold text-slate-900">156</p>
          <p className="text-xs text-green-600 mt-1">+18% vs mês anterior</p>
        </div>
      </div>

      {/* Customer Table */}
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
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((customer) => (
                <tr key={customer.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{customer.name}</p>
                        <p className="text-xs text-slate-400">{customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <p className="text-sm text-slate-600">{customer.phone}</p>
                  </td>
                  <td className="px-5 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Star size={14} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium text-slate-700">{customer.stamps}/9</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-center">
                    <span className="text-sm text-slate-600">{customer.visits}</span>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-sm text-slate-500">
                      {new Date(customer.lastVisit).toLocaleDateString('pt-PT')}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <button className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                      <MoreVertical size={16} className="text-slate-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* RGPD Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <p className="text-sm font-medium text-amber-800">🇵🇹 Conformidade RGPD</p>
        <p className="text-xs text-amber-700 mt-1">
          Todos os dados pessoais dos clientes são armazenados em conformidade com o Regulamento Geral de Proteção de Dados. 
          Os clientes deram consentimento explícito no momento do registo na app. Pode exportar ou eliminar dados a qualquer momento.
        </p>
      </div>
    </div>
  );
}

import { CreditCard, Gift, Star, Settings } from 'lucide-react';

export default function LoyaltyPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Configuração Atual */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-3">
          <CreditCard size={24} />
          <h3 className="text-xl font-bold">Cartão de Fidelidade Digital</h3>
        </div>
        <p className="text-purple-100 text-sm">
          Configure a regra de fidelidade que aparece na app dos seus clientes.
        </p>
        <div className="mt-4 bg-white/10 rounded-xl p-4">
          <p className="text-sm font-medium text-purple-100">Regra Atual:</p>
          <p className="text-2xl font-bold mt-1">Compra 9, ganha 1 grátis 🎉</p>
          <p className="text-sm text-purple-200 mt-2">
            A cada compra, o cliente recebe 1 selo. Ao completar 9 selos, recebe uma recompensa gratuita.
          </p>
        </div>
        <button className="mt-4 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
          <Settings size={16} />
          Alterar Regra
        </button>
      </div>

      {/* Configurações Detalhadas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Regras */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Star size={18} className="text-yellow-500" />
            Configuração dos Selos
          </h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <span className="text-sm text-slate-600">Selos por compra</span>
              <span className="font-bold text-slate-900">1</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <span className="text-sm text-slate-600">Selos necessários</span>
              <span className="font-bold text-slate-900">9</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <span className="text-sm text-slate-600">Recompensa</span>
              <span className="font-bold text-slate-900 text-purple-600">1 Produto Grátis</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <span className="text-sm text-slate-600">Validade dos selos</span>
              <span className="font-bold text-slate-900">Sem expiração</span>
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Gift size={18} className="text-green-500" />
            Estatísticas do Programa
          </h4>
          <div className="space-y-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-700">342</p>
              <p className="text-sm text-green-600">Recompensas resgatadas (total)</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-700">67%</p>
              <p className="text-sm text-blue-600">Clientes que completaram o cartão</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-700">4.2</p>
              <p className="text-sm text-purple-600">Média de selos por cliente ativo</p>
            </div>
          </div>
        </div>
      </div>

      {/* Simulação do Cartão */}
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
                <div
                  key={i}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                    i < 6 
                      ? 'bg-white/90 text-orange-600' 
                      : 'bg-white/20 text-white/50'
                  }`}
                >
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

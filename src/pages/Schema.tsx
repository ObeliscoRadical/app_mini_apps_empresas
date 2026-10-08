import { Database, Shield, Copy, Check } from 'lucide-react';
import { useState } from 'react';

const sqlSchema = `-- ============================================================
-- LusaApp Builder — Schema SQL para Supabase (PostgreSQL)
-- Versão: MVP v1.0
-- Mercado: PMEs Portuguesas
-- ============================================================

-- ============================================================
-- 1. PERFIS DE COMERCIANTES (profiles)
-- ============================================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  business_name TEXT NOT NULL,
  nif TEXT CHECK (nif ~ '^[0-9]{9}$'), -- NIF português: 9 dígitos
  business_type TEXT NOT NULL CHECK (business_type IN ('restauracao', 'beleza', 'retalho', 'servicos')),
  phone TEXT,
  address TEXT,
  postal_code TEXT CHECK (postal_code ~ '^[0-9]{4}-[0-9]{3}$'), -- Formato PT: 1234-567
  city TEXT,
  logo_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- 2. CONFIGURAÇÃO DA APP (apps_config)
-- ============================================================
CREATE TABLE public.apps_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  app_name TEXT NOT NULL,
  primary_color TEXT NOT NULL DEFAULT '#16a34a',
  secondary_color TEXT NOT NULL DEFAULT '#059669',
  template TEXT NOT NULL CHECK (template IN ('restauracao', 'beleza', 'retalho', 'servicos')),
  loyalty_enabled BOOLEAN NOT NULL DEFAULT true,
  loyalty_rule TEXT NOT NULL DEFAULT 'Compra 9, ganha 1 grátis',
  loyalty_stamps_needed INTEGER NOT NULL DEFAULT 9 CHECK (loyalty_stamps_needed > 0),
  whatsapp_number TEXT,
  phone_number TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(merchant_id)
);

-- ============================================================
-- 3. PUBLICAÇÕES / PROMOÇÕES (posts)
-- ============================================================
CREATE TABLE public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL CHECK (char_length(title) <= 100),
  description TEXT NOT NULL CHECK (char_length(description) <= 500),
  image_url TEXT,
  post_type TEXT NOT NULL CHECK (post_type IN ('promocao', 'noticia', 'evento')),
  published BOOLEAN NOT NULL DEFAULT false,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índice para queries frequentes
CREATE INDEX idx_posts_merchant_published ON public.posts(merchant_id, published, created_at DESC);
CREATE INDEX idx_posts_expires ON public.posts(expires_at) WHERE expires_at IS NOT NULL;

-- ============================================================
-- 4. CLIENTES FINAIS (customers)
-- ============================================================
CREATE TABLE public.customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  phone TEXT,
  email TEXT,
  first_name TEXT,
  last_name TEXT,
  loyalty_stamps INTEGER NOT NULL DEFAULT 0 CHECK (loyalty_stamps >= 0),
  total_visits INTEGER NOT NULL DEFAULT 0,
  rgpd_consent BOOLEAN NOT NULL DEFAULT false,
  rgpd_consent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_visit_at TIMESTAMPTZ,
  UNIQUE(merchant_id, phone),
  UNIQUE(merchant_id, email)
);

CREATE INDEX idx_customers_merchant ON public.customers(merchant_id, created_at DESC);

-- ============================================================
-- 5. TRANSAÇÕES DE FIDELIDADE (loyalty_transactions)
-- ============================================================
CREATE TABLE public.loyalty_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  merchant_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  stamps_added INTEGER NOT NULL DEFAULT 0 CHECK (stamps_added >= 0),
  stamps_removed INTEGER NOT NULL DEFAULT 0 CHECK (stamps_removed >= 0),
  reason TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_loyalty_customer ON public.loyalty_transactions(customer_id, created_at DESC);
CREATE INDEX idx_loyalty_merchant ON public.loyalty_transactions(merchant_id, created_at DESC);

-- ============================================================
-- 6. ROW LEVEL SECURITY (RLS) — Políticas de Segurança
-- ============================================================

-- Ativar RLS em todas as tabelas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.apps_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loyalty_transactions ENABLE ROW LEVEL SECURITY;

-- PROFILES: Comerciante vê apenas o seu perfil
CREATE POLICY "Comerciante vê o seu perfil"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Comerciante atualiza o seu perfil"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- APPS_CONFIG: Comerciante gere a sua config
CREATE POLICY "Comerciante vê a sua config"
  ON public.apps_config FOR SELECT
  USING (merchant_id = auth.uid());

CREATE POLICY "Comerciante gere a sua config"
  ON public.apps_config FOR ALL
  USING (merchant_id = auth.uid());

-- POSTS: Comerciante gere as suas publicações
CREATE POLICY "Comerciante vê as suas publicações"
  ON public.posts FOR SELECT
  USING (merchant_id = auth.uid());

CREATE POLICY "Comerciante gere as suas publicações"
  ON public.posts FOR ALL
  USING (merchant_id = auth.uid());

-- CUSTOMERS: Comerciante vê os seus clientes
CREATE POLICY "Comerciante vê os seus clientes"
  ON public.customers FOR SELECT
  USING (merchant_id = auth.uid());

CREATE POLICY "Comerciante gere os seus clientes"
  ON public.customers FOR ALL
  USING (merchant_id = auth.uid());

-- LOYALTY_TRANSACTIONS: Comerciante vê transações dos seus clientes
CREATE POLICY "Comerciante vê transações dos seus clientes"
  ON public.loyalty_transactions FOR SELECT
  USING (merchant_id = auth.uid());

CREATE POLICY "Comerciante cria transações"
  ON public.loyalty_transactions FOR INSERT
  WITH CHECK (merchant_id = auth.uid());

-- ============================================================
-- 7. FUNÇÕES AUXILIARES
-- ============================================================

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_apps_config_updated_at
  BEFORE UPDATE ON public.apps_config
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_posts_updated_at
  BEFORE UPDATE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- 8. STORAGE BUCKETS (para imagens)
-- ============================================================
-- No Supabase Dashboard, criar bucket:
-- Nome: "post-images"
-- Público: Sim (para exibir na app)
-- Limite: 5MB por ficheiro
-- Tipos: image/jpeg, image/png, image/webp`;

export default function SchemaPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(sqlSchema);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <Database size={20} className="text-blue-500" />
            Schema da Base de Dados — Supabase (PostgreSQL)
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            PASSO 1: Schema SQL completo com tabelas, índices, RLS e triggers
          </p>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-medium transition-colors"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? 'Copiado!' : 'Copiar SQL'}
        </button>
      </div>

      {/* Tabelas Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {[
          { name: 'profiles', desc: 'Comerciantes', color: 'bg-blue-500', icon: '👤' },
          { name: 'apps_config', desc: 'Config da App', color: 'bg-purple-500', icon: '⚙️' },
          { name: 'posts', desc: 'Promoções/Notícias', color: 'bg-green-500', icon: '📢' },
          { name: 'customers', desc: 'Clientes Finais', color: 'bg-orange-500', icon: '🛒' },
          { name: 'loyalty_transactions', desc: 'Transações Selo', color: 'bg-red-500', icon: '⭐' },
        ].map(table => (
          <div key={table.name} className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{table.icon}</span>
              <span className={`w-2 h-2 rounded-full ${table.color}`} />
            </div>
            <p className="text-sm font-mono font-bold text-slate-900">{table.name}</p>
            <p className="text-xs text-slate-500 mt-1">{table.desc}</p>
          </div>
        ))}
      </div>

      {/* RLS Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">
        <Shield size={20} className="text-blue-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-blue-800">Row Level Security (RLS) Ativo</p>
          <p className="text-xs text-blue-700 mt-1">
            Todas as tabelas têm políticas RLS que garantem que cada comerciante apenas acede aos seus próprios dados. 
            Nenhum comerciante pode ver ou modificar dados de outro.
          </p>
        </div>
      </div>

      {/* SQL Code */}
      <div className="bg-slate-900 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
          <span className="text-xs font-mono text-slate-400">schema.sql</span>
          <span className="text-xs text-slate-500">~120 linhas</span>
        </div>
        <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
          <code className="text-green-400 font-mono whitespace-pre">{sqlSchema}</code>
        </pre>
      </div>

      {/* Notas */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h4 className="font-semibold text-slate-900 mb-3">📝 Notas de Implementação</h4>
        <ul className="space-y-2 text-sm text-slate-600">
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            <span>Validação de NIF (9 dígitos) e código postal português (XXXX-XXX) via CHECK constraints</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            <span>Índices otimizados para as queries mais frequentes (feed de promoções, lista de clientes)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            <span>Campo <code className="bg-slate-100 px-1 rounded">rgpd_consent</code> na tabela customers para conformidade RGPD</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            <span>Triggers automáticos para <code className="bg-slate-100 px-1 rounded">updated_at</code> em todas as tabelas relevantes</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">✓</span>
            <span>Storage bucket preparado para upload de imagens das promoções</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

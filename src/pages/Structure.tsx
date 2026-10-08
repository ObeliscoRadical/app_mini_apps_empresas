import { FolderTree, Globe, Smartphone, Server } from 'lucide-react';

export default function StructurePage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <FolderTree size={20} className="text-orange-500" />
          Estrutura do Projeto — PASSO 2
        </h3>
        <p className="text-sm text-slate-500 mt-1">
          Arquitetura monorepo recomendada para o LusaApp Builder
        </p>
      </div>

      {/* Architecture Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Globe size={18} className="text-blue-600" />
            <h4 className="font-semibold text-blue-900">Dashboard (Web)</h4>
          </div>
          <p className="text-xs text-blue-700">Next.js 14 + Tailwind + shadcn/ui</p>
          <p className="text-xs text-blue-600 mt-1">Hospedado na Vercel</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Smartphone size={18} className="text-green-600" />
            <h4 className="font-semibold text-green-900">App Mobile</h4>
          </div>
          <p className="text-xs text-green-700">React Native + Expo</p>
          <p className="text-xs text-green-600 mt-1">Builds via EAS (iOS/Android/PWA)</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Server size={18} className="text-purple-600" />
            <h4 className="font-semibold text-purple-900">Backend (BaaS)</h4>
          </div>
          <p className="text-xs text-purple-700">Supabase (PostgreSQL + Auth + Storage)</p>
          <p className="text-xs text-purple-600 mt-1">Edge Functions para lógica custom</p>
        </div>
      </div>

      {/* File Tree */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-200">
          <p className="text-sm font-medium text-slate-700">📁 lusaapp-builder/ (Monorepo)</p>
        </div>
        <div className="p-5 font-mono text-sm space-y-0.5 overflow-x-auto">
          <TreeItem icon="📁" name="apps/" depth={0} />
          <TreeItem icon="📁" name="web/" depth={1} badge="Next.js 14" />
          <TreeItem icon="📁" name="app/" depth={1} badge="Expo" />
          <TreeItem icon="📁" name="packages/" depth={0} />
          <TreeItem icon="📁" name="shared/" depth={1} desc="Tipos, utils, constantes" />
          <TreeItem icon="📁" name="ui/" depth={1} desc="Componentes partilhados" />
          <TreeItem icon="📄" name="turbo.json" depth={0} />
          <TreeItem icon="📄" name="package.json" depth={0} />
          <TreeItem icon="📄" name=".env.local" depth={0} desc="Variáveis de ambiente" />
        </div>
      </div>

      {/* Detailed Structure - Web */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-3 bg-blue-50 border-b border-blue-200">
          <p className="text-sm font-medium text-blue-800">📁 apps/web/ — Dashboard do Comerciante</p>
        </div>
        <div className="p-5 font-mono text-sm space-y-0.5 overflow-x-auto">
          <TreeItem icon="📁" name="app/" depth={0} />
          <TreeItem icon="📁" name="(auth)/" depth={1} />
          <TreeItem icon="📄" name="login/page.tsx" depth={2} />
          <TreeItem icon="📄" name="register/page.tsx" depth={2} />
          <TreeItem icon="📁" name="(dashboard)/" depth={1} />
          <TreeItem icon="📄" name="layout.tsx" depth={2} desc="Sidebar + Header" />
          <TreeItem icon="📄" name="page.tsx" depth={2} desc="Painel Geral" />
          <TreeItem icon="📁" name="promocoes/" depth={2} />
          <TreeItem icon="📄" name="page.tsx" depth={3} desc="Gestor de Promoções ★" />
          <TreeItem icon="📁" name="fidelidade/" depth={2} />
          <TreeItem icon="📄" name="page.tsx" depth={3} desc="Config. Fidelidade" />
          <TreeItem icon="📁" name="clientes/" depth={2} />
          <TreeItem icon="📄" name="page.tsx" depth={3} desc="Lista de Clientes" />
          <TreeItem icon="📁" name="definicoes/" depth={2} />
          <TreeItem icon="📄" name="page.tsx" depth={3} desc="Definições da App" />
          <TreeItem icon="📁" name="components/" depth={0} />
          <TreeItem icon="📄" name="promotion-form.tsx" depth={1} desc="Formulário de criação" />
          <TreeItem icon="📄" name="promotion-card.tsx" depth={1} desc="Card de publicação" />
          <TreeItem icon="📄" name="loyalty-config.tsx" depth={1} desc="Config. fidelidade" />
          <TreeItem icon="📄" name="customer-table.tsx" depth={1} desc="Tabela de clientes" />
          <TreeItem icon="📄" name="rgpd-banner.tsx" depth={1} desc="Consentimento RGPD" />
          <TreeItem icon="📁" name="lib/" depth={0} />
          <TreeItem icon="📄" name="supabase/client.ts" depth={1} desc="Cliente browser" />
          <TreeItem icon="📄" name="supabase/server.ts" depth={1} desc="Cliente server-side" />
          <TreeItem icon="📄" name="utils.ts" depth={1} desc="Helpers" />
          <TreeItem icon="📁" name="types/" depth={0} />
          <TreeItem icon="📄" name="database.ts" depth={1} desc="Tipos gerados do Supabase" />
        </div>
      </div>

      {/* Detailed Structure - Mobile */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-3 bg-green-50 border-b border-green-200">
          <p className="text-sm font-medium text-green-800">📁 apps/mobile/ — App do Cliente Final</p>
        </div>
        <div className="p-5 font-mono text-sm space-y-0.5 overflow-x-auto">
          <TreeItem icon="📁" name="app/" depth={0} desc="Expo Router (file-based)" />
          <TreeItem icon="📄" name="_layout.tsx" depth={1} desc="Layout raiz" />
          <TreeItem icon="📄" name="index.tsx" depth={1} desc="Feed de Promoções" />
          <TreeItem icon="📄" name="login.tsx" depth={1} desc="Login/Registo" />
          <TreeItem icon="📄" name="fidelidade.tsx" depth={1} desc="Cartão Digital + QR" />
          <TreeItem icon="📄" name="perfil.tsx" depth={1} desc="Perfil do Utilizador" />
          <TreeItem icon="📁" name="components/" depth={0} />
          <TreeItem icon="📄" name="PromotionCard.tsx" depth={1} desc="Card no feed" />
          <TreeItem icon="📄" name="LoyaltyCard.tsx" depth={1} desc="Cartão com selos" />
          <TreeItem icon="📄" name="QRScanner.tsx" depth={1} desc="Scanner QR Code" />
          <TreeItem icon="📄" name="ContactButton.tsx" depth={1} desc="WhatsApp/Tel" />
          <TreeItem icon="📄" name="RGPDConsent.tsx" depth={1} desc="Banner consentimento" />
          <TreeItem icon="📁" name="services/" depth={0} />
          <TreeItem icon="📄" name="supabase.ts" depth={1} desc="Cliente Supabase" />
          <TreeItem icon="📄" name="notifications.ts" depth={1} desc="Push Notifications" />
          <TreeItem icon="📄" name="payments.ts" depth={1} desc="Stripe/MB Way" />
        </div>
      </div>

      {/* Tech Stack */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h4 className="font-semibold text-slate-900 mb-4">🛠️ Stack Tecnológica Detalhada</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h5 className="text-sm font-medium text-blue-700">Frontend (Dashboard)</h5>
            <ul className="text-xs text-slate-600 space-y-1">
              <li>• Next.js 14 (App Router) — SSR + RSC</li>
              <li>• React 18 + TypeScript</li>
              <li>• Tailwind CSS + shadcn/ui</li>
              <li>• TanStack Query (data fetching)</li>
              <li>• Zod (validação de formulários)</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h5 className="text-sm font-medium text-green-700">Mobile (App Cliente)</h5>
            <ul className="text-xs text-slate-600 space-y-1">
              <li>• React Native + Expo SDK 50+</li>
              <li>• Expo Router (navegação)</li>
              <li>• Expo Push Notifications</li>
              <li>• expo-camera (QR Scanner)</li>
              <li>• React Native Paper (UI)</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h5 className="text-sm font-medium text-purple-700">Backend & Infra</h5>
            <ul className="text-xs text-slate-600 space-y-1">
              <li>• Supabase (PostgreSQL + Auth + Storage)</li>
              <li>• Supabase Edge Functions (Deno)</li>
              <li>• Vercel (deploy frontend)</li>
              <li>• EAS Build (builds mobile)</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h5 className="text-sm font-medium text-orange-700">Integrações Portugal</h5>
            <ul className="text-xs text-slate-600 space-y-1">
              <li>• Stripe (pagamentos base)</li>
              <li>• IfthenPay / EuPago (MB Way, Multibanco)</li>
              <li>• WhatsApp Business Cloud API</li>
              <li>• Expo Notifications (push)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente auxiliar para a árvore de ficheiros
function TreeItem({ icon, name, depth, badge, desc }: { 
  icon: string; name: string; depth: number; badge?: string; desc?: string 
}) {
  return (
    <div className="flex items-center gap-2" style={{ paddingLeft: `${depth * 20}px` }}>
      <span className="text-sm">{icon}</span>
      <span className="text-slate-800">{name}</span>
      {badge && (
        <span className="px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded text-xs">{badge}</span>
      )}
      {desc && (
        <span className="text-xs text-slate-400">— {desc}</span>
      )}
    </div>
  );
}

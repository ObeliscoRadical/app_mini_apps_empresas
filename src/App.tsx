import { useState } from 'react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', display: 'flex' }}>
      {/* Sidebar */}
      <div style={{ 
        width: '256px', 
        backgroundColor: '#0f172a', 
        color: 'white', 
        padding: '24px',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0
      }}>
        <h1 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>LusaApp</h1>
        <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '32px' }}>Builder MVP</p>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {[
            { id: 'dashboard', label: '📊 Painel Geral' },
            { id: 'promotions', label: '📢 Gestor de Promoções' },
            { id: 'loyalty', label: '⭐ Fidelidade' },
            { id: 'customers', label: '👥 Clientes' },
            { id: 'schema', label: '🗄️ Schema BD (SQL)' },
            { id: 'structure', label: '📁 Estrutura Projeto' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              style={{
                padding: '10px 12px',
                borderRadius: '8px',
                textAlign: 'left',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                border: 'none',
                backgroundColor: currentPage === item.id ? 'rgba(22, 163, 74, 0.2)' : 'transparent',
                color: currentPage === item.id ? '#4ade80' : '#cbd5e1',
                transition: 'all 0.2s'
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: '256px', flex: 1 }}>
        {/* Header */}
        <header style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #e2e8f0',
          padding: '16px 24px',
          position: 'sticky',
          top: 0,
          zIndex: 40
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#0f172a' }}>
            {currentPage === 'dashboard' && 'Painel Geral'}
            {currentPage === 'promotions' && 'Gestor de Promoções'}
            {currentPage === 'loyalty' && 'Cartão de Fidelidade'}
            {currentPage === 'customers' && 'Clientes'}
            {currentPage === 'schema' && 'PASSO 1 — Schema da Base de Dados'}
            {currentPage === 'structure' && 'PASSO 2 — Estrutura do Projeto'}
          </h2>
        </header>

        {/* Page Content */}
        <main style={{ padding: '24px' }}>
          {currentPage === 'dashboard' && <DashboardPage />}
          {currentPage === 'promotions' && <PromotionsPage />}
          {currentPage === 'loyalty' && <LoyaltyPage />}
          {currentPage === 'customers' && <CustomersPage />}
          {currentPage === 'schema' && <SchemaPage />}
          {currentPage === 'structure' && <StructurePage />}
        </main>
      </div>
    </div>
  );
}

function DashboardPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Welcome Banner */}
      <div style={{
        background: 'linear-gradient(to right, #16a34a, #047857)',
        borderRadius: '16px',
        padding: '24px',
        color: 'white'
      }}>
        <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
          Bom dia, Pastelaria Minhota! 🥐
        </h3>
        <p style={{ color: '#bbf7d0' }}>
          Tem 8 promoções ativas e 1.247 clientes na sua app. Excelente trabalho!
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
        {[
          { title: 'Clientes Ativos', value: '1.247', change: '+12%', color: '#3b82f6' },
          { title: 'Promoções Ativas', value: '8', change: '+3', color: '#22c55e' },
          { title: 'Selos Emitidos', value: '3.891', change: '+24%', color: '#a855f7' },
          { title: 'Taxa de Retenção', value: '78%', change: '-2%', color: '#f97316' },
        ].map(stat => (
          <div key={stat.title} style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            padding: '20px'
          }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              backgroundColor: stat.color, 
              borderRadius: '8px',
              marginBottom: '12px'
            }} />
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a' }}>{stat.value}</p>
            <p style={{ fontSize: '14px', color: '#64748b', marginTop: '4px' }}>{stat.title}</p>
            <p style={{ fontSize: '12px', color: '#22c55e', marginTop: '4px' }}>{stat.change}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PromotionsPage() {
  return (
    <div>
      <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#0f172a', marginBottom: '16px' }}>
        Componente Chave — Gestor de Promoções
      </h3>
      <p style={{ color: '#64748b', marginBottom: '24px' }}>
        Crie e publique promoções que aparecem no feed da app dos seus clientes.
      </p>
      
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        padding: '20px'
      }}>
        <p style={{ color: '#0f172a', fontWeight: '500' }}>
          ✅ Formulário completo para criar promoções
        </p>
        <p style={{ color: '#0f172a', fontWeight: '500', marginTop: '8px' }}>
          ✅ Seleção de tipo (Promoção, Notícia, Evento)
        </p>
        <p style={{ color: '#0f172a', fontWeight: '500', marginTop: '8px' }}>
          ✅ Pré-visualização em tempo real
        </p>
        <p style={{ color: '#0f172a', fontWeight: '500', marginTop: '8px' }}>
          ✅ Publicar/Despublicar com um clique
        </p>
      </div>
    </div>
  );
}

function LoyaltyPage() {
  return (
    <div>
      <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#0f172a', marginBottom: '16px' }}>
        Cartão de Fidelidade Digital
      </h3>
      <div style={{
        background: 'linear-gradient(to bottom right, #9333ea, #4338ca)',
        borderRadius: '16px',
        padding: '24px',
        color: 'white'
      }}>
        <h4 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>
          Compra 9, ganha 1 grátis 🎉
        </h4>
        <p style={{ color: '#e9d5ff' }}>
          Regra atual de fidelidade configurada para a sua app.
        </p>
      </div>
    </div>
  );
}

function CustomersPage() {
  return (
    <div>
      <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#0f172a', marginBottom: '16px' }}>
        Clientes Registados
      </h3>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        padding: '20px'
      }}>
        <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a' }}>1.247</p>
        <p style={{ color: '#64748b', marginTop: '4px' }}>Total de clientes na sua base de dados</p>
      </div>
    </div>
  );
}

function SchemaPage() {
  return (
    <div>
      <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#0f172a', marginBottom: '16px' }}>
        Schema SQL para Supabase
      </h3>
      <div style={{
        backgroundColor: '#0f172a',
        borderRadius: '12px',
        padding: '20px',
        color: '#4ade80',
        fontFamily: 'monospace',
        fontSize: '13px',
        overflowX: 'auto'
      }}>
        <pre>{`CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT NOT NULL UNIQUE,
  business_name TEXT NOT NULL,
  nif TEXT CHECK (nif ~ '^[0-9]{9}$'),
  business_type TEXT NOT NULL,
  ...
);

-- Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Comerciante vê o seu perfil"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);`}</pre>
      </div>
    </div>
  );
}

function StructurePage() {
  return (
    <div>
      <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#0f172a', marginBottom: '16px' }}>
        Estrutura do Projeto
      </h3>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        padding: '20px',
        fontFamily: 'monospace',
        fontSize: '14px'
      }}>
        <p>📁 lusaapp-builder/</p>
        <p style={{ paddingLeft: '20px' }}>📁 apps/</p>
        <p style={{ paddingLeft: '40px' }}>📁 web/ (Next.js 14)</p>
        <p style={{ paddingLeft: '40px' }}>📁 mobile/ (Expo)</p>
        <p style={{ paddingLeft: '20px' }}>📁 packages/</p>
        <p style={{ paddingLeft: '40px' }}>📁 shared/</p>
      </div>
    </div>
  );
}

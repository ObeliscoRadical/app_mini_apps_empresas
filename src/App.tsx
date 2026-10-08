import { useState } from 'react';

export default function App() {
  const [page, setPage] = useState('dashboard');

  const pages: Record<string, { title: string; subtitle: string }> = {
    dashboard: { title: 'Painel Geral', subtitle: 'Visão geral da sua app' },
    promotions: { title: 'Gestor de Promoções', subtitle: 'Crie e publique promoções' },
    loyalty: { title: 'Cartão de Fidelidade', subtitle: 'Configure o programa de fidelidade' },
    customers: { title: 'Clientes', subtitle: 'Gerir a base de clientes' },
    schema: { title: 'PASSO 1 — Schema SQL', subtitle: 'Base de dados Supabase com RLS' },
    structure: { title: 'PASSO 2 — Estrutura', subtitle: 'Arquitetura Next.js + Expo' },
  };

  const menu = [
    { id: 'dashboard', label: '📊 Painel Geral' },
    { id: 'promotions', label: '📢 Gestor de Promoções' },
    { id: 'loyalty', label: '⭐ Fidelidade' },
    { id: 'customers', label: '👥 Clientes' },
    { id: 'schema', label: '🗄️ Schema BD (SQL)' },
    { id: 'structure', label: '📁 Estrutura Projeto' },
  ];

  const s = {
    sidebar: { width: 256, background: '#0f172a', color: 'white', position: 'fixed' as const, left: 0, top: 0, bottom: 0, display: 'flex' as const, flexDirection: 'column' as const, zIndex: 50 },
    main: { marginLeft: 256, minHeight: '100vh', background: '#f8fafc' },
    header: { background: 'rgba(255,255,255,0.9)', borderBottom: '1px solid #e2e8f0', padding: '16px 24px', position: 'sticky' as const, top: 0, zIndex: 40 },
    content: { padding: 24 },
    navItem: (active: boolean) => ({ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer', marginBottom: 4, background: active ? 'rgba(22,163,74,0.2)' : 'transparent', color: active ? '#4ade80' : '#cbd5e1', border: active ? '1px solid rgba(22,163,74,0.3)' : '1px solid transparent', transition: 'all 0.2s' }),
    card: { background: 'white', borderRadius: 12, border: '1px solid #e2e8f0', padding: 20, marginBottom: 16 },
    statCard: { background: 'white', borderRadius: 12, border: '1px solid #e2e8f0', padding: 20 },
    btn: (bg: string, color: string) => ({ padding: '10px 16px', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer', border: 'none', background: bg, color, display: 'inline-flex', alignItems: 'center', gap: 8 }),
    badge: (bg: string, color: string) => ({ display: 'inline-block', padding: '2px 8px', borderRadius: 9999, fontSize: 12, fontWeight: 500, background: bg, color }),
    grid: (cols: number) => ({ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 16 }),
    gradient: (from: string, to: string) => ({ background: `linear-gradient(to right, ${from}, ${to})`, borderRadius: 16, padding: 24, color: 'white' }),
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* Sidebar */}
      <aside style={s.sidebar}>
        <div style={{ padding: 24, borderBottom: '1px solid #334155' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, background: 'linear-gradient(135deg, #4ade80, #ef4444)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: 14 }}>LA</div>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: 18 }}>LusaApp</div>
              <div style={{ fontSize: 12, color: '#94a3b8' }}>Builder MVP</div>
            </div>
          </div>
        </div>
        <nav style={{ flex: 1, padding: '16px 12px' }}>
          {menu.map(item => (
            <div key={item.id} style={s.navItem(page === item.id)} onClick={() => setPage(item.id)}>
              {item.label}
            </div>
          ))}
        </nav>
        <div style={{ padding: 16, borderTop: '1px solid #334155' }}>
          <div style={{ ...s.navItem(false), color: '#94a3b8' }}>⚙️ Definições</div>
          <div style={{ ...s.navItem(false), color: '#f87171' }}>🚪 Terminar Sessão</div>
        </div>
      </aside>

      {/* Main */}
      <div style={s.main}>
        <header style={s.header}>
          <h2 style={{ fontSize: 20, fontWeight: 'bold', color: '#0f172a' }}>{pages[page].title}</h2>
          <p style={{ fontSize: 14, color: '#64748b' }}>{pages[page].subtitle}</p>
        </header>

        <main style={s.content}>
          {/* DASHBOARD */}
          {page === 'dashboard' && (
            <div>
              <div style={s.gradient('#16a34a', '#047857')}>
                <h3 style={{ fontSize: 24, fontWeight: 'bold' }}>Bom dia, Pastelaria Minhota! 🥐</h3>
                <p style={{ color: '#bbf7d0', marginTop: 8 }}>Tem 8 promoções ativas e 1.247 clientes na sua app. Excelente trabalho!</p>
                <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
                  <button style={s.btn('rgba(255,255,255,0.2)', 'white')}>Criar Nova Promoção</button>
                  <button style={s.btn('rgba(255,255,255,0.1)', 'white')}>Ver Estatísticas</button>
                </div>
              </div>

              <div style={{ ...s.grid(4), marginTop: 24 }}>
                {[
                  { label: 'Clientes Ativos', value: '1.247', change: '+12%', color: '#3b82f6', up: true },
                  { label: 'Promoções Ativas', value: '8', change: '+3', color: '#22c55e', up: true },
                  { label: 'Selos Emitidos', value: '3.891', change: '+24%', color: '#a855f7', up: true },
                  { label: 'Taxa de Retenção', value: '78%', change: '-2%', color: '#f97316', up: false },
                ].map(stat => (
                  <div key={stat.label} style={s.statCard}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                      <div style={{ width: 40, height: 40, background: stat.color, borderRadius: 8 }} />
                      <span style={{ fontSize: 12, fontWeight: 500, color: stat.up ? '#22c55e' : '#ef4444' }}>{stat.change}</span>
                    </div>
                    <div style={{ fontSize: 24, fontWeight: 'bold', color: '#0f172a' }}>{stat.value}</div>
                    <div style={{ fontSize: 14, color: '#64748b', marginTop: 4 }}>{stat.label}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, marginTop: 24 }}>
                <div style={s.card}>
                  <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Atividade Recente</h4>
                  {[
                    { icon: '👤', action: 'Novo cliente registado', name: 'Maria Silva', time: 'Há 5 min' },
                    { icon: '⭐', action: 'Selo atribuído', name: 'João Santos', time: 'Há 12 min' },
                    { icon: '📢', action: 'Promoção publicada', name: 'Bolo Rei Especial', time: 'Há 1 hora' },
                    { icon: '🎁', action: 'Recompensa resgatada', name: 'Ana Costa', time: 'Há 2 horas' },
                  ].map((a, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 8, marginBottom: 4 }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>{a.icon}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 500, color: '#334155' }}>{a.action}</div>
                        <div style={{ fontSize: 12, color: '#94a3b8' }}>{a.name}</div>
                      </div>
                      <span style={{ fontSize: 12, color: '#94a3b8' }}>{a.time}</span>
                    </div>
                  ))}
                </div>
                <div style={s.card}>
                  <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Ações Rápidas</h4>
                  {['📢 Nova Promoção', '⭐ Configurar Fidelidade', '📱 Ver App do Cliente', '💬 Enviar Mensagem'].map(action => (
                    <div key={action} style={{ padding: 12, borderRadius: 8, border: '1px solid #e2e8f0', marginBottom: 8, cursor: 'pointer' }}>
                      <div style={{ fontSize: 14, fontWeight: 500, color: '#334155' }}>{action}</div>
                    </div>
                  ))}
                  <div style={{ padding: 12, borderRadius: 8, background: '#fef3c7', border: '1px solid #fde68a', marginTop: 12 }}>
                    <div style={{ fontSize: 12, fontWeight: 500, color: '#92400e' }}>🇵🇹 Aviso RGPD</div>
                    <div style={{ fontSize: 11, color: '#b45309', marginTop: 4 }}>Dados em conformidade com o RGPD.</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PROMOTIONS */}
          {page === 'promotions' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 600 }}>Todas as Publicações</h3>
                  <p style={{ fontSize: 14, color: '#64748b' }}>3 publicações no total</p>
                </div>
                <button style={s.btn('#16a34a', 'white')}>+ Nova Publicação</button>
              </div>

              {[
                { type: 'promocao', title: 'Bolo Rei Tradicional — 20% Desconto', desc: 'Este Natal, celebre connosco! Bolo Rei feito à mão com frutos secos premium.', published: true, created: '2024-12-01', expires: '2024-12-31' },
                { type: 'noticia', title: 'Novos Pastéis de Nata Sem Glúten', desc: 'Já experimentou os nossos novos pastéis de nata sem glúten? Receita artesanal.', published: true, created: '2024-11-28', expires: null },
                { type: 'evento', title: 'Workshop de Confeitaria — Janeiro 2025', desc: 'Aprenda a fazer os nossos famosos travesseiros de Sintra. Vagas limitadas!', published: false, created: '2024-11-25', expires: '2025-01-15' },
              ].map((post, i) => {
                const typeMap: Record<string, { label: string; bg: string; color: string; emoji: string }> = {
                  promocao: { label: 'Promoção', bg: '#dcfce7', color: '#15803d', emoji: '🏷️' },
                  noticia: { label: 'Notícia', bg: '#dbeafe', color: '#1e40af', emoji: '📰' },
                  evento: { label: 'Evento', bg: '#f3e8ff', color: '#6b21a8', emoji: '📅' },
                };
                const t = typeMap[post.type];
                return (
                  <div key={i} style={s.card}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                          <span style={s.badge(t.bg, t.color)}>{t.emoji} {t.label}</span>
                          <span style={s.badge(post.published ? '#d1fae5' : '#f1f5f9', post.published ? '#065f46' : '#64748b')}>
                            {post.published ? '✓ Publicada' : 'Rascunho'}
                          </span>
                        </div>
                        <h4 style={{ fontSize: 16, fontWeight: 600, color: '#0f172a' }}>{post.title}</h4>
                        <p style={{ fontSize: 14, color: '#64748b', marginTop: 4 }}>{post.desc}</p>
                        <div style={{ display: 'flex', gap: 16, marginTop: 12, fontSize: 12, color: '#94a3b8' }}>
                          <span>📅 Criado: {post.created}</span>
                          {post.expires && <span>🏷️ Expira: {post.expires}</span>}
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: 4 }}>
                        <button style={{ padding: 8, borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer', color: '#3b82f6' }}>✏️</button>
                        <button style={{ padding: 8, borderRadius: 8, border: 'none', background: 'transparent', cursor: 'pointer', color: '#ef4444' }}>🗑️</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* LOYALTY */}
          {page === 'loyalty' && (
            <div>
              <div style={s.gradient('#9333ea', '#4338ca')}>
                <h3 style={{ fontSize: 20, fontWeight: 'bold' }}>⭐ Cartão de Fidelidade Digital</h3>
                <p style={{ color: '#e9d5ff', marginTop: 8 }}>Configure a regra de fidelidade que aparece na app dos seus clientes.</p>
                <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 12, padding: 16, marginTop: 16 }}>
                  <p style={{ fontSize: 14, color: '#e9d5ff' }}>Regra Atual:</p>
                  <p style={{ fontSize: 24, fontWeight: 'bold', marginTop: 4 }}>Compra 9, ganha 1 grátis 🎉</p>
                </div>
              </div>

              <div style={{ ...s.grid(2), marginTop: 24 }}>
                <div style={s.card}>
                  <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>⭐ Configuração dos Selos</h4>
                  {[['Selos por compra', '1'], ['Selos necessários', '9'], ['Recompensa', '1 Produto Grátis'], ['Validade', 'Sem expiração']].map(([l, v]) => (
                    <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: 12, background: '#f8fafc', borderRadius: 8, marginBottom: 8 }}>
                      <span style={{ fontSize: 14, color: '#64748b' }}>{l}</span>
                      <span style={{ fontWeight: 'bold', color: '#0f172a' }}>{v}</span>
                    </div>
                  ))}
                </div>
                <div style={s.card}>
                  <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>🎁 Estatísticas</h4>
                  <div style={{ padding: 12, background: '#f0fdf4', borderRadius: 8, marginBottom: 8 }}>
                    <div style={{ fontSize: 24, fontWeight: 'bold', color: '#15803d' }}>342</div>
                    <div style={{ fontSize: 14, color: '#16a34a' }}>Recompensas resgatadas</div>
                  </div>
                  <div style={{ padding: 12, background: '#eff6ff', borderRadius: 8, marginBottom: 8 }}>
                    <div style={{ fontSize: 24, fontWeight: 'bold', color: '#1e40af' }}>67%</div>
                    <div style={{ fontSize: 14, color: '#2563eb' }}>Clientes que completaram</div>
                  </div>
                  <div style={{ padding: 12, background: '#faf5ff', borderRadius: 8 }}>
                    <div style={{ fontSize: 24, fontWeight: 'bold', color: '#6b21a8' }}>4.2</div>
                    <div style={{ fontSize: 14, color: '#7c3aed' }}>Média de selos/cliente</div>
                  </div>
                </div>
              </div>

              <div style={{ ...s.card, marginTop: 24, textAlign: 'center' as const }}>
                <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Pré-visualização do Cartão (App do Cliente)</h4>
                <div style={{ width: 288, margin: '0 auto', background: 'linear-gradient(135deg, #fbbf24, #f97316)', borderRadius: 16, padding: 20, color: 'white', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
                  <div style={{ textAlign: 'center', marginBottom: 16 }}>
                    <p style={{ fontSize: 12, opacity: 0.8 }}>Pastelaria Minhota</p>
                    <p style={{ fontSize: 18, fontWeight: 'bold' }}>Cartão de Fidelidade</p>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, marginBottom: 16 }}>
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div key={i} style={{ width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, background: i < 6 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.2)', color: i < 6 ? '#ea580c' : 'rgba(255,255,255,0.5)' }}>
                        {i < 6 ? '⭐' : '○'}
                      </div>
                    ))}
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: 14, fontWeight: 500 }}>6 de 9 selos</p>
                    <p style={{ fontSize: 12, opacity: 0.8 }}>Faltam 3 para a recompensa!</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CUSTOMERS */}
          {page === 'customers' && (
            <div>
              <div style={{ ...s.grid(3), marginBottom: 24 }}>
                {[['Total de Clientes', '1.247', '+23 esta semana'], ['Clientes Ativos (30d)', '892', '71.5% do total'], ['Novos Registos (Mês)', '156', '+18% vs anterior']].map(([l, v, c]) => (
                  <div key={l} style={s.card}>
                    <div style={{ fontSize: 14, color: '#64748b' }}>{l}</div>
                    <div style={{ fontSize: 24, fontWeight: 'bold', color: '#0f172a', marginTop: 4 }}>{v}</div>
                    <div style={{ fontSize: 12, color: '#22c55e', marginTop: 4 }}>{c}</div>
                  </div>
                ))}
              </div>

              <div style={{ ...s.card, padding: 0, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                      {['Cliente', 'Contacto', 'Selos', 'Visitas', 'Última Visita'].map(h => (
                        <th key={h} style={{ textAlign: 'left', padding: '12px 20px', fontSize: 12, fontWeight: 500, color: '#64748b', textTransform: 'uppercase' as const }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Maria Silva', email: 'maria@email.pt', phone: '+351 912 345 678', stamps: 7, visits: 23, last: '2024-12-10' },
                      { name: 'João Santos', email: 'joao@email.pt', phone: '+351 923 456 789', stamps: 3, visits: 12, last: '2024-12-09' },
                      { name: 'Ana Costa', email: 'ana@email.pt', phone: '+351 934 567 890', stamps: 9, visits: 34, last: '2024-12-10' },
                      { name: 'Pedro Ferreira', email: 'pedro@email.pt', phone: '+351 945 678 901', stamps: 1, visits: 3, last: '2024-12-08' },
                      { name: 'Sofia Rodrigues', email: 'sofia@email.pt', phone: '+351 956 789 012', stamps: 5, visits: 18, last: '2024-12-10' },
                    ].map((c, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '12px 20px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg, #4ade80, #10b981)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 12, fontWeight: 'bold' }}>
                              {c.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <div style={{ fontWeight: 500, color: '#0f172a' }}>{c.name}</div>
                              <div style={{ fontSize: 12, color: '#94a3b8' }}>{c.email}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '12px 20px', fontSize: 14, color: '#64748b' }}>{c.phone}</td>
                        <td style={{ padding: '12px 20px', textAlign: 'center' }}>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                            <span style={{ color: '#eab308' }}>⭐</span>
                            <span style={{ fontWeight: 500 }}>{c.stamps}/9</span>
                          </span>
                        </td>
                        <td style={{ padding: '12px 20px', textAlign: 'center', fontSize: 14, color: '#64748b' }}>{c.visits}</td>
                        <td style={{ padding: '12px 20px', fontSize: 14, color: '#64748b' }}>{c.last}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ padding: 16, borderRadius: 12, background: '#fef3c7', border: '1px solid #fde68a', marginTop: 16 }}>
                <p style={{ fontSize: 14, fontWeight: 500, color: '#92400e' }}>🇵🇹 Conformidade RGPD</p>
                <p style={{ fontSize: 12, color: '#b45309', marginTop: 4 }}>Todos os dados pessoais são armazenados em conformidade com o RGPD. Consentimentos registados.</p>
              </div>
            </div>
          )}

          {/* SCHEMA */}
          {page === 'schema' && (
            <div>
              <div style={{ ...s.grid(5), marginBottom: 24 }}>
                {[
                  { icon: '👤', name: 'profiles', desc: 'Comerciantes' },
                  { icon: '⚙️', name: 'apps_config', desc: 'Config App' },
                  { icon: '📢', name: 'posts', desc: 'Promoções' },
                  { icon: '🛒', name: 'customers', desc: 'Clientes' },
                  { icon: '⭐', name: 'loyalty_tx', desc: 'Transações' },
                ].map(t => (
                  <div key={t.name} style={s.card}>
                    <span style={{ fontSize: 20 }}>{t.icon}</span>
                    <div style={{ fontSize: 12, fontFamily: 'monospace', fontWeight: 'bold', color: '#0f172a', marginTop: 4 }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: '#64748b' }}>{t.desc}</div>
                  </div>
                ))}
              </div>

              <div style={{ padding: 16, borderRadius: 12, background: '#dbeafe', border: '1px solid #bfdbfe', display: 'flex', gap: 12, marginBottom: 24 }}>
                <span style={{ fontSize: 20 }}>🛡️</span>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 500, color: '#1e40af' }}>Row Level Security (RLS) Ativo</p>
                  <p style={{ fontSize: 12, color: '#1e3a8a', marginTop: 4 }}>Cada comerciante apenas acede aos seus próprios dados.</p>
                </div>
              </div>

              <div style={{ borderRadius: 12, overflow: 'hidden', background: '#0f172a' }}>
                <div style={{ padding: '8px 16px', background: '#1e293b', borderBottom: '1px solid #334155' }}>
                  <span style={{ fontSize: 12, fontFamily: 'monospace', color: '#94a3b8' }}>schema.sql</span>
                </div>
                <pre style={{ padding: 16, overflow: 'auto', fontSize: 13, lineHeight: 1.6, color: '#4ade80', fontFamily: 'monospace', margin: 0 }}>{`-- LusaApp Builder — Schema SQL (Supabase/PostgreSQL)
-- Tabelas: profiles, apps_config, posts, customers, loyalty_transactions

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  business_name TEXT NOT NULL,
  nif TEXT CHECK (nif ~ '^[0-9]{9}$'),  -- NIF português: 9 dígitos
  business_type TEXT CHECK (business_type IN ('restauracao','beleza','retalho','servicos')),
  phone TEXT,
  postal_code TEXT CHECK (postal_code ~ '^[0-9]{4}-[0-9]{3}$'),  -- Formato PT
  city TEXT, logo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.apps_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  app_name TEXT NOT NULL,
  template TEXT NOT NULL,
  primary_color TEXT DEFAULT '#16a34a',
  loyalty_enabled BOOLEAN DEFAULT true,
  loyalty_stamps_needed INTEGER DEFAULT 9,
  whatsapp_number TEXT, phone_number TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  post_type TEXT CHECK (post_type IN ('promocao','noticia','evento')),
  published BOOLEAN DEFAULT false,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  merchant_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  phone TEXT, email TEXT,
  first_name TEXT, last_name TEXT,
  loyalty_stamps INTEGER DEFAULT 0,
  total_visits INTEGER DEFAULT 0,
  rgpd_consent BOOLEAN DEFAULT false,
  rgpd_consent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.loyalty_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE,
  merchant_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  stamps_added INTEGER DEFAULT 0,
  stamps_removed INTEGER DEFAULT 0,
  reason TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loyalty_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "merchant_own_profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "merchant_own_posts" ON public.posts
  FOR ALL USING (merchant_id = auth.uid());

CREATE POLICY "merchant_own_customers" ON public.customers
  FOR ALL USING (merchant_id = auth.uid());`}</pre>
              </div>
            </div>
          )}

          {/* STRUCTURE */}
          {page === 'structure' && (
            <div>
              <div style={{ ...s.grid(3), marginBottom: 24 }}>
                <div style={{ ...s.card, background: '#dbeafe', borderColor: '#bfdbfe' }}>
                  <h4 style={{ color: '#1e40af', fontSize: 16, fontWeight: 600 }}>🌐 Dashboard</h4>
                  <p style={{ fontSize: 12, color: '#1e3a8a', marginTop: 4 }}>Next.js 14 + Tailwind + shadcn/ui</p>
                  <p style={{ fontSize: 11, color: '#3b82f6', marginTop: 2 }}>Hospedado na Vercel</p>
                </div>
                <div style={{ ...s.card, background: '#dcfce7', borderColor: '#bbf7d0' }}>
                  <h4 style={{ color: '#15803d', fontSize: 16, fontWeight: 600 }}>📱 App Mobile</h4>
                  <p style={{ fontSize: 12, color: '#14532d', marginTop: 4 }}>React Native + Expo</p>
                  <p style={{ fontSize: 11, color: '#16a34a', marginTop: 2 }}>Builds via EAS (iOS/Android/PWA)</p>
                </div>
                <div style={{ ...s.card, background: '#f3e8ff', borderColor: '#e9d5ff' }}>
                  <h4 style={{ color: '#6b21a8', fontSize: 16, fontWeight: 600 }}>🖥️ Backend</h4>
                  <p style={{ fontSize: 12, color: '#581c87', marginTop: 4 }}>Supabase (PostgreSQL + Auth + Storage)</p>
                  <p style={{ fontSize: 11, color: '#7c3aed', marginTop: 2 }}>Edge Functions para lógica custom</p>
                </div>
              </div>

              <div style={s.card}>
                <h4 style={{ fontSize: 14, fontWeight: 600, color: '#1e40af', background: '#dbeafe', padding: 12, borderRadius: 8, margin: '-20px -20px 20px -20px', borderBottom: '1px solid #bfdbfe' }}>📁 apps/web/ — Dashboard (Next.js 14)</h4>
                <div style={{ fontFamily: 'monospace', fontSize: 14, lineHeight: 1.8 }}>
                  <p>📁 app/</p>
                  <p style={{ paddingLeft: 20 }}>📁 (auth)/</p>
                  <p style={{ paddingLeft: 40 }}>📄 login/page.tsx</p>
                  <p style={{ paddingLeft: 40 }}>📄 register/page.tsx</p>
                  <p style={{ paddingLeft: 20 }}>📁 (dashboard)/</p>
                  <p style={{ paddingLeft: 40 }}>📄 layout.tsx <span style={{ color: '#94a3b8' }}>— Sidebar + Header</span></p>
                  <p style={{ paddingLeft: 40 }}>📄 page.tsx <span style={{ color: '#94a3b8' }}>— Painel Geral</span></p>
                  <p style={{ paddingLeft: 40 }}>📁 promocoes/page.tsx <span style={{ color: '#94a3b8' }}>— Gestor ★</span></p>
                  <p style={{ paddingLeft: 40 }}>📁 fidelidade/page.tsx</p>
                  <p style={{ paddingLeft: 40 }}>📁 clientes/page.tsx</p>
                  <p>📁 components/</p>
                  <p style={{ paddingLeft: 20 }}>📄 promotion-form.tsx</p>
                  <p style={{ paddingLeft: 20 }}>📄 loyalty-config.tsx</p>
                  <p style={{ paddingLeft: 20 }}>📄 customer-table.tsx</p>
                  <p>📁 lib/supabase/</p>
                  <p style={{ paddingLeft: 20 }}>📄 client.ts <span style={{ color: '#94a3b8' }}>— Browser</span></p>
                  <p style={{ paddingLeft: 20 }}>📄 server.ts <span style={{ color: '#94a3b8' }}>— Server-side</span></p>
                </div>
              </div>

              <div style={s.card}>
                <h4 style={{ fontSize: 14, fontWeight: 600, color: '#15803d', background: '#dcfce7', padding: 12, borderRadius: 8, margin: '-20px -20px 20px -20px', borderBottom: '1px solid #bbf7d0' }}>📁 apps/mobile/ — App Cliente (Expo)</h4>
                <div style={{ fontFamily: 'monospace', fontSize: 14, lineHeight: 1.8 }}>
                  <p>📁 app/ <span style={{ color: '#94a3b8' }}>— Expo Router</span></p>
                  <p style={{ paddingLeft: 20 }}>📄 index.tsx <span style={{ color: '#94a3b8' }}>— Feed Promoções</span></p>
                  <p style={{ paddingLeft: 20 }}>📄 login.tsx</p>
                  <p style={{ paddingLeft: 20 }}>📄 fidelidade.tsx <span style={{ color: '#94a3b8' }}>— Cartão + QR</span></p>
                  <p>📁 components/</p>
                  <p style={{ paddingLeft: 20 }}>📄 PromotionCard.tsx</p>
                  <p style={{ paddingLeft: 20 }}>📄 LoyaltyCard.tsx</p>
                  <p style={{ paddingLeft: 20 }}>📄 QRScanner.tsx</p>
                  <p style={{ paddingLeft: 20 }}>📄 RGPDConsent.tsx</p>
                  <p>📁 services/</p>
                  <p style={{ paddingLeft: 20 }}>📄 supabase.ts</p>
                  <p style={{ paddingLeft: 20 }}>📄 notifications.ts</p>
                  <p style={{ paddingLeft: 20 }}>📄 payments.ts <span style={{ color: '#94a3b8' }}>— Stripe/MB Way</span></p>
                </div>
              </div>

              <div style={s.card}>
                <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>🛠️ Stack Tecnológica</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {[
                    { title: 'Frontend', color: '#1e40af', items: ['Next.js 14 (App Router)', 'React 18 + TypeScript', 'Tailwind CSS + shadcn/ui', 'TanStack Query'] },
                    { title: 'Mobile', color: '#15803d', items: ['React Native + Expo SDK 50+', 'Expo Router', 'Push Notifications', 'expo-camera (QR)'] },
                    { title: 'Backend', color: '#6b21a8', items: ['Supabase (PostgreSQL)', 'Supabase Auth + Storage', 'Edge Functions (Deno)', 'Vercel + EAS Build'] },
                    { title: 'Portugal', color: '#c2410c', items: ['Stripe + IfthenPay (MB Way)', 'WhatsApp Business API', 'RGPD nativo', 'NIF + Código Postal PT'] },
                  ].map(section => (
                    <div key={section.title}>
                      <h5 style={{ fontSize: 14, fontWeight: 500, color: section.color, marginBottom: 8 }}>{section.title}</h5>
                      <ul style={{ listStyle: 'none', fontSize: 12, color: '#64748b', padding: 0 }}>
                        {section.items.map(item => <li key={item} style={{ marginBottom: 4 }}>• {item}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

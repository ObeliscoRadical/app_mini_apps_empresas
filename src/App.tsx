import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardPage from './pages/Dashboard';
import PromotionsPage from './pages/Promotions';
import LoyaltyPage from './pages/Loyalty';
import CustomersPage from './pages/Customers';
import SchemaPage from './pages/Schema';
import StructurePage from './pages/Structure';

/**
 * LusaApp Builder — MVP Dashboard
 * Plataforma SaaS para PMEs Portuguesas
 * 
 * Arquitetura:
 * - Dashboard do Comerciante (este componente)
 * - Schema SQL do Supabase (documentado na app)
 * - Estrutura do Projeto (documentada na app)
 * - Gestor de Promoções (componente chave funcional)
 */

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      {/* Sidebar - Desktop */}
      <div className="hidden lg:block">
        <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative w-64 h-full">
            <Sidebar 
              currentPage={currentPage} 
              onNavigate={(page) => {
                setCurrentPage(page);
                setMobileMenuOpen(false);
              }} 
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="lg:ml-64">
        <Header 
          title={config.title} 
          subtitle={config.subtitle}
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        />
        <main className="min-h-[calc(100vh-73px)]">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

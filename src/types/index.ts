/**
 * LusaApp Builder — Tipos TypeScript
 * Definições de dados alinhadas com o schema SQL do Supabase
 */

// Perfil do Comerciante (tabela: profiles)
export interface MerchantProfile {
  id: string;
  email: string;
  business_name: string;
  nif?: string; // NIF português (9 dígitos)
  business_type: 'restauracao' | 'beleza' | 'retalho' | 'servicos';
  phone?: string;
  address?: string;
  postal_code?: string;
  city?: string;
  logo_url?: string;
  created_at: string;
  updated_at: string;
}

// Configuração da App do Comerciante (tabela: apps_config)
export interface AppConfig {
  id: string;
  merchant_id: string;
  app_name: string;
  primary_color: string;
  secondary_color: string;
  template: 'restauracao' | 'beleza' | 'retalho' | 'servicos';
  loyalty_enabled: boolean;
  loyalty_rule: string; // ex: "Compra 9, ganha 1 grátis"
  loyalty_stamps_needed: number;
  whatsapp_number?: string;
  phone_number?: string;
  created_at: string;
  updated_at: string;
}

// Post/Promoção (tabela: posts)
export interface Post {
  id: string;
  merchant_id: string;
  title: string;
  description: string;
  image_url?: string;
  post_type: 'promocao' | 'noticia' | 'evento';
  published: boolean;
  expires_at?: string;
  created_at: string;
  updated_at: string;
}

// Cliente Final (tabela: customers)
export interface Customer {
  id: string;
  merchant_id: string;
  phone?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  loyalty_stamps: number;
  total_visits: number;
  created_at: string;
  last_visit_at?: string;
}

// Transação de Fidelidade (tabela: loyalty_transactions)
export interface LoyaltyTransaction {
  id: string;
  customer_id: string;
  merchant_id: string;
  stamps_added: number;
  stamps_removed: number; // quando resgata recompensa
  reason: string;
  created_at: string;
}

// Tipos para o formulário de promoção
export interface PromotionFormData {
  title: string;
  description: string;
  image_url: string;
  post_type: 'promocao' | 'noticia' | 'evento';
  expires_at: string;
  published: boolean;
}

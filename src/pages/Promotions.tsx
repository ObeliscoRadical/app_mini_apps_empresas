import { useState } from 'react';
import { Plus, Edit3, Trash2, Eye, EyeOff, Calendar, Image, Tag, X, Check } from 'lucide-react';
import type { Post, PromotionFormData } from '../types';

/**
 * Gestor de Promoções — Componente Principal
 * Permite criar, editar, publicar e eliminar promoções/notícias
 * que aparecem no feed da app do cliente final.
 */
export default function PromotionsPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [filter, setFilter] = useState<'all' | 'promocao' | 'noticia' | 'evento'>('all');

  // Dados de demonstração (em produção viriam do Supabase)
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      merchant_id: 'demo',
      title: 'Bolo Rei Tradicional — 20% Desconto',
      description: 'Este Natal, celebre connosco! Bolo Rei feito à mão com frutos secos premium. Válido até 31 de dezembro.',
      image_url: '',
      post_type: 'promocao',
      published: true,
      expires_at: '2024-12-31',
      created_at: '2024-12-01',
      updated_at: '2024-12-01',
    },
    {
      id: '2',
      merchant_id: 'demo',
      title: 'Novos Pastéis de Nata Sem Glúten',
      description: 'Já experimentou os nossos novos pastéis de nata sem glúten? Receita artesanal com o mesmo sabor de sempre.',
      image_url: '',
      post_type: 'noticia',
      published: true,
      expires_at: undefined,
      created_at: '2024-11-28',
      updated_at: '2024-11-28',
    },
    {
      id: '3',
      merchant_id: 'demo',
      title: 'Workshop de Confeitaria — Janeiro 2025',
      description: 'Aprenda a fazer os nossos famosos travesseiros de Sintra. Inscreva-se na app! Vagas limitadas.',
      image_url: '',
      post_type: 'evento',
      published: false,
      expires_at: '2025-01-15',
      created_at: '2024-11-25',
      updated_at: '2024-11-25',
    },
  ]);

  // Formulário
  const [formData, setFormData] = useState<PromotionFormData>({
    title: '',
    description: '',
    image_url: '',
    post_type: 'promocao',
    expires_at: '',
    published: true,
  });

  const filteredPosts = filter === 'all' ? posts : posts.filter(p => p.post_type === filter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingPost) {
      // Editar post existente
      setPosts(prev => prev.map(p => 
        p.id === editingPost.id 
          ? { ...p, ...formData, updated_at: new Date().toISOString() }
          : p
      ));
    } else {
      // Criar novo post
      const newPost: Post = {
        id: Date.now().toString(),
        merchant_id: 'demo',
        ...formData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setPosts(prev => [newPost, ...prev]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image_url: '',
      post_type: 'promocao',
      expires_at: '',
      published: true,
    });
    setShowForm(false);
    setEditingPost(null);
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      description: post.description,
      image_url: post.image_url || '',
      post_type: post.post_type,
      expires_at: post.expires_at || '',
      published: post.published,
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  const togglePublish = (id: string) => {
    setPosts(prev => prev.map(p => 
      p.id === id ? { ...p, published: !p.published, updated_at: new Date().toISOString() } : p
    ));
  };

  const getPostTypeLabel = (type: string) => {
    switch (type) {
      case 'promocao': return { label: 'Promoção', color: 'bg-green-100 text-green-700', emoji: '🏷️' };
      case 'noticia': return { label: 'Notícia', color: 'bg-blue-100 text-blue-700', emoji: '📰' };
      case 'evento': return { label: 'Evento', color: 'bg-purple-100 text-purple-700', emoji: '📅' };
      default: return { label: type, color: 'bg-slate-100 text-slate-700', emoji: '📌' };
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header com ação principal */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Todas as Publicações</h3>
          <p className="text-sm text-slate-500">{posts.length} publicações no total</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg font-medium text-sm transition-colors shadow-sm"
        >
          <Plus size={18} />
          Nova Publicação
        </button>
      </div>

      {/* Filtros */}
      <div className="flex gap-2 flex-wrap">
        {[
          { id: 'all', label: 'Todas' },
          { id: 'promocao', label: '🏷️ Promoções' },
          { id: 'noticia', label: '📰 Notícias' },
          { id: 'evento', label: '📅 Eventos' },
        ].map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id as typeof filter)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              filter === f.id
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Lista de Posts */}
      <div className="grid gap-4">
        {filteredPosts.map((post) => {
          const typeInfo = getPostTypeLabel(post.post_type);
          return (
            <div
              key={post.id}
              className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeInfo.color}`}>
                      {typeInfo.emoji} {typeInfo.label}
                    </span>
                    {post.published ? (
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                        ✓ Publicada
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-500">
                        Rascunho
                      </span>
                    )}
                  </div>
                  <h4 className="font-semibold text-slate-900 text-base">{post.title}</h4>
                  <p className="text-sm text-slate-500 mt-1 line-clamp-2">{post.description}</p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      Criado: {new Date(post.created_at).toLocaleDateString('pt-PT')}
                    </span>
                    {post.expires_at && (
                      <span className="flex items-center gap-1">
                        <Tag size={12} />
                        Expira: {new Date(post.expires_at).toLocaleDateString('pt-PT')}
                      </span>
                    )}
                  </div>
                </div>

                {/* Ações */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => togglePublish(post.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      post.published 
                        ? 'hover:bg-orange-50 text-orange-500' 
                        : 'hover:bg-green-50 text-green-500'
                    }`}
                    title={post.published ? 'Despublicar' : 'Publicar'}
                  >
                    {post.published ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  <button
                    onClick={() => handleEdit(post)}
                    className="p-2 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"
                    title="Editar"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                    title="Eliminar"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-400 text-lg">Sem publicações neste filtro</p>
          <p className="text-slate-300 text-sm mt-1">Crie a sua primeira promoção!</p>
        </div>
      )}

      {/* Modal do Formulário */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900">
                {editingPost ? 'Editar Publicação' : 'Nova Publicação'}
              </h3>
              <button
                onClick={resetForm}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              {/* Tipo de Publicação */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Tipo de Publicação
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'promocao', label: '🏷️ Promoção' },
                    { value: 'noticia', label: '📰 Notícia' },
                    { value: 'evento', label: '📅 Evento' },
                  ].map(type => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, post_type: type.value as PromotionFormData['post_type'] }))}
                      className={`p-2.5 rounded-lg border-2 text-sm font-medium transition-all ${
                        formData.post_type === type.value
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-slate-200 hover:border-slate-300 text-slate-600'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Título */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Título *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Ex: 20% desconto em todos os bolos"
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder:text-slate-400"
                />
              </div>

              {/* Descrição */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Descrição *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Descreva a sua promoção ou notícia de forma clara e apelativa..."
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none placeholder:text-slate-400"
                />
                <p className="text-xs text-slate-400 mt-1">
                  {formData.description.length}/280 caracteres
                </p>
              </div>

              {/* URL da Imagem */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Image size={14} />
                    URL da Imagem (opcional)
                  </span>
                </label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                  placeholder="https://exemplo.com/imagem.jpg"
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder:text-slate-400"
                />
                <p className="text-xs text-slate-400 mt-1">
                  A imagem será armazenada no Supabase Storage
                </p>
              </div>

              {/* Data de Validade */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    Data de Validade (opcional)
                  </span>
                </label>
                <input
                  type="date"
                  value={formData.expires_at}
                  onChange={(e) => setFormData(prev => ({ ...prev, expires_at: e.target.value }))}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-slate-700"
                />
                <p className="text-xs text-slate-400 mt-1">
                  A publicação deixa de aparecer na app após esta data
                </p>
              </div>

              {/* Publicar imediatamente */}
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, published: !prev.published }))}
                  className={`relative w-10 h-6 rounded-full transition-colors ${
                    formData.published ? 'bg-green-500' : 'bg-slate-300'
                  }`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow-sm ${
                    formData.published ? 'translate-x-4' : 'translate-x-0'
                  }`} />
                </button>
                <div>
                  <p className="text-sm font-medium text-slate-700">
                    {formData.published ? 'Publicar imediatamente' : 'Guardar como rascunho'}
                  </p>
                  <p className="text-xs text-slate-400">
                    {formData.published 
                      ? 'Visível para todos os clientes na app' 
                      : 'Apenas visível para si no dashboard'}
                  </p>
                </div>
              </div>

              {/* Preview */}
              {formData.title && (
                <div className="p-3 border border-dashed border-slate-300 rounded-lg bg-slate-50">
                  <p className="text-xs font-medium text-slate-500 mb-1">Pré-visualização na app:</p>
                  <div className="bg-white rounded-lg p-3 border border-slate-200">
                    <p className="font-semibold text-sm text-slate-900">{formData.title}</p>
                    {formData.description && (
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{formData.description}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Botões de Ação */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
                >
                  <Check size={16} />
                  {editingPost ? 'Guardar Alterações' : 'Criar Publicação'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

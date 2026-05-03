import React, { useState } from 'react';
import { Search, ArrowLeft, ArrowUpRight, SlidersHorizontal } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logoPisos from '../assets/logopisos.svg';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  isPremium?: boolean;
  isPopular?: boolean;
  description: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Piso de Carvalho Europeu",
    category: "Pisos de Madeira",
    price: 289.90,
    image: "https://images.unsplash.com/photo-1581850518616-bcb8188c4436?q=80&w=800&auto=format&fit=crop",
    isPremium: true,
    isPopular: true,
    description: "Carvalho selecionado das florestas europeias, acabamento natural acetinado."
  },
  {
    id: 2,
    name: "Revestimento Cerâmico 3D",
    category: "Cerâmica",
    price: 85.90,
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&auto=format&fit=crop",
    isPremium: true,
    description: "Texturas tridimensionais de alta definição para paredes de impacto visual."
  },
  {
    id: 3,
    name: "Mármore Carrara Italiano",
    category: "Mármore",
    price: 450.00,
    image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=800&auto=format&fit=crop",
    isPremium: true,
    isPopular: true,
    description: "Legítimo Carrara das pedreiras de Massa-Carrara, veios únicos e exclusivos."
  },
  {
    id: 4,
    name: "Porcelanato Gray Concrete",
    category: "Porcelanato",
    price: 159.00,
    image: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=800&auto=format&fit=crop",
    isPremium: false,
    description: "Estética industrial urbana, alta resistência e baixa absorção."
  },
  {
    id: 5,
    name: "Piso Vinílico Premium",
    category: "Vinílico",
    price: 119.90,
    image: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=800&auto=format&fit=crop",
    isPopular: true,
    description: "Conforto acústico e térmico, perfeito para ambientes residenciais modernos."
  },
  {
    id: 6,
    name: "Piso de Nogueira Negra",
    category: "Pisos de Madeira",
    price: 345.00,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop",
    isPremium: true,
    description: "Madeira de nogueira americana, cor profunda e charme atemporal."
  },
  {
    id: 7,
    name: "Travertino Romano Clássico",
    category: "Mármore",
    price: 320.00,
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=800&auto=format&fit=crop",
    isPremium: true,
    description: "Travertino das minas de Tivoli, acabamento escovado rústico-luxo."
  },
  {
    id: 8,
    name: "Porcelanato Calacatta Gold",
    category: "Porcelanato",
    price: 275.00,
    image: "https://images.unsplash.com/photo-1578500351865-d6c3706f46bc?q=80&w=800&auto=format&fit=crop",
    isPremium: true,
    isPopular: true,
    description: "Réplica de alta fidelidade do mármore Calacatta com veios dourados."
  },
  {
    id: 9,
    name: "Bambu Carbonizado Premium",
    category: "Pisos de Madeira",
    price: 195.00,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop",
    description: "Sustentável e durável, bambu carbonizado para ambientes minimalistas."
  },
];

const categories = ["Todos", "Pisos de Madeira", "Cerâmica", "Porcelanato", "Mármore", "Vinílico"];

const ProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === "Todos" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="products-page">
      {/* Navigation */}
      <nav className="products-nav">
        <div className="products-nav-inner container">
          <button onClick={() => navigate('/')} className="pp-back-btn">
            <ArrowLeft size={18} />
            <span>Voltar</span>
          </button>
          <div className="pp-nav-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <img src={logoPisos} alt="Boa Vista Pisos" style={{ height: '48px', width: 'auto' }} />
          </div>
          <div className="pp-nav-right">
            <span className="pp-nav-tag">COLEÇÃO COMPLETA</span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="products-hero">
        <div className="products-hero-bg">
          <img
            src="https://images.unsplash.com/photo-1588854337236-6889d631faa8?q=80&w=1600&auto=format&fit=crop"
            alt="Pisos Premium"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}
          />
          <div className="products-hero-gradient" />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="products-hero-content">
            <p className="pp-eyebrow">BOA VISTA PISOS — COLEÇÃO 2026</p>
            <h1 className="pp-hero-title">
              Coleção<br />
              <span className="orange-text italic">Exclusiva</span>
            </h1>
            <p className="pp-hero-sub">
              {products.length} produtos selecionados. Do minimalismo ao luxo absoluto.
            </p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="pp-controls-bar container page-reveal">
        <div className="pp-search-wrap">
          <Search size={18} />
          <input
            type="text"
            placeholder="Buscar por nome ou material..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pp-search-input"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="pp-clear-btn">×</button>
          )}
        </div>
        <div className="pp-filter-pills">
          {categories.map(cat => (
            <button
              key={cat}
              className={`pp-pill ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results summary */}
      <div className="container pp-results-info page-reveal">
        <span className="pp-results-count">
          {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''}
          {activeCategory !== 'Todos' && ` em ${activeCategory}`}
          {searchTerm && ` para "${searchTerm}"`}
        </span>
        <div className="pp-sort-label">
          <SlidersHorizontal size={14} />
          <span>Ordenado por destaque</span>
        </div>
      </div>

      {/* Product Grid */}
      <div className="container" style={{ paddingBottom: '10rem' }}>
        {filteredProducts.length === 0 ? (
          <div className="pp-empty">
            <p>Nenhum produto encontrado para essa busca.</p>
            <button onClick={() => { setActiveCategory('Todos'); setSearchTerm(''); }} className="pp-reset-btn">
              Ver todos os produtos
            </button>
          </div>
        ) : (
          <div className="pp-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="pp-card">
                <div className="pp-card-image">
                  <img src={product.image} alt={product.name} />
                  <div className="pp-card-overlay">
                    <div className="pp-card-badges">
                      {product.isPremium && <span className="badge premium">Premium</span>}
                      {product.isPopular && <span className="badge popular">Popular</span>}
                    </div>
                    <button className="pp-card-action">
                      <ArrowUpRight size={20} />
                    </button>
                  </div>
                </div>
                <div className="pp-card-info">
                  <span className="pp-card-category">{product.category}</span>
                  <h3 className="pp-card-name">{product.name}</h3>
                  <p className="pp-card-desc">{product.description}</p>
                  <div className="pp-card-footer">
                    <div className="pp-card-price">
                      <span className="pp-price-currency">R$</span>
                      <span className="pp-price-amount">{product.price.toFixed(2).replace('.', ',')}</span>
                      <span className="pp-price-unit">/ m²</span>
                    </div>
                    <button className="pp-orcar-btn">Solicitar Orçamento</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA Banner */}
      <div className="pp-cta-banner">
        <div className="container">
          <div className="pp-cta-inner glass-card page-reveal">
            <div className="pp-cta-glow" />
            <div>
              <p className="pp-eyebrow" style={{ marginBottom: '1rem' }}>PROJETO PERSONALIZADO</p>
              <h2 className="pp-cta-title">Não encontrou o que procurava?</h2>
              <p className="pp-cta-sub">Nossa equipe cria soluções sob medida para cada projeto.</p>
            </div>
            <div className="pp-cta-actions">
              <a href="https://wa.me/5595999999999" className="pp-cta-whatsapp">
                Falar no WhatsApp
              </a>
              <button onClick={() => navigate('/')} className="pp-cta-back">
                Voltar ao Site
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;

import React, { useState } from 'react';
import { Search, ArrowUpRight } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  isPremium?: boolean;
  isPopular?: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: "Piso de Carvalho Europeu",
    category: "Pisos de Madeira",
    price: 289.90,
    image: "https://images.unsplash.com/photo-1581850518616-bcb8188c4436?q=80&w=800&auto=format&fit=crop",
    isPremium: true,
    isPopular: true
  },
  {
    id: 2,
    name: "Revestimento Cerâmico 3D",
    category: "Cerâmica",
    price: 85.90,
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=800&auto=format&fit=crop",
    isPremium: true
  },
  {
    id: 3,
    name: "Mármore Carrara Italiano",
    category: "Mármore",
    price: 450.00,
    image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=80&w=800&auto=format&fit=crop",
    isPremium: true,
    isPopular: true
  },
  {
    id: 4,
    name: "Porcelanato Gray Concrete",
    category: "Porcelanato",
    price: 159.00,
    image: "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=800&auto=format&fit=crop",
    isPremium: false
  },
  {
    id: 5,
    name: "Piso Vinílico Premium",
    category: "Vinílico",
    price: 119.90,
    image: "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=800&auto=format&fit=crop",
    isPopular: true
  },
  {
    id: 6,
    name: "Piso de Nogueira Negra",
    category: "Pisos de Madeira",
    price: 345.00,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop",
    isPremium: true
  }
];

const categories = ["Todos", "Pisos de Madeira", "Cerâmica", "Porcelanato", "Mármore", "Vinílico"];

interface ProductsProps {
  featuredOnly?: boolean;
}

const Products: React.FC<ProductsProps> = ({ featuredOnly = false }) => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  const displayProducts = featuredOnly 
    ? products.filter(p => p.isPremium || p.isPopular).slice(0, 3)
    : products;

  const filteredProducts = displayProducts.filter(product => {
    const matchesCategory = activeCategory === "Todos" || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });



  return (
    <section id="shop" className="section-padding bg-dark-900 overflow-hidden relative">
      <div className="container relative z-10">
        <div className="reveal text-center mb-20">
          <h2 className="section-subtitle">PISOS & REVESTIMENTOS</h2>
          <h3 className="section-title">
            {featuredOnly ? "Produtos em " : "Coleção "} 
            <span className="orange-text">{featuredOnly ? "Destaque" : "Exclusiva"}</span>
          </h3>
        </div>

        {!featuredOnly && (
          <div className="shop-controls mb-16">
            <div className="search-bar-container glass-card">
              <Search size={20} className="search-icon" />
              <input 
                type="text" 
                placeholder="Buscar produtos..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="filter-scroll">
              <div className="filter-container">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div ref={gridRef} className="product-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card glass-card">
              <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-overlay">
                  <div className="product-badges">
                    {product.isPremium && <span className="badge premium">Premium</span>}
                    {product.isPopular && <span className="badge popular">Popular</span>}
                  </div>
                  <div className="product-actions">
                    <button className="action-btn-circle"><ArrowUpRight size={20} /></button>
                  </div>
                </div>
              </div>
              <div className="product-info shadow-xl">
                <h4 className="product-name">{product.name}</h4>
                <p className="product-category">{product.category}</p>
                <div className="product-price-section">
                  <div className="product-price">
                    <span className="currency">R$</span>
                    <span className="amount">{product.price.toFixed(2).replace('.', ',')}</span>
                    <span className="unit">/ m²</span>
                  </div>
                  <button className="cta-mini">Solicitar Orçamento</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="no-results text-center py-20 w-full opacity-50">
            Nenhum produto encontrado.
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;

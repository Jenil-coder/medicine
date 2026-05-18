import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, X, Box, ShoppingCart, Trash2, Plus, Minus, Send
} from 'lucide-react';
import { productsData } from '../data/productsData';
import ProductFamilyModal from '../components/ProductFamilyModal';
import './ProductsPage.css';

/* ── Quote Cart Panel ── */
const QuoteCartPanel = ({ cart, onUpdateQty, onRemove, onClose, onSubmit }) => {
  const total = cart.reduce((s, i) => s + i.quantity, 0);
  return (
    <div className="pp-cart-overlay" onClick={onClose}>
      <div className="pp-cart-panel" onClick={e => e.stopPropagation()}>
        <div className="pp-cart-header">
          <div className="pp-cart-title">
            <ShoppingCart size={20} />
            <span>Quote Request</span>
            <span className="pp-cart-badge">{total}</span>
          </div>
          <button className="pp-cart-close" onClick={onClose}><X size={20} /></button>
        </div>
        {cart.length === 0 ? (
          <div className="pp-cart-empty">
            <ShoppingCart size={36} opacity={0.2} />
            <p>No items added yet.</p>
            <span>Browse categories and click "Add to Quote".</span>
          </div>
        ) : (
          <>
            <div className="pp-cart-items">
              {cart.map((item, idx) => (
                <div key={idx} className="pp-cart-item">
                  <div className="pp-ci-icon"><Box size={14} /></div>
                  <div className="pp-ci-info">
                    <span className="pp-ci-name">{item.name}</span>
                    <span className="pp-ci-cat">{item.category}</span>
                  </div>
                  <div className="pp-ci-qty">
                    <button onClick={() => onUpdateQty(item.name, -1)}><Minus size={11} /></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onUpdateQty(item.name, 1)}><Plus size={11} /></button>
                  </div>
                  <button className="pp-ci-remove" onClick={() => onRemove(item.name)}><Trash2 size={13} /></button>
                </div>
              ))}
            </div>
            <div className="pp-cart-footer">
              <div className="pp-cart-summary">
                <span>{cart.length} product{cart.length > 1 ? 's' : ''}</span>
                <span>{total} unit{total > 1 ? 's' : ''} total</span>
              </div>
              <button className="pp-cart-submit" onClick={onSubmit}>
                <Send size={15} />Submit Quote Request
              </button>
              <p className="pp-cart-note">Our team will respond within 24 hours with pricing and availability.</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};


/* ── Main Page ── */
const ProductsPage = () => {
  const [activeSection, setActiveSection] = useState(productsData[0].id);
  const [quoteCart, setQuoteCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [addedItem, setAddedItem] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [selectedFamily, setSelectedFamily] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220;
      let current = productsData[0].id;
      for (const cat of productsData) {
        const el = document.getElementById(`cat-${cat.id}`);
        if (el && scrollPosition >= el.offsetTop) current = cat.id;
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const anyOverlay = showCart || selectedFamily;
    document.body.style.overflow = anyOverlay ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showCart, selectedFamily]);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(`cat-${id}`);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 90, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const openModal = (family, category) => {
    setSelectedFamily(family);
    setSelectedCategory(category);
  };

  const closeModal = () => {
    setSelectedFamily(null);
    setSelectedCategory(null);
  };

  const handleAddToQuote = (productName, categoryTitle) => {
    const qty = quantities[productName] || 1;
    setQuoteCart(prev => {
      const existing = prev.find(i => i.name === productName);
      if (existing) return prev.map(i => i.name === productName ? { ...i, quantity: i.quantity + qty } : i);
      return [...prev, { name: productName, quantity: qty, category: categoryTitle }];
    });
    setQuantities(prev => ({ ...prev, [productName]: 1 }));
    setAddedItem(productName);
    setTimeout(() => setAddedItem(null), 2000);
  };

  const handleQtyChange = (product, delta) => {
    setQuantities(prev => ({ ...prev, [product]: Math.max(1, (prev[product] || 1) + delta) }));
  };

  const handleCartUpdateQty = (name, delta) => {
    setQuoteCart(prev => prev.map(i => i.name === name ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i));
  };

  const handleCartRemove = (name) => {
    setQuoteCart(prev => prev.filter(i => i.name !== name));
  };

  const handleSubmitQuote = () => {
    const body = quoteCart.map(i => `${i.name} — Qty: ${i.quantity}`).join('%0A');
    window.location.href = `mailto:info@inventasystems.in?subject=Quote%20Request%20from%20Products%20Catalogue&body=${body}`;
  };

  const totalCartItems = quoteCart.reduce((s, i) => s + i.quantity, 0);

  return (
    <main className="pp-page">

      {/* ── Page Header ── */}
      <header className="pp-page-header">
        <div className="pp-header-inner">
          <span className="pp-kicker">Inventa Systems</span>
          <h1>Products Catalogue</h1>
          <p>Analytical instruments, reagents, labware, and manufacturing solutions across every discipline.</p>
        </div>
      </header>

      <div className="pp-container">

        {/* ── Sticky Sidebar ── */}
        <aside className="pp-sidebar">
          <nav className="pp-sidebar-nav">
            <h3 className="pp-sidebar-title">Products</h3>
            <ul>
              {productsData.map(cat => {
                const Icon = cat.icon;
                const isActive = activeSection === cat.id;
                return (
                  <li key={cat.id}>
                    <a
                      href={`#cat-${cat.id}`}
                      className={isActive ? 'active' : ''}
                      onClick={e => scrollToSection(e, cat.id)}
                      style={isActive ? { '--active-color': cat.color } : {}}
                    >
                      <span className="pp-sidebar-icon"><Icon size={16} /></span>
                      <span className="pp-sidebar-text">{cat.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="pp-sidebar-contact">
            <h4>Product Enquiries</h4>
            <p>Contact a product specialist for pricing, availability, and technical guidance.</p>
            <Link to="/contact" className="pp-sidebar-btn">Contact Us</Link>
          </div>
        </aside>

        {/* ── Main Scrollable Content ── */}
        <div className="pp-content">
          {productsData.map(cat => {
            const CatIcon = cat.icon;
            return (
              <section key={cat.id} id={`cat-${cat.id}`} className="pp-cat-section">

                {/* Category Header */}
                <div className="pp-cat-header" style={{ backgroundImage: `url(${cat.image})` }}>
                  <div className="pp-cat-header-overlay" style={{ background: `linear-gradient(135deg, ${cat.color}dd 0%, rgba(0,0,0,0.7) 100%)` }} />
                  <div className="pp-cat-header-inner">
                    <span className="pp-cat-icon-wrap" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}>
                      <CatIcon size={22} color="#fff" />
                    </span>
                    <div>
                      <h2>{cat.title}</h2>
                      <p>{cat.overview}</p>
                    </div>
                    <Link to={`/products/${cat.id}`} className="pp-cat-explore-btn">
                      Explore Category <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>

                {/* Families Grid */}
                <div className="pp-families-grid">
                  {cat.families.map(family => (
                    <div
                      key={family.id}
                      className="pp-family-card"
                      onClick={() => openModal(family, cat)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="pp-fc-img-wrap">
                        <img src={family.image} alt={family.name} className="pp-fc-img" />
                        <div className="pp-fc-badge" style={{ background: cat.color }}>
                          {family.models.length} model{family.models.length !== 1 ? 's' : ''}
                        </div>
                      </div>
                      <div className="pp-fc-body">
                        <h3 className="pp-fc-name">{family.name}</h3>
                        <p className="pp-fc-tagline">{family.tagline}</p>

                        <div className="pp-fc-model-chips">
                          {family.models.map(m => (
                            <span key={m.id} className="pp-fc-chip">{m.name}</span>
                          ))}
                        </div>

                        <button
                          className="pp-fc-view-btn"
                          style={{ color: cat.color }}
                          onClick={e => { e.stopPropagation(); openModal(family, cat); }}
                        >
                          View Detail <ArrowRight size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

              </section>
            );
          })}
        </div>
      </div>

      {/* ── Floating Quote FAB ── */}
      {quoteCart.length > 0 && !showCart && (
        <button className="pp-quote-fab" onClick={() => setShowCart(true)}>
          <ShoppingCart size={18} />
          <span>View Quote</span>
          <span className="pp-fab-badge">{totalCartItems}</span>
        </button>
      )}

      {/* ── Product Family Modal ── */}
      <AnimatePresence>
        {selectedFamily && selectedCategory && (
          <ProductFamilyModal
            family={selectedFamily}
            category={selectedCategory}
            quoteCart={quoteCart}
            quantities={quantities}
            addedItem={addedItem}
            totalCartItems={totalCartItems}
            onClose={closeModal}
            onAddToQuote={handleAddToQuote}
            onQuantityChange={handleQtyChange}
            onViewCart={() => { closeModal(); setShowCart(true); }}
          />
        )}
      </AnimatePresence>


      {/* ── Quote Cart Panel ── */}
      {showCart && (
        <QuoteCartPanel
          cart={quoteCart}
          onUpdateQty={handleCartUpdateQty}
          onRemove={handleCartRemove}
          onClose={() => setShowCart(false)}
          onSubmit={handleSubmitQuote}
        />
      )}

    </main>
  );
};

export default ProductsPage;

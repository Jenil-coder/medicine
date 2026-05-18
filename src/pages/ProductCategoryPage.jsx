import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, X, Box,
  ShoppingCart, Trash2, Plus, Minus, Send
} from 'lucide-react';
import { productsData } from '../data/productsData';
import ProductFamilyModal from '../components/ProductFamilyModal';
import './ProductCategoryPage.css';

/* ── Quote Cart Panel ── */
const QuoteCartPanel = ({ cart, onUpdateQty, onRemove, onClose, onSubmit }) => {
  const total = cart.reduce((s, i) => s + i.quantity, 0);
  return (
    <div className="pcp-cart-overlay" onClick={onClose}>
      <div className="pcp-cart-panel" onClick={e => e.stopPropagation()}>
        <div className="pcp-cart-header">
          <div className="pcp-cart-title">
            <ShoppingCart size={20} />
            <span>Quote Request</span>
            <span className="pcp-cart-badge">{total}</span>
          </div>
          <button className="pcp-cart-close" onClick={onClose}><X size={20} /></button>
        </div>
        {cart.length === 0 ? (
          <div className="pcp-cart-empty">
            <ShoppingCart size={36} opacity={0.2} />
            <p>No items added yet.</p>
            <span>Browse product families and click "Add to Quote".</span>
          </div>
        ) : (
          <>
            <div className="pcp-cart-items">
              {cart.map((item, idx) => (
                <div key={idx} className="pcp-cart-item">
                  <div className="pcp-ci-icon"><Box size={14} /></div>
                  <div className="pcp-ci-info">
                    <span className="pcp-ci-name">{item.name}</span>
                    <span className="pcp-ci-cat">{item.category}</span>
                  </div>
                  <div className="pcp-ci-qty">
                    <button onClick={() => onUpdateQty(item.name, -1)}><Minus size={11} /></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onUpdateQty(item.name, 1)}><Plus size={11} /></button>
                  </div>
                  <button className="pcp-ci-remove" onClick={() => onRemove(item.name)}><Trash2 size={13} /></button>
                </div>
              ))}
            </div>
            <div className="pcp-cart-footer">
              <div className="pcp-cart-summary">
                <span>{cart.length} product{cart.length > 1 ? 's' : ''}</span>
                <span>{total} unit{total > 1 ? 's' : ''} total</span>
              </div>
              <button className="pcp-cart-submit" onClick={onSubmit}>
                <Send size={15} />Submit Quote Request
              </button>
              <p className="pcp-cart-note">Our team will respond within 24 hours with pricing and availability.</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};


/* ── Main Page ── */
const ProductCategoryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const category = productsData.find(p => p.id === categoryId);

  const [selectedFamily, setSelectedFamily] = useState(null);
  const [quoteCart, setQuoteCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [showCart, setShowCart] = useState(false);
  const [addedItem, setAddedItem] = useState(null);

  useEffect(() => {
    if (!category) navigate('/products', { replace: true });
  }, [category, navigate]);

  useEffect(() => {
    const anyOverlay = selectedFamily || showCart;
    document.body.style.overflow = anyOverlay ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedFamily, showCart]);

  if (!category) return null;

  const CatIcon = category.icon;

  const handleQuantityChange = (product, delta) => {
    setQuantities(prev => ({ ...prev, [product]: Math.max(1, (prev[product] || 1) + delta) }));
  };

  const handleAddToQuote = (product, cat) => {
    const qty = quantities[product] || 1;
    setQuoteCart(prev => {
      const existing = prev.find(i => i.name === product);
      if (existing) return prev.map(i => i.name === product ? { ...i, quantity: i.quantity + qty } : i);
      return [...prev, { name: product, quantity: qty, category: cat }];
    });
    setQuantities(prev => ({ ...prev, [product]: 1 }));
    setAddedItem(product);
    setTimeout(() => setAddedItem(null), 2000);
  };

  const handleCartUpdateQty = (name, delta) => {
    setQuoteCart(prev => prev.map(i => i.name === name ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i));
  };

  const handleCartRemove = (name) => {
    setQuoteCart(prev => prev.filter(i => i.name !== name));
  };

  const handleSubmitQuote = () => {
    const body = quoteCart.map(i => `${i.name} — Qty: ${i.quantity}`).join('%0A');
    window.location.href = `mailto:info@inventasystems.in?subject=Quote%20Request%20%E2%80%94%20${encodeURIComponent(category.title)}&body=${body}`;
  };

  const totalCartItems = quoteCart.reduce((s, i) => s + i.quantity, 0);

  return (
    <main className="pcp-page">

      {/* ── Hero Banner ── */}
      <div className="pcp-hero">
        <img src={category.image} alt={category.title} className="pcp-hero-bg" />
        <div className="pcp-hero-overlay" />
        <div className="pcp-hero-color-wash" style={{ background: category.color }} />
        <div className="pcp-hero-inner">
          <div className="pcp-breadcrumb">
            <Link to="/products" className="pcp-back-btn">
              <ArrowLeft size={14} />
              All Products
            </Link>
            <span className="pcp-breadcrumb-sep">/</span>
            <span className="pcp-breadcrumb-current" style={{ color: '#fff', opacity: 0.85 }}>
              <CatIcon size={13} />
              {category.shortTitle}
            </span>
          </div>
          <h1>{category.title}</h1>
          <p>{category.overview}</p>
        </div>
      </div>

      {/* ── Product Families Grid ── */}
      <section className="pcp-families-section">
        <div className="pcp-families-inner">
          <div className="pcp-section-label">
            <span className="pcp-label-kicker" style={{ color: category.color }}>Product Families</span>
            <h2>Explore our {category.shortTitle} solutions</h2>
          </div>

          <div className="pcp-families-grid">
            {category.families.map((family, idx) => (
              <motion.div
                key={family.id}
                className="pcp-family-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelectedFamily(family)}
              >
                <div className="pcp-fc-img-wrap">
                  <img src={family.image} alt={family.name} className="pcp-fc-img" />
                  <div className="pcp-fc-gradient" style={{ background: `linear-gradient(to top, ${category.color}bb 0%, transparent 55%)` }} />
                  <div className="pcp-fc-badge" style={{ background: `${category.color}`, color: '#fff' }}>
                    {family.models.length} model{family.models.length !== 1 ? 's' : ''}
                  </div>
                </div>
                <div className="pcp-fc-body">
                  <div className="pcp-fc-body-main">
                    <h3 className="pcp-fc-name">{family.name}</h3>
                    <p className="pcp-fc-tagline">{family.tagline}</p>
                    <div className="pcp-fc-model-chips">
                      {family.models.map(m => (
                        <span key={m.id} className="pcp-fc-chip">{m.name}</span>
                      ))}
                    </div>
                  </div>
                  <button
                    className="pcp-fc-view-btn"
                    style={{ color: category.color, borderColor: `${category.color}35`, '--btn-color': category.color }}
                    onClick={e => { e.stopPropagation(); setSelectedFamily(family); }}
                  >
                    View Detail <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Support CTA ── */}
      <section className="pcp-support-section">
        <div className="pcp-support-inner">
          <div className="pcp-support-card" style={{ borderColor: `${category.color}25` }}>
            <div className="pcp-support-text">
              <h3>Need expert guidance on {category.shortTitle}?</h3>
              <p>Speak with a product specialist about your requirements, compliance needs, and workflow integration.</p>
            </div>
            <div className="pcp-support-actions">
              <Link to="/contact" className="pcp-support-btn" style={{ background: category.color }}>
                Contact a Specialist
              </Link>
              <Link to="/products" className="pcp-support-link-btn" style={{ color: category.color, borderColor: `${category.color}35` }}>
                All Product Categories <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Family Modal ── */}
      <AnimatePresence>
        {selectedFamily && (
          <ProductFamilyModal
            family={selectedFamily}
            category={category}
            quoteCart={quoteCart}
            quantities={quantities}
            addedItem={addedItem}
            totalCartItems={totalCartItems}
            onClose={() => setSelectedFamily(null)}
            onAddToQuote={handleAddToQuote}
            onQuantityChange={handleQuantityChange}
            onViewCart={() => { setSelectedFamily(null); setShowCart(true); }}
          />
        )}
      </AnimatePresence>

      {/* ── Floating Quote FAB ── */}
      {quoteCart.length > 0 && !showCart && !selectedFamily && (
        <button
          className="pcp-quote-fab"
          style={{ background: category.color }}
          onClick={() => setShowCart(true)}
        >
          <ShoppingCart size={18} />
          <span>View Quote</span>
          <span className="pcp-fab-badge">{totalCartItems}</span>
        </button>
      )}

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

export default ProductCategoryPage;

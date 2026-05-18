import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, X,
  CheckCircle2, Box, ShoppingCart, Trash2, Plus, Minus, Send,
  Phone, User, Mail, MessageSquare, ExternalLink
} from 'lucide-react';
import { productsData } from '../data/productsData';
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

/* ── Product Family Modal ── */
const ProductFamilyModal = ({
  family, category, quoteCart, quantities, addedItem,
  onClose, onAddToQuote, onQuantityChange, onViewCart, totalCartItems
}) => {
  const [activeModelIdx, setActiveModelIdx] = useState(0);
  const [askName, setAskName] = useState('');
  const [askEmail, setAskEmail] = useState('');
  const [askMessage, setAskMessage] = useState('');
  const activeModel = family.models[activeModelIdx];

  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    setActiveModelIdx(0);
    setAskName('');
    setAskEmail('');
    setAskMessage('');
  }, [family.id]);

  const enquirySubject = encodeURIComponent(`Product Enquiry: ${family.name} — ${category.title}`);
  const enquiryBody = encodeURIComponent(`Name: ${askName}\nEmail: ${askEmail}\n\nMessage:\n${askMessage || `I would like to enquire about the ${family.name} (${activeModel.name}).`}`);
  const CatIcon = category.icon;

  return (
    <motion.div
      className="pp-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <motion.div
        className="pp-modal"
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="pp-modal-header">
          <div className="pp-modal-header-left">
            <span className="pp-modal-kicker" style={{ color: category.color, background: `${category.color}14` }}>
              <CatIcon size={12} />
              {category.shortTitle}
            </span>
            <h2 className="pp-modal-title">{family.name}</h2>
          </div>
          <button className="pp-modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        {/* Body */}
        <div className="pp-modal-body">

          {/* LEFT — Image + Overview + Features */}
          <div className="pp-modal-left">
            <div className="pp-modal-banner-wrap">
              <img src={family.image} alt={family.name} className="pp-modal-banner" />
              <div className="pp-modal-banner-overlay" style={{ background: `linear-gradient(to top, ${category.color}99 0%, transparent 55%)` }} />
            </div>

            <div className="pp-modal-left-content">
              <div className="pp-modal-section">
                <h4 className="pp-modal-section-title" style={{ color: category.color }}>
                  <span className="pp-modal-section-bar" style={{ background: category.color }} />
                  Product Overview
                </h4>
                <p className="pp-modal-desc">{family.description}</p>
                {family.extendedDescription && (
                  <p className="pp-modal-ext-desc">{family.extendedDescription}</p>
                )}
              </div>

              <div className="pp-modal-section">
                <h4 className="pp-modal-section-title" style={{ color: category.color }}>
                  <span className="pp-modal-section-bar" style={{ background: category.color }} />
                  System Specifications
                </h4>
                <ul className="pp-modal-features">
                  {family.keyFeatures.map((f, i) => (
                    <li key={i}>
                      <CheckCircle2 size={14} style={{ color: category.color, flexShrink: 0 }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {family.relatedApplications && family.relatedApplications.length > 0 && (
                <div className="pp-modal-section">
                  <h4 className="pp-modal-section-title" style={{ color: category.color }}>
                    <span className="pp-modal-section-bar" style={{ background: category.color }} />
                    Related Applications
                  </h4>
                  <div className="pp-modal-app-tags">
                    {family.relatedApplications.map(appId => (
                      <Link
                        key={appId}
                        to={`/applications/${appId}`}
                        className="pp-modal-app-tag"
                        style={{ color: category.color, borderColor: `${category.color}30`, background: `${category.color}08` }}
                        onClick={onClose}
                      >
                        <ExternalLink size={11} />
                        {appId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — Model Selector + Specs + Quote Builder + Enquiry */}
          <div className="pp-modal-right">

            {/* Model Selector */}
            {family.models.length > 1 && (
              <div className="pp-modal-model-selector">
                <span className="pp-modal-model-label">Select Model</span>
                <div className="pp-modal-model-tabs">
                  {family.models.map((model, i) => (
                    <button
                      key={model.id}
                      className={`pp-modal-model-tab ${i === activeModelIdx ? 'is-active' : ''}`}
                      style={i === activeModelIdx ? { background: category.color, borderColor: category.color } : {}}
                      onClick={() => setActiveModelIdx(i)}
                    >
                      {model.name}
                      <span className={`pp-modal-model-tier ${model.tier.toLowerCase()}`}>{model.tier}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Specs Table */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModel.id}
                className="pp-modal-specs"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <h5 className="pp-modal-specs-title">{activeModel.name}</h5>
                <table className="pp-modal-specs-table">
                  <tbody>
                    {Object.entries(activeModel.specs).map(([k, v]) => (
                      <tr key={k}>
                        <td className="pp-modal-spec-key">{k}</td>
                        <td className="pp-modal-spec-val">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="pp-modal-model-tags">
                  {activeModel.keyFeatures.map((f, i) => (
                    <span key={i} className="pp-modal-model-tag" style={{ background: `${category.color}12`, color: category.color }}>
                      <CheckCircle2 size={10} />
                      {f}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Quote Builder */}
            <div className="pp-modal-qb" style={{ borderColor: `${category.color}20` }}>
              <div className="pp-modal-qb-header" style={{ background: `${category.color}0d` }}>
                <ShoppingCart size={15} style={{ color: category.color }} />
                <span>Build Your Quote</span>
              </div>
              <p className="pp-modal-qb-sub">Select products and quantities, then add to your quote request.</p>

              <div className="pp-modal-qb-items">
                {activeModel.relatedProducts.map((product, idx) => {
                  const qty = quantities[product] || 1;
                  const isAdded = addedItem === product;
                  const inCart = quoteCart.some(i => i.name === product);
                  return (
                    <div key={idx} className={`pp-modal-qb-row ${inCart ? 'in-cart' : ''}`}>
                      <div className="pp-modal-qb-info">
                        <div className="pp-modal-qb-icon" style={{ background: `${category.color}14`, color: category.color }}>
                          <Box size={13} />
                        </div>
                        <div className="pp-modal-qb-text">
                          <span className="pp-modal-qb-name">{product}</span>
                          <span className="pp-modal-qb-unit">
                            {inCart
                              ? <span className="pp-modal-qb-in-cart">In Quote</span>
                              : <span className="pp-modal-qb-unit-label">Unit</span>
                            }
                          </span>
                        </div>
                      </div>
                      <div className="pp-modal-qb-actions">
                        <div className="pp-modal-qb-qty">
                          <button onClick={() => onQuantityChange(product, -1)}><Minus size={10} /></button>
                          <span>{qty}</span>
                          <button onClick={() => onQuantityChange(product, 1)}><Plus size={10} /></button>
                        </div>
                        <button
                          className={`pp-modal-qb-add ${isAdded ? 'added' : ''}`}
                          style={{ background: isAdded ? '#10B981' : category.color }}
                          onClick={() => onAddToQuote(product, category.title)}
                        >
                          {isAdded ? <><CheckCircle2 size={12} /> Added!</> : <>Add to Quote</>}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {quoteCart.length > 0 && (
                <button
                  className="pp-modal-qb-view"
                  style={{ borderColor: category.color, color: category.color }}
                  onClick={() => { onClose(); onViewCart(); }}
                >
                  <ShoppingCart size={13} />
                  View Quote ({totalCartItems} item{totalCartItems !== 1 ? 's' : ''})
                </button>
              )}
            </div>

            {/* Enquiry Form + Support Call */}
            <div className="pp-modal-enquiry" style={{ borderColor: `${category.color}25` }}>
              <span className="pp-modal-enquiry-label" style={{ color: category.color }}>Ask About This Product</span>

              <div className="pp-modal-field">
                <div className="pp-modal-field-icon"><User size={13} /></div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="pp-modal-input"
                  value={askName}
                  onChange={e => setAskName(e.target.value)}
                />
              </div>
              <div className="pp-modal-field">
                <div className="pp-modal-field-icon"><Mail size={13} /></div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="pp-modal-input"
                  value={askEmail}
                  onChange={e => setAskEmail(e.target.value)}
                />
              </div>
              <div className="pp-modal-field pp-modal-field--ta">
                <div className="pp-modal-field-icon pp-modal-field-icon--top"><MessageSquare size={13} /></div>
                <textarea
                  className="pp-modal-input pp-modal-textarea"
                  placeholder="Describe your requirement or any questions…"
                  rows={3}
                  value={askMessage}
                  onChange={e => setAskMessage(e.target.value)}
                />
              </div>

              <a
                href={`mailto:info@inventasystems.in?subject=${enquirySubject}&body=${enquiryBody}`}
                className="pp-modal-send-btn"
                style={{ background: category.color }}
              >
                <Send size={14} />
                Send Enquiry
              </a>
            </div>

            <a href="tel:+918734013927" className="pp-modal-call-btn">
              <Phone size={15} />
              Call Technical Support
            </a>

          </div>
        </div>
      </motion.div>
    </motion.div>
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

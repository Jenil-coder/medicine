import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, X, CheckCircle2, Box,
  ShoppingCart, Trash2, Plus, Minus, Send, ExternalLink, Phone, User, Mail, MessageSquare
} from 'lucide-react';
import { productsData } from '../data/productsData';
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

/* ── Family Drawer ── */
const FamilyModal = ({ family, category, quoteCart, quantities, addedItem, onClose, onAddToQuote, onQuantityChange, onViewCart, totalCartItems }) => {
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
  }, [family.id]);

  const enquirySubject = encodeURIComponent(`Product Enquiry: ${family.name} — ${category.title}`);

  return (
    <motion.div
        className="pcp-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      >
      <motion.div
        className="pcp-modal"
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="pcp-modal-header">
          <div className="pcp-modal-header-left">
            <span className="pcp-drawer-kicker" style={{ color: category.color, background: `${category.color}12` }}>
              {category.shortTitle}
            </span>
            <h2 className="pcp-drawer-title">{family.name}</h2>
          </div>
          <button className="pcp-drawer-close" onClick={onClose}><X size={20} /></button>
        </div>

        {/* Two-column body */}
        <div className="pcp-modal-body">

          {/* LEFT — Image + Overview + Specs */}
          <div className="pcp-modal-left">
            <div className="pcp-drawer-img-wrap">
              <img src={family.image} alt={family.name} className="pcp-drawer-img" />
              <div className="pcp-drawer-img-overlay" style={{ background: `linear-gradient(to top, ${category.color}99 0%, transparent 60%)` }} />
            </div>

            <div className="pcp-modal-section">
              <h4 className="pcp-modal-section-title">
                <span className="pcp-modal-section-bar" style={{ background: category.color }} />
                <span style={{ color: category.color }}>Product Overview</span>
              </h4>
              <p className="pcp-drawer-desc">{family.description}</p>
              <p className="pcp-drawer-ext-desc">{family.extendedDescription}</p>
            </div>

            <div className="pcp-modal-section">
              <h4 className="pcp-modal-section-title">
                <span className="pcp-modal-section-bar" style={{ background: category.color }} />
                <span style={{ color: category.color }}>System Specifications</span>
              </h4>
              <ul className="pcp-drawer-feature-list">
                {family.keyFeatures.map((f, i) => (
                  <li key={i}>
                    <CheckCircle2 size={15} style={{ color: category.color, flexShrink: 0 }} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {family.relatedApplications && family.relatedApplications.length > 0 && (
              <div className="pcp-modal-section">
                <h4 className="pcp-modal-section-title">
                  <span className="pcp-modal-section-bar" style={{ background: category.color }} />
                  <span style={{ color: category.color }}>Related Applications</span>
                </h4>
                <div className="pcp-related-apps">
                  {family.relatedApplications.map(appId => (
                    <Link key={appId} to={`/applications/${appId}`} className="pcp-app-tag" style={{ color: category.color, borderColor: `${category.color}35`, background: `${category.color}08` }}>
                      <ExternalLink size={11} />
                      {appId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT — Model Selector + Specs + Qty/Quote + Enquiry */}
          <div className="pcp-modal-right">

            {/* Model Selector */}
            <div className="pcp-model-selector">
              <span className="pcp-model-selector-label">Select Model</span>
              <div className="pcp-model-tabs">
                {family.models.map((model, i) => (
                  <button
                    key={model.id}
                    className={`pcp-model-tab ${i === activeModelIdx ? 'is-active' : ''}`}
                    style={i === activeModelIdx ? { background: category.color, borderColor: category.color } : {}}
                    onClick={() => setActiveModelIdx(i)}
                  >
                    {model.name}
                    <span className={`pcp-model-tier ${model.tier.toLowerCase()}`}>{model.tier}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Specs + inline Qty/Add-to-Quote — updates on model switch */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModel.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.22 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
              >
                <div className="pcp-specs-block">
                  <h4 className="pcp-specs-title">{activeModel.name} — Specifications</h4>
                  <table className="pcp-specs-table">
                    <tbody>
                      {Object.entries(activeModel.specs).map(([k, v]) => (
                        <tr key={k}>
                          <td className="pcp-spec-key">{k}</td>
                          <td className="pcp-spec-val">{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="pcp-model-features">
                    {activeModel.keyFeatures.map((f, i) => (
                      <span key={i} className="pcp-model-feature-tag" style={{ background: `${category.color}10`, color: category.color }}>
                        <CheckCircle2 size={11} />
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Model-level Qty + Add to Quote */}
                <div className="pcp-model-cta">
                  <div className="pcp-model-cta-qty">
                    <button onClick={() => onQuantityChange(activeModel.name, -1)}><Minus size={13} /></button>
                    <span>{quantities[activeModel.name] || 1}</span>
                    <button onClick={() => onQuantityChange(activeModel.name, 1)}><Plus size={13} /></button>
                  </div>
                  <button
                    className={`pcp-model-cta-btn ${addedItem === activeModel.name ? 'added' : ''}`}
                    style={{ background: addedItem === activeModel.name ? '#10B981' : category.color }}
                    onClick={() => onAddToQuote(activeModel.name, category.title)}
                  >
                    {addedItem === activeModel.name
                      ? <><CheckCircle2 size={14} /> Added to Quote</>
                      : <><ShoppingCart size={14} /> Add to Quote</>}
                  </button>
                </div>

                {/* Qty + Add to Quote — one row per related product */}
                <div className="pcp-modal-quote-rows">
                  {activeModel.relatedProducts.map((product, idx) => {
                    const qty = quantities[product] || 1;
                    const isAdded = addedItem === product;
                    const inCart = quoteCart.some(i => i.name === product);
                    return (
                      <div key={idx} className={`pcp-qb-row ${inCart ? 'in-cart' : ''}`}>
                        <div className="pcp-qb-product-info">
                          <div className="pcp-qb-icon" style={{ background: `${category.color}14`, color: category.color }}>
                            <Box size={14} />
                          </div>
                          <div className="pcp-qb-product-text">
                            <span className="pcp-qb-product-name">{product}</span>
                            <span className="pcp-qb-unit-label">
                              {inCart ? <span className="pcp-qb-in-cart-tag">In Quote</span> : <span className="pcp-qb-unit">Unit</span>}
                            </span>
                          </div>
                        </div>
                        <div className="pcp-qb-actions">
                          <div className="pcp-qb-qty">
                            <button onClick={() => onQuantityChange(product, -1)}><Minus size={11} /></button>
                            <span>{qty}</span>
                            <button onClick={() => onQuantityChange(product, 1)}><Plus size={11} /></button>
                          </div>
                          <button
                            className={`pcp-qb-add-btn ${isAdded ? 'added' : ''}`}
                            style={{ background: isAdded ? '#10B981' : category.color }}
                            onClick={() => onAddToQuote(product, category.title)}
                          >
                            {isAdded ? <><CheckCircle2 size={13} /> Added!</> : <>Add to Quote</>}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {quoteCart.length > 0 && (
                  <button
                    className="pcp-qb-view-quote"
                    style={{ borderColor: category.color, color: category.color }}
                    onClick={() => { onClose(); onViewCart(); }}
                  >
                    <ShoppingCart size={14} />
                    View Quote ({totalCartItems} item{totalCartItems !== 1 ? 's' : ''})
                  </button>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Enquiry Form */}
            <div className="pcp-ask-block" style={{ borderColor: `${category.color}30` }}>
              <span className="pcp-ask-label" style={{ color: category.color }}>Ask About This Product</span>

              <div className="pcp-ask-field">
                <div className="pcp-ask-field-icon"><User size={13} /></div>
                <input
                  className="pcp-ask-input-field"
                  type="text"
                  placeholder="Your Name"
                  value={askName}
                  onChange={e => setAskName(e.target.value)}
                />
              </div>

              <div className="pcp-ask-field">
                <div className="pcp-ask-field-icon"><Mail size={13} /></div>
                <input
                  className="pcp-ask-input-field"
                  type="email"
                  placeholder="Email Address"
                  value={askEmail}
                  onChange={e => setAskEmail(e.target.value)}
                />
              </div>

              <div className="pcp-ask-field pcp-ask-field--textarea">
                <div className="pcp-ask-field-icon pcp-ask-field-icon--top"><MessageSquare size={13} /></div>
                <textarea
                  className="pcp-ask-input-field pcp-ask-textarea"
                  placeholder="Describe your requirement, quantity needed, or any questions…"
                  value={askMessage}
                  onChange={e => setAskMessage(e.target.value)}
                  rows={3}
                />
              </div>

              <a
                href={`mailto:info@inventasystems.in?subject=${enquirySubject}&body=${encodeURIComponent(`Name: ${askName}\nEmail: ${askEmail}\n\nMessage:\n${askMessage || `I would like to enquire about the ${family.name} (${activeModel.name}).`}`)}`}
                className="pcp-ask-submit"
                style={{ background: category.color }}
              >
                <Send size={14} />
                Send Enquiry
              </a>
            </div>

            <a href="tel:+918734013927" className="pcp-support-call-btn">
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
          <FamilyModal
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

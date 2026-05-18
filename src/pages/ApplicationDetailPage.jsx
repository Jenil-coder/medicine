import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight, ArrowLeft, X,
  CheckCircle2, Box, ShoppingCart, Trash2, Plus, Minus, Send, Phone, User, Mail, MessageSquare
} from 'lucide-react';
import { applicationsData } from '../data/applicationsData';
import './ApplicationDetailPage.css';

/* ─────────────────────────────────────────
   Quote Cart Side Panel
───────────────────────────────────────── */
const QuoteCartPanel = ({ cart, onUpdateQty, onRemove, onClose, onSubmit }) => {
  const total = cart.reduce((sum, i) => sum + i.quantity, 0);
  return (
    <div className="adp-quote-overlay" onClick={onClose}>
      <div className="adp-quote-panel" onClick={e => e.stopPropagation()}>
        <div className="adp-quote-panel-header">
          <div className="adp-quote-panel-title">
            <ShoppingCart size={20} />
            <span>Quote Request</span>
            <span className="adp-quote-badge">{total}</span>
          </div>
          <button className="adp-quote-panel-close" onClick={onClose}><X size={20} /></button>
        </div>
        {cart.length === 0 ? (
          <div className="adp-quote-panel-empty">
            <ShoppingCart size={40} opacity={0.2} />
            <p>No items added yet.</p>
            <span>Browse techniques and click "Add to Quote".</span>
          </div>
        ) : (
          <>
            <div className="adp-quote-panel-items">
              {cart.map((item, idx) => (
                <div key={idx} className="adp-qpi">
                  <div className="adp-qpi-icon"><Box size={16} /></div>
                  <div className="adp-qpi-info">
                    <span className="adp-qpi-name">{item.name}</span>
                    <span className="adp-qpi-cat">{item.category}</span>
                  </div>
                  <div className="adp-qpi-qty">
                    <button onClick={() => onUpdateQty(item.name, -1)}><Minus size={12} /></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onUpdateQty(item.name, 1)}><Plus size={12} /></button>
                  </div>
                  <button className="adp-qpi-remove" onClick={() => onRemove(item.name)}><Trash2 size={14} /></button>
                </div>
              ))}
            </div>
            <div className="adp-quote-panel-footer">
              <div className="adp-quote-summary">
                <span>{cart.length} product{cart.length > 1 ? 's' : ''}</span>
                <span>{total} unit{total > 1 ? 's' : ''} total</span>
              </div>
              <button className="adp-quote-submit" onClick={onSubmit}>
                <Send size={16} />
                Submit Quote Request
              </button>
              <p className="adp-quote-disclaimer">Our team will respond within 24 hours with pricing and availability.</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};


/* ─────────────────────────────────────────
   Main Page
───────────────────────────────────────── */
const ApplicationDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const app = applicationsData.find(a => a.id === id);

  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [quoteCart, setQuoteCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [showCart, setShowCart] = useState(false);
  const [addedItem, setAddedItem] = useState(null);
  const [askName, setAskName] = useState('');
  const [askEmail, setAskEmail] = useState('');
  const [askMessage, setAskMessage] = useState('');

  useEffect(() => {
    if (!app) navigate('/applications', { replace: true });
  }, [app, navigate]);

  useEffect(() => {
    const anyOverlay = selectedWorkflow || showCart;
    document.body.style.overflow = anyOverlay ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedWorkflow, showCart]);

  useEffect(() => {
    if (selectedWorkflow) { setAskName(''); setAskEmail(''); setAskMessage(''); }
  }, [selectedWorkflow]);

  if (!app) return null;

  const AppIcon = app.icon;

  const handleQuantityChange = (product, delta) => {
    setQuantities(prev => ({ ...prev, [product]: Math.max(1, (prev[product] || 1) + delta) }));
  };

  const handleAddToQuote = (product, category) => {
    const qty = quantities[product] || 1;
    setQuoteCart(prev => {
      const existing = prev.find(i => i.name === product);
      if (existing) return prev.map(i => i.name === product ? { ...i, quantity: i.quantity + qty } : i);
      return [...prev, { name: product, quantity: qty, category }];
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
    window.location.href = `mailto:info@inventasystems.in?subject=Quote%20Request%20from%20Website&body=${body}`;
  };

  const totalCartItems = quoteCart.reduce((s, i) => s + i.quantity, 0);

  return (
    <main className="adp-page">

      {/* ── Hero Banner ── */}
      <div className="adp-hero">
        <img src={app.image} alt={app.title} className="adp-hero-bg" />
        <div className="adp-hero-overlay" />
        <div className="adp-hero-color-wash" style={{ background: app.color }} />
        <div className="adp-hero-inner">
          <div className="adp-breadcrumb">
            <Link to="/applications" className="adp-back-btn">
              <ArrowLeft size={14} />
              All Applications
            </Link>
            <span className="adp-breadcrumb-sep">/</span>
            <span className="adp-breadcrumb-current" style={{ color: '#fff', opacity: 0.85 }}>
              <AppIcon size={13} />
              {app.shortTitle}
            </span>
          </div>
          <h1>{app.title}</h1>
          <p>{app.overview}</p>
        </div>
      </div>

      {/* ── Techniques Grid ── */}
      <section className="adp-techniques-section">
        <div className="adp-techniques-inner">
          <div className="adp-section-label">
            <span className="adp-label-kicker" style={{ color: app.color }}>Techniques & Workflows</span>
            <h2>Explore our {app.shortTitle} solutions</h2>
          </div>
          <div className="adp-workflow-grid">
            {app.workflows.map((wf, idx) => {
              const WfIcon = wf.icon;
              return (
                <div key={idx} className="adp-workflow-card">
                  <div className="adp-wf-img">
                    <img src={wf.image} alt={wf.title} />
                  </div>
                  <div className="adp-wf-body">
                    <div className="adp-wf-title-row">
                      <span className="adp-wf-icon" style={{ color: app.color, background: `${app.color}15` }}>
                        <WfIcon size={18} />
                      </span>
                      <h3>{wf.title}</h3>
                    </div>
                    <p className="adp-wf-desc">{wf.description}</p>
                    <button
                      className="adp-wf-view-btn"
                      style={{ color: app.color }}
                      onClick={() => setSelectedWorkflow({ ...wf, appColor: app.color, appCategory: app.title })}
                    >
                      View Specifications <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Support CTA ── */}
      <section className="adp-support-section">
        <div className="adp-support-inner">
          <div className="adp-support-card" style={{ borderColor: `${app.color}25` }}>
            <div className="adp-support-text">
              <h3>Need expert guidance?</h3>
              <p>Speak with an applications specialist about your specific requirements and workflow challenges.</p>
            </div>
            <div className="adp-support-actions">
              <Link to="/contact" className="adp-support-btn-primary" style={{ background: app.color }}>
                Contact a Specialist
              </Link>
              <Link to="/applications" className="adp-support-btn-outline" style={{ color: app.color, borderColor: `${app.color}40` }}>
                All Applications <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Workflow Detail Modal ── */}
      {selectedWorkflow && (
        <div className="adp-modal-overlay" onClick={() => setSelectedWorkflow(null)}>
          <div className="adp-modal-content" style={{ '--modal-accent': selectedWorkflow.appColor }} onClick={e => e.stopPropagation()}>

            <div className="adp-modal-header">
              <div className="adp-modal-header-titles">
                <span className="adp-modal-kicker" style={{ color: selectedWorkflow.appColor }}>{selectedWorkflow.appCategory}</span>
                <h2>{selectedWorkflow.title}</h2>
              </div>
              <button className="adp-modal-close" onClick={() => setSelectedWorkflow(null)}><X size={24} /></button>
            </div>

            <div className="adp-modal-body">
              <div className="adp-modal-left">
                <img src={selectedWorkflow.image} alt={selectedWorkflow.title} className="adp-modal-main-img" />
                <div className="adp-modal-section">
                  <h3>Application Overview</h3>
                  <p className="adp-extended-desc">{selectedWorkflow.extendedDescription}</p>
                </div>
                <div className="adp-modal-section">
                  <h3>System Specifications</h3>
                  <ul className="adp-feature-list">
                    {selectedWorkflow.keyFeatures.map((f, i) => (
                      <li key={i}><CheckCircle2 size={18} color={selectedWorkflow.appColor} /><span>{f}</span></li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* ── Quote Builder Sidebar ── */}
              <div className="adp-modal-right">
                <div className="adp-sticky-sidebar">
                  <div className="adp-quote-builder-box" style={{ borderColor: `${selectedWorkflow.appColor}30` }}>
                    <div className="adp-qbb-header" style={{ background: `${selectedWorkflow.appColor}12` }}>
                      <ShoppingCart size={18} style={{ color: selectedWorkflow.appColor }} />
                      <h4>Build Your Quote</h4>
                    </div>
                    <p className="adp-qbb-desc">Select products and quantities to build your quote request.</p>

                    <div className="adp-qbb-products">
                      {selectedWorkflow.relatedProducts.map((product, idx) => {
                        const qty = quantities[product] || 1;
                        const isAdded = addedItem === product;
                        const inCart = quoteCart.some(i => i.name === product);
                        return (
                          <div key={idx} className={`adp-qbb-product-row ${inCart ? 'in-cart' : ''}`}>

                            {/* Product identity */}
                            <div className="adp-qbb-product-info">
                              <div className="adp-qbb-product-icon" style={{ background: `${selectedWorkflow.appColor}15`, color: selectedWorkflow.appColor }}>
                                <Box size={16} />
                              </div>
                              <div className="adp-qbb-product-text">
                                <span className="adp-qbb-product-name">{product}</span>
                                {inCart ? <span className="adp-qbb-in-cart-tag">In Quote</span> : <span className="adp-qbb-unit-tag">Unit</span>}
                              </div>
                            </div>

                            {/* Qty + Add to Quote */}
                            <div className="adp-qbb-product-actions">
                              <div className="adp-qbb-qty-stepper">
                                <button onClick={() => handleQuantityChange(product, -1)}><Minus size={12} /></button>
                                <span>{qty}</span>
                                <button onClick={() => handleQuantityChange(product, 1)}><Plus size={12} /></button>
                              </div>
                              <button
                                className={`adp-qbb-add-btn ${isAdded ? 'added' : ''}`}
                                style={{ background: isAdded ? '#10B981' : selectedWorkflow.appColor }}
                                onClick={() => handleAddToQuote(product, selectedWorkflow.appCategory)}
                              >
                                {isAdded ? <><CheckCircle2 size={14} /> Added!</> : <>Add to Quote</>}
                              </button>
                            </div>

                          </div>
                        );
                      })}
                    </div>

                    {quoteCart.length > 0 && (
                      <button
                        className="adp-qbb-view-quote-btn"
                        onClick={() => { setSelectedWorkflow(null); setShowCart(true); }}
                        style={{ borderColor: selectedWorkflow.appColor, color: selectedWorkflow.appColor }}
                      >
                        <ShoppingCart size={15} />
                        View Quote ({totalCartItems} item{totalCartItems > 1 ? 's' : ''})
                      </button>
                    )}
                  </div>

                  {/* Ask About This Application — 3-field form */}
                  <div className="adp-ask-block" style={{ borderColor: `${selectedWorkflow.appColor}30` }}>
                    <span className="adp-ask-label" style={{ color: selectedWorkflow.appColor }}>
                      Ask About This Application
                    </span>

                    <div className="adp-ask-field">
                      <div className="adp-ask-field-icon"><User size={13} /></div>
                      <input
                        className="adp-ask-input-field"
                        type="text"
                        placeholder="Your Name"
                        value={askName}
                        onChange={e => setAskName(e.target.value)}
                      />
                    </div>

                    <div className="adp-ask-field">
                      <div className="adp-ask-field-icon"><Mail size={13} /></div>
                      <input
                        className="adp-ask-input-field"
                        type="email"
                        placeholder="Email Address"
                        value={askEmail}
                        onChange={e => setAskEmail(e.target.value)}
                      />
                    </div>

                    <div className="adp-ask-field adp-ask-field--textarea">
                      <div className="adp-ask-field-icon adp-ask-field-icon--top"><MessageSquare size={13} /></div>
                      <textarea
                        className="adp-ask-input-field adp-ask-textarea"
                        placeholder="Describe your requirement or any questions about this application…"
                        value={askMessage}
                        onChange={e => setAskMessage(e.target.value)}
                        rows={3}
                      />
                    </div>

                    <a
                      href={`mailto:info@inventasystems.in?subject=${encodeURIComponent('Application Enquiry: ' + selectedWorkflow.title + ' — ' + selectedWorkflow.appCategory)}&body=${encodeURIComponent('Name: ' + askName + '\nEmail: ' + askEmail + '\n\nMessage:\n' + (askMessage || 'I would like to enquire about the ' + selectedWorkflow.title + ' application.'))}`}
                      className="adp-ask-submit"
                      style={{ background: selectedWorkflow.appColor }}
                    >
                      <Send size={13} /> Send Enquiry
                    </a>
                  </div>

                  <a href="tel:+918734013927" className="adp-support-call-btn">
                    <Phone size={15} />
                    Call Technical Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Floating Cart FAB ── */}
      {quoteCart.length > 0 && !showCart && (
        <button className="adp-quote-fab" onClick={() => setShowCart(true)}>
          <ShoppingCart size={20} />
          <span>View Quote</span>
          <span className="adp-quote-fab-badge">{totalCartItems}</span>
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

export default ApplicationDetailPage;

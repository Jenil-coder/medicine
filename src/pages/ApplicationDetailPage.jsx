import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight, ArrowLeft, X,
  CheckCircle2, Box, ShoppingCart, Trash2, Plus, Minus, Send,
  Eye, MessageSquare, Mail, User, FileText, Sparkles
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
   Quick View Modal
───────────────────────────────────────── */
const QuickViewModal = ({ product, workflow, accentColor, onClose, onAddToQuote, onAskAbout, inCart }) => {
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className="adp-qv-overlay" onClick={onClose}>
      <div className="adp-qv-modal" onClick={e => e.stopPropagation()}>
        <div className="adp-qv-header" style={{ borderColor: `${accentColor}20` }}>
          <div className="adp-qv-header-left">
            <span className="adp-qv-kicker" style={{ color: accentColor }}>Quick View</span>
            <h3 className="adp-qv-title">{product}</h3>
          </div>
          <button className="adp-qv-close" onClick={onClose}><X size={18} /></button>
        </div>

        <div className="adp-qv-body">
          <div className="adp-qv-img-wrap">
            <img src={workflow.image} alt={product} className="adp-qv-img" />
            <div className="adp-qv-img-badge" style={{ background: accentColor }}>
              <Box size={12} />
              <span>{workflow.title}</span>
            </div>
          </div>

          <div className="adp-qv-content">
            <p className="adp-qv-desc">{workflow.extendedDescription}</p>

            <div className="adp-qv-specs">
              <span className="adp-qv-specs-label">Key Capabilities</span>
              <ul className="adp-qv-specs-list">
                {workflow.keyFeatures.map((f, i) => (
                  <li key={i}>
                    <CheckCircle2 size={14} style={{ color: accentColor, flexShrink: 0 }} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="adp-qv-footer" style={{ borderColor: `${accentColor}15` }}>
          <button
            className="adp-qv-enquire-btn"
            style={{ color: accentColor, borderColor: `${accentColor}35` }}
            onClick={() => { onClose(); onAskAbout(); }}
          >
            <MessageSquare size={14} />
            Ask About This
          </button>
          <button
            className="adp-qv-add-btn"
            style={{ background: inCart ? '#10B981' : accentColor }}
            onClick={onAddToQuote}
          >
            {inCart
              ? <><CheckCircle2 size={14} /> In Quote</>
              : <><ShoppingCart size={14} /> Add to Quote</>}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   Enquiry Modal
───────────────────────────────────────── */
const EnquiryModal = ({ product, application, accentColor, onClose }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: `I would like to enquire about the ${product} for use in our ${application} workflow. Please provide pricing, availability, and technical specifications.`,
  });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const handleSubmit = e => {
    e.preventDefault();
    const subject = encodeURIComponent(`Product Enquiry: ${product} — ${application}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.open(`mailto:info@inventasystems.in?subject=${subject}&body=${body}`);
    setSent(true);
  };

  return (
    <div className="adp-enq-overlay" onClick={onClose}>
      <div className="adp-enq-modal" onClick={e => e.stopPropagation()}>
        {sent ? (
          <div className="adp-enq-success">
            <div className="adp-enq-success-icon" style={{ color: accentColor, background: `${accentColor}12` }}>
              <Sparkles size={28} />
            </div>
            <h3>Enquiry Sent!</h3>
            <p>Your email client has been opened with the pre-filled enquiry. Our team will respond within 24 hours.</p>
            <button className="adp-enq-done-btn" style={{ background: accentColor }} onClick={onClose}>Done</button>
          </div>
        ) : (
          <>
            <div className="adp-enq-header" style={{ borderColor: `${accentColor}20` }}>
              <div className="adp-enq-header-icon" style={{ background: `${accentColor}12`, color: accentColor }}>
                <MessageSquare size={18} />
              </div>
              <div className="adp-enq-header-text">
                <span className="adp-enq-kicker" style={{ color: accentColor }}>Product Enquiry</span>
                <h3>{product}</h3>
                <span className="adp-enq-app-tag">{application}</span>
              </div>
              <button className="adp-enq-close" onClick={onClose}><X size={18} /></button>
            </div>

            <form className="adp-enq-form" onSubmit={handleSubmit}>
              <div className="adp-enq-field">
                <label htmlFor="enq-name">
                  <User size={13} /> Your Name
                </label>
                <input
                  id="enq-name"
                  type="text"
                  placeholder="Dr. Jane Smith"
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  required
                  style={{ '--focus-color': accentColor }}
                />
              </div>

              <div className="adp-enq-field">
                <label htmlFor="enq-email">
                  <Mail size={13} /> Email Address
                </label>
                <input
                  id="enq-email"
                  type="email"
                  placeholder="jane@laboratory.com"
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  required
                  style={{ '--focus-color': accentColor }}
                />
              </div>

              <div className="adp-enq-field">
                <label htmlFor="enq-msg">
                  <FileText size={13} /> Message
                </label>
                <textarea
                  id="enq-msg"
                  rows={5}
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  style={{ '--focus-color': accentColor }}
                />
              </div>

              <div className="adp-enq-footer">
                <button type="button" className="adp-enq-cancel" onClick={onClose}>Cancel</button>
                <button type="submit" className="adp-enq-submit" style={{ background: accentColor }}>
                  <Send size={14} />
                  Send Enquiry
                </button>
              </div>
            </form>
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
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [enquiryProduct, setEnquiryProduct] = useState(null);

  useEffect(() => {
    if (!app) navigate('/applications', { replace: true });
  }, [app, navigate]);

  useEffect(() => {
    const anyOverlay = selectedWorkflow || showCart || quickViewProduct || enquiryProduct;
    document.body.style.overflow = anyOverlay ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedWorkflow, showCart, quickViewProduct, enquiryProduct]);

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
          <Link to="/applications" className="adp-back-btn">
            <ArrowLeft size={16} />
            All Applications
          </Link>
          <div className="adp-hero-badge" style={{ background: `${app.color}30`, borderColor: `${app.color}60` }}>
            <AppIcon size={16} style={{ color: app.color }} />
            <span style={{ color: app.color }}>{app.shortTitle}</span>
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
                    <p className="adp-qbb-desc">Select products, preview details, or ask our team for guidance.</p>

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
                              <span className="adp-qbb-product-name">{product}</span>
                              {inCart && <span className="adp-qbb-in-cart-tag">In Quote</span>}
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

                            {/* Quick View + Ask About */}
                            <div className="adp-qbb-product-secondary-actions">
                              <button
                                className="adp-qbb-secondary-btn"
                                style={{ color: selectedWorkflow.appColor, borderColor: `${selectedWorkflow.appColor}30` }}
                                onClick={() => setQuickViewProduct({ product, workflow: selectedWorkflow, accentColor: selectedWorkflow.appColor })}
                                title="Quick View"
                              >
                                <Eye size={12} />
                                Quick View
                              </button>
                              <button
                                className="adp-qbb-secondary-btn"
                                style={{ color: '#666', borderColor: 'rgba(0,0,0,0.1)' }}
                                onClick={() => setEnquiryProduct({ product, application: selectedWorkflow.appCategory, accentColor: selectedWorkflow.appColor })}
                                title="Ask about this product"
                              >
                                <MessageSquare size={12} />
                                Ask About This
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

                  <div className="adp-cta-box" style={{ background: `${selectedWorkflow.appColor}08`, borderColor: `${selectedWorkflow.appColor}20` }}>
                    <h4>Technical Support</h4>
                    <p>Speak with an applications specialist about this workflow.</p>
                    <Link
                      to="/contact"
                      className="adp-cta-link"
                      style={{ color: selectedWorkflow.appColor, borderColor: selectedWorkflow.appColor }}
                    >
                      Contact a Specialist
                    </Link>
                  </div>
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

      {/* ── Quick View Modal ── */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct.product}
          workflow={quickViewProduct.workflow}
          accentColor={quickViewProduct.accentColor}
          inCart={quoteCart.some(i => i.name === quickViewProduct.product)}
          onClose={() => setQuickViewProduct(null)}
          onAddToQuote={() => {
            handleAddToQuote(quickViewProduct.product, quickViewProduct.workflow.appCategory);
          }}
          onAskAbout={() => setEnquiryProduct({
            product: quickViewProduct.product,
            application: quickViewProduct.workflow.appCategory,
            accentColor: quickViewProduct.accentColor,
          })}
        />
      )}

      {/* ── Enquiry Modal ── */}
      {enquiryProduct && (
        <EnquiryModal
          product={enquiryProduct.product}
          application={enquiryProduct.application}
          accentColor={enquiryProduct.accentColor}
          onClose={() => setEnquiryProduct(null)}
        />
      )}

    </main>
  );
};

export default ApplicationDetailPage;

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, X,
  CheckCircle2, Box, ShoppingCart, Trash2, Plus, Minus, Send, Phone, User, Mail, MessageSquare
} from 'lucide-react';
import { applicationsData } from '../data/applicationsData';
import './ApplicationsPage.css';

// ── Quote Cart Panel Component ──
const QuoteCartPanel = ({ cart, onUpdateQty, onRemove, onClose, onSubmit }) => {
  const total = cart.reduce((sum, i) => sum + i.quantity, 0);
  return (
    <div className="quote-panel-overlay" onClick={onClose}>
      <div className="quote-panel" onClick={e => e.stopPropagation()}>
        <div className="quote-panel-header">
          <div className="quote-panel-title">
            <ShoppingCart size={20} />
            <span>Quote Request</span>
            <span className="quote-badge">{total}</span>
          </div>
          <button className="quote-panel-close" onClick={onClose}><X size={20} /></button>
        </div>

        {cart.length === 0 ? (
          <div className="quote-panel-empty">
            <ShoppingCart size={40} opacity={0.2} />
            <p>No items added yet.</p>
            <span>Browse applications and click "Add to Quote".</span>
          </div>
        ) : (
          <>
            <div className="quote-panel-items">
              {cart.map((item, idx) => (
                <div key={idx} className="quote-panel-item">
                  <div className="qpi-icon"><Box size={16} /></div>
                  <div className="qpi-info">
                    <span className="qpi-name">{item.name}</span>
                    <span className="qpi-cat">{item.category}</span>
                  </div>
                  <div className="qpi-qty-controls">
                    <button onClick={() => onUpdateQty(item.name, -1)}><Minus size={12} /></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onUpdateQty(item.name, 1)}><Plus size={12} /></button>
                  </div>
                  <button className="qpi-remove" onClick={() => onRemove(item.name)}><Trash2 size={14} /></button>
                </div>
              ))}
            </div>
            <div className="quote-panel-footer">
              <div className="quote-summary">
                <span>{cart.length} product{cart.length > 1 ? 's' : ''}</span>
                <span>{total} unit{total > 1 ? 's' : ''} total</span>
              </div>
              <button className="quote-submit-btn" onClick={onSubmit}>
                <Send size={16} />
                Submit Quote Request
              </button>
              <p className="quote-disclaimer">Our team will respond within 24 hours with pricing and availability.</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ── Main Page Component ──
const ApplicationsPage = () => {
  const [activeSection, setActiveSection] = useState(applicationsData[0].id);
  const sidebarListRef = useRef(null);
  const sidebarItemsRef = useRef(new Map());
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [quoteCart, setQuoteCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [showCart, setShowCart] = useState(false);
  const [addedItem, setAddedItem] = useState(null);
  const [askName, setAskName] = useState('');
  const [askEmail, setAskEmail] = useState('');
  const [askMessage, setAskMessage] = useState('');

  /* ── Scroll-spy via IntersectionObserver ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveSection(visible[0].target.id);
      },
      { rootMargin: '-80px 0px -50% 0px', threshold: 0 }
    );
    applicationsData.forEach(app => {
      const el = document.getElementById(app.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  /* ── Auto-scroll sidebar so active item stays visible ── */
  useEffect(() => {
    const list = sidebarListRef.current;
    const item = sidebarItemsRef.current.get(activeSection);
    if (!list || !item) return;
    const listTop = list.scrollTop;
    const listBottom = listTop + list.clientHeight;
    const itemTop = item.offsetTop;
    const itemBottom = itemTop + item.offsetHeight;
    if (itemTop < listTop + 24 || itemBottom > listBottom - 24) {
      list.scrollTo({
        top: itemTop - list.clientHeight / 2 + item.offsetHeight / 2,
        behavior: 'smooth',
      });
    }
  }, [activeSection]);

  useEffect(() => {
    document.body.style.overflow = (selectedWorkflow || showCart) ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedWorkflow, showCart]);

  useEffect(() => {
    if (selectedWorkflow) { setAskName(''); setAskEmail(''); setAskMessage(''); }
  }, [selectedWorkflow]);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) { window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' }); setActiveSection(id); }
  };

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
    <main className="corp-app-page">

      {/* Page Header */}
      <header className="corp-page-header">
        <div className="corp-header-inner">
          <span className="corp-kicker">Inventa Systems</span>
          <h1>Applications & Techniques</h1>
          <p>Laboratory equipment and consumables organized by industry sector.</p>
        </div>
      </header>

      <div className="corp-app-container">

        {/* Sticky Sidebar */}
        <aside className="corp-sidebar">
          <nav className="corp-sidebar-nav">
            <h3 className="corp-sidebar-title">Applications</h3>
            <ul ref={sidebarListRef}>
              {applicationsData.map(app => {
                const Icon = app.icon;
                const isActive = activeSection === app.id;
                return (
                  <li
                    key={app.id}
                    ref={el => {
                      if (el) sidebarItemsRef.current.set(app.id, el);
                      else sidebarItemsRef.current.delete(app.id);
                    }}
                  >
                    <a
                      href={`#${app.id}`}
                      className={isActive ? 'active' : ''}
                      onClick={(e) => scrollToSection(e, app.id)}
                      style={isActive ? { '--active-color': app.color } : {}}
                    >
                      <span className="corp-sidebar-icon"><Icon size={16} /></span>
                      <span className="corp-sidebar-text">{app.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="corp-sidebar-contact">
            <h4>Technical Inquiries</h4>
            <p>Contact an applications specialist regarding equipment specifications.</p>
            <Link to="/contact" className="corp-btn-outline">Contact Us</Link>
          </div>
        </aside>

        {/* Scrollable Content */}
        <div className="corp-content">
          {applicationsData.map(app => (
            <section key={app.id} id={app.id} className="corp-section">
              <div className="corp-section-header">
                <img src={app.image} alt={app.title} className="corp-section-bg" />
                <div className="corp-section-overlay" style={{ '--bg-gradient': app.color }}></div>
                <div className="corp-section-info">
                  <h2>{app.title}</h2>
                  <p>{app.overview}</p>
                </div>
              </div>
              <div className="corp-workflow-grid">
                {app.workflows.map((wf, idx) => {
                  const WfIcon = wf.icon;
                  return (
                    <div key={idx} className="corp-workflow-card">
                      <div className="corp-wf-img"><img src={wf.image} alt={wf.title} /></div>
                      <div className="corp-wf-content">
                        <div className="corp-wf-title-row">
                          <span className="corp-wf-icon" style={{ color: app.color, background: `${app.color}15` }}>
                            <WfIcon size={18} />
                          </span>
                          <h3>{wf.title}</h3>
                        </div>
                        <p className="corp-wf-desc">{wf.description}</p>
                        <button
                          onClick={() => setSelectedWorkflow({ ...wf, appColor: app.color, appCategory: app.title })}
                          className="corp-wf-link"
                          style={{ color: app.color, background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: 0, font: 'inherit' }}
                        >
                          View Specifications <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Workflow Detail Modal */}
      {selectedWorkflow && (
        <div className="corp-modal-overlay" onClick={() => setSelectedWorkflow(null)}>
          <div className="corp-modal-content" style={{ '--modal-accent': selectedWorkflow.appColor }} onClick={e => e.stopPropagation()}>

            <div className="corp-modal-header">
              <div className="corp-modal-header-titles">
                <span className="corp-modal-kicker" style={{ color: selectedWorkflow.appColor }}>{selectedWorkflow.appCategory}</span>
                <h2>{selectedWorkflow.title}</h2>
              </div>
              <button className="corp-modal-close" onClick={() => setSelectedWorkflow(null)}><X size={24} /></button>
            </div>

            <div className="corp-modal-body">

              {/* Left: Details */}
              <div className="corp-modal-left">
                <img src={selectedWorkflow.image} alt={selectedWorkflow.title} className="corp-modal-main-img" />
                <div className="corp-modal-section">
                  <h3>Application Overview</h3>
                  <p className="corp-extended-desc">{selectedWorkflow.extendedDescription}</p>
                </div>
                <div className="corp-modal-section">
                  <h3>System Specifications</h3>
                  <ul className="corp-feature-list">
                    {selectedWorkflow.keyFeatures.map((f, i) => (
                      <li key={i}><CheckCircle2 size={18} color={selectedWorkflow.appColor} /><span>{f}</span></li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right: Quote Builder */}
              <div className="corp-modal-right">
                <div className="corp-sticky-sidebar-inner">

                  {/* Quote Builder Box */}
                  <div className="quote-builder-box" style={{ borderColor: `${selectedWorkflow.appColor}30` }}>
                    <div className="qbb-header" style={{ background: `${selectedWorkflow.appColor}12` }}>
                      <ShoppingCart size={18} style={{ color: selectedWorkflow.appColor }} />
                      <h4>Build Your Quote</h4>
                    </div>
                    <p className="qbb-desc">Select products and quantities, then add to your quote request.</p>

                    <div className="qbb-products">
                      {selectedWorkflow.relatedProducts.map((product, idx) => {
                        const qty = quantities[product] || 1;
                        const isAdded = addedItem === product;
                        const inCart = quoteCart.some(i => i.name === product);
                        return (
                          <div key={idx} className={`qbb-product-row ${inCart ? 'in-cart' : ''}`}>
                            <div className="qbb-product-info">
                              <div className="qbb-product-icon" style={{ background: `${selectedWorkflow.appColor}15`, color: selectedWorkflow.appColor }}>
                                <Box size={16} />
                              </div>
                              <span className="qbb-product-name">{product}</span>
                              {inCart && <span className="qbb-in-cart-tag">In Quote</span>}
                            </div>
                            <div className="qbb-product-actions">
                              <div className="qbb-qty-stepper">
                                <button onClick={() => handleQuantityChange(product, -1)}><Minus size={12} /></button>
                                <span>{qty}</span>
                                <button onClick={() => handleQuantityChange(product, 1)}><Plus size={12} /></button>
                              </div>
                              <button
                                className={`qbb-add-btn ${isAdded ? 'added' : ''}`}
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
                      <button className="qbb-view-quote-btn" onClick={() => { setSelectedWorkflow(null); setShowCart(true); }} style={{ borderColor: selectedWorkflow.appColor, color: selectedWorkflow.appColor }}>
                        <ShoppingCart size={15} />
                        View Quote ({totalCartItems} item{totalCartItems > 1 ? 's' : ''})
                      </button>
                    )}
                  </div>

                  {/* Enquiry Form */}
                  <div className="corp-ask-block" style={{ borderColor: `${selectedWorkflow.appColor}30` }}>
                    <span className="corp-ask-label" style={{ color: selectedWorkflow.appColor }}>Ask About This Application</span>

                    <div className="corp-ask-field">
                      <div className="corp-ask-field-icon"><User size={13} /></div>
                      <input
                        className="corp-ask-input-field"
                        type="text"
                        placeholder="Your Name"
                        value={askName}
                        onChange={e => setAskName(e.target.value)}
                      />
                    </div>

                    <div className="corp-ask-field">
                      <div className="corp-ask-field-icon"><Mail size={13} /></div>
                      <input
                        className="corp-ask-input-field"
                        type="email"
                        placeholder="Email Address"
                        value={askEmail}
                        onChange={e => setAskEmail(e.target.value)}
                      />
                    </div>

                    <div className="corp-ask-field corp-ask-field--textarea">
                      <div className="corp-ask-field-icon corp-ask-field-icon--top"><MessageSquare size={13} /></div>
                      <textarea
                        className="corp-ask-input-field corp-ask-textarea"
                        placeholder="Describe your requirement or any questions about this application…"
                        value={askMessage}
                        onChange={e => setAskMessage(e.target.value)}
                        rows={3}
                      />
                    </div>

                    <a
                      href={`mailto:info@inventasystems.in?subject=${encodeURIComponent('Application Enquiry: ' + selectedWorkflow.title + ' — ' + selectedWorkflow.appCategory)}&body=${encodeURIComponent('Name: ' + askName + '\nEmail: ' + askEmail + '\n\nMessage:\n' + (askMessage || 'I would like to enquire about the ' + selectedWorkflow.title + ' application.'))}`}
                      className="corp-ask-submit"
                      style={{ background: selectedWorkflow.appColor }}
                    >
                      <Send size={14} />
                      Send Enquiry
                    </a>
                  </div>

                  <a href="tel:+918734013927" className="corp-support-call-btn">
                    <Phone size={15} />
                    Call Technical Support
                  </a>

                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Quote Cart FAB */}
      {quoteCart.length > 0 && !showCart && (
        <button className="quote-fab" onClick={() => setShowCart(true)}>
          <ShoppingCart size={20} />
          <span>View Quote</span>
          <span className="quote-fab-badge">{totalCartItems}</span>
        </button>
      )}

      {/* Quote Cart Side Panel */}
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

export default ApplicationsPage;

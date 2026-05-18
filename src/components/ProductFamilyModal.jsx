import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, CheckCircle2, ShoppingCart, Plus, Minus, Send,
  ExternalLink, Phone, User, Mail, MessageSquare
} from 'lucide-react';
import './ProductFamilyModal.css';

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
  const enquiryBody = encodeURIComponent(
    `Name: ${askName}\nEmail: ${askEmail}\n\nMessage:\n${askMessage || `I would like to enquire about the ${family.name} (${activeModel.name}).`}`
  );

  return (
    <motion.div
      className="pfm-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <motion.div
        className="pfm-modal"
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="pfm-header">
          <div className="pfm-header-left">
            <span className="pfm-kicker" style={{ color: category.color, background: `${category.color}12` }}>
              {category.shortTitle}
            </span>
            <h2 className="pfm-title">{family.name}</h2>
          </div>
          <button className="pfm-close" onClick={onClose}><X size={20} /></button>
        </div>

        {/* Two-column body */}
        <div className="pfm-body">

          {/* LEFT — Image + Overview + Specs + Related */}
          <div className="pfm-left">
            <div className="pfm-img-wrap">
              <img src={family.image} alt={family.name} className="pfm-img" />
              <div className="pfm-img-overlay" style={{ background: `linear-gradient(to top, ${category.color}99 0%, transparent 60%)` }} />
            </div>

            <div className="pfm-section">
              <h4 className="pfm-section-title">
                <span className="pfm-section-bar" style={{ background: category.color }} />
                <span style={{ color: category.color }}>Product Overview</span>
              </h4>
              <p className="pfm-desc">{family.description}</p>
              {family.extendedDescription && (
                <p className="pfm-ext-desc">{family.extendedDescription}</p>
              )}
            </div>

            <div className="pfm-section">
              <h4 className="pfm-section-title">
                <span className="pfm-section-bar" style={{ background: category.color }} />
                <span style={{ color: category.color }}>System Specifications</span>
              </h4>
              <ul className="pfm-feature-list">
                {family.keyFeatures.map((f, i) => (
                  <li key={i}>
                    <CheckCircle2 size={15} style={{ color: category.color, flexShrink: 0 }} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {family.relatedApplications && family.relatedApplications.length > 0 && (
              <div className="pfm-section">
                <h4 className="pfm-section-title">
                  <span className="pfm-section-bar" style={{ background: category.color }} />
                  <span style={{ color: category.color }}>Related Applications</span>
                </h4>
                <div className="pfm-related-apps">
                  {family.relatedApplications.map(appId => (
                    <Link
                      key={appId}
                      to={`/applications/${appId}`}
                      className="pfm-app-tag"
                      style={{ color: category.color, borderColor: `${category.color}35`, background: `${category.color}08` }}
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

          {/* RIGHT — Model Selector + Specs + Qty/Quote + Enquiry */}
          <div className="pfm-right">

            {/* Model Selector */}
            <div className="pfm-model-selector">
              <span className="pfm-model-selector-label">Select Model</span>
              <div className="pfm-model-tabs">
                {family.models.map((model, i) => (
                  <button
                    key={model.id}
                    className={`pfm-model-tab ${i === activeModelIdx ? 'is-active' : ''}`}
                    style={i === activeModelIdx ? { background: category.color, borderColor: category.color } : {}}
                    onClick={() => setActiveModelIdx(i)}
                  >
                    {model.name}
                    <span className={`pfm-model-tier ${model.tier.toLowerCase()}`}>{model.tier}</span>
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
                <div className="pfm-specs-block">
                  <h4 className="pfm-specs-title">{activeModel.name} — Specifications</h4>
                  <table className="pfm-specs-table">
                    <tbody>
                      {Object.entries(activeModel.specs).map(([k, v]) => (
                        <tr key={k}>
                          <td className="pfm-spec-key">{k}</td>
                          <td className="pfm-spec-val">{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="pfm-model-features">
                    {activeModel.keyFeatures.map((f, i) => (
                      <span key={i} className="pfm-model-feature-tag" style={{ background: `${category.color}10`, color: category.color }}>
                        <CheckCircle2 size={11} />
                        {f}
                      </span>
                    ))}
                  </div>

                  {/* Qty + Add to Quote — directly inside the model card */}
                  <div className="pfm-model-cta">
                    <div className="pfm-model-cta-qty">
                      <button onClick={() => onQuantityChange(activeModel.name, -1)}><Minus size={13} /></button>
                      <span>{quantities[activeModel.name] || 1}</span>
                      <button onClick={() => onQuantityChange(activeModel.name, 1)}><Plus size={13} /></button>
                    </div>
                    <button
                      className={`pfm-model-cta-btn ${addedItem === activeModel.name ? 'added' : ''}`}
                      style={{ background: addedItem === activeModel.name ? '#10B981' : category.color }}
                      onClick={() => onAddToQuote(activeModel.name, category.title)}
                    >
                      {addedItem === activeModel.name
                        ? <><CheckCircle2 size={14} /> Added to Quote</>
                        : <><ShoppingCart size={14} /> Add to Quote</>}
                    </button>
                  </div>
                </div>

                {quoteCart.length > 0 && (
                  <button
                    className="pfm-view-quote"
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
            <div className="pfm-ask-block" style={{ borderColor: `${category.color}30` }}>
              <span className="pfm-ask-label" style={{ color: category.color }}>Ask About This Product</span>

              <div className="pfm-ask-field">
                <div className="pfm-ask-field-icon"><User size={13} /></div>
                <input
                  className="pfm-ask-input"
                  type="text"
                  placeholder="Your Name"
                  value={askName}
                  onChange={e => setAskName(e.target.value)}
                />
              </div>

              <div className="pfm-ask-field">
                <div className="pfm-ask-field-icon"><Mail size={13} /></div>
                <input
                  className="pfm-ask-input"
                  type="email"
                  placeholder="Email Address"
                  value={askEmail}
                  onChange={e => setAskEmail(e.target.value)}
                />
              </div>

              <div className="pfm-ask-field pfm-ask-field--textarea">
                <div className="pfm-ask-field-icon pfm-ask-field-icon--top"><MessageSquare size={13} /></div>
                <textarea
                  className="pfm-ask-input pfm-ask-textarea"
                  placeholder="Describe your requirement, quantity needed, or any questions…"
                  value={askMessage}
                  onChange={e => setAskMessage(e.target.value)}
                  rows={3}
                />
              </div>

              <a
                href={`mailto:info@inventasystems.in?subject=${enquirySubject}&body=${enquiryBody}`}
                className="pfm-ask-submit"
                style={{ background: category.color }}
              >
                <Send size={14} />
                Send Enquiry
              </a>
            </div>

            <a href="tel:+918734013927" className="pfm-support-call-btn">
              <Phone size={15} />
              Call Technical Support
            </a>

          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductFamilyModal;

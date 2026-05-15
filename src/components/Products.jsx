import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { productsData } from '../data/productsData';
import './Products.css';

const Products = () => {
  const [activeId, setActiveId] = useState(productsData[0].id);
  const activeCategory = productsData.find(p => p.id === activeId) ?? productsData[0];

  return (
    <section className="hp-products-section" id="products">
      <div className="hp-prod-inner">

        {/* Section Header */}
        <div className="hp-prod-header">
          <span className="hp-prod-kicker">Our Products</span>
          <h2 className="hp-prod-headline">Precision instruments for every discipline.</h2>
        </div>

        {/* Explorer: Category Nav + Family Panel */}
        <div className="hp-prod-explorer">

          {/* LEFT — Category Navigator */}
          <nav className="hp-prod-cat-nav">
            {productsData.map(cat => {
              const Icon = cat.icon;
              const isActive = cat.id === activeId;
              return (
                <button
                  key={cat.id}
                  className={`hp-prod-cat-btn ${isActive ? 'is-active' : ''}`}
                  style={isActive ? { '--cat-clr': cat.color } : {}}
                  onClick={() => setActiveId(cat.id)}
                >
                  <span className="hp-cat-icon" style={isActive ? { background: `${cat.color}18`, color: cat.color } : {}}>
                    <Icon size={15} />
                  </span>
                  <span className="hp-cat-label">{cat.title}</span>
                  {isActive && (
                    <motion.span
                      layoutId="cat-indicator"
                      className="hp-cat-indicator"
                      style={{ background: cat.color }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* RIGHT — Family Cards Panel */}
          <div className="hp-prod-panel-wrap">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory.id}
                className="hp-prod-panel"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Category info strip */}
                <div className="hp-panel-meta">
                  <div className="hp-panel-meta-left">
                    <span className="hp-panel-kicker" style={{ color: activeCategory.color }}>
                      {activeCategory.shortTitle}
                    </span>
                    <p className="hp-panel-overview">{activeCategory.overview}</p>
                  </div>
                  <Link
                    to={`/products/${activeCategory.id}`}
                    className="hp-panel-view-all"
                    style={{ color: activeCategory.color, borderColor: `${activeCategory.color}40` }}
                  >
                    View Category <ArrowRight size={14} />
                  </Link>
                </div>

                {/* 3 Family Cards */}
                <div className="hp-families-grid">
                  {activeCategory.families.slice(0, 3).map((family, i) => (
                    <motion.div
                      key={family.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link to={`/products/${activeCategory.id}`} className="hp-family-card">
                        <div className="hp-family-img-wrap">
                          <img src={family.image} alt={family.name} className="hp-family-img" />
                          <div
                            className="hp-family-gradient"
                            style={{ background: `linear-gradient(to top, ${activeCategory.color}cc 0%, transparent 60%)` }}
                          />
                        </div>
                        <div className="hp-family-body">
                          <h4 className="hp-family-name">{family.name}</h4>
                          <p className="hp-family-tagline">{family.tagline}</p>
                          <span className="hp-family-cta" style={{ color: activeCategory.color }}>
                            Explore <ArrowRight size={13} />
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Footer CTA */}
        <motion.div
          className="hp-prod-footer"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="hp-prod-footer-desc">
            Explore our full catalogue of 16 product categories — from analytical instruments and lab automation to molecular biology reagents and water purification systems.
          </p>
          <Link to="/products" className="hp-prod-explore-btn">
            <span>Explore All 16 Product Categories</span>
            <ArrowRight size={18} />
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default Products;

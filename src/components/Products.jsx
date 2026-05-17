import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { productsData } from '../data/productsData';
import './Products.css';

const FEATURED = productsData.slice(0, 3);

const Products = () => {
  return (
    <section className="hp-products-section" id="products">
      <div className="hp-prod-inner">

        {/* Section Header */}
        <motion.div
          className="hp-prod-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="hp-prod-kicker">Our Products</span>
          <h2 className="hp-prod-headline">Precision instruments for every discipline.</h2>
          <p className="hp-prod-subtitle">From analytical instruments and lab automation to molecular biology reagents and water purification systems — a complete catalogue for every lab need.</p>
        </motion.div>

        {/* 3 Featured Product Category Cards */}
        <div className="hp-prod-featured-grid">
          {FEATURED.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.id}
                className="hp-prod-feat-wrap"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link to={`/products/${cat.id}`} className="hp-prod-feat-card">

                  <div className="hp-prod-feat-img-wrap">
                    <img src={cat.image} alt={cat.title} className="hp-prod-feat-img" />
                    <div className="hp-prod-feat-gradient" />
                  </div>

                  <div className="hp-prod-feat-top">
                    <span className="hp-prod-feat-badge" style={{ background: `${cat.color}22`, color: cat.color, border: `1px solid ${cat.color}44` }}>
                      <Icon size={13} />
                      {cat.shortTitle}
                    </span>
                  </div>

                  <div className="hp-prod-feat-bottom">
                    <div>
                      <h3 className="hp-prod-feat-title">{cat.title}</h3>
                      <p className="hp-prod-feat-overview">{cat.overview}</p>
                    </div>
                    <span className="hp-prod-feat-cta" style={{ background: cat.color }}>
                      Explore <ArrowRight size={14} />
                    </span>
                  </div>

                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Footer CTA */}
        <motion.div
          className="hp-prod-footer"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link to="/products" className="hp-prod-explore-btn">
            <span>Explore All Product Categories</span>
            <ArrowRight size={18} />
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default Products;

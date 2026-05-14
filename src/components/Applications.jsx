import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { applicationsData } from '../data/applicationsData';
import './Applications.css';

const Applications = () => {
  return (
    <section className="applications-section" id="applications">
      <div className="app-inner">

        {/* Header row */}
        <div className="app-header-row">
          <motion.div
            className="app-header-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="app-kicker">Our Applications</span>
            <h2 className="app-headline">Solutions for every scientific challenge.</h2>
          </motion.div>

          <motion.div
            className="app-header-right"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="app-desc">
              From molecular diagnostics and cell biology to forensic science, lab automation, and turnkey lab design — we deliver end-to-end solutions across every laboratory discipline.
            </p>
            <Link to="/applications" className="app-explore-btn">
              <span>Explore All Applications</span>
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>

        {/* Grid of 15 application cards */}
        <div className="app-grid">
          {applicationsData.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: (i % 5) * 0.07, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link to={`/applications/${item.id}`} className="app-grid-card">
                  <div className="app-grid-card-img-wrap">
                    <img src={item.image} alt={item.title} className="app-grid-card-img" />
                    <div className="app-grid-card-overlay" style={{ background: `linear-gradient(to top, ${item.color}cc 0%, ${item.color}22 55%, transparent 100%)` }} />
                  </div>
                  <div className="app-grid-card-body">
                    <div className="app-grid-card-icon" style={{ background: `${item.color}20`, color: item.color }}>
                      <Icon size={18} />
                    </div>
                    <h3 className="app-grid-card-title">{item.title}</h3>
                    <span className="app-grid-card-arrow" style={{ color: item.color }}>
                      <ArrowRight size={15} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Applications;

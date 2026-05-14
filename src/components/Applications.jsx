import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { applicationsData } from '../data/applicationsData';
import './Applications.css';

const Applications = () => {
  return (
    <section className="applications-section" id="applications">
      <div className="app-layout">

        {/* Left Typography */}
        <motion.div
          className="app-left"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="app-kicker">Our Applications</span>
          <h2 className="app-headline">Solutions for every scientific challenge.</h2>
          <p className="app-desc">From clinical diagnostics and life sciences research to food safety testing, pharmaceutical development, and forensic analysis — we deliver end-to-end laboratory solutions across critical industry verticals.</p>

          <Link to="/applications" className="app-explore-btn">
            <span>Explore All Applications</span>
            <ArrowRight size={18} />
          </Link>
        </motion.div>

        {/* Right: Application Cards */}
        <div className="app-cards-column">
          {applicationsData.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link to={`/applications/${item.id}`} className="app-area-card">
                  <img src={item.image} alt={item.title} className="app-area-card-img" />
                  <div className="app-area-card-overlay" />
                  <div className="app-area-card-body">
                    <div className="app-area-card-badge" style={{ background: item.color }}>
                      <Icon size={14} />
                      <span>{item.shortTitle}</span>
                    </div>
                    <div className="app-area-card-info">
                      <h3>{item.title}</h3>
                      <span className="app-area-card-cta">
                        Explore <ArrowRight size={14} />
                      </span>
                    </div>
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

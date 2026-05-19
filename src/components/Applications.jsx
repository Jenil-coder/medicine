import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { applicationsData } from '../data/applicationsData';
import './Applications.css';

const FEATURED = applicationsData.slice(0, 3);

const Applications = () => {
  return (
    <section className="applications-section" id="applications">
      <div className="app-inner">

        {/* Header — kicker + headline only */}
        <motion.div
          className="app-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="app-kicker">Our Applications</span>
          <h2 className="app-headline">Solutions for every scientific challenge.</h2>
          <p className="app-subtitle">From molecular diagnostics and cell biology to forensic science and lab automation — end-to-end solutions across every laboratory discipline.</p>
        </motion.div>

        {/* 3 featured cards */}
        <div className="app-featured-grid">
          {FEATURED.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                className="app-feat-wrap"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link to={`/applications/${item.id}`} className="app-feat-card">

                  <div className="app-feat-img-wrap">
                    <img src={item.image} alt={item.title} className="app-feat-img" />
                    <div className="app-feat-gradient" />
                  </div>

                  <div className="app-feat-top">
                    <span className="app-feat-badge" style={{ background: `${item.color}22`, color: item.color, border: `1px solid ${item.color}44` }}>
                      <Icon size={13} />
                      {item.shortTitle}
                    </span>
                  </div>

                  <div className="app-feat-bottom">
                    <div>
                      <h3 className="app-feat-title">{item.title}</h3>
                      <p className="app-feat-overview">{item.overview}</p>
                    </div>
                    <div className="app-feat-actions">
                      <span className="app-feat-cta" style={{ background: item.color }}>
                        Explore <ArrowRight size={14} />
                      </span>
                      <span className="app-feat-detail-btn" style={{ '--btn-color': item.color }}>
                        View Detail <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>

                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Footer — description + CTA centered below cards */}
        <motion.div
          className="app-footer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link to="/applications" className="app-explore-btn">
            <span>Explore All Applications</span>
            <ArrowRight size={18} />
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default Applications;

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './ServicesPage.css';

const ServicesPage = () => {
  return (
    <main className="services-page">
      {/* Hero Section */}
      <section className="services-hero">
        <motion.span 
          className="services-tag"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Authorized Service Provider
        </motion.span>
        
        <motion.h1 
          className="services-hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Uncompromising <br/> Technical Support.
        </motion.h1>
        
        <motion.p 
          className="services-hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Factory-trained engineers delivering precision calibration, rigorous validation, and zero-downtime maintenance for modern laboratories.
        </motion.p>
      </section>

      {/* Modern Bento Box Grid */}
      <section className="bento-container">
        <motion.div 
          className="bento-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
            hidden: {}
          }}
        >

          {/* 1. Large Feature Card: Installation */}
          <motion.div 
            className="bento-card span-2 row-span-2"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" }}
            }}
          >
            <div className="bento-img-wrapper">
              <img src="https://www.inventasystems.in/assets/images/slider/slide-1.jpg" alt="Installation" className="bento-img" />
              <div className="bento-overlay" />
            </div>
            <div className="bento-content">
              <span className="bento-num">01. Service</span>
              <h2 className="bento-title">Installation &<br/> Site Visits</h2>
              <p className="bento-desc">We ensure your laboratory equipment is installed optimally. Our engineers perform rigorous unboxing, site preparation, and integration following strict factory protocols.</p>
              <ul className="bento-features">
                <li>Spatial Planning</li>
                <li>Factory Protocols</li>
                <li>Power Compliance</li>
                <li>Operational Training</li>
              </ul>
            </div>
          </motion.div>

          {/* 2. Text Only: Thermo Fisher */}
          <motion.div 
            className="bento-card text-only"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" }}
            }}
          >
            <div className="bento-content">
              <span className="bento-num">Partnership</span>
              <h2 className="bento-title">Thermo Fisher Scientific</h2>
              <p className="bento-desc" style={{ color: '#aaa' }}>Official authorized service provider. We carry genuine parts and factory certifications.</p>
            </div>
          </motion.div>

          {/* 3. Small Feature Card: Calibration */}
          <motion.div 
            className="bento-card"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" }}
            }}
          >
            <div className="bento-img-wrapper">
              <img src="https://www.inventasystems.in/assets/images/slider/slider-5.jpg" alt="Calibration" className="bento-img" />
              <div className="bento-overlay" />
            </div>
            <div className="bento-content">
              <span className="bento-num">02. Validation</span>
              <h2 className="bento-title">Calibration</h2>
              <ul className="bento-features">
                <li>IQ & OQ Protocols</li>
                <li>IPV Verification</li>
              </ul>
            </div>
          </motion.div>

          {/* 4. Wide Feature Card: Maintenance */}
          <motion.div 
            className="bento-card span-2"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" }}
            }}
          >
            <div className="bento-img-wrapper">
              <img src="https://www.inventasystems.in/assets/images/about-s3-pic.jpg" alt="Maintenance" className="bento-img" />
              <div className="bento-overlay" />
            </div>
            <div className="bento-content">
              <span className="bento-num">03. Support</span>
              <h2 className="bento-title">AMC / CMC Contracts</h2>
              <p className="bento-desc">Minimize downtime with tiered maintenance. We keep extensive genuine spare parts ready for rapid response.</p>
              <ul className="bento-features">
                <li>Preventive Maintenance</li>
                <li>Priority Support</li>
                <li>Genuine Spares</li>
              </ul>
            </div>
          </motion.div>

          {/* 5. Text Only: Contact CTA */}
          <motion.div 
            className="bento-card text-only"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" }}
            }}
          >
            <div className="bento-content">
               <h2 className="bento-title" style={{ fontSize: '1.8rem', marginBottom: '16px'}}>Need Support?</h2>
               <p className="bento-desc" style={{ color: '#aaa', marginBottom: '24px' }}>Our technical team is ready to assist you.</p>
               <Link to="/#contact" className="bento-cta">
                  Book Engineer <ArrowRight size={18} />
               </Link>
            </div>
          </motion.div>

        </motion.div>
      </section>
    </main>
  );
};

export default ServicesPage;

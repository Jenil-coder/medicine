import React from 'react';
import { motion } from 'framer-motion';
import './CareersPage.css';

const CareersPage = () => {
  return (
    <main className="careers-page">
      <section className="careers-hero">
        <motion.h1 
          className="careers-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Shape the Future of Life Sciences.
        </motion.h1>
        <motion.p 
          className="careers-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Join Inventa Systems, Gujarat's leading authorized distributor of advanced laboratory equipment and discover a career that fuels innovation.
        </motion.p>
      </section>

      <section className="culture-section">
        <motion.div 
          className="perks-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
            hidden: {}
          }}
        >
          <motion.div className="perk-card" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <h3>Continuous Learning</h3>
            <p>Work directly with state-of-the-art technologies from top global manufacturers like Thermo Fisher Scientific. We invest heavily in your technical training.</p>
          </motion.div>
          <motion.div className="perk-card" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <h3>Impactful Work</h3>
            <p>Our solutions directly support molecular biology, forensics, genomics, and diagnostics labs working on life-changing research.</p>
          </motion.div>
          <motion.div className="perk-card" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <h3>State of the Art Facilities</h3>
            <p>Operate out of our premium offices and 15,000 sq.ft warehouse in Ahmedabad, designed for efficiency and collaboration.</p>
          </motion.div>
        </motion.div>

        <motion.div 
          className="open-roles"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="roles-title">Current Opportunities</h2>
          <p className="roles-desc">
            We are always on the lookout for talented Service Engineers, Sales Experts, and Technical Support Specialists who are passionate about the scientific sector.
          </p>
          <a href="mailto:inquiry@inventasystems.in?subject=Careers%20Application" className="apply-cta">
            Send Us Your Resume
          </a>
        </motion.div>
      </section>
    </main>
  );
};

export default CareersPage;

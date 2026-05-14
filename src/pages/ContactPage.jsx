import React from 'react';
import { motion } from 'framer-motion';
import './ContactPage.css';

const ContactPage = () => {
  return (
    <main className="contact-page">
      <section className="contact-hero">
        <motion.h1 
          className="contact-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Let's Start a Conversation.
        </motion.h1>
        <motion.p 
          className="contact-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Reach out to our expert team for product inquiries, maintenance contracts, or service calibration requests.
        </motion.p>
      </section>

      <section className="contact-container">
        {/* Left: Interactive Form */}
        <motion.div 
          className="contact-form-side"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" placeholder="Dr. John Doe" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" placeholder="john@laboratory.com" required />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" placeholder="Equipment Calibration Request" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" rows={5} placeholder="How can we help you?" required></textarea>
            </div>
            <button type="submit" className="submit-btn" onClick={() => alert("Message sent effectively!")}>
              Send Inquiry
            </button>
          </form>
        </motion.div>

        {/* Right: Bento Address & Info */}
        <motion.div 
          className="contact-info-side"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="info-card">
            <span className="info-label">Headquarters</span>
            <p className="info-value">
              510 & 507 Anand Mangal-3 <br/>
              Near Hira Baug Crossing, Ambawadi <br/>
              Ahmedabad 380006, Gujarat
            </p>
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
            <div className="info-card light" style={{ flex: 1 }}>
              <span className="info-label">Email Us</span>
              <p className="info-value">
                <a href="mailto:inquiry@inventasystems.in">inquiry@inventasystems.in</a>
              </p>
            </div>
            
            <div className="info-card light" style={{ flex: 1 }}>
              <span className="info-label">Call Us</span>
              <p className="info-value">
                <a href="tel:+918734013927">+91 87340 13927</a><br/>
                <a href="tel:+917698186968">+91 7698 186968</a>
              </p>
            </div>
          </div>

          <div className="info-card light">
             <span className="info-label">Business Hours</span>
             <p className="info-value">
                Monday — Friday <br/>
                8:00 AM — 7:00 PM
             </p>
          </div>
        </motion.div>
      </section>
    </main>
  );
};

export default ContactPage;

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import './AboutPage.css';

// Reusing the smooth counter hook for the stats
const useCounter = (target, duration = 2000, inView = false) => {
  const [count, setCount] = useState(0);
  const isNumber = !isNaN(parseFloat(target));

  useEffect(() => {
    if (!inView || !isNumber) return;
    const end = parseFloat(target);
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, target, duration]);

  return isNumber ? count : target;
};

const StatBox = ({ value, label, suffix = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const animatedValue = useCounter(value, 2000, inView);

  return (
    <motion.div 
      ref={ref}
      className="stat-item"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <span className="stat-number">
        {typeof value === 'number' ? animatedValue : value}{suffix}
      </span>
      <span className="stat-label">{label}</span>
    </motion.div>
  );
};

const AboutPage = () => {
  const imgRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: imgRef,
    offset: ["start end", "end start"]
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <main className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <motion.div 
          className="about-kicker"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <span className="kicker-line" />
          Our Vision
        </motion.div>
        
        <motion.h1 
          className="about-hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          To become a leading <span className="about-gradient-word">Life Science Distributor</span> in India.
        </motion.h1>
        
        <motion.p 
          className="about-vision"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Providing a wide range of revolutionary scientific products for every researcher and diagnostic customer through trust-based relationships.
        </motion.p>
      </section>

      {/* Stats with Parallax Image */}
      <section className="about-statsing" ref={imgRef}>
        <motion.img 
          style={{ y: yParallax }}
          src="https://www.inventasystems.in/assets/images/about-s3-pic.jpg" 
          alt="Inventa Facilities"
          className="about-huge-img"
        />
        <div className="about-stats-grid">
          <StatBox value={2017} label="Established" />
          <StatBox value={15} suffix="K" label="Sq. Ft. Warehouse" />
          <StatBox value="#1" label="In Gujarat" />
        </div>
      </section>

      {/* Content Grid */}
      <section className="about-content-grid">
        <motion.div 
          className="content-block"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
        >
          <h2>Who We Are</h2>
          <p>
            With more than four years of experience in the science and plastic labware industry, Inventa Systems is a leader in Gujarat for supplying laboratory plastic ware used in molecular biology, cell culture, genomics, proteomics, and immunology.
          </p>
          <p>
            Operating a state-of-the-art 15,000 sq. ft. company-owned warehouse in Ahmedabad, we ensure secure and precise storage for scientific products, including highly sensitive and perishable items.
          </p>
        </motion.div>

        <motion.div 
          className="content-block"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2>Delivering Solutions</h2>
          <p>
            Our dedication as a product distributor makes us unique – it is our commitment to the best quality that makes laboratories across the country depend on us for consumables, reusables, and instruments. 
          </p>
          <p>
            Today, Inventa Systems is a leading authorized distributor of liquid handling systems, centrifuge ware, cryo labware, and advanced instruments, representing major manufacturers from the USA and Europe. The name Inventa is synonymous with innovation, togetherness, quality, and service.
          </p>
        </motion.div>
      </section>
    </main>
  );
};

export default AboutPage;

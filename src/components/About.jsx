import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import './About.css';

/* ── Animated Counter Hook ── */
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

/* ── Orbital Stat Badge Component ── */
const OrbitalStat = ({ value, suffix, label, className, parallaxY, delay }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const animatedValue = useCounter(value, 2200, inView);

  return (
    <motion.div 
      ref={ref}
      className={`orbital-stat ${className}`} 
      style={{ y: parallaxY }}
      initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="stat-glass-body">
        <span className="orbital-value">
          {typeof value === 'number' ? animatedValue : value}
          <span className="orbital-suffix">{suffix}</span>
        </span>
        <span className="orbital-label">{label}</span>
      </div>
    </motion.div>
  );
};

const About = () => {
  const containerRef = useRef(null);
  
  // Parallax scroll mapping (Standard scroll, no pinning)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Subtle parallax speeds (3-8% range to avoid dizziness)
  const yImage = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);
  const yTextPanel = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  
  const yStat1 = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const yStat2 = useTransform(scrollYProgress, [0, 1], ["4%", "-6%"]);
  const yStat3 = useTransform(scrollYProgress, [0, 1], ["2%", "-5%"]);

  return (
    <section className="about-canvas-wrapper" id="about" ref={containerRef}>
      
      {/* ── 1. The Massive Parallax Canvas Image ── */}
      <motion.div className="canvas-image-layer" style={{ y: yImage }}>
        <img 
          src="https://www.inventasystems.in/assets/images/about-s3-pic.jpg" 
          alt="Inventa Systems Laboratory" 
          className="canvas-main-img" 
        />
        <div className="canvas-img-gradient" />
      </motion.div>

      {/* ── 2. The Overlapping Frosted Glass Text Panel ── */}
      <motion.div 
        className="canvas-text-panel"
        style={{ y: yTextPanel }}
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="about-kicker">
          <span className="kicker-line" />
          Who We Are
        </span>
        <h2 className="about-title">
          Synonymous with <span className="about-gradient-word">innovation</span>, <br />
          <span className="about-gradient-word">togetherness</span>, <span className="about-gradient-word">quality</span>, <br />
          and <span className="about-gradient-word">service</span>.
        </h2>
        
        <div className="about-paragraphs">
          <p>
            Inventa Systems began its journey in 2017 under the visionary leadership of Joy Patel. We are a leading channel partner in Life Science and Analytical segments, focusing on Veterinary Science, Genomics, Molecular Biology, Forensic Science, and Immunology.
          </p>
          <p>
            Over the past nine years, we have grown to a team of over 51 professionals. Operating from our 15,000 sq. ft. company-owned warehouse in Ahmedabad, we proudly represent major USA and European brands across India.
          </p>
        </div>

        <button className="canvas-explore-btn">
          <span>Explore Our Story</span>
          <ArrowUpRight size={18} strokeWidth={2.5} />
        </button>
      </motion.div>

      {/* ── 3. Orbital Free-Floating Stats ── */}
      <OrbitalStat 
        className="stat-position-1" 
        value={1500} suffix="+" label="Clients Served" 
        parallaxY={yStat1} delay={0.2} 
      />
      
      <OrbitalStat 
        className="stat-position-2" 
        value={1750} suffix="+" label="Installations" 
        parallaxY={yStat2} delay={0.4} 
      />

      <OrbitalStat 
        className="stat-position-3" 
        value={51} suffix="+" label="Professionals" 
        parallaxY={yStat3} delay={0.3} 
      />

    </section>
  );
};

export default About;

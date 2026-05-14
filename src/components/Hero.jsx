import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Hero.css';

/* ── Frame-by-Frame Local Animation Sequence ── */
// Dynamically loads all frames from assets/frames/ (currently 294 frames for buttery smooth playback)
const frameModules = import.meta.glob('../assets/frames/*.{png,jpg,jpeg,webp}', { eager: true });

// Convert object to a sorted array of image URLs
const frames = Object.keys(frameModules)
  // Numeric sorting so "002.png" comes before "100.png"
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
  .map((key) => frameModules[key].default || frameModules[key]);

const frameCount = frames.length > 0 ? frames.length : 147;
const currentFrame = (index) => {
  // If local frames exist, serve them. Otherwise, fallback.
  if (frames.length > 0 && frames[index]) {
    return frames[index];
  }
  return `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${(index + 1).toString().padStart(4, '0')}.jpg`;
};

/* ── Text sections with associated real Inventa content ── */
const scrollSections = [
  {
    id: 'intro',
    kicker: 'INVENTA SYSTEMS',
    headline: 'Leading Life Science Distributor.',
    description: 'Gujarat\'s premier authorized distributor of high-end analytical instruments, centrifuges, and critical laboratory plastic ware since 2017.',
    cta: { primary: 'Explore Applications', secondary: 'Learn About Us' },
    productImage: 'https://www.inventasystems.in/assets/images/slider/slide-1.jpg'
  },
  {
    id: 'precision',
    kicker: 'THERMO FISHER SCIENTIFIC',
    headline: 'Authorized Service Provider.',
    description: 'Certified service partner for PCR, RT-PCR, Centrifuges, Microscopes, Plate Readers, and a wide range of Thermo Fisher Scientific equipment.',
    cta: { primary: 'Our Services', secondary: 'Request Service' },
    productImage: 'https://www.inventasystems.in/assets/images/slider/slider-5.jpg'
  },
  {
    id: 'integration',
    kicker: 'INNOVATION & QUALITY',
    headline: 'Delivering Life-Changing Solutions.',
    description: 'From molecular biology to forensic science, we supply consumables, reusables, and cutting-edge instruments to diagnostics labs, pharma companies, and research academia across India.',
    cta: { primary: 'Explore Catalog', secondary: 'Get a Quote' },
    productImage: 'https://www.inventasystems.in/assets/images/about-s3-pic.jpg'
  },
];

/* ── Marquee data - real Inventa focus areas ── */
const marqueeItems = [
  { label: 'Molecular Biology', image: 'https://www.inventasystems.in/assets/images/projects/pcr1.jpg' },
  { label: 'Cell Culture', image: 'https://www.inventasystems.in/assets/images/projects/general-lab-ware1.jpg' },
  { label: 'Genomics', image: 'https://www.inventasystems.in/assets/images/projects/centrifuge-ware1.jpg' },
  { label: 'Proteomics', image: 'https://www.inventasystems.in/assets/images/projects/boxes-racks1.jpg' },
  { label: 'Immunology', image: 'https://www.inventasystems.in/assets/images/about-s3-pic.jpg' },
  { label: 'PCR Instruments', image: 'https://www.inventasystems.in/assets/images/projects/pcr1.jpg' },
  { label: 'Centrifuges', image: 'https://www.inventasystems.in/assets/images/projects/centrifuge-ware1.jpg' },
  { label: 'Forensic Science', image: 'https://www.inventasystems.in/assets/images/projects/general-lab-ware1.jpg' },
];

/* ── Marquee Row ── */
const MarqueeRow = ({ items, speed = 25, onItemHover, onItemLeave, hoveredItem }) => {
  const tripled = [...items, ...items, ...items];
  return (
    <div className="marquee-track-wrapper">
      <div className="marquee-track" style={{ '--marquee-duration': `${speed}s` }}>
        {tripled.map((item, i) => (
          <div
            key={`${item.label}-${i}`}
            className={`marquee-item ${hoveredItem?.label === item.label ? 'is-hovered' : ''}`}
            onMouseEnter={() => onItemHover(item)}
            onMouseLeave={onItemLeave}
          >
            <span className="marquee-dot" />
            <span className="marquee-text">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Scroll Progress Dots ── */
const ScrollDots = ({ activeIndex, total }) => (
  <div className="scroll-dots">
    {Array.from({ length: total }, (_, i) => (
      <div key={i} className={`scroll-dot ${i === activeIndex ? 'active' : ''}`} />
    ))}
  </div>
);

const Hero = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState(0);
  const sectionRef = useRef(null);

  // ── High-performance frame animation engine ──
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);         // cached canvas context
  const bitmapsRef = useRef([]);       // GPU-ready ImageBitmap objects
  const lastDrawn = useRef(-1);        // skip redundant draws
  const coverParams = useRef(null);    // cached cover-fit calculations

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  // ── Draw a specific frame onto the canvas (only if changed) ──
  const drawFrame = (index) => {
    if (index === lastDrawn.current) return; // no-op if same frame
    const ctx = ctxRef.current;
    const bmp = bitmapsRef.current[index];
    if (!ctx || !bmp) return;

    const p = coverParams.current;
    if (!p) return;

    ctx.clearRect(0, 0, p.cw, p.ch);
    ctx.drawImage(bmp, p.sx, p.sy, p.sw, p.sh);
    lastDrawn.current = index;
  };

  // ── Recalculate the cover-fit parameters (called on resize) ──
  const calcCover = (sampleBitmap) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cw = canvas.width;
    const ch = canvas.height;
    const iw = sampleBitmap.width;
    const ih = sampleBitmap.height;
    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale;
    const sh = ih * scale;
    coverParams.current = {
      cw, ch,
      sw, sh,
      sx: cw - sw,    // align right (object-position: right)
      sy: (ch - sh) / 2,  // center vertically
    };
  };

  // ── Size the canvas at full device resolution ──
  const sizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    const dpr = window.devicePixelRatio || 1;
    const w = parent.offsetWidth;
    const h = parent.offsetHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctxRef.current = canvas.getContext('2d', { alpha: false });
    // Recalculate cover params if we have bitmaps
    if (bitmapsRef.current[0]) {
      calcCover(bitmapsRef.current[0]);
    }
    // Force redraw at new resolution
    lastDrawn.current = -1;
  };

  // ── Preload all frames as GPU-ready ImageBitmaps ──
  useEffect(() => {
    let cancelled = false;
    const bitmaps = new Array(frameCount).fill(null);
    bitmapsRef.current = bitmaps;

    // Load frames in priority order: first frame immediately, then the rest
    const loadFrame = async (i) => {
      try {
        const resp = await fetch(currentFrame(i));
        const blob = await resp.blob();
        if (cancelled) return;
        const bmp = await createImageBitmap(blob);
        if (cancelled) { bmp.close(); return; }
        bitmaps[i] = bmp;
        // Show first frame immediately
        if (i === 0) {
          sizeCanvas();
          calcCover(bmp);
          drawFrame(0);
        }
      } catch (e) {
        // silently skip failed frames
      }
    };

    // Load first frame with top priority, then batch the rest
    loadFrame(0).then(() => {
      const promises = [];
      for (let i = 1; i < frameCount; i++) {
        promises.push(loadFrame(i));
      }
      return Promise.all(promises);
    });

    window.addEventListener('resize', sizeCanvas);
    sizeCanvas();

    return () => {
      cancelled = true;
      window.removeEventListener('resize', sizeCanvas);
      // Clean up bitmaps
      bitmaps.forEach(b => b && b.close());
    };
  }, []);

  // ── Scroll-driven section switcher ──
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / sectionHeight));

      const sectionCount = scrollSections.length;
      const newSection = Math.min(sectionCount - 1, Math.floor(progress * sectionCount));
      setActiveSection(newSection);

      // Direct mapping — zero delay, instant frame response
      const frameIndex = Math.min(frameCount - 1, Math.max(0, Math.floor(progress * frameCount)));
      requestAnimationFrame(() => drawFrame(frameIndex));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentSection = scrollSections[activeSection];

  return (
    <section className="hero-scroll-wrapper" ref={sectionRef} onMouseMove={handleMouseMove}>
      <div className="hero-sticky">
        
        {/* Right Side: Product Spotlight — DPI-aware canvas */}
        <div className="hero-product-spotlight">
          <canvas
            ref={canvasRef}
            className="spotlight-canvas"
          />
          {/* Subtle vignette/fade so the image blends smoothly with the background */}
          <div className="spotlight-fade-left"></div>
          <div className="spotlight-fade-bottom"></div>
        </div>

        {/* Scroll progress dots (right side) */}
        <ScrollDots activeIndex={activeSection} total={scrollSections.length} />

        {/* Text Content — animates between sections (Left Side) */}
        <div className="hero-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection.id}
              className="hero-text-block"
              initial={{ opacity: 0, y: 40, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -40, filter: 'blur(4px)' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Kicker */}
              <div className="hero-kicker">
                <span className="kicker-line" />
                <span>{currentSection.kicker}</span>
              </div>

              {/* Headline */}
              <h1 className="hero-headline">{currentSection.headline}</h1>

              {/* Description */}
              <p className="hero-description">{currentSection.description}</p>

              {/* CTAs */}
              <div className="hero-ctas">
                <a href="#applications" className="cta-primary">
                  {currentSection.cta.primary}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a href="#about" className="cta-secondary">{currentSection.cta.secondary}</a>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Stats — always visible */}
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">2017</span>
              <span className="stat-label">Established</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-number">15K</span>
              <span className="stat-label">Sq Ft Warehouse</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-number">7+</span>
              <span className="stat-label">Product Lines</span>
            </div>
          </div>
        </div>

        {/* Marquee at bottom */}
        <div className="hero-marquee-section">
          <MarqueeRow
            items={marqueeItems}
            speed={25}
            onItemHover={setHoveredItem}
            onItemLeave={() => setHoveredItem(null)}
            hoveredItem={hoveredItem}
          />
        </div>

        {/* Floating hover image */}
        <AnimatePresence>
          {hoveredItem && (
            <motion.div
              className="marquee-hover-image"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{ left: mousePos.x - 170, top: mousePos.y - 280 }}
            >
              <motion.img
                key={hoveredItem.label}
                src={hoveredItem.image}
                alt={hoveredItem.label}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Hero;

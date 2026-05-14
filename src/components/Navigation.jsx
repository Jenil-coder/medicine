import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ArrowRight, Menu, X, FlaskConical, Microscope, UtensilsCrossed, Pill, Fingerprint, Wrench, Settings, ClipboardCheck, Syringe, Eye, Box, TestTube, Scale, HeartPulse, CheckCircle2, Droplets, Bug, ShieldCheck } from 'lucide-react';
import './Navigation.css';

const navData = [
  { title: 'About Us', href: '/about', hasDropdown: false },
  {
    title: 'Applications',
    href: '/applications',
    hasDropdown: true,
    items: [
      { id: 'a1', title: 'Molecular Biology', description: 'PCR, RTPCR, NGS, and Micro Array.', icon: Microscope, image: '/pcr_real.png' },
      { id: 'a2', title: 'Microbiology', description: 'Culture media, incubators, and sterilizers.', icon: Bug, image: '/pathogen_virology.png' },
      { id: 'a3', title: 'Forensics', description: 'DNA analysis, toxicology, and crime scenes.', icon: Fingerprint, image: '/dna_rna_extraction.png' },
      { id: 'a4', title: 'Biopharmaceuticals', description: 'Drug development and bioprocessing.', icon: Pill, image: '/pharma_biopharma.png' },
      { id: 'a5', title: 'Immunology', description: 'Flow cytometers and ELISA kits.', icon: ShieldCheck, image: '/cell_culture.png' },
      { id: 'a6', title: 'Point of Care Testing', description: 'Portable and rapid diagnostic devices.', icon: HeartPulse, image: '/poc_testing.png' },
      { id: 'a7', title: 'Blood Bank Services', description: 'Blood analyzers and storage systems.', icon: Droplets, image: '/biobanking_storage.png' },
      { id: 'a8', title: 'Rapid Testing', description: 'Test kits for infectious diseases.', icon: CheckCircle2, image: '/pathogen_virology.png' },
      { id: 'a9', title: 'Liquid Handling', description: 'Precision pipettes and automated handlers.', icon: Syringe, image: '/food_beverage.png' },
      { id: 'a10', title: 'Cytology & Histopathology', description: 'Microscopes and staining kits.', icon: Eye, image: '/cell_gene_therapy.png' },
      { id: 'a11', title: 'Laboratory Equipment', description: 'Centrifuges, autoclaves, and freezers.', icon: Box, image: '/clinical_diagnostics.png' },
      { id: 'a12', title: 'Lab Disposables', description: 'Quality consumables like tips and tubes.', icon: TestTube, image: '/dna_rna_extraction.png' },
      { id: 'a13', title: 'Turnkey Solutions', description: 'Custom laboratory setup solutions.', icon: Scale, image: '/life_sciences.png' }
    ]
  },
  {
    title: 'Services',
    href: '/services',
    hasDropdown: true,
    items: [
      {
        id: 's1',
        title: 'Installation & Site Visits',
        description: 'Precision setup of PCR, RT-PCR, Centrifuges, Microscopes, and more.',
        icon: Wrench,
        image: 'https://www.inventasystems.in/assets/images/slider/slide-1.jpg'
      },
      {
        id: 's2',
        title: 'Calibration & Validation',
        description: 'Authorized IQ/OQ/IPV protocols for Thermo Fisher equipment.',
        icon: ClipboardCheck,
        image: 'https://www.inventasystems.in/assets/images/slider/slider-5.jpg'
      },
      {
        id: 's3',
        title: 'AMC/CMC & Spare Parts',
        description: 'Comprehensive maintenance contracts with genuine spare parts.',
        icon: Settings,
        image: 'https://www.inventasystems.in/assets/images/about-s3-pic.jpg'
      }
    ]
  },
  { title: 'Careers', href: '/careers', hasDropdown: false },
  { title: 'Enquiry', href: '/contact', hasDropdown: false },
  { title: 'Contact Us', href: '/contact', hasDropdown: false }
];

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [activeMenuIndex, setActiveMenuIndex] = useState(null);
  const [hoveredSubItem, setHoveredSubItem] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const location = useLocation();
  const closeDropdownTimer = useRef(null);
  const lastScrollY = useRef(0);

  // Close menus on route change
  useEffect(() => {
    setActiveMenuIndex(null);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Scroll listener for Normal -> Pill morphing AND Auto-Hide
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY.current && currentScrollY > 200) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (index) => {
    if (navData[index].hasDropdown) {
      if (closeDropdownTimer.current) clearTimeout(closeDropdownTimer.current);
      setActiveMenuIndex(index);
      
      // Default to the first item's image when opening a menu
      if (!hoveredSubItem || !navData[index].items.find(i => i.id === hoveredSubItem?.id)) {
        setHoveredSubItem(navData[index].items[0]);
      }
    } else {
      setActiveMenuIndex(null);
    }
  };

  const handleMouseLeave = () => {
    closeDropdownTimer.current = setTimeout(() => {
      setActiveMenuIndex(null);
    }, 200);
  };

  const handleSubItemHover = (item) => {
    setHoveredSubItem(item);
  };

  return (
    <>
      <header className={`nav-header ${isScrolled ? 'is-pill' : 'is-normal'} ${isHidden ? 'is-hidden' : ''}`}>
        <div 
          className="nav-bar-container"
          onMouseLeave={handleMouseLeave}
        >
          {/* Logo */}
          <Link to="/" className="nav-logo">
            <img src="https://www.inventasystems.in/assets/images/logo/Inventa-Systems-Logo-Final.png" alt="Inventa Systems Logo" style={{ maxHeight: '44px', width: 'auto' }} />
          </Link>

          {/* Links cluster */}
          <nav className="nav-links">
            {navData.map((link, index) => (
              <div 
                key={link.title} 
                className="nav-link-wrapper"
                onMouseEnter={() => handleMouseEnter(index)}
              >
                <Link to={link.href} className={`nav-link ${activeMenuIndex === index ? 'active' : ''}`}>
                  {link.title}
                  {link.hasDropdown && (
                    <motion.span
                      className="nav-chevron"
                      animate={{ rotate: activeMenuIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <ChevronDown size={14} />
                    </motion.span>
                  )}
                </Link>
              </div>
            ))}
          </nav>

          {/* Right side CTA  */}
          <div className="nav-actions">
            <Link to="/contact" className="cta-btn">Request Quote</Link>
            <button className="mobile-trigger" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
          </div>

          {/* ===== THE SPLIT-PANE MEGA MENU ===== */}
          <AnimatePresence>
            {activeMenuIndex !== null && navData[activeMenuIndex].hasDropdown && (
              <motion.div
                className="dynamic-mega-menu"
                initial={{ opacity: 0, y: 10, scale: 0.98, x: "-50%" }}
                animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
                exit={{ opacity: 0, y: 5, scale: 0.98, x: "-50%" }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => {
                  if (closeDropdownTimer.current) clearTimeout(closeDropdownTimer.current);
                }}
                onMouseLeave={handleMouseLeave}
              >
                <div className="mega-menu-inner">
                  {/* LEFT PANE: Links */}
                  <div className="mega-left-pane">
                    <h4 className="mega-pane-title">Explore {navData[activeMenuIndex].title}</h4>
                    <div className="mega-sub-links">
                      {navData[activeMenuIndex].items.map((item, i) => {
                        const Icon = item.icon;
                        const isActive = hoveredSubItem?.id === item.id;
                        
                        return (
                          <div 
                            key={item.id}
                            className={`mega-sub-item ${isActive ? 'active' : ''}`}
                            onMouseEnter={() => handleSubItemHover(item)}
                          >
                            <div className="sub-item-icon">
                              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                            </div>
                            <div className="sub-item-text">
                              <span className="sub-title">{item.title}</span>
                              <p className="sub-desc">{item.description}</p>
                            </div>
                            <motion.div 
                              className="sub-arrow"
                              initial={false}
                              animate={{ 
                                opacity: isActive ? 1 : 0, 
                                x: isActive ? 0 : -10 
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              <ArrowRight size={16} />
                            </motion.div>
                          </div>
                        );
                      })}
                    </div>
                    <Link 
                      to={navData[activeMenuIndex].href} 
                      className="mega-explore-more"
                      onClick={() => setActiveMenuIndex(null)}
                    >
                      <span>Explore All {navData[activeMenuIndex].title}</span>
                      <ArrowRight size={16} />
                    </Link>
                  </div>

                  {/* RIGHT PANE: Dynamic Image Crossfade */}
                  <div className="mega-right-pane">
                    <div className="mega-image-container">
                      <AnimatePresence mode="popLayout">
                        <motion.img 
                          key={hoveredSubItem?.id}
                          src={hoveredSubItem?.image}
                          alt={hoveredSubItem?.title}
                          className="mega-photo"
                          initial={{ opacity: 0, scale: 1.05 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                        />
                      </AnimatePresence>
                      
                      {/* Overlay gradient to make text readable over the image */}
                      <div className="image-overlay" />
                      
                      {/* Image caption/tag */}
                      <motion.div 
                        key={`${hoveredSubItem?.id}-tag`}
                        className="image-caption"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.3 }}
                      >
                        Featured: {hoveredSubItem?.title}
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Dim Overlay when Menu is open */}
      <AnimatePresence>
        {activeMenuIndex !== null && (
          <motion.div 
            className="global-dim-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="mobile-full-menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="mobile-header">
              <img src="https://www.inventasystems.in/assets/images/logo/Inventa-Systems-Logo-Final.png" alt="Inventa Systems Logo" style={{ maxHeight: '40px' }} />
              <button className="mobile-close" onClick={() => setIsMobileMenuOpen(false)}>
                <X size={28} />
              </button>
            </div>
            <div className="mobile-links-container">
               {navData.map((link, i) => (
                 <motion.div 
                   key={link.title}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.1 + (i * 0.1) }}
                 >
                   <Link 
                     to={link.href}
                     className="mobile-link"
                     onClick={() => setIsMobileMenuOpen(false)}
                   >
                     {link.title}
                   </Link>
                 </motion.div>
               ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;

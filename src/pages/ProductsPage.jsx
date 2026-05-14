import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './ProductsPage.css';

const productsList = [
  {
    id: 'p1',
    category: 'Instruments',
    title: 'Real-Time PCR Systems',
    description: 'Advanced thermal cyclers for clinical diagnostic laboratories demanding rapid output.',
    features: ['Thermal Cyclers', 'Real-time PCR', 'PCR Consumables'],
    image: 'https://www.inventasystems.in/assets/images/projects/pcr1.jpg'
  },
  {
    id: 'p2',
    category: 'Consumables',
    title: 'Centrifuge Ware',
    description: 'High-speed centrifuge tubes engineered to withstand extreme centrifugal forces.',
    features: ['Micro Tubes', 'High-speed Rotors', 'Adapter Cushions'],
    image: 'https://www.inventasystems.in/assets/images/projects/centrifuge-ware1.jpg'
  },
  {
    id: 'p3',
    category: 'Consumables',
    title: 'General Lab Ware',
    description: 'Premium pipette tips, Petri dishes, bottles, and carboys designed for everyday accuracy.',
    features: ['Pipette Tips', 'Petri Dishes', 'Volumetric Flasks'],
    image: 'https://www.inventasystems.in/assets/images/projects/general-lab-ware1.jpg'
  },
  {
    id: 'p4',
    category: 'Storage',
    title: 'Cryoboxes & Racks',
    description: 'Space-optimized cryoboxes ensuring your sample integrity across long-term deep freeze.',
    features: ['Cryoboxes', 'Test Tube Racks', 'Minicoolers'],
    image: 'https://www.inventasystems.in/assets/images/projects/boxes-racks1.jpg'
  },
  {
    id: 'p5',
    category: 'Diagnostics',
    title: 'Covipath Solutions',
    description: 'Reliable pathogen testing and diagnostic infrastructure for scalable virology research.',
    features: ['Viral Transport Media', 'Extraction Kits', 'Swabs'],
    image: 'https://www.inventasystems.in/assets/images/slider/slide-1.jpg'
  },
  {
    id: 'p6',
    category: 'Diagnostics',
    title: 'Accula Systems',
    description: 'Rapid molecular diagnostic equipment yielding high-quality results in under 30 minutes.',
    features: ['Docking Stations', 'Test Cassettes', 'Nasal Swabs'],
    image: 'https://www.inventasystems.in/assets/images/slider/slider-5.jpg'
  },
  {
    id: 'p7',
    category: 'Reagents',
    title: 'Invitrogen Reagents',
    description: 'Cell culture, genomic, and molecular biology reagents powering advanced discovery.',
    features: ['Cell Culture Media', 'Transfection Reagents', 'Antibodies'],
    image: 'https://www.inventasystems.in/assets/images/about-s3-pic.jpg'
  }
];

const categories = ['All', 'Instruments', 'Consumables', 'Diagnostics', 'Storage', 'Reagents'];

// Custom 3D Tilt Card Component
const ProductCard = ({ product }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 40 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="grid-item-container"
    >
      <motion.div 
        className="product-card"
        style={{ rotateX, rotateY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="pc-image-wrapper">
          <img src={product.image} alt={product.title} className="pc-img" />
        </div>
        
        <div className="pc-content">
          <h3 className="pc-title">{product.title}</h3>
          <p className="pc-desc">{product.description}</p>
          
          <div className="pc-reveal">
            <ul className="pc-features">
              {product.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
            <a href="#quote" className="pc-cta">
              Add to Quote <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProductsPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = productsList.filter(p => 
    activeCategory === 'All' ? true : p.category === activeCategory
  );

  return (
    <main className="products-page">
      <section className="products-hero">
        <motion.h1 
          className="products-hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Equipment Catalog
        </motion.h1>
        <motion.p 
          className="products-hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Precision instruments and consumables to streamline your workflow.
        </motion.p>
        
        {/* Category Filters */}
        <motion.div 
          className="products-filters"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((cat) => (
            <button 
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </section>

      {/* Responsive Filterable Grid */}
      <motion.section 
        className="products-grid"
        layout
      >
        <AnimatePresence>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </AnimatePresence>
      </motion.section>
    </main>
  );
};

export default ProductsPage;

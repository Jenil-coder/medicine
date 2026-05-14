import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, X } from 'lucide-react';
import './Products.css';

const productCategories = [
  { 
    id: '1', 
    name: 'PCR Products', 
    desc: 'Advanced PCR consumables and instruments for molecular diagnostics and genomic research.',
    img: 'https://www.inventasystems.in/assets/images/projects/pcr1.jpg' 
  },
  { 
    id: '2', 
    name: 'Centrifuge Ware', 
    desc: 'High-speed centrifuge tubes, rotors, and accessories for precision sample separation.',
    img: 'https://www.inventasystems.in/assets/images/projects/centrifuge-ware1.jpg' 
  },
  { 
    id: '3', 
    name: 'General Lab Ware', 
    desc: 'Pipette tips, Petri dishes, measuring cylinders, bottles, carboys, and essential daily lab consumables.',
    img: 'https://www.inventasystems.in/assets/images/projects/general-lab-ware1.jpg' 
  }
];

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // Rotations for the 3 bundled cards
  const bundleRotations = [-6, 0, 6];
  const bundleOffsetsX = [-30, 0, 30];
  const bundleOffsetsY = [10, 0, 10];

  return (
    <section className="products-bundle-section" id="products">
      
      {/* ── Initial Flowing Layout ── */}
      <div className="pb-layout">
        
        {/* Left Typography */}
        <motion.div 
          className="pb-left"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="products-kicker">Our Product Range</span>
          <h2 className="products-headline">Precision instruments for every discipline.</h2>
          <p className="products-desc">Authorized distributor of Plastic Labware, Bottles, Carboys, Measuring Cylinders, Desiccators, Minicoolers, Cryoboxes, Test Tube Racks, Pipette Tips, Petri Dishes, Centrifuge Tubes, Cryo Vials, and Pasteur Pipettes.</p>
          
          <Link to="/products" className="pb-explore-btn">
            <span>Explore All Equipment</span>
            <ArrowRight size={18} />
          </Link>
        </motion.div>

        {/* Right Bundle (Clickable) */}
        <div className="pb-right">
          <motion.div 
            className="pb-bundle-container"
            whileHover="hover"
            onClick={toggleModal}
            style={{ cursor: 'pointer' }}
          >
            {productCategories.map((item, i) => (
              <motion.div 
                key={item.id}
                className="pb-bundle-card"
                initial={{ rotate: bundleRotations[i], x: bundleOffsetsX[i], y: bundleOffsetsY[i] }}
                animate={{ rotate: bundleRotations[i], x: bundleOffsetsX[i], y: bundleOffsetsY[i], zIndex: i }}
                variants={{
                  hover: { 
                    y: bundleOffsetsY[i] - 20, 
                    rotate: bundleRotations[i] * 1.5,
                    scale: 1.02,
                    transition: { duration: 0.4, ease: "easeOut" } 
                  }
                }}
              >
                <img 
                  src={item.img} 
                  alt={item.name} 
                  className="pb-bundle-img" 
                />
                <div className="pb-bundle-overlay" />
                <div className="pb-bundle-text">
                  <h3>{item.name}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Full-Screen Modal Overlay ── */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className="pb-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="pb-modal-header">
              <h2>Key Product Categories</h2>
              <button className="pb-close-btn" onClick={toggleModal}>
                <X size={24} />
              </button>
            </div>

            <div className="pb-modal-grid">
              {productCategories.map((item, i) => (
                <motion.div 
                  key={item.id}
                  className="pb-modal-card"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                >
                  <img src={item.img} alt={item.name} className="pb-modal-img" />
                  <div className="pb-modal-gradient" />
                  <div className="pb-modal-content">
                    <h3>{item.name}</h3>
                    <p>{item.desc}</p>
                    <Link to="/products" className="pb-card-btn">View Full Details</Link>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="pb-modal-footer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Link to="/products" className="pb-modal-explore">
                <span>Explore Full Range</span>
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Products;

import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Applications from '../components/Applications';
import Products from '../components/Products';
import Services from '../components/Services';

const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <Applications />
      <Products />
      <Services />
    </>
  );
};

export default HomePage;

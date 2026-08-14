import React from 'react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import ModulesSection from '../components/ModulesSection';
import PortfolioSection from '../components/PortfolioSection';
import ContactSection from '../components/ContactSection';
import PricingSection from '../components/PricingSection';
import CTASection from '../components/CTASection';

const Home = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ModulesSection />
      <PortfolioSection />
      <PricingSection />
      <CTASection />
      <ContactSection />
    </>
  );
};

export default Home;

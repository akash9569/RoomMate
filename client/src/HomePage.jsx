import React from 'react';
import NavbarComponent from './components/NavbarComponent';
import HeroSection from './components/HeroSection';
import TopCitiesSection from './components/TopCitiesSection';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import CommunityStats from './components/CommunityStats';
import Chatbot from './components/Chatbot';

const HomePage = () => {
  return (
    <>
      <NavbarComponent />
      <HeroSection />
      <TopCitiesSection />
      <CommunityStats />
      <Testimonials />
      <Chatbot/>
      <Footer />
      {/* You can add Footer or other sections here */}
    </>
  );
};

export default HomePage;
import React from 'react';
import NavbarComponent from './components/NavbarComponent';
import HeroSection from './components/HeroSection';
import TopCitiesSection from './components/TopCitiesSection';

const HomePage = () => {
  return (
    <>
      <NavbarComponent />
      <HeroSection />
      <TopCitiesSection />
      {/* You can add Footer or other sections here */}
    </>
  );
};

export default HomePage;
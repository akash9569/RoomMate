import React from 'react';
import NavbarComponent from './components/NavbarComponent';
import HeroSection from './components/HeroSection';
import TopCitiesSection from './components/TopCitiesSection';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import CommunityStats from './components/CommunityStats';
<<<<<<< Updated upstream
import Chatbot from './components/Chatbot';
=======
import Listings from './components/Listing';
>>>>>>> Stashed changes

const HomePage = () => {
  return (
    <>
      <NavbarComponent />
      <HeroSection />
      <TopCitiesSection />
      <Listings />
      <CommunityStats />
      <Testimonials />
      <Chatbot/>
      <Footer />
      {/* You can add Footer or other sections here */}
    </>
  );
};

export default HomePage;
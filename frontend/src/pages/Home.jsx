import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import HomeBiomes from '../components/HomeBiomes';
import SeasonalCollections from '../components/SeasonalCollections';
import HomeAbout from '../components/HomeAbout';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <HomeBiomes />
      <SeasonalCollections />
      <HomeAbout />
      <Footer />
    </>
  );
};

export default Home;

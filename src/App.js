import React from 'react';
import Header from './components/Header/Header';
import Background from './components/Background/Background';
import HeroSection from './components/sections/HeroSection';
import OneStopSection from './components/sections/OneStopSection';
import PriceSection from './components/sections/PriceSection';
import ZkproofSection from './components/sections/ZkproofSection';
import DefiSection from './components/sections/DefiSection';
import Footer from './components/Footer/Footer';
import './styles/global.scss';
import NewsletterSection from './components/sections/NewsletterSection';

function App() {
  return (
    <div className="App">
      <Background />
      <Header />
      <HeroSection />
      <OneStopSection />
      <PriceSection />
      <ZkproofSection />
      <DefiSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
}

export default App;

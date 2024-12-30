import React, { useEffect } from 'react';
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
import './i18n';
import './styles/common.scss';
import ReactGA from 'react-ga4';

ReactGA.initialize('G-2TB2G9PKB0');

function App() {
  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname
    });
  }, []);

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

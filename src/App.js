import React from 'react';
import Header from './components/Header/Header';
import Background from './components/Background/Background';
import HeroSection from './components/sections/HeroSection';
import './styles/global.scss';

function App() {
  return (
    <div className="App">
      <Background />
      <Header />
      <HeroSection />
      {/* 추후 다른 섹션들 추가 */}
    </div>
  );
}

export default App;

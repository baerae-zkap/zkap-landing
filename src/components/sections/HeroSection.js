import React from 'react';
import './HeroSection.scss';
import heroBg from '../../assets/images/hero-bg.png';

const HeroSection = () => {
  return (
    <section className="hero">
      <h1>99%가 모르는 크립토 수익의 비밀</h1>
      <p>해외 코인부터 이자 수익까지, 이제 클릭 한 번으로 시작하세요</p>
      <div className="hero-blur"></div>
      <div className="hero-image">
        <img src={heroBg} alt="히어로 이미지" />
      </div>
    </section>
  );
};

export default HeroSection; 
import React from 'react';
import './HeroSection.scss';
import heroBg from '../../assets/images/hero-bg.png';
import heroZkap from '../../assets/images/hero-zkap.svg';
import heroSecurity from '../../assets/images/hero-security.svg';
import tether from '../../assets/images/Tether.png';
import lido from '../../assets/images/Lido.png';
import coinone from '../../assets/images/coinone.svg';
import shibainu from '../../assets/images/Shibainu.png';
import bithumb from '../../assets/images/Bithumb.svg';
import chart from '../../assets/images/chart.svg';

const HeroSection = () => {
  return (
    <section className="hero">
      <h1>99%가 모르는 크립토 수익의 비밀</h1>
      <p>해외 코인부터 이자 수익까지, 이제 클릭 한 번으로 시작하세요</p>
      <div className="hero-blur"></div>
      <div className="hero-image">
        <img src={heroBg} alt="히어로 이미지" />
        <img src={heroZkap} alt="ZKAP" className="hero-zkap" />
        <img src={heroSecurity} alt="보안" className="hero-security" />
        <img src={tether} alt="Tether" className="hero-tether" />
        <img src={lido} alt="Lido" className="hero-lido" />
        <img src={coinone} alt="Coinone" className="hero-coinone" />
        <img src={shibainu} alt="Shibainu" className="hero-shibainu" />
        <img src={bithumb} alt="Bithumb" className="hero-bithumb" />
        <img src={chart} alt="Chart" className="hero-chart" />
      </div>
    </section>
  );
};

export default HeroSection; 
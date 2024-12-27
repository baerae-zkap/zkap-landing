import React, { useEffect, useRef } from 'react';
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
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const elements = entry.target.querySelectorAll('.animate-slide-up');
          elements.forEach((el, index) => {
            setTimeout(() => {
              el.classList.add('visible');
            }, index * 200);
          });
        }
      },
      {
        threshold: 0.2,
        rootMargin: '-100px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="hero" ref={sectionRef}>
      <h1 className="animate-slide-up">99%가 모르는 크립토 수익의 비밀</h1>
      <p className="animate-slide-up">해외 코인부터 이자 수익까지, 이제 클릭 한 번으로 시작하세요</p>
      <div className="hero-blur animate-slide-up"></div>
      <div className="hero-image animate-slide-up">
        <img src={heroBg} alt="히어로 이미지" />
        <img src={heroZkap} alt="ZKAP" className="hero-zkap" />
        <img src={heroSecurity} alt="보안" className="hero-security animate-slide-up" />
        <img src={tether} alt="Tether" className="hero-tether animate-slide-up" />
        <img src={lido} alt="Lido" className="hero-lido animate-slide-up" />
        <img src={coinone} alt="Coinone" className="hero-coinone animate-slide-up" />
        <img src={shibainu} alt="Shibainu" className="hero-shibainu animate-slide-up" />
        <img src={bithumb} alt="Bithumb" className="hero-bithumb animate-slide-up" />
        <img src={chart} alt="Chart" className="hero-chart animate-slide-up" />
      </div>
    </section>
  );
};

export default HeroSection; 
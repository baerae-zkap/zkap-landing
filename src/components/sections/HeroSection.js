import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
      <h1 className="animate-slide-up">{t('hero.title')}</h1>
      <p className="animate-slide-up">{t('hero.subtitle')}</p>
      <div className="hero-blur animate-slide-up"></div>
      <div className="hero-image animate-slide-up">
        <img src={heroBg} alt={t('hero.title')} />
        <img src={heroZkap} alt="ZKAP" className="hero-zkap" />
        <img src={heroSecurity} alt={t('hero.security')} className="hero-security animate-slide-up" />
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
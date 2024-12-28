import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './DefiSection.scss';
import defi from '../../assets/images/defi.png';

const DefiSection = () => {
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
    <section className="defi" ref={sectionRef}>
      <div className="container">
        <div className="defi-content">
          <div className="defi-image animate-slide-up">
            <img src={defi} alt={t('defi.title')} className="defi-main" />
          </div>
          <div className="defi-text animate-slide-up">
            <h2>{t('defi.title')}</h2>
            <p>{t('defi.description')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DefiSection; 
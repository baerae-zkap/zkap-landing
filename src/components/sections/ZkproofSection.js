import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './ZkproofSection.scss';
import zkproof from '../../assets/images/zkproof.png';

const ZkproofSection = () => {
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
    <section className="zkproof" ref={sectionRef}>
      <div className="container">
        <div className="zkproof-content">
          <div className="zkproof-image animate-slide-up">
            <img src={zkproof} alt={t('zkproof.title')} className="zkproof-main" />
          </div>
          <div className="zkproof-text animate-slide-up">
            <h2>{t('zkproof.title')}</h2>
            <p>{t('zkproof.description')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ZkproofSection; 
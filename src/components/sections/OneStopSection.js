import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './OneStopSection.scss';
import onestop from '../../assets/images/onestop.png';

const OneStopSection = () => {
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
    <section className="onestop" ref={sectionRef}>
      <div className="container">
        <div className="onestop-content">
          <div className="onestop-image animate-slide-up">
            <img src={onestop} alt={t('onestop.title')} className="onestop-main" />
          </div>
          <div className="onestop-text animate-slide-up">
            <h2>{t('onestop.title')}</h2>
            <p>{t('onestop.description')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OneStopSection; 
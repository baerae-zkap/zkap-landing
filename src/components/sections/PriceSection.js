import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './PriceSection.scss';
import priceComparison from '../../assets/images/price-comparison.png';

const PriceSection = () => {
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
    <section className="price" ref={sectionRef}>
      <div className="container">
        <div className="price-content">
          <div className="price-image animate-slide-up">
            <img src={priceComparison} alt={t('price.title')} className="price-main" />
          </div>
          <div className="price-text animate-slide-up">
            <h2>{t('price.title')}</h2>
            <p>{t('price.description')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceSection; 
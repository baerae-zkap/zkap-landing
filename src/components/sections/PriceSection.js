import React, { useEffect, useRef } from 'react';
import './PriceSection.scss';
import priceComparison from '../../assets/images/price-comparison.png';

const PriceSection = () => {
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
            <img src={priceComparison} alt="가격 비교" className="price-main" />
          </div>
          <div className="price-text animate-slide-up">
            <h2>비싸게 살 필요 없어요!<br />여기가 제일 싸요</h2>
            <p>모든 거래소의 실시간 가격을 한 곳에서 확인하세요.<br />
               최저가를 찾아 헤매지 않아도 돼요.<br />
               가장 저렴한 가격에 투자할 수 있도록 도와드립니다.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceSection; 
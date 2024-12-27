import React, { useEffect, useRef } from 'react';
import './DefiSection.scss';
import defi from '../../assets/images/defi.png';

const DefiSection = () => {
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
            <img src={defi} alt="디파이 수익" className="defi-main" />
          </div>
          <div className="defi-text animate-slide-up">
            <h2>코인만 사두면 뭐해요?<br />이제는 이자도 받으세요!</h2>
            <p>코인, 아직도 들고만 계시나요?<br />
               가만히 두기만 해도 이자가 쏙쏙 들어와요.<br />
               복잡한 건 전부 알아서 해드리고,<br />
               수익률 변동이 클 땐 카톡으로 슝~ 알려드려요!</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DefiSection; 
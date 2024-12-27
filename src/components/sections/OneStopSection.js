import React, { useEffect, useRef } from 'react';
import './OneStopSection.scss';
import onestop from '../../assets/images/onestop.png';

const OneStopSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const elements = entry.target.querySelectorAll('.animate-slide-up');
          elements.forEach((el, index) => {
            setTimeout(() => {
              el.classList.add('visible');
            }, index * 200); // 각 요소마다 200ms 딜레이
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
            <img src={onestop} alt="원스톱 거래소" className="onestop-main" />
          </div>
          <div className="onestop-text animate-slide-up">
            <h2>해외 코인도 클릭 한 번에<br />내 지갑으로 쏙!</h2>
            <p>복잡한 해외거래소 이동은 이제 그만!<br />
               국내 거래소에서 해외거래소까지 한 번에 이동하고,<br />
               원하는 코인을 바로 구매할 수 있어요.<br />
               번거로운 과정 없이 쉽고 빠르게 시작하세요</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OneStopSection; 
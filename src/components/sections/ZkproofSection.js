import React, { useEffect, useRef } from 'react';
import './ZkproofSection.scss';
import zkproof from '../../assets/images/zkproof.png';

const ZkproofSection = () => {
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
            <img src={zkproof} alt="복잡한 개인키 관리" className="zkproof-main" />
          </div>
          <div className="zkproof-text animate-slide-up">
            <h2>복잡한 개인키 관리,<br />이제는 잃어버려도 걱정마세요!</h2>
            <p>핀스 쓰는 소셜계정으로 간단하게 복구해세요.<br />
               이제 더이상 복잡한 개인키 저장할 필요 없어요!</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ZkproofSection; 
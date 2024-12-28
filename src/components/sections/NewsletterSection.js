import React, { useState, useEffect, useRef } from 'react';
import './NewsletterSection.scss';
import Toast from '../Toast/Toast';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const sectionRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submittedEmail = email;
    setEmail('');
    setToastVisible(true);
    
    try {
      await fetch('https://script.google.com/macros/s/AKfycby62DWdA6b4_2JTOs72zzzwmhPuiFWdK-bZgEqMvAvJ6B6KqCWQjUZ04ATSXanUnnOO/exec?email=' + encodeURIComponent(submittedEmail), {
        method: 'GET',
        mode: 'no-cors'
      });
      
      setTimeout(() => {
        setToastVisible(false);
      }, 3000);
      
    } catch (error) {
      console.error('Error:', error);
      setToastVisible(false);
      alert('오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

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
    <>
      <section className="newsletter" ref={sectionRef}>
        <div className="container">
          <div className="newsletter-content animate-slide-up">
            <h2>투자 경험을 위한 새로운 시작,<br />지캅의 소식 받아보기</h2>
            <p>구독을 진행하면 뉴스레터 수신을 위한<br />개인정보 수집 및 이용에 동의하는 것으로 간주합니다.</p>
            <form onSubmit={handleSubmit} className="newsletter-form">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일 주소를 입력해 주세요"
                required
              />
              <button type="submit">구독하기</button>
            </form>
          </div>
        </div>
      </section>
      <Toast 
        message="구독해 주셔서 감사합니다!" 
        visible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </>
  );
};

export default NewsletterSection;
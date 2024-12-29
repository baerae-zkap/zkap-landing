import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './NewsletterSection.scss';
import Toast from '../Toast/Toast';

const NewsletterSection = () => {
  const { t } = useTranslation();
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
      <section className="newsletter" ref={sectionRef} id="newsletter">
        <div className="container">
          <div className="newsletter-content animate-slide-up">
            <h2>{t('newsletter.title')}</h2>
            <p>{t('newsletter.description')}</p>
            <form onSubmit={handleSubmit} className="newsletter-form">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('newsletter.placeholder')}
                required
              />
              <button type="submit">{t('newsletter.button')}</button>
            </form>
          </div>
        </div>
      </section>
      <Toast 
        message={t('newsletter.toast')} 
        visible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </>
  );
};

export default NewsletterSection;
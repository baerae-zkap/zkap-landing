import React from 'react';
import './Footer.scss';
import footerBg from '../../assets/images/footer-bg.png';
import logo from '../../assets/images/logo.svg';
import iconX from '../../assets/images/X.svg';
import iconMedium from '../../assets/images/Medium.svg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-bg">
        <img src={footerBg} alt="footer background" />
      </div>
      <div className="footer-content">
        <div className="footer-text">
          <div className="text-content">
            모든 크립토 투자가 쉬워지는 순간,<br className="mobile-only" /> 당신의 지갑이 달라집니다
          </div>
          <button>문의하기</button>
        </div>
        <div className="footer-logo">
          <img src={logo} alt="ZKAP" />
        </div>
        <div className="footer-social">
          <a href="#" className="social-icon">
            <img src={iconX} alt="X (Twitter)" />
          </a>
          <a href="#" className="social-icon">
            <img src={iconMedium} alt="Medium" />
          </a>
        </div>
        <div className="footer-copyright">
          ©2024 ZKAP. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
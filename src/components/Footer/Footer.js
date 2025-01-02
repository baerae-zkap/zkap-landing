import React from 'react';
import { useTranslation } from 'react-i18next';
import './Footer.scss';
import footerBg from '../../assets/images/footer-bg.png';
import logo from '../../assets/images/logo.svg';
import iconX from '../../assets/images/X.svg';
import iconMedium from '../../assets/images/Medium.svg';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-bg">
        <img src={footerBg} alt="footer background" />
      </div>
      <div className="footer-content">
        <div className="footer-text">
          {t('footer.text')}
        </div>
        <div className="footer-bottom">
          <div className="footer-logo">
            <img src={logo} alt="ZKAP" />
          </div>
          <div className="footer-social">
            <a href="https://x.com/zkap_baerae" target="_blank" rel="noopener noreferrer" className="social-icon">
              <img src={iconX} alt="X (Twitter)" />
            </a>
            <a href="https://medium.com/baerae" target="_blank" rel="noopener noreferrer" className="social-icon">
              <img src={iconMedium} alt="Medium" />
            </a>
          </div>
          <div className="footer-copyright">
            {t('footer.copyright')}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Header.scss';
import logo from '../../assets/images/logo.svg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { i18n, t } = useTranslation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : 'auto';
  };

  const scrollToNewsletter = () => {
    const newsletterSection = document.getElementById('newsletter');
    if (newsletterSection) {
      newsletterSection.scrollIntoView({ behavior: 'smooth' });
      if (isMenuOpen) {
        toggleMenu();
      }
    }
  };

  const toggleLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <img src={logo} alt="로고" />
        </div>
        <button className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li className="language-selector">
              <button 
                className={`lang-btn ${i18n.language === 'ko' ? 'active' : ''}`}
                onClick={() => toggleLanguage('ko')}
              >
                한국어
              </button>
              <button 
                className={`lang-btn ${i18n.language === 'en' ? 'active' : ''}`}
                onClick={() => toggleLanguage('en')}
              >
                English
              </button>
            </li>
            <li>
              <button className="cta-button" onClick={scrollToNewsletter}>
                {t('header.newsletter')}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

import React, { useState } from 'react';
import './Header.scss';
import logo from '../../assets/images/logo.svg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : 'auto';
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
            <li><a href="#blog">블로그</a></li>
            <li><a href="#contact">문의하기</a></li>
            <li>
              <button className="cta-button">얼리버드 신청하기</button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

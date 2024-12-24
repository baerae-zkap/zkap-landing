import React from 'react';
import './Header.scss';
import logo from '../../assets/images/logo.svg';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <img src={logo} alt="로고" />
        </div>
        <nav className="nav-menu">
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

import React from 'react';
import logoSrc from '../assets/img/logo.png';
import '../styles/login.css';

function Logo() {
  return (
    <div className="logo-container">
      <img src={ logoSrc } alt="uChef Logo" className="logo__img" />
    </div>
  );
}

export default Logo;

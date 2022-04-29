import React from 'react';
import './header.module.css';

const Header = () => {
  return (
    <header>
      <img src='/images/logo.png' alt='logo' />
      <h1>unFace</h1>
      <ul>
        <li>Home</li>
        <li>Works</li>
        <li>Contact</li>
      </ul>
    </header>
  );
};

export default Header;

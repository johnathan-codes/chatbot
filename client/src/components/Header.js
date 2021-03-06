import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <nav className='nav-wrapper red darken-5'>
    <Link to={'/'} className='brand-logo'>
      <img src='img/company-logo.png' alt='Millennium' />
    </Link>
    <ul id='nav-mobile' className='right hide-on-med-and-down'>
      <li>
        <Link to={'/questions'}>Otázky</Link>
      </li>
      <li>
        <Link to={'/about'}>O botovi</Link>
      </li>
    </ul>
    <h2 style={{ textAlign: 'center' }}>Chatbot</h2>
  </nav>
);

export default Header;

// TODO: needed?
/*
    
*/

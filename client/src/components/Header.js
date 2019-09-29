import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <nav>
    <ul>
      <li>
        <Link to={'/questions'}>Otazky</Link>
      </li>
      <li>
        <Link to={'/about'}>O botovi</Link>
      </li>
    </ul>
  </nav>
);

export default Header;

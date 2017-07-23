import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <div>
    <h2>Hello World from REACT</h2>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/submit">Submit</Link></li>
      <li><Link to="/list">List</Link></li>
    </ul>
  </div>
);

export default Header;

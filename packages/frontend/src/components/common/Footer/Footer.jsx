import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.scss';

const Footer = () => (
  <div className="footer">
    <p>&copy; 2019 Shop Stack</p>

    <div className="footer-links">
      <NavLink to="/about-us">About us</NavLink>
      <NavLink to="/contact-us">Contact us</NavLink>
      <NavLink to="/privacy-policy">Privacy policy</NavLink>
    </div>
  </div>
);

export default Footer;

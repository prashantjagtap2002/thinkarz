import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Pre Owned Cars', path: '/cars' },
    { name: 'Sell Your Car', path: '/sell' },
    { name: 'Book a Test Drive', path: '/test-drive' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Contact Us', path: '/contact' }
  ];

  return (
    <header className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="logo">
          <h1>
            THIN<span className="text-primary">K</span>ARZ
          </h1>
          <p>YOUR ULTIMATE CAR DESTINATION</p>
          <span className="logo-byline">BY GAUTAM MODI GROUP</span>
        </Link>
        
        <nav className="nav-links">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={location.pathname === link.path ? 'active' : ''}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        
        <div className="nav-actions">
          <button className="phone-btn">
            <Phone size={18} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

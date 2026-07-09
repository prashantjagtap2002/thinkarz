import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="logo logo-light">
              <h1>
                THIN<span className="text-primary">K</span>ARZ
              </h1>
              <p>YOUR ULTIMATE CAR DESTINATION</p>
              <span className="logo-byline">BY GAUTAM MODI GROUP</span>
            </div>
            <p className="brand-desc">
              ThinkArz is the pre-owned car venture of Gautam Modi Group, built on decades of trust, customer first approach, and a passion for mobility.
            </p>
            <div className="social-icons">
              <a href="#">FB</a>
              <a href="#">IG</a>
              <a href="#">YT</a>
              <a href="#">IN</a>
            </div>
          </div>
          
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/cars">Pre Owned Cars</Link></li>
              <li><Link to="/sell">Sell Your Car</Link></li>
              <li><Link to="/test-drive">Book a Test Drive</Link></li>
              <li><Link to="/blogs">Blogs</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h3>Our Services</h3>
            <ul>
              <li><Link to="/cars">Buy a Car</Link></li>
              <li><Link to="/sell">Sell Your Car</Link></li>
              <li><Link to="#">Car Inspection</Link></li>
              <li><Link to="#">Finance Options</Link></li>
              <li><Link to="#">Extended Warranty</Link></li>
              <li><Link to="#">Roadside Assistance</Link></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h3>Company</h3>
            <ul>
              <li><Link to="/about">About Gautam Modi Group</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div className="footer-contact">
            <h3>Contact Us</h3>
            <ul>
              <li>
                <MapPin size={18} className="contact-icon" />
                <span>
                  <strong>ThinkArz</strong><br/>
                  5th Floor, Modi House,<br/>
                  Link Road, Malad (West),<br/>
                  Mumbai - 400064
                </span>
              </li>
              <li>
                <Phone size={18} className="contact-icon" />
                <span>022 4212 5678</span>
              </li>
              <li>
                <Mail size={18} className="contact-icon" />
                <span>hello@thinkarz.com</span>
              </li>
              <li>
                <Clock size={18} className="contact-icon" />
                <span>
                  Mon - Sat: 10:00 AM - 7:00 PM<br/>
                  Sun: 10:00 AM - 5:00 PM
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 ThinkArz. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

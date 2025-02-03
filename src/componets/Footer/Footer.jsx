// Footer.jsx
import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-card">
          <h3>CONNECT WITH US</h3>
          <div className="contact-info">
            <div className="contact-item">
              <i className="phone-icon">📞</i>
              <a href="tel:+919567843340">+91 9567843340</a>
            </div>
            <div className="contact-item">
              <i className="email-icon">✉️</i>
              <a href="mailto:info@deepnetsoft.com">info@deepnetsoft.com</a>
            </div>
          </div>
        </div>

        <div className="footer-card logo-section">
          <img src="images/dnslogo1.png" alt="Deep Net Soft Logo" className="footer-logo" />
          <div className="company-name">
            <span className="blue">DEEP</span> NET <span className="gray">SOFT</span>
          </div>
          <div className="social-links">
            <a href="#" aria-label="Facebook">f</a>
            <a href="#" aria-label="Twitter">t</a>
            <a href="#" aria-label="YouTube">y</a>
            <a href="#" aria-label="Instagram">i</a>
          </div>
        </div>

        <div className="footer-card">
          <h3>FIND US</h3>
          <div className="address">
            <i className="location-icon">📍</i>
            <p>First floor, Geo infopark,<br />Infopark EXPY, Kakkanad</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 Deepnetsoft Solutions. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">Terms & Conditions</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
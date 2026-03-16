import React from "react";
import "./Footer.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer-container">
        {/* Logo & About */}
        <div className="footer-section logo-section">
          <h2>Shoe.Mart</h2>
          <p>
            Premium shoes and accessories for every style. Shop with comfort and confidence.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section links-section">
          <h3>Quick Links</h3>
          <ul>
            <li>Home</li>
            <li>Products</li>
            <li>About Us</li>
            <li>Contact</li>
            <li>FAQ</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-section newsletter-section">
          <h3>Newsletter</h3>
          <p>Subscribe for the latest updates and offers:</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>

        {/* Social Media */}
        <div className="footer-section social-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />
            <FaLinkedinIn />
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>© 2026 Shoe.Mart. All rights reserved. <span className="gokul">Designed By : Gokulram.P</span></p>
      </div>
    </footer>
  );
}

export default Footer;
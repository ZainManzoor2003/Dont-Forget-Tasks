import React from 'react';
import { Link } from 'react-router-dom';
import { FiFeather } from 'react-icons/fi';

const SiteFooter = () => {
  return (
    <footer className="site-footer">
      <div className="footer-topbar">
        <Link to="/privacy" className="foot-link"  rel="noopener noreferrer">Terms of Service</Link>
        <Link to="/privacy" className="foot-link" rel="noopener noreferrer">Privacy Policy</Link>
        <Link to="/faq" className="foot-link"  rel="noopener noreferrer">FAQ</Link>
        <a href="#" className="foot-link">Support</a>
        {/* <div className="foot-follow">Follow us :</div> */}
      </div>
      <div className="footer-grid">
        <div className="foot-brand">
          <div className="foot-logo"><FiFeather /></div>
          <div className="foot-name">Don't Forget</div>
          <div className="foot-contact">+1 (234) 567 89 00</div>
          <div className="foot-email">outerweb@email.com</div>
        </div>
        <div className="foot-col">
          <div className="foot-title">Navigation</div>
          <a href="#about" className="foot-item">About</a>
          <a href="#categories" className="foot-item">Categories</a>
          <a href="#" className="foot-item">Benefits</a>
          <a href="#contact" className="foot-item">Contacts</a>
        </div>
        <div className="foot-col">
          <div className="foot-title">Information</div>
          <a href="#" className="foot-item">Help</a>
          <a href="#" className="foot-item">Featured</a>
          <a href="#" className="foot-item">Cases</a>
          <a href="#" className="foot-item">Support</a>
        </div>
        <div className="foot-subscribe">
          <div className="foot-title">Subscribe</div>
          <div className="foot-note">Stay up to date with our news!</div>
          <form className="sub-form" onSubmit={(e)=>e.preventDefault()}>
            <input className="sub-input" placeholder="Email" />
            <button className="sub-btn">Subscribe</button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;



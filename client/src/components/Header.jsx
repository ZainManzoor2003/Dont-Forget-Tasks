import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <header className="header nav-pill">
      <div className="pill-left-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.73 21C12.97 22.25 11.61 23 10.12 23C7.89 23 6.07 21.18 6.07 18.95C6.07 17.46 6.82 16.1 8.07 15.34M18 8C18 4.13 14.87 1 11 1C7.13 1 4 4.13 4 8V12L2 14V15H20V14L18 12V8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <nav className="pill-nav">
        <Link to="/faq" className="pill-link" target="_blank" rel="noopener noreferrer">FAQs</Link>
        <a href="#about" className="pill-link">About Us</a>
        <a href="#blogs" className="pill-link">Blogs</a>
        <a href="#contact" className="pill-link">Contact Us</a>
      </nav>
      <div className="header-right" style={{ display: 'flex', gap: 8 }}>
        <button className="signin-btn" onClick={handleLogin}>Login</button>
        <Link to="/signup" className="signup-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>Signup</Link>
      </div>
    </header>
  );
};

export default Header;



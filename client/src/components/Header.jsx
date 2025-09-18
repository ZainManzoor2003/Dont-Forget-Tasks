import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header nav-pill">
      <div className="pill-left-icon" onClick={()=>navigate('/')}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.73 21C12.97 22.25 11.61 23 10.12 23C7.89 23 6.07 21.18 6.07 18.95C6.07 17.46 6.82 16.1 8.07 15.34M18 8C18 4.13 14.87 1 11 1C7.13 1 4 4.13 4 8V12L2 14V15H20V14L18 12V8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <nav className="pill-nav">
        <Link to="/faq" className="pill-link">FAQs</Link>
        <Link to="/about" className="pill-link" >About Us</Link>
        <Link to="/blog" className="pill-link">Blogs</Link>
        <Link to="/contact" className="pill-link">Contact Us</Link>
      </nav>
      <div className="header-right" style={{ display: 'flex', gap: 8 }}>
        <Link to='/login' className="signin-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>Login</Link>
        <Link to="/signup" className="signup-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>Signup</Link>
      </div>
    </header>
  );
};

export default Header;



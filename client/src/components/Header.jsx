import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header nav-pill">
      <div
        className="pill-left-icon"
        onClick={()=>navigate('/')}
        role="button"
        aria-label="Go to homepage"
        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer', whiteSpace: 'nowrap' }}
      >
        {/* Simple checklist icon as a logo */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="2"/>
          <path d="M7 12L10 15L17 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="brand-text" style={{ fontWeight: 700, whiteSpace: 'nowrap' }}>Don't Forget</span>
      </div>
      <nav className="pill-nav">
        <Link to="/faq" className="pill-link">FAQs</Link>
        <Link to="/about" className="pill-link" >About Us</Link>
        <Link to="/blog" className="pill-link">Blogs</Link>
        <Link to="/contact" className="pill-link">Contact Us</Link>
      </nav>
      <div className="header-right" style={{ display: 'flex', gap: 8 }}>
        <Link to='/login' className="signin-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>Login</Link>
        <Link to='/dashboard' className="signup-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>Dashboard</Link>
        <Link to="/signup" className="signup-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>Signup</Link>
      </div>
    </header>
  );
};

export default Header;



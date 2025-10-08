import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { FiFeather } from 'react-icons/fi';

const Header = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header nav-pill">
      <div
        className="pill-left-icon"
        onClick={()=>navigate('/')}
        role="button"
        aria-label="Go to homepage"
        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer', whiteSpace: 'nowrap' }}
      >
        {/* Feather/pen icon as logo */}
        <FiFeather size={22} />
        <span className="brand-text" style={{ fontWeight: 700, whiteSpace: 'nowrap' }}>Don't Forget</span>
      </div>
      
      {/* Desktop Navigation */}
      <nav className="pill-nav desktop-nav">
        <Link to="/faq" className="pill-link">FAQs</Link>
        <Link to="/blog" className="pill-link">Blogs</Link>
        <Link to="/contact" className="pill-link">Contact Us</Link>
      </nav>
      
      {/* Desktop Header Right */}
      <div className="header-right desktop-header-right" style={{ display: 'flex', gap: 8 }}>
        <Link to='/login' className="signin-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>Login</Link>
        <Link to='/dashboard' className="signup-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>Dashboard</Link>
        <Link to="/signup" className="signup-btn" style={{ textDecoration: 'none', display: 'inline-block' }}>Signup</Link>
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="mobile-menu-btn"
        onClick={toggleMobileMenu}
        aria-label="Toggle mobile menu"
      >
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Navigation Overlay */}
      <div 
        className={`mobile-nav-overlay ${isMobileMenuOpen ? 'mobile-nav-open' : ''}`}
        onClick={closeMobileMenu}
      >
        <nav className="mobile-nav" onClick={(e) => e.stopPropagation()}>
          <Link to="/faq" className="mobile-nav-link" onClick={closeMobileMenu}>FAQs</Link>
          <Link to="/blog" className="mobile-nav-link" onClick={closeMobileMenu}>Blogs</Link>
          <Link to="/contact" className="mobile-nav-link" onClick={closeMobileMenu}>Contact Us</Link>
          
          <div className="mobile-nav-buttons">
            <Link to='/login' className="mobile-signin-btn" onClick={closeMobileMenu}>Login</Link>
            <Link to='/dashboard' className="mobile-signup-btn" onClick={closeMobileMenu}>Dashboard</Link>
            <Link to="/signup" className="mobile-signup-btn" onClick={closeMobileMenu}>Signup</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
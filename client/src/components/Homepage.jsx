import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';
import Blog from './Blog';
import Footer from './Footer';
import NewsletterPopup from './NewsletterPopup';

const Homepage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/login');
  };

  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  return (
    <div className="homepage">
      {/* Header */}
      <header className="header">
        
        <div className="header-center">
          <h1 className="logo">Don't Forget</h1>
        </div>
        
        <div className="header-right">
          <button className="signin-btn" onClick={handleLogin}>
            Sign In
          </button>
          <button className="get-started-btn" onClick={handleSignup}>
            Sign Up
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="hero-section">
        <div className="hero-content">
          <h2 className="hero-title">
            <span className="title-line">A Global First</span>
            <span className="title-line">A Platform Built For Tasks.</span>
          </h2>
          
          <p className="hero-description">
            Don't Forget is an all-in-one scheduling and task management tool designed to keep you on top of appointments, deadlines, and follow-ups.
            It lets you book meetings, accept payments, and send confirmations — all inside one platform.
            With color-coded reminders and organized notes, nothing slips through the cracks.
            Whether you're an entrepreneur, student, parent, or manager, it helps you work smarter, stay prepared, and protect your time.
          </p>
          
          <button className="cta-button" >
            Get Started
          </button>
        </div>
      </main>

      {/* Feature Blocks */}
      <section className="features-section">
        <div className="features-container">
          <div className="feature-block">
            <div className="feature-icon">📅</div>
            <h3 className="feature-title">Smart Booking</h3>
            <p className="feature-description">
              Schedule appointments with ease and never miss important meetings.
            </p>
          </div>
          
          <div className="feature-block">
            <div className="feature-icon">💳</div>
            <h3 className="feature-title">Secure Payments</h3>
            <p className="feature-description">
              Accept payments seamlessly with integrated payment processing.
            </p>
          </div>
          
          <div className="feature-block">
            <div className="feature-icon">⏰</div>
            <h3 className="feature-title">Smart Reminders</h3>
            <p className="feature-description">
              Get timely notifications and never forget important deadlines.
            </p>
          </div>
          
          <div className="feature-block">
            <div className="feature-icon">🔄</div>
            <h3 className="feature-title">Follow-ups</h3>
            <p className="feature-description">
              Track and manage follow-up tasks with automated workflows.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <Blog />

      {/* Footer Section */}
      <Footer />

      {/* Newsletter Popup */}
      <NewsletterPopup />

    </div>
  );
};

export default Homepage;

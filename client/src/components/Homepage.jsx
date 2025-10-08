import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCalendar, FiCreditCard, FiMail, FiAlertCircle, FiBook, FiTrendingUp, FiBookOpen, FiUsers, FiGrid, FiLayers, FiShield, FiClock, FiTarget, FiArrowRight } from 'react-icons/fi';
import Header from './Header';
import NewsletterPopup from './NewsletterPopup';
import SiteFooter from './SiteFooter';
import './Homepage.css';

const Homepage = () => {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate('/signup');
  };
  const handleStartNow = () => {
    navigate('/dashboard');
  };
  

  return (
    <div className="homepage">
      <Header />

      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">Don't Forget — Take Control Today</h1>
            <p className="hero-subtitle">Stay Organized. Stay Ahead. Never Miss a Thing.</p>
            <p className="hero-paragraph">Ever missed something important… and felt the fallout immediately? A meeting you forgot. A deadline you blew past. A client you lost because the follow-up never happened. One small slip can cost time, money, and trust.</p>
            <p className="hero-paragraph">Let's be honest.</p>
            <p className="hero-paragraph">Life is coming at you fast — clients to manage, meetings to schedule, deadlines to hit, and personal responsibilities you can't drop. Whether you're an entrepreneur, a consultant, a student organizing study groups, a virtual assistant juggling multiple clients, a busy supervisor, or a parent trying to keep the family calendar from falling apart… one thing is certain:</p>
            <p className="hero-paragraph">You can't afford to forget.</p>
            <p className="hero-paragraph">That's where Don't Forget comes in.</p>

            <div className="cta-inline" role="button" tabIndex={0} onClick={handleStartNow} onKeyDown={(e)=>{ if(e.key==='Enter'){ handleStartNow(); } }}>
              <span className="cta-inline-lead">Start Now —</span> Keep Every Detail on Track!
            </div>
          </div>

          <div className="hero-images">
            <div className="collage">
              <figure className="collage-item collage-main">
                <img src="https://makingmoveslondon.co.uk/wp-content/uploads/2019/03/AdobeStock_239027622-e1553244136278.jpeg" alt="Modern workspace" className="image-fill" />
              </figure>
              <figure className="collage-item collage-side bottom">
                <img src="https://cdn.mos.cms.futurecdn.net/YdtUvYoYvzAb9Zj6NNKC6X.jpg" alt="Productivity setup" className="image-fill" />
              </figure>
            </div>
          </div>
        </div>
      </section>

      <section className="what-is-section">
        <div className="what-is-container">
          <h2 className="what-is-title">Why Use Don't Forget?</h2>
          <p className="what-is-description">No more scattered tools. No more missed opportunities.</p>
          <p className="what-is-description">With Don't Forget, you see everything in one clean, organized space — so you can work smarter, stay prepared, and protect your time. Don't just manage your schedule. Own it.</p>
        </div>
      </section>

      <section className="features-section">
        <div className="features-container">
          <div className="features-content">
            <div className="features-intro">With Don’t Forget, you can:</div>

            <div className="feature-row">
              <div className="feature-media">
                <figure className="feature-figure">
                  <img className="image-fill" src="https://makingmoveslondon.co.uk/wp-content/uploads/2019/03/AdobeStock_239027622-e1553244136278.jpeg" alt="Online booking and calendar management" />
                </figure>
              </div>
              <div className="feature-points">
                <div className="feature-card">
                  <span className="feature-icon" aria-hidden="true"><FiCalendar /></span>
                  <div className="feature-text">Book and manage appointments online with a personalized public booking page.</div>
                </div>
                <div className="feature-card">
                  <span className="feature-icon" aria-hidden="true"><FiCreditCard /></span>
                  <div className="feature-text">Accept payments instantly through secure Stripe or PayPal integration — no extra steps, no chasing invoices.</div>
                </div>
              </div>
            </div>

            <div className="feature-row feature-row-reverse">
              <div className="feature-media">
                <figure className="feature-figure">
                  <img className="image-fill" src="https://cdn.mos.cms.futurecdn.net/YdtUvYoYvzAb9Zj6NNKC6X.jpg" alt="Confirmations, reminders and notifications" />
                </figure>
              </div>
              <div className="feature-points">
                <div className="feature-card">
                  <span className="feature-icon" aria-hidden="true"><FiMail /></span>
                  <div className="feature-text">Send and receive confirmations right inside the platform — no outside email required.</div>
                </div>
                <div className="feature-card">
                  <span className="feature-icon" aria-hidden="true"><FiAlertCircle /></span>
                  <div className="feature-text">Track tasks with color-coded reminders so you instantly know what’s urgent, due today, or overdue.</div>
                </div>
              </div>
            </div>

            <div className="feature-row">
              <div className="feature-media">
                <figure className="feature-figure">
                  <img className="image-fill" src="https://images.pexels.com/photos/3183186/pexels-photo-3183186.jpeg" alt="Follow-ups and important notes organization" />
                </figure>
              </div>
              <div className="feature-points">
                <div className="feature-card">
                  <span className="feature-icon" aria-hidden="true"><FiBook /></span>
                  <div className="feature-text">Organize follow-ups and important notes so every client, project, or event stays on your radar.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="audiences-section">
        <div className="audiences-container">
          <ul className="audiences-list">
            <li className="audience-item audience-mint">
              <span className="audience-icon" aria-hidden="true"><FiTrendingUp /></span>
              <span><strong>For the entrepreneur</strong>, this means more paid bookings and fewer no-shows.</span>
            </li>
            <li className="audience-item audience-amber">
              <span className="audience-icon" aria-hidden="true"><FiBookOpen /></span>
              <span><strong>For the student</strong>, this means scheduling study groups without messy group chats.</span>
            </li>
            <li className="audience-item audience-red">
              <span className="audience-icon" aria-hidden="true"><FiUsers /></span>
              <span><strong>For the busy parent</strong>, this means keeping family events, appointments, and reminders in one place.</span>
            </li>
            <li className="audience-item audience-sky">
              <span className="audience-icon" aria-hidden="true"><FiGrid /></span>
              <span><strong>For the supervisor or virtual assistant</strong>, this means managing multiple calendars without losing track.</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="why-choose-section">
        <div className="why-choose-container">
          <h2 className="why-choose-title">Why Choose Don't Forget?</h2>
          <div className="why-choose-content">
            <p className="why-choose-paragraph">No more scattered tools. No more missed opportunities.</p>
            <p className="why-choose-paragraph">With Don't Forget, you see everything in one clean, organized space — so you can work smarter, stay prepared, and protect your time. Don't just manage your schedule. Own it.</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-container">
          <h3 className="cta-heading">Don't Forget — Take Control Today!</h3>
          <p className="cta-copy" style={{ marginBottom: 0 }}>Start Now — Keep Every Detail on Track!</p>
        </div>
      </section>

      <SiteFooter />
      <NewsletterPopup />
    </div>
  );
};

export default Homepage;
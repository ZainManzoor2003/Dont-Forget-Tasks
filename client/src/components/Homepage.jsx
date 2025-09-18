import React, { useState } from 'react';
import { FiCalendar, FiBell, FiUsers, FiMail, FiPhone, FiFeather } from 'react-icons/fi';
import { useNavigate, Link } from 'react-router-dom';
import Header from './Header';
import SiteFooter from './SiteFooter';
import './Homepage.css';
import Blog from './Blog'
import NewsletterPopup from './NewsletterPopup';

const Homepage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  const [openAccIndex, setOpenAccIndex] = useState(0);

  

  return (
    <div className="homepage">
      <NewsletterPopup/>
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-greeting">- Hello and welcome -</div>
            <h1 className="hero-title">
              Start Your Productivity Journey with
              <span className="hero-brand"> Don't Forget</span>
            </h1>

            <p className="hero-paragraph">
              Ever missed something important… and felt the fallout immediately? A meeting you forgot. A deadline you blew past. A client you lost because the follow-up never happened. One small slip can cost time, money, and trust.
            </p>
            <p className="hero-paragraph">
             This isn’t just an appointment scheduling platform. It’s your all-in-one business and life management tool — built to help you stay on top of every commitment without the stress.
            </p>
            
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

      {/* Perks Section */}


      

      {/* Values Section */}
      <section className="values-section">
        <div className="values-grid">
          <div className="values-image">
            <img src="https://gethppy.com/wp-content/uploads/2018/07/3-Workplace-Wellbeing-Initiatives-That-Will-Boost-Productivity.jpg" alt="Team working" className="image-fill" />
          </div>
          <div className="values-content">
            <div className="values-tag">- Our values -</div>
            <h2 className="values-title">Let’s be honest.</h2>
            <p className="values-sub">Life is coming at you fast — clients to manage, meetings to schedule, deadlines to hit, and personal responsibilities you can’t drop. Whether you’re an entrepreneur, a consultant, a student organizing study groups, a virtual assistant juggling multiple clients, a busy supervisor, or a parent trying to keep the family calendar from falling apart… one thing is certain:</p>
            <p className="values-desc">You can’t afford to forget.</p>
            <p className="values-desc">That’s where Don’t Forget comes in.</p>
            <ul className="values-list">
              <li className="values-item">
                <div className="v-icon"><FiCalendar /></div>
                <div>
                  <div className="v-title">Stay on top of clients, meetings, and deadlines</div>
                  <div className="v-desc">Plan with clarity and keep your schedule under control.</div>
                </div>
              </li>
              <li className="values-item">
                <div className="v-icon"><FiBell /></div>
                <div>
                  <div className="v-title">Never miss a follow‑up or opportunity</div>
                  <div className="v-desc">Smart reminders surface what matters exactly when you need it.</div>
                </div>
              </li>
              <li className="values-item">
                <div className="v-icon"><FiUsers /></div>
                <div>
                  <div className="v-title">Organize work and life in one place</div>
                  <div className="v-desc">Bring tasks, bookings, and responsibilities together—without the chaos.</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>


      <section className="perks-section">
        <div className="perks-container">
          <div className="section-header">
            <div className="section-tag">- Perks -</div>
            <h2 className="section-title">Main Reasons Why You Should Choose Us</h2>
            <p className="section-subtitle">This isn’t just an appointment scheduling platform. It’s your all-in-one business and life management tool — built to help you stay on top of every commitment without the stress.</p>
          </div>
          
          <div className="perks-grid">
            <div className="perk-card">
              <div className="perk-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11ZM23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="perk-title">Online Booking Page</h3>
              <div className="perk-divider"></div>
              <p className="perk-description">Book and manage appointments online with a personalized public booking page.</p>
            </div>
            
            <div className="perk-card">
              <div className="perk-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.663 17H4.337C3.603 17 3 16.397 3 15.663V8.337C3 7.603 3.603 7 4.337 7H9.663C10.397 7 11 7.603 11 8.337V15.663C11 16.397 10.397 17 9.663 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12H11M21 12L17 8M21 12L17 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="perk-title">Instant Payments</h3>
              <div className="perk-divider"></div>
              <p className="perk-description">Accept payments via Stripe or PayPal — no extra steps, no chasing invoices.</p>
            </div>
            
            <div className="perk-card">
              <div className="perk-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 1V23M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6312 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6312 13.6815 18 14.5717 18 15.5C18 16.4283 17.6312 17.3185 16.9749 17.9749C16.3185 18.6312 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="perk-title">Built‑in Confirmations</h3>
              <div className="perk-divider"></div>
              <p className="perk-description">Send and receive confirmations right inside the platform — no email needed.</p>
            </div>

            <div className="perk-card">
              <div className="perk-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 5H21M8 5V3M16 5V3M7 11H10M7 15H13M7 19H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="perk-title">Follow‑ups & Notes</h3>
              <div className="perk-divider"></div>
              <p className="perk-description">Organize follow‑ups and notes so every client, project, or event stays on your radar.</p>
            </div>
          </div>
        </div>
      </section>
      
{/* Footer */}
      <SiteFooter />
    </div>
  );
};

export default Homepage;
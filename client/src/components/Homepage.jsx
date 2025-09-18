import React, { useState } from 'react';
import { FiZap, FiSettings, FiSmartphone, FiMail, FiPhone, FiFeather } from 'react-icons/fi';
import { useNavigate, Link } from 'react-router-dom';
import Header from './Header';
import SiteFooter from './SiteFooter';
import './Homepage.css';
import Blob from './Blog'
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
            <p className="hero-subtitle">We are the people who dream & do.</p>
            
            <div className="hero-buttons">
              <button className="btn-primary" onClick={handleGetStarted}>
                About us
              </button>
              <button className="btn-secondary" onClick={handleSignup}>
                Get Started
              </button>
            </div>
            
            <div className="hero-features">
              <span className="feature-tag">Smart Tasks</span>
              <span className="feature-tag">Easy Booking</span>
              <span className="feature-tag">Secure Payments</span>
              <span className="feature-tag">Smart Dashboard</span>
            </div>
          </div>
          
          <div className="hero-images">
            <div className="collage">
              <figure className="collage-item collage-main">
                <img src="https://makingmoveslondon.co.uk/wp-content/uploads/2019/03/AdobeStock_239027622-e1553244136278.jpeg" alt="Modern workspace" className="image-fill" />
              </figure>
              <figure className="collage-item collage-side top">
                <img src="https://gethppy.com/wp-content/uploads/2018/07/3-Workplace-Wellbeing-Initiatives-That-Will-Boost-Productivity.jpg" alt="Team collaboration" className="image-fill" />
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
            <h2 className="values-title">Daily Tasks, Bookings, and Seamless Meeting Links</h2>
            <p className="values-sub">
              Plan your day, book sessions, and connect fast.
            </p>
            <p className="values-desc">
              Don't Forget centralizes tasks, calendar bookings, and one-click meeting links so you stay on schedule and in control.
            </p>
            <ul className="values-list">
              <li className="values-item">
                <div className="v-icon"><FiZap /></div>
                <div>
                  <div className="v-title">Lightning-fast scheduling</div>
                  <div className="v-desc">Create tasks, set due times, and attach meeting links in seconds.</div>
                </div>
              </li>
              <li className="values-item">
                <div className="v-icon"><FiSettings /></div>
                <div>
                  <div className="v-title">Integrated bookings</div>
                  <div className="v-desc">Schedule calls, demos, and follow-ups that automatically carry your context.</div>
                </div>
              </li>
              <li className="values-item">
                <div className="v-icon"><FiSmartphone /></div>
                <div>
                  <div className="v-title">Never miss a follow-up</div>
                  <div className="v-desc">Smart reminders surface what’s next and keep links one tap away.</div>
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
            <p className="section-subtitle">Being a part of Don't Forget means enjoying every productive day!</p>
          </div>
          
          <div className="perks-grid">
            <div className="perk-card">
              <div className="perk-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11ZM23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="perk-title">Daily Task Planning</h3>
              <div className="perk-divider"></div>
              <p className="perk-description">Organize your day with priorities, due times, and clear action steps.</p>
            </div>
            
            <div className="perk-card">
              <div className="perk-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.663 17H4.337C3.603 17 3 16.397 3 15.663V8.337C3 7.603 3.603 7 4.337 7H9.663C10.397 7 11 7.603 11 8.337V15.663C11 16.397 10.397 17 9.663 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12H11M21 12L17 8M21 12L17 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="perk-title">Smart Meeting Links</h3>
              <div className="perk-divider"></div>
              <p className="perk-description">Attach Zoom/Meet links to tasks and join with one click when it’s time.</p>
            </div>
            
            <div className="perk-card">
              <div className="perk-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 1V23M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6312 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6312 13.6815 18 14.5717 18 15.5C18 16.4283 17.6312 17.3185 16.9749 17.9749C16.3185 18.6312 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="perk-title">Don’t Forget Follow-Ups</h3>
              <div className="perk-divider"></div>
              <p className="perk-description">Automatic reminders and a clear timeline help you follow up at the right time.</p>
            </div>
            
            <div className="perk-card">
              <div className="perk-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12H18L15 21L9 3L6 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="perk-title">Bookings & Scheduling</h3>
              <div className="perk-divider"></div>
              <p className="perk-description">Book sessions, demos, and calls that sync with your tasks and reminders.</p>
            </div>
          </div>
        </div>
      </section>

      <Blob/>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="benefits-container">
          <div className="benefits-content">
            <div className="section-tag">- Benefits -</div>
            <h2 className="section-title">Feel and Do Your Best</h2>
            <p className="section-subtitle">We really care about our users.</p>
            <p className="benefits-description">
              Don't Forget provides everything you need to stay organized, productive, and in control. 
              Our comprehensive platform ensures you never miss important tasks, deadlines, or opportunities.
            </p>
            
            <div className="benefits-list">
              <div className="benefit-item">
                <div className="benefit-check">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span>Full task management with smart reminders and notifications;</span>
              </div>
              <div className="benefit-item">
                <div className="benefit-check">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span>Secure payment processing and automated invoicing;</span>
              </div>
              <div className="benefit-item">
                <div className="benefit-check">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span>Customizable dashboard to make your workspace perfect:</span>
              </div>
            </div>
          </div>
          
          <div className="benefits-image">
            <div className="image-main large">
              <img
                src="https://imageio.forbes.com/specials-images/imageserve/676d5e469dbbcf09f3f0c2ca/Attractive-young-businesswoman-sitting-alone-in-the-office/960x0.jpg?height=474&width=711&fit=bounds"
                alt="Focused professional"
                className="image-fill"
              />
            </div>
          </div>
        </div>
      </section>
      
      

      {/* Join Team Section */}
      <section className="join-section">
        <div className="join-grid">
          <div className="join-content">
            <div className="join-tag">- Benefits -</div>
            <h2 className="join-title">Become a Part of Our Team</h2>
            <p className="join-sub">Don't Forget offers a stimulating work environment.</p>
            <p className="join-desc">Are you looking for an exciting opportunity? We are looking for talented individuals to join our team! We offer competitive salaries, great benefits, and an opportunity to grow professionally. We are committed to helping our team reach their greatest potential.</p>

            <div className="accordion">
              {[
                {title:'Employees Care', body:'We care for the material and moral side of each member. Everyone is active and supported in our company.'},
                {title:'Unity in Diversity', body:''},
                {title:'Talent Growth', body:''},
                {title:'Autonomy', body:''},
              ].map((item, idx) => (
                <div className="acc-item" key={idx}>
                  <div className="acc-head" onClick={() => setOpenAccIndex(openAccIndex === idx ? -1 : idx)}>
                    {item.title} <span>{openAccIndex === idx ? '−' : '+'}</span>
                  </div>
                  {openAccIndex === idx && item.body && (
                    <div className="acc-body">{item.body}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="join-image">
            <img src="https://images.pexels.com/photos/8867435/pexels-photo-8867435.jpeg" alt="Team at work" className="image-fill" />
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="contact-section" id="contact">
        <div className="contact-wrapper">
          <div className="contact-left">
            <h2 className="contact-left-title">Contact Us</h2>
            <p className="contact-left-desc">
              Not sure what you need? Our team will be happy to listen and
              suggest ideas you may not have considered.
            </p>
            <div className="contact-left-items">
              <div className="contact-left-item">
                <span className="contact-left-icon"><FiMail /></span>
                <span>info@dontforget.com</span>
              </div>
              <div className="contact-left-item">
                <span className="contact-left-icon"><FiPhone /></span>
                <span>Support: (+21) 123 456 586</span>
              </div>
            </div>
          </div>

          <div className="contact-card">
            <div className="contact-card-header">
              <h3 className="contact-card-title">We’d love to hear from you!</h3>
              <p className="contact-card-sub">Let’s get in touch</p>
            </div>
            <form className="contact-form-grid" onSubmit={(e) => { e.preventDefault(); alert('Thanks! Your message has been sent.'); }}>
              <div className="grid-2">
                <div className="form-field">
                  <label htmlFor="contact-name">Full Name</label>
                  <input id="contact-name" name="name" type="text" placeholder="Your full name" required />
                </div>
                <div className="form-field">
                  <label htmlFor="contact-email">Email</label>
                  <input id="contact-email" name="email" type="email" placeholder="you@example.com" required />
                </div>
              </div>
              <div className="grid-1">
                <div className="form-field">
                  <label htmlFor="contact-subject">Subject</label>
                  <input id="contact-subject" name="subject" type="text" placeholder="How can we help?" required />
                </div>
              </div>
              <div className="grid-1">
                <div className="form-field">
                  <label htmlFor="contact-message">Your Message</label>
                  <textarea id="contact-message" name="message" placeholder="Type your message here" rows="6" required />
                </div>
              </div>
              <div className="contact-card-actions">
                <button type="submit" className="contact-send-btn">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      </section>
      
{/* Footer */}
      <SiteFooter />
    </div>
  );
};

export default Homepage;
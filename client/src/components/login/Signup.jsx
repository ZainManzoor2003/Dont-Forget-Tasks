import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import Header from '../Header';
import SiteFooter from '../SiteFooter';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    roleTitle: '',
    phoneNumber: '',
    timezone: '',
    videoPlatform: 'Both',
    agree: false
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agree) {
      alert('You must agree to the Terms & Privacy Policy.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    console.log('Signup submitted:', formData);
    navigate('/dashboard');
  };

  return (
    <>
      <div className="login-container signup">
        <Header />
        <div className="signup-card">
          <div className="login-header">
            <h1>Don't Forget</h1>
            <p>Create your account</p>
          </div>

          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-group full">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group full">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Create a password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Re-enter your password"
              />
            </div>

            <div className="form-group full">
              <label htmlFor="businessName">Business Name (optional)</label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                placeholder="Your business name"
              />
            </div>

            <div className="form-group full">
              <label htmlFor="roleTitle">Role/Title</label>
              <input
                type="text"
                id="roleTitle"
                name="roleTitle"
                value={formData.roleTitle}
                onChange={handleChange}
                required
                placeholder="e.g., Founder, Student, Manager"
              />
            </div>

            <div className="form-group full">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                placeholder="Enter your phone number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="timezone">Timezone</label>
              <select
                id="timezone"
                name="timezone"
                value={formData.timezone}
                onChange={handleChange}
                required
              >
                <option value="">Select your timezone</option>
                <option value="UTC-08:00">Pacific (UTC-08:00)</option>
                <option value="UTC-07:00">Mountain (UTC-07:00)</option>
                <option value="UTC-06:00">Central (UTC-06:00)</option>
                <option value="UTC-05:00">Eastern (UTC-05:00)</option>
                <option value="UTC+00:00">UTC (UTC+00:00)</option>
                <option value="UTC+01:00">CET (UTC+01:00)</option>
                <option value="UTC+05:30">IST (UTC+05:30)</option>
                <option value="UTC+08:00">CST/SGT (UTC+08:00)</option>
                <option value="UTC+10:00">AEST (UTC+10:00)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="videoPlatform">Preferred Video Platform</label>
              <select
                id="videoPlatform"
                name="videoPlatform"
                value={formData.videoPlatform}
                onChange={handleChange}
                required
              >
                <option value="Zoom">Zoom</option>
                <option value="Google Meet">Google Meet</option>
                <option value="Both">Both</option>
              </select>
            </div>

            <div className="form-group full">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                  required
                />
                <span className="checkbox-text">I agree to the <a href="/privacy">Terms & Privacy Policy</a></span>
              </label>
            </div>

            <div className="form-note full">
              <small>Need help? See our <a href="/faq">FAQ</a>.</small>
            </div>

            <div className="full">
              <button type="submit" className="submit-button" style={{ width: '100%' }}>Create Account</button>
            </div>
          </form>

          <div className="toggle-mode">
            <p>
              Already have an account?
              <Link to="/login" className="toggle-button">Login</Link>
            </p>
          </div>
        </div>
      </div>
      <SiteFooter />
    </>
  );
};

export default Signup;



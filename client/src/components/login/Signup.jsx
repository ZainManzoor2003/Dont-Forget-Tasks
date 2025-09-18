import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import Header from '../Header';
import SiteFooter from '../SiteFooter';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup submitted:', formData);
    navigate('/dashboard');
  };

  return (
    <>
      <div className="login-container">
        <Header />
        <div className="login-card">
          <div className="login-header">
            <h1>Don't Forget</h1>
            <p>Create your account</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
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

            <button type="submit" className="submit-button">Create Account</button>
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



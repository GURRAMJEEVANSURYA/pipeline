import React, { useState } from 'react';
import './loginPopup.css';
import { login, signup, forgotPassword } from '../../api/api';
import { assets } from '../../assets/assets';

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotMessage, setForgotMessage] = useState('');

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      if (currState === "Sign up" && formData.password !== formData.confirmPassword) {
        setErrorMessage("Passwords do not match!");
        return;
      }

      if (currState === "Login") {
        const response = await login(formData.email, formData.password);
        setSuccessMessage(response.message || 'Login successful!');
        console.log('Login Response:', response);
      } else {
        const response = await signup(formData.name, formData.email, formData.password);
        setSuccessMessage('User has been Registered');
        console.log('Signup Response:', response);
      }

      setTimeout(() => {
        setShowLogin(false); // Close the popup
      }, 1000);
    } catch (error) {
      setErrorMessage(error.message || 'Something went wrong!');
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setForgotMessage('');
    try {
      forgotPassword(forgotEmail, (response) => {
        setForgotMessage(response.message || 'If this email exists, a reset link has been sent.');
      });
    } catch (error) {
      setForgotMessage('Error sending reset email.');
    }
  };

  return (
    <div className="loginPopup">
      <form className="login-popup-container" onSubmit={showForgotPassword ? handleForgotPassword : handleSubmit}>
        <div className="login-popup-title">
          <h2>{showForgotPassword ? 'Forgot Password' : currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Close"
          />
        </div>
        <div className="login-popup-input">
          {showForgotPassword ? (
            <input
              type="email"
              name="forgotEmail"
              placeholder="Enter your email"
              value={forgotEmail}
              onChange={e => setForgotEmail(e.target.value)}
              required
            />
          ) : (
            <>
              {currState === "Sign up" && (
                <>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </>
              )}
              {currState !== "Sign up" && (
                <>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </>
              )}
            </>
          )}
        </div>
        {showForgotPassword ? (
          <button type="submit">Send Reset Link</button>
        ) : (
          <>
            <button type="submit">{currState === "Sign up" ? "Create Account" : "Login"}</button>
            
          </>
        )}
        {errorMessage && !showForgotPassword && <p className="error-message">{errorMessage}</p>}
        {successMessage && !showForgotPassword && <p className="success-message">{successMessage}</p>}
        {forgotMessage && showForgotPassword && <p className="success-message">{forgotMessage}</p>}
        {!showForgotPassword && (
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>
        )}
        {!showForgotPassword && currState === "Login" && (
          <p style={{ marginTop: '8px' }}>
            <span style={{ color: '#007bff', cursor: 'pointer' }} onClick={() => setShowForgotPassword(true)}>
              Forgot Password?
            </span>
          </p>
        )}
        {!showForgotPassword && (currState === "Login" ? (
          <p>Create a new account? <span onClick={() => setCurrState("Sign up")}>Click here</span></p>
        ) : (
          <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
        ))}
        {showForgotPassword && (
          <p style={{ marginTop: '8px' }}>
            <span style={{ color: '#007bff', cursor: 'pointer' }} onClick={() => setShowForgotPassword(false)}>
              Back to Login
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
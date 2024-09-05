import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig';

function PasswordReset() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent. Please check your inbox.');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <div className="left">
        <img src="/images/login.png" alt="Arena Logo" className="logo" />
      </div>
      <div className="right">
        <form className="login-form" onSubmit={handlePasswordReset}>
          <img src="/images/white-logo.png" alt="Reset Password" className="white-logo-signup" />
          <h2>Reset Password</h2>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <button type="submit" className="btn">Send Reset Email</button>
          {message && <div className="success-message">{message}</div>}
          {error && <div className="error-message">{error}</div>}
        </form>
        <p className="login">
          Remember your password? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default PasswordReset;

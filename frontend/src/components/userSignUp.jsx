import React, { useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isEmployer, setIsEmployer] = useState(false);
  const navigate = useNavigate();

  // Password validation logic
  const isPasswordValid = password.length >= 8 && /\d/.test(password);
  const isConfirmPasswordValid = password !== '' && confirmPassword !== '' && password === confirmPassword;

  const handleEmailPasswordSignup = async (e) => {
    e.preventDefault();
    if (!isPasswordValid || !isConfirmPasswordValid) {
      setError('Please fix the errors before submitting.');
      return;
    }
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      console.log('User created in Firebase with UID:', userCredential.user.uid);

      const response = await fetch('/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
          companyName: isEmployer ? companyName : undefined,
          companyEmail: isEmployer ? companyEmail : undefined,
          companyWebsite: isEmployer ? companyWebsite : undefined,
          companyPhone: isEmployer ? companyPhone : undefined,
          companyAddress: isEmployer ? companyAddress : undefined,
          role: isEmployer ? 'employer' : 'jobseeker',
          firebase_uid: userCredential.user.uid // Add this line
        })
      });

      if (response.ok) {
        navigate('/login');
      } else {
        const data = await response.json();
        setError(data.error || 'Signup failed. Please try again.');
      }
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('Email already exists. <a href="/login">Login</a> or <a href="/reset-password">Reset Password</a>');
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();
      console.log('User signed in with Google with UID:', user.uid);

      const response = await fetch('/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        body: JSON.stringify({
          email: user.email,
          firstName: user.displayName?.split(' ')[0],
          lastName: user.displayName?.split(' ')[1],
          role: 'jobseeker' // Update as needed
        })
      });

      if (response.ok) {
        navigate('/login');
      } else {
        const data = await response.json();
        setError(data.error || 'Signup failed. Please try again.');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <div className="left">
        <img src="/images/login.png" alt="Arena Logo" className="logo" />
      </div>
      <div className="right">
        <div className="tabs">
          <button
            onClick={() => setIsEmployer(false)}
            className={`tab ${!isEmployer ? 'active' : ''}`}
          >
            Job Seeker
          </button>
          <button
            onClick={() => setIsEmployer(true)}
            className={`tab ${isEmployer ? 'active' : ''}`}
          >
            Employer
          </button>
        </div>

        <form className="login-form" onSubmit={handleEmailPasswordSignup}>
          <img src="/images/white-logo.png" alt="Signup" className="white-logo-signup" />
          <div className="name-inputs">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                placeholder="Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                placeholder="Name"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
            />
          </div>
          {isEmployer && (
            <>
              <div className="employer-inputs">
                <div className="form-group">
                  <label htmlFor="companyName">Company Name</label>
                  <input
                    type="text"
                    id="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                    placeholder="Enter your Company name"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="companyWebsite">Company Website</label>
                  <input
                    type="text"
                    id="companyWebsite"
                    value={companyWebsite}
                    onChange={(e) => setCompanyWebsite(e.target.value)}
                    placeholder="Website"
                  />
                </div>
              </div>
              <div className="employer-inputs">
                <div className="form-group tooltip-container">
                  <label htmlFor="companyEmail">
                    Your Business Email
                    <img src="/images/info-icon.png" alt="Info" className="tooltip-icon" />
                    <span className="tooltip-text">Business email must match website domain</span>
                  </label>
                  <input
                    type="email"
                    id="companyEmail"
                    value={companyEmail}
                    onChange={(e) => setCompanyEmail(e.target.value)}
                    required
                    placeholder="Email"
                  />
                </div>
                <div className="form-group tooltip-container">
                  <label htmlFor="companyPhone">
                    Company Phone
                    <img src="/images/info-icon.png" alt="Info" className="tooltip-icon" />
                    <span className="tooltip-text">Please provide business phone</span>
                  </label>
                  <input
                    type="text"
                    id="companyPhone"
                    value={companyPhone}
                    onChange={(e) => setCompanyPhone(e.target.value)}
                    placeholder="Phone"
                  />
                </div>
              </div>
              <div className="form-group tooltip-container">
                <label htmlFor="companyAddress">
                  Company Address
                  <img src="/images/info-icon.png" alt="Info" className="tooltip-icon" />
                  <span className="tooltip-text">Please provide company's address</span>
                </label>
                <input
                  type="text"
                  id="companyAddress"
                  value={companyAddress}
                  onChange={(e) => setCompanyAddress(e.target.value)}
                  placeholder="Address"
                />
              </div>
            </>
          )}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter password"
              />
              <button type="button" className="show-password-button" onClick={togglePasswordVisibility}>
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {password && !isPasswordValid && <span className="alert" style={{ color: 'red' }}>✗ Password must be at least 8 characters and include a number</span>}
            {password && isPasswordValid && <span className="alert" style={{ color: 'green' }}>✓ Valid password</span>}
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="password-input-container">
              <input
                type={showPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm password"
              />
            </div>
            {password && confirmPassword && !isConfirmPasswordValid && <span className="alert" style={{ color: 'red' }}>✗ Passwords must match</span>}
            {password && confirmPassword && isConfirmPasswordValid && <span className="alert" style={{ color: 'green' }}>✓ Passwords match</span>}
          </div>
          <button type="submit" className="btn" disabled={loading || !isPasswordValid || !isConfirmPasswordValid}>
          {loading ? 'Signing up...' : 'Continue'}
        </button>
        {!isEmployer && (
          <>
            <button type="button" onClick={handleGoogleSignup} className="btn google-btn" style={{backgroundColor:'white', color:'black'}} disabled={loading}>
              <img src="/images/google-logo.png" alt="Google Logo" className="google-logo" />
              {loading ? 'Signing up with Google...' : 'Sign Up with Google'}
            </button>
            <hr className="divider" />
          </>
        )}
        {error && <div className="error-message" dangerouslySetInnerHTML={{ __html: error }}></div>}
      </form>
        <p className="login">
          Already have an account? <a href="/login">Login</a>
        </p>
        <p className="terms">
          By clicking 'Continue', you acknowledge that you have read and accept the <a href="/terms">Terms of Service</a> and <a href="/privacy-policy">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}

export default Signup;

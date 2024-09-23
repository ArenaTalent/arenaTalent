import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

// List of common free email providers
const freeEmailProviders = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com',
  'icloud.com', 'mail.com', 'protonmail.com', 'zoho.com', 'yandex.com'
];

async function checkDomainMXRecord(domain) {
  try {
    const response = await fetch(`https://dns.google/resolve?name=${domain}&type=MX`);
    const data = await response.json();
    return data.Answer && data.Answer.length > 0;
  } catch (error) {
    console.error('Error checking MX record:', error);
    return false;
  }
}

async function isValidDomain(email) {
  const domain = email.split('@')[1];

  if (freeEmailProviders.includes(domain)) {
    return false;
  }

  const hasMXRecord = await checkDomainMXRecord(domain);

  return hasMXRecord;
}


function Signup() {
  const [step, setStep] = useState(1);
  const [isEmployer, setIsEmployer] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    address: '',
    phone: '',
    eventCode: '',
    companyEmail: '',
    personalEmail: '',
    title: '',
    companyAddress: '',
    companyPhone: '',
    companySize: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Simple address autocomplete simulation
  useEffect(() => {
    if (formData.address.length > 3) {
      // This is a mock function. In a real scenario, you'd call an API here.
      const mockSuggestions = [
        formData.address + " Street",
        formData.address + " Avenue",
        formData.address + " Road"
      ];
      setAddressSuggestions(mockSuggestions);
    } else {
      setAddressSuggestions([]);
    }
  }, [formData.address]);

  const selectAddress = (address) => {
    setFormData({ ...formData, address });
    setAddressSuggestions([]);
  };

  const isPasswordValid = formData.password.length >= 8 && /\d/.test(formData.password);
  const isConfirmPasswordValid = formData.password !== '' && formData.confirmPassword !== '' && formData.password === formData.confirmPassword;

  const isOver18 = (dateString) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 18;
  };

  const handleNextStep = async () => {
    if (step === 1) {
      if (!isPasswordValid || !isConfirmPasswordValid) {
        setError('Please fix the password errors before continuing.');
        return;
      }
      if (isEmployer) {
        setLoading(true);
        const isValid = await isValidDomain(formData.companyEmail);
        setLoading(false);
        if (!isValid) {
          setError('Please use a valid company email address. Free email providers are not allowed.');
          return;
        }
      }
      setStep(2);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isOver18(formData.dateOfBirth)) {
      setError('You must be at least 18 years old to sign up.');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const email = isEmployer ? formData.companyEmail : formData.email;
      const userCredential = await createUserWithEmailAndPassword(auth, email, formData.password);
      await sendEmailVerification(userCredential.user);

      const response = await fetch('/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          role: isEmployer ? 'employer' : 'jobseeker',
          firebase_uid: userCredential.user.uid,
        }),
      });

      if (response.ok) {
        navigate('/verify-email');
      } else {
        const data = await response.json();
        setError(data.error || 'Signup failed. Please try again.');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderJobSeekerForm = () => (
    <>
      {step === 1 && (
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="password">Password</label>
          <div className="password-input-container">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <button type="button" className="show-password-button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {formData.password && !isPasswordValid && <span className="alert" style={{ color: 'red' }}>✗ Password must be at least 8 characters and include a number</span>}
          {formData.password && isPasswordValid && <span className="alert" style={{ color: 'green' }}>✓ Valid password</span>}
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="password-input-container">
            <input
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          {formData.password && formData.confirmPassword && !isConfirmPasswordValid && <span className="alert" style={{ color: 'red' }}>✗ Passwords must match</span>}
          {formData.password && formData.confirmPassword && isConfirmPasswordValid && <span className="alert" style={{ color: 'green' }}>✓ Passwords match</span>}
        </div>
      )}
      {step === 2 && (
        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
          {addressSuggestions.length > 0 && (
            <ul className="address-suggestions">
              {addressSuggestions.map((suggestion, index) => (
                <li key={index} onClick={() => selectAddress(suggestion)}>{suggestion}</li>
              ))}
            </ul>
          )}
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="eventCode">Event Code (Optional)</label>
          <input
            type="text"
            id="eventCode"
            name="eventCode"
            value={formData.eventCode}
            onChange={handleInputChange}
          />
        </div>
      )}
    </>
  );

  const renderEmployerForm = () => (
    <>
      {step === 1 && (
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="companyEmail">Company Email</label>
          <input
            type="email"
            id="companyEmail"
            name="companyEmail"
            value={formData.companyEmail}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="password">Password</label>
          <div className="password-input-container">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <button type="button" className="show-password-button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {formData.password && !isPasswordValid && <span className="alert" style={{ color: 'red' }}>✗ Password must be at least 8 characters and include a number</span>}
          {formData.password && isPasswordValid && <span className="alert" style={{ color: 'green' }}>✓ Valid password</span>}
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="password-input-container">
            <input
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          {formData.password && formData.confirmPassword && !isConfirmPasswordValid && <span className="alert" style={{ color: 'red' }}>✗ Passwords must match</span>}
          {formData.password && formData.confirmPassword && isConfirmPasswordValid && <span className="alert" style={{ color: 'green' }}>✓ Passwords match</span>}
        </div>
      )}
      {step === 2 && (
        <div className="form-group">
          <label htmlFor="personalEmail">Personal Email</label>
          <input
            type="email"
            id="personalEmail"
            name="personalEmail"
            value={formData.personalEmail}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="companyAddress">Company Address</label>
          <input
            type="text"
            id="companyAddress"
            name="companyAddress"
            value={formData.companyAddress}
            onChange={handleInputChange}
            required
          />
          {addressSuggestions.length > 0 && (
            <ul className="address-suggestions">
              {addressSuggestions.map((suggestion, index) => (
                <li key={index} onClick={() => selectAddress(suggestion)}>{suggestion}</li>
              ))}
            </ul>
          )}
          <label htmlFor="companyPhone">Company Phone</label>
          <input
            type="tel"
            id="companyPhone"
            name="companyPhone"
            value={formData.companyPhone}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="companySize">Company Size</label>
          <select
            id="companySize"
            name="companySize"
            value={formData.companySize}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Company Size</option>
            <option value="1-10">1-10 employees</option>
            <option value="11-50">11-50 employees</option>
            <option value="51-200">51-200 employees</option>
            <option value="201-500">201-500 employees</option>
            <option value="501+">501+ employees</option>
          </select>
          <label htmlFor="eventCode">Event Code (Optional)</label>
          <input
            type="text"
            id="eventCode"
            name="eventCode"
            value={formData.eventCode}
            onChange={handleInputChange}
          />
        </div>
      )}
    </>
  );

  return (
    <div className="container" style={{ fontFamily: 'Open Sans, sans-serif' }}>
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

        <form className="login-form" onSubmit={handleSubmit}>
          <img src="/images/black-logo.png" alt="Signup" style={{height: '100px'}}className="white-logo-signup" />

          {isEmployer ? renderEmployerForm() : renderJobSeekerForm()}

          {error && <div className="error-message">{error}</div>}

          {step === 1 ? (
            <button type="button" className="btn" onClick={handleNextStep} disabled={loading}>
              {loading ? 'Checking...' : 'Next'}
            </button>
          ) : (
            <button type="submit" className="btn" disabled={loading}>
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>
          )}
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

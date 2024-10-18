import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import useGoogleMapsScript from '../hooks/useGoogleMapsScript';

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

export default function Signup() {
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
    couponCode: '',
    companyName: '',
    companyWebsite: '',
    title: '',
    companyAddress: '',
    companyPhone: '',
    companySize: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [addressComponents, setAddressComponents] = useState({});
  const [companyAddressComponents, setCompanyAddressComponents] = useState({});
  const [websiteDoesNotMatch, setWebsiteDoesNotMatch] = useState(false);

  const navigate = useNavigate();
  const jobSeekerAddressInputRef = useRef(null);
  const jobSeekerAutocompleteRef = useRef(null);
  const employerAddressInputRef = useRef(null);
  const employerAutocompleteRef = useRef(null);

  const { isLoaded, loadError } = useGoogleMapsScript();

  const resetState = useCallback(() => {
    setStep(1);
    setIsEmployer(false);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      dateOfBirth: '',
      address: '',
      phone: '',
      eventCode: '',
      couponCode: '',
      companyName: '',
      companyWebsite: '',
      title: '',
      companyAddress: '',
      companyPhone: '',
      companySize: '',
    });
    setError(null);
    setLoading(false);
    setShowPassword(false);
    setAddressComponents({});
    setCompanyAddressComponents({});
    setWebsiteDoesNotMatch(false);

    if (jobSeekerAutocompleteRef.current) {
      window.google.maps.event.clearInstanceListeners(jobSeekerAutocompleteRef.current);
      jobSeekerAutocompleteRef.current = null;
    }
    if (employerAutocompleteRef.current) {
      window.google.maps.event.clearInstanceListeners(employerAutocompleteRef.current);
      employerAutocompleteRef.current = null;
    }
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      resetState();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [resetState]);

// Updated handlePlaceSelect function
const handlePlaceSelect = useCallback((autocompleteRef, setComponents) => {
  if (autocompleteRef.current) {
    const place = autocompleteRef.current.getPlace();
    const components = {};
    place.address_components.forEach((component) => {
      const type = component.types[0];
      components[type] = component.long_name;
    });
    setComponents(components);
    setFormData(prev => ({
      ...prev,
      [isEmployer ? 'companyAddress' : 'address']: place.formatted_address,
    }));
  }
}, [isEmployer]);

// Updated initializeAutocomplete function
const initializeAutocomplete = useCallback(() => {
  if (jobSeekerAddressInputRef.current && !jobSeekerAutocompleteRef.current) {
    jobSeekerAutocompleteRef.current = new window.google.maps.places.Autocomplete(
      jobSeekerAddressInputRef.current,
      { types: ['address'] }
    );
    jobSeekerAutocompleteRef.current.addListener('place_changed', () => handlePlaceSelect(jobSeekerAutocompleteRef, setAddressComponents));
  }

  if (employerAddressInputRef.current && !employerAutocompleteRef.current) {
    employerAutocompleteRef.current = new window.google.maps.places.Autocomplete(
      employerAddressInputRef.current,
      { types: ['address'] }
    );
    employerAutocompleteRef.current.addListener('place_changed', () => handlePlaceSelect(employerAutocompleteRef, setCompanyAddressComponents));
  }
}, [handlePlaceSelect]);

  useEffect(() => {
    if (isLoaded && !loadError) {
      initializeAutocomplete();
    }
  }, [isLoaded, loadError, initializeAutocomplete, step, isEmployer]);

  useEffect(() => {
    if (loadError) {
      console.error('Load error:', loadError);
      setError('Unable to load address autocomplete. Please enter your address manually.');
    }
  }, [loadError]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleCompanyDomainChange = (e) => {
    const newDomain = e.target.value;
    setFormData(prevData => ({ ...prevData, companyWebsite: newDomain }));
    checkWebsiteMatch(newDomain, formData.email);
  };

  const handleCompanyEmailChange = (e) => {
    const newEmail = e.target.value;
    setFormData(prevData => ({ ...prevData, email: newEmail }));
    checkWebsiteMatch(formData.companyWebsite, newEmail);
  };


  const checkWebsiteMatch = (domain, email) => {
    if (domain && email) {
      const emailDomain = email.split('@')[1];
      setWebsiteDoesNotMatch(emailDomain !== domain);
    } else {
      setWebsiteDoesNotMatch(false);
    }
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

  useEffect(() => {
    setError(null);
  }, [formData.email, formData.companyWebsite, formData.password, formData.confirmPassword]);

  const validateCompanyEmail = () => {
    const emailDomain = formData.email.split('@')[1];
    return emailDomain === formData.companyWebsite;
  };

  const handleNextStep = async () => {
    if (step === 1) {
      if (!isPasswordValid || !isConfirmPasswordValid) {
        setError('Please fix the password errors before continuing.');
        return;
      }
      // if (isEmployer) {
      //   if (!validateCompanyEmail()) {
      //     setError('Company email domain must match the provided company domain.');
      //     return;
      //   }
      //   setLoading(true);
      //   const isValid = await isValidDomain(formData.email);
      //   setLoading(false);
      //   if (!isValid) {
      //     setError('Please use a valid company email address. Free email providers are not allowed.');
      //     return;
      //   }
      // }
      setStep(2);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEmployer && !isOver18(formData.dateOfBirth)) {
      setError('You must be at least 18 years old to sign up.');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await sendEmailVerification(userCredential.user);

      const apiUrl = `${process.env.REACT_APP_BACKEND_URL}/api/users/signup`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          role: isEmployer ? 'employer' : 'jobseeker',
          firebase_uid: userCredential.user.uid,
          domain_verified: isEmployer ? !websiteDoesNotMatch : undefined,
          addressComponents: isEmployer ? companyAddressComponents : addressComponents,
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


  const renderAddressFields = (isEmployer = false) => (
    <div className="form-group">
      <label htmlFor={isEmployer ? "companyAddress" : "address"}>
        {isEmployer ? "Company Address" : "Address"}<span className="required">*</span>
      </label>
      <input
        type="text"
        id={isEmployer ? "companyAddress" : "address"}
        name={isEmployer ? "companyAddress" : "address"}
        ref={isEmployer ? employerAddressInputRef : jobSeekerAddressInputRef}
        value={isEmployer ? formData.companyAddress : formData.address}
        onChange={handleInputChange}
        placeholder={isLoaded ? `Enter ${isEmployer ? 'company ' : ''}address` : `Enter ${isEmployer ? 'company ' : ''}address (autocomplete unavailable)`}
        required
      />
    </div>
  );

  const renderJobSeekerForm = () => (
    <>
      {step === 1 && (
        <div className="form-group">
          <div className="horizontal-fields">
            <div className="field-group">
              <label htmlFor="firstName">First Name<span className="required">*</span></label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="field-group">
              <label htmlFor="lastName">Last Name<span className="required">*</span></label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <label htmlFor="email">Email<span className="required">*</span></label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="password">Password<span className="required">*</span></label>
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

          <label htmlFor="confirmPassword">Confirm Password<span className="required">*</span></label>
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

          {formData.password && (
            <div>
              <span className="alert" style={{ color: isPasswordValid ? 'green' : 'red' }}>
                {isPasswordValid ? '✓' : '✗'} Password must be at least 8 characters and include a number
              </span>
            </div>
          )}
          {formData.password && formData.confirmPassword && (
            <div>
              <span className="alert" style={{ color: isConfirmPasswordValid ? 'green' : 'red' }}>
                {isConfirmPasswordValid ? '✓' : '✗'} Passwords must match
              </span>
            </div>
          )}
        </div>
      )}
      {step === 2 && (
        <div className="form-group">
          <div className="label-with-info">
            <label htmlFor="dateOfBirth">Date of Birth<span className="required">*</span></label>
          </div>
          <input
            type="date"
            id="dateOfBirth"
            className="date-input-signup"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            required
          />
          {renderAddressFields(false)}
          <div className="horizontal-fields">
            <div className="field-group">
              <label htmlFor="phone">Phone Number<span className="required">*</span></label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="field-group">
            <label htmlFor="eventCode">Event Code (Optional)</label>
            <input
              type="text"
              id="eventCode"
              name="eventCode"
              value={formData.eventCode}
              onChange={handleInputChange}
            />
          </div>
          <div className="field-group">
            <label htmlFor="couponCode">Coupon Code (Optional)</label>
            <input
              type="text"
              id="couponCode"
              name="couponCode"
              value={formData.couponCode}
              onChange={handleInputChange}
            />
          </div>
        </div>
      )}
    </>
  );

  const renderEmployerForm = () => (
    <>
      {step === 1 && (
        <div className="form-group">
          <div className="horizontal-fields">
            <div className="field-group">
              <label htmlFor="firstName">First Name<span className="required">*</span></label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="field-group">
              <label htmlFor="lastName">Last Name<span className="required">*</span></label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="field-group">
            <label htmlFor="companyName">Company Name<span className="required">*</span></label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="horizontal-fields">
            <div className="field-group">
              <label htmlFor="companyWebsite">Company Website (without www.)<span className="required">*</span></label>
              <input
                type="text"
                id="companyWebsite"
                name="companyWebsite"
                value={formData.companyWebsite}
                onChange={handleCompanyDomainChange}
                required
              />
            </div>
            <div className="field-group">
              <label htmlFor="email">Company Email<span className="required">*</span></label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleCompanyEmailChange}
                required
              />
            </div>
          </div>

          <label htmlFor="password">Password<span className="required">*</span></label>
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

          <label htmlFor="confirmPassword">Confirm Password<span className="required">*</span></label>
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

          {formData.password && (
            <div>
              <span className="alert" style={{ color: isPasswordValid ? 'green' : 'red' }}>
                {isPasswordValid ? '✓' : '✗'} Password must be at least 8 characters and include a number
              </span>
            </div>
          )}
          {formData.password && formData.confirmPassword && (
            <div>
              <span className="alert" style={{ color: isConfirmPasswordValid ? 'green' : 'red' }}>
                {isConfirmPasswordValid ? '✓' : '✗'} Passwords must match
              </span>
            </div>
          )}
        </div>
      )}
      {step === 2 && (
        <div className="form-group">
          {renderAddressFields(true)}
          <div className="horizontal-fields">
            <div className="field-group">
              <label htmlFor="title">Contact Title<span className="required">*</span></label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder='e.g. HR Manager'
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="field-group">
              <label htmlFor="companySize">Company Size<span className="required">*</span></label>
              <select
                id="companySize"
                name="companySize"
                className="company-size-select"
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
            </div>
          </div>
          <div className="field-group">
            <label htmlFor="companyPhone">Company Phone<span className="required">*</span></label>
            <input
              type="tel"
              id="companyPhone"
              name="companyPhone"
              value={formData.companyPhone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="field-group">
            <label htmlFor="eventCode">Event Code (Optional)</label>
            <input
              type="text"
              id="eventCode"
              name="eventCode"
              value={formData.eventCode}
              onChange={handleInputChange}
            />
          </div>
          <div className="field-group">
            <label htmlFor="couponCode">Coupon Code (Optional)</label>
            <input
              type="text"
              id="couponCode"
              name="couponCode"
              value={formData.couponCode}
              onChange={handleInputChange}
            />
          </div>
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
          <img src="/images/black-logo.png" alt="Signup" style={{height: '100px'}} className="white-logo-signup" />

          {isEmployer ? renderEmployerForm() : renderJobSeekerForm()}

          {error && <div className="error-message">{error}</div>}

          {step === 1 ? (
            <button
              type="button"
              className="btn"
              onClick={handleNextStep}
              disabled={loading || error !== null}
            >
              {loading ? 'Checking...' : 'Next'}
            </button>
          ) : (
            <button type="submit" className="btn" disabled={loading}>
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>
          )}

          <p className="required-fields-note"><span className="required">*</span> Required</p>
        </form>
        <p className="terms">
          By signing up, you acknowledge that you have read and accept the{' '}
          <a href="https://www.arenatalent.com/terms-of-service" target="_blank" rel="noopener noreferrer">Terms of Service</a> and{' '}
          <a href="https://www.arenatalent.com/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
        </p>
        <p className="login">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

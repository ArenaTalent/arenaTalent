import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

// List of common free email providers
const freeEmailProviders = [
  'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com',
  'icloud.com', 'mail.com', 'protonmail.com', 'zoho.com', 'yandex.com'
];

// Global variable to track Google Maps API loading state
window.googleMapsApiLoaded = window.googleMapsApiLoaded || false;

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
  const [addressComponents, setAddressComponents] = useState({
    street_number: '',
    route: '',
    locality: '',
    administrative_area_level_1: '',
    postal_code: '',
    country: '',
  });
  const [companyDomain, setCompanyDomain] = useState('');
  const [companyAddressComponents, setCompanyAddressComponents] = useState({
    street_number: '',
    route: '',
    locality: '',
    administrative_area_level_1: '',
    postal_code: '',
    country: '',
  });

  const navigate = useNavigate();
  const autocompleteRef = useRef(null);
  const addressInputRef = useRef(null);
  const companyAutocompleteRef = useRef(null);
  const companyAddressInputRef = useRef(null);

  const loadGoogleMapsAPI = useCallback(() => {
    return new Promise((resolve, reject) => {
      if (window.googleMapsApiLoaded) {
        resolve(window.google.maps);
        return;
      }

      window.initGoogleMapsAPI = () => {
        window.googleMapsApiLoaded = true;
        resolve(window.google.maps);
      };

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB6gP-Zq6mIDhh3FXbs3Js-ua_9FtIqLYA&libraries=places&callback=initGoogleMapsAPI`;
      script.async = true;
      script.defer = true;

      script.onerror = () => {
        reject(new Error('Google Maps API failed to load'));
      };

      document.head.appendChild(script);
    });
  }, []);

  useEffect(() => {
    loadGoogleMapsAPI()
      .then(() => {
        initializeAutocomplete();
      })
      .catch((error) => {
        console.error('Error loading Google Maps API:', error);
      });

    return () => {
      // Cleanup function
      if (autocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
      if (companyAutocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(companyAutocompleteRef.current);
      }
    };
  }, [loadGoogleMapsAPI]);

  const initializeAutocomplete = useCallback(() => {
    if (!window.google || !window.google.maps || !window.google.maps.places) {
      console.error('Google Maps API not loaded');
      return;
    }

    if (addressInputRef.current && !autocompleteRef.current) {
      autocompleteRef.current = new window.google.maps.places.Autocomplete(
        addressInputRef.current,
        { types: ['address'] }
      );
      autocompleteRef.current.addListener('place_changed', handlePlaceSelect);
    }
    if (companyAddressInputRef.current && !companyAutocompleteRef.current) {
      companyAutocompleteRef.current = new window.google.maps.places.Autocomplete(
        companyAddressInputRef.current,
        { types: ['address'] }
      );
      companyAutocompleteRef.current.addListener('place_changed', handleCompanyPlaceSelect);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleCompanyDomainChange = (e) => {
    setCompanyDomain(e.target.value);
  };

  const handlePlaceSelect = useCallback(() => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      updateAddressComponents(place, setAddressComponents);
      setFormData(prev => ({
        ...prev,
        address: addressInputRef.current.value,
      }));
    }
  }, []);

  const handleCompanyPlaceSelect = useCallback(() => {
    if (companyAutocompleteRef.current) {
      const place = companyAutocompleteRef.current.getPlace();
      updateAddressComponents(place, setCompanyAddressComponents);
      setFormData(prev => ({
        ...prev,
        companyAddress: companyAddressInputRef.current.value,
      }));
    }
  }, []);

  const updateAddressComponents = (place, setComponents) => {
    if (!place.address_components) return;

    const components = {
      street_number: '',
      route: '',
      locality: '',
      administrative_area_level_1: '',
      postal_code: '',
      country: '',
    };

    place.address_components.forEach(component => {
      const type = component.types[0];
      if (components.hasOwnProperty(type)) {
        components[type] = component.long_name;
      }
    });

    setComponents(components);
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
  }, [formData.companyEmail, companyDomain, formData.password, formData.confirmPassword]);

  const validateCompanyEmail = () => {
    const emailDomain = formData.companyEmail.split('@')[1];
    return emailDomain === companyDomain;
  };

  const handleNextStep = async () => {
    if (step === 1) {
      if (!isPasswordValid || !isConfirmPasswordValid) {
        setError('Please fix the password errors before continuing.');
        return;
      }
      if (isEmployer) {
        if (!validateCompanyEmail()) {
          setError('Company email domain must match the provided company domain.');
          return;
        }
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
    if (!isEmployer && !isOver18(formData.dateOfBirth)) {
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

  const renderAddressFields = () => (
    <div className="form-group">
      <label htmlFor="address">Address</label>
      <input
        type="text"
        id="address"
        name="address"
        ref={addressInputRef}
        value={formData.address}
        onChange={handleInputChange}
        placeholder="Enter your address"
        required
      />
      <input
        type="text"
        id="apt-suite"
        name="aptSuite"
        value={formData.aptSuite || ''}
        onChange={handleInputChange}
        placeholder="Apt, Suite, etc (optional)"
      />
      <div className="horizontal-fields">
        <input
          type="text"
          id="city"
          name="city"
          value={addressComponents.locality}
          onChange={handleInputChange}
          placeholder="City"
          readOnly
        />
        <input
          type="text"
          id="state"
          name="state"
          value={addressComponents.administrative_area_level_1}
          onChange={handleInputChange}
          placeholder="State/Province"
          readOnly
        />
      </div>
      <div className="horizontal-fields">
        <input
          type="text"
          id="zipCode"
          name="zipCode"
          value={addressComponents.postal_code}
          onChange={handleInputChange}
          placeholder="Zip/Postal code"
          readOnly
        />
        <input
          type="text"
          id="country"
          name="country"
          value={addressComponents.country}
          onChange={handleInputChange}
          placeholder="Country"
          readOnly
        />
      </div>
    </div>
  );

  const renderJobSeekerForm = () => (
    <>
      {step === 1 && (
        <div className="form-group">
          <div className="horizontal-fields">
            <div className="field-group">
              <label htmlFor="firstName">First Name</label>
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
              <label htmlFor="lastName">Last Name</label>
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
          <div className="label-with-info">
            <label htmlFor="dateOfBirth">Date of Birth</label>
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
          {renderAddressFields()}
          <div className="horizontal-fields">
            <div className="field-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
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
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="field-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="horizontal-fields">
            <div className="field-group">
              <label htmlFor="companyDomain">Company Domain</label>
              <input
                type="text"
                id="companyDomain"
                name="companyDomain"
                value={companyDomain}
                placeholder="e.g. company.com leave off www."
                onChange={handleCompanyDomainChange}
                required
              />
            </div>
            <div className="field-group">
              <label htmlFor="companyEmail">Company Email</label>
              <input
                type="email"
                id="companyEmail"
                placeholder="hello@arenatalent.com"
                name="companyEmail"
                value={formData.companyEmail}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="horizontal-fields">
            <div className="field-group">
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
            </div>
            <div className='field-group'>
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
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="form-group">
          <label htmlFor="companyAddress">Company Address</label>
          <input
            type="text"
            id="companyAddress"
            name="companyAddress"
            ref={companyAddressInputRef}
            value={formData.companyAddress}
            onChange={handleInputChange}
            placeholder="Enter company address"
            required
          />
          <input
            type="text"
            id="company-apt-suite"
            name="companyAptSuite"
            value={formData.companyAptSuite || ''}
            onChange={handleInputChange}
            placeholder="Apt, Suite, etc (optional)"
          />
          <div className="horizontal-fields">
            <input
              type="text"
              id="companyCity"
              name="companyCity"
              value={companyAddressComponents.locality}
              onChange={handleInputChange}
              placeholder="City"
              readOnly
            />
            <input
              type="text"
              id="companyState"
              name="companyState"
              value={companyAddressComponents.administrative_area_level_1}
              onChange={handleInputChange}
              placeholder="State/Province"
              readOnly
            />
          </div>
          <div className="horizontal-fields">
            <input
              type="text"
              id="companyZipCode"
              name="companyZipCode"
              value={companyAddressComponents.postal_code}
              onChange={handleInputChange}
              placeholder="Zip/Postal code"
              readOnly
            />
            <input
              type="text"
              id="companyCountry"
              name="companyCountry"
              value={companyAddressComponents.country}
              onChange={handleInputChange}
              placeholder="Country"
              readOnly
            />
          </div>
          <div className="horizontal-fields">
            <div className="field-group">
              <label htmlFor="title">Contact Title</label>
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
              <label htmlFor="personalEmail">Personal Email</label>
              <input
                type="email"
                id="personalEmail"
                name="personalEmail"
                placeholder='email@gmail.com'
                value={formData.personalEmail}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="horizontal-fields">
            <div className="field-group">
              <label htmlFor="companySize">Company Size</label>
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
            <div className="field-group">
              <label htmlFor="companyPhone">Company Phone</label>
              <input
                type="tel"
                id="companyPhone"
                name="companyPhone"
                value={formData.companyPhone}
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

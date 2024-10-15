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
    companyEmail: '',
    title: '',
    companyAddress: '',
    companyPhone: '',
    companySize: '',
    aptSuite: '',
    companyAptSuite: '',
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
      companyEmail: '',
      title: '',
      companyAddress: '',
      companyPhone: '',
      companySize: '',
      aptSuite: '',
      companyAptSuite: '',
    });
    setError(null);
    setLoading(false);
    setShowPassword(false);
    setAddressComponents({
      street_number: '',
      route: '',
      locality: '',
      administrative_area_level_1: '',
      postal_code: '',
      country: '',
    });
    setCompanyDomain('');
    setCompanyAddressComponents({
      street_number: '',
      route: '',
      locality: '',
      administrative_area_level_1: '',
      postal_code: '',
      country: '',
    });
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

  const handleJobSeekerPlaceSelect = useCallback(() => {
    console.log('handleJobSeekerPlaceSelect called');
    if (jobSeekerAutocompleteRef.current) {
      const place = jobSeekerAutocompleteRef.current.getPlace();
      console.log('Job seeker place:', place);
      updateAddressComponents(place, setAddressComponents);
      setFormData(prev => ({
        ...prev,
        address: jobSeekerAddressInputRef.current.value,
      }));
    } else {
      console.log('jobSeekerAutocompleteRef is not initialized');
    }
  }, []);

  const handleEmployerPlaceSelect = useCallback(() => {
    console.log('handleEmployerPlaceSelect called');
    if (employerAutocompleteRef.current) {
      const place = employerAutocompleteRef.current.getPlace();
      console.log('Employer place:', place);
      updateAddressComponents(place, setCompanyAddressComponents);
      setFormData(prev => ({
        ...prev,
        companyAddress: employerAddressInputRef.current.value,
      }));
    } else {
      console.log('employerAutocompleteRef is not initialized');
    }
  }, []);

  const initializeAutocomplete = useCallback(() => {
    console.log("Initializing autocomplete");
    console.log("jobSeekerAddressInputRef:", jobSeekerAddressInputRef.current);
    console.log("employerAddressInputRef:", employerAddressInputRef.current);

    if (jobSeekerAddressInputRef.current && !jobSeekerAutocompleteRef.current) {
      jobSeekerAutocompleteRef.current = new window.google.maps.places.Autocomplete(
        jobSeekerAddressInputRef.current,
        { types: ['address'] }
      );
      jobSeekerAutocompleteRef.current.addListener('place_changed', handleJobSeekerPlaceSelect);
      console.log("Job seeker autocomplete initialized");
    }

    if (employerAddressInputRef.current && !employerAutocompleteRef.current) {
      employerAutocompleteRef.current = new window.google.maps.places.Autocomplete(
        employerAddressInputRef.current,
        { types: ['address'] }
      );
      employerAutocompleteRef.current.addListener('place_changed', handleEmployerPlaceSelect);
      console.log("Employer autocomplete initialized");
    }
  }, [handleJobSeekerPlaceSelect, handleEmployerPlaceSelect]);

  useEffect(() => {
    console.log("useEffect for initializeAutocomplete running");
    console.log("isLoaded:", isLoaded);
    console.log("loadError:", loadError);

    if (isLoaded && !loadError) {
      console.log("Google Maps API loaded successfully");
      initializeAutocomplete();
    }
  }, [isLoaded, loadError, initializeAutocomplete, step, isEmployer]);

  useEffect(() => {
    console.log('useEffect for loadError');
    if (loadError) {
      console.error('Load error:', loadError);
      setError('Unable to load address autocomplete. Please enter your address manually.');
    }
  }, [loadError]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log('handleInputChange:', name, value);
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleCompanyDomainChange = (e) => {
    const newDomain = e.target.value;
    setCompanyDomain(newDomain);
    checkWebsiteMatch(newDomain, formData.companyEmail);
  };

  const handleCompanyEmailChange = (e) => {
    const newEmail = e.target.value;
    setFormData(prevData => ({ ...prevData, companyEmail: newEmail }));
    checkWebsiteMatch(companyDomain, newEmail);
  };

  const checkWebsiteMatch = (domain, email) => {
    if (domain && email) {
      const emailDomain = email.split('@')[1];
      setWebsiteDoesNotMatch(emailDomain !== domain);
    } else {
      setWebsiteDoesNotMatch(false);
    }
  };

  const updateAddressComponents = (place, setComponents) => {
    console.log('updateAddressComponents called');
    console.log('place:', place);
    if (!place.address_components) {
      console.log('No address components found');
      return;
    }

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

    console.log('Updated components:', components);
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

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          role: isEmployer ? 'employer' : 'jobseeker',
          firebase_uid: userCredential.user.uid,
          domain_verified: isEmployer ? !websiteDoesNotMatch : undefined,
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
        {isEmployer ? "Company Address" : "Address"}
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
      <input
        type="text"
        id={isEmployer ? "company-apt-suite" : "apt-suite"}
        name={isEmployer ? "companyAptSuite" : "aptSuite"}
        value={isEmployer ? formData.companyAptSuite : formData.aptSuite}
        onChange={handleInputChange}
        placeholder="Apt, Suite, etc (optional)"
      />
      <div className="horizontal-fields">
        <input
          type="text"
          id={isEmployer ? "companyCity" : "city"}
          name={isEmployer ? "companyCity" : "city"}
          value={isEmployer ? companyAddressComponents.locality : addressComponents.locality}
          onChange={handleInputChange}
          placeholder="City"
          readOnly
        />
        <input
          type="text"
          id={isEmployer ? "companyState" : "state"}
          name={isEmployer ? "companyState" : "state"}
          value={isEmployer ? companyAddressComponents.administrative_area_level_1 :

          addressComponents.administrative_area_level_1}
          onChange={handleInputChange}
          placeholder="State/Province"
          readOnly
        />
      </div>
      <div className="horizontal-fields">
        <input
          type="text"
          id={isEmployer ? "companyZipCode" : "zipCode"}
          name={isEmployer ? "companyZipCode" : "zipCode"}
          value={isEmployer ? companyAddressComponents.postal_code :
          addressComponents.postal_code}
          onChange={handleInputChange}
          placeholder="Zip/Postal code"
          readOnly
        />
        <input
          type="text"
          id={isEmployer ? "companyCountry" : "country"}
          name={isEmployer ? "companyCountry" : "country"}
          value={isEmployer ? companyAddressComponents.country : addressComponents.country}
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

          {formData.password && !isPasswordValid && <span className="alert" style={{ color: 'red' }}>✗ Password must be at least 8 characters and include a number</span>}
          {formData.password && isPasswordValid && <span className="alert" style={{ color: 'green' }}>✓ Valid password</span>}
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
          {renderAddressFields(false)}
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
          <div className="horizontal-fields">
            <div className="field-group">
              <label htmlFor="companyDomain">Company Website (without www.)</label>
              <input
                type="text"
                id="companyDomain"
                name="companyDomain"
                value={companyDomain}
                onChange={handleCompanyDomainChange}
                required
              />
            </div>
            <div className="field-group">
              <label htmlFor="companyEmail">Company Email</label>
              <input
                type="email"
                id="companyEmail"
                name="companyEmail"
                value={formData.companyEmail}
                onChange={handleCompanyEmailChange}
                required
              />
            </div>
          </div>
          {websiteDoesNotMatch && (
            <div className="tooltip-content" style={{
              backgroundColor: '#f8d7da',
              color: '#721c24',
              padding: '0.5rem',
              borderRadius: '4px',
              marginTop: '0.5rem',
              fontSize: '0.875rem',
            }}>
              Since your company website and email don't match, your profile will be hidden from job seekers until we approve it. This may take up to 1 business day.
            </div>
          )}
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

          {formData.password && !isPasswordValid && <span className="alert" style={{ color: 'red' }}>✗ Password must be at least 8 characters and include a number</span>}
          {formData.password && isPasswordValid && <span className="alert" style={{ color: 'green' }}>✓ Valid password</span>}
          {formData.password && formData.confirmPassword && !isConfirmPasswordValid && <span className="alert" style={{ color: 'red', marginLeft:'5px'}}>✗ Passwords must match</span>}
          {formData.password && formData.confirmPassword && isConfirmPasswordValid && <span className="alert" style={{ color: 'green', marginLeft:'5px' }}>✓ Passwords match</span>}
        </div>
      )}
      {step === 2 && (
        <div className="form-group">
          {renderAddressFields(true)}
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

          {error && <div className="error-message">Email Already Exists! <a href="/login">Login</a></div>}

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
        <p className="terms">
          By signing up, you acknowledge that you have read and accept the <a href="/terms">Terms of Service</a> and <a href="/privacy-policy">Privacy Policy</a>.
        </p>
        <p className="login">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

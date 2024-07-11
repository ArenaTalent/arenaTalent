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
  const [acceptedTerms, setAcceptedTerms] = useState(false);
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
    if (!acceptedTerms) {
      setError('You must accept the terms and privacy policy.');
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
          role: isEmployer ? 'employer' : 'jobseeker'
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
    <div>
      <div>
        <button onClick={() => setIsEmployer(false)}>Job Seeker</button>
        <button onClick={() => setIsEmployer(true)}>Employer</button>
      </div>
      <form onSubmit={handleEmailPasswordSignup}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required placeholder="First Name" />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required placeholder="Last Name" />
        </div>
        <div>
          <label htmlFor="email">Personal Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Personal Email" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type={showPassword ? 'text' : 'password'} id="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password" />
          <button type="button" onClick={togglePasswordVisibility}>
            {showPassword ? 'Hide' : 'Show'}
          </button>
          {!isPasswordValid && <span style={{ color: 'red' }}>✗ Password must be at least 8 characters and include a number</span>}
          {isPasswordValid && <span style={{ color: 'green' }}>✓ Valid password</span>}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type={showPassword ? 'text' : 'password'} id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder="Confirm Password" />
          {password && confirmPassword && !isConfirmPasswordValid && <span style={{ color: 'red' }}>✗ Passwords must match</span>}
          {password && confirmPassword && isConfirmPasswordValid && <span style={{ color: 'green' }}>✓ Passwords match</span>}
        </div>
        {isEmployer && (
          <>
            <div>
              <label htmlFor="companyName">Company Name:</label>
              <input type="text" id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required placeholder="Company Name" />
            </div>
            <div>
              <label htmlFor="companyEmail">Company Email:</label>
              <input type="email" id="companyEmail" value={companyEmail} onChange={(e) => setCompanyEmail(e.target.value)} required placeholder="Company Email" />
            </div>
            <div>
              <label htmlFor="companyWebsite">Company Website:</label>
              <input type="text" id="companyWebsite" value={companyWebsite} onChange={(e) => setCompanyWebsite(e.target.value)} required placeholder="Company Website" />
            </div>
            <div>
              <label htmlFor="companyPhone">Company Phone:</label>
              <input type="text" id="companyPhone" value={companyPhone} onChange={(e) => setCompanyPhone(e.target.value)} required placeholder="Company Phone" />
            </div>
            <div>
              <label htmlFor="companyAddress">Company Address:</label>
              <input type="text" id="companyAddress" value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} required placeholder="Company Address" />
            </div>
          </>
        )}
        <div>
          <input
            type="checkbox"
            id="terms"
            checked={acceptedTerms}
            onChange={() => setAcceptedTerms(!acceptedTerms)}
          />
          <label htmlFor="terms">
            I accept the <a href="/terms">terms and conditions</a> and <a href="/privacy-policy">privacy policy</a>
          </label>
        </div>
        <button type="submit" disabled={loading || !isPasswordValid || !isConfirmPasswordValid || !acceptedTerms}>
          {loading ? 'Signing up...' : 'Sign Up with Email'}
        </button>
        {error && <span style={{ color: 'red' }} dangerouslySetInnerHTML={{ __html: error }}></span>}
      </form>
      {!isEmployer && (
        <button onClick={handleGoogleSignup} disabled={loading}>
          {loading ? 'Signing up with Google...' : 'Sign Up with Google'}
        </button>
      )}
    </div>
  );
}

export default Signup;

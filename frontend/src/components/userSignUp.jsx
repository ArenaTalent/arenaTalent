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
  const [role, setRole] = useState('jobseeker');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
          'Authorization': `Bearer ${idToken}`,
        },
        body: JSON.stringify({ email, password, firstName, lastName, companyName, role }),
      });

      if (response.ok) {
        navigate('/login');
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
          'Authorization': `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          email: user.email,
          firstName: user.displayName?.split(' ')[0],
          lastName: user.displayName?.split(' ')[1],
          companyName,
          role,
        }),
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

  const toggleRole = () => {
    setRole(role === 'jobseeker' ? 'employer' : 'jobseeker');
    setCompanyName('');
  };

  return (
    <div>
      <button onClick={toggleRole}>
        {role === 'jobseeker' ? 'Employer' : 'Job Seeker'}
      </button>
      <form onSubmit={handleEmailPasswordSignup}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </div>
        {role === 'employer' && (
          <div>
            <label htmlFor="companyName">Company Name:</label>
            <input type="text" id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
          </div>
        )}
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type={showPassword ? 'text' : 'password'} id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="button" onClick={togglePasswordVisibility}>
            {showPassword ? 'Hide' : 'Show'}
          </button>
          {!isPasswordValid && <span style={{ color: 'red' }}>✗ Password must be at least 8 characters and include a number</span>}
          {isPasswordValid && <span style={{ color: 'green' }}>✓ Valid password</span>}
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type={showPassword ? 'text' : 'password'} id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          {password && confirmPassword && !isConfirmPasswordValid && <span style={{ color: 'red' }}>✗ Passwords must match</span>}
          {password && confirmPassword && isConfirmPasswordValid && <span style={{ color: 'green' }}>✓ Passwords match</span>}
        </div>
        <button type="submit" disabled={loading || !isPasswordValid || !isConfirmPasswordValid}>
          {loading ? 'Signing up...' : 'Sign Up with Email'}
        </button>
        {error && <span style={{ color: 'red' }}>{error}</span>}
      </form>
      <button onClick={handleGoogleSignup} disabled={loading}>
        {loading ? 'Signing up with Google...' : 'Sign Up with Google'}
      </button>
    </div>
  );
}

export default Signup;

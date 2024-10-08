import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const { login, user, loading } = useAuth();

    useEffect(() => {
        if (user) {
            console.log('User is already logged in, redirecting...');
            navigate('/jobseeker-intake');
        }
    }, [user, navigate]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
          console.log('Attempting login...');
          const result = await login(email, password);
          console.log('Login successful', result);

          if (result && result.user) {
            const redirectPath = result.redirectPath || '/jobseeker-intake';
            console.log('Redirecting to:', redirectPath);
            navigate(redirectPath, { replace: true });
          } else {
            throw new Error('Invalid login response');
          }
        } catch (error) {
          console.error('Login error:', error);
          if (error.response) {
            setError(`Server error: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
          } else if (error.request) {
            setError('No response received from server. Please try again.');
          } else {
            setError(`Error: ${error.message}`);
          }
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
                <form onSubmit={handleSubmit} className="login-form">
                    <img src="/images/black-logo.png" alt="Arena Logo" className="white-logo-signup" />
                    <h2 className="welcome-message" style={{ color: 'black' }}>Welcome Back!</h2>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Email"
                            disabled={loading}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <div className="password-input-container">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Password"
                                disabled={loading}
                            />
                            <button
                                type="button"
                                className="show-password-button"
                                onClick={togglePasswordVisibility}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                disabled={loading}
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        <div className="forgot-password-container">
                            <button
                                type="button"
                                className="forgot-password-button"
                                onClick={() => navigate('/reset-password')}
                                disabled={loading}
                            >
                                Forgot Password?
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="btn" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    {error && <div className="error-message">{error}</div>}

                    <p className="terms">By logging in you accept our <a href="/terms">terms</a> and <a href="/privacy">privacy policy</a>.</p>
                    <p className="login">New to Arena? <a href="/signup">Signup</a></p>
                </form>
            </div>
        </div>
    );
}

export default Login;

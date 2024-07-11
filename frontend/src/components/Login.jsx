import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Import your Firebase configuration
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // Initialize error as null
    const [loading, setLoading] = useState(false); // Added loading state

    const navigate = useNavigate(); // Assuming you are using React Router for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true); // Set loading to true when login starts
        try {
            await signInWithEmailAndPassword(auth, email, password);

            const user = auth.currentUser;
            const idToken = await user.getIdToken();

            // Send ID token to backend for verification
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}` // Include ID token in header
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const { token, redirectPath } = await response.json();
                // Store the token (you might use localStorage, context, etc.)
                localStorage.setItem('token', token);
                // Redirect based on the response
                navigate(redirectPath);
            } else {
                const { message } = await response.json();
                setError(message || 'Login failed. Please check your credentials.');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false); // Set loading to false regardless of success or failure
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'} {/* Conditional button text */}
            </button>
            {error && <p>{error}</p>}
            <p>By logging in you accept our <a href="/terms">terms</a> and <a href="/privacy">privacy policy</a>.</p>
            <button type="button" onClick={() => navigate('/reset-password')}>
                Forgot Password?
            </button>
            <p>New to Arena? <a href="/signup">Signup</a></p>
        </form>
    );
}

export default Login;

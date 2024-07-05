// src/components/Login.jsx
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Import your Firebase configuration
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // Initialize error as null
    const [loading, setLoading] = useState(false); // Added loading state


    const navigate = useNavigate();// Assuming you are using React Router for navigation

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
                    'Authorization': idToken // Include ID token in header
                }
            });

            if (response.ok) {
                const userData = await response.json();
                // ... (store userData and redirect)
            } else {
                setError('Login failed. Please check your credentials.');
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
        </form>
    );
}

export default Login;

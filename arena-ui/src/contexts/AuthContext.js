import React, { createContext, useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { auth } from '../firebaseConfig' // Import the named export 'auth' from firebaseConfig
import { signInWithEmailAndPassword, signOut } from 'firebase/auth' // Import specific Firebase methods

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUser() // Check if the user is logged in on page load
  }, [])

  // Check if the user is logged in
  const checkUser = async () => {
    const token = localStorage.getItem('authToken')
    if (token) {
      try {
        const response = await axios.get('/api/users/check-intake', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setUser(response.data.user)
      } catch (error) {
        console.error('Failed to fetch user:', error)
        localStorage.removeItem('authToken')
      }
    }
    setLoading(false)
  }

  // Handle login with Firebase
  const login = async (email, password) => {
    try {
      // Sign in with Firebase using the `auth` instance and the `signInWithEmailAndPassword` method
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      const idToken = await userCredential.user.getIdToken() // Get Firebase ID token

      // Send Firebase ID token to your backend
      const response = await axios.post(
        '/api/users/login',
        { idToken },
        {
          headers: { Authorization: `Bearer ${idToken}` } // Send ID token as a Bearer token
        }
      )

      setUser(response.data.user) // Update the user state
      localStorage.setItem('authToken', idToken) // Store token locally
      return response.data // Return response data (redirectPath, etc.)
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  // Logout the user
  const logout = async () => {
    await signOut(auth) // Sign out from Firebase
    setUser(null)
    localStorage.removeItem('authToken')
  }

  const value = {
    user,
    loading,
    login,
    logout,
    checkUser
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

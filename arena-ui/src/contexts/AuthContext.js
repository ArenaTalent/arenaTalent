import React, { createContext, useState, useEffect, useContext } from 'react'
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import axios from '../utils/axiosConfig' // Make sure this path is correct
import firebaseApp from '../firebaseConfig' // Make sure this path is correct

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const auth = getAuth(firebaseApp)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true)
      if (firebaseUser) {
        try {
          const idToken = await firebaseUser.getIdToken()
          const response = await axios.get('/api/users/check-intake', {
            headers: { Authorization: `Bearer ${idToken}` }
          })
          setUser(response.data.user)
          localStorage.setItem('authToken', idToken)
        } catch (error) {
          console.error('Failed to fetch user on auth state change:', error)
          setUser(null)
          localStorage.removeItem('authToken')
        }
      } else {
        setUser(null)
        localStorage.removeItem('authToken')
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [auth])

  const login = async (email, password) => {
    setLoading(true)
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      const idToken = await userCredential.user.getIdToken()
      const response = await axios.post('/api/users/login', { idToken })
      console.log('Login response:', response.data)
      setUser(response.data.user)
      localStorage.setItem('authToken', idToken)
      return response.data
    } catch (error) {
      console.error(
        'Login error:',
        error.response ? error.response.data : error.message
      )
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      setUser(null)
      localStorage.removeItem('authToken')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const value = {
    user,
    loading,
    login,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider

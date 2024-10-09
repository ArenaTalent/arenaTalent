import React, { createContext, useState, useEffect, useContext } from 'react'
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import axios from '../utils/axiosConfig'
import firebaseApp from '../firebaseConfig'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

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
          console.log('User data from check-intake:', response.data)
          setUser(response.data.user)
        } catch (error) {
          console.error('Failed to fetch user:', error)
          setUser(null)
        }
      } else {
        setUser(null)
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
      const response = await axios.post(
        '/api/users/login',
        { idToken },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${idToken}`
          }
        }
      )
      console.log('Login response:', response.data)
      setUser(response.data.user)
      return response.data
    } catch (error) {
      console.error('Login error:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      setUser(null)
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

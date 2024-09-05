import React, { createContext, useState, useEffect, useContext } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const token = localStorage.getItem('authToken')
    if (token) {
      try {
        const response = await axios.get('/api/users/check-intake', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setUser(response.data.user)
      } catch (error) {
        console.error('Failed to fetch user', error)
        localStorage.removeItem('authToken')
      }
    }
    setLoading(false)
  }

  const login = async (idToken) => {
    try {
      const response = await axios.post(
        '/api/users/login',
        { idToken },
        {
          headers: { Authorization: `Bearer ${idToken}` }
        }
      )
      setUser(response.data.user)
      localStorage.setItem('authToken', idToken)
      return response.data
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  const logout = () => {
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

import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

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

  // Check if user is authenticated on app load
  useEffect(() => {
    const token = localStorage.getItem('adminToken') // Updated to match useTeamYears
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      getCurrentUser()
    } else {
      setLoading(false)
    }
  }, [])

  const getCurrentUser = async () => {
    try {
      const response = await axios.get('/api/auth/me')
      if (response.data.success) {
        setUser(response.data.admin)
      }
    } catch (error) {
      console.error('Failed to get current user:', error)
      localStorage.removeItem('adminToken') // Updated to match useTeamYears
      delete axios.defaults.headers.common['Authorization']
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      setLoading(true)
      console.log('🔄 Attempting login for:', email)
      
      const response = await axios.post('/api/auth/login', { email, password })
      
      if (response.data.success) {
        const { token, admin } = response.data
        
        console.log('✅ Login successful, storing token')
        localStorage.setItem('adminToken', token) // Updated to match useTeamYears
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        setUser(admin)
        
        toast.success('Login successful!')
        return { success: true }
      } else {
        console.error('❌ Login failed:', response.data.message)
        toast.error(response.data.message || 'Login failed')
        return { success: false, message: response.data.message }
      }
    } catch (error) {
      console.error('❌ Login error:', error.response?.data || error.message)
      const message = error.response?.data?.message || 'Login failed'
      toast.error(message)
      return { success: false, message }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    console.log('🔄 Logging out user')
    localStorage.removeItem('adminToken') // Updated to match useTeamYears
    delete axios.defaults.headers.common['Authorization']
    setUser(null)
    toast.success('Logged out successfully')
  }

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

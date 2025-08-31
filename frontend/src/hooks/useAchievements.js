import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { fallbackData } from '../utils/fallbackData'

// Create axios instance with interceptors for automatic token handling
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
})

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      console.log('🔑 Adding auth token to request:', config.url)
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('❌ 401 Unauthorized - Token expired or invalid')
      localStorage.removeItem('adminToken')
      toast.error('Session expired. Please login again.')
      // Redirect to login page
      window.location.href = '/admin/login'
    }
    return Promise.reject(error)
  }
)

export const useAchievements = () => {
  const [achievements, setAchievements] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  })
  const fetchingRef = useRef(false)
  const abortControllerRef = useRef(null)

  const fetchAchievements = async (params = {}) => {
    if (fetchingRef.current) return
    
    try {
      fetchingRef.current = true
      setLoading(true)
      setError(null)
      
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
      
      abortControllerRef.current = new AbortController()
      console.log('🔄 Fetching achievements with params:', params)
      
      const response = await api.get('/api/achievements', {
        params,
        signal: abortControllerRef.current.signal,
        timeout: 10000
      })
      
      console.log('✅ Achievements fetched:', response.data)
      setAchievements(response.data.achievements || [])
      if (response.data.pagination) {
        setPagination(response.data.pagination)
      }
      setError(null)
    } catch (err) {
      if (err.name !== 'AbortError' && err.name !== 'CanceledError') {
        console.error('❌ Achievements fetch error:', err)
        const message = err.response?.data?.message || 'Failed to fetch achievements'
        setError(message)
        
        // Use fallback data
        setAchievements(fallbackData.achievements)
        
        if (err.code !== 'ECONNREFUSED' && err.response?.status !== 429) {
          toast.error('Using offline data - ' + message)
        }
      }
    } finally {
      setLoading(false)
      fetchingRef.current = false
    }
  }

  const fetchAchievement = async (id) => {
    try {
      console.log(`🔄 Fetching achievement: ${id}`)
      
      const response = await api.get(`/api/achievements/${id}`)
      
      console.log(`✅ Achievement fetched:`, response.data)
      return { success: true, data: response.data.achievement }
    } catch (err) {
      console.error(`❌ Error fetching achievement ${id}:`, err)
      const message = err.response?.data?.message || `Failed to fetch achievement`
      toast.error(message)
      return { success: false, message }
    }
  }

  const fetchFeaturedAchievements = async () => {
    try {
      console.log('🔄 Fetching featured achievements...')
      
      const response = await api.get('/api/achievements/featured')
      
      console.log('✅ Featured achievements fetched:', response.data)
      return { success: true, data: response.data.achievements }
    } catch (err) {
      console.error('❌ Error fetching featured achievements:', err)
      const message = err.response?.data?.message || 'Failed to fetch featured achievements'
      toast.error(message)
      return { success: false, message }
    }
  }

  const fetchAchievementsByYear = async (year) => {
    try {
      console.log(`🔄 Fetching achievements for year: ${year}`)
      
      const response = await api.get(`/api/achievements/year/${year}`)
      
      console.log(`✅ Achievements for year ${year} fetched:`, response.data)
      return { success: true, data: response.data.achievements }
    } catch (err) {
      console.error(`❌ Error fetching achievements for year ${year}:`, err)
      const message = err.response?.data?.message || `Failed to fetch achievements for year ${year}`
      toast.error(message)
      return { success: false, message }
    }
  }

  const createAchievement = async (achievementData) => {
    try {
      console.log('🔄 Creating achievement:', achievementData)
      
      const response = await api.post('/api/achievements', achievementData)
      
      console.log('✅ Achievement created:', response.data)
      setAchievements(prev => [response.data.achievement, ...prev])
      toast.success('Achievement created successfully')
      return { success: true, data: response.data.achievement }
    } catch (err) {
      console.error('❌ Error creating achievement:', err)
      const message = err.response?.data?.message || 'Failed to create achievement'
      toast.error(message)
      return { success: false, message }
    }
  }

  const updateAchievement = async (id, achievementData) => {
    try {
      console.log(`🔄 Updating achievement ${id}:`, achievementData)
      
      const response = await api.put(`/api/achievements/${id}`, achievementData)
      
      console.log('✅ Achievement updated:', response.data)
      setAchievements(prev => 
        prev.map(achievement => 
          achievement._id === id ? response.data.achievement : achievement
        )
      )
      toast.success('Achievement updated successfully')
      return { success: true, data: response.data.achievement }
    } catch (err) {
      console.error(`❌ Error updating achievement ${id}:`, err)
      const message = err.response?.data?.message || 'Failed to update achievement'
      toast.error(message)
      return { success: false, message }
    }
  }

  const deleteAchievement = async (id) => {
    try {
      console.log(`🔄 Deleting achievement: ${id}`)
      
      await api.delete(`/api/achievements/${id}`)
      
      console.log(`✅ Achievement deleted: ${id}`)
      setAchievements(prev => prev.filter(achievement => achievement._id !== id))
      toast.success('Achievement deleted successfully')
      return { success: true }
    } catch (err) {
      console.error(`❌ Error deleting achievement ${id}:`, err)
      const message = err.response?.data?.message || 'Failed to delete achievement'
      toast.error(message)
      return { success: false, message }
    }
  }

  const toggleFeatured = async (id) => {
    try {
      console.log(`🔄 Toggling featured status for achievement: ${id}`)
      
      const response = await api.patch(`/api/achievements/${id}/toggle-featured`)
      
      console.log('✅ Achievement featured status toggled:', response.data)
      setAchievements(prev => 
        prev.map(achievement => 
          achievement._id === id ? response.data.achievement : achievement
        )
      )
      return { success: true, data: response.data.achievement }
    } catch (err) {
      console.error(`❌ Error toggling featured status for achievement ${id}:`, err)
      const message = err.response?.data?.message || 'Failed to toggle featured status'
      toast.error(message)
      return { success: false, message }
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchAchievements()
    }, 250) // Different delay

    return () => {
      clearTimeout(timer)
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  return {
    // State
    achievements,
    loading,
    error,
    pagination,
    
    // Actions
    refetch: fetchAchievements,
    fetchAchievements,
    fetchAchievement,
    fetchFeaturedAchievements,
    fetchAchievementsByYear,
    createAchievement,
    updateAchievement,
    deleteAchievement,
    toggleFeatured,
    
    // Utilities
    clearError: () => setError(null)
  }
}
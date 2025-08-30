import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

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

export const useTeamYears = () => {
  const [teamYears, setTeamYears] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchTeamYears = async () => {
    try {
      setLoading(true)
      setError(null)
      console.log('🔄 Fetching team years...')
      
      const response = await api.get('/api/team-years')
      
      console.log('✅ Team years fetched:', response.data)
      setTeamYears(response.data.teamYears || response.data.data || [])
    } catch (err) {
      console.error('❌ Error fetching team years:', err)
      const message = err.response?.data?.message || 'Failed to fetch team years'
      setError(message)
      toast.error(message)
      setTeamYears([])
    } finally {
      setLoading(false)
    }
  }

  const getTeamYear = async (year) => {
    try {
      console.log(`🔄 Fetching team year: ${year}`)
      
      const response = await api.get(`/api/team-years/${year}`)
      
      console.log(`✅ Team year ${year} fetched:`, response.data)
      return response.data.teamYear || response.data.data
    } catch (err) {
      console.error(`❌ Error fetching team year ${year}:`, err)
      const message = err.response?.data?.message || `Failed to fetch team year ${year}`
      toast.error(message)
      throw err
    }
  }

  const createTeamYear = async (yearData) => {
    try {
      console.log('🔄 Creating team year:', yearData)
      
      const response = await api.post('/api/team-years', yearData)
      
      console.log('✅ Team year created:', response.data)
      await fetchTeamYears() // Refresh the list
      toast.success(`Team year ${yearData.year} created successfully`)
      return response.data.teamYear || response.data.data
    } catch (err) {
      console.error('❌ Error creating team year:', err)
      const message = err.response?.data?.message || 'Failed to create team year'
      toast.error(message)
      throw err
    }
  }

  const updateTeamYear = async (year, yearData) => {
    try {
      console.log(`🔄 Updating team year ${year}:`, yearData)
      
      const response = await api.put(`/api/team-years/${year}`, yearData)
      
      console.log(`✅ Team year ${year} updated:`, response.data)
      await fetchTeamYears() // Refresh the list
      toast.success(`Team year ${year} updated successfully`)
      return response.data.teamYear || response.data.data
    } catch (err) {
      console.error(`❌ Error updating team year ${year}:`, err)
      const message = err.response?.data?.message || `Failed to update team year ${year}`
      toast.error(message)
      throw err
    }
  }

  const deleteTeamYear = async (year) => {
    try {
      console.log(`🔄 Deleting team year: ${year}`)
      
      await api.delete(`/api/team-years/${year}`)
      
      console.log(`✅ Team year ${year} deleted`)
      await fetchTeamYears() // Refresh the list
      toast.success(`Team year ${year} deleted successfully`)
      return true
    } catch (err) {
      console.error(`❌ Error deleting team year ${year}:`, err)
      const message = err.response?.data?.message || `Failed to delete team year ${year}`
      toast.error(message)
      throw err
    }
  }

  const addTeamMember = async (year, memberData) => {
    try {
      console.log(`🔄 Adding member to team year ${year}:`, memberData)
      
      const response = await api.post(`/api/team-years/${year}/members`, memberData)
      
      console.log(`✅ Member added to team year ${year}:`, response.data)
      await fetchTeamYears() // Refresh the list
      toast.success(`Member ${memberData.name} added to team year ${year}`)
      return response.data.teamYear || response.data.data
    } catch (err) {
      console.error(`❌ Error adding member to team year ${year}:`, err)
      const message = err.response?.data?.message || 'Failed to add team member'
      toast.error(message)
      throw err
    }
  }

  const updateTeamMember = async (year, memberId, memberData) => {
    try {
      console.log(`🔄 Updating member ${memberId} in team year ${year}:`, memberData)
      
      const response = await api.put(`/api/team-years/${year}/members/${memberId}`, memberData)
      
      console.log(`✅ Member ${memberId} updated in team year ${year}:`, response.data)
      await fetchTeamYears() // Refresh the list
      toast.success('Team member updated successfully')
      return response.data.teamYear || response.data.data
    } catch (err) {
      console.error(`❌ Error updating member ${memberId} in team year ${year}:`, err)
      const message = err.response?.data?.message || 'Failed to update team member'
      toast.error(message)
      throw err
    }
  }

  const deleteTeamMember = async (year, memberId) => {
    try {
      console.log(`🔄 Deleting member ${memberId} from team year ${year}`)
      
      await api.delete(`/api/team-years/${year}/members/${memberId}`)
      
      console.log(`✅ Member ${memberId} deleted from team year ${year}`)
      await fetchTeamYears() // Refresh the list
      toast.success('Team member removed successfully')
      return true
    } catch (err) {
      console.error(`❌ Error deleting member ${memberId} from team year ${year}:`, err)
      const message = err.response?.data?.message || 'Failed to delete team member'
      toast.error(message)
      throw err
    }
  }

  useEffect(() => {
    fetchTeamYears()
  }, [])

  return {
    teamYears,
    loading,
    error,
    refetch: fetchTeamYears,
    getTeamYear,
    createTeamYear,
    updateTeamYear,
    deleteTeamYear,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember
  }
}

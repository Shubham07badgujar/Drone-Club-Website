import { useState, useEffect } from 'react'
import axios from 'axios'

// No need for API_BASE_URL since we're using Vite's proxy for /api calls
// and axios defaults from AuthContext

const useProjects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Get authorization token
  const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken')
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  // Fetch all projects with filters
  const fetchProjects = async (params = {}) => {
    setLoading(true)
    setError('')
    try {
      console.log('🔍 Fetching projects with params:', params)
      const response = await axios.get(`/api/projects`, { params })
      console.log('✅ Projects response:', response.data)
      
      if (response.data.success) {
        setProjects(response.data.projects)
        return response.data
      } else {
        throw new Error(response.data.message || 'Failed to fetch projects')
      }
    } catch (err) {
      console.error('❌ Fetch projects error:', err)
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch projects'
      setError(errorMessage)
      return { success: false, message: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  // Fetch single project
  const fetchProject = async (id) => {
    setLoading(true)
    setError('')
    try {
      console.log(`🔍 Fetching project: ${id}`)
      const response = await axios.get(`/api/projects/${id}`)
      console.log('✅ Project response:', response.data)
      
      if (response.data.success) {
        return response.data.project
      } else {
        throw new Error(response.data.message || 'Failed to fetch project')
      }
    } catch (err) {
      console.error('❌ Fetch project error:', err)
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch project'
      setError(errorMessage)
      return null
    } finally {
      setLoading(false)
    }
  }

  // Fetch featured projects
  const fetchFeaturedProjects = async () => {
    setLoading(true)
    setError('')
    try {
      console.log('🔍 Fetching featured projects...')
      const response = await axios.get(`/api/projects/featured`)
      console.log('✅ Featured projects response:', response.data)
      
      if (response.data.success) {
        setProjects(response.data.projects)
        return response.data.projects
      } else {
        throw new Error(response.data.message || 'Failed to fetch featured projects')
      }
    } catch (err) {
      console.error('❌ Fetch featured projects error:', err)
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch featured projects'
      setError(errorMessage)
      return []
    } finally {
      setLoading(false)
    }
  }

  // Fetch projects by year
  const fetchProjectsByYear = async (year) => {
    setLoading(true)
    setError('')
    try {
      console.log(`🔍 Fetching projects for year: ${year}`)
      const response = await axios.get(`/api/projects/year/${year}`)
      console.log('✅ Projects by year response:', response.data)
      
      if (response.data.success) {
        return response.data.projects
      } else {
        throw new Error(response.data.message || 'Failed to fetch projects by year')
      }
    } catch (err) {
      console.error('❌ Fetch projects by year error:', err)
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch projects by year'
      setError(errorMessage)
      return []
    } finally {
      setLoading(false)
    }
  }

  // Create new project
  const createProject = async (projectData) => {
    setLoading(true)
    setError('')
    try {
      console.log('➕ Creating project:', projectData)
      
      // Ensure we have a valid token before proceeding
      const token = localStorage.getItem('adminToken')
      if (!token) {
        throw new Error('Unauthorized: Please login as admin')
      }
      
  // Use axios defaults for auth (set by AuthContext)
  const response = await axios.post(`/api/projects`, projectData)
      console.log('✅ Create project response:', response.data)
      
      if (response.data.success) {
        // Refresh projects list
        await fetchProjects()
        return { success: true, project: response.data.project }
      } else {
        throw new Error(response.data.message || 'Failed to create project')
      }
    } catch (err) {
      console.error('❌ Create project error (raw):', err)

      // Auth issues
      if (err.response?.status === 403 || err.response?.status === 401) {
        const message = err.response?.data?.message || 'Unauthorized: Please login as admin'
        setError(message)
        return { success: false, message, errors: null }
      }

      // Validation errors (backend returns array of { field, message })
      if (err.response?.status === 400 && Array.isArray(err.response?.data?.errors)) {
        const fieldErrorsArray = err.response.data.errors
        const mapped = fieldErrorsArray.reduce((acc, e) => {
          if (e.field) acc[e.field] = e.message
          return acc
        }, {})
        const message = err.response?.data?.message || 'Validation error'
        setError(message)
        return { success: false, message, errors: mapped }
      }

      // Network / DB connectivity (e.g., ENOTFOUND, ECONN, Network Error)
      if (!err.response) {
        const netMsg = err.message || ''
        if (/ENOTFOUND|ECONN|Network Error|ECONNREFUSED/i.test(netMsg)) {
          const message = 'Cannot reach server / database. Check your internet connection.'
          setError(message)
          return { success: false, message, errors: null }
        }
      }

      // Generic fallback
      const errorMessage = err.response?.data?.message || err.message || 'Failed to create project'
      const errors = err.response?.data?.errors || null
      setError(errorMessage)
      return { success: false, message: errorMessage, errors }
    } finally {
      setLoading(false)
    }
  }

  // Update project
  const updateProject = async (id, projectData) => {
    setLoading(true)
    setError('')
    try {
      console.log(`📝 Updating project ${id}:`, projectData)
      
      // Ensure we have a valid token before proceeding
      const token = localStorage.getItem('adminToken')
      if (!token) {
        throw new Error('Unauthorized: Please login as admin')
      }
      
      const response = await axios.put(
        `/api/projects/${id}`,
        projectData,
        { 
          headers: getAuthHeaders(),
          withCredentials: true
        }
      )
      console.log('✅ Update project response:', response.data)
      
      if (response.data.success) {
        // Refresh projects list
        await fetchProjects()
        return { success: true, project: response.data.project }
      } else {
        throw new Error(response.data.message || 'Failed to update project')
      }
    } catch (err) {
      console.error('❌ Update project error:', err)
      
      // Handle auth errors specifically
      if (err.response?.status === 403 || err.response?.status === 401) {
        const message = 'Unauthorized: Please login as admin'
        setError(message)
        return { success: false, message, errors: null }
      }
      
      const errorMessage = err.response?.data?.message || err.message || 'Failed to update project'
      const errors = err.response?.data?.errors || null
      setError(errorMessage)
      return { success: false, message: errorMessage, errors }
    } finally {
      setLoading(false)
    }
  }

  // Delete project
  const deleteProject = async (id) => {
    setLoading(true)
    setError('')
    try {
      console.log(`🗑️ Deleting project: ${id}`)
      
      // Ensure we have a valid token before proceeding
      const token = localStorage.getItem('adminToken')
      if (!token) {
        throw new Error('Unauthorized: Please login as admin')
      }
      
      const response = await axios.delete(
        `/api/projects/${id}`,
        { 
          headers: getAuthHeaders(),
          withCredentials: true
        }
      )
      console.log('✅ Delete project response:', response.data)
      
      if (response.data.success) {
        // Refresh projects list
        await fetchProjects()
        return { success: true }
      } else {
        throw new Error(response.data.message || 'Failed to delete project')
      }
    } catch (err) {
      console.error('❌ Delete project error:', err)
      
      // Handle auth errors specifically
      if (err.response?.status === 403 || err.response?.status === 401) {
        const message = 'Unauthorized: Please login as admin'
        setError(message)
        return { success: false, message }
      }
      
      const errorMessage = err.response?.data?.message || err.message || 'Failed to delete project'
      setError(errorMessage)
      return { success: false, message: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  // Toggle featured status
  const toggleFeatured = async (id) => {
    setLoading(true)
    setError('')
    try {
      console.log(`⭐ Toggling featured status for project: ${id}`)
      
      // Ensure we have a valid token before proceeding
      const token = localStorage.getItem('adminToken')
      if (!token) {
        throw new Error('Unauthorized: Please login as admin')
      }
      
      const response = await axios.patch(
        `/api/projects/${id}/toggle-featured`,
        {},
        { 
          headers: getAuthHeaders(),
          withCredentials: true
        }
      )
      console.log('✅ Toggle featured response:', response.data)
      
      if (response.data.success) {
        // Refresh projects list
        await fetchProjects()
        return { success: true, project: response.data.project }
      } else {
        throw new Error(response.data.message || 'Failed to toggle featured status')
      }
    } catch (err) {
      console.error('❌ Toggle featured error:', err)
      
      // Handle auth errors specifically
      if (err.response?.status === 403 || err.response?.status === 401) {
        const message = 'Unauthorized: Please login as admin'
        setError(message)
        return { success: false, message }
      }
      
      const errorMessage = err.response?.data?.message || err.message || 'Failed to toggle featured status'
      setError(errorMessage)
      return { success: false, message: errorMessage }
    } finally {
      setLoading(false)
    }
  }

  // Load projects on hook initialization
  useEffect(() => {
    fetchProjects()
  }, [])

  return {
    projects,
    loading,
    error,
    fetchProjects,
    fetchProject,
    fetchFeaturedProjects,
    fetchProjectsByYear,
    createProject,
    updateProject,
    deleteProject,
    toggleFeatured,
    setError,
    refetch: fetchProjects // For backward compatibility
  }
}

export { useProjects }
export default useProjects

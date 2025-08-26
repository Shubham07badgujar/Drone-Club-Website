import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { fallbackData } from '../utils/fallbackData'

export const useProjects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const fetchingRef = useRef(false)
  const abortControllerRef = useRef(null)

  const fetchProjects = async () => {
    // Prevent multiple simultaneous calls
    if (fetchingRef.current) return
    
    try {
      fetchingRef.current = true
      setLoading(true)
      
      // Cancel previous request if exists
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
      
      // Create new abort controller
      abortControllerRef.current = new AbortController()
      
      const response = await axios.get('/api/projects', {
        signal: abortControllerRef.current.signal,
        timeout: 10000 // 10 second timeout
      })
      
      setProjects(response.data.projects || [])
      setError(null)
    } catch (err) {
      if (err.name !== 'AbortError' && err.name !== 'CanceledError') {
        const message = err.response?.data?.message || 'Failed to fetch projects'
        setError(message)
        console.error('Projects fetch error:', err)
        
        // Use fallback data when API fails
        setProjects(fallbackData.projects)
        
        // Only show toast for non-network errors to avoid spam
        if (err.code !== 'ECONNREFUSED' && err.response?.status !== 429) {
          toast.error('Using offline data - ' + message)
        }
      }
    } finally {
      setLoading(false)
      fetchingRef.current = false
    }
  }

  const createProject = async (projectData) => {
    try {
      const response = await axios.post('/api/projects', projectData)
      setProjects(prev => [response.data.project, ...prev])
      toast.success('Project created successfully')
      return { success: true, project: response.data.project }
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to create project'
      toast.error(message)
      return { success: false, message }
    }
  }

  const updateProject = async (id, projectData) => {
    try {
      const response = await axios.put(`/api/projects/${id}`, projectData)
      setProjects(prev => 
        prev.map(project => 
          project.id === id ? response.data.project : project
        )
      )
      toast.success('Project updated successfully')
      return { success: true, project: response.data.project }
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update project'
      toast.error(message)
      return { success: false, message }
    }
  }

  const deleteProject = async (id) => {
    try {
      await axios.delete(`/api/projects/${id}`)
      setProjects(prev => prev.filter(project => project.id !== id))
      toast.success('Project deleted successfully')
      return { success: true }
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to delete project'
      toast.error(message)
      return { success: false, message }
    }
  }

  useEffect(() => {
    // Add a small delay to prevent immediate multiple calls
    const timer = setTimeout(() => {
      fetchProjects()
    }, 100)

    // Cleanup function
    return () => {
      clearTimeout(timer)
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, []) // Empty dependency array to run only once

  return {
    projects,
    loading,
    error,
    refetch: fetchProjects,
    createProject,
    updateProject,
    deleteProject,
  }
}

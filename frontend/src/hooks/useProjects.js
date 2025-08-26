import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

export const useProjects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/projects')
      setProjects(response.data.projects)
      setError(null)
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch projects'
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
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
    fetchProjects()
  }, [])

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

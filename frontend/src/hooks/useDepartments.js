import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

export const useDepartments = () => {
  const [departments, setDepartments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchDepartments = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/departments')
      setDepartments(response.data.departments)
      setError(null)
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch departments'
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const createDepartment = async (departmentData) => {
    try {
      const response = await axios.post('/api/departments', departmentData)
      setDepartments(prev => [response.data.department, ...prev])
      toast.success('Department created successfully')
      return { success: true, department: response.data.department }
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to create department'
      toast.error(message)
      return { success: false, message }
    }
  }

  const updateDepartment = async (id, departmentData) => {
    try {
      const response = await axios.put(`/api/departments/${id}`, departmentData)
      setDepartments(prev => 
        prev.map(department => 
          department.id === id ? response.data.department : department
        )
      )
      toast.success('Department updated successfully')
      return { success: true, department: response.data.department }
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update department'
      toast.error(message)
      return { success: false, message }
    }
  }

  const deleteDepartment = async (id) => {
    try {
      await axios.delete(`/api/departments/${id}`)
      setDepartments(prev => prev.filter(department => department.id !== id))
      toast.success('Department deleted successfully')
      return { success: true }
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to delete department'
      toast.error(message)
      return { success: false, message }
    }
  }

  useEffect(() => {
    fetchDepartments()
  }, [])

  return {
    departments,
    loading,
    error,
    refetch: fetchDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartment,
  }
}

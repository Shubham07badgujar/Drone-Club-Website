import { useState, useEffect } from 'react'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const useTeamYears = () => {
  const [teamYears, setTeamYears] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchTeamYears = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch(`${API_BASE_URL}/team-years`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data.success) {
        setTeamYears(data.teamYears || [])
      } else {
        throw new Error(data.message || 'Failed to fetch team years')
      }
    } catch (err) {
      console.error('Error fetching team years:', err)
      setError(err.message)
      setTeamYears([])
    } finally {
      setLoading(false)
    }
  }

  const getTeamYear = async (year) => {
    try {
      const response = await fetch(`${API_BASE_URL}/team-years/${year}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data.success) {
        return data.teamYear
      } else {
        throw new Error(data.message || 'Failed to fetch team year')
      }
    } catch (err) {
      console.error('Error fetching team year:', err)
      throw err
    }
  }

  const createTeamYear = async (yearData, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/team-years`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(yearData)
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data.success) {
        await fetchTeamYears() // Refresh the list
        return data.teamYear
      } else {
        throw new Error(data.message || 'Failed to create team year')
      }
    } catch (err) {
      console.error('Error creating team year:', err)
      throw err
    }
  }

  const updateTeamYear = async (year, yearData, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/team-years/${year}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(yearData)
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data.success) {
        await fetchTeamYears() // Refresh the list
        return data.teamYear
      } else {
        throw new Error(data.message || 'Failed to update team year')
      }
    } catch (err) {
      console.error('Error updating team year:', err)
      throw err
    }
  }

  const deleteTeamYear = async (year, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/team-years/${year}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data.success) {
        await fetchTeamYears() // Refresh the list
        return true
      } else {
        throw new Error(data.message || 'Failed to delete team year')
      }
    } catch (err) {
      console.error('Error deleting team year:', err)
      throw err
    }
  }

  const addTeamMember = async (year, memberData, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/team-years/${year}/members`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(memberData)
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data.success) {
        await fetchTeamYears() // Refresh the list
        return data.teamYear
      } else {
        throw new Error(data.message || 'Failed to add team member')
      }
    } catch (err) {
      console.error('Error adding team member:', err)
      throw err
    }
  }

  const updateTeamMember = async (year, memberId, memberData, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/team-years/${year}/members/${memberId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(memberData)
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data.success) {
        await fetchTeamYears() // Refresh the list
        return data.teamYear
      } else {
        throw new Error(data.message || 'Failed to update team member')
      }
    } catch (err) {
      console.error('Error updating team member:', err)
      throw err
    }
  }

  const deleteTeamMember = async (year, memberId, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/team-years/${year}/members/${memberId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data.success) {
        await fetchTeamYears() // Refresh the list
        return true
      } else {
        throw new Error(data.message || 'Failed to delete team member')
      }
    } catch (err) {
      console.error('Error deleting team member:', err)
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

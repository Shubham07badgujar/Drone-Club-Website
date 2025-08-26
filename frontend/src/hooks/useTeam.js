import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

export const useTeam = () => {
  const [team, setTeam] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchTeam = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/team')
      setTeam(response.data.team)
      setError(null)
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch team members'
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const createMember = async (memberData) => {
    try {
      const response = await axios.post('/api/team', memberData)
      setTeam(prev => [response.data.member, ...prev])
      toast.success('Team member added successfully')
      return { success: true, member: response.data.member }
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to add team member'
      toast.error(message)
      return { success: false, message }
    }
  }

  const updateMember = async (id, memberData) => {
    try {
      const response = await axios.put(`/api/team/${id}`, memberData)
      setTeam(prev => 
        prev.map(member => 
          member.id === id ? response.data.member : member
        )
      )
      toast.success('Team member updated successfully')
      return { success: true, member: response.data.member }
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update team member'
      toast.error(message)
      return { success: false, message }
    }
  }

  const deleteMember = async (id) => {
    try {
      await axios.delete(`/api/team/${id}`)
      setTeam(prev => prev.filter(member => member.id !== id))
      toast.success('Team member removed successfully')
      return { success: true }
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to remove team member'
      toast.error(message)
      return { success: false, message }
    }
  }

  useEffect(() => {
    fetchTeam()
  }, [])

  return {
    team,
    loading,
    error,
    refetch: fetchTeam,
    createMember,
    updateMember,
    deleteMember,
  }
}

import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

export const useAchievements = () => {
  const [achievements, setAchievements] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchAchievements = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/achievements')
      setAchievements(response.data.achievements)
      setError(null)
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch achievements'
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const createAchievement = async (achievementData) => {
    try {
      const response = await axios.post('/api/achievements', achievementData)
      setAchievements(prev => [response.data.achievement, ...prev])
      toast.success('Achievement created successfully')
      return { success: true, achievement: response.data.achievement }
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to create achievement'
      toast.error(message)
      return { success: false, message }
    }
  }

  const updateAchievement = async (id, achievementData) => {
    try {
      const response = await axios.put(`/api/achievements/${id}`, achievementData)
      setAchievements(prev => 
        prev.map(achievement => 
          achievement.id === id ? response.data.achievement : achievement
        )
      )
      toast.success('Achievement updated successfully')
      return { success: true, achievement: response.data.achievement }
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update achievement'
      toast.error(message)
      return { success: false, message }
    }
  }

  const deleteAchievement = async (id) => {
    try {
      await axios.delete(`/api/achievements/${id}`)
      setAchievements(prev => prev.filter(achievement => achievement.id !== id))
      toast.success('Achievement deleted successfully')
      return { success: true }
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to delete achievement'
      toast.error(message)
      return { success: false, message }
    }
  }

  useEffect(() => {
    fetchAchievements()
  }, [])

  return {
    achievements,
    loading,
    error,
    refetch: fetchAchievements,
    createAchievement,
    updateAchievement,
    deleteAchievement,
  }
}

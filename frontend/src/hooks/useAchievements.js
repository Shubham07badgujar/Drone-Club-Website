import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { fallbackData } from '../utils/fallbackData'

export const useAchievements = () => {
  const [achievements, setAchievements] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const fetchingRef = useRef(false)
  const abortControllerRef = useRef(null)

  const fetchAchievements = async () => {
    if (fetchingRef.current) return
    
    try {
      fetchingRef.current = true
      setLoading(true)
      
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
      
      abortControllerRef.current = new AbortController()
      
      const response = await axios.get('/api/achievements', {
        signal: abortControllerRef.current.signal,
        timeout: 10000
      })
      
      setAchievements(response.data.achievements || [])
      setError(null)
    } catch (err) {
      if (err.name !== 'AbortError' && err.name !== 'CanceledError') {
        const message = err.response?.data?.message || 'Failed to fetch achievements'
        setError(message)
        console.error('Achievements fetch error:', err)
        
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
    achievements,
    loading,
    error,
    refetch: fetchAchievements,
    createAchievement,
    updateAchievement,
    deleteAchievement,
  }
}

import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { fallbackData } from '../utils/fallbackData'

const API_BASE_URL = 'http://localhost:5001/api'

export const useEvents = () => {
  const [events, setEvents] = useState([])
  const [featuredEvents, setFeaturedEvents] = useState([])
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const fetchingRef = useRef(false)
  const abortControllerRef = useRef(null)

  // Fetch all events with optional filters
  const fetchEvents = async (filters = {}) => {
    if (fetchingRef.current) return
    
    try {
      fetchingRef.current = true
      setLoading(true)
      
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
      
      abortControllerRef.current = new AbortController()
      
      const queryParams = new URLSearchParams()
      
      // Add filter parameters
      if (filters.category) queryParams.append('category', filters.category)
      if (filters.status) queryParams.append('status', filters.status)
      if (filters.isFeatured !== undefined) queryParams.append('isFeatured', filters.isFeatured)
      if (filters.page) queryParams.append('page', filters.page)
      if (filters.limit) queryParams.append('limit', filters.limit)
      if (filters.sortBy) queryParams.append('sortBy', filters.sortBy)
      if (filters.sortOrder) queryParams.append('sortOrder', filters.sortOrder)
      
      const queryString = queryParams.toString()
      const url = `/api/events${queryString ? `?${queryString}` : ''}`
      
      const response = await axios.get(url, {
        signal: abortControllerRef.current.signal,
        timeout: 10000
      })
      
      const eventsData = response.data.data?.events || response.data.events || response.data.data || []
      setEvents(eventsData)
      setError(null)
      
      return response.data.data || response.data
    } catch (err) {
      if (err.name !== 'AbortError' && err.name !== 'CanceledError') {
        const message = err.response?.data?.message || 'Failed to fetch events'
        setError(message)
        console.error('Events fetch error:', err)
        
        // Use fallback data
        const fallbackEvents = fallbackData.events || []
        setEvents(fallbackEvents)
        
        if (err.code !== 'ECONNREFUSED' && err.response?.status !== 429) {
          toast.error('Using offline data - ' + message)
        }
      }
    } finally {
      setLoading(false)
      fetchingRef.current = false
    }
  }

  // Fetch featured events
  const fetchFeaturedEvents = async () => {
    try {
      const response = await axios.get('/api/events/featured', {
        timeout: 10000
      })
      
      const featuredData = response.data.data || response.data.events || []
      setFeaturedEvents(featuredData)
      return featuredData
    } catch (err) {
      console.error('Error fetching featured events:', err)
      
      // Use fallback data
      const featuredFallback = fallbackData.events?.filter(event => event.isFeatured) || []
      setFeaturedEvents(featuredFallback)
      throw err
    }
  }

  // Fetch upcoming events
  const fetchUpcomingEvents = async () => {
    try {
      const response = await axios.get('/api/events/upcoming', {
        timeout: 10000
      })
      
      const upcomingData = response.data.data || response.data.events || []
      setUpcomingEvents(upcomingData)
      return upcomingData
    } catch (err) {
      console.error('Error fetching upcoming events:', err)
      
      // Use fallback data for upcoming events
      const upcomingFallback = fallbackData.events?.filter(event => 
        new Date(event.details?.date || event.date) > new Date()
      ) || []
      setUpcomingEvents(upcomingFallback)
      throw err
    }
  }

  // Fetch single event by ID
  const fetchEventById = async (id) => {
    try {
      const response = await axios.get(`/api/events/${id}`, {
        timeout: 10000
      })
      
      return response.data.data || response.data.event
    } catch (err) {
      console.error('Error fetching event:', err)
      
      // Try to find in fallback data
      const fallbackEvent = fallbackData.events?.find(event => event._id === id || event.id === id)
      if (fallbackEvent) {
        return fallbackEvent
      }
      
      throw err
    }
  }

  const createEvent = async (eventData) => {
    try {
      const response = await axios.post('/api/events', eventData)
      const newEvent = response.data.data || response.data.event
      setEvents(prev => [newEvent, ...prev])
      toast.success('Event created successfully')
      
      // Refresh featured/upcoming if needed
      if (newEvent.isFeatured) {
        await fetchFeaturedEvents()
      }
      await fetchUpcomingEvents()
      
      return { success: true, event: newEvent }
    } catch (err) {
      let message = 'Failed to create event'
      
      if (err.response?.status === 401) {
        message = 'Unauthorized: Please login again'
      } else if (err.response?.status === 403) {
        message = 'Forbidden: Admin access required'
      } else if (err.response?.status === 400) {
        const errors = err.response?.data?.errors
        message = errors ? `Validation Error: ${errors.join(', ')}` : err.response?.data?.message || message
      } else {
        message = err.response?.data?.message || message
      }
      
      toast.error(message)
      return { success: false, message }
    }
  }

  const updateEvent = async (id, eventData) => {
    try {
      const response = await axios.put(`/api/events/${id}`, eventData)
      const updatedEvent = response.data.data || response.data.event
      
      setEvents(prev => 
        prev.map(event => 
          (event._id === id || event.id === id) ? updatedEvent : event
        )
      )
      
      // Refresh featured/upcoming lists
      await fetchFeaturedEvents()
      await fetchUpcomingEvents()
      
      toast.success('Event updated successfully')
      return { success: true, event: updatedEvent }
    } catch (err) {
      let message = 'Failed to update event'
      
      if (err.response?.status === 401) {
        message = 'Unauthorized: Please login again'
      } else if (err.response?.status === 403) {
        message = 'Forbidden: Admin access required'
      } else if (err.response?.status === 404) {
        message = 'Event not found'
      } else if (err.response?.status === 400) {
        const errors = err.response?.data?.errors
        message = errors ? `Validation Error: ${errors.join(', ')}` : err.response?.data?.message || message
      } else {
        message = err.response?.data?.message || message
      }
      
      toast.error(message)
      return { success: false, message }
    }
  }

  // Toggle featured status (Admin only)
  const toggleFeatured = async (id) => {
    try {
      const response = await axios.patch(`/api/events/${id}/toggle-featured`)
      const updatedEvent = response.data.data || response.data.event
      
      setEvents(prev => 
        prev.map(event => 
          (event._id === id || event.id === id) ? updatedEvent : event
        )
      )
      
      // Refresh featured events list
      await fetchFeaturedEvents()
      
      toast.success('Featured status updated successfully')
      return { success: true, event: updatedEvent }
    } catch (err) {
      let message = 'Failed to toggle featured status'
      
      if (err.response?.status === 401) {
        message = 'Unauthorized: Please login again'
      } else if (err.response?.status === 403) {
        message = 'Forbidden: Admin access required'
      } else if (err.response?.status === 404) {
        message = 'Event not found'
      } else {
        message = err.response?.data?.message || message
      }
      
      toast.error(message)
      return { success: false, message }
    }
  }

  const deleteEvent = async (id) => {
    try {
      await axios.delete(`/api/events/${id}`)
      setEvents(prev => prev.filter(event => event._id !== id && event.id !== id))
      
      // Refresh featured/upcoming lists
      await fetchFeaturedEvents()
      await fetchUpcomingEvents()
      
      toast.success('Event deleted successfully')
      return { success: true }
    } catch (err) {
      let message = 'Failed to delete event'
      
      if (err.response?.status === 401) {
        message = 'Unauthorized: Please login again'
      } else if (err.response?.status === 403) {
        message = 'Forbidden: Admin access required'
      } else if (err.response?.status === 404) {
        message = 'Event not found'
      } else {
        message = err.response?.data?.message || message
      }
      
      toast.error(message)
      return { success: false, message }
    }
  }

  const registerForEvent = async (eventId, userData) => {
    try {
      const response = await axios.post(`/api/events/${eventId}/register`, userData)
      // Update local state to reflect registration
      setEvents(prev => 
        prev.map(event => 
          (event._id === eventId || event.id === eventId)
            ? { ...event, registrationCount: (event.registrationCount || 0) + 1 }
            : event
        )
      )
      toast.success('Registration successful!')
      return { success: true, registration: response.data.registration }
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to register for event'
      toast.error(message)
      return { success: false, message }
    }
  }

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        await Promise.all([
          fetchEvents(),
          fetchFeaturedEvents(),
          fetchUpcomingEvents()
        ])
      } catch (err) {
        console.error('Error loading initial event data:', err)
      }
    }

    const timer = setTimeout(() => {
      loadInitialData()
    }, 150) // Slightly different delay to prevent simultaneous calls

    return () => {
      clearTimeout(timer)
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [])

  return {
    // State
    events,
    featuredEvents,
    upcomingEvents,
    loading,
    error,
    
    // Actions
    fetchEvents,
    fetchFeaturedEvents,
    fetchUpcomingEvents,
    fetchEventById,
    createEvent,
    updateEvent,
    toggleFeatured,
    deleteEvent,
    registerForEvent,
    
    // Utilities
    refetch: fetchEvents,
    refreshEvents: fetchEvents,
    clearError: () => setError(null)
  }
}

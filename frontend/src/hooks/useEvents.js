import { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

export const useEvents = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/events')
      setEvents(response.data.events)
      setError(null)
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to fetch events'
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const createEvent = async (eventData) => {
    try {
      const response = await axios.post('/api/events', eventData)
      setEvents(prev => [response.data.event, ...prev])
      toast.success('Event created successfully')
      return { success: true, event: response.data.event }
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to create event'
      toast.error(message)
      return { success: false, message }
    }
  }

  const updateEvent = async (id, eventData) => {
    try {
      const response = await axios.put(`/api/events/${id}`, eventData)
      setEvents(prev => 
        prev.map(event => 
          event.id === id ? response.data.event : event
        )
      )
      toast.success('Event updated successfully')
      return { success: true, event: response.data.event }
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update event'
      toast.error(message)
      return { success: false, message }
    }
  }

  const deleteEvent = async (id) => {
    try {
      await axios.delete(`/api/events/${id}`)
      setEvents(prev => prev.filter(event => event.id !== id))
      toast.success('Event deleted successfully')
      return { success: true }
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to delete event'
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
          event.id === eventId 
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
    fetchEvents()
  }, [])

  return {
    events,
    loading,
    error,
    refetch: fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    registerForEvent,
  }
}

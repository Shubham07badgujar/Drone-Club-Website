import express from 'express'
import Event from '../models/Event.js'
import { authenticateToken } from '../middleware/auth.js'
import { validateEvent } from '../middleware/validation.js'

const router = express.Router()

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.findAll({
      order: [['date', 'DESC']]
    })
    
    res.json({
      success: true,
      data: events
    })
  } catch (error) {
    console.error('Error fetching events:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch events'
    })
  }
})

// Get single event
router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id)
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      })
    }
    
    res.json({
      success: true,
      data: event
    })
  } catch (error) {
    console.error('Error fetching event:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch event'
    })
  }
})

// Create event (admin only)
router.post('/', authenticateToken, validateEvent, async (req, res) => {
  try {
    const event = await Event.create(req.body)
    
    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: event
    })
  } catch (error) {
    console.error('Error creating event:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create event'
    })
  }
})

// Update event (admin only)
router.put('/:id', authenticateToken, validateEvent, async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id)
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      })
    }
    
    await event.update(req.body)
    
    res.json({
      success: true,
      message: 'Event updated successfully',
      data: event
    })
  } catch (error) {
    console.error('Error updating event:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update event'
    })
  }
})

// Delete event (admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id)
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      })
    }
    
    await event.destroy()
    
    res.json({
      success: true,
      message: 'Event deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting event:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete event'
    })
  }
})

export default router

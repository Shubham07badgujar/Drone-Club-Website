import { Event } from '../models/mongodb/index.js'
import mongoose from 'mongoose'

// Fallback data when MongoDB is not connected
const fallbackEvents = [
  {
    _id: '66c123456789abcdef234567',
    title: 'Annual Drone Racing Championship',
    description: 'Join us for the most exciting drone racing event of the year! Watch as pilots navigate through challenging obstacle courses at breakneck speeds.',
    date: new Date('2024-10-15T14:00:00Z'),
    location: 'University Main Campus - Engineering Quad',
    type: 'competition',
    registration_required: true,
    registration_url: 'https://droneclub.com/register/racing-championship',
    max_participants: 50,
    current_participants: 32,
    is_featured: true,
    createdAt: new Date('2024-08-01'),
    updatedAt: new Date('2024-08-20')
  },
  {
    _id: '66c123456789abcdef234568',
    title: 'Beginner Drone Building Workshop',
    description: 'Learn the fundamentals of drone construction in this hands-on workshop. Perfect for newcomers to the hobby!',
    date: new Date('2024-09-28T10:00:00Z'),
    location: 'Engineering Building - Room 201',
    type: 'workshop',
    registration_required: true,
    registration_url: 'https://droneclub.com/register/beginner-workshop',
    max_participants: 20,
    current_participants: 15,
    is_featured: false,
    createdAt: new Date('2024-08-10'),
    updatedAt: new Date('2024-08-25')
  }
]

// Check if MongoDB is connected
const isMongoConnected = () => {
  return mongoose.connection.readyState === 1
}

// @desc    Get all events
// @route   GET /api/events
// @access  Public
export const getEvents = async (req, res) => {
  try {
    // Use fallback data if MongoDB is not connected
    if (!isMongoConnected()) {
      return res.json({
        success: true,
        events: fallbackEvents,
        pagination: {
          page: 1,
          limit: 10,
          total: fallbackEvents.length,
          pages: 1
        },
        message: 'Using fallback data - Configure MongoDB Atlas for full functionality'
      })
    }

    const { page = 1, limit = 10, type, upcoming } = req.query
    const skip = (page - 1) * limit

    // Build query object
    const query = {}
    if (type) query.type = type
    if (upcoming === 'true') {
      query.date = { $gte: new Date() }
    }

    const [events, total] = await Promise.all([
      Event.find(query)
        .sort({ date: -1 })
        .skip(parseInt(skip))
        .limit(parseInt(limit))
        .lean(),
      Event.countDocuments(query)
    ])

    res.json({
      success: true,
      events,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Get events error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch events'
    })
  }
}

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
export const getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).lean()

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      })
    }

    res.json({
      success: true,
      event,
    })
  } catch (error) {
    console.error('Get event error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch event'
    })
  }
}

// @desc    Create event
// @route   POST /api/events
// @access  Private (Admin)
export const createEvent = async (req, res) => {
  try {
    const event = new Event(req.body)
    await event.save()

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      event,
    })
  } catch (error) {
    console.error('Create event error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create event'
    })
  }
}

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private (Admin)
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      })
    }

    res.json({
      success: true,
      message: 'Event updated successfully',
      event,
    })
  } catch (error) {
    console.error('Update event error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update event'
    })
  }
}

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private (Admin)
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id)

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      })
    }

    res.json({
      success: true,
      message: 'Event deleted successfully',
    })
  } catch (error) {
    console.error('Delete event error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete event'
    })
  }
}

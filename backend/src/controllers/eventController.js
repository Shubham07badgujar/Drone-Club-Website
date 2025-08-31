import Event from '../models/mongodb/Event.js'

// @desc    Get all events
// @route   GET /api/events
// @access  Public
export const getEvents = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      filter = 'all',
      category,
      status,
      upcoming,
      search
    } = req.query

    console.log(`🔍 Fetching events - Filter: ${filter}, Page: ${page}, Limit: ${limit}`)

    // Build query object
    let query = {}

    // Apply filters
    if (filter === 'featured') {
      query.is_featured = true
    }

    if (filter === 'upcoming') {
      query.date = { $gt: new Date() }
    }

    if (category && category !== 'all') {
      query.category = category
    }

    if (status && status !== 'all') {
      query.status = status
    }

    if (upcoming === 'true') {
      query.date = { $gt: new Date() }
    }

    if (search) {
      query.$or = [
        { eventName: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { venue: { $regex: search, $options: 'i' } }
      ]
    }

    console.log('📋 Query filters:', JSON.stringify(query, null, 2))

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit)
    const total = await Event.countDocuments(query)

    // Fetch events with pagination
    const events = await Event.find(query)
      .sort({ is_featured: -1, date: 1, display_order: 1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean()

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

    console.log(`✅ Retrieved ${events.length} events (${total} total)`)
  } catch (error) {
    console.error('❌ Get events error:', error)
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
    console.log(`🔍 Fetching event with ID: ${req.params.id}`)
    
    const event = await Event.findById(req.params.id).lean()

    if (!event) {
      console.log(`❌ Event not found: ${req.params.id}`)
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      })
    }

    console.log(`✅ Event fetched: ${event.title}`)
    res.json({
      success: true,
      event,
    })
  } catch (error) {
    console.error('❌ Get event error:', error)
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
    console.log(`👤 Admin ${req.admin.email} creating event`)
    console.log('📥 Request body received:', JSON.stringify(req.body, null, 2))

    // Validate required fields
    const { title, description, details, prizePool, contacts } = req.body
    if (!title || !description || !details || !prizePool || !contacts) {
      console.log('❌ Missing required fields:', { 
        title: !!title, 
        description: !!description, 
        details: !!details, 
        prizePool: !!prizePool,
        contacts: !!contacts 
      })
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        errors: {
          title: !title ? 'Title is required' : null,
          description: !description ? 'Description is required' : null,
          details: !details ? 'Event details are required' : null,
          prizePool: !prizePool ? 'Prize pool information is required' : null,
          contacts: !contacts ? 'Contact information is required' : null
        }
      })
    }

    // Process and validate data
    const eventData = {
      title: title.trim(),
      description: description.trim(),
      highlights: req.body.highlights || [],
      details: {
        date: new Date(details.date),
        time: details.time,
        venue: details.venue,
        registrationFee: Number(details.registrationFee),
        registrationDeadline: details.registrationDeadline ? new Date(details.registrationDeadline) : undefined,
        maxParticipants: details.maxParticipants || undefined,
        currentRegistrations: details.currentRegistrations || 0
      },
      prizePool: {
        total: Number(prizePool.total),
        first: prizePool.first ? Number(prizePool.first) : undefined,
        second: prizePool.second ? Number(prizePool.second) : undefined,
        third: prizePool.third ? Number(prizePool.third) : undefined,
        distribution: prizePool.distribution || undefined
      },
      rules: req.body.rules || [],
      contacts: contacts,
      status: req.body.status || 'Published',
      category: req.body.category || 'Competition',
      tags: req.body.tags || [],
      imageUrl: req.body.imageUrl?.trim() || '',
      gallery: req.body.gallery || [],
      is_featured: Boolean(req.body.is_featured),
      is_public: Boolean(req.body.is_public !== false),
      display_order: req.body.display_order || 0,
      created_by: req.admin.id
    }

    console.log('📝 Processed event data:', JSON.stringify(eventData, null, 2))

    const event = new Event(eventData)
    await event.save()

    console.log(`✅ Event created: ${event.title} (ID: ${event._id})`)

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      event,
    })
  } catch (error) {
    console.error('❌ Create event error:', error)
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message,
        value: err.value
      }))
      console.log('📋 Validation errors:', errors)
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      })
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Event with this title already exists',
        error: 'DUPLICATE_ENTRY'
      })
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create event',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    })
  }
}

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private (Admin)
export const updateEvent = async (req, res) => {
  try {
    console.log(`👤 Admin ${req.admin.email} updating event: ${req.params.id}`)
    console.log('📥 Update data:', JSON.stringify(req.body, null, 2))

    const event = await Event.findById(req.params.id)

    if (!event) {
      console.log(`❌ Event not found: ${req.params.id}`)
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      })
    }

    // Process update data
    const updateData = {
      ...req.body,
      updated_by: req.admin.id
    }

    // Remove empty strings and undefined values
    Object.keys(updateData).forEach(key => {
      if (updateData[key] === '' || updateData[key] === undefined) {
        delete updateData[key]
      }
    })

    console.log('📝 Processed update data:', JSON.stringify(updateData, null, 2))

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      updateData,
      { 
        new: true, 
        runValidators: true 
      }
    )

    console.log(`✅ Event updated: ${updatedEvent.title}`)

    res.json({
      success: true,
      message: 'Event updated successfully',
      event: updatedEvent,
    })
  } catch (error) {
    console.error('❌ Update event error:', error)
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message,
        value: err.value
      }))
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      })
    }

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
    console.log(`👤 Admin ${req.admin.email} deleting event: ${req.params.id}`)

    const event = await Event.findById(req.params.id)

    if (!event) {
      console.log(`❌ Event not found: ${req.params.id}`)
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      })
    }

    await Event.findByIdAndDelete(req.params.id)

    console.log(`✅ Event deleted: ${event.title} (ID: ${req.params.id})`)

    res.json({
      success: true,
      message: 'Event deleted successfully'
    })
  } catch (error) {
    console.error('❌ Delete event error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete event'
    })
  }
}

// @desc    Get featured events
// @route   GET /api/events/featured
// @access  Public
export const getFeaturedEvents = async (req, res) => {
  try {
    console.log('🔍 Fetching featured events...')

    const events = await Event.getFeatured()

    console.log(`✅ Retrieved ${events.length} featured events`)

    res.json({
      success: true,
      events
    })
  } catch (error) {
    console.error('❌ Get featured events error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured events'
    })
  }
}

// @desc    Get upcoming events
// @route   GET /api/events/upcoming
// @access  Public
export const getUpcomingEvents = async (req, res) => {
  try {
    console.log('🔍 Fetching upcoming events...')

    const events = await Event.getUpcoming()

    console.log(`✅ Retrieved ${events.length} upcoming events`)

    res.json({
      success: true,
      events
    })
  } catch (error) {
    console.error('❌ Get upcoming events error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch upcoming events'
    })
  }
}

// @desc    Toggle featured status
// @route   PATCH /api/events/:id/toggle-featured
// @access  Private (Admin)
export const toggleFeatured = async (req, res) => {
  try {
    console.log(`👤 Admin ${req.admin.email} toggling featured status for event: ${req.params.id}`)

    const event = await Event.findById(req.params.id)

    if (!event) {
      console.log(`❌ Event not found: ${req.params.id}`)
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      })
    }

    event.is_featured = !event.is_featured
    event.updated_by = req.admin.id
    await event.save()

    console.log(`✅ Event featured status toggled: ${event.title} - Featured: ${event.is_featured}`)

    res.json({
      success: true,
      message: `Event ${event.is_featured ? 'featured' : 'unfeatured'} successfully`,
      event
    })
  } catch (error) {
    console.error('❌ Toggle featured error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to toggle featured status'
    })
  }
}

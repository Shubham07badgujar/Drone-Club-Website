import { Achievement } from '../models/mongodb/index.js'

// @desc    Get all achievements
// @route   GET /api/achievements
// @access  Public
export const getAchievements = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      type, 
      category, 
      featured, 
      year, 
      level,
      active = 'true' 
    } = req.query
    
    const skip = (page - 1) * limit

    // Build query object
    const query = {}
    if (type) query.type = type
    if (category) query.category = category
    if (featured !== undefined) query.is_featured = featured === 'true'
    if (year) query.year = parseInt(year)
    if (level) query.level = level
    if (active !== undefined) query.is_active = active === 'true'

    console.log('🔍 Fetching achievements with query:', query)

    const [achievements, total] = await Promise.all([
      Achievement.find(query)
        .sort({ year: -1, display_order: 1, createdAt: -1 })
        .skip(parseInt(skip))
        .limit(parseInt(limit))
        .lean(),
      Achievement.countDocuments(query)
    ])

    res.json({
      success: true,
      achievements,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    })

    console.log(`✅ Retrieved ${achievements.length} achievements (${total} total)`)
  } catch (error) {
    console.error('❌ Get achievements error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch achievements'
    })
  }
}

// @desc    Get single achievement
// @route   GET /api/achievements/:id
// @access  Public
export const getAchievement = async (req, res) => {
  try {
    console.log(`🔍 Fetching achievement with ID: ${req.params.id}`)
    
    const achievement = await Achievement.findById(req.params.id).lean()

    if (!achievement) {
      console.log(`❌ Achievement not found: ${req.params.id}`)
      return res.status(404).json({
        success: false,
        message: 'Achievement not found'
      })
    }

    console.log(`✅ Achievement fetched: ${achievement.title}`)
    res.json({
      success: true,
      achievement,
    })
  } catch (error) {
    console.error('❌ Get achievement error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch achievement'
    })
  }
}

// @desc    Create achievement
// @route   POST /api/achievements
// @access  Private (Admin)
export const createAchievement = async (req, res) => {
  try {
    console.log(`👤 Admin ${req.admin.email} creating achievement`)
    console.log('📥 Request body received:', JSON.stringify(req.body, null, 2))

    // Validate required fields
    const { title, description, year } = req.body
    if (!title || !description || !year) {
      console.log('❌ Missing required fields:', { title: !!title, description: !!description, year: !!year })
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        errors: {
          title: !title ? 'Title is required' : null,
          description: !description ? 'Description is required' : null,
          year: !year ? 'Year is required' : null
        }
      })
    }

    // Transform and validate data
    const achievementData = {
      title: title.trim(),
      description: description.trim(),
      year: parseInt(year),
      // Transform lowercase to proper case for enum validation
      category: req.body.category ? req.body.category.charAt(0).toUpperCase() + req.body.category.slice(1).toLowerCase() : 'Competition',
      level: req.body.level ? req.body.level.charAt(0).toUpperCase() + req.body.level.slice(1).toLowerCase() : 'National',
      image: req.body.image || '',
      is_featured: Boolean(req.body.is_featured),
      display_order: req.body.display_order || 0,
      created_by: req.admin.id
    }

    console.log('📝 Processed achievement data:', JSON.stringify(achievementData, null, 2))

    const achievement = new Achievement(achievementData)
    await achievement.save()

    console.log(`✅ Achievement created: ${achievement.title} (ID: ${achievement._id})`)

    res.status(201).json({
      success: true,
      message: 'Achievement created successfully',
      achievement,
    })
  } catch (error) {
    console.error('❌ Create achievement error:', error)
    
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
        message: 'Achievement with this title already exists',
        error: 'DUPLICATE_ENTRY'
      })
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create achievement',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    })
  }
}

// @desc    Update achievement
// @route   PUT /api/achievements/:id
// @access  Private (Admin)
export const updateAchievement = async (req, res) => {
  try {
    console.log(`👤 Admin ${req.admin.email} updating achievement: ${req.params.id}`)

    // Add admin information for tracking updates
    const updateData = {
      ...req.body,
      updated_by: req.admin.id
    }

    const achievement = await Achievement.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    )

    if (!achievement) {
      console.log(`❌ Achievement not found for update: ${req.params.id}`)
      return res.status(404).json({
        success: false,
        message: 'Achievement not found'
      })
    }

    console.log(`✅ Achievement updated: ${achievement.title}`)

    res.json({
      success: true,
      message: 'Achievement updated successfully',
      achievement,
    })
  } catch (error) {
    console.error('❌ Update achievement error:', error)
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message)
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      })
    }

    res.status(500).json({
      success: false,
      message: 'Failed to update achievement'
    })
  }
}

// @desc    Delete achievement
// @route   DELETE /api/achievements/:id
// @access  Private (Admin)
export const deleteAchievement = async (req, res) => {
  try {
    console.log(`👤 Admin ${req.admin.email} deleting achievement: ${req.params.id}`)

    const achievement = await Achievement.findByIdAndDelete(req.params.id)

    if (!achievement) {
      console.log(`❌ Achievement not found for deletion: ${req.params.id}`)
      return res.status(404).json({
        success: false,
        message: 'Achievement not found'
      })
    }

    console.log(`✅ Achievement deleted: ${achievement.title}`)

    res.json({
      success: true,
      message: 'Achievement deleted successfully',
      deletedAchievement: {
        id: achievement._id,
        title: achievement.title
      }
    })
  } catch (error) {
    console.error('❌ Delete achievement error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete achievement'
    })
  }
}

// @desc    Get featured achievements
// @route   GET /api/achievements/featured
// @access  Public
export const getFeaturedAchievements = async (req, res) => {
  try {
    console.log('🔍 Fetching featured achievements')

    const achievements = await Achievement.getFeatured()

    console.log(`✅ Retrieved ${achievements.length} featured achievements`)

    res.json({
      success: true,
      achievements,
      count: achievements.length
    })
  } catch (error) {
    console.error('❌ Get featured achievements error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured achievements'
    })
  }
}

// @desc    Get achievements by year
// @route   GET /api/achievements/year/:year
// @access  Public
export const getAchievementsByYear = async (req, res) => {
  try {
    const year = parseInt(req.params.year)
    console.log(`🔍 Fetching achievements for year: ${year}`)

    const achievements = await Achievement.getByYear(year)

    console.log(`✅ Retrieved ${achievements.length} achievements for year ${year}`)

    res.json({
      success: true,
      achievements,
      year,
      count: achievements.length
    })
  } catch (error) {
    console.error('❌ Get achievements by year error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch achievements by year'
    })
  }
}

// @desc    Toggle achievement featured status
// @route   PATCH /api/achievements/:id/featured
// @access  Private (Admin)
export const toggleFeatured = async (req, res) => {
  try {
    console.log(`👤 Admin ${req.admin.email} toggling featured status for achievement: ${req.params.id}`)

    const achievement = await Achievement.findById(req.params.id)

    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: 'Achievement not found'
      })
    }

    await achievement.toggleFeatured()

    console.log(`✅ Achievement featured status toggled: ${achievement.title} (featured: ${achievement.is_featured})`)

    res.json({
      success: true,
      message: `Achievement ${achievement.is_featured ? 'featured' : 'unfeatured'} successfully`,
      achievement
    })
  } catch (error) {
    console.error('❌ Toggle featured error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to toggle featured status'
    })
  }
}

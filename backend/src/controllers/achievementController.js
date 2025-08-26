import { Achievement } from '../models/mongodb/index.js'

// @desc    Get all achievements
// @route   GET /api/achievements
// @access  Public
export const getAchievements = async (req, res) => {
  try {
    const { page = 1, limit = 10, type, category, featured } = req.query
    const skip = (page - 1) * limit

    // Build query object
    const query = {}
    if (type) query.type = type
    if (category) query.category = category
    if (featured !== undefined) query.is_featured = featured === 'true'

    const [achievements, total] = await Promise.all([
      Achievement.find(query)
        .sort({ date: -1 })
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
  } catch (error) {
    console.error('Get achievements error:', error)
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
    const achievement = await Achievement.findById(req.params.id).lean()

    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: 'Achievement not found'
      })
    }

    res.json({
      success: true,
      achievement,
    })
  } catch (error) {
    console.error('Get achievement error:', error)
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
    const achievement = new Achievement(req.body)
    await achievement.save()

    res.status(201).json({
      success: true,
      message: 'Achievement created successfully',
      achievement,
    })
  } catch (error) {
    console.error('Create achievement error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create achievement'
    })
  }
}

// @desc    Update achievement
// @route   PUT /api/achievements/:id
// @access  Private (Admin)
export const updateAchievement = async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: 'Achievement not found'
      })
    }

    res.json({
      success: true,
      message: 'Achievement updated successfully',
      achievement,
    })
  } catch (error) {
    console.error('Update achievement error:', error)
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
    const achievement = await Achievement.findByIdAndDelete(req.params.id)

    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: 'Achievement not found'
      })
    }

    res.json({
      success: true,
      message: 'Achievement deleted successfully',
    })
  } catch (error) {
    console.error('Delete achievement error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete achievement'
    })
  }
}

import { TeamYear } from '../models/mongodb/index.js'

// @desc    Get all team years with members
// @route   GET /api/team-years
// @access  Public
export const getTeamYears = async (req, res) => {
  try {
    const { active } = req.query

    // Build query object
    const query = {}
    if (active !== undefined) query.isActive = active === 'true'

    const teamYears = await TeamYear.find(query)
      .sort({ year: -1 }) // Most recent years first
      .lean()

    res.json({
      success: true,
      teamYears,
    })
  } catch (error) {
    console.error('Get team years error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch team years'
    })
  }
}

// @desc    Get single team year
// @route   GET /api/team-years/:year
// @access  Public
export const getTeamYear = async (req, res) => {
  try {
    const year = parseInt(req.params.year)
    
    if (isNaN(year)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid year parameter'
      })
    }

    const teamYear = await TeamYear.findOne({ year }).lean()

    if (!teamYear) {
      return res.status(404).json({
        success: false,
        message: 'Team year not found'
      })
    }

    res.json({
      success: true,
      teamYear,
    })
  } catch (error) {
    console.error('Get team year error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch team year'
    })
  }
}

// @desc    Create team year
// @route   POST /api/team-years
// @access  Private (Admin)
export const createTeamYear = async (req, res) => {
  try {
    const { year, description, members = [] } = req.body

    // Check if year already exists
    const existingYear = await TeamYear.findOne({ year })
    if (existingYear) {
      return res.status(400).json({
        success: false,
        message: 'Team year already exists'
      })
    }

    const teamYear = new TeamYear({
      year,
      description,
      members
    })
    
    await teamYear.save()

    res.status(201).json({
      success: true,
      message: 'Team year created successfully',
      teamYear,
    })
  } catch (error) {
    console.error('Create team year error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create team year'
    })
  }
}

// @desc    Update team year
// @route   PUT /api/team-years/:year
// @access  Private (Admin)
export const updateTeamYear = async (req, res) => {
  try {
    const year = parseInt(req.params.year)
    
    if (isNaN(year)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid year parameter'
      })
    }

    const teamYear = await TeamYear.findOneAndUpdate(
      { year },
      req.body,
      { new: true, runValidators: true }
    )

    if (!teamYear) {
      return res.status(404).json({
        success: false,
        message: 'Team year not found'
      })
    }

    res.json({
      success: true,
      message: 'Team year updated successfully',
      teamYear,
    })
  } catch (error) {
    console.error('Update team year error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update team year'
    })
  }
}

// @desc    Delete team year
// @route   DELETE /api/team-years/:year
// @access  Private (Admin)
export const deleteTeamYear = async (req, res) => {
  try {
    const year = parseInt(req.params.year)
    
    if (isNaN(year)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid year parameter'
      })
    }

    const teamYear = await TeamYear.findOneAndDelete({ year })

    if (!teamYear) {
      return res.status(404).json({
        success: false,
        message: 'Team year not found'
      })
    }

    res.json({
      success: true,
      message: 'Team year deleted successfully',
    })
  } catch (error) {
    console.error('Delete team year error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete team year'
    })
  }
}

// @desc    Add member to team year
// @route   POST /api/team-years/:year/members
// @access  Private (Admin)
export const addTeamMember = async (req, res) => {
  try {
    const year = parseInt(req.params.year)
    
    if (isNaN(year)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid year parameter'
      })
    }

    const teamYear = await TeamYear.findOne({ year })

    if (!teamYear) {
      return res.status(404).json({
        success: false,
        message: 'Team year not found'
      })
    }

    // Add order if not provided
    if (!req.body.order) {
      req.body.order = teamYear.members.length
    }

    teamYear.members.push(req.body)
    await teamYear.save()

    res.status(201).json({
      success: true,
      message: 'Team member added successfully',
      teamYear,
    })
  } catch (error) {
    console.error('Add team member error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to add team member'
    })
  }
}

// @desc    Update team member
// @route   PUT /api/team-years/:year/members/:memberId
// @access  Private (Admin)
export const updateTeamMember = async (req, res) => {
  try {
    const year = parseInt(req.params.year)
    const memberId = req.params.memberId
    
    if (isNaN(year)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid year parameter'
      })
    }

    const teamYear = await TeamYear.findOne({ year })

    if (!teamYear) {
      return res.status(404).json({
        success: false,
        message: 'Team year not found'
      })
    }

    const member = teamYear.members.id(memberId)
    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      })
    }

    // Update member properties
    Object.assign(member, req.body)
    await teamYear.save()

    res.json({
      success: true,
      message: 'Team member updated successfully',
      teamYear,
    })
  } catch (error) {
    console.error('Update team member error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update team member'
    })
  }
}

// @desc    Delete team member
// @route   DELETE /api/team-years/:year/members/:memberId
// @access  Private (Admin)
export const deleteTeamMember = async (req, res) => {
  try {
    const year = parseInt(req.params.year)
    const memberId = req.params.memberId
    
    if (isNaN(year)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid year parameter'
      })
    }

    const teamYear = await TeamYear.findOne({ year })

    if (!teamYear) {
      return res.status(404).json({
        success: false,
        message: 'Team year not found'
      })
    }

    const member = teamYear.members.id(memberId)
    if (!member) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      })
    }

    member.deleteOne()
    await teamYear.save()

    res.json({
      success: true,
      message: 'Team member deleted successfully',
      teamYear,
    })
  } catch (error) {
    console.error('Delete team member error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete team member'
    })
  }
}

import { TeamMember } from '../models/mongodb/index.js'

// @desc    Get all team members
// @route   GET /api/team
// @access  Public
export const getTeamMembers = async (req, res) => {
  try {
    const { department, role, year, active } = req.query

    // Build query object
    const query = {}
    if (department) query.department = department
    if (role) query.role = role
    if (year) query.year = year
    if (active !== undefined) query.is_active = active === 'true'

    const teamMembers = await TeamMember.find(query)
      .populate('achievements', 'title type date')
      .populate('projects', 'title status')
      .sort({ role: 1, name: 1 })
      .lean()

    res.json({
      success: true,
      teamMembers,
    })
  } catch (error) {
    console.error('Get team members error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch team members'
    })
  }
}

// @desc    Get single team member
// @route   GET /api/team/:id
// @access  Public
export const getTeamMember = async (req, res) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id)
      .populate('achievements')
      .populate('projects')
      .lean()

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      })
    }

    res.json({
      success: true,
      teamMember,
    })
  } catch (error) {
    console.error('Get team member error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch team member'
    })
  }
}

// @desc    Create team member
// @route   POST /api/team
// @access  Private (Admin)
export const createTeamMember = async (req, res) => {
  try {
    const teamMember = new TeamMember(req.body)
    await teamMember.save()

    res.status(201).json({
      success: true,
      message: 'Team member created successfully',
      teamMember,
    })
  } catch (error) {
    console.error('Create team member error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create team member'
    })
  }
}

// @desc    Update team member
// @route   PUT /api/team/:id
// @access  Private (Admin)
export const updateTeamMember = async (req, res) => {
  try {
    const teamMember = await TeamMember.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      })
    }

    res.json({
      success: true,
      message: 'Team member updated successfully',
      teamMember,
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
// @route   DELETE /api/team/:id
// @access  Private (Admin)
export const deleteTeamMember = async (req, res) => {
  try {
    const teamMember = await TeamMember.findByIdAndDelete(req.params.id)

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      })
    }

    res.json({
      success: true,
      message: 'Team member deleted successfully',
    })
  } catch (error) {
    console.error('Delete team member error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete team member'
    })
  }
}

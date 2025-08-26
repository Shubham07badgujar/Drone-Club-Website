import express from 'express'
import TeamMember from '../models/TeamMember.js'
import Department from '../models/Department.js'
import { authenticateToken } from '../middleware/auth.js'
import { validateTeamMember } from '../middleware/validation.js'

const router = express.Router()

// Get all team members
router.get('/', async (req, res) => {
  try {
    const teamMembers = await TeamMember.findAll({
      include: [{
        model: Department,
        as: 'department',
        attributes: ['id', 'name', 'color']
      }],
      order: [['position', 'ASC'], ['name', 'ASC']]
    })
    
    res.json({
      success: true,
      data: teamMembers
    })
  } catch (error) {
    console.error('Error fetching team members:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch team members'
    })
  }
})

// Get single team member
router.get('/:id', async (req, res) => {
  try {
    const teamMember = await TeamMember.findByPk(req.params.id, {
      include: [{
        model: Department,
        as: 'department',
        attributes: ['id', 'name', 'color']
      }]
    })
    
    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      })
    }
    
    res.json({
      success: true,
      data: teamMember
    })
  } catch (error) {
    console.error('Error fetching team member:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch team member'
    })
  }
})

// Create team member (admin only)
router.post('/', authenticateToken, validateTeamMember, async (req, res) => {
  try {
    const teamMember = await TeamMember.create(req.body)
    
    res.status(201).json({
      success: true,
      message: 'Team member created successfully',
      data: teamMember
    })
  } catch (error) {
    console.error('Error creating team member:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create team member'
    })
  }
})

// Update team member (admin only)
router.put('/:id', authenticateToken, validateTeamMember, async (req, res) => {
  try {
    const teamMember = await TeamMember.findByPk(req.params.id)
    
    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      })
    }
    
    await teamMember.update(req.body)
    
    res.json({
      success: true,
      message: 'Team member updated successfully',
      data: teamMember
    })
  } catch (error) {
    console.error('Error updating team member:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update team member'
    })
  }
})

// Delete team member (admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const teamMember = await TeamMember.findByPk(req.params.id)
    
    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      })
    }
    
    await teamMember.destroy()
    
    res.json({
      success: true,
      message: 'Team member deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting team member:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete team member'
    })
  }
})

export default router

import express from 'express'
import Achievement from '../models/Achievement.js'
import { authenticateToken } from '../middleware/auth.js'
import { validateAchievement } from '../middleware/validation.js'

const router = express.Router()

// Get all achievements
router.get('/', async (req, res) => {
  try {
    const achievements = await Achievement.findAll({
      order: [['date', 'DESC']]
    })
    
    res.json({
      success: true,
      data: achievements
    })
  } catch (error) {
    console.error('Error fetching achievements:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch achievements'
    })
  }
})

// Get single achievement
router.get('/:id', async (req, res) => {
  try {
    const achievement = await Achievement.findByPk(req.params.id)
    
    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: 'Achievement not found'
      })
    }
    
    res.json({
      success: true,
      data: achievement
    })
  } catch (error) {
    console.error('Error fetching achievement:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch achievement'
    })
  }
})

// Create achievement (admin only)
router.post('/', authenticateToken, validateAchievement, async (req, res) => {
  try {
    const achievement = await Achievement.create(req.body)
    
    res.status(201).json({
      success: true,
      message: 'Achievement created successfully',
      data: achievement
    })
  } catch (error) {
    console.error('Error creating achievement:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create achievement'
    })
  }
})

// Update achievement (admin only)
router.put('/:id', authenticateToken, validateAchievement, async (req, res) => {
  try {
    const achievement = await Achievement.findByPk(req.params.id)
    
    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: 'Achievement not found'
      })
    }
    
    await achievement.update(req.body)
    
    res.json({
      success: true,
      message: 'Achievement updated successfully',
      data: achievement
    })
  } catch (error) {
    console.error('Error updating achievement:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update achievement'
    })
  }
})

// Delete achievement (admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const achievement = await Achievement.findByPk(req.params.id)
    
    if (!achievement) {
      return res.status(404).json({
        success: false,
        message: 'Achievement not found'
      })
    }
    
    await achievement.destroy()
    
    res.json({
      success: true,
      message: 'Achievement deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting achievement:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete achievement'
    })
  }
})

export default router

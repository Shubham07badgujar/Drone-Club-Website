import express from 'express'
import Department from '../models/Department.js'
import { authenticateToken } from '../middleware/auth.js'
import { validateDepartment } from '../middleware/validation.js'

const router = express.Router()

// Get all departments
router.get('/', async (req, res) => {
  try {
    const departments = await Department.findAll({
      order: [['name', 'ASC']]
    })
    
    res.json({
      success: true,
      data: departments
    })
  } catch (error) {
    console.error('Error fetching departments:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch departments'
    })
  }
})

// Get single department
router.get('/:id', async (req, res) => {
  try {
    const department = await Department.findByPk(req.params.id)
    
    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      })
    }
    
    res.json({
      success: true,
      data: department
    })
  } catch (error) {
    console.error('Error fetching department:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch department'
    })
  }
})

// Create department (admin only)
router.post('/', authenticateToken, validateDepartment, async (req, res) => {
  try {
    const department = await Department.create(req.body)
    
    res.status(201).json({
      success: true,
      message: 'Department created successfully',
      data: department
    })
  } catch (error) {
    console.error('Error creating department:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create department'
    })
  }
})

// Update department (admin only)
router.put('/:id', authenticateToken, validateDepartment, async (req, res) => {
  try {
    const department = await Department.findByPk(req.params.id)
    
    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      })
    }
    
    await department.update(req.body)
    
    res.json({
      success: true,
      message: 'Department updated successfully',
      data: department
    })
  } catch (error) {
    console.error('Error updating department:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update department'
    })
  }
})

// Delete department (admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const department = await Department.findByPk(req.params.id)
    
    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      })
    }
    
    await department.destroy()
    
    res.json({
      success: true,
      message: 'Department deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting department:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete department'
    })
  }
})

export default router

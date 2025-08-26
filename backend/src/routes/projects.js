import express from 'express'
import { 
  getProjects, 
  getProject, 
  createProject, 
  updateProject, 
  deleteProject 
} from '../controllers/projectController.js'
import { authenticateToken, requireAdmin } from '../middleware/auth.js'
import { validate, projectSchema } from '../middleware/validation.js'

const router = express.Router()

// Public routes
router.get('/', getProjects)
router.get('/:id', getProject)

// Protected routes (Admin only)
router.post('/', authenticateToken, requireAdmin, validate(projectSchema), createProject)
router.put('/:id', authenticateToken, requireAdmin, validate(projectSchema), updateProject)
router.delete('/:id', authenticateToken, requireAdmin, deleteProject)

export default router

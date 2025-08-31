import express from 'express'
import { 
  getProjects, 
  getProject, 
  createProject, 
  updateProject, 
  deleteProject,
  getFeaturedProjects,
  getProjectsByYear,
  toggleFeatured
} from '../controllers/projectController.js'
import { authenticateToken, requireAdmin } from '../middleware/auth.js'
import { validate, projectSchema } from '../middleware/validation.js'

const router = express.Router()

// Public routes
router.get('/', getProjects)
router.get('/featured', getFeaturedProjects)
router.get('/year/:year', getProjectsByYear)
router.get('/:id', getProject)

// Protected routes (Admin only)
router.post('/', authenticateToken, requireAdmin, validate(projectSchema), createProject)
router.put('/:id', authenticateToken, requireAdmin, validate(projectSchema), updateProject)
router.patch('/:id/toggle-featured', authenticateToken, requireAdmin, toggleFeatured)
router.delete('/:id', authenticateToken, requireAdmin, deleteProject)

export default router

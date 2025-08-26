import express from 'express'
import { 
  getAchievements, 
  getAchievement, 
  createAchievement, 
  updateAchievement, 
  deleteAchievement 
} from '../controllers/achievementController.js'
import { authenticateToken, requireAdmin } from '../middleware/auth.js'
import { validate, achievementSchema } from '../middleware/validation.js'

const router = express.Router()

// Public routes
router.get('/', getAchievements)
router.get('/:id', getAchievement)

// Protected routes (Admin only)
router.post('/', authenticateToken, requireAdmin, validate(achievementSchema), createAchievement)
router.put('/:id', authenticateToken, requireAdmin, validate(achievementSchema), updateAchievement)
router.delete('/:id', authenticateToken, requireAdmin, deleteAchievement)

export default router

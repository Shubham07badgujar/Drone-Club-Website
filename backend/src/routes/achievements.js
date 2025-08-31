import express from 'express'
import { 
  getAchievements, 
  getAchievement, 
  createAchievement, 
  updateAchievement, 
  deleteAchievement,
  getFeaturedAchievements,
  getAchievementsByYear,
  toggleFeatured
} from '../controllers/achievementController.js'
import { authenticateAdmin, requirePermission } from '../middleware/authMiddleware.js'

const router = express.Router()

// Public routes
router.get('/', getAchievements)
router.get('/featured', getFeaturedAchievements)
router.get('/year/:year', getAchievementsByYear)
router.get('/:id', getAchievement)

// Protected routes (Admin only)
router.post('/', 
  authenticateAdmin, 
  requirePermission(['manage-content', 'write']), 
  createAchievement
)

router.put('/:id', 
  authenticateAdmin, 
  requirePermission(['manage-content', 'write']), 
  updateAchievement
)

router.delete('/:id', 
  authenticateAdmin, 
  requirePermission(['manage-content', 'delete']), 
  deleteAchievement
)

router.patch('/:id/toggle-featured', 
  authenticateAdmin, 
  requirePermission(['manage-content', 'write']), 
  toggleFeatured
)

export default router

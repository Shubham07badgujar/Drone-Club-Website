import express from 'express'
import {
  getTeamYears,
  getTeamYear,
  createTeamYear,
  updateTeamYear,
  deleteTeamYear,
  addTeamMember,
  updateTeamMember,
  deleteTeamMember
} from '../controllers/teamYearController.js'
import { authenticateAdmin, requirePermission } from '../middleware/authMiddleware.js'

const router = express.Router()

// Public routes
router.get('/', getTeamYears)
router.get('/:year', getTeamYear)

// Admin routes
router.post('/', authenticateAdmin, requirePermission(['manage-content', 'write']), createTeamYear)
router.put('/:year', authenticateAdmin, requirePermission(['manage-content', 'write']), updateTeamYear)
router.delete('/:year', authenticateAdmin, requirePermission(['delete']), deleteTeamYear)

// Team member management routes
router.post('/:year/members', authenticateAdmin, requirePermission(['manage-content', 'write']), addTeamMember)
router.put('/:year/members/:memberId', authenticateAdmin, requirePermission(['manage-content', 'write']), updateTeamMember)
router.delete('/:year/members/:memberId', authenticateAdmin, requirePermission(['manage-content', 'delete']), deleteTeamMember)

export default router

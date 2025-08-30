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
import { authenticateToken, requireAdmin } from '../middleware/auth.js'

const router = express.Router()

// Public routes
router.get('/', getTeamYears)
router.get('/:year', getTeamYear)

// Admin routes
router.post('/', authenticateToken, requireAdmin, createTeamYear)
router.put('/:year', authenticateToken, requireAdmin, updateTeamYear)
router.delete('/:year', authenticateToken, requireAdmin, deleteTeamYear)

// Team member management routes
router.post('/:year/members', authenticateToken, requireAdmin, addTeamMember)
router.put('/:year/members/:memberId', authenticateToken, requireAdmin, updateTeamMember)
router.delete('/:year/members/:memberId', authenticateToken, requireAdmin, deleteTeamMember)

export default router

import express from 'express'
import { 
  getEvents, 
  getEvent, 
  createEvent, 
  updateEvent, 
  deleteEvent 
} from '../controllers/eventController.js'
import { authenticateToken, requireAdmin } from '../middleware/auth.js'
import { validate, eventSchema } from '../middleware/validation.js'

const router = express.Router()

// Public routes
router.get('/', getEvents)
router.get('/:id', getEvent)

// Protected routes (Admin only)
router.post('/', authenticateToken, requireAdmin, validate(eventSchema), createEvent)
router.put('/:id', authenticateToken, requireAdmin, validate(eventSchema), updateEvent)
router.delete('/:id', authenticateToken, requireAdmin, deleteEvent)

export default router

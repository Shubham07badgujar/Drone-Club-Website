import express from 'express'
import { login, getCurrentAdmin, logout } from '../controllers/authController.js'
import { authenticateToken } from '../middleware/auth.js'
import { validate, loginSchema } from '../middleware/validation.js'

const router = express.Router()

// @route   POST /api/auth/login
router.post('/login', validate(loginSchema), login)

// @route   GET /api/auth/me
router.get('/me', authenticateToken, getCurrentAdmin)

// @route   POST /api/auth/logout
router.post('/logout', authenticateToken, logout)

export default router

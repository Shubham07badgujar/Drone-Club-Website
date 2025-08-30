import express from 'express'
import { login, verifyToken, getMe, logout } from '../controllers/authController.js'
import { authenticateAdmin } from '../middleware/authMiddleware.js'
import { validate, loginSchema } from '../middleware/validation.js'

const router = express.Router()

// @route   POST /api/auth/login
router.post('/login', validate(loginSchema), login)

// @route   GET /api/auth/verify
router.get('/verify', authenticateAdmin, verifyToken)

// @route   GET /api/auth/me
router.get('/me', authenticateAdmin, getMe)

// @route   POST /api/auth/logout
router.post('/logout', authenticateAdmin, logout)

export default router

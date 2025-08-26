import express from 'express'
import { 
  getBlogs, 
  getBlog, 
  createBlog, 
  updateBlog, 
  deleteBlog 
} from '../controllers/blogController.js'
import { authenticateToken, requireAdmin } from '../middleware/auth.js'
import { validate, blogSchema } from '../middleware/validation.js'

const router = express.Router()

// Public routes
router.get('/', getBlogs)
router.get('/:id', getBlog)

// Protected routes (Admin only)
router.post('/', authenticateToken, requireAdmin, validate(blogSchema), createBlog)
router.put('/:id', authenticateToken, requireAdmin, validate(blogSchema), updateBlog)
router.delete('/:id', authenticateToken, requireAdmin, deleteBlog)

export default router

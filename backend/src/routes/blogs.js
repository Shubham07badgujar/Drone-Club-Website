import express from 'express'
import Blog from '../models/Blog.js'
import { authenticateToken } from '../middleware/auth.js'
import { validateBlog } from '../middleware/validation.js'

const router = express.Router()

// Get all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      order: [['created_at', 'DESC']]
    })
    
    res.json({
      success: true,
      data: blogs
    })
  } catch (error) {
    console.error('Error fetching blogs:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blogs'
    })
  }
})

// Get single blog
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      })
    }
    
    res.json({
      success: true,
      data: blog
    })
  } catch (error) {
    console.error('Error fetching blog:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog'
    })
  }
})

// Create blog (admin only)
router.post('/', authenticateToken, validateBlog, async (req, res) => {
  try {
    const blog = await Blog.create(req.body)
    
    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      data: blog
    })
  } catch (error) {
    console.error('Error creating blog:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create blog'
    })
  }
})

// Update blog (admin only)
router.put('/:id', authenticateToken, validateBlog, async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      })
    }
    
    await blog.update(req.body)
    
    res.json({
      success: true,
      message: 'Blog updated successfully',
      data: blog
    })
  } catch (error) {
    console.error('Error updating blog:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update blog'
    })
  }
})

// Delete blog (admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      })
    }
    
    await blog.destroy()
    
    res.json({
      success: true,
      message: 'Blog deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting blog:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete blog'
    })
  }
})

export default router

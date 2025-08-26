import { Blog } from '../models/mongodb/index.js'
import mongoose from 'mongoose'

// Fallback data when MongoDB is not connected
const fallbackBlogs = [
  {
    _id: '66c123456789abcdef345678',
    title: 'The Future of Autonomous Flight',
    content: 'The future of autonomous flight is rapidly approaching with breakthrough developments in artificial intelligence, computer vision, and sensor technology. Modern drones are becoming increasingly sophisticated, capable of making complex decisions in real-time without human intervention.',
    excerpt: 'Exploring the latest developments in AI-powered drone technology',
    author: 'Alex Chen',
    category: 'Technology',
    published: true,
    featured: true,
    imageUrl: '/api/placeholder/600/400',
    tags: ['AI', 'Autonomy', 'Future Tech'],
    createdAt: new Date('2024-08-20T10:00:00Z'),
    updatedAt: new Date('2024-08-20T10:00:00Z')
  },
  {
    _id: '66c123456789abcdef345679',
    title: 'Drone Safety Best Practices',
    content: 'Safety is paramount when operating drones, whether for recreational purposes or commercial applications. Understanding and following proper safety protocols protects both the operator and the public while ensuring successful flight operations.',
    excerpt: 'Essential safety guidelines for responsible drone operation',
    author: 'Sarah Johnson',
    category: 'Safety',
    published: true,
    featured: false,
    imageUrl: '/api/placeholder/600/400',
    tags: ['Safety', 'Guidelines', 'Best Practices'],
    createdAt: new Date('2024-08-18T14:30:00Z'),
    updatedAt: new Date('2024-08-18T14:30:00Z')
  }
]

// Check if MongoDB is connected
const isMongoConnected = () => {
  return mongoose.connection.readyState === 1
}

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
export const getBlogs = async (req, res) => {
  try {
    // Use fallback data if MongoDB is not connected
    if (!isMongoConnected()) {
      return res.json({
        success: true,
        blogs: fallbackBlogs,
        pagination: {
          page: 1,
          limit: 10,
          total: fallbackBlogs.length,
          pages: 1
        },
        message: 'Using fallback data - Configure MongoDB Atlas for full functionality'
      })
    }

    const { page = 1, limit = 10, category, published, author } = req.query
    const skip = (page - 1) * limit

    // Build query object
    const query = {}
    if (category) query.category = category
    if (published !== undefined) query.published = published === 'true'
    if (author) query.author = { $regex: author, $options: 'i' }

    const [blogs, total] = await Promise.all([
      Blog.find(query)
        .sort({ createdAt: -1 })
        .skip(parseInt(skip))
        .limit(parseInt(limit))
        .lean(),
      Blog.countDocuments(query)
    ])

    res.json({
      success: true,
      blogs,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Get blogs error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blogs'
    })
  }
}

// @desc    Get single blog
// @route   GET /api/blogs/:id
// @access  Public
export const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).lean()

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      })
    }

    // Increment views
    await Blog.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } })

    res.json({
      success: true,
      blog,
    })
  } catch (error) {
    console.error('Get blog error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog'
    })
  }
}

// @desc    Create blog
// @route   POST /api/blogs
// @access  Private (Admin)
export const createBlog = async (req, res) => {
  try {
    const blog = new Blog(req.body)
    await blog.save()

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      blog,
    })
  } catch (error) {
    console.error('Create blog error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create blog'
    })
  }
}

// @desc    Update blog
// @route   PUT /api/blogs/:id
// @access  Private (Admin)
export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      })
    }

    res.json({
      success: true,
      message: 'Blog updated successfully',
      blog,
    })
  } catch (error) {
    console.error('Update blog error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update blog'
    })
  }
}

// @desc    Delete blog
// @route   DELETE /api/blogs/:id
// @access  Private (Admin)
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id)

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      })
    }

    res.json({
      success: true,
      message: 'Blog deleted successfully',
    })
  } catch (error) {
    console.error('Delete blog error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete blog'
    })
  }
}

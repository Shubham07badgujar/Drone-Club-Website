import { Project } from '../models/mongodb/index.js'
import mongoose from 'mongoose'

// Fallback data when MongoDB is not connected
const fallbackProjects = [
  {
    _id: '66c123456789abcdef123456',
    title: 'Autonomous Racing Drone',
    description: 'High-speed autonomous racing drone with advanced computer vision and machine learning capabilities for obstacle detection and path optimization.',
    technologies: ['Python', 'OpenCV', 'TensorFlow', 'ROS', 'ArduPilot'],
    status: 'in-progress',
    github_url: 'https://github.com/droneclub/racing-drone',
    team_members: ['Alex Johnson', 'Sarah Chen', 'Mike Rodriguez'],
    is_featured: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-08-20')
  },
  {
    _id: '66c123456789abcdef123457',
    title: 'Search and Rescue Quadcopter',
    description: 'Emergency response drone equipped with thermal imaging, GPS tracking, and real-time communication systems for search and rescue operations.',
    technologies: ['C++', 'FLIR SDK', 'GPS', 'Radio Communication'],
    status: 'completed',
    demo_url: 'https://demo.droneclub.com/search-rescue',
    team_members: ['Emily Davis', 'John Park'],
    is_featured: true,
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-07-30')
  }
]

// Check if MongoDB is connected
const isMongoConnected = () => {
  return mongoose.connection.readyState === 1
}

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req, res) => {
  try {
    // Use fallback data if MongoDB is not connected
    if (!isMongoConnected()) {
      return res.json({
        success: true,
        projects: fallbackProjects,
        pagination: {
          page: 1,
          limit: 10,
          total: fallbackProjects.length,
          pages: 1
        },
        message: 'Using fallback data - Configure MongoDB Atlas for full functionality'
      })
    }

    const { page = 1, limit = 10, status, search } = req.query
    const skip = (page - 1) * limit

    // Build query object
    const query = {}
    if (status) {
      query.status = status
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ]
    }

    const [projects, total] = await Promise.all([
      Project.find(query)
        .sort({ createdAt: -1 })
        .skip(parseInt(skip))
        .limit(parseInt(limit))
        .lean(),
      Project.countDocuments(query)
    ])

    res.json({
      success: true,
      projects,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Get projects error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects'
    })
  }
}

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
export const getProject = async (req, res) => {
  try {
    // Use fallback data if MongoDB is not connected
    if (!isMongoConnected()) {
      const project = fallbackProjects.find(p => p._id === req.params.id)
      if (!project) {
        return res.status(404).json({
          success: false,
          message: 'Project not found'
        })
      }
      return res.json({
        success: true,
        project,
        message: 'Using fallback data - Configure MongoDB Atlas for full functionality'
      })
    }

    const project = await Project.findById(req.params.id).lean()

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      })
    }

    res.json({
      success: true,
      project,
    })
  } catch (error) {
    console.error('Get project error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch project'
    })
  }
}

// @desc    Create project
// @route   POST /api/projects
// @access  Private (Admin)
export const createProject = async (req, res) => {
  try {
    const project = new Project(req.body)
    await project.save()

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      project,
    })
  } catch (error) {
    console.error('Create project error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create project'
    })
  }
}

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private (Admin)
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      })
    }

    res.json({
      success: true,
      message: 'Project updated successfully',
      project,
    })
  } catch (error) {
    console.error('Update project error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update project'
    })
  }
}

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private (Admin)
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      })
    }

    res.json({
      success: true,
      message: 'Project deleted successfully',
    })
  } catch (error) {
    console.error('Delete project error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete project'
    })
  }
}

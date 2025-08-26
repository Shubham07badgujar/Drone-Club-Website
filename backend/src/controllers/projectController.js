import { Project } from '../models/index.js'
import { Op } from 'sequelize'

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query
    const offset = (page - 1) * limit

    // Build where clause
    const whereClause = {}
    if (status) {
      whereClause.status = status
    }
    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
      ]
    }

    const { count, rows: projects } = await Project.findAndCountAll({
      where: whereClause,
      order: [['created_at', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset),
    })

    res.json({
      success: true,
      projects,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        pages: Math.ceil(count / limit),
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
    const project = await Project.findByPk(req.params.id)

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
    const project = await Project.create({
      ...req.body,
      created_at: new Date(),
      updated_at: new Date(),
    })

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
    const project = await Project.findByPk(req.params.id)

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      })
    }

    await project.update({
      ...req.body,
      updated_at: new Date(),
    })

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
    const project = await Project.findByPk(req.params.id)

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      })
    }

    await project.destroy()

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

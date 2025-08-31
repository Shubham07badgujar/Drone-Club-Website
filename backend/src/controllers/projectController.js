import Project from '../models/mongodb/Project.js'

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getProjects = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      filter = 'all',
      year,
      category,
      status,
      search
    } = req.query

    console.log(`🔍 Fetching projects - Filter: ${filter}, Page: ${page}, Limit: ${limit}`)

    // Build query object
    let query = {}

    // Apply filters
    if (filter === 'featured') {
      query.is_featured = true
    }

    if (year) {
      query.year = parseInt(year)
    }

    if (category && category !== 'all') {
      query.category = category
    }

    if (status && status !== 'all') {
      query.status = status
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { teamContributions: { $regex: search, $options: 'i' } }
      ]
    }

    console.log('📋 Query filters:', JSON.stringify(query, null, 2))

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit)
    const total = await Project.countDocuments(query)

    // Fetch projects with pagination
    const projects = await Project.find(query)
      .sort({ is_featured: -1, display_order: 1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean()

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

    console.log(`✅ Retrieved ${projects.length} projects (${total} total)`)
  } catch (error) {
    console.error('❌ Get projects error:', error)
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
    console.log(`🔍 Fetching project with ID: ${req.params.id}`)
    
    const project = await Project.findById(req.params.id).lean()

    if (!project) {
      console.log(`❌ Project not found: ${req.params.id}`)
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      })
    }

    console.log(`✅ Project fetched: ${project.title}`)
    res.json({
      success: true,
      project,
    })
  } catch (error) {
    console.error('❌ Get project error:', error)
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
    console.log(`👤 Admin ${req.admin.email} creating project`)
    console.log('📥 Request body received:', JSON.stringify(req.body, null, 2))

    // Validate required fields
    const { title, year, description, teamContributions } = req.body
    if (!title || !year || !description || !teamContributions) {
      console.log('❌ Missing required fields:', { 
        title: !!title, 
        year: !!year, 
        description: !!description, 
        teamContributions: !!teamContributions 
      })
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        errors: {
          title: !title ? 'Title is required' : null,
          year: !year ? 'Year is required' : null,
          description: !description ? 'Description is required' : null,
          teamContributions: !teamContributions ? 'Team contributions are required' : null
        }
      })
    }

    // Process and validate data
    const projectData = {
      title: title.trim(),
      year: parseInt(year),
      description: description.trim(),
      teamContributions: teamContributions.trim(),
      imageUrl: req.body.imageUrl?.trim() || '',
      category: req.body.category || 'Competition',
      status: req.body.status || 'Completed',
      technologies: req.body.technologies || [],
      teamMembers: req.body.teamMembers || [],
      githubUrl: req.body.githubUrl?.trim() || '',
      demoUrl: req.body.demoUrl?.trim() || '',
      is_featured: Boolean(req.body.is_featured),
      display_order: req.body.display_order || 0,
      created_by: req.admin.id
    }

    console.log('📝 Processed project data:', JSON.stringify(projectData, null, 2))

    const project = new Project(projectData)
    await project.save()

    console.log(`✅ Project created: ${project.title} (ID: ${project._id})`)

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      project,
    })
  } catch (error) {
    console.error('❌ Create project error:', error)
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message,
        value: err.value
      }))
      console.log('📋 Validation errors:', errors)
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      })
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Project with this title already exists',
        error: 'DUPLICATE_ENTRY'
      })
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create project',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    })
  }
}

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private (Admin)
export const updateProject = async (req, res) => {
  try {
    console.log(`👤 Admin ${req.admin.email} updating project: ${req.params.id}`)
    console.log('📥 Update data:', JSON.stringify(req.body, null, 2))

    const project = await Project.findById(req.params.id)

    if (!project) {
      console.log(`❌ Project not found: ${req.params.id}`)
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      })
    }

    // Process update data
    const updateData = {
      ...req.body,
      updated_by: req.admin.id
    }

    // Remove empty strings and undefined values
    Object.keys(updateData).forEach(key => {
      if (updateData[key] === '' || updateData[key] === undefined) {
        delete updateData[key]
      }
    })

    console.log('📝 Processed update data:', JSON.stringify(updateData, null, 2))

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { 
        new: true, 
        runValidators: true 
      }
    )

    console.log(`✅ Project updated: ${updatedProject.title}`)

    res.json({
      success: true,
      message: 'Project updated successfully',
      project: updatedProject,
    })
  } catch (error) {
    console.error('❌ Update project error:', error)
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message,
        value: err.value
      }))
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      })
    }

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
    console.log(`👤 Admin ${req.admin.email} deleting project: ${req.params.id}`)

    const project = await Project.findById(req.params.id)

    if (!project) {
      console.log(`❌ Project not found: ${req.params.id}`)
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      })
    }

    await Project.findByIdAndDelete(req.params.id)

    console.log(`✅ Project deleted: ${project.title} (ID: ${req.params.id})`)

    res.json({
      success: true,
      message: 'Project deleted successfully'
    })
  } catch (error) {
    console.error('❌ Delete project error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete project'
    })
  }
}

// @desc    Get featured projects
// @route   GET /api/projects/featured
// @access  Public
export const getFeaturedProjects = async (req, res) => {
  try {
    console.log('🔍 Fetching featured projects...')

    const projects = await Project.getFeatured()

    console.log(`✅ Retrieved ${projects.length} featured projects`)

    res.json({
      success: true,
      projects
    })
  } catch (error) {
    console.error('❌ Get featured projects error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured projects'
    })
  }
}

// @desc    Get projects by year
// @route   GET /api/projects/year/:year
// @access  Public
export const getProjectsByYear = async (req, res) => {
  try {
    const year = parseInt(req.params.year)
    console.log(`🔍 Fetching projects for year: ${year}`)

    const projects = await Project.getByYear(year)

    console.log(`✅ Retrieved ${projects.length} projects for year ${year}`)

    res.json({
      success: true,
      projects
    })
  } catch (error) {
    console.error('❌ Get projects by year error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects by year'
    })
  }
}

// @desc    Toggle featured status
// @route   PATCH /api/projects/:id/toggle-featured
// @access  Private (Admin)
export const toggleFeatured = async (req, res) => {
  try {
    console.log(`👤 Admin ${req.admin.email} toggling featured status for project: ${req.params.id}`)

    const project = await Project.findById(req.params.id)

    if (!project) {
      console.log(`❌ Project not found: ${req.params.id}`)
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      })
    }

    project.is_featured = !project.is_featured
    project.updated_by = req.admin.id
    await project.save()

    console.log(`✅ Project featured status toggled: ${project.title} - Featured: ${project.is_featured}`)

    res.json({
      success: true,
      message: `Project ${project.is_featured ? 'featured' : 'unfeatured'} successfully`,
      project
    })
  } catch (error) {
    console.error('❌ Toggle featured error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to toggle featured status'
    })
  }
}

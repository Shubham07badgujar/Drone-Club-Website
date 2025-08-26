import { Department } from '../models/mongodb/index.js'

// @desc    Get all departments
// @route   GET /api/departments
// @access  Public
export const getDepartments = async (req, res) => {
  try {
    const { active } = req.query

    // Build query object
    const query = {}
    if (active !== undefined) query.is_active = active === 'true'

    const departments = await Department.find(query)
      .populate('head', 'name email role')
      .populate('members', 'name email role year')
      .sort({ name: 1 })
      .lean()

    res.json({
      success: true,
      departments,
    })
  } catch (error) {
    console.error('Get departments error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch departments'
    })
  }
}

// @desc    Get single department
// @route   GET /api/departments/:id
// @access  Public
export const getDepartment = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id)
      .populate('head')
      .populate('members')
      .lean()

    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      })
    }

    res.json({
      success: true,
      department,
    })
  } catch (error) {
    console.error('Get department error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch department'
    })
  }
}

// @desc    Create department
// @route   POST /api/departments
// @access  Private (Admin)
export const createDepartment = async (req, res) => {
  try {
    const department = new Department(req.body)
    await department.save()

    res.status(201).json({
      success: true,
      message: 'Department created successfully',
      department,
    })
  } catch (error) {
    console.error('Create department error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create department'
    })
  }
}

// @desc    Update department
// @route   PUT /api/departments/:id
// @access  Private (Admin)
export const updateDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      })
    }

    res.json({
      success: true,
      message: 'Department updated successfully',
      department,
    })
  } catch (error) {
    console.error('Update department error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to update department'
    })
  }
}

// @desc    Delete department
// @route   DELETE /api/departments/:id
// @access  Private (Admin)
export const deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndDelete(req.params.id)

    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found'
      })
    }

    res.json({
      success: true,
      message: 'Department deleted successfully',
    })
  } catch (error) {
    console.error('Delete department error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete department'
    })
  }
}

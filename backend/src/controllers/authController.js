import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Admin } from '../models/mongodb/index.js'

// Generate JWT token
const generateToken = (adminId) => {
  return jwt.sign(
    { id: adminId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  )
}

// @desc    Login admin
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Check if admin exists
    const admin = await Admin.findOne({ where: { email } })
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      })
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, admin.password_hash)
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      })
    }

    // Generate token
    const token = generateToken(admin.id)

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: admin.id,
        email: admin.email,
        role: admin.role,
      },
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error during login'
    })
  }
}

// @desc    Get current admin
// @route   GET /api/auth/me
// @access  Private
export const getCurrentAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.user.id, {
      attributes: { exclude: ['password_hash'] }
    })

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      })
    }

    res.json({
      success: true,
      user: {
        id: admin.id,
        email: admin.email,
        role: admin.role,
        created_at: admin.created_at,
      },
    })
  } catch (error) {
    console.error('Get current admin error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

// @desc    Logout admin
// @route   POST /api/auth/logout
// @access  Private
export const logout = (req, res) => {
  // Since we're using JWT tokens without server-side storage,
  // logout is handled on the client side by removing the token
  res.json({
    success: true,
    message: 'Logout successful'
  })
}

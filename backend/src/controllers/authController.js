import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Admin } from '../models/mongodb/index.js'

// Generate JWT token with enhanced payload
const generateToken = (adminId, adminEmail, role) => {
  const payload = {
    id: adminId,
    email: adminEmail,
    role: role,
    type: 'admin_access',
    iat: Math.floor(Date.now() / 1000)
  }

  const options = {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    issuer: 'team-third-axis-drone-club',
    audience: 'drone-club-admin'
  }

  return jwt.sign(payload, process.env.JWT_SECRET, options)
}

// @desc    Login admin and issue JWT token
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    console.log('🔐 Admin login attempt:', { email, timestamp: new Date().toISOString() })

    // Validation
    if (!email || !password) {
      console.log('❌ Missing email or password')
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password',
        code: 'MISSING_CREDENTIALS'
      })
    }

    // Check if admin exists
    const admin = await Admin.findOne({ email: email.toLowerCase().trim() })
    console.log('👤 Admin lookup result:', admin ? 'Found' : 'Not found')
    
    if (!admin) {
      console.log('❌ Admin not found for email:', email)
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
        code: 'INVALID_CREDENTIALS'
      })
    }

    // Check if account is active
    if (!admin.is_active) {
      console.log('🚫 Admin account inactive:', email)
      return res.status(401).json({
        success: false,
        message: 'Account is inactive. Please contact administrator.',
        code: 'ACCOUNT_INACTIVE'
      })
    }

    console.log('🔍 Admin details:', {
      id: admin._id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
      isActive: admin.is_active
    })

    // Check if account is locked
    if (admin.locked_until && admin.locked_until > Date.now()) {
      console.log('🔒 Account is locked until:', admin.locked_until)
      return res.status(423).json({
        success: false,
        message: 'Account is temporarily locked due to too many failed login attempts. Please try again later.',
        code: 'ACCOUNT_LOCKED',
        lockedUntil: admin.locked_until
      })
    }

    // Verify password
    console.log('🔑 Verifying password...')
    const isPasswordValid = await bcrypt.compare(password, admin.password)
    console.log('🔑 Password verification result:', isPasswordValid)
    
    if (!isPasswordValid) {
      console.log('❌ Invalid password for:', email)
      
      // Increment failed login attempts
      admin.failed_login_attempts = (admin.failed_login_attempts || 0) + 1
      
      // Lock account if too many failures (5 attempts)
      if (admin.failed_login_attempts >= 5) {
        admin.locked_until = new Date(Date.now() + 2 * 60 * 60 * 1000) // 2 hours
        console.log('🔒 Account locked due to failed attempts:', email)
      }
      
      await admin.save()
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
        code: 'INVALID_CREDENTIALS',
        attemptsRemaining: Math.max(0, 5 - admin.failed_login_attempts)
      })
    }

    console.log('✅ Login successful for admin:', email)

    // Reset failed login attempts and update last login
    admin.failed_login_attempts = 0
    admin.locked_until = undefined
    admin.last_login = new Date()
    await admin.save()

    // Generate JWT token
    const token = generateToken(admin._id, admin.email, admin.role)
    console.log('🎫 JWT token generated for admin:', admin.email)

    // Prepare admin data for response (exclude sensitive info)
    const adminData = {
      id: admin._id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
      permissions: admin.permissions || [],
      last_login: admin.last_login,
      created_at: admin.createdAt
    }

    // Send successful response with token
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      admin: adminData,
      tokenExpiry: process.env.JWT_EXPIRES_IN || '7d'
    })

    console.log('✅ Login response sent for:', email)

  } catch (error) {
    console.error('❌ Login error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error during login',
      code: 'SERVER_ERROR'
    })
  }
}

// @desc    Verify JWT token
// @route   GET /api/auth/verify
// @access  Private
export const verifyToken = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password')
    
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Admin not found'
      })
    }

    res.json({
      success: true,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
        permissions: admin.permissions,
        created_at: admin.createdAt,
        last_login: admin.last_login
      }
    })
  } catch (error) {
    console.error('Token verification error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

// @desc    Get current admin profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password')
    
    res.json({
      success: true,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
        permissions: admin.permissions,
        created_at: admin.createdAt,
        last_login: admin.last_login
      }
    })
  } catch (error) {
    console.error('Get profile error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

// @desc    Logout admin (client-side only)
// @route   POST /api/auth/logout
// @access  Private
export const logout = async (req, res) => {
  try {
    // In JWT implementation, logout is mainly client-side
    // Server can optionally blacklist the token
    res.json({
      success: true,
      message: 'Logout successful'
    })
  } catch (error) {
    console.error('Logout error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

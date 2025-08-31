import jwt from 'jsonwebtoken'
import { Admin } from '../models/mongodb/index.js'

export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1] // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access token required'
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const admin = await Admin.findById(decoded.id)

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      })
    }

    req.admin = {
      id: admin._id,
      email: admin.email,
      role: admin.role,
    }

    // Debug log for role (can be disabled later)
    if (process.env.NODE_ENV !== 'production') {
      console.log('🔐 Authenticated admin:', { id: String(admin._id), role: admin.role })
    }

    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired'
      })
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      })
    }

    console.error('Authentication error:', error)
    res.status(500).json({
      success: false,
      message: 'Authentication failed'
    })
  }
}

// NOTE: Historical mismatch existed between 'super-admin' (Mongo schema & seed) and 'super_admin' (middleware checks)
// To maintain backward compatibility we accept both. Prefer using 'super-admin' going forward.
const isSuperAdmin = (role) => role === 'super-admin' || role === 'super_admin'

export const requireAdmin = (req, res, next) => {
  const role = req.admin?.role
  if (process.env.NODE_ENV !== 'production') {
    console.log('🔎 requireAdmin check role:', role)
  }
  if (!role || (role !== 'admin' && !isSuperAdmin(role))) {
    return res.status(403).json({
      success: false,
      message: 'Admin access required'
    })
  }
  next()
}

export const requireSuperAdmin = (req, res, next) => {
  const role = req.admin?.role
  if (process.env.NODE_ENV !== 'production') {
    console.log('🔎 requireSuperAdmin check role:', role)
  }
  if (!role || !isSuperAdmin(role)) {
    return res.status(403).json({
      success: false,
      message: 'Super admin access required'
    })
  }
  next()
}

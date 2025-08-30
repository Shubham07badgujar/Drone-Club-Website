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

export const requireAdmin = (req, res, next) => {
  if (!req.admin || (req.admin.role !== 'admin' && req.admin.role !== 'super_admin')) {
    return res.status(403).json({
      success: false,
      message: 'Admin access required'
    })
  }
  next()
}

export const requireSuperAdmin = (req, res, next) => {
  if (!req.admin || req.admin.role !== 'super_admin') {
    return res.status(403).json({
      success: false,
      message: 'Super admin access required'
    })
  }
  next()
}

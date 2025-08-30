import jwt from 'jsonwebtoken'
import { Admin } from '../models/mongodb/index.js'

/**
 * Authentication middleware to protect admin routes
 * Validates JWT token from Authorization header
 * Attaches admin user to req.admin for downstream use
 */
export const authenticateAdmin = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('🚫 No valid Authorization header found')
      return res.status(401).json({
        success: false,
        message: 'Access denied. No valid authorization header provided.',
        code: 'NO_TOKEN'
      })
    }

    // Extract token (remove 'Bearer ' prefix)
    const token = authHeader.substring(7)
    
    if (!token) {
      console.log('🚫 No token provided')
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.',
        code: 'NO_TOKEN'
      })
    }

    // Verify JWT token
    let decoded
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET)
      console.log('✅ Token verified for admin ID:', decoded.id)
    } catch (jwtError) {
      console.log('🚫 JWT verification failed:', jwtError.message)
      
      if (jwtError.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: 'Access denied. Token has expired.',
          code: 'TOKEN_EXPIRED'
        })
      } else if (jwtError.name === 'JsonWebTokenError') {
        return res.status(401).json({
          success: false,
          message: 'Access denied. Invalid token.',
          code: 'INVALID_TOKEN'
        })
      } else {
        return res.status(401).json({
          success: false,
          message: 'Access denied. Token verification failed.',
          code: 'TOKEN_VERIFICATION_FAILED'
        })
      }
    }

    // Get admin from database
    const admin = await Admin.findById(decoded.id).select('-password')
    
    if (!admin) {
      console.log('🚫 Admin not found for ID:', decoded.id)
      return res.status(401).json({
        success: false,
        message: 'Access denied. Admin account not found.',
        code: 'ADMIN_NOT_FOUND'
      })
    }

    if (!admin.is_active) {
      console.log('🚫 Admin account is inactive:', admin.email)
      return res.status(401).json({
        success: false,
        message: 'Access denied. Admin account is inactive.',
        code: 'ACCOUNT_INACTIVE'
      })
    }

    // Check if account is locked
    if (admin.locked_until && admin.locked_until > Date.now()) {
      console.log('🔒 Admin account is locked:', admin.email)
      return res.status(423).json({
        success: false,
        message: 'Account is temporarily locked. Please try again later.',
        code: 'ACCOUNT_LOCKED'
      })
    }

    // Attach admin to request object for downstream use
    req.admin = {
      id: admin._id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
      permissions: admin.permissions
    }

    console.log('✅ Admin authenticated:', admin.email)
    next()

  } catch (error) {
    console.error('❌ Authentication middleware error:', error)
    return res.status(500).json({
      success: false,
      message: 'Internal server error during authentication.',
      code: 'AUTH_ERROR'
    })
  }
}

/**
 * Role-based authorization middleware
 * Checks if authenticated admin has required role
 */
export const requireRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.admin) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.',
        code: 'NOT_AUTHENTICATED'
      })
    }

    if (!allowedRoles.includes(req.admin.role)) {
      console.log(`🚫 Access denied. Required: ${allowedRoles.join(', ')}, Found: ${req.admin.role}`)
      return res.status(403).json({
        success: false,
        message: `Access denied. Required role: ${allowedRoles.join(' or ')}`,
        code: 'INSUFFICIENT_PERMISSIONS'
      })
    }

    console.log('✅ Role authorization passed:', req.admin.role)
    next()
  }
}

/**
 * Permission-based authorization middleware
 * Checks if authenticated admin has required permissions
 */
export const requirePermission = (requiredPermissions) => {
  return (req, res, next) => {
    if (!req.admin) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.',
        code: 'NOT_AUTHENTICATED'
      })
    }

    const adminPermissions = req.admin.permissions || []
    const hasPermission = requiredPermissions.some(permission => 
      adminPermissions.includes(permission)
    )

    if (!hasPermission) {
      console.log(`🚫 Permission denied. Required: ${requiredPermissions.join(' or ')}, Found: ${adminPermissions.join(', ')}`)
      return res.status(403).json({
        success: false,
        message: `Access denied. Required permission: ${requiredPermissions.join(' or ')}`,
        code: 'INSUFFICIENT_PERMISSIONS'
      })
    }

    console.log('✅ Permission authorization passed')
    next()
  }
}

/**
 * Optional authentication middleware
 * Attaches admin if token is valid, but doesn't block request if not
 */
export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7)
      
      if (token) {
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET)
          const admin = await Admin.findById(decoded.id).select('-password')
          
          if (admin && admin.is_active) {
            req.admin = {
              id: admin._id,
              email: admin.email,
              name: admin.name,
              role: admin.role,
              permissions: admin.permissions
            }
          }
        } catch (error) {
          // Silently fail for optional auth
          console.log('Optional auth failed:', error.message)
        }
      }
    }

    next()
  } catch (error) {
    console.error('Optional auth error:', error)
    next() // Continue even if error
  }
}

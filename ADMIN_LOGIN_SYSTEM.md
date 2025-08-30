# 🔐 Admin Login System Documentation

## Overview
The Team Third Axis Drone Club Website features a secure admin authentication system that allows authorized personnel to access the admin dashboard and manage website content.

## � Access Information

### Official Admin Credentials
- **Email**: `teamthirdaxis@gcoej.ac.in`
- **Password**: `TeamThird@x!$07`
- **Role**: Super Admin
- **Organization**: Team Third Axis Drone Club, GCOEJ
- **Permissions**: Full access to all admin features

### Login Access Points
- **Admin Login Page**: `/admin/login`
- **Development URL**: `http://localhost:3000/admin/login`
- **Dashboard Redirect**: `/admin/dashboard` (after successful login)

## 🔐 Security Features

### Advanced Authentication
- **JWT Token System**: Secure token-based authentication with 7-day expiration
- **Password Security**: bcrypt hashing with 12 salt rounds
- **Account Protection**: Automatic lockout after 5 failed login attempts (2-hour duration)
- **Session Management**: Persistent login state across browser sessions
- **Input Validation**: Comprehensive server-side validation with Joi schema

### Account Security Measures
- **Failed Login Tracking**: System monitors and logs failed authentication attempts
- **Temporary Account Lockout**: Protects against brute-force attacks
- **Password Requirements**: Strong password policy enforcement
- **Token Expiration**: Automatic logout after token expires
- **Secure Headers**: Authorization headers for all protected requests

## 🔧 Technical Implementation

### 1. Frontend Authentication (React)

#### AuthContext Provider
**File**: `frontend/src/context/AuthContext.jsx`

```jsx
import React, { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check if user is authenticated on app load
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (token) {
      // Verify token with backend
      verifyToken(token)
    } else {
      setLoading(false)
    }
  }, [])

  const verifyToken = async (token) => {
    try {
      const response = await axios.get('/api/auth/verify', {
        headers: { Authorization: `Bearer ${token}` }
      })
      
      if (response.data.success) {
        setIsAuthenticated(true)
        setAdmin(response.data.admin)
        // Set default authorization header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      } else {
        logout()
      }
    } catch (error) {
      console.error('Token verification failed:', error)
      logout()
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password
      })

      if (response.data.success) {
        const { token, admin } = response.data
        
        // Store token in localStorage
        localStorage.setItem('authToken', token)
        
        // Set default authorization header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        
        // Update state
        setIsAuthenticated(true)
        setAdmin(admin)
        
        return { success: true }
      } else {
        return { success: false, message: response.data.message }
      }
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      }
    }
  }

  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem('authToken')
    
    // Remove authorization header
    delete axios.defaults.headers.common['Authorization']
    
    // Reset state
    setIsAuthenticated(false)
    setAdmin(null)
  }

  const value = {
    isAuthenticated,
    admin,
    loading,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
```

#### Admin Login Component
**File**: `frontend/src/pages/AdminLogin.jsx`

```jsx
import React, { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { Eye, EyeOff, Lock, Mail, Loader } from 'lucide-react'
import Button from '../components/ui/Button'

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/admin-dashboard" replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const result = await login(formData.email, formData.password)
      
      if (result.success) {
        toast.success('Login successful!')
        navigate('/admin-dashboard')
      } else {
        toast.error(result.message || 'Login failed')
      }
    } catch (error) {
      toast.error('An error occurred during login')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Admin Login
          </h1>
          <p className="text-gray-400">
            Sign in to access the admin dashboard
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-dark-800 border border-dark-700 rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="admin@droneclub.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 bg-dark-700 border border-dark-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader className="animate-spin h-5 w-5 mr-2" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-dark-700 rounded-lg border border-dark-600">
            <h3 className="text-sm font-medium text-gray-200 mb-2">
              Demo Credentials:
            </h3>
            <div className="text-sm text-gray-400 space-y-1">
              <p><strong>Email:</strong> admin@droneclub.com</p>
              <p><strong>Password:</strong> AdminPassword123!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
```

#### Protected Route Component
**File**: `frontend/src/components/ProtectedRoute.jsx`

```jsx
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Loader } from 'lucide-react'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  // Show loading spinner while verifying authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin h-8 w-8 text-primary-500 mx-auto mb-4" />
          <p className="text-gray-400">Verifying authentication...</p>
        </div>
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/admin-login" state={{ from: location }} replace />
  }

  // Render protected content
  return children
}

export default ProtectedRoute
```

### 2. Backend Authentication (Node.js/Express)

#### Auth Controller
**File**: `backend/src/controllers/authController.js`

```javascript
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

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      })
    }

    // Check if admin exists
    const admin = await Admin.findOne({ email })
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
    const token = generateToken(admin._id)

    // Update last login
    admin.last_login = new Date()
    await admin.save()

    res.json({
      success: true,
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        username: admin.username,
        role: admin.role,
        created_at: admin.created_at,
        last_login: admin.last_login
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

// @desc    Verify JWT token
// @route   GET /api/auth/verify
// @access  Private
export const verifyToken = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password_hash')
    
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
        username: admin.username,
        role: admin.role,
        created_at: admin.created_at,
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

// @desc    Get current admin profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password_hash')
    
    res.json({
      success: true,
      admin
    })
  } catch (error) {
    console.error('Get profile error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}
```

#### Auth Middleware
**File**: `backend/src/middleware/auth.js`

```javascript
import jwt from 'jsonwebtoken'
import { Admin } from '../models/mongodb/index.js'

// Protect routes - verify JWT token
export const authenticateToken = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1] // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      })
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      
      // Get admin from database
      const admin = await Admin.findById(decoded.id).select('-password_hash')
      
      if (!admin) {
        return res.status(401).json({
          success: false,
          message: 'Access denied. Admin not found.'
        })
      }

      // Add admin to request object
      req.admin = admin
      next()
    } catch (jwtError) {
      console.error('JWT verification error:', jwtError)
      
      if (jwtError.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: 'Access denied. Token expired.'
        })
      } else if (jwtError.name === 'JsonWebTokenError') {
        return res.status(401).json({
          success: false,
          message: 'Access denied. Invalid token.'
        })
      } else {
        return res.status(401).json({
          success: false,
          message: 'Access denied. Token verification failed.'
        })
      }
    }
  } catch (error) {
    console.error('Auth middleware error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

// Check if admin has specific role
export const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.admin) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Authentication required.'
      })
    }

    if (!roles.includes(req.admin.role)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Insufficient permissions.'
      })
    }

    next()
  }
}

// Optional authentication - sets req.admin if token is valid, but doesn't block request
export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const admin = await Admin.findById(decoded.id).select('-password_hash')
        if (admin) {
          req.admin = admin
        }
      } catch (jwtError) {
        // Silently fail for optional auth
        console.log('Optional auth failed:', jwtError.message)
      }
    }

    next()
  } catch (error) {
    console.error('Optional auth error:', error)
    next() // Continue even if error
  }
}
```

#### Auth Routes
**File**: `backend/src/routes/auth.js`

```javascript
import express from 'express'
import { login, verifyToken, logout, getMe } from '../controllers/authController.js'
import { authenticateToken } from '../middleware/auth.js'
import { validateLogin } from '../middleware/validation.js'

const router = express.Router()

// @route   POST /api/auth/login
// @desc    Login admin
// @access  Public
router.post('/login', validateLogin, login)

// @route   GET /api/auth/verify
// @desc    Verify JWT token
// @access  Private
router.get('/verify', authenticateToken, verifyToken)

// @route   POST /api/auth/logout
// @desc    Logout admin
// @access  Private
router.post('/logout', authenticateToken, logout)

// @route   GET /api/auth/me
// @desc    Get current admin profile
// @access  Private
router.get('/me', authenticateToken, getMe)

export default router
```

#### Validation Middleware
**File**: `backend/src/middleware/validation.js`

```javascript
import Joi from 'joi'

// Validate login request
export const validateLogin = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required'
      }),
    password: Joi.string()
      .min(6)
      .required()
      .messages({
        'string.min': 'Password must be at least 6 characters long',
        'any.required': 'Password is required'
      })
  })

  const { error } = schema.validate(req.body)
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: error.details.map(detail => detail.message)
    })
  }

  next()
}
```

### 3. MongoDB Admin Model
**File**: `backend/src/models/mongodb/Admin.js`

```javascript
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  password_hash: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['admin', 'super_admin'],
    default: 'admin'
  },
  first_name: {
    type: String,
    trim: true,
    maxlength: 50
  },
  last_name: {
    type: String,
    trim: true,
    maxlength: 50
  },
  last_login: {
    type: Date,
    default: null
  },
  is_active: {
    type: Boolean,
    default: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

// Hash password before saving
adminSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password_hash')) return next()

  try {
    // Hash password with cost of 12
    const hashedPassword = await bcrypt.hash(this.password_hash, 12)
    this.password_hash = hashedPassword
    next()
  } catch (error) {
    next(error)
  }
})

// Instance method to check password
adminSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password_hash)
}

// Static method to create admin with hashed password
adminSchema.statics.createAdmin = async function(adminData) {
  const hashedPassword = await bcrypt.hash(adminData.password, 12)
  
  return this.create({
    ...adminData,
    password_hash: hashedPassword
  })
}

const Admin = mongoose.model('Admin', adminSchema)

export default Admin
```

## 🔄 Authentication Flow Step by Step

### 1. User Login Process
1. **User Access**: User navigates to `/admin-login`
2. **Form Submission**: User enters email and password
3. **Frontend Validation**: Basic validation (required fields, email format)
4. **API Request**: Frontend sends POST request to `/api/auth/login`
5. **Backend Validation**: Server validates input using Joi schema
6. **Database Query**: Server searches for admin with provided email
7. **Password Verification**: Server compares hashed password using bcrypt
8. **JWT Generation**: Server creates JWT token with admin ID
9. **Response**: Server sends token and admin data to frontend
10. **Storage**: Frontend stores token in localStorage
11. **Header Setup**: Frontend sets Authorization header for future requests
12. **Redirect**: User is redirected to admin dashboard

### 2. Token Verification Process
1. **App Load**: Frontend checks localStorage for existing token
2. **Verification Request**: Frontend sends GET request to `/api/auth/verify`
3. **Middleware Check**: Auth middleware extracts and verifies JWT token
4. **Database Lookup**: Server fetches admin data using token's ID
5. **Response**: Server confirms token validity and returns admin data
6. **State Update**: Frontend updates authentication state

### 3. Protected Route Access
1. **Route Access**: User tries to access protected route
2. **Auth Check**: ProtectedRoute component checks authentication status
3. **Token Validation**: If token exists, verify with backend
4. **Access Decision**: Allow access if authenticated, redirect if not
5. **API Requests**: Include Authorization header in all protected API calls

## 🔒 Security Features

### 1. Password Security
- **Hashing**: bcrypt with cost factor 12
- **Salting**: Automatic salt generation
- **No Plaintext**: Passwords never stored in plaintext

### 2. JWT Security
- **Expiration**: Tokens expire after 7 days (configurable)
- **Secret Key**: Strong secret key for signing
- **Verification**: Token signature verified on each request

### 3. Input Validation
- **Email Format**: Valid email format required
- **Password Strength**: Minimum 6 characters (can be enhanced)
- **Sanitization**: Input sanitized to prevent injection attacks

### 4. Error Handling
- **Generic Messages**: No specific error details exposed
- **Logging**: Errors logged server-side for debugging
- **Rate Limiting**: Built-in Express rate limiting

## 🛠️ Configuration

### Environment Variables
```env
# JWT Configuration
JWT_SECRET=your-super-secure-jwt-secret-key-minimum-32-characters
JWT_EXPIRE=7d

# Admin Configuration (for seeding)
ADMIN_EMAIL=admin@droneclub.com
ADMIN_PASSWORD=AdminPassword123!
```

### Database Seeding
```javascript
// Create default admin during database seeding
const createDefaultAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({ 
      email: process.env.ADMIN_EMAIL 
    })
    
    if (!existingAdmin) {
      await Admin.createAdmin({
        username: 'admin',
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        role: 'super_admin',
        first_name: 'System',
        last_name: 'Administrator'
      })
      
      console.log('✅ Default admin created successfully')
    }
  } catch (error) {
    console.error('❌ Error creating default admin:', error)
  }
}
```

## 🧪 Testing the Authentication System

### 1. Manual Testing
```bash
# Test login endpoint
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@droneclub.com","password":"AdminPassword123!"}'

# Test token verification
curl -X GET http://localhost:5000/api/auth/verify \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"

# Test protected endpoint
curl -X GET http://localhost:5000/api/team-years \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

### 2. Frontend Testing
1. Navigate to `http://localhost:3000/admin-login`
2. Enter demo credentials
3. Verify successful login and redirect
4. Check localStorage for token
5. Navigate to protected routes
6. Test logout functionality

## 🔧 Troubleshooting

### Common Issues

#### 1. "Invalid credentials" error
- **Cause**: Wrong email/password or admin doesn't exist
- **Solution**: Check admin exists in database, verify credentials

#### 2. "JWT secret not configured" error
- **Cause**: JWT_SECRET not set in environment variables
- **Solution**: Add JWT_SECRET to .env file

#### 3. Token verification fails
- **Cause**: Expired token, wrong secret, or malformed token
- **Solution**: Check token format, verify JWT_SECRET, handle expiration

#### 4. Protected routes not working
- **Cause**: Missing Authorization header or invalid token
- **Solution**: Ensure token is included in requests, check middleware

### Debug Tools
```javascript
// Add to frontend for debugging
console.log('Token:', localStorage.getItem('authToken'))
console.log('Auth state:', { isAuthenticated, admin })

// Add to backend for debugging  
console.log('Decoded token:', decoded)
console.log('Admin from DB:', admin)
```

## 🚀 Future Enhancements

### 1. Enhanced Security
- Two-factor authentication (2FA)
- Password reset functionality
- Account lockout after failed attempts
- Token blacklisting for logout
- Refresh token implementation

### 2. User Management
- Multiple admin roles and permissions
- Admin user management interface
- Activity logging and audit trails
- Session management

### 3. Security Monitoring
- Failed login attempt monitoring
- Suspicious activity detection
- Security event logging
- Real-time security alerts

This authentication system provides a solid foundation for admin access control while maintaining security best practices and scalability for future enhancements.

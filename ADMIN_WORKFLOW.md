# Admin Authentication & Team Management Workflow

## Overview
This document provides comprehensive documentation for the Admin Login + Team Management system for the Team Third Axis Drone Club Website.

## 🔐 Authentication System

### Admin Credentials
- **Email**: `teamthirdaxis@gcoej.ac.in`
- **Password**: `TeamThird@x!$07`
- **Role**: `super-admin`
- **Permissions**: `['read', 'write', 'delete', 'manage-content']`

### JWT Token Authentication
The system uses JWT (JSON Web Tokens) for secure authentication:

- **Token Storage**: LocalStorage (`adminToken` key)
- **Token Expiration**: 7 days (configurable via `JWT_EXPIRES_IN`)
- **Automatic Headers**: Axios interceptors automatically add `Authorization: Bearer <token>` to all API requests
- **Token Refresh**: Automatic logout and redirect to login on 401 errors

### Token Structure
```json
{
  "id": "admin_id",
  "email": "teamthirdaxis@gcoej.ac.in",
  "role": "super-admin",
  "iss": "team-third-axis-api",
  "aud": "team-third-axis-web",
  "iat": 1234567890,
  "exp": 1234567890
}
```

## 🚀 Quick Start Guide

### 1. Login Process
1. Navigate to `/admin/login`
2. Enter credentials:
   - Email: `teamthirdaxis@gcoej.ac.in`
   - Password: `TeamThird@x!$07`
3. System will store JWT token and redirect to Admin Dashboard
4. Token is automatically included in all subsequent API requests

### 2. Team Year Management
1. **View Team Years**: Access via `/admin/team` or Admin Dashboard
2. **Create New Year**: 
   - Click "Add New Year"
   - Enter year (2020-2030) and optional description
   - System creates empty team year structure
3. **Add Team Members**:
   - Select team year
   - Click "Add Member"
   - Fill member details (name, role, bio, photo, social links)
   - System validates and adds member to team year

### 3. Team Member Operations
- **View Members**: All members displayed by team year
- **Edit Member**: Click edit icon, modify details, save changes
- **Delete Member**: Click delete icon, confirm removal
- **Bulk Operations**: Available for multiple member management

## 🛠️ Technical Implementation

### Backend Architecture

#### Authentication Middleware (`/backend/src/middleware/authMiddleware.js`)
```javascript
// Main authentication function
authenticateAdmin(req, res, next)

// Role-based authorization
requireRole(['admin', 'super-admin'])(req, res, next)

// Permission-based authorization
requirePermission(['manage-content', 'write'])(req, res, next)
```

#### Team Year Routes (`/backend/src/routes/teamYears.js`)
- `GET /api/team-years` - Public: Get all team years
- `GET /api/team-years/:year` - Public: Get specific team year
- `POST /api/team-years` - Admin: Create new team year
- `PUT /api/team-years/:year` - Admin: Update team year
- `DELETE /api/team-years/:year` - Super Admin: Delete team year
- `POST /api/team-years/:year/members` - Admin: Add team member
- `PUT /api/team-years/:year/members/:memberId` - Admin: Update member
- `DELETE /api/team-years/:year/members/:memberId` - Admin: Delete member

#### Authentication Controller (`/backend/src/controllers/authController.js`)
- Enhanced JWT generation with comprehensive payload
- Account lockout after failed attempts
- Detailed logging for security monitoring
- Password validation with bcryptjs

### Frontend Architecture

#### Authentication Context (`/frontend/src/context/AuthContext.jsx`)
- JWT token management in localStorage
- Automatic token attachment to requests
- User state management
- Login/logout functionality

#### Team Years Hook (`/frontend/src/hooks/useTeamYears.js`)
- Axios instance with automatic token handling
- CRUD operations for team years and members
- Error handling with toast notifications
- Automatic token expiration handling

#### API Integration
```javascript
// Automatic token attachment
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Automatic logout on 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken')
      window.location.href = '/admin/login'
    }
    return Promise.reject(error)
  }
)
```

## 🔧 Environment Configuration

### Required Environment Variables

#### Backend (`.env`)
```bash
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://teamthirdaxis:TeamThird%40x%21%2407@cluster0.mongodb.net/drone-club?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

#### Frontend (`.env`)
```bash
# API Configuration
VITE_API_URL=http://localhost:5000
```

### Security Considerations
- JWT_SECRET should be a strong, random string in production
- Use HTTPS in production for secure token transmission
- Consider implementing refresh tokens for enhanced security
- Monitor failed login attempts for security threats

## 📊 Database Schema

### Team Year Model (MongoDB)
```javascript
{
  year: Number, // 2020-2030
  theme: String, // Optional theme for the year
  description: String, // Year description
  members: [{
    name: String, // Required
    role: String, // Required (President, Vice President, etc.)
    bio: String, // Optional
    photo: String, // Optional image URL
    email: String, // Optional
    social_links: {
      linkedin: String,
      github: String,
      instagram: String
    },
    added_by: ObjectId, // Admin who added the member
    added_at: Date,
    updated_by: ObjectId, // Admin who last updated
    updated_at: Date
  }],
  isActive: Boolean, // Whether year is currently active
  created_by: ObjectId, // Admin who created the year
  created_at: Date,
  updated_at: Date
}
```

### Admin Model (MongoDB)
```javascript
{
  email: String, // Unique admin email
  password: String, // Hashed password
  name: String, // Admin name
  role: String, // 'admin' or 'super-admin'
  permissions: [String], // Array of permissions
  is_active: Boolean, // Account status
  failed_login_attempts: Number, // Security tracking
  account_locked_until: Date, // Account lockout
  last_login: Date, // Last successful login
  created_at: Date,
  updated_at: Date
}
```

## 🐛 Debugging Guide

### Common Issues and Solutions

#### 1. 401 Unauthorized Errors
**Symptoms**: API requests fail with 401 status
**Causes**:
- Token expired or invalid
- Token not properly stored in localStorage
- Backend JWT_SECRET mismatch

**Debug Steps**:
```javascript
// Check token in browser console
console.log('Admin Token:', localStorage.getItem('adminToken'))

// Verify token structure (paste token in jwt.io)
// Check server logs for authentication failures
```

**Solutions**:
- Clear localStorage and re-login
- Verify JWT_SECRET in backend .env
- Check token expiration time

#### 2. Team Member Addition Fails
**Symptoms**: Adding team members returns error
**Causes**:
- Missing required fields (name, role)
- Invalid team year
- Authentication issues

**Debug Steps**:
```javascript
// Backend logs will show validation errors
console.log('Member Data:', memberData)
console.log('Team Year:', year)
```

**Solutions**:
- Ensure name and role are provided
- Verify team year exists
- Check authentication token

#### 3. Token Not Persisting
**Symptoms**: User logged out after page refresh
**Causes**:
- localStorage not properly set
- Token key mismatch

**Debug Steps**:
```javascript
// Check localStorage keys
console.log('All localStorage keys:', Object.keys(localStorage))
console.log('Admin token:', localStorage.getItem('adminToken'))
```

**Solutions**:
- Ensure consistent token key usage (`adminToken`)
- Verify AuthContext implementation

### Backend Debug Logging
The system includes comprehensive logging:
```javascript
// Authentication flow
console.log('🔑 Adding auth token to request:', config.url)
console.log('👤 Admin user authenticated:', req.admin.email)
console.log('✅ Login successful, storing token')

// Error handling
console.error('❌ 401 Unauthorized - Token expired or invalid')
console.error('❌ Error adding member to team year:', err)
```

### Network Debug Tools
- **Browser DevTools**: Network tab to inspect API requests/responses
- **JWT Debugger**: Use jwt.io to decode and verify tokens
- **MongoDB Compass**: Direct database inspection
- **Postman/Insomnia**: API endpoint testing

## 🔒 Security Best Practices

### Token Security
1. **Secure Storage**: Consider httpOnly cookies for production
2. **Token Rotation**: Implement refresh token mechanism
3. **Expiration**: Use reasonable token expiration times
4. **Validation**: Always validate tokens server-side

### Password Security
1. **Strong Passwords**: Enforce complex password requirements
2. **Hashing**: Use bcryptjs with appropriate salt rounds
3. **Account Lockout**: Implement failed attempt protection
4. **Audit Logging**: Track all authentication events

### API Security
1. **Rate Limiting**: Implement request rate limiting
2. **CORS**: Configure proper CORS policies
3. **HTTPS**: Use SSL/TLS in production
4. **Input Validation**: Validate all incoming data

## 📈 Monitoring & Maintenance

### Health Checks
- Backend: `GET /api/health` - Server status and uptime
- Database: MongoDB connection monitoring
- Authentication: Failed login attempt tracking

### Performance Monitoring
- API response times
- Database query performance
- Memory usage and server resources
- Error rates and patterns

### Regular Maintenance
1. **Token Cleanup**: Remove expired tokens
2. **Log Rotation**: Archive old log files
3. **Database Optimization**: Index optimization
4. **Security Updates**: Regular dependency updates

## 🤝 Support & Troubleshooting

### For Developers
1. Check console logs for detailed error messages
2. Verify environment variables are properly set
3. Test API endpoints with proper authentication headers
4. Use MongoDB Compass to inspect database state

### For Administrators
1. Use provided admin credentials for login
2. Contact developers for password reset if needed
3. Report any UI issues or unexpected behavior
4. Follow standard team member addition workflow

### Error Codes Reference
- `401`: Unauthorized - Invalid or expired token
- `403`: Forbidden - Insufficient permissions
- `404`: Not Found - Resource doesn't exist
- `409`: Conflict - Resource already exists
- `422`: Validation Error - Invalid input data
- `500`: Server Error - Internal server issue

## 📚 Additional Resources

### API Documentation
- All endpoints documented with examples
- Authentication requirements clearly specified
- Request/response formats provided

### Code Examples
- Complete CRUD operations for team management
- Authentication flow implementation
- Error handling patterns

### Development Setup
- Step-by-step environment setup
- Database initialization scripts
- Testing procedures and best practices

---

**Team Third Axis Drone Club - GCOEJ**  
*Admin System Documentation v1.0*  
*Last Updated: $(date)*

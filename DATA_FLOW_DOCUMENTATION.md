# 🔄 Data Flow & Workflow Documentation

This document explains how data flows through the Drone Club Website application, from user interactions to database operations and back to the UI.

## 🏗️ System Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (React)       │◄──►│   (Express)     │◄──►│   (MongoDB)     │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ • Components    │    │ • Routes        │    │ • Collections   │
│ • Custom Hooks  │    │ • Controllers   │    │ • Documents     │
│ • Context       │    │ • Middleware    │    │ • Indexes       │
│ • State Mgmt    │    │ • Models        │    │ • Validation    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🔄 Complete Request-Response Flow

### 1. Standard Data Flow Pattern

```
User Action → Component → Hook → API Call → Route → Middleware → Controller → Model → Database
     ↓                                                                                    ↑
UI Update ← Component ← Hook ← Response ← Route ← Controller ← Model ← Query Result ←────┘
```

### 2. Detailed Flow Breakdown

#### Step 1: User Interaction
```jsx
// User clicks "Add Team Member" button
<Button onClick={() => setShowAddModal(true)}>
  Add Team Member
</Button>
```

#### Step 2: Component State Update
```jsx
// TeamMemberModal opens with form
const [showAddModal, setShowAddModal] = useState(false)
const [formData, setFormData] = useState({
  name: '',
  role: '',
  bio: '',
  photo: ''
})
```

#### Step 3: Form Submission
```jsx
// User fills form and submits
const handleSubmit = async (e) => {
  e.preventDefault()
  const result = await addTeamMember(yearId, formData)
  
  if (result.success) {
    toast.success('Member added successfully!')
    setShowAddModal(false)
    refreshTeamData()
  } else {
    toast.error(result.message)
  }
}
```

#### Step 4: Custom Hook API Call
```javascript
// useTeamYears.js
const addTeamMember = async (yearId, memberData) => {
  try {
    const response = await axios.post(
      `/api/team-years/${yearId}/members`,
      memberData,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      }
    )
    
    // Update local state
    setTeamYears(prevYears => 
      prevYears.map(year => 
        year._id === yearId 
          ? { ...year, members: [...year.members, response.data.member] }
          : year
      )
    )
    
    return { success: true, member: response.data.member }
  } catch (error) {
    return { success: false, message: error.response?.data?.message }
  }
}
```

#### Step 5: Backend Route Handling
```javascript
// routes/teamYears.js
router.post('/:id/members', authenticateToken, addMember)
```

#### Step 6: Authentication Middleware
```javascript
// middleware/auth.js
export const authenticateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      })
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const admin = await Admin.findById(decoded.id)
    
    req.admin = admin
    next() // Continue to controller
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    })
  }
}
```

#### Step 7: Controller Business Logic
```javascript
// controllers/teamYearController.js
export const addMember = async (req, res) => {
  try {
    const { id: yearId } = req.params
    const memberData = req.body
    
    // Validate input
    const { error } = validateMember(memberData)
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      })
    }
    
    // Find team year
    const teamYear = await TeamYear.findById(yearId)
    if (!teamYear) {
      return res.status(404).json({
        success: false,
        message: 'Team year not found'
      })
    }
    
    // Add member to array
    const newMember = {
      _id: new mongoose.Types.ObjectId(),
      ...memberData,
      join_date: new Date()
    }
    
    teamYear.members.push(newMember)
    await teamYear.save()
    
    res.status(201).json({
      success: true,
      message: 'Member added successfully',
      member: newMember,
      teamYear
    })
  } catch (error) {
    console.error('Add member error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}
```

#### Step 8: Database Operation
```javascript
// MongoDB Mongoose operations
const teamYear = await TeamYear.findById(yearId) // Find document
teamYear.members.push(newMember)                // Modify array
await teamYear.save()                           // Save to database
```

#### Step 9: Response Journey Back
```
Database → Model → Controller → Route → Frontend Hook → Component → UI Update
```

## 📊 Feature-Specific Data Flows

### 🏠 Team Management Flow

#### A. Loading Team Data
```
1. Team.jsx component mounts
2. useTeamYears hook triggers useEffect
3. fetchTeamYears() called
4. GET /api/team-years request
5. teamYearController.getTeamYears()
6. TeamYear.find().sort({ year: -1 })
7. MongoDB returns sorted team years
8. Response with team data
9. Hook updates state
10. Component re-renders with data
```

#### B. Adding New Team Year
```
User Input → Form Validation → API Call → Database Insert → State Update → UI Refresh
     ↓              ↓              ↓            ↓             ↓            ↓
  Year: 2025    Required fields   POST req   new document   local state   new card
  Desc: "..."   Valid year range  /api/...   validated     updated      rendered
```

#### C. Managing Team Members
```
Member CRUD Operations:
├── CREATE: POST /api/team-years/:id/members
├── READ:   GET /api/team-years (includes members)
├── UPDATE: PUT /api/team-years/:yearId/members/:memberId
└── DELETE: DELETE /api/team-years/:yearId/members/:memberId

Each operation follows the same 9-step flow pattern above.
```

### 📅 Event Management Flow

#### A. Event Creation Workflow
```
1. Admin opens "Create Event" modal
2. Fills event form (title, description, date, capacity)
3. Form validation (client-side)
4. POST /api/events with event data
5. authMiddleware verifies admin token
6. eventController.createEvent()
7. Joi validation (server-side)
8. Event.create(eventData)
9. MongoDB inserts new event document
10. Success response with event object
11. useEvents hook updates local state
12. Events page re-renders with new event
13. Success toast notification shown
```

#### B. Event Registration Flow
```
Public User Registration:
1. User clicks "Register" on event card
2. Registration modal opens
3. User fills contact form
4. POST /api/events/:id/register
5. No auth required (public endpoint)
6. eventController.registerForEvent()
7. Validate registration data
8. Check event capacity
9. Create EventRegistration document
10. Update event registration count
11. Send confirmation response
12. Show success message to user
```

### 📝 Blog Management Flow

#### A. Blog Post Creation
```
Rich Content Flow:
1. Admin navigates to blog creation
2. Rich text editor component loads
3. Admin writes content with formatting
4. Image upload via separate endpoint
5. Form validation (title, content, tags)
6. POST /api/blogs with blog data
7. blogController.createBlog()
8. Content sanitization
9. Blog.create() with processed content
10. MongoDB stores blog document
11. Response with created blog
12. Blog list updated in real-time
```

#### B. Blog Display Flow
```
Public Blog Viewing:
1. User visits /blog page
2. useBlogs hook fetches data
3. GET /api/blogs (public endpoint)
4. blogController.getBlogs()
5. Blog.find().populate('author')
6. MongoDB returns blog array
7. Blogs rendered as cards
8. Pagination/infinite scroll
9. Individual blog view on click
```

### 🏆 Project Showcase Flow

#### A. Project Portfolio Management
```
Project CRUD with File Uploads:
1. Admin creates/edits project
2. Project form with image upload
3. Multer handles file upload
4. Images stored in /uploads directory
5. File paths saved in project document
6. Project data validated
7. MongoDB operation (create/update)
8. Frontend state synchronized
9. Project cards updated with new images
```

## 🔐 Authentication Flow Deep Dive

### Login Process
```
1. User enters credentials on /admin-login
2. Form validation (email format, required fields)
3. POST /api/auth/login with credentials
4. authController.login() processes request
5. Admin.findOne({ email }) queries database
6. bcrypt.compare() verifies password
7. JWT token generated with admin ID
8. Token and admin data returned
9. Token stored in localStorage
10. axios default header set with token
11. AuthContext state updated
12. Redirect to admin dashboard
13. All subsequent requests include token
```

### Protected Route Access
```
1. User accesses protected route (e.g., /admin-dashboard)
2. ProtectedRoute component checks auth state
3. If no token, redirect to login
4. If token exists, verify with backend
5. GET /api/auth/verify with token header
6. authenticateToken middleware validates JWT
7. Admin document fetched from database
8. Valid admin attached to req.admin
9. authController.verifyToken() confirms
10. Frontend receives admin data
11. Protected content rendered
12. Admin dashboard components load
```

## 📱 Real-Time Updates & State Management

### State Synchronization Patterns

#### A. Optimistic Updates
```javascript
// Immediate UI update, rollback on error
const deleteProject = async (projectId) => {
  // 1. Optimistically update UI
  setProjects(prev => prev.filter(p => p.id !== projectId))
  
  try {
    // 2. Send delete request
    await axios.delete(`/api/projects/${projectId}`)
    toast.success('Project deleted successfully')
  } catch (error) {
    // 3. Rollback on error
    fetchProjects() // Refresh from server
    toast.error('Failed to delete project')
  }
}
```

#### B. Pessimistic Updates
```javascript
// Wait for server confirmation before UI update
const updateProject = async (projectId, updateData) => {
  setLoading(true)
  
  try {
    // 1. Send update request first
    const response = await axios.put(`/api/projects/${projectId}`, updateData)
    
    // 2. Update UI only after success
    setProjects(prev => 
      prev.map(p => p.id === projectId ? response.data.project : p)
    )
    
    toast.success('Project updated successfully')
  } catch (error) {
    toast.error('Failed to update project')
  } finally {
    setLoading(false)
  }
}
```

### Cache Management

#### A. Data Caching in Custom Hooks
```javascript
// useProjects.js - Cached data fetching
const useProjects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [lastFetch, setLastFetch] = useState(null)
  
  const fetchProjects = async (force = false) => {
    // Cache for 5 minutes
    const cacheExpiry = 5 * 60 * 1000
    const now = Date.now()
    
    if (!force && lastFetch && (now - lastFetch < cacheExpiry)) {
      console.log('Using cached projects data')
      return projects
    }
    
    try {
      setLoading(true)
      const response = await axios.get('/api/projects')
      setProjects(response.data.projects)
      setLastFetch(now)
    } catch (error) {
      console.error('Failed to fetch projects:', error)
    } finally {
      setLoading(false)
    }
  }
  
  return { projects, loading, fetchProjects, refetch: () => fetchProjects(true) }
}
```

## 🛠️ Error Handling & Recovery

### Error Flow Patterns

#### A. Frontend Error Handling
```javascript
// Comprehensive error handling in hooks
const useApiOperation = () => {
  const [error, setError] = useState(null)
  const [retryCount, setRetryCount] = useState(0)
  
  const executeOperation = async (operation, maxRetries = 3) => {
    try {
      setError(null)
      const result = await operation()
      setRetryCount(0)
      return result
    } catch (err) {
      console.error('Operation failed:', err)
      
      // Network errors - retry with exponential backoff
      if (err.code === 'NETWORK_ERROR' && retryCount < maxRetries) {
        const delay = Math.pow(2, retryCount) * 1000
        setTimeout(() => {
          setRetryCount(prev => prev + 1)
          executeOperation(operation, maxRetries)
        }, delay)
        return
      }
      
      // Authentication errors - redirect to login
      if (err.response?.status === 401) {
        logout()
        navigate('/admin-login')
        return
      }
      
      // Validation errors - show specific messages
      if (err.response?.status === 400) {
        setError(err.response.data.message)
        return
      }
      
      // Server errors - show generic message
      setError('Something went wrong. Please try again.')
    }
  }
  
  return { executeOperation, error, retryCount }
}
```

#### B. Backend Error Handling
```javascript
// Centralized error handling middleware
export const errorHandler = (err, req, res, next) => {
  console.error('Error details:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    body: req.body,
    admin: req.admin?.id
  })
  
  // MongoDB validation errors
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message)
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    })
  }
  
  // MongoDB duplicate key errors
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: 'Duplicate entry found'
    })
  }
  
  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    })
  }
  
  // Default server error
  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message
  })
}
```

## 📊 Performance Optimization Patterns

### A. Database Query Optimization
```javascript
// Efficient queries with proper indexing
export const getTeamYears = async (req, res) => {
  try {
    const teamYears = await TeamYear
      .find({ is_active: true })
      .select('year members description created_at') // Only needed fields
      .sort({ year: -1 })
      .lean() // Return plain objects instead of Mongoose documents
      .limit(10) // Pagination
    
    res.json({
      success: true,
      data: teamYears,
      count: teamYears.length
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch team years'
    })
  }
}
```

### B. Frontend Performance Patterns
```javascript
// Memoization and lazy loading
import { memo, useMemo, lazy, Suspense } from 'react'

// Memoized component to prevent unnecessary re-renders
const TeamMemberCard = memo(({ member, onEdit, onDelete }) => {
  // Component logic
})

// Memoized computed values
const sortedMembers = useMemo(() => {
  return members.sort((a, b) => a.name.localeCompare(b.name))
}, [members])

// Lazy loaded components
const AdminDashboard = lazy(() => import('./AdminDashboard'))

// Usage with Suspense
<Suspense fallback={<LoadingSpinner />}>
  <AdminDashboard />
</Suspense>
```

## 🧪 Testing Data Flows

### A. Unit Testing Controllers
```javascript
// Test controller logic
describe('teamYearController', () => {
  test('should add member to team year', async () => {
    const mockTeamYear = {
      _id: 'year123',
      year: 2025,
      members: [],
      save: jest.fn()
    }
    
    TeamYear.findById.mockResolvedValue(mockTeamYear)
    
    const req = {
      params: { id: 'year123' },
      body: { name: 'John Doe', role: 'Developer' }
    }
    
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    
    await addMember(req, res)
    
    expect(mockTeamYear.members).toHaveLength(1)
    expect(mockTeamYear.save).toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(201)
  })
})
```

### B. Integration Testing API Flows
```javascript
// Test complete API flow
describe('Team Years API', () => {
  test('should create team year and add member', async () => {
    // 1. Create team year
    const yearResponse = await request(app)
      .post('/api/team-years')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ year: 2025, description: 'Test year' })
    
    expect(yearResponse.status).toBe(201)
    const yearId = yearResponse.body.data._id
    
    // 2. Add member to year
    const memberResponse = await request(app)
      .post(`/api/team-years/${yearId}/members`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Test Member', role: 'Developer' })
    
    expect(memberResponse.status).toBe(201)
    expect(memberResponse.body.member.name).toBe('Test Member')
  })
})
```

This comprehensive data flow documentation provides a clear understanding of how information moves through the Drone Club Website application, enabling efficient development, debugging, and maintenance.

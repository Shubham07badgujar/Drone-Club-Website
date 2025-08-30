# 📁 Project Structure Documentation

This document provides a detailed breakdown of the Drone Club Website project structure, explaining the purpose and functionality of each directory and file.

## 🏗️ Overall Architecture

```
Drone-Club-Website/
├── 📱 frontend/          # React + Vite Client Application
├── 🖥️ backend/           # Node.js + Express API Server  
├── 📚 documentation/     # Project documentation files
├── 🔧 config/            # Configuration files
└── 📄 project files      # README, LICENSE, etc.
```

### Architecture Pattern: **Full-Stack MVC + Component-Based**

- **Frontend**: Component-based architecture with React
- **Backend**: MVC (Model-View-Controller) pattern with Express.js
- **Database**: Document-based with MongoDB Atlas
- **Communication**: RESTful API with JSON

## 🎨 Frontend Structure (`frontend/`)

### 📂 Root Level Files

```
frontend/
├── 📄 package.json           # Project dependencies and scripts
├── 📄 vite.config.js         # Vite build configuration
├── 📄 tailwind.config.js     # Tailwind CSS configuration
├── 📄 postcss.config.js      # PostCSS configuration for Tailwind
├── 📄 index.html             # HTML template (SPA entry point)
├── 📄 .env.local             # Environment variables (local development)
├── 📄 .env.example           # Environment template
└── 📄 .gitignore             # Git ignore rules
```

#### Key Configuration Files Explained

**`package.json`** - Project metadata and dependencies
```json
{
  "scripts": {
    "dev": "vite",                # Development server (HMR enabled)
    "build": "vite build",        # Production build
    "preview": "vite preview",    # Preview production build
    "lint": "eslint ."            # Code linting
  },
  "dependencies": {
    "react": "^18.2.0",           # Core React library
    "react-router-dom": "^6.15.0", # Client-side routing
    "axios": "^1.5.0",            # HTTP client
    "tailwindcss": "^3.3.3"       # Utility-first CSS framework
  }
}
```

**`vite.config.js`** - Build tool configuration
```javascript
export default defineConfig({
  plugins: [react()],             # React plugin for JSX support
  server: {
    port: 3000,                   # Development server port
    proxy: {                      # API proxy configuration
      '/api': 'http://localhost:5000'
    }
  }
})
```

### 📂 Source Code Structure (`src/`)

```
src/
├── 📄 main.jsx              # Application entry point (ReactDOM.render)
├── 📄 App.jsx               # Root component with routing
├── 📄 index.css             # Global styles + Tailwind imports
├── 📁 components/           # Reusable React components
├── 📁 pages/                # Page-level components (routes)
├── 📁 context/              # React Context providers
├── 📁 hooks/                # Custom React hooks
├── 📁 utils/                # Utility functions and helpers
└── 📁 assets/               # Static assets (images, icons)
```

### 🧩 Components Directory (`src/components/`)

```
components/
├── 📁 layout/               # Layout components
│   ├── Navbar.jsx           # Main navigation header
│   └── Footer.jsx           # Site footer
├── 📁 ui/                   # Generic UI primitives
│   ├── Button.jsx           # Reusable button component
│   ├── Card.jsx             # Container card component
│   ├── Modal.jsx            # Modal dialog component
│   ├── Badge.jsx            # Status/label badge
│   ├── Tag.jsx              # Removable tag component
│   ├── MobileButton.jsx     # Mobile-optimized button
│   ├── MobileCard.jsx       # Mobile-optimized card
│   └── MobileInput.jsx      # Mobile-optimized input
├── 📁 cards/                # Specialized content cards
│   ├── TeamMemberCard.jsx   # Team member display card
│   ├── EventCard.jsx        # Event information card
│   ├── ProjectCard.jsx      # Project showcase card
│   ├── BlogCard.jsx         # Blog post preview card
│   └── AchievementCard.jsx  # Achievement display card
├── 📁 animations/           # Animation components
│   ├── DroneAnimation.jsx   # Floating drone animation
│   ├── DroneAnimations.jsx  # Multiple drone animations
│   ├── HeroBackground.jsx   # Hero section background
│   ├── ModernBackground.jsx # Modern gradient background
│   └── TechBackground.jsx   # Tech-themed background
├── FloatingDrone.jsx        # Floating drone element
└── ProtectedRoute.jsx       # Authentication route guard
```

#### Component Architecture Patterns

**1. Generic UI Components (`ui/`)**
- **Purpose**: Reusable building blocks
- **Props**: Highly configurable with variant props
- **Usage**: Used across multiple pages and features

**Example**: `Button.jsx`
```jsx
const Button = ({ 
  variant = 'primary',    # Style variant
  size = 'md',           # Size variant  
  children,              # Button content
  className,             # Additional CSS classes
  loading = false,       # Loading state
  disabled = false,      # Disabled state
  ...props              # Other HTML attributes
}) => {
  return (
    <button 
      className={`btn btn-${variant} btn-${size} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Spinner /> : children}
    </button>
  )
}
```

**2. Specialized Cards (`cards/`)**
- **Purpose**: Display specific content types
- **Props**: Structured data objects
- **Features**: Hover effects, responsive design

**Example**: `TeamMemberCard.jsx`
```jsx
const TeamMemberCard = ({ member, onEdit, onDelete, isAdmin }) => {
  return (
    <Card className="team-member-card">
      <img src={member.photo} alt={member.name} />
      <h3>{member.name}</h3>
      <p>{member.role}</p>
      <div className="social-links">
        {member.social_links.map(link => (
          <SocialIcon key={link.platform} {...link} />
        ))}
      </div>
      {isAdmin && (
        <div className="admin-actions">
          <Button onClick={() => onEdit(member)}>Edit</Button>
          <Button onClick={() => onDelete(member.id)}>Delete</Button>
        </div>
      )}
    </Card>
  )
}
```

### 📄 Pages Directory (`src/pages/`)

```
pages/
├── Home.jsx                 # Landing page with hero section
├── Home_Professional.jsx   # Alternative professional home layout
├── About.jsx                # About us page
├── Team.jsx                 # Team members showcase
├── Events.jsx               # Events listing and details
├── Projects.jsx             # Projects portfolio
├── Blog.jsx                 # Blog posts listing
├── Achievements.jsx         # Achievements gallery
├── Departments.jsx          # Department information
├── AdminLogin.jsx           # Admin authentication page
└── AdminDashboard.jsx       # Admin control panel
```

#### Page Component Structure

**Standard Page Pattern**:
```jsx
const PageName = () => {
  // State management
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Custom hooks for data fetching
  const { projects, error } = useProjects()
  
  // Authentication context
  const { isAuthenticated } = useAuth()
  
  // Effects for data loading
  useEffect(() => {
    loadData()
  }, [])
  
  return (
    <div className="page-container">
      <Navbar />
      <main className="main-content">
        <HeroSection />
        <ContentSection />
      </main>
      <Footer />
    </div>
  )
}
```

### 🎣 Hooks Directory (`src/hooks/`)

```
hooks/
├── useTeam.js              # Team members data management
├── useTeamYears.js         # Team years data management  
├── useEvents.js            # Events data management
├── useProjects.js          # Projects data management
├── useBlogs.js             # Blog posts data management
├── useAchievements.js      # Achievements data management
└── useDepartments.js       # Departments data management
```

#### Custom Hook Pattern

**Data Fetching Hook Example**: `useProjects.js`
```javascript
import { useState, useEffect } from 'react'
import axios from 'axios'

const useProjects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch projects
  const fetchProjects = async () => {
    try {
      setLoading(true)
      const response = await axios.get('/api/projects')
      setProjects(response.data.projects)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Create project (admin only)
  const createProject = async (projectData) => {
    try {
      const response = await axios.post('/api/projects', projectData)
      setProjects(prev => [...prev, response.data.project])
      return { success: true, project: response.data.project }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  // Update project (admin only)
  const updateProject = async (id, projectData) => {
    try {
      const response = await axios.put(`/api/projects/${id}`, projectData)
      setProjects(prev => 
        prev.map(p => p.id === id ? response.data.project : p)
      )
      return { success: true, project: response.data.project }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  // Delete project (admin only)
  const deleteProject = async (id) => {
    try {
      await axios.delete(`/api/projects/${id}`)
      setProjects(prev => prev.filter(p => p.id !== id))
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  return {
    projects,
    loading,
    error,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject
  }
}

export default useProjects
```

### 🌐 Context Directory (`src/context/`)

```
context/
└── AuthContext.jsx         # Authentication state management
```

**AuthContext Pattern**:
```jsx
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [admin, setAdmin] = useState(null)
  
  const login = async (email, password) => {
    // Login logic
  }
  
  const logout = () => {
    // Logout logic
  }
  
  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      admin, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  )
}
```

## 🖥️ Backend Structure (`backend/`)

### 📂 Root Level Files

```
backend/
├── 📄 server.js              # Express server entry point
├── 📄 package.json           # Dependencies and scripts
├── 📄 .env                   # Environment variables (not in git)
├── 📄 .env.example           # Environment template
├── 📄 .gitignore             # Git ignore rules
├── 📁 src/                   # Source code
├── 📁 scripts/               # Utility scripts
├── 📁 uploads/               # File upload directory
└── 📁 tests/                 # Test files (future)
```

### 🏗️ Source Code Structure (`src/`)

```
src/
├── 📁 config/               # Configuration files
├── 📁 models/               # Data models (MongoDB & Sequelize)
├── 📁 controllers/          # Business logic handlers
├── 📁 routes/               # API route definitions
├── 📁 middleware/           # Express middleware
└── 📁 utils/                # Utility functions
```

### ⚙️ Configuration (`src/config/`)

```
config/
├── database.js              # Sequelize database configuration (legacy)
└── mongodb.js               # MongoDB Atlas connection
```

**MongoDB Configuration**: `mongodb.js`
```javascript
import mongoose from 'mongoose'

const connectMongoDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI
    
    const options = {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      bufferCommands: false
    }
    
    const connection = await mongoose.connect(mongoURI, options)
    console.log('✅ MongoDB Atlas connected successfully!')
    
    return connection
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message)
    return null
  }
}

export default connectMongoDB
```

### 📊 Models Directory (`src/models/`)

```
models/
├── 📁 mongodb/              # MongoDB/Mongoose models (active)
│   ├── Admin.js             # Admin user model
│   ├── TeamYear.js          # Team year with embedded members
│   ├── Event.js             # Events model
│   ├── Project.js           # Projects model
│   ├── Blog.js              # Blog posts model
│   ├── Achievement.js       # Achievements model
│   ├── Department.js        # Departments model
│   └── index.js             # Export all models
├── Achievement.js           # Sequelize model (legacy)
├── Admin.js                 # Sequelize model (legacy)
├── Blog.js                  # Sequelize model (legacy)
├── Department.js            # Sequelize model (legacy)
├── Event.js                 # Sequelize model (legacy)
├── EventRegistration.js     # Sequelize model (legacy)
├── Project.js               # Sequelize model (legacy)
├── TeamMember.js            # Sequelize model (legacy)
└── index.js                 # Sequelize models export (legacy)
```

#### MongoDB Model Pattern

**Example**: `TeamYear.js`
```javascript
import mongoose from 'mongoose'

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  bio: { type: String },
  photo: { type: String },
  social_links: [{
    platform: { type: String, required: true },
    url: { type: String, required: true }
  }],
  join_date: { type: Date, default: Date.now }
})

const teamYearSchema = new mongoose.Schema({
  year: { 
    type: Number, 
    required: true, 
    unique: true,
    min: 2020,
    max: new Date().getFullYear() + 1
  },
  members: [memberSchema],
  description: { type: String },
  is_active: { type: Boolean, default: true }
}, {
  timestamps: true
})

export default mongoose.model('TeamYear', teamYearSchema)
```

### 🎮 Controllers Directory (`src/controllers/`)

```
controllers/
├── authController.js        # Authentication logic
├── teamYearController.js    # Team year management
├── teamController.js        # Team member management (legacy)
├── eventController.js       # Event management
├── projectController.js     # Project management
├── blogController.js        # Blog management
├── achievementController.js # Achievement management
└── departmentController.js  # Department management
```

#### Controller Pattern

**Example**: `teamYearController.js`
```javascript
import { TeamYear } from '../models/mongodb/index.js'

// @desc    Get all team years
// @route   GET /api/team-years
// @access  Public
export const getTeamYears = async (req, res) => {
  try {
    const teamYears = await TeamYear.find({ is_active: true })
      .sort({ year: -1 })
    
    res.json({
      success: true,
      count: teamYears.length,
      data: teamYears
    })
  } catch (error) {
    console.error('Get team years error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch team years'
    })
  }
}

// @desc    Create new team year
// @route   POST /api/team-years
// @access  Private (Admin only)
export const createTeamYear = async (req, res) => {
  try {
    const { year, description } = req.body
    
    const teamYear = await TeamYear.create({
      year,
      description,
      members: []
    })
    
    res.status(201).json({
      success: true,
      message: 'Team year created successfully',
      data: teamYear
    })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Team year already exists'
      })
    }
    
    console.error('Create team year error:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to create team year'
    })
  }
}
```

### 🛤️ Routes Directory (`src/routes/`)

```
routes/
├── auth.js                  # Authentication routes
├── teamYears.js            # Team year routes
├── team.js                 # Team member routes (legacy)
├── events.js               # Event routes
├── projects.js             # Project routes
├── blogs.js                # Blog routes
├── achievements.js         # Achievement routes
└── departments.js          # Department routes
```

#### Route Pattern

**Example**: `teamYears.js`
```javascript
import express from 'express'
import { 
  getTeamYears, 
  createTeamYear, 
  updateTeamYear, 
  deleteTeamYear,
  addMember,
  updateMember,
  deleteMember
} from '../controllers/teamYearController.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// Public routes
router.get('/', getTeamYears)

// Protected routes (admin only)
router.post('/', authenticateToken, createTeamYear)
router.put('/:id', authenticateToken, updateTeamYear)
router.delete('/:id', authenticateToken, deleteTeamYear)

// Member management routes
router.post('/:id/members', authenticateToken, addMember)
router.put('/:yearId/members/:memberId', authenticateToken, updateMember)
router.delete('/:yearId/members/:memberId', authenticateToken, deleteMember)

export default router
```

### 🛡️ Middleware Directory (`src/middleware/`)

```
middleware/
├── auth.js                  # JWT authentication middleware
└── validation.js            # Input validation middleware
```

**Authentication Middleware**: `auth.js`
```javascript
import jwt from 'jsonwebtoken'
import { Admin } from '../models/mongodb/index.js'

export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.'
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const admin = await Admin.findById(decoded.id).select('-password_hash')
    
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. Admin not found.'
      })
    }

    req.admin = admin
    next()
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Access denied. Invalid token.'
    })
  }
}
```

### 🔧 Scripts Directory (`scripts/`)

```
scripts/
├── seed-mongodb.js          # MongoDB database seeding
├── seed-team-data.js        # Team-specific data seeding
├── seed.js                  # Sequelize seeding (legacy)
├── test-db-connection.js    # Database connection testing
└── db-health-check.js       # Database health monitoring
```

**Database Seeding**: `seed-mongodb.js`
```javascript
import connectMongoDB from '../src/config/mongodb.js'
import { Admin, Project, Event, Blog, Achievement } from '../src/models/mongodb/index.js'

const seedDatabase = async () => {
  try {
    await connectMongoDB()
    
    // Clear existing data
    await Admin.deleteMany({})
    await Project.deleteMany({})
    
    // Create admin user
    await Admin.create({
      username: 'admin',
      email: process.env.ADMIN_EMAIL,
      password_hash: process.env.ADMIN_PASSWORD,
      role: 'super_admin'
    })
    
    // Create sample projects
    await Project.create([
      {
        title: 'Autonomous Navigation Drone',
        description: 'AI-powered drone with computer vision',
        technologies: ['Python', 'OpenCV', 'TensorFlow'],
        status: 'in-progress'
      }
    ])
    
    console.log('✅ Database seeded successfully')
  } catch (error) {
    console.error('❌ Seeding failed:', error)
  }
}

seedDatabase()
```

## 🔄 Data Flow Architecture

### Request-Response Cycle

```
Frontend Request → Backend Route → Middleware → Controller → Model → Database
        ↓                                                              ↑
  Response Data ←── Response JSON ←── Controller ←── Query Result ←────┘
```

### Detailed Flow Example: Creating a Team Member

1. **Frontend Component** (`Team.jsx`)
   ```jsx
   const handleAddMember = async (memberData) => {
     const result = await addTeamMember(yearId, memberData)
     if (result.success) {
       toast.success('Member added successfully!')
       refreshTeamData()
     }
   }
   ```

2. **Custom Hook** (`useTeamYears.js`)
   ```javascript
   const addTeamMember = async (yearId, memberData) => {
     const response = await axios.post(`/api/team-years/${yearId}/members`, memberData)
     return response.data
   }
   ```

3. **API Route** (`routes/teamYears.js`)
   ```javascript
   router.post('/:id/members', authenticateToken, addMember)
   ```

4. **Authentication Middleware** (`middleware/auth.js`)
   ```javascript
   // Verify JWT token and attach admin to request
   req.admin = admin
   next()
   ```

5. **Controller** (`controllers/teamYearController.js`)
   ```javascript
   export const addMember = async (req, res) => {
     const teamYear = await TeamYear.findById(req.params.id)
     teamYear.members.push(req.body)
     await teamYear.save()
     res.json({ success: true, data: teamYear })
   }
   ```

6. **MongoDB Model** (`models/mongodb/TeamYear.js`)
   ```javascript
   // Mongoose handles the database operation
   const teamYear = await TeamYear.findById(id)
   ```

7. **Database** (MongoDB Atlas)
   ```javascript
   // Document updated in cloud database
   // Response sent back through the chain
   ```

## 📝 File Naming Conventions

### Frontend Files
- **Components**: PascalCase (`TeamMemberCard.jsx`)
- **Pages**: PascalCase (`AdminDashboard.jsx`)
- **Hooks**: camelCase with 'use' prefix (`useTeamYears.js`)
- **Utils**: camelCase (`apiClient.js`)
- **Constants**: UPPER_CASE (`API_ENDPOINTS.js`)

### Backend Files
- **Controllers**: camelCase with 'Controller' suffix (`teamYearController.js`)
- **Models**: PascalCase (`TeamYear.js`)
- **Routes**: camelCase (`teamYears.js`)
- **Middleware**: camelCase (`auth.js`)
- **Utils**: camelCase (`logger.js`)

### Directory Organization Principles

1. **Separation of Concerns**: Each directory has a specific purpose
2. **Feature-Based Grouping**: Related functionality grouped together
3. **Scalability**: Structure supports growing codebase
4. **Maintainability**: Clear organization for easy navigation
5. **Consistency**: Consistent patterns across the project

## 🔧 Development Workflow

### Local Development Setup
1. **Install Dependencies**: `npm install` in both frontend and backend
2. **Environment Setup**: Configure `.env` files
3. **Database Setup**: Seed MongoDB with sample data
4. **Start Servers**: Run frontend and backend concurrently

### File Modification Workflow
1. **Backend Changes**: Modify model → controller → route → test
2. **Frontend Changes**: Modify component → hook → page → test
3. **Full-Stack Features**: Backend API → Frontend integration → UI polish

### Code Organization Best Practices
1. **Single Responsibility**: Each file has one clear purpose
2. **DRY Principle**: Reusable components and utilities
3. **Modularity**: Independent, testable modules
4. **Documentation**: Clear comments and README files

This structure provides a solid foundation for the Drone Club Website, enabling efficient development, easy maintenance, and seamless scalability as the project grows.

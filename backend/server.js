import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

// Import database and routes
import connectMongoDB from './src/config/mongodb.js'
import authRoutes from './src/routes/auth.js'
import projectRoutes from './src/routes/projects.js'
import eventRoutes from './src/routes/events.js'
import blogRoutes from './src/routes/blogs.js'
import teamRoutes from './src/routes/team.js'
import departmentRoutes from './src/routes/departments.js'
import achievementRoutes from './src/routes/achievements.js'

// Load environment variables
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Increased limit for development - each IP can make 1000 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    error: 'Too many requests, please try again later.',
    retryAfter: 'Please wait before making another request.'
  }
})

// Middleware
app.use(limiter)
app.use(helmet())
app.use(compression())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}))
app.use(morgan('combined'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/events', eventRoutes)
app.use('/api/blogs', blogRoutes)
app.use('/api/team', teamRoutes)
app.use('/api/departments', departmentRoutes)
app.use('/api/achievements', achievementRoutes)

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV 
  })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: err.details?.map(detail => detail.message) || [err.message]
    })
  }
  
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized'
    })
  }
  
  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  })
})

// Database connection and server startup
const startServer = async () => {
  try {
    // Attempt to connect to MongoDB Atlas
    const mongoConnection = await connectMongoDB()
    
    if (mongoConnection) {
      console.log('✅ MongoDB Atlas connected successfully')
    } else {
      console.log('⚠️  Running without MongoDB connection')
      console.log('   See MONGODB_SETUP.md for setup instructions')
    }
    
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`)
      console.log(`🌍 Environment: ${process.env.NODE_ENV}`)
      console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`)
      if (!mongoConnection) {
        console.log('📋 Configure MongoDB Atlas to enable full functionality')
      }
    })
  } catch (error) {
    console.error('❌ Unable to start server:', error)
    process.exit(1)
  }
}

startServer()

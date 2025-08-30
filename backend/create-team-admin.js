import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

// Admin Schema (matching the actual model)
const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['super-admin', 'admin', 'moderator'],
    default: 'admin'
  },
  permissions: [{
    type: String,
    enum: ['read', 'write', 'delete', 'manage-users', 'manage-content', 'manage-events', 'manage-projects']
  }],
  last_login: {
    type: Date
  },
  is_active: {
    type: Boolean,
    default: true
  },
  failed_login_attempts: {
    type: Number,
    default: 0
  },
  locked_until: {
    type: Date
  }
}, {
  timestamps: true,
  collection: 'admins'
})

// Hash password before saving
adminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()
  
  try {
    const hashedPassword = await bcryptjs.hash(this.password, 12)
    this.password = hashedPassword
    next()
  } catch (error) {
    next(error)
  }
})

const Admin = mongoose.model('Admin', adminSchema)

async function createTeamThirdAxisAdmin() {
  try {
    console.log('🔄 Connecting to MongoDB...')
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    })
    console.log('✅ Connected to MongoDB')
    
    // Delete any existing admin with this email
    await Admin.deleteMany({ email: 'teamthirdaxis@gcoej.ac.in' })
    console.log('🗑️  Removed existing admin')
    
    // Create new admin - the pre-save hook will hash the password
    const admin = new Admin({
      name: 'Team Third Axis',
      email: 'teamthirdaxis@gcoej.ac.in',
      password: 'TeamThird@x!$07', // This will be hashed by the pre-save hook
      role: 'super-admin',
      permissions: ['read', 'write', 'delete', 'manage-users', 'manage-content', 'manage-events', 'manage-projects'],
      is_active: true
    })
    
    await admin.save()
    
    console.log('✅ Team Third Axis admin created successfully!')
    console.log('📧 Email: teamthirdaxis@gcoej.ac.in')
    console.log('🔑 Password: TeamThird@x!$07')
    console.log('👑 Role: super-admin')
    console.log('🎯 Organization: Team Third Axis Drone Club, GCOEJ')
    
  } catch (error) {
    console.error('❌ Error creating admin:', error)
  } finally {
    await mongoose.connection.close()
    console.log('🔌 Connection closed')
    process.exit(0)
  }
}

createTeamThirdAxisAdmin()

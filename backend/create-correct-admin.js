import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

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
    required: true
  },
  role: {
    type: String,
    enum: ['super-admin', 'admin', 'moderator'],
    default: 'admin'
  },
  permissions: [{
    type: String,
    enum: ['read', 'write', 'delete', 'manage-users', 'manage-content', 'manage-events', 'manage-projects'],
    default: ['read', 'write']
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

const Admin = mongoose.model('Admin', adminSchema)

async function createCorrectAdmin() {
  try {
    console.log('Connecting to MongoDB...')
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    })
    console.log('✅ Connected')
    
    // Delete any existing admin
    await Admin.deleteMany({ email: 'teamthirdaxis@gcoej.ac.in' })
    console.log('🗑️  Deleted existing admin')
    
    // Create new admin - the pre-save hook will hash the password
    const admin = new Admin({
      name: 'Team Third Axis',
      email: 'teamthirdaxis@gcoej.ac.in',
      password: 'TeamThird@x!$07',
      role: 'super-admin',
      permissions: ['read', 'write', 'delete', 'manage-users', 'manage-content', 'manage-events', 'manage-projects'],
      is_active: true
    })
    
    await admin.save()
    
    console.log('✅ Admin created successfully!')
    console.log('📧 Email: teamthirdaxis@gcoej.ac.in')
    console.log('🔑 Password: TeamThird@x!$07')
    console.log('👑 Role: super-admin')
    
  } catch (error) {
    console.error('❌ Error:', error.message)
  } finally {
    await mongoose.connection.close()
    console.log('🔌 Connection closed')
    process.exit(0)
  }
}

createCorrectAdmin()

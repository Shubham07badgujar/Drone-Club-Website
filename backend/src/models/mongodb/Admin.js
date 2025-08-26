import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Admin name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
      },
      message: 'Please provide a valid email address'
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
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
  profile_image: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\//.test(v)
      },
      message: 'Profile image must be a valid HTTP/HTTPS URL'
    }
  },
  last_login: {
    type: Date
  },
  is_active: {
    type: Boolean,
    default: true
  },
  failed_login_attempts: {
    type: Number,
    default: 0,
    max: [5, 'Maximum failed login attempts is 5']
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
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next()

  try {
    // Hash password with cost of 12
    const hashedPassword = await bcryptjs.hash(this.password, 12)
    this.password = hashedPassword
    next()
  } catch (error) {
    next(error)
  }
})

// Instance method to check password
adminSchema.methods.comparePassword = async function(candidatePassword) {
  return bcryptjs.compare(candidatePassword, this.password)
}

// Instance method to check if account is locked
adminSchema.methods.isLocked = function() {
  return !!(this.locked_until && this.locked_until > Date.now())
}

// Instance method to increment failed login attempts
adminSchema.methods.incrementFailedLoginAttempts = function() {
  // Check if we have a previous lock that has expired
  if (this.locked_until && this.locked_until < Date.now()) {
    return this.updateOne({
      $unset: { locked_until: 1 },
      $set: { failed_login_attempts: 1 }
    })
  }
  
  const updates = { $inc: { failed_login_attempts: 1 } }
  
  // Check if we need to lock the account
  if (this.failed_login_attempts + 1 >= 5 && !this.isLocked()) {
    updates.$set = { locked_until: Date.now() + 2 * 60 * 60 * 1000 } // 2 hours
  }
  
  return this.updateOne(updates)
}

// Instance method to reset failed login attempts
adminSchema.methods.resetFailedLoginAttempts = function() {
  return this.updateOne({
    $unset: { failed_login_attempts: 1, locked_until: 1 },
    $set: { last_login: Date.now() }
  })
}

// Indexes for better performance
adminSchema.index({ email: 1 }, { unique: true })
adminSchema.index({ role: 1 })
adminSchema.index({ is_active: 1 })

const Admin = mongoose.model('Admin', adminSchema)

export default Admin

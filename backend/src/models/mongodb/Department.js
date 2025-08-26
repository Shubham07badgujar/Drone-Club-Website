import mongoose from 'mongoose'

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Department name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Department description is required'],
    trim: true
  },
  head: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TeamMember'
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TeamMember'
  }],
  is_active: {
    type: Boolean,
    default: true
  },
  contact_email: {
    type: String,
    lowercase: true,
    trim: true,
    validate: {
      validator: function(v) {
        return !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
      },
      message: 'Please provide a valid email address'
    }
  },
  responsibilities: [{
    type: String,
    trim: true
  }],
  budget: {
    type: Number,
    default: 0,
    min: [0, 'Budget cannot be negative']
  }
}, {
  timestamps: true,
  collection: 'departments'
})

// Indexes for better performance
departmentSchema.index({ name: 1 }, { unique: true })
departmentSchema.index({ is_active: 1 })

const Department = mongoose.model('Department', departmentSchema)

export default Department

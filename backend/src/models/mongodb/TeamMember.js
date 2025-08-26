import mongoose from 'mongoose'

const teamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Team member name is required'],
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
  role: {
    type: String,
    required: [true, 'Role is required'],
    enum: ['president', 'vice-president', 'secretary', 'treasurer', 'technical-lead', 'project-manager', 'member', 'advisor'],
    default: 'member'
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    trim: true
  },
  year: {
    type: String,
    enum: ['1st', '2nd', '3rd', '4th', 'alumni', 'faculty'],
    required: [true, 'Academic year is required']
  },
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
  bio: {
    type: String,
    trim: true,
    maxlength: [500, 'Bio cannot exceed 500 characters']
  },
  skills: [{
    type: String,
    trim: true
  }],
  social_links: {
    linkedin: {
      type: String,
      trim: true,
      validate: {
        validator: function(v) {
          return !v || /^https?:\/\/(?:www\.)?linkedin\.com\//.test(v)
        },
        message: 'LinkedIn URL must be a valid LinkedIn profile URL'
      }
    },
    github: {
      type: String,
      trim: true,
      validate: {
        validator: function(v) {
          return !v || /^https?:\/\/github\.com\//.test(v)
        },
        message: 'GitHub URL must be a valid GitHub profile URL'
      }
    },
    twitter: {
      type: String,
      trim: true,
      validate: {
        validator: function(v) {
          return !v || /^https?:\/\/(?:www\.)?twitter\.com\//.test(v)
        },
        message: 'Twitter URL must be a valid Twitter profile URL'
      }
    }
  },
  join_date: {
    type: Date,
    default: Date.now
  },
  is_active: {
    type: Boolean,
    default: true
  },
  achievements: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Achievement'
  }],
  projects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }]
}, {
  timestamps: true,
  collection: 'team_members'
})

// Indexes for better performance
teamMemberSchema.index({ name: 1 })
teamMemberSchema.index({ role: 1 })
teamMemberSchema.index({ department: 1 })
teamMemberSchema.index({ is_active: 1 })
teamMemberSchema.index({ email: 1 }, { unique: true })

const TeamMember = mongoose.model('TeamMember', teamMemberSchema)

export default TeamMember

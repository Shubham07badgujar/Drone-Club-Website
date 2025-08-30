import mongoose from 'mongoose'

const teamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Team member name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    trim: true,
    maxlength: [100, 'Role cannot exceed 100 characters']
  },
  photo: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return !v || /^(https?:\/\/|\/|data:image\/)/.test(v)
      },
      message: 'Photo must be a valid URL or data URI'
    }
  },
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
  otherLinks: [{
    name: {
      type: String,
      trim: true,
      maxlength: [50, 'Link name cannot exceed 50 characters']
    },
    url: {
      type: String,
      trim: true,
      validate: {
        validator: function(v) {
          return !v || /^https?:\/\//.test(v)
        },
        message: 'URL must be a valid HTTP/HTTPS URL'
      }
    }
  }],
  order: {
    type: Number,
    default: 0
  }
}, {
  _id: true
})

const teamYearSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: [true, 'Year is required'],
    unique: true,
    min: [2000, 'Year must be at least 2000'],
    max: [3000, 'Year must be at most 3000'],
    validate: {
      validator: Number.isInteger,
      message: 'Year must be an integer'
    }
  },
  members: [teamMemberSchema],
  isActive: {
    type: Boolean,
    default: true
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  }
}, {
  timestamps: true,
  collection: 'team_years'
})

// Indexes for better performance
teamYearSchema.index({ year: -1 }) // Descending order for recent years first
teamYearSchema.index({ isActive: 1 })
teamYearSchema.index({ 'members.name': 1 })

// Pre-save middleware to sort members by order
teamYearSchema.pre('save', function(next) {
  if (this.members) {
    this.members.sort((a, b) => (a.order || 0) - (b.order || 0))
  }
  next()
})

const TeamYear = mongoose.model('TeamYear', teamYearSchema)

export default TeamYear

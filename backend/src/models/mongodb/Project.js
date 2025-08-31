import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  year: {
    type: Number,
    required: [true, 'Project year is required'],
    min: [2020, 'Year must be from 2020 onwards'],
    max: [new Date().getFullYear() + 5, 'Year cannot be more than 5 years in the future']
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  teamContributions: {
    type: String,
    required: [true, 'Team contributions and working details are required'],
    trim: true,
    maxlength: [5000, 'Team contributions cannot exceed 5000 characters']
  },
  imageUrl: {
    type: String,
    trim: true,
    default: '',
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\//.test(v)
      },
      message: 'Image URL must be a valid HTTP/HTTPS URL'
    }
  },
  
  // Enhanced fields for better project management
  category: {
    type: String,
    enum: ['Competition', 'Hackathon', 'Research', 'Innovation', 'Defense', 'Commercial', 'Educational', 'Other'],
    default: 'Competition'
  },
  status: {
    type: String,
    enum: ['Planning', 'In Progress', 'Completed', 'On Hold'],
    default: 'Completed'
  },
  technologies: [{
    type: String,
    trim: true
  }],
  teamMembers: [{
    name: {
      type: String,
      required: true,
      trim: true
    },
    role: {
      type: String,
      required: true,
      trim: true
    }
  }],
  
  // Additional project details
  githubUrl: {
    type: String,
    trim: true,
    default: '',
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\/(github\.com|gitlab\.com)\//.test(v)
      },
      message: 'Repository URL must be a valid GitHub or GitLab URL'
    }
  },
  demoUrl: {
    type: String,
    trim: true,
    default: '',
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\//.test(v)
      },
      message: 'Demo URL must be a valid HTTP/HTTPS URL'
    }
  },
  
  // Project metadata
  is_featured: {
    type: Boolean,
    default: false
  },
  display_order: {
    type: Number,
    default: 0
  },
  
  // Admin tracking
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  },
  updated_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  }
}, {
  timestamps: true,
  collection: 'projects'
})

// Virtual for formatted date
projectSchema.virtual('formattedYear').get(function() {
  return this.year?.toString()
})

projectSchema.virtual('shortDescription').get(function() {
  if (this.description && this.description.length > 150) {
    return this.description.substring(0, 150) + '...'
  }
  return this.description
})

// Static methods for common queries
projectSchema.statics.getFeatured = function() {
  return this.find({ is_featured: true }).sort({ display_order: 1, createdAt: -1 })
}

projectSchema.statics.getByYear = function(year) {
  return this.find({ year }).sort({ createdAt: -1 })
}

projectSchema.statics.getByCategory = function(category) {
  return this.find({ category }).sort({ createdAt: -1 })
}

// Indexes for better performance
projectSchema.index({ title: 1 })
projectSchema.index({ year: -1 })
projectSchema.index({ category: 1 })
projectSchema.index({ status: 1 })
projectSchema.index({ createdAt: -1 })
projectSchema.index({ is_featured: 1, display_order: 1 })

// Ensure virtual fields are serialized
projectSchema.set('toJSON', { virtuals: true })
projectSchema.set('toObject', { virtuals: true })

const Project = mongoose.model('Project', projectSchema)

export default Project

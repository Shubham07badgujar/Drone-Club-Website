import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true
  },
  media_url: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\//.test(v)
      },
      message: 'Media URL must be a valid HTTP/HTTPS URL'
    }
  },
  technologies: [{
    type: String,
    trim: true
  }],
  status: {
    type: String,
    enum: ['planning', 'in-progress', 'completed', 'on-hold'],
    default: 'planning'
  },
  github_url: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\/github\.com\//.test(v)
      },
      message: 'GitHub URL must be a valid GitHub repository URL'
    }
  },
  demo_url: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\//.test(v)
      },
      message: 'Demo URL must be a valid HTTP/HTTPS URL'
    }
  },
  team_members: [{
    type: String,
    trim: true
  }],
  start_date: {
    type: Date
  },
  end_date: {
    type: Date
  },
  is_featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  collection: 'projects'
})

// Indexes for better performance
projectSchema.index({ title: 1 })
projectSchema.index({ status: 1 })
projectSchema.index({ createdAt: -1 })
projectSchema.index({ is_featured: 1 })

const Project = mongoose.model('Project', projectSchema)

export default Project

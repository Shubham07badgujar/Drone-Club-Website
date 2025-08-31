import mongoose from 'mongoose'

const achievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Achievement title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Achievement description is required'],
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  year: {
    type: Number,
    required: [true, 'Achievement year is required'],
    min: [2020, 'Year must be from 2020 onwards'],
    max: [new Date().getFullYear() + 5, 'Year cannot be more than 5 years in the future']
  },
  image: {
    type: String,
    trim: true,
    default: ''
  },
  // Enhanced fields for better categorization
  category: {
    type: String,
    enum: ['Competition', 'Hackathon', 'Exhibition', 'Conference', 'Award', 'Certification', 'Other'],
    default: 'Competition',
    required: [true, 'Category is required']
  },
  position: {
    type: String,
    trim: true,
    default: '' // e.g., "1st Place", "AIR 5", "Finalist"
  },
  level: {
    type: String,
    enum: ['International', 'National', 'State', 'University', 'Local', 'Regional'],
    default: 'National',
    required: [true, 'Level is required']
  },
  organizer: {
    type: String,
    trim: true,
    default: '' // Organization that gave the achievement
  },
  // Date fields (keeping both for compatibility)
  date: {
    type: Date,
    default: function() {
      return new Date(this.year, 0, 1) // January 1st of the year
    }
  },
  // Legacy fields for backward compatibility
  image_url: {
    type: String,
    trim: true,
    get: function() {
      return this.image || ''
    }
  },
  certificate_url: {
    type: String,
    trim: true,
    default: ''
  },
  type: {
    type: String,
    enum: ['competition', 'certification', 'award', 'recognition', 'milestone', 'other'],
    default: 'competition'
  },
  team_members: [{
    type: String,
    trim: true
  }],
  points: {
    type: Number,
    default: 0,
    min: [0, 'Points cannot be negative']
  },
  // Admin tracking
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  },
  updated_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  },
  // Display settings
  is_featured: {
    type: Boolean,
    default: false
  },
  is_active: {
    type: Boolean,
    default: true
  },
  display_order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt automatically
  collection: 'achievements',
  toJSON: { virtuals: true, getters: true },
  toObject: { virtuals: true, getters: true }
})

// Indexes for better query performance
achievementSchema.index({ year: -1 }) // Most recent first
achievementSchema.index({ is_featured: -1, display_order: 1 })
achievementSchema.index({ is_active: 1, year: -1 })
achievementSchema.index({ title: 1 })
achievementSchema.index({ category: 1 })
achievementSchema.index({ level: 1 })

// Virtual for formatted creation date
achievementSchema.virtual('formatted_date').get(function() {
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

// Virtual for achievement year from date
achievementSchema.virtual('achievement_year').get(function() {
  return this.year || (this.date ? this.date.getFullYear() : new Date().getFullYear())
})

// Static method to get achievements by year
achievementSchema.statics.getByYear = function(year) {
  return this.find({ year, is_active: true }).sort({ display_order: 1, createdAt: -1 })
}

// Static method to get featured achievements
achievementSchema.statics.getFeatured = function() {
  return this.find({ is_featured: true, is_active: true })
    .sort({ display_order: 1, year: -1, createdAt: -1 })
    .limit(6)
}

// Static method to get recent achievements
achievementSchema.statics.getRecent = function(limit = 10) {
  return this.find({ is_active: true })
    .sort({ year: -1, createdAt: -1 })
    .limit(limit)
}

// Instance method to toggle featured status
achievementSchema.methods.toggleFeatured = function() {
  this.is_featured = !this.is_featured
  return this.save()
}

// Pre-save middleware to sync date and year
achievementSchema.pre('save', function(next) {
  if (this.year && !this.date) {
    this.date = new Date(this.year, 0, 1) // January 1st of the year
  }
  if (this.date && !this.year) {
    this.year = this.date.getFullYear()
  }
  next()
})

const Achievement = mongoose.model('Achievement', achievementSchema)

export default Achievement

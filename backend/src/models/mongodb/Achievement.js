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
    trim: true
  },
  image_url: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\//.test(v)
      },
      message: 'Image URL must be a valid HTTP/HTTPS URL'
    }
  },
  certificate_url: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\//.test(v)
      },
      message: 'Certificate URL must be a valid HTTP/HTTPS URL'
    }
  },
  date: {
    type: Date,
    required: [true, 'Achievement date is required']
  },
  type: {
    type: String,
    enum: ['competition', 'certification', 'award', 'recognition', 'milestone', 'other'],
    default: 'other'
  },
  category: {
    type: String,
    enum: ['technical', 'academic', 'research', 'community', 'innovation', 'leadership', 'other'],
    default: 'other'
  },
  position: {
    type: String,
    trim: true // e.g., "1st Place", "Winner", "Finalist"
  },
  organizer: {
    type: String,
    trim: true // Organization that gave the achievement
  },
  team_members: [{
    type: String,
    trim: true
  }],
  is_featured: {
    type: Boolean,
    default: false
  },
  points: {
    type: Number,
    default: 0,
    min: [0, 'Points cannot be negative']
  },
  level: {
    type: String,
    enum: ['local', 'regional', 'national', 'international'],
    default: 'local'
  }
}, {
  timestamps: true,
  collection: 'achievements'
})

// Indexes for better performance
achievementSchema.index({ title: 1 })
achievementSchema.index({ type: 1 })
achievementSchema.index({ category: 1 })
achievementSchema.index({ date: -1 })
achievementSchema.index({ is_featured: 1 })
achievementSchema.index({ level: 1 })

const Achievement = mongoose.model('Achievement', achievementSchema)

export default Achievement

import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Event title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Event description is required'],
    trim: true
  },
  date: {
    type: Date,
    required: [true, 'Event date is required']
  },
  time: {
    type: String,
    required: [true, 'Event time is required'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Event location is required'],
    trim: true
  },
  max_capacity: {
    type: Number,
    default: 50,
    min: [1, 'Maximum capacity must be at least 1']
  },
  registration_count: {
    type: Number,
    default: 0,
    min: [0, 'Registration count cannot be negative']
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
  type: {
    type: String,
    enum: ['workshop', 'competition', 'seminar', 'meetup', 'project-demo', 'other'],
    default: 'other'
  },
  prerequisites: [{
    type: String,
    trim: true
  }],
  organizers: [{
    type: String,
    trim: true
  }],
  is_featured: {
    type: Boolean,
    default: false
  },
  registration_open: {
    type: Boolean,
    default: true
  },
  registration_deadline: {
    type: Date
  }
}, {
  timestamps: true,
  collection: 'events'
})

// Indexes for better performance
eventSchema.index({ date: -1 })
eventSchema.index({ title: 1 })
eventSchema.index({ type: 1 })
eventSchema.index({ is_featured: 1 })
eventSchema.index({ registration_open: 1 })

const Event = mongoose.model('Event', eventSchema)

export default Event

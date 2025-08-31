import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: [true, 'Event name is required'],
    trim: true,
    maxlength: [200, 'Event name cannot exceed 200 characters']
  },
  title: {
    type: String,
    get: function() { return this.eventName }, // Backward compatibility
    set: function(v) { this.eventName = v }
  },
  description: {
    type: String,
    required: [true, 'Event description is required'],
    trim: true
  },
  highlights: [{
    type: String,
    trim: true,
    maxlength: [500, 'Each highlight cannot exceed 500 characters']
  }],
  date: {
    type: Date,
    required: [true, 'Event date is required'],
    validate: {
      validator: function(v) {
        return v && v > new Date('2020-01-01')
      },
      message: 'Event date must be valid'
    }
  },
  time: {
    type: String,
    required: [true, 'Event time is required'],
    trim: true
  },
  venue: {
    type: String,
    required: [true, 'Event venue is required'],
    trim: true,
    maxlength: [200, 'Venue cannot exceed 200 characters']
  },
  registrationFee: {
    type: mongoose.Schema.Types.Mixed, // Allows both string and number
    required: [true, 'Registration fee is required']
  },
  registrationDeadline: {
    type: Date
  },
  prizePool: {
    total: {
      type: Number,
      min: [0, 'Total prize cannot be negative']
    },
    firstPrize: {
      type: Number,
      min: [0, 'First prize cannot be negative']
    },
    secondPrize: {
      type: Number,
      min: [0, 'Second prize cannot be negative']
    },
    thirdPrize: {
      type: Number,
      min: [0, 'Third prize cannot be negative']
    }
  },
  rules: [{
    type: String,
    trim: true,
    maxlength: [1000, 'Each rule cannot exceed 1000 characters']
  }],
  contactPersons: [{
    name: {
      type: String,
      required: [true, 'Contact name is required'],
      trim: true,
      maxlength: [100, 'Contact name cannot exceed 100 characters']
    },
    phone: {
      type: String,
      required: [true, 'Contact phone is required'],
      trim: true,
      validate: {
        validator: function(v) {
          return /^(\+91[\s\-]?)?[6-9]\d{9}$/.test(v.replace(/[\s\-]/g, ''))
        },
        message: 'Please provide a valid Indian phone number'
      }
    }
  }],
  
  // Event Status and Metadata
  status: {
    type: String,
    enum: ['Draft', 'Published', 'Registration Open', 'Registration Closed', 'Ongoing', 'Completed', 'Cancelled'],
    default: 'Published'
  },
  category: {
    type: String,
    enum: ['Competition', 'Workshop', 'Seminar', 'Exhibition', 'Networking', 'Training', 'Other'],
    default: 'Competition'
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  
  // Event Media
  imageUrl: {
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\//.test(v)
      },
      message: 'Image URL must be a valid HTTP/HTTPS URL'
    }
  },
  gallery: [{
    type: String,
    trim: true,
    validate: {
      validator: function(v) {
        return /^https?:\/\//.test(v)
      },
      message: 'Gallery image URL must be a valid HTTP/HTTPS URL'
    }
  }],

  // Event Features
  is_featured: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    get: function() { return this.is_featured }, // Backward compatibility
    set: function(v) { this.is_featured = v }
  },
  is_public: {
    type: Boolean,
    default: true
  },
  display_order: {
    type: Number,
    default: 0
  },

  // Legacy compatibility fields
  details: {
    type: Object,
    get: function() {
      return {
        date: this.date,
        time: this.time,
        venue: this.venue,
        registrationFee: this.registrationFee,
        registrationDeadline: this.registrationDeadline
      }
    }
  },
  contacts: {
    type: Array,
    get: function() { return this.contactPersons }
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
  collection: 'events'
})

// Virtuals
eventSchema.virtual('formattedDate').get(function() {
  if (this.date) {
    return this.date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  return ''
})

eventSchema.virtual('formattedFee').get(function() {
  if (this.registrationFee !== undefined) {
    if (typeof this.registrationFee === 'string') {
      return this.registrationFee
    }
    return this.registrationFee === 0 ? 'Free' : `₹${this.registrationFee.toLocaleString('en-IN')}`
  }
  return ''
})

eventSchema.virtual('isRegistrationOpen').get(function() {
  const now = new Date()
  const deadline = this.registrationDeadline
  const eventDate = this.date
  
  return this.status === 'Registration Open' && 
         (!deadline || deadline > now) && 
         eventDate > now
})

// Static methods
eventSchema.statics.getFeatured = function() {
  return this.find({ is_featured: true, is_public: true })
    .sort({ display_order: 1, date: 1 })
}

eventSchema.statics.getUpcoming = function() {
  return this.find({ 
    date: { $gt: new Date() },
    is_public: true 
  }).sort({ date: 1 })
}

eventSchema.statics.getByCategory = function(category) {
  return this.find({ category, is_public: true })
    .sort({ date: 1 })
}

eventSchema.statics.getByStatus = function(status) {
  return this.find({ status })
    .sort({ date: 1 })
}

// Indexes for better performance
eventSchema.index({ date: 1 })
eventSchema.index({ status: 1 })
eventSchema.index({ category: 1 })
eventSchema.index({ is_featured: 1, display_order: 1 })
eventSchema.index({ is_public: 1, date: 1 })
eventSchema.index({ tags: 1 })
eventSchema.index({ eventName: 'text', description: 'text' })

// Ensure virtual fields are serialized
eventSchema.set('toJSON', { virtuals: true })
eventSchema.set('toObject', { virtuals: true })

const Event = mongoose.model('Event', eventSchema)

export default Event

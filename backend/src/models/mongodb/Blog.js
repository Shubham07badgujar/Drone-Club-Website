import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Blog title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Blog content is required']
  },
  author: {
    type: String,
    required: [true, 'Blog author is required'],
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
  excerpt: {
    type: String,
    trim: true,
    maxlength: [500, 'Excerpt cannot exceed 500 characters']
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  published: {
    type: Boolean,
    default: false
  },
  publish_date: {
    type: Date
  },
  read_time: {
    type: Number, // in minutes
    min: [1, 'Read time must be at least 1 minute']
  },
  views: {
    type: Number,
    default: 0,
    min: [0, 'Views cannot be negative']
  },
  likes: {
    type: Number,
    default: 0,
    min: [0, 'Likes cannot be negative']
  },
  category: {
    type: String,
    enum: ['technology', 'tutorial', 'news', 'project-showcase', 'event-recap', 'other'],
    default: 'other'
  }
}, {
  timestamps: true,
  collection: 'blogs'
})

// Virtual for URL slug
blogSchema.virtual('slug').get(function() {
  return this.title.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-')
})

// Auto-generate excerpt if not provided
blogSchema.pre('save', function(next) {
  if (!this.excerpt && this.content) {
    this.excerpt = this.content.substring(0, 200) + '...'
  }
  
  // Auto-calculate read time based on content
  if (this.content && !this.read_time) {
    const wordsPerMinute = 200
    const wordCount = this.content.split(' ').length
    this.read_time = Math.ceil(wordCount / wordsPerMinute)
  }
  
  next()
})

// Indexes for better performance
blogSchema.index({ title: 1 })
blogSchema.index({ author: 1 })
blogSchema.index({ createdAt: -1 })
blogSchema.index({ published: 1 })
blogSchema.index({ category: 1 })
blogSchema.index({ tags: 1 })

const Blog = mongoose.model('Blog', blogSchema)

export default Blog

import Joi from 'joi'

// Validation schemas
export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
})

export const projectSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().min(10).required(),
  media_url: Joi.string().uri().allow(null, ''),
  technologies: Joi.array().items(Joi.string()),
  status: Joi.string().valid('planning', 'in-progress', 'completed', 'on-hold'),
  github_url: Joi.string().uri().allow(null, ''),
  demo_url: Joi.string().uri().allow(null, ''),
})

export const eventSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().min(10).required(),
  date: Joi.date().min('now').required(),
  time: Joi.string().required(),
  location: Joi.string().min(3).required(),
  max_capacity: Joi.number().integer().min(1).allow(null),
  image_url: Joi.string().uri().allow(null, ''),
})

export const eventRegistrationSchema = Joi.object({
  user_name: Joi.string().min(2).max(100).required(),
  user_email: Joi.string().email().required(),
  phone_number: Joi.string().pattern(/^[\+]?[1-9][\d]{0,15}$/).allow(null, ''),
})

export const blogSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  content: Joi.string().min(50).required(),
  author: Joi.string().min(2).max(100).required(),
  image_url: Joi.string().uri().allow(null, ''),
  excerpt: Joi.string().max(500).allow(null, ''),
  tags: Joi.array().items(Joi.string()),
  published: Joi.boolean(),
})

export const teamMemberSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  role: Joi.string().min(2).max(100).required(),
  bio: Joi.string().allow(null, ''),
  image_url: Joi.string().uri().allow(null, ''),
  linkedin_url: Joi.string().uri().allow(null, ''),
  github_url: Joi.string().uri().allow(null, ''),
  twitter_url: Joi.string().uri().allow(null, ''),
  email: Joi.string().email().allow(null, ''),
  department: Joi.string().allow(null, ''),
  join_date: Joi.date().allow(null),
  is_active: Joi.boolean(),
})

export const departmentSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().min(10).required(),
  icon: Joi.string().allow(null, ''),
  color: Joi.string().allow(null, ''),
  head_id: Joi.string().uuid().allow(null),
  established_date: Joi.date().allow(null),
  is_active: Joi.boolean(),
})

export const achievementSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().min(10).required(),
  image_url: Joi.string().uri().allow(null, ''),
  certificate_url: Joi.string().uri().allow(null, ''),
  date: Joi.date().required(),
  type: Joi.string().valid('award', 'competition', 'milestone', 'certification').required(),
  category: Joi.string().allow(null, ''),
  position: Joi.string().allow(null, ''),
  organizer: Joi.string().allow(null, ''),
  team_members: Joi.array().items(Joi.string()),
  is_featured: Joi.boolean(),
})

// Validation middleware
export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false })
    
    if (error) {
      const errors = error.details.map(detail => detail.message)
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors,
      })
    }
    
    next()
  }
}

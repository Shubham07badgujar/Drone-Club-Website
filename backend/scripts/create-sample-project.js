import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

console.log('🌱 Manual project creation script...')

const createProject = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000
    })
    console.log('✅ Connected to MongoDB')
    
    // Define the project schema inline to avoid import issues
    const projectSchema = new mongoose.Schema({
      title: { type: String, required: true },
      year: { type: Number, required: true },
      description: { type: String, required: true },
      teamContributions: { type: String, required: true },
      imageUrl: { type: String, default: '' },
      category: { 
        type: String, 
        enum: ['Competition', 'Research', 'Commercial', 'Educational', 'Open Source', 'Innovation', 'Community', 'Collaboration'],
        default: 'Competition'
      },
      status: { 
        type: String, 
        enum: ['Planning', 'In Progress', 'Completed', 'On Hold'],
        default: 'Planning'
      },
      technologies: [String],
      teamMembers: [{
        name: { type: String, required: true },
        role: { type: String, required: true }
      }],
      githubUrl: { type: String, default: '' },
      demoUrl: { type: String, default: '' },
      is_featured: { type: Boolean, default: false },
      display_order: { type: Number, default: 0 },
      created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
      updated_by: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
    }, {
      timestamps: true
    })

    const Project = mongoose.model('Project', projectSchema)

    // Create a sample project
    const sampleProject = new Project({
      title: 'SAE AEROTHON 2024',
      year: 2024,
      description: 'The SAE AEROTHON 2024 was a prestigious national-level aerospace competition where our team designed and built an autonomous drone capable of performing complex aerial maneuvers and mission-specific tasks.',
      teamContributions: 'Our team of 8 members contributed extensively across multiple domains. The mechanical team designed a lightweight yet robust airframe using carbon fiber composites.',
      imageUrl: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      category: 'Competition',
      status: 'Completed',
      technologies: ['ArduPilot', 'Python', 'OpenCV', 'ROS'],
      teamMembers: [
        { name: 'Arjun Patel', role: 'Team Lead & Flight Controller Programming' },
        { name: 'Sneha Sharma', role: 'Mechanical Design & Aerodynamics' }
      ],
      githubUrl: 'https://github.com/droneclub/sae-aerothon-2024',
      demoUrl: 'https://youtube.com/watch?v=demo-sae-2024',
      is_featured: true,
      display_order: 1
    })

    await sampleProject.save()
    console.log('✅ Sample project created:', sampleProject.title)
    
  } catch (error) {
    console.error('❌ Error:', error.message)
  } finally {
    await mongoose.connection.close()
    console.log('📁 Connection closed')
    process.exit(0)
  }
}

createProject()

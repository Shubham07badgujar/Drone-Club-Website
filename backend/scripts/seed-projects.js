import mongoose from 'mongoose'
import Project from '../src/models/mongodb/Project.js'
import Admin from '../src/models/mongodb/Admin.js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

console.log('🚀 Starting project seeding script...')
console.log('📦 Dependencies loaded')
console.log('🔗 MongoDB URI:', process.env.MONGODB_URI ? 'Loaded' : 'Missing')

// Connect to MongoDB
const connectDB = async () => {
  try {
    console.log('🔄 Attempting to connect to MongoDB...')
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ MongoDB connected for seeding')
  } catch (error) {
    console.error('❌ MongoDB connection error:', error)
    process.exit(1)
  }
}

// Default projects data
const defaultProjects = [
  {
    title: 'SAE AEROTHON 2024',
    year: 2024,
    description: 'The SAE AEROTHON 2024 was a prestigious national-level aerospace competition where our team designed and built an autonomous drone capable of performing complex aerial maneuvers and mission-specific tasks. The competition challenged participants to develop innovative solutions for real-world aerospace applications.',
    teamContributions: 'Our team of 8 members contributed extensively across multiple domains. The mechanical team designed a lightweight yet robust airframe using carbon fiber composites. The electronics team integrated advanced flight controllers, sensors, and communication systems. The software team developed autonomous navigation algorithms using computer vision and machine learning. The project management team coordinated between different subsystems and ensured timely delivery. Each member brought unique expertise in aerodynamics, control systems, embedded programming, and project coordination.',
    imageUrl: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: 'Competition',
    status: 'Completed',
    technologies: ['ArduPilot', 'Python', 'OpenCV', 'ROS', 'Carbon Fiber', 'GPS Navigation', 'Computer Vision', 'Machine Learning'],
    teamMembers: [
      { name: 'Arjun Patel', role: 'Team Lead & Flight Controller Programming' },
      { name: 'Sneha Sharma', role: 'Mechanical Design & Aerodynamics' },
      { name: 'Rahul Kumar', role: 'Electronics & Sensor Integration' },
      { name: 'Priya Singh', role: 'Computer Vision & AI Algorithms' },
      { name: 'Vikram Mehta', role: 'Communication Systems & Telemetry' },
      { name: 'Ananya Gupta', role: 'Project Management & Documentation' },
      { name: 'Karthik Rao', role: 'Testing & Quality Assurance' },
      { name: 'Meera Joshi', role: 'Power Systems & Battery Management' }
    ],
    githubUrl: 'https://github.com/droneclub/sae-aerothon-2024',
    demoUrl: 'https://youtube.com/watch?v=demo-sae-2024',
    is_featured: true,
    display_order: 1
  },
  {
    title: 'Smart India Hackathon 2024',
    year: 2024,
    description: 'Smart India Hackathon 2024 focused on developing innovative drone solutions for smart city applications. Our team created an intelligent surveillance and monitoring system using swarm drone technology to address urban challenges like traffic management, emergency response, and environmental monitoring.',
    teamContributions: 'A diverse team of 6 members collaborated to create this comprehensive solution. The backend team developed cloud-based analytics and real-time data processing systems. The frontend team created an intuitive dashboard for city administrators to monitor drone operations. The hardware team designed modular drone units with specialized sensors for different monitoring tasks. The AI team implemented machine learning algorithms for pattern recognition and predictive analytics. The networking team ensured seamless communication between drone swarms and central control systems.',
    imageUrl: 'https://images.unsplash.com/photo-1551808525-51a94da548ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: 'Innovation',
    status: 'Completed',
    technologies: ['React.js', 'Node.js', 'MongoDB', 'TensorFlow', 'AWS IoT', 'Real-time Analytics', 'Swarm Intelligence', 'Edge Computing'],
    teamMembers: [
      { name: 'Aditi Verma', role: 'Full-Stack Development Lead' },
      { name: 'Rohan Agarwal', role: 'AI/ML Specialist' },
      { name: 'Kavya Nair', role: 'IoT Systems & Networking' },
      { name: 'Harsh Pandey', role: 'Cloud Architecture & DevOps' },
      { name: 'Ishita Malhotra', role: 'UI/UX Design & Frontend' },
      { name: 'Nikhil Reddy', role: 'Hardware Integration & Testing' }
    ],
    githubUrl: 'https://github.com/droneclub/smart-india-hackathon-2024',
    demoUrl: 'https://smart-city-drone-demo.netlify.app',
    is_featured: true,
    display_order: 2
  },
  {
    title: 'PIWOT 2025',
    year: 2025,
    description: 'PIWOT (Platform for Innovation in Water and Other Technologies) 2025 is an upcoming project focused on developing autonomous water quality monitoring drones for environmental conservation. The project aims to create a comprehensive system for real-time water body analysis and pollution detection.',
    teamContributions: 'Our planning phase involves a multidisciplinary team of 10 members working on different aspects of the project. The research team is conducting literature review and feasibility studies for water quality sensors and waterproof drone designs. The design team is creating preliminary CAD models and simulations for amphibious drone capabilities. The electronics team is evaluating sensor packages for pH, turbidity, dissolved oxygen, and chemical pollutant detection. The software team is planning autonomous navigation systems for water surface operations. The environmental team is studying regulatory requirements and environmental impact assessments.',
    imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: 'Research',
    status: 'Planning',
    technologies: ['Waterproof Design', 'Environmental Sensors', 'Autonomous Navigation', 'Data Analytics', 'IoT Integration', 'Solar Power'],
    teamMembers: [
      { name: 'Dr. Rajesh Kumar', role: 'Project Supervisor & Research Guide' },
      { name: 'Siddharth Jain', role: 'Project Coordinator' },
      { name: 'Pooja Reddy', role: 'Environmental Systems Research' },
      { name: 'Aryan Singh', role: 'Waterproof Electronics Design' },
      { name: 'Tanvi Sharma', role: 'Sensor Integration Specialist' },
      { name: 'Gaurav Mishra', role: 'Autonomous Navigation Systems' },
      { name: 'Riya Kapoor', role: 'Data Analytics & Visualization' },
      { name: 'Abhishek Gupta', role: 'Power Systems & Solar Integration' },
      { name: 'Shreya Patel', role: 'Regulatory Compliance & Documentation' },
      { name: 'Rohit Kumar', role: 'Testing & Validation Planning' }
    ],
    githubUrl: '',
    demoUrl: '',
    is_featured: false,
    display_order: 3
  },
  {
    title: 'DIPEX 2025',
    year: 2025,
    description: 'DIPEX (Defense Innovation and Product Exhibition) 2025 represents our ambitious venture into defense technology applications. This project focuses on developing tactical reconnaissance drones with advanced stealth capabilities, encrypted communication systems, and mission-critical reliability for defense applications.',
    teamContributions: 'The project involves a specialized team of 12 members with security clearances and expertise in defense technologies. The aerodynamics team is researching stealth design principles and radar-absorbing materials. The communications team is developing encrypted, jam-resistant communication protocols. The surveillance team is integrating high-resolution cameras with night vision and thermal imaging capabilities. The propulsion team is working on silent motor systems for covert operations. The cybersecurity team ensures all systems are hardened against electronic warfare. Each member undergoes specialized training in defense protocols and security procedures.',
    imageUrl: 'https://images.unsplash.com/photo-1516948884668-bb2f7b8f8b42?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    category: 'Commercial',
    status: 'In Progress',
    technologies: ['Stealth Technology', 'Encrypted Communications', 'Thermal Imaging', 'Night Vision', 'Electronic Warfare Countermeasures', 'Silent Propulsion'],
    teamMembers: [
      { name: 'Col. Amit Sharma (Retd.)', role: 'Defense Consultant & Strategic Advisor' },
      { name: 'Aakash Verma', role: 'Project Lead & Systems Integration' },
      { name: 'Neha Singh', role: 'Stealth Design & Materials Engineering' },
      { name: 'Vijay Krishnan', role: 'Encrypted Communications Lead' },
      { name: 'Deepika Rao', role: 'Surveillance Systems Specialist' },
      { name: 'Manish Agarwal', role: 'Cybersecurity & Electronic Warfare' },
      { name: 'Priyanka Mehta', role: 'Silent Propulsion Systems' },
      { name: 'Ankit Sharma', role: 'Thermal & Night Vision Integration' },
      { name: 'Ravi Patel', role: 'Flight Control & Autonomous Operations' },
      { name: 'Swati Gupta', role: 'Quality Assurance & Testing' },
      { name: 'Yash Kumar', role: 'Technical Documentation & Compliance' },
      { name: 'Kritika Joshi', role: 'Research & Development Coordination' }
    ],
    githubUrl: '',
    demoUrl: '',
    is_featured: true,
    display_order: 4
  }
]

// Seed projects
const seedProjects = async () => {
  try {
    console.log('🌱 Starting project seeding...')

    // Get the first admin as the creator
    const admin = await Admin.findOne()
    if (!admin) {
      console.log('⚠️ No admin found, creating projects without admin reference')
    }

    // Clear existing projects
    await Project.deleteMany({})
    console.log('🗑️ Cleared existing projects')

    // Add admin reference to projects if admin exists
    const projectsWithAdmin = defaultProjects.map(project => ({
      ...project,
      created_by: admin?._id || null
    }))

    // Insert new projects
    const insertedProjects = await Project.insertMany(projectsWithAdmin)
    console.log(`✅ Successfully seeded ${insertedProjects.length} projects:`)
    
    insertedProjects.forEach((project, index) => {
      console.log(`   ${index + 1}. ${project.title} (${project.year}) - ${project.status}`)
    })

    console.log('\n📊 Project Statistics:')
    console.log(`   • Total Projects: ${insertedProjects.length}`)
    console.log(`   • Featured Projects: ${insertedProjects.filter(p => p.is_featured).length}`)
    console.log(`   • Completed: ${insertedProjects.filter(p => p.status === 'Completed').length}`)
    console.log(`   • In Progress: ${insertedProjects.filter(p => p.status === 'In Progress').length}`)
    console.log(`   • Planning: ${insertedProjects.filter(p => p.status === 'Planning').length}`)

    console.log('\n🎯 Categories:')
    const categories = [...new Set(insertedProjects.map(p => p.category))]
    categories.forEach(category => {
      const count = insertedProjects.filter(p => p.category === category).length
      console.log(`   • ${category}: ${count} project${count !== 1 ? 's' : ''}`)
    })

  } catch (error) {
    console.error('❌ Error seeding projects:', error)
    throw error
  }
}

// Main seeding function
const main = async () => {
  try {
    await connectDB()
    await seedProjects()
    console.log('\n🎉 Project seeding completed successfully!')
  } catch (error) {
    console.error('❌ Seeding failed:', error)
  } finally {
    await mongoose.connection.close()
    console.log('📁 Database connection closed')
    process.exit(0)
  }
}

// Run the seeding script
main()

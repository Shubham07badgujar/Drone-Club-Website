import mongoose from 'mongoose'
import dotenv from 'dotenv'
import {
  Project,
  Event,
  Blog,
  Achievement,
  TeamMember,
  Department,
  Admin
} from '../src/models/mongodb/index.js'

dotenv.config()

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || process.env.MONGODB_ATLAS_URI

    if (!mongoURI) {
      throw new Error('MongoDB connection string not found. Please set MONGODB_URI in your .env file.')
    }

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log('MongoDB connected successfully')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    process.exit(1)
  }
}

const seedData = async () => {
  try {
    // Clear existing data
    await Promise.all([
      Project.deleteMany({}),
      Event.deleteMany({}),
      Blog.deleteMany({}),
      Achievement.deleteMany({}),
      TeamMember.deleteMany({}),
      Department.deleteMany({}),
      Admin.deleteMany({})
    ])

    console.log('Cleared existing data...')

    // Seed Projects
    const projects = await Project.create([
      {
        title: 'Autonomous Racing Drone',
        description: 'High-speed autonomous racing drone with advanced computer vision and machine learning capabilities for obstacle detection and path optimization.',
        technologies: ['Python', 'OpenCV', 'TensorFlow', 'ROS', 'ArduPilot'],
        status: 'in-progress',
        github_url: 'https://github.com/droneclub/racing-drone',
        team_members: ['Alex Johnson', 'Sarah Chen', 'Mike Rodriguez'],
        is_featured: true
      },
      {
        title: 'Search and Rescue Quadcopter',
        description: 'Emergency response drone equipped with thermal imaging, GPS tracking, and real-time communication systems for search and rescue operations.',
        technologies: ['C++', 'FLIR SDK', 'GPS', 'Radio Communication'],
        status: 'completed',
        demo_url: 'https://demo.droneclub.com/search-rescue',
        team_members: ['Emily Davis', 'John Park'],
        is_featured: true
      },
      {
        title: 'Agricultural Monitoring System',
        description: 'Multi-rotor drone system for precision agriculture with crop health monitoring, pest detection, and automated irrigation control.',
        technologies: ['Node.js', 'IoT Sensors', 'Machine Learning', 'MongoDB'],
        status: 'planning',
        team_members: ['Lisa Wang', 'David Kim']
      }
    ])

    // Seed Events
    const events = await Event.create([
      {
        title: 'Drone Racing Championship 2025',
        description: 'Annual inter-college drone racing competition featuring autonomous and manual flight categories.',
        date: new Date('2025-10-15'),
        time: '10:00 AM',
        location: 'University Stadium',
        max_capacity: 200,
        registration_count: 87,
        type: 'competition',
        is_featured: true
      },
      {
        title: 'Introduction to Drone Programming',
        description: 'Beginner-friendly workshop covering basics of drone programming using Python and ArduPilot.',
        date: new Date('2025-09-20'),
        time: '2:00 PM',
        location: 'Engineering Lab 301',
        max_capacity: 30,
        registration_count: 25,
        type: 'workshop'
      },
      {
        title: 'AI in Autonomous Flight Systems',
        description: 'Technical seminar on implementing artificial intelligence in autonomous drone navigation and decision-making.',
        date: new Date('2025-11-05'),
        time: '4:00 PM',
        location: 'Conference Hall A',
        max_capacity: 100,
        registration_count: 45,
        type: 'seminar',
        organizers: ['Dr. Sarah Johnson', 'Prof. Michael Chen']
      }
    ])

    // Seed Blogs
    const blogs = await Blog.create([
      {
        title: 'Building Your First FPV Racing Drone',
        content: 'First-person view (FPV) racing has revolutionized the drone industry, combining high-speed flight with immersive piloting experiences. In this comprehensive guide, we\'ll walk through every step of building your first FPV racing drone from scratch...',
        author: 'Alex Thompson',
        excerpt: 'Learn how to build a high-performance FPV racing drone with our step-by-step guide covering everything from frame selection to flight controller configuration.',
        tags: ['fpv', 'racing', 'diy', 'tutorial'],
        published: true,
        category: 'tutorial',
        read_time: 12
      },
      {
        title: 'The Future of Autonomous Delivery Drones',
        content: 'Autonomous delivery drones are poised to transform logistics and last-mile delivery services. Recent advances in computer vision, AI navigation, and battery technology have brought us closer to widespread commercial deployment...',
        author: 'Dr. Maria Rodriguez',
        excerpt: 'Exploring the technological advances and regulatory challenges shaping the future of autonomous drone delivery systems.',
        tags: ['autonomous', 'delivery', 'ai', 'commercial'],
        published: true,
        category: 'technology',
        read_time: 8
      },
      {
        title: 'Drone Photography: Capturing the Perfect Shot',
        content: 'Aerial photography has opened up entirely new perspectives for photographers and filmmakers. With the right techniques and equipment, drones can capture stunning visuals that were once only possible with expensive helicopter shots...',
        author: 'Jennifer Lee',
        excerpt: 'Master the art of aerial photography with professional tips for composition, camera settings, and flight planning.',
        tags: ['photography', 'aerial', 'cinematography'],
        published: true,
        category: 'tutorial',
        read_time: 15
      }
    ])

    // Seed Achievements
    const achievements = await Achievement.create([
      {
        title: 'First Place - National Drone Racing Championship',
        description: 'Our racing team secured first place in the National Collegiate Drone Racing Championship, competing against 50+ universities nationwide.',
        date: new Date('2024-12-10'),
        type: 'competition',
        category: 'technical',
        position: '1st Place',
        organizer: 'National Drone Racing Association',
        team_members: ['Alex Johnson', 'Sarah Chen', 'Mike Rodriguez'],
        level: 'national',
        is_featured: true,
        points: 100
      },
      {
        title: 'Innovation Award - Tech Expo 2024',
        description: 'Recognition for innovative search and rescue drone system featuring advanced thermal imaging and AI-powered object detection.',
        date: new Date('2024-11-15'),
        type: 'award',
        category: 'innovation',
        position: 'Innovation Award',
        organizer: 'International Technology Expo',
        team_members: ['Emily Davis', 'John Park'],
        level: 'international',
        points: 85
      },
      {
        title: 'Best Student Project - Engineering Fair',
        description: 'Agricultural monitoring drone project recognized as the best student engineering project for its practical application and technical excellence.',
        date: new Date('2024-10-20'),
        type: 'recognition',
        category: 'academic',
        position: 'Best Project',
        organizer: 'University Engineering Department',
        team_members: ['Lisa Wang', 'David Kim'],
        level: 'local',
        points: 60
      }
    ])

    // Seed Team Members
    const teamMembers = await TeamMember.create([
      {
        name: 'Alex Johnson',
        email: 'alex.johnson@university.edu',
        role: 'president',
        department: 'Aerospace Engineering',
        year: '4th',
        bio: 'Passionate about autonomous flight systems and drone racing. Leading the club\'s racing team to national competitions.',
        skills: ['Python', 'C++', 'ArduPilot', 'Computer Vision', 'Flight Control Systems'],
        social_links: {
          linkedin: 'https://linkedin.com/in/alexjohnson',
          github: 'https://github.com/alexjohnson'
        }
      },
      {
        name: 'Sarah Chen',
        email: 'sarah.chen@university.edu',
        role: 'technical-lead',
        department: 'Computer Science',
        year: '3rd',
        bio: 'Specializing in AI and machine learning applications for autonomous drone navigation and obstacle detection.',
        skills: ['Machine Learning', 'TensorFlow', 'OpenCV', 'ROS', 'Python'],
        social_links: {
          linkedin: 'https://linkedin.com/in/sarahchen',
          github: 'https://github.com/sarahchen'
        }
      },
      {
        name: 'Emily Davis',
        email: 'emily.davis@university.edu',
        role: 'project-manager',
        department: 'Electrical Engineering',
        year: '4th',
        bio: 'Managing multiple drone projects with focus on embedded systems and sensor integration for practical applications.',
        skills: ['Embedded Systems', 'Sensor Integration', 'PCB Design', 'Project Management'],
        social_links: {
          linkedin: 'https://linkedin.com/in/emilydavis'
        }
      }
    ])

    // Seed Departments
    const departments = await Department.create([
      {
        name: 'Research & Development',
        description: 'Focus on cutting-edge drone technologies, autonomous systems, and innovative applications.',
        head: teamMembers[1]._id, // Sarah Chen
        members: [teamMembers[0]._id, teamMembers[1]._id],
        responsibilities: [
          'Research new drone technologies',
          'Develop autonomous flight systems',
          'Innovation and prototyping',
          'Technical documentation'
        ]
      },
      {
        name: 'Competition Team',
        description: 'Dedicated to drone racing competitions and technical challenges at regional and national levels.',
        head: teamMembers[0]._id, // Alex Johnson
        members: [teamMembers[0]._id, teamMembers[2]._id],
        responsibilities: [
          'Prepare for drone racing competitions',
          'Train team members',
          'Maintain racing equipment',
          'Represent club at events'
        ]
      }
    ])

    // Seed Admin (for testing)
    const admin = await Admin.create({
      name: 'Club Administrator',
      email: 'admin@droneclub.university.edu',
      password: 'DroneClub2025!', // This will be hashed automatically
      role: 'super-admin',
      permissions: ['read', 'write', 'delete', 'manage-users', 'manage-content', 'manage-events', 'manage-projects']
    })

    console.log('Seed data created successfully!')
    console.log(`Created ${projects.length} projects`)
    console.log(`Created ${events.length} events`)
    console.log(`Created ${blogs.length} blogs`)
    console.log(`Created ${achievements.length} achievements`)
    console.log(`Created ${teamMembers.length} team members`)
    console.log(`Created ${departments.length} departments`)
    console.log(`Created 1 admin user`)

  } catch (error) {
    console.error('Error seeding data:', error)
  }
}

const runSeed = async () => {
  await connectDB()
  await seedData()
  await mongoose.connection.close()
  console.log('Database seeding completed!')
  process.exit(0)
}

runSeed()

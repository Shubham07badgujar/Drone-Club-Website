import bcrypt from 'bcryptjs'
import { Admin, Project, Event, Blog, TeamMember, Department, Achievement } from '../src/models/index.js'
import sequelize from '../src/config/database.js'

const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...')

    // Sync database
    await sequelize.sync({ force: true })
    console.log('Database synced successfully')

    // Create admin user
    const hashedPassword = await bcrypt.hash('password123', 12)
    const admin = await Admin.create({
      email: 'admin@droneclub.com',
      password_hash: hashedPassword,
      role: 'super_admin',
    })
    console.log('Admin user created')

    // Create sample projects
    const projects = await Project.bulkCreate([
      {
        title: 'Autonomous Surveillance Drone',
        description: 'A fully autonomous drone capable of real-time surveillance and object detection using AI and computer vision technologies.',
        technologies: ['Python', 'OpenCV', 'TensorFlow', 'ROS', 'Arduino'],
        status: 'in-progress',
        media_url: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800',
      },
      {
        title: 'Racing Drone Championship',
        description: 'High-speed racing drone designed for competitive FPV racing with custom frame and optimized aerodynamics.',
        technologies: ['Carbon Fiber', 'FPV', 'ESC Programming', '3D Printing'],
        status: 'completed',
        media_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      },
      {
        title: 'Delivery Drone System',
        description: 'Developing a drone delivery system for small packages with GPS navigation and automated landing capabilities.',
        technologies: ['GPS', 'Raspberry Pi', 'Python', 'Computer Vision'],
        status: 'planning',
        media_url: 'https://images.unsplash.com/photo-1508444845599-5c89863b1db7?w=800',
      },
    ])
    console.log('Sample projects created')

    // Create sample events
    const events = await Event.bulkCreate([
      {
        title: 'Drone Building Workshop',
        description: 'Learn how to build your first drone from scratch. All materials and tools will be provided.',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
        time: '2:00 PM - 5:00 PM',
        location: 'Engineering Lab, Room 301',
        max_capacity: 20,
        registration_count: 8,
      },
      {
        title: 'FPV Racing Competition',
        description: 'Join our monthly FPV racing competition. Prizes for top 3 finishers!',
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from now
        time: '10:00 AM - 4:00 PM',
        location: 'University Sports Complex',
        max_capacity: 50,
        registration_count: 23,
      },
    ])
    console.log('Sample events created')

    // Create sample blog posts
    const blogs = await Blog.bulkCreate([
      {
        title: 'The Future of Drone Technology',
        content: 'Exploring the latest trends and innovations in unmanned aerial vehicles...',
        author: 'Alex Johnson',
        image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
        tags: ['Technology', 'Innovation', 'Future'],
        published: true,
      },
      {
        title: 'Safety Guidelines for Drone Flying',
        content: 'Essential safety tips every drone pilot should know before taking flight...',
        author: 'Sarah Davis',
        image_url: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=800',
        tags: ['Safety', 'Guidelines', 'Flying'],
        published: true,
      },
    ])
    console.log('Sample blog posts created')

    // Create sample team members
    const teamMembers = await TeamMember.bulkCreate([
      {
        name: 'Alex Johnson',
        role: 'President',
        bio: 'Passionate about drone technology and autonomous systems. Leading our club towards innovation.',
        department: 'Leadership',
        email: 'alex@droneclub.com',
        is_active: true,
      },
      {
        name: 'Sarah Davis',
        role: 'Technical Lead',
        bio: 'Expert in flight control systems and drone programming.',
        department: 'Software',
        email: 'sarah@droneclub.com',
        is_active: true,
      },
      {
        name: 'Mike Chen',
        role: 'Hardware Engineer',
        bio: 'Specializes in drone design and manufacturing.',
        department: 'Hardware',
        email: 'mike@droneclub.com',
        is_active: true,
      },
    ])
    console.log('Sample team members created')

    // Create sample departments
    const departments = await Department.bulkCreate([
      {
        name: 'Software Development',
        description: 'Focuses on flight control software, AI, and autonomous navigation systems.',
        icon: 'Code',
        color: 'blue',
        is_active: true,
      },
      {
        name: 'Hardware Engineering',
        description: 'Designs and builds custom drone frames, components, and electronics.',
        icon: 'Cpu',
        color: 'green',
        is_active: true,
      },
      {
        name: 'Flight Operations',
        description: 'Manages flight training, safety protocols, and pilot certification.',
        icon: 'Plane',
        color: 'purple',
        is_active: true,
      },
      {
        name: 'Research & Development',
        description: 'Conducts cutting-edge research in drone technology and applications.',
        icon: 'Search',
        color: 'orange',
        is_active: true,
      },
    ])
    console.log('Sample departments created')

    // Create sample achievements
    const achievements = await Achievement.bulkCreate([
      {
        title: 'First Place - National Drone Competition',
        description: 'Our team won first place in the national autonomous drone competition.',
        type: 'competition',
        category: 'Autonomous Systems',
        position: '1st Place',
        organizer: 'National Drone Association',
        date: new Date('2023-10-15'),
        team_members: ['Alex Johnson', 'Sarah Davis', 'Mike Chen'],
        is_featured: true,
      },
      {
        title: 'Innovation Award - Tech Expo 2023',
        description: 'Received innovation award for our delivery drone prototype.',
        type: 'award',
        category: 'Innovation',
        organizer: 'Tech Expo',
        date: new Date('2023-08-20'),
        team_members: ['Sarah Davis', 'Mike Chen'],
        is_featured: false,
      },
    ])
    console.log('Sample achievements created')

    console.log('Database seeding completed successfully!')
    process.exit(0)
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()

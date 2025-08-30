import mongoose from 'mongoose'
import { TeamYear } from '../src/models/mongodb/index.js'
import connectMongoDB from '../src/config/mongodb.js'

// Sample team data
const sampleTeamData = [
  {
    year: 2025,
    description: "Current Team - Innovation & Growth",
    isActive: true,
    members: [
      {
        name: "Alex Johnson",
        role: "President",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        linkedin: "https://linkedin.com/in/alexjohnson",
        github: "https://github.com/alexjohnson",
        otherLinks: [
          { name: "Portfolio", url: "https://alexjohnson.dev" }
        ],
        order: 0
      },
      {
        name: "Sarah Chen",
        role: "Technical Lead",
        photo: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400&h=400&fit=crop&crop=face",
        linkedin: "https://linkedin.com/in/sarahchen",
        github: "https://github.com/sarahchen",
        otherLinks: [],
        order: 1
      },
      {
        name: "Michael Rodriguez",
        role: "Hardware Engineer",
        photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
        linkedin: "https://linkedin.com/in/michaelrodriguez",
        github: "https://github.com/mrodriguez",
        otherLinks: [],
        order: 2
      },
      {
        name: "Emily Zhang",
        role: "Software Developer",
        photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
        linkedin: "https://linkedin.com/in/emilyzhang",
        github: "https://github.com/emilyzhang",
        otherLinks: [
          { name: "Blog", url: "https://emily-tech-blog.com" }
        ],
        order: 3
      },
      {
        name: "David Kumar",
        role: "Treasurer",
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
        linkedin: "https://linkedin.com/in/davidkumar",
        github: "https://github.com/dkumar",
        otherLinks: [],
        order: 4
      },
      {
        name: "Lisa Thompson",
        role: "Secretary",
        photo: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400&h=400&fit=crop&crop=face",
        linkedin: "https://linkedin.com/in/lisathompson",
        github: "https://github.com/lisathompson",
        otherLinks: [],
        order: 5
      }
    ]
  },
  {
    year: 2024,
    description: "Championship Year - National Competition Winners",
    isActive: true,
    members: [
      {
        name: "Robert Wilson",
        role: "President",
        photo: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=400&h=400&fit=crop&crop=face",
        linkedin: "https://linkedin.com/in/robertwilson",
        github: "https://github.com/rwilson",
        otherLinks: [],
        order: 0
      },
      {
        name: "Jennifer Martinez",
        role: "Vice President",
        photo: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face",
        linkedin: "https://linkedin.com/in/jennifermartinez",
        github: "https://github.com/jmartinez",
        otherLinks: [],
        order: 1
      },
      {
        name: "Andrew Park",
        role: "Technical Lead",
        photo: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=400&h=400&fit=crop&crop=face",
        linkedin: "https://linkedin.com/in/andrewpark",
        github: "https://github.com/apark",
        otherLinks: [
          { name: "Research", url: "https://andrewpark-research.com" }
        ],
        order: 2
      },
      {
        name: "Maria Gonzales",
        role: "Competition Manager",
        photo: "https://images.unsplash.com/photo-1531123414780-f74242c2b052?w=400&h=400&fit=crop&crop=face",
        linkedin: "https://linkedin.com/in/mariagonzales",
        github: "https://github.com/mgonzales",
        otherLinks: [],
        order: 3
      }
    ]
  },
  {
    year: 2023,
    description: "Founding Year - Building the Foundation",
    isActive: true,
    members: [
      {
        name: "Thomas Anderson",
        role: "Founding President",
        photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
        linkedin: "https://linkedin.com/in/thomasanderson",
        github: "https://github.com/tanderson",
        otherLinks: [
          { name: "LinkedIn", url: "https://linkedin.com/in/thomasanderson" },
          { name: "Personal Site", url: "https://thomasanderson.tech" }
        ],
        order: 0
      },
      {
        name: "Jessica Lee",
        role: "Co-Founder",
        photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
        linkedin: "https://linkedin.com/in/jessicalee",
        github: "https://github.com/jlee",
        otherLinks: [],
        order: 1
      },
      {
        name: "Ryan O'Connor",
        role: "Technical Co-Founder",
        photo: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=400&fit=crop&crop=face",
        linkedin: "https://linkedin.com/in/ryanoconnor",
        github: "https://github.com/roconnor",
        otherLinks: [],
        order: 2
      }
    ]
  }
]

const seedTeamData = async () => {
  try {
    console.log('🌱 Starting team data seeding...')
    
    // Connect to MongoDB
    await connectMongoDB()
    console.log('✅ Connected to MongoDB')

    // Clear existing team data
    await TeamYear.deleteMany({})
    console.log('🗑️  Cleared existing team data')

    // Insert sample data
    const createdTeams = await TeamYear.insertMany(sampleTeamData)
    console.log(`✅ Created ${createdTeams.length} team years with sample data`)

    // Display summary
    for (const team of createdTeams) {
      console.log(`   📅 ${team.year}: ${team.members.length} members - ${team.description}`)
    }

    console.log('🎉 Team data seeding completed successfully!')
    
  } catch (error) {
    console.error('❌ Error seeding team data:', error)
  } finally {
    await mongoose.connection.close()
    console.log('🔐 Database connection closed')
  }
}

// Run the seeding function
seedTeamData()

import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Event from '../src/models/mongodb/Event.js'

dotenv.config()

// New events data as per requirements
const eventsData = [
  {
    eventName: "Dronathon 2.0",
    description: "National-level drone competition with obstacle courses testing precision, agility, and engineering innovation.",
    highlights: [
      "A live obstacle course designed to test aerial maneuvering skills.",
      "Open to individuals and teams from schools, colleges, universities, and vocational institutes.",
      "Hands-on exposure to real-world UAV challenges.",
      "Opportunity to connect with drone innovators and showcase technical expertise."
    ],
    date: new Date("2025-03-26T10:00:00Z"),
    time: "10:00 AM",
    venue: "Civil Department, GCOEJ",
    registrationFee: "Rs. 500/-",
    registrationDeadline: new Date("2025-03-24T23:59:59Z"),
    prizePool: {
      total: 30000,
      firstPrize: 15000,
      secondPrize: 10000,
      thirdPrize: 5000
    },
    rules: [
      "Each match is played by one team at a time.",
      "Every team can have one drone only (max size: 80x80x80 cm).",
      "Teams may consist of individuals or groups from any institution.",
      "Judge's decision is final."
    ],
    contactPersons: [
      { name: "Aditya Badgujar", phone: "+91 9130334280" },
      { name: "Anuj Takote", phone: "+91 8605296971" },
      { name: "Ashutosh Tayde", phone: "+91 8080881443" }
    ],
    status: "Registration Open",
    category: "Competition",
    is_featured: true,
    is_public: true
  },
  {
    eventName: "AeroQuest",
    description: "National-level virtual drone flying competition using simulators and real transmitters.",
    highlights: [
      "Virtual drone racing using advanced simulators.",
      "Real transmitter-based control system, ensuring hands-on piloting experience.",
      "Focused on skill, reaction time, and decision-making.",
      "Affordable entry with a chance to win big!"
    ],
    date: new Date("2025-03-27T10:00:00Z"),
    time: "10:00 AM",
    venue: "Drone Club, GCOEJ",
    registrationFee: "Rs. 70/-",
    prizePool: {
      total: 8000
    },
    contactPersons: [
      { name: "Aditya Badgujar", phone: "+91 9130334280" },
      { name: "Pranjal Sonawane", phone: "+91 8788654074" },
      { name: "Kaushal Raut", phone: "+91 8080334667" },
      { name: "Shubham Badgujar", phone: "+91 9511974562" }
    ],
    status: "Registration Open",
    category: "Competition",
    is_featured: true,
    is_public: true
  }
]

// Function to seed events data
export const seedNewEvents = async () => {
  try {
    console.log('🌱 Starting to seed new events data...')
    
    // Clear existing events
    await Event.deleteMany({})
    console.log('✅ Cleared existing events')
    
    // Insert new events
    const createdEvents = await Event.insertMany(eventsData)
    console.log(`✅ Successfully seeded ${createdEvents.length} events`)
    
    // Log created events
    createdEvents.forEach((event, index) => {
      console.log(`${index + 1}. ${event.eventName} (ID: ${event._id})`)
      console.log(`   Date: ${event.formattedDate}`)
      console.log(`   Fee: ${event.formattedFee}`)
      console.log(`   Venue: ${event.venue}`)
      console.log(`   Prize Pool: ₹${event.prizePool?.total?.toLocaleString('en-IN') || 'TBD'}`)
      console.log('')
    })
    
    return createdEvents
  } catch (error) {
    console.error('❌ Error seeding events:', error)
    throw error
  }
}

// Main execution function
const main = async () => {
  try {
    console.log('🚀 Starting event seeding process...')
    
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/drone-club'
    console.log('🔗 Connecting to MongoDB:', mongoUri.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@'))
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('✅ Connected to MongoDB')
    
    // Seed events
    await seedNewEvents()
    
    console.log('🎉 Event seeding completed successfully!')
  } catch (error) {
    console.error('💥 Seeding failed:', error)
    process.exit(1)
  } finally {
    // Close connection
    await mongoose.connection.close()
    console.log('🔌 Disconnected from MongoDB')
    process.exit(0)
  }
}

// Run the seeding if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}

// Always run main for now
main()

export default seedNewEvents

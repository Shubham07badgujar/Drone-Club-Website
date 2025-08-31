import mongoose from 'mongoose'
import Event from '../src/models/Event.js'

// Comprehensive event data for Team Third Axis
const eventsData = [
  {
    title: "Dronathon 2.0",
    description: "The ultimate drone competition featuring multiple challenges and categories for drone enthusiasts of all levels. Join us for an exciting day of innovation, competition, and learning. Participants will compete in various categories including racing, freestyle, and technical challenges.",
    details: {
      date: new Date("2024-12-15T09:00:00Z"),
      time: "09:00 AM - 06:00 PM",
      venue: "Tech Innovation Center, Main Campus Auditorium",
      registrationFee: 500,
      registrationDeadline: new Date("2024-12-10T23:59:59Z")
    },
    highlights: [
      "Multiple competition categories including Racing, Freestyle, and Technical challenges",
      "Cash prizes worth ₹50,000 across all categories",
      "Expert judges from leading drone companies and research institutions",
      "Networking opportunities with industry professionals and fellow enthusiasts",
      "Certificate of participation for all registered participants",
      "Live streaming of competitions for remote viewers",
      "Drone technology exhibition showcasing latest innovations",
      "Workshop sessions by industry experts during breaks"
    ],
    prizePool: {
      first: 25000,
      second: 15000,
      third: 10000,
      total: 50000
    },
    rules: [
      "Teams can have a maximum of 4 members, but individual participation is also allowed",
      "All drones must be registered and inspected before the competition begins",
      "Safety gear including safety glasses and appropriate clothing is mandatory for all participants",
      "No modifications or repairs allowed on drones during the competition day",
      "All participants must attend the mandatory safety briefing session",
      "Drones must comply with weight and size restrictions as per category guidelines",
      "Use of autonomous flight modes is restricted in certain categories",
      "Judges' decisions will be final and binding for all competition results",
      "Any violation of safety protocols will result in immediate disqualification",
      "Participants are responsible for their own drone insurance and liability"
    ],
    contacts: [
      {
        name: "Arjun Sharma",
        phone: "+91-9876543210",
        email: "arjun@teamthirdaxis.com"
      },
      {
        name: "Priya Patel",
        phone: "+91-9876543211",
        email: "priya@teamthirdaxis.com"
      },
      {
        name: "Rahul Verma",
        phone: "+91-9876543215",
        email: "rahul@teamthirdaxis.com"
      }
    ],
    maxCapacity: 100,
    imageUrl: "https://images.unsplash.com/photo-1508614999368-9260051292e5?w=600&h=400&fit=crop",
    category: "Competition",
    isFeatured: true,
    status: "Active"
  },
  {
    title: "AeroQuest: Drone Workshop Series",
    description: "Comprehensive workshop series covering drone assembly, programming, and flight operations. Perfect for beginners and intermediate enthusiasts looking to dive deep into drone technology. This intensive workshop will cover everything from basic components to advanced programming concepts.",
    details: {
      date: new Date("2024-12-22T10:00:00Z"),
      time: "10:00 AM - 04:00 PM",
      venue: "Engineering Lab Block, Room 301-303",
      registrationFee: 1000,
      registrationDeadline: new Date("2024-12-18T23:59:59Z")
    },
    highlights: [
      "Hands-on drone assembly workshop with expert guidance",
      "Programming sessions using Arduino and Raspberry Pi platforms",
      "Flight simulation training using professional software",
      "Industry expert instructors with years of practical experience",
      "Take-home mini drone kit worth ₹2000 for all participants",
      "Access to online learning resources and video tutorials",
      "Certificate of completion from Team Third Axis",
      "Networking session with fellow drone enthusiasts and professionals"
    ],
    prizePool: null,
    rules: [
      "Participants must bring their own laptops with minimum 4GB RAM and Windows/Linux OS",
      "Basic programming knowledge in C/C++ or Python is recommended but not mandatory",
      "All drone components, tools, and materials will be provided during the workshop",
      "Workshop duration is 6 hours with scheduled breaks and networking sessions",
      "Participants will receive a certificate of completion upon successful attendance",
      "Mobile phones should be kept on silent mode during technical sessions",
      "Participants are encouraged to ask questions and engage in hands-on activities",
      "Photography and video recording are allowed for personal use only",
      "All safety guidelines must be followed during practical sessions",
      "Workshop materials and handouts will be provided in digital format"
    ],
    contacts: [
      {
        name: "Rohit Kumar",
        phone: "+91-9876543212",
        email: "rohit@teamthirdaxis.com"
      },
      {
        name: "Sneha Reddy",
        phone: "+91-9876543213",
        email: "sneha@teamthirdaxis.com"
      }
    ],
    maxCapacity: 30,
    imageUrl: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=600&h=400&fit=crop",
    category: "Workshop",
    isFeatured: true,
    status: "Active"
  },
  {
    title: "Drone Safety & Regulations Seminar",
    description: "Essential seminar covering drone safety protocols, legal regulations, and best practices for responsible drone operation in Indian airspace.",
    details: {
      date: new Date("2024-11-30T14:00:00Z"),
      time: "02:00 PM - 05:00 PM",
      venue: "Main Auditorium, Academic Block A",
      registrationFee: 0,
      registrationDeadline: new Date("2024-11-25T23:59:59Z")
    },
    highlights: [
      "Latest DGCA regulations and compliance requirements",
      "Safety protocols for different types of drone operations",
      "Insurance and liability considerations",
      "Guest speakers from aviation authority",
      "Q&A session with regulatory experts"
    ],
    rules: [
      "Free attendance for all registered members",
      "Professional attire recommended",
      "Notebooks and pens will be provided",
      "Certificate of attendance will be issued",
      "Photography allowed during designated sessions only"
    ],
    contacts: [
      {
        name: "Kavya Singh",
        phone: "+91-9876543214",
        email: "kavya@teamthirdaxis.com"
      }
    ],
    maxCapacity: 150,
    imageUrl: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=600&h=400&fit=crop",
    category: "Seminar",
    isFeatured: false,
    status: "Active"
  }
]

// Function to seed events data
export const seedEvents = async () => {
  try {
    console.log('🌱 Starting to seed events data...')
    
    // Clear existing events
    await Event.deleteMany({})
    console.log('✅ Cleared existing events')
    
    // Insert new events
    const createdEvents = await Event.insertMany(eventsData)
    console.log(`✅ Successfully seeded ${createdEvents.length} events`)
    
    // Log created events
    createdEvents.forEach((event, index) => {
      console.log(`${index + 1}. ${event.title} (ID: ${event._id})`)
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
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/drone-club', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('🔗 Connected to MongoDB')
    
    // Seed events
    await seedEvents()
    
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

export default seedEvents

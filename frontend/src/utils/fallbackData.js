// Fallback data for when API is not available
export const fallbackData = {
  projects: [
    {
      id: 1,
      _id: "proj_1",
      title: "Autonomous Surveillance Drone",
      description: "Advanced AI-powered drone for security and surveillance operations",
      image: "/api/placeholder/400/300",
      status: "active",
      technologies: ["AI", "Computer Vision", "GPS"],
      category: "Security",
      createdAt: "2024-01-15T10:00:00Z"
    },
    {
      id: 2,
      _id: "proj_2", 
      title: "Racing Drone Championship",
      description: "High-speed racing drone with advanced flight controls",
      image: "/api/placeholder/400/300",
      status: "completed",
      technologies: ["Carbon Fiber", "FPV", "Telemetry"],
      category: "Racing",
      createdAt: "2024-02-01T14:00:00Z"
    },
    {
      id: 3,
      _id: "proj_3",
      title: "Delivery Drone Network",
      description: "Commercial delivery system using autonomous drones",
      image: "/api/placeholder/400/300",
      status: "planning",
      technologies: ["Route Planning", "Logistics", "IoT"],
      category: "Commercial",
      createdAt: "2024-03-10T09:00:00Z"
    }
  ],
  
  events: [
    {
      _id: "event_1",
      id: "event_1",
      title: "Dronathon 2.0",
      description: "The ultimate drone competition featuring multiple challenges and categories for drone enthusiasts of all levels. Join us for an exciting day of innovation, competition, and learning.",
      details: {
        date: "2024-12-15T00:00:00Z",
        time: "09:00 AM",
        venue: "Tech Innovation Center, Main Campus",
        registrationFee: 500,
        registrationDeadline: "2024-12-10T23:59:59Z"
      },
      highlights: [
        "Multiple competition categories",
        "Cash prizes worth ₹50,000",
        "Expert judges from industry",
        "Networking opportunities",
        "Certificate for all participants"
      ],
      prizePool: {
        first: 25000,
        second: 15000,
        third: 10000,
        total: 50000
      },
      rules: [
        "Teams can have maximum 4 members",
        "All drones must be registered before the event",
        "Safety gear is mandatory for all participants",
        "No modifications allowed on the day of competition",
        "Judges' decision will be final"
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
        }
      ],
      maxCapacity: 100,
      imageUrl: "/api/placeholder/600/400",
      category: "Competition",
      isFeatured: true,
      status: "Active",
      createdAt: "2024-09-01T10:00:00Z"
    },
    {
      _id: "event_2",
      id: "event_2",
      title: "AeroQuest: Drone Workshop Series",
      description: "Comprehensive workshop series covering drone assembly, programming, and flight operations. Perfect for beginners and intermediate enthusiasts.",
      details: {
        date: "2024-12-22T00:00:00Z",
        time: "10:00 AM",
        venue: "Engineering Lab Block, Room 301",
        registrationFee: 1000,
        registrationDeadline: "2024-12-18T23:59:59Z"
      },
      highlights: [
        "Hands-on drone assembly",
        "Programming with Arduino/Raspberry Pi",
        "Flight simulation training",
        "Industry expert instructors",
        "Take-home mini drone kit"
      ],
      prizePool: null,
      rules: [
        "Participants must bring their laptops",
        "Basic programming knowledge recommended",
        "All materials and tools will be provided",
        "Workshop duration is 6 hours with breaks",
        "Certificate of completion provided"
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
      imageUrl: "/api/placeholder/600/400",
      category: "Workshop",
      isFeatured: true,
      status: "Active",
      createdAt: "2024-09-05T14:00:00Z"
    },
    {
      _id: "event_3",
      id: "event_3",
      title: "Drone Pilot Training",
      description: "Comprehensive training program for new drone pilots",
      details: {
        date: "2024-11-15T00:00:00Z",
        time: "14:00",
        venue: "Flight Training Center",
        registrationFee: 0,
        registrationDeadline: "2024-11-10T23:59:59Z"
      },
      highlights: [
        "Professional certification",
        "Hands-on flight experience",
        "Safety protocols training"
      ],
      maxCapacity: 20,
      registeredParticipants: 12,
      status: "Active",
      category: "Training",
      isFeatured: false
    },
    {
      _id: "event_4",
      id: "event_4",
      title: "Tech Talk: Future of Drones",
      description: "Expert discussion on emerging drone technologies",
      details: {
        date: "2024-11-25T00:00:00Z",
        time: "18:00",
        venue: "Innovation Hub",
        registrationFee: 0,
        registrationDeadline: "2024-11-20T23:59:59Z"
      },
      highlights: [
        "Industry experts",
        "Latest technology trends",
        "Q&A session"
      ],
      maxCapacity: 50,
      registeredParticipants: 28,
      status: "Active",
      category: "Seminar",
      isFeatured: false
    }
  ],
  
  blogs: [
    {
      id: 1,
      _id: "blog_1",
      title: "The Future of Autonomous Flight",
      excerpt: "Exploring the latest developments in AI-powered drone technology",
      content: "The future of autonomous flight is rapidly approaching...",
      author: "Alex Chen",
      createdAt: "2024-08-20T10:00:00Z",
      publishedAt: "2024-08-20",
      image: "/api/placeholder/600/400",
      imageUrl: "/api/placeholder/600/400",
      tags: ["AI", "Autonomy", "Future Tech"]
    },
    {
      id: 2,
      _id: "blog_2",
      title: "Drone Safety Best Practices",
      excerpt: "Essential safety guidelines for responsible drone operation",
      content: "Safety is paramount when operating drones...",
      author: "Sarah Johnson",
      createdAt: "2024-08-18T14:30:00Z",
      publishedAt: "2024-08-18",
      image: "/api/placeholder/600/400",
      imageUrl: "/api/placeholder/600/400",
      tags: ["Safety", "Guidelines", "Best Practices"]
    }
  ],
  
  achievements: [
    {
      id: 1,
      title: "National Drone Racing Champions",
      description: "First place in the National Collegiate Drone Racing Championship",
      date: "2024-06-15",
      type: "competition",
      image: "/api/placeholder/300/200",
      featured: true
    },
    {
      id: 2,
      title: "Innovation Award 2024",
      description: "Recognition for outstanding innovation in drone technology",
      date: "2024-05-20",
      type: "award",
      image: "/api/placeholder/300/200",
      featured: false
    }
  ]
}

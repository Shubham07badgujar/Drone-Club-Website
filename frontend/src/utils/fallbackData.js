// Fallback data for when API is not available
export const fallbackData = {
  projects: [
    {
      id: 1,
      title: "Autonomous Surveillance Drone",
      description: "Advanced AI-powered drone for security and surveillance operations",
      image: "/api/placeholder/400/300",
      status: "active",
      technologies: ["AI", "Computer Vision", "GPS"],
      category: "Security",
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      title: "Racing Drone Championship",
      description: "High-speed racing drone with advanced flight controls",
      image: "/api/placeholder/400/300",
      status: "completed",
      technologies: ["Carbon Fiber", "FPV", "Telemetry"],
      category: "Racing",
      createdAt: "2024-02-01"
    },
    {
      id: 3,
      title: "Delivery Drone Network",
      description: "Commercial delivery system using autonomous drones",
      image: "/api/placeholder/400/300",
      status: "planning",
      technologies: ["Route Planning", "Logistics", "IoT"],
      category: "Commercial",
      createdAt: "2024-03-10"
    }
  ],
  
  events: [
    {
      id: 1,
      title: "Drone Pilot Training",
      description: "Comprehensive training program for new drone pilots",
      date: "2024-09-15",
      time: "14:00",
      location: "Flight Training Center",
      maxParticipants: 20,
      registeredParticipants: 12,
      status: "upcoming"
    },
    {
      id: 2,
      title: "Tech Talk: Future of Drones",
      description: "Expert discussion on emerging drone technologies",
      date: "2024-09-25",
      time: "18:00",
      location: "Innovation Hub",
      maxParticipants: 50,
      registeredParticipants: 28,
      status: "upcoming"
    }
  ],
  
  blogs: [
    {
      id: 1,
      title: "The Future of Autonomous Flight",
      excerpt: "Exploring the latest developments in AI-powered drone technology",
      content: "The future of autonomous flight is rapidly approaching...",
      author: "Alex Chen",
      publishedAt: "2024-08-20",
      image: "/api/placeholder/600/400",
      tags: ["AI", "Autonomy", "Future Tech"]
    },
    {
      id: 2,
      title: "Drone Safety Best Practices",
      excerpt: "Essential safety guidelines for responsible drone operation",
      content: "Safety is paramount when operating drones...",
      author: "Sarah Johnson",
      publishedAt: "2024-08-18",
      image: "/api/placeholder/600/400",
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

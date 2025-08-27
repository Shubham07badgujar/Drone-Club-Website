import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Plane, Target, Users, Award, Zap, Cpu, Radio, Shield } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import ProjectCard from '../components/cards/ProjectCard'
import EventCard from '../components/cards/EventCard'
import BlogCard from '../components/cards/BlogCard'
import AchievementCard from '../components/cards/AchievementCard'
import FloatingDroneBackground from '../components/FloatingDrone'
import { ProfessionalDrone, RacingDrone, TechPattern, HolographicDisplay, EnergyOrb, RadarDisplay } from '../components/animations/DroneAnimations'
import { useProjects } from '../hooks/useProjects'
import { useEvents } from '../hooks/useEvents'
import { useBlogs } from '../hooks/useBlogs'
import { useAchievements } from '../hooks/useAchievements'

const Home = () => {
  const { projects } = useProjects()
  const { events } = useEvents()
  const { blogs } = useBlogs()
  const { achievements } = useAchievements()

  // Professional GCOEJ Drone Club stats
  const stats = [
    { icon: Plane, label: 'Active Drones', value: '15+', color: 'text-primary-400' },
    { icon: Users, label: 'Club Members', value: '85+', color: 'text-secondary-400' },
    { icon: Target, label: 'Missions Completed', value: '40+', color: 'text-accent-400' },
    { icon: Award, label: 'Achievements', value: '12+', color: 'text-drone-electric-400' },
    { icon: Cpu, label: 'AI Projects', value: '8+', color: 'text-drone-warning-400' },
    { icon: Radio, label: 'Flight Hours', value: '500+', color: 'text-primary-300' },
    { icon: Shield, label: 'Safety Record', value: '100%', color: 'text-drone-electric-500' },
  ]

  const latestProjects = projects.slice(0, 3)
  const upcomingEvents = events.filter(event => new Date(event.date) > new Date()).slice(0, 2)
  const recentBlogs = blogs.slice(0, 2)
  const highlightedAchievement = achievements[0]

  return (
    <div className="min-h-screen text-gray-100">
      {/* Professional Tech Background */}
      <TechPattern />
      
      {/* Floating Drone Background */}
      <FloatingDroneBackground />
      
      {/* Hero Section - GCOEJ Drone Club */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Professional animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-dark-950 via-dark-800 to-dark-700 opacity-95"></div>
          
          {/* Professional energy orbs */}
          <EnergyOrb className="absolute top-20 left-20 w-64 h-64 opacity-20" color="primary" />
          <EnergyOrb className="absolute bottom-32 right-16 w-48 h-48 opacity-15" color="secondary" />
          <EnergyOrb className="absolute top-1/2 left-1/3 w-32 h-32 opacity-25" color="accent" />
          
          {/* Professional radar display */}
          <RadarDisplay className="absolute top-10 right-10 w-32 h-32 opacity-30" />
        </div>
        
        {/* Professional floating drones */}
        <div className="absolute inset-0">
          <ProfessionalDrone className="absolute top-20 left-1/4 animate-drone-patrol opacity-40" size="w-24 h-24" color="text-primary-500" />
          <RacingDrone className="absolute bottom-40 right-1/4 animate-hover-drone opacity-30" size="w-16 h-16" color="text-secondary-500" />
          
          {/* Tech particles */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full animate-signal-pulse opacity-40 ${
                i % 3 === 0 ? 'w-1 h-1 bg-primary-500' :
                i % 3 === 1 ? 'w-1 h-1 bg-secondary-500' :
                'w-1 h-1 bg-accent-500'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        {/* Professional Hero Content */}
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
          <HolographicDisplay className="mb-8">
            <div className="mb-6">
              <ProfessionalDrone className="w-24 h-24 mx-auto text-primary-500 animate-hover-drone" />
            </div>
            
            <h1 className="hero-title font-bold text-white mb-6 animate-fadeIn">
              <span className="block text-glow text-4xl sm:text-6xl md:text-8xl">GCOEJ</span>
              <span className="block text-primary-500 text-glow text-2xl sm:text-4xl md:text-6xl">DRONE CLUB</span>
              <span className="block text-xs sm:text-sm md:text-lg font-normal text-gray-300 mt-4 tracking-widest animate-tech-glow">
                INNOVATE • ELEVATE • DOMINATE
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-4">
              Government College of Engineering Jalgaon's premier drone technology hub. 
              Where engineering excellence meets aerial innovation through cutting-edge research, 
              autonomous systems, and next-generation UAV development.
            </p>
          </HolographicDisplay>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12 sm:mb-16 px-4">
            <Link to="/projects">
              <button className="btn-primary group w-full sm:w-auto px-6 sm:px-8 py-4 text-base sm:text-lg">
                EXPLORE PROJECTS
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </Link>
            
            <Link to="/about">
              <button className="btn-secondary w-full sm:w-auto px-6 sm:px-8 py-4 text-base sm:text-lg">
                JOIN CLUB
              </button>
            </Link>
            
            <Link to="/events">
              <button className="btn-accent w-full sm:w-auto px-6 sm:px-8 py-4 text-base sm:text-lg">
                EVENTS
              </button>
            </Link>
          </div>

          {/* Professional Status Indicators */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs sm:text-sm max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-drone-electric-500 rounded-full animate-signal-pulse"></div>
              <span className="text-gray-400">SYSTEMS ONLINE</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-signal-pulse"></div>
              <span className="text-gray-400">DRONES ACTIVE</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-secondary-500 rounded-full animate-signal-pulse"></div>
              <span className="text-gray-400">RESEARCH ACTIVE</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-accent-500 rounded-full animate-signal-pulse"></div>
              <span className="text-gray-400">MISSION READY</span>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary-400 rounded-full p-1">
            <div className="w-1 h-3 bg-primary-400 rounded-full mx-auto animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Professional Stats Section */}
      <section className="py-12 sm:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HolographicDisplay>
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-8 sm:mb-12 text-glow">
              COMMAND CENTER STATUS
            </h2>
          </HolographicDisplay>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="card-drone p-4 sm:p-6 mb-4 hover:border-primary-400 transition-all duration-300">
                  <stat.icon className={`w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-4 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-2 text-glow">{stat.value}</div>
                  <div className="text-gray-400 text-xs sm:text-sm tracking-wide">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Projects Section */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8 sm:mb-12">
            <HolographicDisplay>
              <h2 className="text-3xl sm:text-4xl font-bold text-white text-glow mb-2">
                ACTIVE PROJECTS
              </h2>
              <p className="text-gray-400">Current research and development initiatives</p>
            </HolographicDisplay>
            <Link to="/projects">
              <button className="btn-secondary w-full sm:w-auto">
                <Zap className="w-4 h-4 mr-2" />
                ALL PROJECTS
              </button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {latestProjects.map((project) => (
              <div key={project.id} className="card-drone p-4 sm:p-6 hover:transform hover:-translate-y-2 transition-all duration-300 holographic">
                <ProjectCard
                  project={project}
                  onLearnMore={() => {}}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-effect-strong rounded-2xl p-12">
              <div className="flex items-center justify-between mb-12">
                <HolographicDisplay>
                  <h2 className="text-4xl font-bold text-white text-glow mb-2">UPCOMING EVENTS</h2>
                  <p className="text-gray-400">Training sessions and competitions</p>
                </HolographicDisplay>
                <Link to="/events">
                  <button className="btn-accent">VIEW SCHEDULE</button>
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="card-drone p-6 holographic">
                    <EventCard
                      event={event}
                      onRegister={() => {}}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Recent Blogs */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <HolographicDisplay>
              <h2 className="text-4xl font-bold text-white text-glow mb-2">MISSION REPORTS</h2>
              <p className="text-gray-400">Latest updates from the field</p>
            </HolographicDisplay>
            <Link to="/blog">
              <button className="btn-secondary">ALL REPORTS</button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recentBlogs.map((blog) => (
              <div key={blog.id} className="card-drone p-6 holographic">
                <BlogCard
                  blog={blog}
                  onReadMore={() => {}}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Achievement */}
      {highlightedAchievement && (
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-effect-strong rounded-2xl p-12 text-center">
              <HolographicDisplay>
                <h2 className="text-4xl font-bold text-white text-glow mb-8">LATEST ACHIEVEMENT</h2>
              </HolographicDisplay>
              
              <div className="card-drone p-8 holographic">
                <AchievementCard
                  achievement={highlightedAchievement}
                  featured={true}
                />
              </div>
              
              <Link to="/achievements">
                <button className="btn-primary mt-8">
                  VIEW ALL ACHIEVEMENTS
                </button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-effect-strong rounded-2xl p-12">
            <HolographicDisplay>
              <ProfessionalDrone className="w-16 h-16 mx-auto mb-6 text-primary-500 animate-hover-drone" />
              <h2 className="text-4xl font-bold text-white text-glow mb-6">JOIN GCOEJ DRONE CLUB</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Ready to soar to new heights? Join our elite team of drone engineers, 
                researchers, and pilots. Be part of the future of aerial technology.
              </p>
            </HolographicDisplay>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <button className="btn-primary group px-8 py-4 text-lg">
                  GET STARTED
                  <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                </button>
              </Link>
              
              <Link to="/about">
                <button className="btn-secondary px-8 py-4 text-lg">
                  LEARN MORE
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

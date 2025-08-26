import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Plane, Target, Users, Award, Zap } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import ProjectCard from '../components/cards/ProjectCard'
import EventCard from '../components/cards/EventCard'
import BlogCard from '../components/cards/BlogCard'
import AchievementCard from '../components/cards/AchievementCard'
import FloatingDroneBackground from '../components/FloatingDrone'
import { useProjects } from '../hooks/useProjects'
import { useEvents } from '../hooks/useEvents'
import { useBlogs } from '../hooks/useBlogs'
import { useAchievements } from '../hooks/useAchievements'

const Home = () => {
  const { projects } = useProjects()
  const { events } = useEvents()
  const { blogs } = useBlogs()
  const { achievements } = useAchievements()

  const stats = [
    { icon: Plane, label: 'Active Drones', value: '12+', color: 'text-red-400' },
    { icon: Users, label: 'Club Members', value: '50+', color: 'text-red-300' },
    { icon: Target, label: 'Missions Completed', value: '25+', color: 'text-red-500' },
    { icon: Award, label: 'Achievements', value: '8+', color: 'text-red-600' },
  ]

  const latestProjects = projects.slice(0, 3)
  const upcomingEvents = events.filter(event => new Date(event.date) > new Date()).slice(0, 2)
  const recentBlogs = blogs.slice(0, 2)
  const highlightedAchievement = achievements[0]

  return (
    <div className="min-h-screen text-gray-100">
      {/* Floating Drone Background */}
      <FloatingDroneBackground />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background with red glow effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-gray-800 opacity-90"></div>
          <div className="absolute top-20 left-20 w-64 h-64 bg-red-600 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
          <div className="absolute bottom-32 right-16 w-48 h-48 bg-red-500 rounded-full filter blur-3xl opacity-15 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-red-400 rounded-full filter blur-2xl opacity-20 animate-pulse delay-2000"></div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-red-500 rounded-full animate-bounce opacity-60"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 20}s`,
                animationDuration: `${15 + Math.random() * 10}s`
              }}
            ></div>
          ))}
        </div>
        
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <Plane className="w-24 h-24 mx-auto text-red-500 animate-bounce text-glow-strong" />
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 animate-fadeIn">
            <span className="block text-glow">DRONE</span>
            <span className="block text-red-500 text-glow-strong">MASTERS</span>
            <span className="block text-sm md:text-lg font-normal text-gray-300 mt-4 tracking-widest">
              UNMANNED • UNLIMITED • UNSTOPPABLE
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Master the skies with cutting-edge drone technology. Join elite pilots in aerial innovation, 
            autonomous flight systems, and next-generation unmanned missions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link to="/projects">
              <button className="btn-primary group px-8 py-4 text-lg">
                LAUNCH MISSION
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </Link>
            
            <Link to="/about">
              <button className="btn-secondary px-8 py-4 text-lg">
                INTEL BRIEFING
              </button>
            </Link>
          </div>

          {/* Mission Status Indicators */}
          <div className="flex justify-center space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-400">SYSTEMS ONLINE</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-gray-400">DRONES ACTIVE</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-gray-400">MISSION READY</span>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-red-500 rounded-full flex justify-center animate-bounce">
            <div className="w-1 h-3 bg-red-500 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats Section - Command Center */}
      <section className="py-20 relative">
        <div className="glass-effect-strong rounded-3xl max-w-7xl mx-auto px-8 py-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-60"></div>
          
          <h2 className="text-3xl font-bold text-center text-white mb-12 text-glow">COMMAND CENTER STATUS</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="card-drone p-6 mb-4 hover:border-red-400 transition-all duration-300">
                  <stat.icon className={`w-12 h-12 mx-auto mb-4 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
                  <div className="text-3xl font-bold text-white mb-2 text-glow">{stat.value}</div>
                  <div className="text-gray-400 text-sm tracking-wide">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Projects - Active Missions */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-white text-glow mb-2">ACTIVE MISSIONS</h2>
              <p className="text-gray-400">Current drone development projects</p>
            </div>
            <Link to="/projects">
              <button className="btn-secondary">
                <Zap className="w-4 h-4 mr-2" />
                ALL MISSIONS
              </button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestProjects.map((project) => (
              <div key={project.id} className="card-drone p-6 hover:transform hover:-translate-y-2 transition-all duration-300">
                <ProjectCard
                  project={project}
                  onLearnMore={() => {}}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events - Mission Briefings */}
      {upcomingEvents.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-effect rounded-2xl p-12">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="text-4xl font-bold text-white text-glow mb-2">MISSION BRIEFINGS</h2>
                  <p className="text-gray-400">Upcoming events and training sessions</p>
                </div>
                <Link to="/events">
                  <button className="btn-secondary">VIEW SCHEDULE</button>
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="card-drone p-6">
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

      {/* Recent Blogs - Intel Reports */}
      {recentBlogs.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-4xl font-bold text-white text-glow mb-2">INTEL REPORTS</h2>
                <p className="text-gray-400">Latest drone technology insights</p>
              </div>
              <Link to="/blog">
                <button className="btn-secondary">ALL REPORTS</button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {recentBlogs.map((blog) => (
                <div key={blog.id} className="card-drone p-6">
                  <BlogCard
                    blog={blog}
                    onReadMore={() => {}}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Highlighted Achievement */}
      {highlightedAchievement && (
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white text-glow mb-2">ELITE ACHIEVEMENT</h2>
              <p className="text-gray-400">Outstanding performance recognition</p>
            </div>
            
            <div className="card-drone p-8 max-w-lg mx-auto">
              <AchievementCard achievement={highlightedAchievement} />
            </div>
          </div>
        </section>
      )}

      {/* CTA Section - Recruitment */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-drone-red-600 to-drone-red-800 opacity-90"></div>
        <div className="absolute inset-0">
          <div className="absolute top-16 left-16 w-32 h-32 bg-white rounded-full filter blur-2xl opacity-10 animate-pulseGlow"></div>
          <div className="absolute bottom-16 right-16 w-48 h-48 bg-white rounded-full filter blur-3xl opacity-5 animate-pulseGlow delay-1000"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <Plane className="w-16 h-16 mx-auto text-white mb-8 animate-hoverDrone" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-glow-strong">
            READY FOR TAKEOFF?
          </h2>
          <p className="text-xl text-gray-100 mb-12 max-w-2xl mx-auto">
            Join the elite squadron of drone pilots and engineers. Shape the future of autonomous flight technology.
          </p>
          <Link to="/about">
            <button className="bg-white text-drone-red-600 px-12 py-4 text-lg font-bold rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
              ENLIST NOW
            </button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home

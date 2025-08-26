import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Rocket, Target, Users, Award } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import ProjectCard from '../components/cards/ProjectCard'
import EventCard from '../components/cards/EventCard'
import BlogCard from '../components/cards/BlogCard'
import AchievementCard from '../components/cards/AchievementCard'
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
    { icon: Rocket, label: 'Active Projects', value: '12+', color: 'text-blue-400' },
    { icon: Users, label: 'Club Members', value: '50+', color: 'text-green-400' },
    { icon: Target, label: 'Events Hosted', value: '25+', color: 'text-purple-400' },
    { icon: Award, label: 'Achievements', value: '8+', color: 'text-yellow-400' },
  ]

  const latestProjects = projects.slice(0, 3)
  const upcomingEvents = events.filter(event => new Date(event.date) > new Date()).slice(0, 2)
  const recentBlogs = blogs.slice(0, 2)
  const highlightedAchievement = achievements[0]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-90"></div>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-primary-400 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-2000"></div>
          <div className="absolute bottom-60 right-1/3 w-1 h-1 bg-primary-300 rounded-full animate-pulse delay-3000"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            <span className="block">Innovate.</span>
            <span className="block text-primary-400">Fly.</span>
            <span className="block">Explore.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto animate-slide-up">
            Join our community of drone enthusiasts and shape the future of unmanned aerial technology
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Link to="/projects">
              <Button size="lg" className="group">
                Explore Projects
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </Link>
            
            <Link to="/about">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-dark-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Projects */}
      <section className="py-16 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">Latest Projects</h2>
            <Link to="/projects">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onLearnMore={() => {}}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <section className="py-16 bg-dark-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">Upcoming Events</h2>
              <Link to="/events">
                <Button variant="outline">View All</Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onRegister={() => {}}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Blogs */}
      {recentBlogs.length > 0 && (
        <section className="py-16 bg-dark-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">Recent Blog Posts</h2>
              <Link to="/blog">
                <Button variant="outline">View All</Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentBlogs.map((blog) => (
                <BlogCard
                  key={blog.id}
                  blog={blog}
                  onReadMore={() => {}}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Highlighted Achievement */}
      {highlightedAchievement && (
        <section className="py-16 bg-dark-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">Featured Achievement</h2>
              <Link to="/achievements">
                <Button variant="outline">View All</Button>
              </Link>
            </div>
            
            <div className="max-w-md mx-auto">
              <AchievementCard achievement={highlightedAchievement} />
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Take Flight?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join our community and be part of the drone revolution
          </p>
          <Link to="/about">
            <Button size="lg" variant="secondary">
              Join the Club
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home

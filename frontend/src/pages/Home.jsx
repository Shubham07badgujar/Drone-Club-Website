import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Plane, Target, Users, Award, Zap, Cpu, Radio, Shield, FolderOpen, Calendar, CheckCircle, Clock, Rocket, Trophy, Code, Camera } from 'lucide-react'
import HeroBackground from '../components/animations/HeroBackground'

function Home() {
  const stats = [
    { icon: Users, label: 'Club Members', value: '60+', color: 'text-secondary-400' },
    { icon: Award, label: 'AIR Rank SAE 2024', value: '5th', color: 'text-primary-400' },
    { icon: Target, label: 'SIH 2024 Regional', value: '1st', color: 'text-accent-400' },
    { icon: Plane, label: 'National Comps', value: '2', color: 'text-primary-300' },
    { icon: Radio, label: 'State Comps', value: '2', color: 'text-secondary-300' },
    { icon: Cpu, label: 'SAE Aerothon', value: '2025', color: 'text-primary-400' },
  ]

  const achievements = [
    {
      title: 'SAE Aerothon 2024',
      description: 'Secured All India Rank (AIR) of 5 in Phase 1',
      icon: Award,
      color: 'from-primary-500 to-primary-700'
    },
    {
      title: 'Smart India Hackathon 2024',
      description: '1st rank at regional level for disaster management UAV',
      icon: Target,
      color: 'from-secondary-500 to-secondary-700'
    },
    {
      title: 'PIWOT 2024',
      description: 'Advanced drone technology for defense applications',
      icon: Shield,
      color: 'from-accent-500 to-accent-700'
    },
    {
      title: 'DIPEX 2025',
      description: 'Qualified for regional level in Defense & Cyber Security',
      icon: Cpu,
      color: 'from-orange-500 to-orange-700'
    }
  ]

  return (
    <div className="min-h-screen relative text-white overflow-hidden">
      {/* Dynamic Background */}
      <ModernBackground />
      
      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative py-20 px-4 md:px-8 lg:px-16 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <motion.h1 
                className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 bg-gradient-to-r from-orange-400 via-blue-400 to-purple-400 bg-clip-text text-transparent leading-tight"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                TEAM THIRD AXIS
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Government College of Engineering & Research, Avasari Pune
              </motion.p>
              
              <motion.p 
                className="text-lg md:text-xl text-gray-400 mb-12 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Pushing the boundaries of aerial robotics and autonomous systems. 
                Where innovation meets precision in the skies above.
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Link to="/projects">
                  <button className="btn-primary group">
                    <Rocket className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                    Explore Projects
                  </button>
                </Link>
                <Link to="/about">
                  <button className="btn-secondary group">
                    <Users className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                    Join Our Team
                  </button>
                </Link>
                <Link to="/events">
                  <button className="btn-accent group">
                    <Calendar className="w-5 h-5 mr-2 group-hover:pulse transition-transform" />
                    Events
                  </button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Status Badges */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <motion.div 
                className="status-badge bg-green-500/20 border-green-500/30 group cursor-pointer"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <CheckCircle className="w-6 h-6 text-green-400 group-hover:animate-pulse" />
                <span className="font-semibold">Active Development</span>
              </motion.div>
              
              <motion.div 
                className="status-badge bg-orange-500/20 border-orange-500/30 group cursor-pointer"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Clock className="w-6 h-6 text-orange-400 group-hover:animate-spin" />
                <span className="font-semibold">Competitions Ready</span>
              </motion.div>
              
              <motion.div 
                className="status-badge bg-blue-500/20 border-blue-500/30 group cursor-pointer"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Zap className="w-6 h-6 text-blue-400 group-hover:animate-bounce" />
                <span className="font-semibold">Innovation Hub</span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="card-drone p-8 md:p-12"
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  About Team Third Axis
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Official drone club of GCOEJ, pioneering UAV technology and autonomous systems
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="card-drone p-6 border-l-4 border-primary-500">
                    <h3 className="text-2xl font-bold text-primary-400 mb-4">Our Mission</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Team Third Axis is dedicated to advancing drone technology and UAV development. 
                      We focus on cutting-edge autonomous systems, providing students with hands-on 
                      experience in building, programming, and piloting advanced aerial vehicles.
                    </p>
                  </div>
                  
                  <div className="card-drone p-6 border-l-4 border-secondary-500">
                    <h3 className="text-2xl font-bold text-secondary-400 mb-4">Innovation Focus</h3>
                    <p className="text-gray-300 leading-relaxed">
                      We pioneer innovative solutions through engineering excellence and lead in 
                      drone technology research. Our team actively participates in national competitions 
                      and maintains a strong track record of achievements.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="space-y-6"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="card-drone p-6 border-l-4 border-accent-500">
                    <h3 className="text-2xl font-bold text-accent-400 mb-4">Our Impact</h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      With over 60 active members, we've organized multiple national and state-level 
                      drone competitions. Our achievements include securing AIR 5 in SAE Aerothon 2024 
                      and 1st place in Smart India Hackathon 2024 regional rounds.
                    </p>
                  </div>
                  
                  <div className="card-drone p-6 border-l-4 border-orange-500">
                    <h3 className="text-2xl font-bold text-orange-400 mb-4">Defense Applications</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Specializing in advanced drone technology for defense applications, disaster 
                      management, and real-time surveillance systems with cutting-edge automation 
                      and AI integration.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Our Numbers
              </h2>
              <p className="text-xl text-gray-300">Achievements that speak for themselves</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="card-drone p-6 text-center group hover:border-primary-500 transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <stat.icon className={`w-12 h-12 mx-auto mb-4 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="py-20 px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Our Achievements
              </h2>
              <p className="text-xl text-gray-300">Celebrating our journey of excellence</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  className="card-drone p-8 group hover:border-primary-500 transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="flex items-center mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${achievement.color} rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}>
                      <achievement.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{achievement.title}</h3>
                      <div className="w-12 h-1 bg-primary-500 rounded"></div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {achievement.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-4 md:px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="card-drone p-12 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-8"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Plane className="w-10 h-10 text-white" />
              </motion.div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
                Join Team Third Axis
              </h2>
              
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Ready to soar to new heights? Join our elite team of drone engineers, 
                researchers, and pilots at GCOEJ. Be part of the future of aerial technology.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <button className="btn-primary group px-8 py-4 text-lg">
                    Get Started
                    <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                  </button>
                </Link>
                
                <Link to="/about">
                  <button className="btn-secondary px-8 py-4 text-lg">
                    Learn More
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home

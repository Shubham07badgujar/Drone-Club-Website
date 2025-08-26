import React from 'react'
import { Link } from 'react-router-dom'
import { Plane, Mail, Phone, MapPin, Github, Linkedin, Twitter, Zap, Shield, Radio } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Mission Control', path: '/' },
    { name: 'Active Missions', path: '/projects' },
    { name: 'Briefings', path: '/events' },
    { name: 'Intel Reports', path: '/blog' },
  ]

  const squadronLinks = [
    { name: 'Elite Squadron', path: '/team' },
    { name: 'Departments', path: '/departments' },
    { name: 'Elite Achievements', path: '/achievements' },
    { name: 'Intel Briefing', path: '/about' },
  ]

  const socialLinks = [
    { icon: Github, href: '#', name: 'GitHub Command' },
    { icon: Linkedin, href: '#', name: 'Squadron Network' },
    { icon: Twitter, href: '#', name: 'Mission Updates' },
  ]

  return (
    <footer className="relative border-t border-drone-red-500/20 overflow-hidden">
      {/* Background with animated elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-drone-black-300 to-drone-black-200"></div>
      <div className="absolute inset-0">
        <div className="absolute top-8 left-8 w-24 h-24 bg-drone-red-600 rounded-full filter blur-2xl opacity-10 animate-pulseGlow"></div>
        <div className="absolute bottom-8 right-8 w-32 h-32 bg-drone-red-500 rounded-full filter blur-3xl opacity-5 animate-pulseGlow delay-1000"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-drone-red-500 to-drone-red-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Plane className="w-7 h-7 text-white transform rotate-45" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full opacity-80 animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white text-glow">DRONE MASTERS</span>
                <span className="text-xs text-gray-400 tracking-wider">ELITE SQUADRON</span>
              </div>
            </Link>
            
            <p className="text-gray-400 text-sm leading-relaxed">
              Elite drone squadron mastering autonomous flight systems. 
              Join the future of unmanned aerial technology and tactical operations.
            </p>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>SYSTEMS OPERATIONAL</span>
              </div>
            </div>
            
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-drone-red-500/10 border border-drone-red-500/20 rounded-lg flex items-center justify-center text-gray-400 hover:text-drone-red-400 hover:border-drone-red-400/40 transition-all duration-300 group"
                    aria-label={social.name}
                  >
                    <Icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Mission Control */}
          <div>
            <h3 className="text-white font-bold mb-6 flex items-center space-x-2">
              <Radio className="w-4 h-4 text-drone-red-500" />
              <span className="text-glow">MISSION CONTROL</span>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-drone-red-400 transition-all duration-300 text-sm flex items-center space-x-2 group"
                  >
                    <div className="w-1 h-1 bg-drone-red-500 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Squadron */}
          <div>
            <h3 className="text-white font-bold mb-6 flex items-center space-x-2">
              <Shield className="w-4 h-4 text-drone-red-500" />
              <span className="text-glow">SQUADRON</span>
            </h3>
            <ul className="space-y-3">
              {squadronLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-drone-red-400 transition-all duration-300 text-sm flex items-center space-x-2 group"
                  >
                    <div className="w-1 h-1 bg-drone-red-500 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Command Center */}
          <div>
            <h3 className="text-white font-bold mb-6 flex items-center space-x-2">
              <Zap className="w-4 h-4 text-drone-red-500" />
              <span className="text-glow">COMMAND CENTER</span>
            </h3>
            <div className="space-y-4">
              <div className="card-drone p-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-gray-400">
                    <Mail className="w-4 h-4 text-drone-red-500" />
                    <span className="text-sm">mission@dronemasters.com</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-400">
                    <Phone className="w-4 h-4 text-drone-red-500" />
                    <span className="text-sm">+1 (555) DRONE-OPS</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-400">
                    <MapPin className="w-4 h-4 text-drone-red-500" />
                    <span className="text-sm">Aerial Command Base</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Command Status Bar */}
        <div className="mt-12 pt-8 border-t border-drone-red-500/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <p className="text-gray-400 text-sm">
                © {currentYear} DRONE MASTERS SQUADRON. ALL SYSTEMS SECURE.
              </p>
              <div className="hidden md:flex items-center space-x-2 text-xs text-gray-500">
                <div className="w-1 h-1 bg-drone-red-500 rounded-full animate-pulse"></div>
                <span>OPERATIONAL STATUS: ACTIVE</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-drone-red-400 text-sm transition-colors duration-300 flex items-center space-x-1">
                <Shield className="w-3 h-3" />
                <span>Security Protocol</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-drone-red-400 text-sm transition-colors duration-300 flex items-center space-x-1">
                <Zap className="w-3 h-3" />
                <span>Mission Terms</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-drone-red-500 to-transparent opacity-60"></div>
    </footer>
  )
}

export default Footer

import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Plane, Mail, Phone, MapPin, Github, Linkedin, Twitter, Instagram, Zap, Shield, Radio, Cpu, Target, Award, Calendar, Users, ExternalLink, ArrowRight } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Home', path: '/', icon: Plane },
    { name: 'Projects', path: '/projects', icon: Target },
    { name: 'Events', path: '/events', icon: Calendar },
    { name: 'Blog', path: '/blog', icon: Zap },
  ]

  const teamLinks = [
    { name: 'About Us', path: '/about', icon: Users },
    { name: 'Team Members', path: '/team', icon: Shield },
    { name: 'Achievements', path: '/achievements', icon: Award },
    { name: 'Contact', path: '/contact', icon: Radio },
  ]

  const socialLinks = [
    { icon: Github, href: 'https://github.com/teamthirdaxis', name: 'GitHub' },
    { icon: Linkedin, href: '#', name: 'LinkedIn' },
    { icon: Instagram, href: '#', name: 'Instagram' },
    { icon: Twitter, href: '#', name: 'Twitter' },
  ]

  const contactInfo = [
    { 
      icon: Mail, 
      text: 'teamthirdaxis@gcoej.ac.in',
      href: 'mailto:teamthirdaxis@gcoej.ac.in'
    },
    { 
      icon: Phone, 
      text: '+91 XXX XXX XXXX',
      href: 'tel:+91XXXXXXXXXX'
    },
    { 
      icon: MapPin, 
      text: 'Government College of Engineering, Jalgaon',
      href: '#'
    },
  ]

  return (
    <footer className="relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-slate-800 to-gray-800"></div>
        
        {/* Animated mesh overlay */}
        <motion.div
          className="absolute inset-0 opacity-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2 }}
          style={{
            background: `
              radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.2) 0%, transparent 40%),
              radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.15) 0%, transparent 40%),
              radial-gradient(circle at 80% 20%, rgba(249, 115, 22, 0.1) 0%, transparent 40%)
            `
          }}
        />
        
        {/* Geometric pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}
          />
        </div>
        
        {/* Floating orbs */}
        <div className="absolute inset-0">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full blur-xl ${
                i % 3 === 0 ? 'bg-blue-500/10' :
                i % 3 === 1 ? 'bg-purple-500/10' :
                'bg-orange-500/10'
              }`}
              style={{
                width: `${80 + i * 20}px`,
                height: `${80 + i * 20}px`,
                left: `${20 + i * 30}%`,
                top: `${10 + i * 20}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 6 + i * 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Top border */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-60"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Section */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Link to="/" className="flex items-center space-x-3 group">
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                  <Plane className="w-8 h-8 text-white transform rotate-45" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full opacity-80 animate-pulse"></div>
              </motion.div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">TEAM THIRD AXIS</span>
                <span className="text-xs text-gray-400 tracking-wider">GCOEJ DRONE CLUB</span>
              </div>
            </Link>
            
            <p className="text-gray-400 text-sm leading-relaxed">
              Official drone club of Government College of Engineering, Jalgaon. 
              Pioneering UAV technology and autonomous systems for the future.
            </p>
            
            {/* Status Indicator */}
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>SYSTEMS OPERATIONAL</span>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 backdrop-blur-sm bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-primary-400 hover:border-primary-400/40 hover:bg-white/10 transition-all duration-300 group"
                    aria-label={social.name}
                    whileHover={{ scale: 1.1, y: -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  </motion.a>
                )
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-bold mb-6 flex items-center space-x-2">
              <Zap className="w-4 h-4 text-primary-500" />
              <span>Quick Links</span>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => {
                const Icon = link.icon
                return (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-primary-400 transition-all duration-300 text-sm flex items-center space-x-3 group"
                    >
                      <Icon className="w-4 h-4 opacity-60 group-hover:opacity-100 group-hover:text-primary-400 transition-all duration-300" />
                      <span>{link.name}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </motion.div>

          {/* Team Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-bold mb-6 flex items-center space-x-2">
              <Shield className="w-4 h-4 text-secondary-500" />
              <span>Team</span>
            </h3>
            <ul className="space-y-3">
              {teamLinks.map((link) => {
                const Icon = link.icon
                return (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-secondary-400 transition-all duration-300 text-sm flex items-center space-x-3 group"
                    >
                      <Icon className="w-4 h-4 opacity-60 group-hover:opacity-100 group-hover:text-secondary-400 transition-all duration-300" />
                      <span>{link.name}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white font-bold mb-6 flex items-center space-x-2">
              <Radio className="w-4 h-4 text-accent-500" />
              <span>Contact</span>
            </h3>
            <div className="space-y-4">
              <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all duration-300">
                <div className="space-y-3">
                  {contactInfo.map((contact) => {
                    const Icon = contact.icon
                    return (
                      <motion.a
                        key={contact.text}
                        href={contact.href}
                        className="flex items-center space-x-3 text-gray-400 hover:text-accent-400 transition-all duration-300 group"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Icon className="w-4 h-4 text-accent-500 group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-sm">{contact.text}</span>
                        {contact.href !== '#' && (
                          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        )}
                      </motion.a>
                    )
                  })}
                </div>
              </div>
              
              {/* Quick Achievement */}
              <div className="backdrop-blur-sm bg-gradient-to-r from-primary-500/10 to-secondary-500/10 border border-primary-500/20 rounded-2xl p-4">
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-primary-400" />
                  <div>
                    <div className="text-sm font-semibold text-white">AIR 5 - SAE Aerothon 2024</div>
                    <div className="text-xs text-gray-400">National Level Achievement</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div 
          className="mt-12 pt-8 border-t border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-gray-400 text-sm">
                © {currentYear} Team Third Axis - GCOEJ. All rights reserved.
              </p>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <Cpu className="w-3 h-3 text-green-500 animate-pulse" />
                <span>OPERATIONAL STATUS: ACTIVE</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <Link 
                to="/privacy" 
                className="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-300 flex items-center space-x-1"
              >
                <Shield className="w-3 h-3" />
                <span>Privacy Policy</span>
              </Link>
              <Link 
                to="/terms" 
                className="text-gray-400 hover:text-secondary-400 text-sm transition-colors duration-300 flex items-center space-x-1"
              >
                <Zap className="w-3 h-3" />
                <span>Terms of Service</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-60"></div>
    </footer>
  )
}

export default Footer

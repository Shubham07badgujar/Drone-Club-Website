import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Plane, Zap, Home, FolderOpen, Calendar, PenTool, Users, Building, Trophy } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Projects', path: '/projects', icon: FolderOpen },
    { name: 'Events', path: '/events', icon: Calendar },
    { name: 'Blog', path: '/blog', icon: PenTool },
    { name: 'Team', path: '/team', icon: Users },
    { name: 'Departments', path: '/departments', icon: Building },
    { name: 'Achievements', path: '/achievements', icon: Trophy },
  ]

  const isActiveLink = (path) => location.pathname === path

  return (
    <>
      {/* Modern Glassmorphism Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-dark-950/90 backdrop-blur-xl border-b border-primary-500/30 shadow-2xl' 
          : 'bg-transparent backdrop-blur-sm border-b border-primary-500/10'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Enhanced Logo with Animation */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-xl ring-2 ring-primary-500/20 group-hover:ring-primary-400/40">
                  <Plane className="w-7 h-7 text-white transform rotate-45 group-hover:rotate-90 transition-transform duration-500" />
                </div>
                {/* Animated pulse indicator */}
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-drone-electric-500 rounded-full opacity-80 animate-pulse shadow-lg"></div>
                {/* Orbiting ring */}
                <div className="absolute inset-0 w-12 h-12 border border-primary-400/30 rounded-xl animate-spin" style={{ animationDuration: '8s' }}></div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-white text-glow tracking-tight">TEAM THIRD AXIS</span>
                <span className="text-xs text-primary-400 tracking-[0.2em] font-medium uppercase">GCOEJ Drone Club</span>
              </div>
            </Link>

            {/* Desktop Navigation with Icons */}
            <div className="hidden lg:flex items-center space-x-2">
              {navLinks.map((link) => {
                const IconComponent = link.icon
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`group relative px-4 py-3 rounded-xl transition-all duration-300 flex items-center space-x-2 ${
                      isActiveLink(link.path) 
                        ? 'text-primary-400 bg-primary-500/10 shadow-lg ring-1 ring-primary-500/30' 
                        : 'text-gray-300 hover:text-white hover:bg-white/5 hover:shadow-lg'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="font-medium text-sm tracking-wide">{link.name.toUpperCase()}</span>
                    
                    {/* Active indicator */}
                    {isActiveLink(link.path) && (
                      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 via-primary-600/10 to-primary-500/20 rounded-xl"></div>
                    )}
                    
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                )
              })}
            </div>

            {/* Admin Login - Hidden but Route Available */}
            <div className="hidden lg:block">
              {/* Remove visible admin button but keep route accessible */}
              <div className="w-0 h-0 overflow-hidden">
                <Link to="/admin/login">
                  <button className="btn-primary flex items-center space-x-2 px-6 py-3">
                    <Zap className="w-4 h-4" />
                    <span>ADMIN</span>
                  </button>
                </Link>
              </div>
            </div>

            {/* Mobile menu button with animation */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-3 text-gray-300 hover:text-primary-400 rounded-xl hover:bg-white/5 transition-all duration-300 group"
              >
                <div className="relative w-6 h-6">
                  <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ${
                    isOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
                  }`}></span>
                  <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ${
                    isOpen ? 'opacity-0' : 'opacity-100'
                  }`}></span>
                  <span className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ${
                    isOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
                  }`}></span>
                </div>
              </button>
            </div>
          </div>

          {/* Enhanced Mobile Navigation */}
          <div className={`lg:hidden transition-all duration-500 ease-in-out ${
            isOpen 
              ? 'max-h-screen opacity-100 visible' 
              : 'max-h-0 opacity-0 invisible'
          }`}>
            <div className="border-t border-primary-500/20">
              <div className="px-2 pt-6 pb-8 space-y-3 bg-dark-950/50 backdrop-blur-xl rounded-b-2xl mx-4 mt-4">
                {navLinks.map((link) => {
                  const IconComponent = link.icon
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      className={`flex items-center space-x-3 px-4 py-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                        isActiveLink(link.path)
                          ? 'text-primary-400 bg-primary-500/20 border border-primary-500/30 shadow-lg'
                          : 'text-gray-300 hover:text-white hover:bg-white/5 border border-transparent'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span>{link.name.toUpperCase()}</span>
                      {isActiveLink(link.path) && (
                        <div className="ml-auto w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                      )}
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        
        {/* Dynamic bottom glow effect */}
        <div className={`absolute bottom-0 left-0 w-full h-px transition-opacity duration-300 ${
          scrolled 
            ? 'bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-80' 
            : 'bg-gradient-to-r from-transparent via-primary-500/30 to-transparent opacity-40'
        }`}></div>
      </nav>

      {/* Spacer to prevent content jumping */}
      <div className="h-20"></div>
    </>
  )
}

export default Navbar

import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Plane, Zap } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Events', path: '/events' },
    { name: 'Blog', path: '/blog' },
    { name: 'Team', path: '/team' },
    { name: 'Departments', path: '/departments' },
    { name: 'Achievements', path: '/achievements' },
  ]

  const isActiveLink = (path) => location.pathname === path

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect-strong border-b border-red-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Plane className="w-6 h-6 text-white transform rotate-45" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full opacity-80 animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white text-glow">DRONE MASTERS</span>
              <span className="text-xs text-gray-400 tracking-wider">ELITE SQUADRON</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`navbar-link px-4 py-2 rounded-lg transition-all duration-300 relative overflow-hidden group ${
                  isActiveLink(link.path) 
                    ? 'text-red-400 bg-red-500/10' 
                    : 'hover:bg-red-500/5'
                }`}
              >
                <span className="relative z-10 font-medium tracking-wide">{link.name.toUpperCase()}</span>
                {isActiveLink(link.path) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/20 to-transparent"></div>
                )}
              </Link>
            ))}
          </div>

          {/* About Us Button */}
          <div className="hidden md:block">
            <Link to="/about">
              <button className="btn-primary flex items-center space-x-2 px-6 py-2">
                <Zap className="w-4 h-4" />
                <span>INTEL BRIEFING</span>
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-red-400 p-2 rounded-lg transition-colors duration-300"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-red-500/20">
            <div className="px-2 pt-4 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    isActiveLink(link.path)
                      ? 'text-red-400 bg-red-500/20 border border-red-500/30'
                      : 'text-gray-300 hover:text-white hover:bg-red-500/10'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name.toUpperCase()}
                </Link>
              ))}
              <div className="pt-4 border-t border-red-500/20">
                <Link to="/about" onClick={() => setIsOpen(false)}>
                  <button className="btn-primary w-full flex items-center justify-center space-x-2 px-4 py-3">
                    <Zap className="w-4 h-4" />
                    <span>INTEL BRIEFING</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Bottom glow effect */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-60"></div>
    </nav>
  )
}

export default Navbar

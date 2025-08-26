import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Plane } from 'lucide-react'
import Button from '../ui/Button'

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
    <nav className="fixed top-0 left-0 right-0 z-40 glass-effect">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <Plane className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Drone Club</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`navbar-link ${
                  isActiveLink(link.path) 
                    ? 'text-primary-400 border-b-2 border-primary-400' 
                    : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* About Us Button */}
          <div className="hidden md:block">
            <Link to="/about">
              <Button variant="primary" size="sm">
                About Us
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-dark-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActiveLink(link.path)
                      ? 'text-primary-400 bg-dark-700'
                      : 'text-gray-300 hover:text-white hover:bg-dark-700'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2">
                <Link to="/about" onClick={() => setIsOpen(false)}>
                  <Button variant="primary" size="sm" className="w-full">
                    About Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar

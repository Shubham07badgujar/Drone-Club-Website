import React, { useState } from 'react'
import { ExternalLink, Calendar, Users, Github, Eye, Star } from 'lucide-react'
import Badge from '../ui/Badge'

const ProjectCard = ({ project, featured = false }) => {
  const [imageError, setImageError] = useState(false)
  const { 
    title, 
    description, 
    imageUrl, 
    technologies, 
    status, 
    category,
    year,
    teamMembers,
    githubUrl,
    demoUrl,
    is_featured,
    createdAt 
  } = project

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200'
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Planning': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'On Hold': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Competition': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'Research': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Commercial': return 'bg-green-100 text-green-800 border-green-200'
      case 'Educational': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Innovation': return 'bg-pink-100 text-pink-800 border-pink-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const handleImageError = () => {
    setImageError(true)
  }

  const openLink = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100 ${featured ? 'ring-2 ring-yellow-400 ring-opacity-50' : ''}`}>
      {/* Featured Badge */}
      {is_featured && (
        <div className="absolute top-4 left-4 z-10">
          <div className="flex items-center px-3 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full shadow-lg">
            <Star className="w-3 h-3 mr-1" fill="currentColor" />
            FEATURED
          </div>
        </div>
      )}

      {/* Project Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        {imageUrl && !imageError ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
            <svg className="w-16 h-16 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14-7l2 8-2 8M5 4l2 8-2 8" />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 mb-2">
              {title}
            </h3>
            <div className="flex items-center space-x-2 mb-3">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getCategoryColor(category)}`}>
                {category}
              </span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
                {status}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>

        {/* Technologies */}
        {technologies && technologies.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1.5">
              {technologies.slice(0, 4).map((tech, index) => (
                <span key={index} className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md hover:bg-gray-200 transition-colors">
                  {tech}
                </span>
              ))}
              {technologies.length > 4 && (
                <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-md">
                  +{technologies.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Project Stats */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-center space-x-4">
            {year && (
              <div className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {year}
              </div>
            )}
            {teamMembers && teamMembers.length > 0 && (
              <div className="flex items-center">
                <Users className="w-3 h-3 mr-1" />
                {teamMembers.length} members
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            {githubUrl && (
              <button
                onClick={() => openLink(githubUrl)}
                className="inline-flex items-center px-3 py-2 text-xs font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 hover:text-gray-900 transition-all duration-200 transform hover:scale-105"
              >
                <Github className="w-3 h-3 mr-1" />
                Code
              </button>
            )}
            {demoUrl && (
              <button
                onClick={() => openLink(demoUrl)}
                className="inline-flex items-center px-3 py-2 text-xs font-medium text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200 hover:text-blue-900 transition-all duration-200 transform hover:scale-105"
              >
                <Eye className="w-3 h-3 mr-1" />
                Demo
              </button>
            )}
          </div>

          <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
            <ExternalLink className="w-4 h-4 mr-2" />
            View Details
          </button>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  )
}

export default ProjectCard

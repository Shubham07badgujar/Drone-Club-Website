import React, { useState } from 'react'
import { FaLinkedin, FaGithub, FaExternalLinkAlt, FaEdit, FaTrash, FaUserCircle } from 'react-icons/fa'

const TeamMemberCard = ({ member, year, isAdmin = false, onEdit, onDelete }) => {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  const handleImageLoad = () => {
    setImageLoading(false)
  }

  const handleImageError = () => {
    setImageError(true)
    setImageLoading(false)
  }

  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=3b82f6&color=ffffff&size=400&font-size=0.4`

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
      {/* Profile Image */}
      <div className="relative h-64 bg-gray-700 overflow-hidden">
        {isAdmin && (
          <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
            <button
              onClick={() => onEdit(member)}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors duration-200"
              title="Edit Member"
            >
              <FaEdit size={14} />
            </button>
            <button
              onClick={() => onDelete(member)}
              className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors duration-200"
              title="Delete Member"
            >
              <FaTrash size={14} />
            </button>
          </div>
        )}
        
        {imageLoading && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-700">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}
        
        {!imageError && member.photo ? (
          <img
            src={member.photo}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600">
            {imageError || !member.photo ? (
              <FaUserCircle className="text-white text-6xl opacity-80" />
            ) : (
              <img
                src={defaultAvatar}
                alt={member.name}
                className="w-full h-full object-cover"
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            )}
          </div>
        )}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Member Info */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-200">
          {member.name}
        </h3>
        <p className="text-blue-400 font-medium mb-4 text-sm uppercase tracking-wide">
          {member.role}
        </p>

        {/* Social Links */}
        <div className="flex gap-3 justify-center">
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition-colors duration-200 transform hover:scale-110"
              title="LinkedIn Profile"
            >
              <FaLinkedin size={20} />
            </a>
          )}
          
          {member.github && (
            <a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-200 transition-colors duration-200 transform hover:scale-110"
              title="GitHub Profile"
            >
              <FaGithub size={20} />
            </a>
          )}
          
          {member.otherLinks && member.otherLinks.length > 0 && member.otherLinks.map((link, index) => (
            link.url && (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-500 transition-colors duration-200 transform hover:scale-110"
                title={link.name || 'External Link'}
              >
                <FaExternalLinkAlt size={18} />
              </a>
            )
          ))}
        </div>
      </div>

      {/* Hover effect border */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/30 rounded-xl transition-colors duration-300 pointer-events-none"></div>
    </div>
  )
}

export default TeamMemberCard

import React, { useState } from 'react'
import { FaChevronDown, FaChevronUp, FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import TeamMemberCard from './cards/TeamMemberCard'

const TeamYearSection = ({ 
  teamYear, 
  isAdmin = false, 
  onAddMember, 
  onEditMember, 
  onDeleteMember, 
  onEditYear, 
  onDeleteYear 
}) => {
  const [isExpanded, setIsExpanded] = useState(true)
  
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="mb-8 bg-gray-900 rounded-xl overflow-hidden shadow-lg">
      {/* Year Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold text-white">
              {teamYear.year}
            </h2>
            {teamYear.description && (
              <p className="text-blue-100 text-lg">
                {teamYear.description}
              </p>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            {isAdmin && (
              <>
                <button
                  onClick={() => onAddMember(teamYear.year)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
                  title="Add Member"
                >
                  <FaPlus size={14} />
                  <span className="hidden md:inline">Add Member</span>
                </button>
                <button
                  onClick={() => onEditYear(teamYear)}
                  className="bg-blue-700 hover:bg-blue-800 text-white p-2 rounded-lg transition-colors duration-200"
                  title="Edit Year"
                >
                  <FaEdit size={16} />
                </button>
                <button
                  onClick={() => onDeleteYear(teamYear)}
                  className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors duration-200"
                  title="Delete Year"
                >
                  <FaTrash size={16} />
                </button>
              </>
            )}
            
            <button
              onClick={toggleExpanded}
              className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-lg transition-colors duration-200"
              title={isExpanded ? 'Collapse' : 'Expand'}
            >
              {isExpanded ? <FaChevronUp size={18} /> : <FaChevronDown size={18} />}
            </button>
          </div>
        </div>
        
        {/* Member count */}
        <div className="mt-2">
          <span className="text-blue-100 text-sm">
            {teamYear.members?.length || 0} member{(teamYear.members?.length || 0) !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Members Grid */}
      <div 
        className={`transition-all duration-500 ease-in-out ${
          isExpanded ? 'max-h-none opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        {teamYear.members && teamYear.members.length > 0 ? (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {teamYear.members.map((member) => (
                <TeamMemberCard
                  key={member._id}
                  member={member}
                  year={teamYear.year}
                  isAdmin={isAdmin}
                  onEdit={onEditMember}
                  onDelete={onDeleteMember}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="text-gray-400 text-lg mb-4">
              No team members added for {teamYear.year} yet.
            </div>
            {isAdmin && (
              <button
                onClick={() => onAddMember(teamYear.year)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2 mx-auto"
              >
                <FaPlus size={16} />
                Add First Member
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default TeamYearSection

import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { FaUsers, FaCalendarAlt, FaBlog, FaTrophy, FaProjectDiagram, FaCog, FaPlus, FaEdit } from 'react-icons/fa'
import { useTeamYears } from '../hooks/useTeamYears'
import TeamMemberModal from '../components/TeamMemberModal'
import TeamYearModal from '../components/TeamYearModal'

const AdminDashboard = () => {
  const { user, logout, token } = useAuth()
  const {
    teamYears,
    loading: teamLoading,
    createTeamYear,
    updateTeamYear,
    deleteTeamYear,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember
  } = useTeamYears()

  // Modal states
  const [memberModalOpen, setMemberModalOpen] = useState(false)
  const [yearModalOpen, setYearModalOpen] = useState(false)
  const [editingMember, setEditingMember] = useState(null)
  const [editingYear, setEditingYear] = useState(null)
  const [selectedYear, setSelectedYear] = useState(null)
  const [actionLoading, setActionLoading] = useState(false)

  // Quick stats
  const stats = [
    {
      title: 'Team Years',
      count: teamYears.length,
      icon: FaCalendarAlt,
      color: 'bg-blue-600'
    },
    {
      title: 'Total Members',
      count: teamYears.reduce((total, year) => total + (year.members?.length || 0), 0),
      icon: FaUsers,
      color: 'bg-green-600'
    },
    {
      title: 'Active Years',
      count: teamYears.filter(year => year.isActive).length,
      icon: FaCog,
      color: 'bg-purple-600'
    }
  ]

  // Handle member actions
  const handleAddMember = (year) => {
    setSelectedYear(year)
    setEditingMember(null)
    setMemberModalOpen(true)
  }

  const handleEditMember = (member, year) => {
    setSelectedYear(year)
    setEditingMember(member)
    setMemberModalOpen(true)
  }

  const handleDeleteMember = async (member, year) => {
    if (!window.confirm(`Are you sure you want to delete ${member.name}?`)) {
      return
    }

    try {
      setActionLoading(true)
      await deleteTeamMember(year, member._id, token)
    } catch (error) {
      alert('Failed to delete member: ' + error.message)
    } finally {
      setActionLoading(false)
    }
  }

  const handleSaveMember = async (memberData) => {
    try {
      setActionLoading(true)
      
      if (editingMember) {
        await updateTeamMember(selectedYear, editingMember._id, memberData, token)
      } else {
        await addTeamMember(selectedYear, memberData, token)
      }
      
      setMemberModalOpen(false)
      setEditingMember(null)
      setSelectedYear(null)
    } catch (error) {
      alert('Failed to save member: ' + error.message)
    } finally {
      setActionLoading(false)
    }
  }

  // Handle year actions
  const handleAddYear = () => {
    setEditingYear(null)
    setYearModalOpen(true)
  }

  const handleEditYear = (teamYear) => {
    setEditingYear(teamYear)
    setYearModalOpen(true)
  }

  const handleDeleteYear = async (teamYear) => {
    if (!window.confirm(`Are you sure you want to delete the year ${teamYear.year} and all its members?`)) {
      return
    }

    try {
      setActionLoading(true)
      await deleteTeamYear(teamYear.year, token)
    } catch (error) {
      alert('Failed to delete year: ' + error.message)
    } finally {
      setActionLoading(false)
    }
  }

  const handleSaveYear = async (yearData) => {
    try {
      setActionLoading(true)
      
      if (editingYear) {
        await updateTeamYear(editingYear.year, yearData, token)
      } else {
        await createTeamYear(yearData, token)
      }
      
      setYearModalOpen(false)
      setEditingYear(null)
    } catch (error) {
      alert('Failed to save year: ' + error.message)
    } finally {
      setActionLoading(false)
    }
  }

  const existingYears = teamYears.map(ty => ty.year)

  return (
    <div className="min-h-screen bg-dark-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-4">Admin Dashboard</h1>
            <p className="text-xl text-gray-400">Welcome back, {user?.email}</p>
          </div>
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Logout
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-800 rounded-xl p-6">
              <div className="flex items-center">
                <div className={`${stat.color} rounded-lg p-3 mr-4`}>
                  <stat.icon className="text-white text-xl" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">{stat.title}</p>
                  <p className="text-white text-2xl font-bold">
                    {teamLoading ? '...' : stat.count}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Team Management Section */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Team Management</h2>
            <button
              onClick={handleAddYear}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
              disabled={actionLoading || teamLoading}
            >
              <FaPlus />
              Add Year
            </button>
          </div>

          {teamLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-gray-400 mt-2">Loading team data...</p>
            </div>
          ) : teamYears.length > 0 ? (
            <div className="space-y-4">
              {teamYears.sort((a, b) => b.year - a.year).map((teamYear) => (
                <div key={teamYear._id} className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-white">
                        {teamYear.year}
                      </h3>
                      {teamYear.description && (
                        <span className="text-gray-400 text-sm">
                          - {teamYear.description}
                        </span>
                      )}
                      <span className={`px-2 py-1 rounded text-xs ${
                        teamYear.isActive 
                          ? 'bg-green-600 text-green-100' 
                          : 'bg-gray-600 text-gray-300'
                      }`}>
                        {teamYear.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleAddMember(teamYear.year)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors duration-200 flex items-center gap-1"
                        disabled={actionLoading}
                      >
                        <FaPlus size={12} />
                        Add Member
                      </button>
                      <button
                        onClick={() => handleEditYear(teamYear)}
                        className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded text-sm transition-colors duration-200 flex items-center gap-1"
                        disabled={actionLoading}
                      >
                        <FaEdit size={12} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteYear(teamYear)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors duration-200"
                        disabled={actionLoading}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-gray-400 text-sm">
                    {teamYear.members?.length || 0} member{(teamYear.members?.length || 0) !== 1 ? 's' : ''}
                  </div>

                  {/* Members list */}
                  {teamYear.members && teamYear.members.length > 0 && (
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {teamYear.members.map((member) => (
                        <div key={member._id} className="bg-gray-600 rounded p-3 flex items-center justify-between">
                          <div>
                            <p className="text-white font-medium text-sm">{member.name}</p>
                            <p className="text-gray-300 text-xs">{member.role}</p>
                          </div>
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleEditMember(member, teamYear.year)}
                              className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded text-xs transition-colors duration-200"
                              disabled={actionLoading}
                            >
                              <FaEdit size={10} />
                            </button>
                            <button
                              onClick={() => handleDeleteMember(member, teamYear.year)}
                              className="bg-red-500 hover:bg-red-600 text-white p-1 rounded text-xs transition-colors duration-200"
                              disabled={actionLoading}
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400 mb-4">No team years created yet.</p>
              <button
                onClick={handleAddYear}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2 mx-auto"
                disabled={actionLoading}
              >
                <FaPlus />
                Create First Team Year
              </button>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-800 rounded-xl p-6 text-center">
            <FaUsers className="text-blue-500 text-3xl mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Manage Team</h3>
            <p className="text-gray-400 text-sm mb-4">Add, edit, or remove team members</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 w-full">
              Go to Team
            </button>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 text-center">
            <FaCalendarAlt className="text-green-500 text-3xl mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Events</h3>
            <p className="text-gray-400 text-sm mb-4">Manage club events and activities</p>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 w-full">
              Manage Events
            </button>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 text-center">
            <FaBlog className="text-purple-500 text-3xl mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Blog Posts</h3>
            <p className="text-gray-400 text-sm mb-4">Create and manage blog content</p>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 w-full">
              Manage Blogs
            </button>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 text-center">
            <FaProjectDiagram className="text-orange-500 text-3xl mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Projects</h3>
            <p className="text-gray-400 text-sm mb-4">Showcase club projects</p>
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 w-full">
              Manage Projects
            </button>
          </div>
        </div>

        {/* Modals */}
        <TeamMemberModal
          isOpen={memberModalOpen}
          onClose={() => {
            setMemberModalOpen(false)
            setEditingMember(null)
            setSelectedYear(null)
          }}
          onSave={handleSaveMember}
          member={editingMember}
          year={selectedYear}
          loading={actionLoading}
        />

        <TeamYearModal
          isOpen={yearModalOpen}
          onClose={() => {
            setYearModalOpen(false)
            setEditingYear(null)
          }}
          onSave={handleSaveYear}
          teamYear={editingYear}
          loading={actionLoading}
          existingYears={existingYears}
        />
      </div>
    </div>
  )
}

export default AdminDashboard

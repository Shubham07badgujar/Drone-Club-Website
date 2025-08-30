import React, { useState } from 'react'
import { FaPlus, FaFilter, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import { useTeamYears } from '../hooks/useTeamYears'
import TeamYearSection from '../components/TeamYearSection'
import TeamMemberModal from '../components/TeamMemberModal'
import TeamYearModal from '../components/TeamYearModal'

const Team = () => {
  const { user, token } = useAuth()
  const isAdmin = user?.role === 'admin'
  
  const {
    teamYears,
    loading,
    error,
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

  // Filter and sort states
  const [sortOrder, setSortOrder] = useState('desc') // 'desc' for newest first, 'asc' for oldest first
  const [showActiveOnly, setShowActiveOnly] = useState(true)

  // Handle member actions
  const handleAddMember = (year) => {
    setSelectedYear(year)
    setEditingMember(null)
    setMemberModalOpen(true)
  }

  const handleEditMember = (member) => {
    setSelectedYear(teamYears.find(ty => ty.members.some(m => m._id === member._id))?.year)
    setEditingMember(member)
    setMemberModalOpen(true)
  }

  const handleDeleteMember = async (member) => {
    if (!window.confirm(`Are you sure you want to delete ${member.name}?`)) {
      return
    }

    try {
      setActionLoading(true)
      const year = teamYears.find(ty => ty.members.some(m => m._id === member._id))?.year
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

  // Filter and sort team years
  const filteredAndSortedYears = teamYears
    .filter(teamYear => !showActiveOnly || teamYear.isActive)
    .sort((a, b) => {
      return sortOrder === 'desc' ? b.year - a.year : a.year - b.year
    })

  const existingYears = teamYears.map(ty => ty.year)

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading team data...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Team
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Meet the passionate individuals who drive innovation and excellence in our drone club
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Sort Toggle */}
            <button
              onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              {sortOrder === 'desc' ? <FaSortAmountDown /> : <FaSortAmountUp />}
              {sortOrder === 'desc' ? 'Newest First' : 'Oldest First'}
            </button>

            {/* Active Filter */}
            <button
              onClick={() => setShowActiveOnly(!showActiveOnly)}
              className={`px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 ${
                showActiveOnly
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-gray-800 hover:bg-gray-700 text-white'
              }`}
            >
              <FaFilter />
              {showActiveOnly ? 'Active Only' : 'Show All'}
            </button>
          </div>

          {/* Admin Controls */}
          {isAdmin && (
            <button
              onClick={handleAddYear}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2"
              disabled={actionLoading}
            >
              <FaPlus />
              Add New Year
            </button>
          )}
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-900/50 border border-red-500 rounded-lg p-4 mb-8">
            <p className="text-red-200">
              Failed to load team data: {error}
            </p>
          </div>
        )}

        {/* Team Years */}
        {filteredAndSortedYears.length > 0 ? (
          <div className="space-y-8">
            {filteredAndSortedYears.map((teamYear) => (
              <TeamYearSection
                key={teamYear._id}
                teamYear={teamYear}
                isAdmin={isAdmin}
                onAddMember={handleAddMember}
                onEditMember={handleEditMember}
                onDeleteMember={handleDeleteMember}
                onEditYear={handleEditYear}
                onDeleteYear={handleDeleteYear}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 text-xl mb-6">
              {teamYears.length === 0
                ? "No team years have been created yet."
                : "No team years match your current filters."
              }
            </div>
            {isAdmin && teamYears.length === 0 && (
              <button
                onClick={handleAddYear}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg transition-colors duration-200 flex items-center gap-3 mx-auto text-lg"
                disabled={actionLoading}
              >
                <FaPlus />
                Create Your First Team Year
              </button>
            )}
          </div>
        )}

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

export default Team

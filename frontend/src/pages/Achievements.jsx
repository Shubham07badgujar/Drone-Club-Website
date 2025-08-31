import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useAchievements } from '../hooks/useAchievements'
import AchievementCard from '../components/cards/AchievementCard'

const Achievements = () => {
  const { 
    achievements, 
    loading, 
    error, 
    fetchAchievements,
    fetchFeaturedAchievements,
    fetchAchievementsByYear 
  } = useAchievements()
  
  const [filter, setFilter] = useState('all')
  const [selectedYear, setSelectedYear] = useState('')
  const [filteredAchievements, setFilteredAchievements] = useState([])

  // Get unique years from achievements
  const availableYears = [...new Set(achievements.map(a => a.year))].sort((a, b) => b - a)

  useEffect(() => {
    let filtered = achievements

    if (filter === 'featured') {
      filtered = achievements.filter(a => a.is_featured)
    } else if (filter === 'year' && selectedYear) {
      filtered = achievements.filter(a => a.year === parseInt(selectedYear))
    }

    setFilteredAchievements(filtered)
  }, [achievements, filter, selectedYear])

  const handleFilterChange = async (newFilter) => {
    setFilter(newFilter)
    setSelectedYear('')

    if (newFilter === 'featured') {
      const result = await fetchFeaturedAchievements()
      if (result.success) {
        setFilteredAchievements(result.data)
      }
    } else if (newFilter === 'all') {
      await fetchAchievements()
    }
  }

  const handleYearChange = async (year) => {
    setSelectedYear(year)
    setFilter('year')

    if (year) {
      const result = await fetchAchievementsByYear(year)
      if (result.success) {
        setFilteredAchievements(result.data)
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 px-4 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Our <span className="text-blue-400">Achievements</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover the milestones and accomplishments of Team Third Axis - 
            from competition victories to innovation breakthroughs in drone technology.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => handleFilterChange('all')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                filter === 'all'
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
              }`}
            >
              All Achievements
            </button>
            <button
              onClick={() => handleFilterChange('featured')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                filter === 'featured'
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
              }`}
            >
              Featured
            </button>
            <select
              value={selectedYear}
              onChange={(e) => handleYearChange(e.target.value)}
              className="px-6 py-3 rounded-full bg-slate-800 text-gray-300 border border-slate-700 focus:border-blue-400 focus:outline-none"
            >
              <option value="">Filter by Year</option>
              {availableYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 text-center border border-slate-700">
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {achievements.length}
              </div>
              <div className="text-gray-300">Total Achievements</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 text-center border border-slate-700">
              <div className="text-3xl font-bold text-green-400 mb-2">
                {achievements.filter(a => a.is_featured).length}
              </div>
              <div className="text-gray-300">Featured</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 text-center border border-slate-700">
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {availableYears.length}
              </div>
              <div className="text-gray-300">Years Active</div>
            </div>
          </div>
        </motion.div>

        {/* Error State */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-900/20 border border-red-500 rounded-lg p-4 mb-8"
          >
            <div className="text-red-400 text-center">
              {error}
            </div>
          </motion.div>
        )}

        {/* Achievements Grid */}
        {filteredAchievements.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredAchievements.map((achievement, index) => (
              <motion.div
                key={achievement._id || achievement.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <AchievementCard achievement={achievement} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-gray-400 text-xl">
              {filter === 'featured' 
                ? 'No featured achievements found.' 
                : filter === 'year' 
                ? `No achievements found for ${selectedYear}.`
                : 'No achievements found.'}
            </div>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Join Our Journey
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Be part of Team Third Axis and help us achieve new milestones in drone technology and innovation.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Involved
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Achievements

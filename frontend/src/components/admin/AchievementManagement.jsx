import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Star, 
  StarOff, 
  Calendar,
  Award,
  Trophy,
  Medal,
  Upload,
  X,
  Check,
  AlertCircle
} from 'lucide-react'
import { toast } from 'react-hot-toast'

import Card from '../ui/Card'
import Button from '../ui/Button'
import Modal from '../ui/Modal'
import Badge from '../ui/Badge'
import { useAchievements } from '../../hooks/useAchievements'

const AchievementManagement = () => {
  const { 
    achievements, 
    loading, 
    error, 
    fetchAchievements, 
    createAchievement, 
    updateAchievement, 
    deleteAchievement,
    toggleFeatured 
  } = useAchievements()

  const [showModal, setShowModal] = useState(false)
  const [editingAchievement, setEditingAchievement] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    year: new Date().getFullYear(),
    category: 'Competition',
    level: 'National',
    image: '',
    is_featured: false
  })
  const [submitting, setSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState({})

  useEffect(() => {
    fetchAchievements()
  }, [])

  const categoryOptions = [
    { value: 'Competition', label: 'Competition', icon: Trophy },
    { value: 'Award', label: 'Award', icon: Award },
    { value: 'Hackathon', label: 'Hackathon', icon: Medal },
    { value: 'Exhibition', label: 'Exhibition', icon: Star }
  ]

  const levelOptions = [
    { value: 'International', label: 'International', color: 'success' },
    { value: 'National', label: 'National', color: 'warning' },
    { value: 'State', label: 'State', color: 'info' },
    { value: 'University', label: 'University', color: 'default' }
  ]

  const validateForm = () => {
    const errors = {}
    
    if (!formData.title.trim()) {
      errors.title = 'Title is required'
    } else if (formData.title.length > 200) {
      errors.title = 'Title cannot exceed 200 characters'
    }
    
    if (!formData.description.trim()) {
      errors.description = 'Description is required'
    } else if (formData.description.length > 2000) {
      errors.description = 'Description cannot exceed 2000 characters'
    }
    
    if (!formData.year) {
      errors.year = 'Year is required'
    } else if (formData.year < 2020) {
      errors.year = 'Year must be from 2020 onwards'
    } else if (formData.year > new Date().getFullYear() + 5) {
      errors.year = 'Year cannot be more than 5 years in the future'
    }
    
    if (formData.image && !isValidUrl(formData.image)) {
      errors.image = 'Please enter a valid URL'
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const isValidUrl = (string) => {
    try {
      new URL(string)
      return true
    } catch (_) {
      return false
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      year: new Date().getFullYear(),
      category: 'Competition',
      level: 'National',
      image: '',
      is_featured: false
    })
    setEditingAchievement(null)
    setFormErrors({})
  }

  const handleOpenModal = (achievement = null) => {
    if (achievement) {
      setFormData({
        title: achievement.title,
        description: achievement.description,
        year: achievement.year,
        category: achievement.category,
        level: achievement.level,
        image: achievement.image || '',
        is_featured: achievement.is_featured
      })
      setEditingAchievement(achievement)
    } else {
      resetForm()
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    resetForm()
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate form before submission
    if (!validateForm()) {
      toast.error('Please fix the form errors before submitting')
      return
    }
    
    setSubmitting(true)

    try {
      // Prepare the data to send
      const submissionData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        year: parseInt(formData.year),
        category: formData.category,
        level: formData.level,
        image: formData.image.trim(),
        is_featured: formData.is_featured
      }

      console.log('📤 Submitting achievement data:', submissionData)

      if (editingAchievement) {
        const result = await updateAchievement(editingAchievement._id, submissionData)
        if (result.success) {
          toast.success('Achievement updated successfully!')
        } else {
          throw new Error(result.message)
        }
      } else {
        const result = await createAchievement(submissionData)
        if (result.success) {
          toast.success('Achievement created successfully!')
        } else {
          throw new Error(result.message)
        }
      }
      
      handleCloseModal()
      fetchAchievements()
    } catch (error) {
      console.error('Form submission error:', error)
      toast.error(error.message || 'An error occurred while saving the achievement')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (achievementId) => {
    if (!window.confirm('Are you sure you want to delete this achievement?')) {
      return
    }

    try {
      await deleteAchievement(achievementId)
      toast.success('Achievement deleted successfully!')
      fetchAchievements()
    } catch (error) {
      toast.error(error.message || 'Failed to delete achievement')
    }
  }

  const handleToggleFeatured = async (achievementId, currentStatus) => {
    try {
      await toggleFeatured(achievementId)
      toast.success(`Achievement ${!currentStatus ? 'featured' : 'unfeatured'} successfully!`)
      fetchAchievements()
    } catch (error) {
      toast.error(error.message || 'Failed to update featured status')
    }
  }

  const getCategoryIcon = (category) => {
    const option = categoryOptions.find(opt => opt.value === category)
    const IconComponent = option?.icon || Award
    return <IconComponent className="w-4 h-4" />
  }

  const getLevelColor = (level) => {
    const option = levelOptions.find(opt => opt.value === level)
    return option?.color || 'default'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
        <span className="ml-3 text-gray-400">Loading achievements...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-3" />
          <p className="text-red-400 mb-4">{error}</p>
          <Button onClick={fetchAchievements} variant="outline" size="sm">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Achievement Management</h2>
          <p className="text-gray-400 mt-1">Manage club achievements and awards</p>
        </div>
        <Button 
          onClick={() => handleOpenModal()}
          className="flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Achievement</span>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Achievements</p>
              <p className="text-2xl font-bold text-white">{achievements.length}</p>
            </div>
            <Award className="w-8 h-8 text-primary-500" />
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Featured</p>
              <p className="text-2xl font-bold text-yellow-400">
                {achievements.filter(a => a.is_featured).length}
              </p>
            </div>
            <Star className="w-8 h-8 text-yellow-500" />
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">This Year</p>
              <p className="text-2xl font-bold text-green-400">
                {achievements.filter(a => a.year === new Date().getFullYear()).length}
              </p>
            </div>
            <Calendar className="w-8 h-8 text-green-500" />
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">International</p>
              <p className="text-2xl font-bold text-blue-400">
                {achievements.filter(a => a.level === 'international').length}
              </p>
            </div>
            <Trophy className="w-8 h-8 text-blue-500" />
          </div>
        </Card>
      </div>

      {/* Achievements Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-dark-800 border-b border-dark-600">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Achievement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Year
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-600">
              <AnimatePresence>
                {achievements.map((achievement) => (
                  <motion.tr
                    key={achievement._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="hover:bg-dark-700 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {achievement.image && (
                          <img
                            src={achievement.image}
                            alt={achievement.title}
                            className="w-10 h-10 rounded-lg object-cover mr-3"
                            onError={(e) => {
                              e.target.style.display = 'none'
                            }}
                          />
                        )}
                        <div>
                          <div className="text-sm font-medium text-white">
                            {achievement.title}
                          </div>
                          <div className="text-sm text-gray-400 max-w-xs truncate">
                            {achievement.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getCategoryIcon(achievement.category)}
                        <span className="text-sm text-gray-300 capitalize">
                          {achievement.category}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getLevelColor(achievement.level)} size="sm">
                        {achievement.level}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {achievement.year}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {achievement.is_featured && (
                          <Badge variant="warning" size="sm">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleFeatured(achievement._id, achievement.is_featured)}
                          title={achievement.is_featured ? 'Unfeature' : 'Feature'}
                        >
                          {achievement.is_featured ? (
                            <StarOff className="w-4 h-4" />
                          ) : (
                            <Star className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenModal(achievement)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(achievement._id)}
                          className="text-red-400 hover:text-red-300 border-red-400 hover:border-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingAchievement ? 'Edit Achievement' : 'Add New Achievement'}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              maxLength={200}
              className={`w-full px-4 py-2 bg-dark-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                formErrors.title ? 'border-red-500' : 'border-dark-600'
              }`}
              placeholder="Enter achievement title"
            />
            {formErrors.title && (
              <p className="text-red-400 text-sm mt-1">{formErrors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={4}
              maxLength={2000}
              className={`w-full px-4 py-2 bg-dark-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none ${
                formErrors.description ? 'border-red-500' : 'border-dark-600'
              }`}
              placeholder="Enter achievement description"
            />
            {formErrors.description && (
              <p className="text-red-400 text-sm mt-1">{formErrors.description}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              {formData.description.length}/2000 characters
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {categoryOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Level
              </label>
              <select
                name="level"
                value={formData.level}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {levelOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Year *
            </label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              required
              min="2020"
              max={new Date().getFullYear() + 5}
              className={`w-full px-4 py-2 bg-dark-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                formErrors.year ? 'border-red-500' : 'border-dark-600'
              }`}
            />
            {formErrors.year && (
              <p className="text-red-400 text-sm mt-1">{formErrors.year}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Image URL
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 bg-dark-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                formErrors.image ? 'border-red-500' : 'border-dark-600'
              }`}
              placeholder="https://example.com/image.jpg"
            />
            {formErrors.image && (
              <p className="text-red-400 text-sm mt-1">{formErrors.image}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Enter a direct URL to the achievement image (optional)
            </p>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="is_featured"
              checked={formData.is_featured}
              onChange={handleInputChange}
              id="is_featured"
              className="w-4 h-4 text-primary-600 bg-dark-700 border-dark-600 rounded focus:ring-primary-500 focus:ring-2"
            />
            <label htmlFor="is_featured" className="ml-2 text-sm text-gray-300">
              Feature this achievement
            </label>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCloseModal}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={submitting}
              className="flex items-center space-x-2"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>{editingAchievement ? 'Update' : 'Create'}</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default AchievementManagement

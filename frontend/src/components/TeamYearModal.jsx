import React, { useState, useEffect } from 'react'
import Modal from './ui/Modal'

const TeamYearModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  teamYear = null, 
  loading = false,
  existingYears = []
}) => {
  const [formData, setFormData] = useState({
    year: '',
    description: ''
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (teamYear) {
      setFormData({
        year: teamYear.year?.toString() || '',
        description: teamYear.description || ''
      })
    } else {
      setFormData({
        year: '',
        description: ''
      })
    }
    setErrors({})
  }, [teamYear, isOpen])

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.year.trim()) {
      newErrors.year = 'Year is required'
    } else {
      const year = parseInt(formData.year)
      
      if (isNaN(year)) {
        newErrors.year = 'Year must be a valid number'
      } else if (year < 2000 || year > 3000) {
        newErrors.year = 'Year must be between 2000 and 3000'
      } else if (!teamYear && existingYears.includes(year)) {
        newErrors.year = 'This year already exists'
      } else if (teamYear && teamYear.year !== year && existingYears.includes(year)) {
        newErrors.year = 'This year already exists'
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    const cleanedData = {
      year: parseInt(formData.year),
      description: formData.description.trim()
    }
    
    onSave(cleanedData)
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const currentYear = new Date().getFullYear()
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`${teamYear ? 'Edit' : 'Add'} Team Year`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Year */}
        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-300 mb-2">
            Year *
          </label>
          <input
            type="number"
            id="year"
            min="2000"
            max="3000"
            value={formData.year}
            onChange={(e) => handleInputChange('year', e.target.value)}
            className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.year ? 'border-red-500' : 'border-gray-600'
            }`}
            placeholder={`e.g., ${currentYear}`}
            disabled={loading}
          />
          {errors.year && <p className="mt-1 text-sm text-red-500">{errors.year}</p>}
          <p className="mt-1 text-xs text-gray-400">
            Enter the year this team was active (e.g., {currentYear - 1}, {currentYear}, {currentYear + 1})
          </p>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
            Description
          </label>
          <textarea
            id="description"
            rows={3}
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
            placeholder="Optional description for this year's team (e.g., Founding Year, Championship Year, etc.)"
            disabled={loading}
            maxLength={500}
          />
          <div className="flex justify-between mt-1">
            <p className="text-xs text-gray-400">
              Optional description for this team year
            </p>
            <p className="text-xs text-gray-400">
              {formData.description.length}/500
            </p>
          </div>
        </div>

        {/* Existing Years Info */}
        {existingYears.length > 0 && (
          <div className="bg-gray-800 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-300 mb-2">Existing Years:</h4>
            <div className="flex flex-wrap gap-2">
              {existingYears.sort((a, b) => b - a).map(year => (
                <span key={year} className="bg-blue-600 text-blue-100 px-2 py-1 rounded text-xs">
                  {year}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6 border-t border-gray-600">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Saving...' : (teamYear ? 'Update Year' : 'Add Year')}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default TeamYearModal

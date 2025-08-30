import React, { useState, useEffect } from 'react'
import { FaTimes, FaPlus, FaTrash } from 'react-icons/fa'
import Modal from './ui/Modal'

const TeamMemberModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  member = null, 
  year,
  loading = false 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    photo: '',
    linkedin: '',
    github: '',
    otherLinks: []
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name || '',
        role: member.role || '',
        photo: member.photo || '',
        linkedin: member.linkedin || '',
        github: member.github || '',
        otherLinks: member.otherLinks || []
      })
    } else {
      setFormData({
        name: '',
        role: '',
        photo: '',
        linkedin: '',
        github: '',
        otherLinks: []
      })
    }
    setErrors({})
  }, [member, isOpen])

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.role.trim()) {
      newErrors.role = 'Role is required'
    }
    
    if (formData.linkedin && !formData.linkedin.includes('linkedin.com')) {
      newErrors.linkedin = 'Please enter a valid LinkedIn URL'
    }
    
    if (formData.github && !formData.github.includes('github.com')) {
      newErrors.github = 'Please enter a valid GitHub URL'
    }

    // Validate other links
    formData.otherLinks.forEach((link, index) => {
      if (link.name && !link.url) {
        newErrors[`otherLink_${index}_url`] = 'URL is required when name is provided'
      }
      if (link.url && !link.url.startsWith('http')) {
        newErrors[`otherLink_${index}_url`] = 'URL must start with http:// or https://'
      }
    })
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    // Filter out empty other links
    const cleanedData = {
      ...formData,
      otherLinks: formData.otherLinks.filter(link => link.name && link.url)
    }
    
    onSave(cleanedData)
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const addOtherLink = () => {
    setFormData(prev => ({
      ...prev,
      otherLinks: [...prev.otherLinks, { name: '', url: '' }]
    }))
  }

  const removeOtherLink = (index) => {
    setFormData(prev => ({
      ...prev,
      otherLinks: prev.otherLinks.filter((_, i) => i !== index)
    }))
    // Clear related errors
    const newErrors = { ...errors }
    delete newErrors[`otherLink_${index}_url`]
    delete newErrors[`otherLink_${index}_name`]
    setErrors(newErrors)
  }

  const updateOtherLink = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      otherLinks: prev.otherLinks.map((link, i) => 
        i === index ? { ...link, [field]: value } : link
      )
    }))
    
    // Clear related errors
    if (errors[`otherLink_${index}_${field}`]) {
      setErrors(prev => ({ ...prev, [`otherLink_${index}_${field}`]: '' }))
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`${member ? 'Edit' : 'Add'} Team Member - ${year}`}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.name ? 'border-red-500' : 'border-gray-600'
            }`}
            placeholder="Enter member name"
            disabled={loading}
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
        </div>

        {/* Role */}
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-2">
            Role/Position *
          </label>
          <input
            type="text"
            id="role"
            value={formData.role}
            onChange={(e) => handleInputChange('role', e.target.value)}
            className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.role ? 'border-red-500' : 'border-gray-600'
            }`}
            placeholder="e.g., President, Technical Lead, Member"
            disabled={loading}
          />
          {errors.role && <p className="mt-1 text-sm text-red-500">{errors.role}</p>}
        </div>

        {/* Photo URL */}
        <div>
          <label htmlFor="photo" className="block text-sm font-medium text-gray-300 mb-2">
            Profile Photo URL
          </label>
          <input
            type="url"
            id="photo"
            value={formData.photo}
            onChange={(e) => handleInputChange('photo', e.target.value)}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="https://example.com/photo.jpg"
            disabled={loading}
          />
          <p className="mt-1 text-xs text-gray-400">
            Leave empty to use a default avatar
          </p>
        </div>

        {/* LinkedIn */}
        <div>
          <label htmlFor="linkedin" className="block text-sm font-medium text-gray-300 mb-2">
            LinkedIn Profile
          </label>
          <input
            type="url"
            id="linkedin"
            value={formData.linkedin}
            onChange={(e) => handleInputChange('linkedin', e.target.value)}
            className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.linkedin ? 'border-red-500' : 'border-gray-600'
            }`}
            placeholder="https://linkedin.com/in/username"
            disabled={loading}
          />
          {errors.linkedin && <p className="mt-1 text-sm text-red-500">{errors.linkedin}</p>}
        </div>

        {/* GitHub */}
        <div>
          <label htmlFor="github" className="block text-sm font-medium text-gray-300 mb-2">
            GitHub Profile
          </label>
          <input
            type="url"
            id="github"
            value={formData.github}
            onChange={(e) => handleInputChange('github', e.target.value)}
            className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.github ? 'border-red-500' : 'border-gray-600'
            }`}
            placeholder="https://github.com/username"
            disabled={loading}
          />
          {errors.github && <p className="mt-1 text-sm text-red-500">{errors.github}</p>}
        </div>

        {/* Other Links */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-300">
              Other Links
            </label>
            <button
              type="button"
              onClick={addOtherLink}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm flex items-center gap-2 transition-colors"
              disabled={loading}
            >
              <FaPlus size={12} />
              Add Link
            </button>
          </div>
          
          {formData.otherLinks.map((link, index) => (
            <div key={index} className="flex gap-3 mb-3">
              <input
                type="text"
                value={link.name}
                onChange={(e) => updateOtherLink(index, 'name', e.target.value)}
                className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Link name (e.g., Portfolio)"
                disabled={loading}
              />
              <input
                type="url"
                value={link.url}
                onChange={(e) => updateOtherLink(index, 'url', e.target.value)}
                className={`flex-1 px-3 py-2 bg-gray-700 border rounded text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors[`otherLink_${index}_url`] ? 'border-red-500' : 'border-gray-600'
                }`}
                placeholder="https://example.com"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => removeOtherLink(index)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded transition-colors"
                disabled={loading}
              >
                <FaTrash size={12} />
              </button>
              {errors[`otherLink_${index}_url`] && (
                <p className="col-span-3 text-sm text-red-500 mt-1">
                  {errors[`otherLink_${index}_url`]}
                </p>
              )}
            </div>
          ))}
        </div>

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
            {loading ? 'Saving...' : (member ? 'Update Member' : 'Add Member')}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default TeamMemberModal

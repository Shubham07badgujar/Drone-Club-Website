import React, { useState, useEffect } from 'react'
import useProjects from '../hooks/useProjects'
import Modal from '../components/ui/Modal'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'

const ProjectManagement = () => {
  const {
    projects,
    loading,
    error,
    createProject,
    updateProject,
    deleteProject,
    toggleFeatured,
    fetchProjects,
    setError
  } = useProjects()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    year: new Date().getFullYear(),
    description: '',
    teamContributions: '',
    imageUrl: '',
    category: 'Competition',
    status: 'Planning',
    technologies: [],
    teamMembers: [],
    githubUrl: '',
    demoUrl: '',
    is_featured: false,
    display_order: 0
  })
  const [techInput, setTechInput] = useState('')
  const [memberInput, setMemberInput] = useState({ name: '', role: '' })
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Category options
  const categoryOptions = [
    'Competition',
    'Research', 
    'Commercial',
    'Educational',
    'Open Source',
    'Innovation',
    'Community',
    'Collaboration'
  ]

  // Status options
  const statusOptions = [
    'Planning',
    'In Progress', 
    'Completed',
    'On Hold'
  ]

  // Status color mapping
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'green'
      case 'In Progress': return 'blue'
      case 'Planning': return 'yellow'
      case 'On Hold': return 'red'
      default: return 'gray'
    }
  }

  // Category color mapping
  const getCategoryColor = (category) => {
    switch (category) {
      case 'Competition': return 'purple'
      case 'Research': return 'blue'
      case 'Commercial': return 'green'
      case 'Educational': return 'yellow'
      case 'Innovation': return 'pink'
      default: return 'gray'
    }
  }

  // Form validation
  const validateForm = () => {
    const errors = {}

    if (!formData.title.trim()) {
      errors.title = 'Title is required'
    } else if (formData.title.length < 3) {
      errors.title = 'Title must be at least 3 characters'
    }

    if (!formData.year) {
      errors.year = 'Year is required'
    } else if (formData.year < 2000 || formData.year > new Date().getFullYear() + 5) {
      errors.year = 'Year must be between 2000 and ' + (new Date().getFullYear() + 5)
    }

    if (!formData.description.trim()) {
      errors.description = 'Description is required'
    } else if (formData.description.length < 10) {
      errors.description = 'Description must be at least 10 characters'
    }

    if (!formData.teamContributions.trim()) {
      errors.teamContributions = 'Team contributions are required'
    } else if (formData.teamContributions.length < 10) {
      errors.teamContributions = 'Team contributions must be at least 10 characters'
    }

    if (formData.imageUrl && !isValidUrl(formData.imageUrl)) {
      errors.imageUrl = 'Please enter a valid URL'
    }

    if (formData.githubUrl && !isValidUrl(formData.githubUrl)) {
      errors.githubUrl = 'Please enter a valid GitHub URL'
    }

    if (formData.demoUrl && !isValidUrl(formData.demoUrl)) {
      errors.demoUrl = 'Please enter a valid demo URL'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // URL validation helper
  const isValidUrl = (string) => {
    try {
      new URL(string)
      return true
    } catch (_) {
      return false
    }
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Clear specific field error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  // Add technology
  const addTechnology = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()]
      }))
      setTechInput('')
    }
  }

  // Remove technology
  const removeTechnology = (tech) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }))
  }

  // Add team member
  const addTeamMember = () => {
    if (memberInput.name.trim() && memberInput.role.trim()) {
      const isDuplicate = formData.teamMembers.some(
        member => member.name.toLowerCase() === memberInput.name.toLowerCase()
      )
      
      if (!isDuplicate) {
        setFormData(prev => ({
          ...prev,
          teamMembers: [...prev.teamMembers, { ...memberInput }]
        }))
        setMemberInput({ name: '', role: '' })
      }
    }
  }

  // Remove team member
  const removeTeamMember = (index) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((_, i) => i !== index)
    }))
  }

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      year: new Date().getFullYear(),
      description: '',
      teamContributions: '',
      imageUrl: '',
      category: 'Competition',
      status: 'Planning',
      technologies: [],
      teamMembers: [],
      githubUrl: '',
      demoUrl: '',
      is_featured: false,
      display_order: 0
    })
    setTechInput('')
    setMemberInput({ name: '', role: '' })
    setFormErrors({})
    setError('')
  }

  // Open modal for creating new project
  const openCreateModal = () => {
    resetForm()
    setEditingProject(null)
    setIsModalOpen(true)
  }

  // Open modal for editing project
  const openEditModal = (project) => {
    setFormData({
      title: project.title || '',
      year: project.year || new Date().getFullYear(),
      description: project.description || '',
      teamContributions: project.teamContributions || '',
      imageUrl: project.imageUrl || '',
      category: project.category || 'Competition',
      status: project.status || 'Planning',
      technologies: project.technologies || [],
      teamMembers: project.teamMembers || [],
      githubUrl: project.githubUrl || '',
      demoUrl: project.demoUrl || '',
      is_featured: project.is_featured || false,
      display_order: project.display_order || 0
    })
    setEditingProject(project)
    setIsModalOpen(true)
    setFormErrors({})
    setError('')
  }

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false)
    setEditingProject(null)
    resetForm()
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      // Sanitize & enforce backend length limits before sending
      const sanitized = {
        ...formData,
        title: String(formData.title).trim(),
        description: String(formData.description).trim().slice(0, 1000), // backend max 1000
        teamContributions: String(formData.teamContributions).trim().slice(0, 5000),
        technologies: (formData.technologies || []).map(t => t.trim()).filter(Boolean),
        teamMembers: (formData.teamMembers || []).map(m => ({
          name: String(m.name).trim(),
          role: String(m.role).trim()
        })).filter(m => m.name && m.role),
        year: Number(formData.year)
      }

      let result
      if (editingProject) {
        result = await updateProject(editingProject._id, sanitized)
      } else {
        result = await createProject(sanitized)
      }

      if (result.success) {
        closeModal()
        await fetchProjects()
      } else {
        setError(result.message || 'Operation failed')
        if (result.errors && typeof result.errors === 'object') {
          setFormErrors(prev => ({ ...prev, ...result.errors }))
        }
      }
    } catch (err) {
      console.error('Submit error:', err)
      setError('An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle delete project
  const handleDelete = async (projectId, projectTitle) => {
    if (window.confirm(`Are you sure you want to delete "${projectTitle}"? This action cannot be undone.`)) {
      const result = await deleteProject(projectId)
      if (result.success) {
        await fetchProjects()
      }
    }
  }

  // Handle toggle featured
  const handleToggleFeatured = async (projectId) => {
    const result = await toggleFeatured(projectId)
    if (result.success) {
      await fetchProjects()
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Project Management</h2>
          <p className="text-gray-600 mt-1">Manage your drone club projects and showcase your achievements</p>
        </div>
        <Button onClick={openCreateModal} className="bg-blue-600 hover:bg-blue-700">
          Add New Project
        </Button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <div className="text-red-800 text-sm">{error}</div>
          </div>
        </div>
      )}

      {/* Projects List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading projects...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-dashed border-gray-300 text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-7l2 8-2 8M5 4l2 8-2 8" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">No Projects Found</h3>
            <p className="text-gray-600 mb-6">Get started by adding your first drone project to showcase your team's work.</p>
            <Button onClick={openCreateModal} className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Your First Project
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Projects Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Projects</p>
                  <p className="text-3xl font-bold">{projects.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-400 bg-opacity-30 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Completed</p>
                  <p className="text-3xl font-bold">{projects.filter(p => p.status === 'Completed').length}</p>
                </div>
                <div className="w-12 h-12 bg-green-400 bg-opacity-30 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm font-medium">In Progress</p>
                  <p className="text-3xl font-bold">{projects.filter(p => p.status === 'In Progress').length}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-400 bg-opacity-30 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Featured</p>
                  <p className="text-3xl font-bold">{projects.filter(p => p.is_featured).length}</p>
                </div>
                <div className="w-12 h-12 bg-purple-400 bg-opacity-30 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid gap-6">
            {projects.map((project) => (
              <div key={project._id} className="group bg-white rounded-2xl border border-gray-200 hover:border-gray-300 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
                <div className="p-8">
                  {/* Project Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                          {project.title}
                        </h3>
                        {project.is_featured && (
                          <div className="flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-bold rounded-full border border-yellow-200">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            FEATURED
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-3 mb-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${
                          getCategoryColor(project.category) === 'purple' ? 'bg-purple-100 text-purple-800 border-purple-200' :
                          getCategoryColor(project.category) === 'blue' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                          getCategoryColor(project.category) === 'green' ? 'bg-green-100 text-green-800 border-green-200' :
                          getCategoryColor(project.category) === 'yellow' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                          getCategoryColor(project.category) === 'pink' ? 'bg-pink-100 text-pink-800 border-pink-200' :
                          'bg-gray-100 text-gray-800 border-gray-200'
                        }`}>
                          {project.category}
                        </span>
                        
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${
                          getStatusColor(project.status) === 'green' ? 'bg-green-100 text-green-800 border-green-200' :
                          getStatusColor(project.status) === 'blue' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                          getStatusColor(project.status) === 'yellow' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                          getStatusColor(project.status) === 'red' ? 'bg-red-100 text-red-800 border-red-200' :
                          'bg-gray-100 text-gray-800 border-gray-200'
                        }`}>
                          <div className={`w-2 h-2 rounded-full mr-2 ${
                            getStatusColor(project.status) === 'green' ? 'bg-green-500' :
                            getStatusColor(project.status) === 'blue' ? 'bg-blue-500' :
                            getStatusColor(project.status) === 'yellow' ? 'bg-yellow-500' :
                            getStatusColor(project.status) === 'red' ? 'bg-red-500' :
                            'bg-gray-500'
                          }`}></div>
                          {project.status}
                        </span>
                        
                        <span className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full border border-gray-200">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {project.year}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 ml-6">
                      <button
                        onClick={() => handleToggleFeatured(project._id)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 transform hover:scale-105 ${
                          project.is_featured 
                            ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border border-yellow-200' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                        }`}
                        disabled={loading}
                      >
                        <svg className="w-4 h-4 mr-1 inline" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {project.is_featured ? 'Unfeature' : 'Feature'}
                      </button>
                      
                      <button
                        onClick={() => openEditModal(project)}
                        className="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 rounded-lg border border-blue-200 transition-all duration-200 transform hover:scale-105"
                      >
                        <svg className="w-4 h-4 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </button>
                      
                      <button
                        onClick={() => handleDelete(project._id, project.title)}
                        className="px-4 py-2 text-sm font-medium text-red-700 bg-red-100 hover:bg-red-200 rounded-lg border border-red-200 transition-all duration-200 transform hover:scale-105"
                      >
                        <svg className="w-4 h-4 mr-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Project Description */}
                  <p className="text-gray-700 text-base leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Project Details Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Technologies */}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-gray-900 flex items-center">
                          <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                          </svg>
                          Technologies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 4).map((tech, index) => (
                            <span key={index} className="inline-flex items-center px-2.5 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-md border border-indigo-200">
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="inline-flex items-center px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md border border-gray-200">
                              +{project.technologies.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Team Members */}
                    {project.teamMembers && project.teamMembers.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-gray-900 flex items-center">
                          <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          Team ({project.teamMembers.length} members)
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.teamMembers.slice(0, 3).map((member, index) => (
                            <div key={index} className="inline-flex items-center px-2.5 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-md border border-green-200">
                              <div className="w-4 h-4 bg-green-300 rounded-full mr-2"></div>
                              {member.name}
                            </div>
                          ))}
                          {project.teamMembers.length > 3 && (
                            <span className="inline-flex items-center px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md border border-gray-200">
                              +{project.teamMembers.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* External Links */}
                    {(project.githubUrl || project.demoUrl) && (
                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-gray-900 flex items-center">
                          <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Links
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {project.githubUrl && (
                            <a 
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg border border-gray-200 transition-all duration-200 transform hover:scale-105"
                            >
                              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                              </svg>
                              GitHub
                            </a>
                          )}
                          {project.demoUrl && (
                            <a 
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 rounded-lg border border-blue-200 transition-all duration-200 transform hover:scale-105"
                            >
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              Demo
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal for Create/Edit */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal}
        title={editingProject ? 'Edit Project' : 'Add New Project'}
        size="4xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6 pb-24">
            {/* Basic Information Section */}
            <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 ${
                      formErrors.title ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                    placeholder="Enter project title"
                  />
                  {formErrors.title && (
                    <p className="text-red-600 text-sm flex items-center mt-1">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {formErrors.title}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Project Year *
                  </label>
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    min="2000"
                    max={new Date().getFullYear() + 5}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 ${
                      formErrors.year ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  />
                  {formErrors.year && (
                    <p className="text-red-600 text-sm flex items-center mt-1">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {formErrors.year}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white hover:border-gray-300 transition-colors text-gray-900"
                  >
                    {categoryOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white hover:border-gray-300 transition-colors text-gray-900"
                  >
                    {statusOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Project Description Section */}
            <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Project Description
              </h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Project Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none text-gray-900 ${
                      formErrors.description ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                    placeholder="Describe the project objectives, goals, and outcomes..."
                  />
                  {formErrors.description && (
                    <p className="text-red-600 text-sm flex items-center mt-1">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {formErrors.description}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Team Contributions *
                  </label>
                  <textarea
                    name="teamContributions"
                    value={formData.teamContributions}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none text-gray-900 ${
                      formErrors.teamContributions ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                    placeholder="Describe how team members contributed to the project..."
                  />
                  {formErrors.teamContributions && (
                    <p className="text-red-600 text-sm flex items-center mt-1">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {formErrors.teamContributions}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Media & Links Section */}
            <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                Media & Links
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Project Image URL
                  </label>
                  <input
                    type="url"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 ${
                      formErrors.imageUrl ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                    placeholder="https://example.com/image.jpg"
                  />
                  {formErrors.imageUrl && (
                    <p className="text-red-600 text-sm flex items-center mt-1">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {formErrors.imageUrl}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    <svg className="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    name="githubUrl"
                    value={formData.githubUrl}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 ${
                      formErrors.githubUrl ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                    placeholder="https://github.com/username/repo"
                  />
                  {formErrors.githubUrl && (
                    <p className="text-red-600 text-sm flex items-center mt-1">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {formErrors.githubUrl}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Demo URL
                  </label>
                  <input
                    type="url"
                    name="demoUrl"
                    value={formData.demoUrl}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 ${
                      formErrors.demoUrl ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                    placeholder="https://demo.example.com"
                  />
                  {formErrors.demoUrl && (
                    <p className="text-red-600 text-sm flex items-center mt-1">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {formErrors.demoUrl}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Technologies Section */}
            <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                Technologies & Tools
              </h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white hover:border-gray-300 transition-colors text-gray-900"
                    placeholder="Add technology (press Enter or click Add)"
                  />
                  <Button 
                    type="button" 
                    onClick={addTechnology} 
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors duration-200 font-medium"
                  >
                    Add
                  </Button>
                </div>
                {formData.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 bg-white p-4 rounded-xl border border-gray-200">
                    {formData.technologies.map((tech, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 cursor-pointer hover:bg-blue-200 transition-colors"
                        onClick={() => removeTechnology(tech)}
                      >
                        {tech} 
                        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Team Members Section */}
            <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                Team Members
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input
                    type="text"
                    value={memberInput.name}
                    onChange={(e) => setMemberInput(prev => ({ ...prev, name: e.target.value }))}
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white hover:border-gray-300 transition-colors text-gray-900"
                    placeholder="Member name"
                  />
                  <input
                    type="text"
                    value={memberInput.role}
                    onChange={(e) => setMemberInput(prev => ({ ...prev, role: e.target.value }))}
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white hover:border-gray-300 transition-colors text-gray-900"
                    placeholder="Member role"
                  />
                  <Button 
                    type="button" 
                    onClick={addTeamMember} 
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors duration-200 font-medium"
                  >
                    Add Member
                  </Button>
                </div>
                {formData.teamMembers.length > 0 && (
                  <div className="space-y-2 bg-white p-4 rounded-xl border border-gray-200">
                    {formData.teamMembers.map((member, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-xl border border-gray-200">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{member.name}</p>
                            <p className="text-sm text-gray-500">{member.role}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeTeamMember(index)}
                          className="text-red-600 hover:text-red-800 p-1 rounded transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Settings Section */}
            <div className="bg-gray-50 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                Project Settings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="is_featured"
                    name="is_featured"
                    checked={formData.is_featured}
                    onChange={handleInputChange}
                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="is_featured" className="flex items-center text-sm font-medium text-gray-700">
                    <svg className="w-4 h-4 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Featured Project
                  </label>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Display Order
                  </label>
                  <input
                    type="number"
                    name="display_order"
                    value={formData.display_order}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white hover:border-gray-300 transition-colors text-gray-900"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            {/* Form Error Display */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="text-red-800 text-sm font-medium">{error}</p>
                </div>
              </div>
            )}
          </div>

          {/* Submit Buttons - Fixed at the bottom */}
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end gap-4 z-10">
            <Button 
              type="button" 
              onClick={closeModal} 
              className="px-8 py-3 border-2 border-gray-300 text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 rounded-xl transition-colors duration-200 font-medium"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl transition-colors duration-200 font-medium shadow-lg hover:shadow-xl"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </div>
              ) : (
                editingProject ? 'Update Project' : 'Create Project'
              )}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default ProjectManagement

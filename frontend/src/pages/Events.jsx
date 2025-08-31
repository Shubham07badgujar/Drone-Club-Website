import React, { useState, useEffect } from 'react'
import { useEvents } from '../hooks/useEvents'
import EventCard from '../components/cards/EventCard'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const Events = () => {
  const { 
    events, 
    featuredEvents, 
    upcomingEvents, 
    loading, 
    error, 
    createEvent, 
    updateEvent, 
    deleteEvent, 
    toggleFeatured,
    fetchEvents
  } = useEvents()
  
  const { user } = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [formData, setFormData] = useState({
    eventName: '',
    description: '',
    highlights: [],
    date: '',
    time: '',
    venue: '',
    registrationFee: '',
    registrationDeadline: '',
    prizePool: {
      total: '',
      firstPrize: '',
      secondPrize: '',
      thirdPrize: ''
    },
    rules: [],
    contactPersons: [{ name: '', phone: '' }],
    imageUrl: '',
    category: 'Competition',
    is_featured: false,
    status: 'Published'
  })

  // Helper functions for array management
  const addArrayItem = (fieldName, newItem) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: [...prev[fieldName], newItem]
    }))
  }

  const removeArrayItem = (fieldName, index) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: prev[fieldName].filter((_, i) => i !== index)
    }))
  }

  const updateArrayItem = (fieldName, index, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: prev[fieldName].map((item, i) => i === index ? value : item)
    }))
  }

  // Helper functions for contact persons
  const addContactPerson = () => {
    setFormData(prev => ({
      ...prev,
      contactPersons: [...prev.contactPersons, { name: '', phone: '' }]
    }))
  }

  const updateContactPerson = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      contactPersons: prev.contactPersons.map((contact, i) => 
        i === index ? { ...contact, [field]: value } : contact
      )
    }))
  }

  const isAdmin = user?.role === 'admin' || user?.role === 'super-admin' || user?.role === 'super_admin'

  const filteredEvents = events.filter(event => {
    const matchesFilter = filter === 'all' || event.category?.toLowerCase() === filter.toLowerCase()
    const matchesSearch = event.eventName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description?.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const categories = ['All', 'Competition', 'Workshop', 'Seminar', 'Conference', 'Hackathon', 'Training', 'Social', 'Other']

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const eventData = {
        ...formData,
        date: new Date(formData.date).toISOString(),
        registrationDeadline: formData.registrationDeadline ? 
          new Date(formData.registrationDeadline).toISOString() : null,
        prizePool: formData.prizePool.total ? {
          total: Number(formData.prizePool.total) || null,
          firstPrize: Number(formData.prizePool.firstPrize) || null,
          secondPrize: Number(formData.prizePool.secondPrize) || null,
          thirdPrize: Number(formData.prizePool.thirdPrize) || null
        } : null,
        highlights: formData.highlights.filter(h => h.trim() !== ''),
        rules: formData.rules.filter(r => r.trim() !== ''),
        contactPersons: formData.contactPersons.filter(c => c.name && c.phone)
      }

      let result
      if (editingEvent) {
        result = await updateEvent(editingEvent._id, eventData)
      } else {
        result = await createEvent(eventData)
      }

      if (result.success) {
        setIsModalOpen(false)
        setEditingEvent(null)
        resetForm()
        await fetchEvents()
      }
    } catch (error) {
      console.error('Error submitting event:', error)
      toast.error('Failed to save event')
    }
  }

  const resetForm = () => {
    setFormData({
      eventName: '',
      description: '',
      highlights: [],
      date: '',
      time: '',
      venue: '',
      registrationFee: '',
      registrationDeadline: '',
      prizePool: {
        total: '',
        firstPrize: '',
        secondPrize: '',
        thirdPrize: ''
      },
      rules: [],
      contactPersons: [],
      imageUrl: '',
      category: 'Competition',
      is_featured: false,
      status: 'Published'
    })
  }

  const handleEdit = (event) => {
    setEditingEvent(event)
    setFormData({
      eventName: event.eventName || '',
      description: event.description || '',
      highlights: event.highlights || [],
      date: event.date ? new Date(event.date).toISOString().split('T')[0] : '',
      time: event.time || '',
      venue: event.venue || '',
      registrationFee: event.registrationFee || '',
      registrationDeadline: event.registrationDeadline ? 
        new Date(event.registrationDeadline).toISOString().split('T')[0] : '',
      prizePool: {
        total: event.prizePool?.total?.toString() || '',
        firstPrize: event.prizePool?.firstPrize?.toString() || '',
        secondPrize: event.prizePool?.secondPrize?.toString() || '',
        thirdPrize: event.prizePool?.thirdPrize?.toString() || ''
      },
      rules: event.rules || [],
      contactPersons: event.contactPersons || [],
      imageUrl: event.imageUrl || '',
      category: event.category || 'Competition',
      is_featured: event.is_featured || false,
      status: event.status || 'Published'
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(id)
        await fetchEvents()
      } catch (error) {
        console.error('Error deleting event:', error)
      }
    }
  }

  const handleToggleFeatured = async (id) => {
    try {
      await toggleFeatured(id)
      await fetchEvents()
    } catch (error) {
      console.error('Error toggling featured status:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading events...</p>
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
          <h1 className="text-4xl font-bold text-white mb-4">Events</h1>
          <p className="text-xl text-gray-400">Discover exciting drone events and workshops</p>
        </div>

        {/* Admin Actions */}
        {isAdmin && (
          <div className="mb-8 text-center">
            <Button
              onClick={() => {
                resetForm()
                setEditingEvent(null)
                setIsModalOpen(true)
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
            >
              Add New Event
            </Button>
          </div>
        )}

        {/* Filters and Search */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category.toLowerCase())}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === category.toLowerCase()
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-800 text-white px-4 py-2 pl-10 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
            />
            <svg className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Featured Events Section */}
        {featuredEvents.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Featured Events</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredEvents.map((event) => (
                <EventCard
                  key={event._id}
                  event={event}
                  onEdit={isAdmin ? () => handleEdit(event) : undefined}
                  onDelete={isAdmin ? () => handleDelete(event._id) : undefined}
                  onToggleFeatured={isAdmin ? () => handleToggleFeatured(event._id) : undefined}
                  isAdmin={isAdmin}
                />
              ))}
            </div>
          </div>
        )}

        {/* All Events Section */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">
            {filter === 'all' ? 'All Events' : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Events`}
          </h2>
          
          {error && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-500 rounded-lg">
              <p className="text-red-400">{error}</p>
            </div>
          )}
          
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No events found.</p>
              {isAdmin && (
                <Button
                  onClick={() => {
                    resetForm()
                    setEditingEvent(null)
                    setIsModalOpen(true)
                  }}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                >
                  Create First Event
                </Button>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event._id}
                  event={event}
                  onEdit={isAdmin ? () => handleEdit(event) : undefined}
                  onDelete={isAdmin ? () => handleDelete(event._id) : undefined}
                  onToggleFeatured={isAdmin ? () => handleToggleFeatured(event._id) : undefined}
                  isAdmin={isAdmin}
                />
              ))}
            </div>
          )}
        </div>

        {/* Event Form Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setEditingEvent(null)
            resetForm()
          }}
          title={editingEvent ? 'Edit Event' : 'Add New Event'}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Event Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.eventName}
                  onChange={(e) => setFormData(prev => ({ ...prev, eventName: e.target.value }))}
                  className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                >
                  {categories.slice(1).map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Event Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Event Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Time *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., 10:00 AM"
                  value={formData.time}
                  onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                  className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Venue *
                </label>
                <input
                  type="text"
                  required
                  value={formData.venue}
                  onChange={(e) => setFormData(prev => ({ ...prev, venue: e.target.value }))}
                  className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Registration Fee
                </label>
                <input
                  type="text"
                  placeholder="e.g., Rs. 500/- or Free"
                  value={formData.registrationFee}
                  onChange={(e) => setFormData(prev => ({ ...prev, registrationFee: e.target.value }))}
                  className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Registration Deadline
              </label>
              <input
                type="date"
                value={formData.registrationDeadline}
                onChange={(e) => setFormData(prev => ({ ...prev, registrationDeadline: e.target.value }))}
                className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Highlights */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Event Highlights
              </label>
              {formData.highlights.map((highlight, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={highlight}
                    onChange={(e) => updateArrayItem('highlights', index, e.target.value)}
                    className="flex-1 bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                    placeholder="Enter highlight"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('highlights', index)}
                    className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('highlights', '')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
              >
                Add Highlight
              </button>
            </div>

            {/* Prize Pool */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Prize Pool (₹)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Total</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.prizePool.total}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      prizePool: { ...prev.prizePool, total: e.target.value }
                    }))}
                    className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                    placeholder="Total prize"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">1st Prize</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.prizePool.firstPrize}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      prizePool: { ...prev.prizePool, firstPrize: e.target.value }
                    }))}
                    className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                    placeholder="1st prize"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">2nd Prize</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.prizePool.secondPrize}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      prizePool: { ...prev.prizePool, secondPrize: e.target.value }
                    }))}
                    className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                    placeholder="2nd prize"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">3rd Prize</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.prizePool.thirdPrize}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      prizePool: { ...prev.prizePool, thirdPrize: e.target.value }
                    }))}
                    className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                    placeholder="3rd prize"
                  />
                </div>
              </div>
            </div>

            {/* Rules */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Event Rules
              </label>
              {formData.rules.map((rule, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={rule}
                    onChange={(e) => updateArrayItem('rules', index, e.target.value)}
                    className="flex-1 bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:border-blue-500 focus:outline-none"
                    placeholder="Enter rule"
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem('rules', index)}
                    className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('rules', '')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
              >
                Add Rule
              </button>
            </div>

            {/* Contact Persons */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Contact Persons
              </label>
              {formData.contactPersons.map((contact, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2 p-3 bg-gray-800 rounded-lg">
                  <input
                    type="text"
                    value={contact.name}
                    onChange={(e) => updateContactPerson(index, 'name', e.target.value)}
                    className="bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                    placeholder="Contact name"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={contact.phone}
                      onChange={(e) => updateContactPerson(index, 'phone', e.target.value)}
                      className="flex-1 bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                      placeholder="Phone number"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('contactPersons', index)}
                      className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addContactPerson}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
              >
                Add Contact Person
              </button>
            </div>

            {/* Additional Settings */}
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData(prev => ({ ...prev, is_featured: e.target.checked }))}
                  className="mr-2"
                />
                <span className="text-gray-300">Featured Event</span>
              </label>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-4 pt-4 border-t border-gray-700">
              <Button
                type="button"
                onClick={() => {
                  setIsModalOpen(false)
                  setEditingEvent(null)
                  resetForm()
                }}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
              >
                {editingEvent ? 'Update Event' : 'Create Event'}
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  )
}

export default Events

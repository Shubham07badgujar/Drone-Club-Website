import React, { useState } from 'react'
import { Calendar, Clock, MapPin, ChevronDown, ChevronUp, Users, Star, Edit, Trash2, Award, DollarSign } from 'lucide-react'
import Card from '../ui/Card'
import Button from '../ui/Button'
import Badge from '../ui/Badge'

const EventCard = ({ 
  event, 
  onRegister, 
  onEdit, 
  onDelete, 
  onToggleFeatured,
  isRegistered = false, 
  isAdmin = false 
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  
  if (!event) return null

  const {
    _id,
    eventName,
    description,
    date,
    time,
    venue,
    registrationFee,
    registrationDeadline,
    highlights,
    prizePool,
    rules,
    contactPersons,
    category,
    is_featured,
    status,
    imageUrl
  } = event

  // Handle different date formats
  const eventDate = date ? new Date(date) : null
  const isUpcoming = eventDate ? eventDate > new Date() : false
  const registrationDeadlineDate = registrationDeadline ? new Date(registrationDeadline) : null
  const isRegistrationOpen = registrationDeadlineDate ? registrationDeadlineDate > new Date() : true

  const formatDate = (date) => {
    if (!date) return 'TBD'
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date))
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'success'
      case 'completed': return 'default'
      case 'cancelled': return 'danger'
      case 'draft': return 'warning'
      default: return 'default'
    }
  }

  return (
    <Card className="group relative overflow-hidden">
      {/* Featured Badge */}
      {is_featured && (
        <div className="absolute top-4 right-4 z-10">
          <Badge variant="warning" className="flex items-center gap-1">
            <Star className="w-3 h-3" />
            Featured
          </Badge>
        </div>
      )}

      {/* Event Image */}
      {imageUrl && (
        <div className="w-full h-48 overflow-hidden rounded-t-lg">
          <img 
            src={imageUrl} 
            alt={eventName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {category && (
                <Badge variant="primary" size="sm">
                  {category}
                </Badge>
              )}
              <Badge variant={getStatusColor(status)} size="sm">
                {status || 'Active'}
              </Badge>
            </div>
            
            <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-200 mb-2">
              {eventName}
            </h3>
          </div>

          {/* Admin Actions */}
          {isAdmin && (
            <div className="flex gap-2 ml-4">
              <button
                onClick={() => onToggleFeatured?.(_id)}
                className={`p-2 rounded-lg transition-colors ${
                  is_featured 
                    ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                }`}
                title={is_featured ? 'Remove from featured' : 'Mark as featured'}
              >
                <Star className="w-4 h-4" />
              </button>
              <button
                onClick={() => onEdit?.(event)}
                className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                title="Edit event"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete?.(_id)}
                className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                title="Delete event"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Event Details */}
        <div className="space-y-3 mb-4">
          {date && (
            <div className="flex items-center text-gray-400">
              <Calendar className="w-4 h-4 mr-3 text-blue-400" />
              <span>{formatDate(date)}</span>
            </div>
          )}
          
          {time && (
            <div className="flex items-center text-gray-400">
              <Clock className="w-4 h-4 mr-3 text-blue-400" />
              <span>{time}</span>
            </div>
          )}
          
          {venue && (
            <div className="flex items-center text-gray-400">
              <MapPin className="w-4 h-4 mr-3 text-blue-400" />
              <span>{venue}</span>
            </div>
          )}

          {registrationFee !== undefined && (
            <div className="flex items-center text-gray-400">
              <DollarSign className="w-4 h-4 mr-3 text-blue-400" />
              <span>
                {registrationFee === 0 ? 'Free' : formatCurrency(registrationFee)}
              </span>
            </div>
          )}
        </div>

        {/* Description */}
        {description && (
          <div className="mb-4">
            <p className={`text-gray-400 text-sm leading-relaxed ${!isExpanded ? 'line-clamp-3' : ''}`}>
              {description}
            </p>
            
            {description.length > 150 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-blue-400 text-sm mt-2 flex items-center hover:text-blue-300 transition-colors duration-200"
              >
                {isExpanded ? (
                  <>
                    Show less <ChevronUp className="w-3 h-3 ml-1" />
                  </>
                ) : (
                  <>
                    Read more <ChevronDown className="w-3 h-3 ml-1" />
                  </>
                )}
              </button>
            )}
          </div>
        )}

        {/* Highlights */}
        {highlights && highlights.length > 0 && isExpanded && (
          <div className="mb-4">
            <h4 className="text-white font-semibold mb-2">Highlights:</h4>
            <ul className="text-gray-400 text-sm space-y-1">
              {highlights.slice(0, 3).map((highlight, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  {highlight}
                </li>
              ))}
              {highlights.length > 3 && (
                <li className="text-blue-400 text-xs">+{highlights.length - 3} more highlights</li>
              )}
            </ul>
          </div>
        )}

        {/* Prize Pool */}
        {prizePool && prizePool.total && isExpanded && (
          <div className="mb-4 p-3 bg-gradient-to-r from-yellow-900/20 to-orange-900/20 rounded-lg border border-yellow-500/20">
            <div className="flex items-center mb-2">
              <Award className="w-4 h-4 mr-2 text-yellow-400" />
              <span className="text-yellow-400 font-semibold">Prize Pool</span>
            </div>
            <div className="text-2xl font-bold text-white">
              {formatCurrency(prizePool.total)}
            </div>
            {(prizePool.firstPrize || prizePool.secondPrize || prizePool.thirdPrize) && (
              <div className="text-xs text-gray-400 mt-1">
                {prizePool.firstPrize && `1st: ${formatCurrency(prizePool.firstPrize)}`}
                {prizePool.secondPrize && ` • 2nd: ${formatCurrency(prizePool.secondPrize)}`}
                {prizePool.thirdPrize && ` • 3rd: ${formatCurrency(prizePool.thirdPrize)}`}
              </div>
            )}
          </div>
        )}

        {/* Contact Information */}
        {contactPersons && contactPersons.length > 0 && isExpanded && (
          <div className="mb-4">
            <h4 className="text-white font-semibold mb-2">Contact:</h4>
            <div className="space-y-1">
              {contactPersons.slice(0, 2).map((contact, index) => (
                <div key={index} className="text-gray-400 text-sm">
                  <span className="font-medium">{contact.name}</span>
                  {contact.phone && <span className="ml-2">{contact.phone}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Registration Status */}
        {isUpcoming && (
          <div className="flex items-center justify-between pt-4 border-t border-gray-700">
            <div className="text-xs text-gray-500">
              {registrationDeadlineDate && (
                <span>
                  Registration deadline: {formatDate(registrationDeadlineDate)}
                </span>
              )}
            </div>
            
            <Button
              variant={isRegistered ? "secondary" : "primary"}
              size="sm"
              disabled={!isRegistrationOpen || isRegistered}
              onClick={() => onRegister?.(event)}
            >
              {isRegistered 
                ? 'Registered' 
                : !isRegistrationOpen 
                  ? 'Registration Closed' 
                  : 'Register Now'}
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}

export default EventCard

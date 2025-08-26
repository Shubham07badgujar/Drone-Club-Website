import React, { useState } from 'react'
import { Calendar, Clock, MapPin, ChevronDown, ChevronUp, Users } from 'lucide-react'
import { format } from 'date-fns'
import Card from '../ui/Card'
import Button from '../ui/Button'
import Badge from '../ui/Badge'

const EventCard = ({ event, onRegister, isRegistered = false }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const { title, description, date, time, location, registrationCount, maxCapacity } = event

  const eventDate = new Date(date)
  const isUpcoming = eventDate > new Date()
  const isFull = maxCapacity && registrationCount >= maxCapacity

  return (
    <Card className="group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors duration-200 mb-2">
            {title}
          </h3>
          
          <div className="space-y-2 text-sm text-gray-400">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {format(eventDate, 'MMMM dd, yyyy')}
            </div>
            
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {time}
            </div>
            
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              {location}
            </div>
            
            {maxCapacity && (
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                {registrationCount || 0} / {maxCapacity} registered
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-col items-end space-y-2">
          <Badge variant={isUpcoming ? 'success' : 'default'}>
            {isUpcoming ? 'Upcoming' : 'Past'}
          </Badge>
          
          {isFull && (
            <Badge variant="danger">
              Full
            </Badge>
          )}
        </div>
      </div>
      
      <div className="mb-4">
        <p className={`text-gray-400 text-sm ${!isExpanded ? 'line-clamp-2' : ''}`}>
          {description}
        </p>
        
        {description && description.length > 100 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-primary-400 text-sm mt-1 flex items-center hover:text-primary-300 transition-colors duration-200"
          >
            {isExpanded ? (
              <>
                Show less <ChevronUp className="w-3 h-3 ml-1" />
              </>
            ) : (
              <>
                Show more <ChevronDown className="w-3 h-3 ml-1" />
              </>
            )}
          </button>
        )}
      </div>
      
      {isUpcoming && (
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            {maxCapacity && (
              <span>
                {maxCapacity - (registrationCount || 0)} spots remaining
              </span>
            )}
          </div>
          
          <Button
            variant={isRegistered ? "secondary" : "primary"}
            size="sm"
            disabled={isFull || isRegistered}
            onClick={() => onRegister(event)}
          >
            {isRegistered ? 'Registered' : isFull ? 'Full' : 'Register'}
          </Button>
        </div>
      )}
    </Card>
  )
}

export default EventCard

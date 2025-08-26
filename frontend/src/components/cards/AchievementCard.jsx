import React from 'react'
import { Calendar, Award, Trophy } from 'lucide-react'
import { format } from 'date-fns'
import Card from '../ui/Card'
import Badge from '../ui/Badge'

const AchievementCard = ({ achievement }) => {
  const { title, description, imageUrl, date, type, category } = achievement

  const getTypeIcon = (achievementType) => {
    switch (achievementType) {
      case 'award':
        return <Award className="w-5 h-5" />
      case 'competition':
        return <Trophy className="w-5 h-5" />
      default:
        return <Award className="w-5 h-5" />
    }
  }

  const getTypeVariant = (achievementType) => {
    switch (achievementType) {
      case 'award':
        return 'warning'
      case 'competition':
        return 'success'
      default:
        return 'primary'
    }
  }

  return (
    <Card className="group">
      {imageUrl && (
        <div className="aspect-video bg-dark-700 rounded-lg mb-4 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors duration-200 flex-1">
            {title}
          </h3>
          
          <div className="flex items-center text-primary-400 ml-2">
            {getTypeIcon(type)}
          </div>
        </div>
        
        <p className="text-gray-400 text-sm">
          {description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {category && (
              <Badge variant={getTypeVariant(type)} size="sm">
                {category}
              </Badge>
            )}
            
            {type && (
              <Badge variant="default" size="sm">
                {type}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="w-3 h-3 mr-1" />
            {format(new Date(date), 'MMM yyyy')}
          </div>
        </div>
      </div>
    </Card>
  )
}

export default AchievementCard

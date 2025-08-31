import React from 'react'
import { Calendar, Award, Trophy, Star, Medal } from 'lucide-react'
import Card from '../ui/Card'
import Badge from '../ui/Badge'

const AchievementCard = ({ achievement }) => {
  const { 
    title, 
    description, 
    image, 
    year, 
    category, 
    level,
    is_featured 
  } = achievement

  const getCategoryIcon = (achievementCategory) => {
    switch (achievementCategory) {
      case 'competition':
        return <Trophy className="w-5 h-5" />
      case 'award':
        return <Award className="w-5 h-5" />
      case 'hackathon':
        return <Medal className="w-5 h-5" />
      case 'exhibition':
        return <Star className="w-5 h-5" />
      default:
        return <Award className="w-5 h-5" />
    }
  }

  const getCategoryVariant = (achievementCategory) => {
    switch (achievementCategory) {
      case 'competition':
        return 'success'
      case 'award':
        return 'warning'
      case 'hackathon':
        return 'primary'
      case 'exhibition':
        return 'info'
      default:
        return 'default'
    }
  }

  const getLevelVariant = (achievementLevel) => {
    switch (achievementLevel) {
      case 'international':
        return 'success'
      case 'national':
        return 'warning'
      case 'state':
        return 'info'
      case 'university':
        return 'default'
      default:
        return 'default'
    }
  }

  return (
    <Card className="group relative">
      {is_featured && (
        <div className="absolute top-3 right-3 z-10">
          <Badge variant="warning" size="sm" className="flex items-center space-x-1">
            <Star className="w-3 h-3" />
            <span>Featured</span>
          </Badge>
        </div>
      )}
      
      {image && (
        <div className="aspect-video bg-dark-700 rounded-lg mb-4 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = '/api/placeholder/400/300'
            }}
          />
        </div>
      )}
      
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors duration-200 flex-1 pr-2">
            {title}
          </h3>
          
          <div className="flex items-center text-primary-400">
            {getCategoryIcon(category)}
          </div>
        </div>
        
        <p className="text-gray-400 text-sm line-clamp-3">
          {description}
        </p>
        
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center space-x-2 flex-wrap">
            {category && (
              <Badge variant={getCategoryVariant(category)} size="sm">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Badge>
            )}
            
            {level && (
              <Badge variant={getLevelVariant(level)} size="sm">
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="w-3 h-3 mr-1" />
            <span>{year}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default AchievementCard

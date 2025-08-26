import React from 'react'
import { ExternalLink, Calendar } from 'lucide-react'
import Card from '../ui/Card'
import Button from '../ui/Button'
import Badge from '../ui/Badge'

const ProjectCard = ({ project, onLearnMore }) => {
  const { title, description, mediaUrl, technologies, status, createdAt } = project

  return (
    <Card className="group">
      {mediaUrl && (
        <div className="aspect-video bg-dark-700 rounded-lg mb-4 overflow-hidden">
          <img
            src={mediaUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors duration-200">
          {title}
        </h3>
        {status && (
          <Badge variant={status === 'completed' ? 'success' : status === 'in-progress' ? 'warning' : 'default'}>
            {status}
          </Badge>
        )}
      </div>
      
      <p className="text-gray-400 text-sm mb-4 line-clamp-3">
        {description}
      </p>
      
      {technologies && technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.slice(0, 3).map((tech, index) => (
            <Badge key={index} variant="primary" size="sm">
              {tech}
            </Badge>
          ))}
          {technologies.length > 3 && (
            <Badge variant="default" size="sm">
              +{technologies.length - 3} more
            </Badge>
          )}
        </div>
      )}
      
      <div className="flex items-center justify-between">
        <div className="flex items-center text-gray-500 text-xs">
          <Calendar className="w-3 h-3 mr-1" />
          {new Date(createdAt).toLocaleDateString()}
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onLearnMore(project)}
        >
          <ExternalLink className="w-3 h-3 mr-1" />
          Learn More
        </Button>
      </div>
    </Card>
  )
}

export default ProjectCard

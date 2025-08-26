import React from 'react'
import { Calendar, User, ExternalLink } from 'lucide-react'
import { format } from 'date-fns'
import Card from '../ui/Card'
import Button from '../ui/Button'

const BlogCard = ({ blog, onReadMore }) => {
  const { title, content, author, imageUrl, createdAt } = blog

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
        <h3 className="text-lg font-semibold text-white group-hover:text-primary-400 transition-colors duration-200 line-clamp-2">
          {title}
        </h3>
        
        <p className="text-gray-400 text-sm line-clamp-3">
          {content.replace(/<[^>]*>/g, '').substring(0, 150)}...
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <User className="w-3 h-3 mr-1" />
              {author}
            </div>
            
            <div className="flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              {format(new Date(createdAt), 'MMM dd, yyyy')}
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onReadMore(blog)}
            className="text-primary-400 hover:text-primary-300 p-1"
          >
            <ExternalLink className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default BlogCard

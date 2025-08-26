import React from 'react'

const Card = ({ 
  children, 
  className = '', 
  hover = true,
  padding = 'p-6',
  ...props 
}) => {
  const baseClasses = 'bg-dark-800 border border-dark-700 rounded-xl shadow-lg transition-all duration-300'
  const hoverClasses = hover ? 'hover:shadow-xl hover:border-dark-600 hover:-translate-y-1' : ''
  
  return (
    <div 
      className={`${baseClasses} ${hoverClasses} ${padding} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card

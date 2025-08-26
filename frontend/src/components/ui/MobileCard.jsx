import React from 'react'

/**
 * Mobile-optimized card component with better touch interactions
 */
const MobileCard = ({ 
  children, 
  className = '', 
  hover = true,
  padding = 'md',
  onClick,
  ...props 
}) => {
  const baseClasses = 'rounded-xl border border-gray-700 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm shadow-lg'
  
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }
  
  const hoverClasses = hover 
    ? 'transition-all duration-300 hover:border-red-500/50 hover:shadow-red-500/10 hover:shadow-xl active:scale-[0.98]' 
    : ''
  
  const clickableClasses = onClick 
    ? 'cursor-pointer select-none' 
    : ''
  
  return (
    <div
      className={`
        ${baseClasses}
        ${paddingClasses[padding]}
        ${hoverClasses}
        ${clickableClasses}
        ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  )
}

export default MobileCard

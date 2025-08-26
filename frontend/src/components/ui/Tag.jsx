import React from 'react'

const Tag = ({ 
  children, 
  variant = 'default',
  removable = false,
  onRemove,
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center px-2.5 py-1 text-sm font-medium rounded-md transition-colors duration-200'
  
  const variants = {
    default: 'bg-dark-700 text-gray-300 hover:bg-dark-600',
    primary: 'bg-primary-600/20 text-primary-400 hover:bg-primary-600/30',
    success: 'bg-green-600/20 text-green-400 hover:bg-green-600/30',
    warning: 'bg-yellow-600/20 text-yellow-400 hover:bg-yellow-600/30',
    danger: 'bg-red-600/20 text-red-400 hover:bg-red-600/30',
  }
  
  const classes = `${baseClasses} ${variants[variant]} ${className}`
  
  return (
    <span className={classes} {...props}>
      {children}
      {removable && onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-1.5 inline-flex items-center justify-center w-4 h-4 text-current hover:bg-current hover:bg-opacity-20 rounded-full transition-colors duration-200"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      )}
    </span>
  )
}

export default Tag

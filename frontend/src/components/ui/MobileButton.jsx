import React from 'react'

/**
 * Enhanced mobile-friendly button component with proper touch targets
 */
const MobileButton = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  onClick,
  disabled = false,
  fullWidth = false,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900'
  
  // Touch-friendly minimum size (44px recommended by Apple/Google)
  const sizeClasses = {
    sm: 'px-4 py-3 text-sm min-h-[44px]',
    md: 'px-6 py-4 text-base min-h-[48px]',
    lg: 'px-8 py-5 text-lg min-h-[52px]'
  }
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-lg hover:shadow-red-500/25 focus:ring-red-500',
    secondary: 'bg-transparent border-2 border-red-500 text-red-400 hover:bg-red-500 hover:text-white focus:ring-red-500',
    ghost: 'bg-transparent text-gray-300 hover:bg-gray-800 hover:text-white focus:ring-gray-500',
    danger: 'bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white shadow-lg focus:ring-red-600'
  }
  
  const disabledClasses = 'opacity-50 cursor-not-allowed transform-none'
  const fullWidthClass = fullWidth ? 'w-full' : ''
  
  return (
    <button
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${disabled ? disabledClasses : 'hover:scale-105'}
        ${fullWidthClass}
        ${className}
      `}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default MobileButton

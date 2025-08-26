import React from 'react'

/**
 * Mobile-optimized input component with better touch targets and validation
 */
const MobileInput = ({ 
  label,
  error,
  hint,
  className = '',
  labelClassName = '',
  inputClassName = '',
  type = 'text',
  required = false,
  ...props 
}) => {
  const inputId = props.id || `input-${Math.random().toString(36).substr(2, 9)}`
  
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label 
          htmlFor={inputId}
          className={`block text-sm font-medium text-gray-300 ${labelClassName}`}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <input
          id={inputId}
          type={type}
          className={`
            w-full px-4 py-4 
            bg-gray-800/50 
            border border-gray-600 
            rounded-lg 
            text-white 
            placeholder-gray-400
            focus:border-red-500 
            focus:ring-2 
            focus:ring-red-500/20 
            focus:outline-none
            transition-all duration-200
            min-h-[48px]
            text-base
            ${error ? 'border-red-500 bg-red-900/10' : ''}
            ${inputClassName}
          `}
          {...props}
        />
        
        {error && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
              <span className="text-white text-xs font-bold">!</span>
            </div>
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-red-400 text-sm mt-1 flex items-center">
          <span className="mr-1">⚠</span>
          {error}
        </p>
      )}
      
      {hint && !error && (
        <p className="text-gray-500 text-sm mt-1">
          {hint}
        </p>
      )}
    </div>
  )
}

export default MobileInput

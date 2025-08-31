import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import Button from './Button'

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    '4xl': 'max-w-4xl',
    full: 'max-w-7xl',
  }

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose()
    }
  }

  return createPortal(
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm overflow-y-auto"
      onClick={handleOverlayClick}
    >
      <div className={`w-full ${sizes[size]} bg-white border border-gray-200 rounded-2xl shadow-2xl animate-scale-in my-8 max-h-[90vh] flex flex-col`}>
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white rounded-t-2xl sticky top-0 z-10">
            {title && (
              <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            )}
            {showCloseButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </Button>
            )}
          </div>
        )}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default Modal

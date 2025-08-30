import React from 'react'
import { motion } from 'framer-motion'

const HeroBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900"></div>
      
      {/* Animated mesh gradient overlay */}
      <motion.div
        className="absolute inset-0 opacity-60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 2 }}
        style={{
          background: `
            radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 0%, transparent 45%),
            radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.25) 0%, transparent 45%),
            radial-gradient(circle at 75% 25%, rgba(249, 115, 22, 0.2) 0%, transparent 45%),
            radial-gradient(circle at 25% 75%, rgba(34, 197, 94, 0.2) 0%, transparent 45%)
          `
        }}
      />
      
      {/* Geometric grid pattern */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>
      
      {/* Floating orbs with smooth animations */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full blur-xl ${
              i % 3 === 0 ? 'bg-blue-500/20' :
              i % 3 === 1 ? 'bg-purple-500/20' :
              'bg-orange-500/20'
            }`}
            style={{
              width: `${60 + i * 20}px`,
              height: `${60 + i * 20}px`,
              left: `${15 + i * 12}%`,
              top: `${20 + i * 10}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
      
      {/* Animated lines/connections */}
      <div className="absolute inset-0">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
            style={{
              width: '100%',
              height: '1px',
              top: `${25 + i * 20}%`,
            }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scaleX: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
      
      {/* Corner accent elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-transparent rounded-br-full"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/20 to-transparent rounded-bl-full"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-orange-500/20 to-transparent rounded-tr-full"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-green-500/20 to-transparent rounded-tl-full"></div>
      
      {/* Subtle noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-30 mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}

export default HeroBackground

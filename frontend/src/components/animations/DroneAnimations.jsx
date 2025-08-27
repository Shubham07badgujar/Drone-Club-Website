import React from 'react'

// Professional Drone SVG Component
export const ProfessionalDrone = ({ className = "", size = "w-16 h-16", color = "text-primary-500" }) => (
  <svg className={`${size} ${color} ${className}`} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Drone Body */}
    <rect x="75" y="85" width="50" height="30" rx="15" fill="currentColor" className="opacity-90" />
    
    {/* Camera Gimbal */}
    <circle cx="100" cy="100" r="12" fill="currentColor" className="opacity-80" />
    <circle cx="100" cy="100" r="8" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-60" />
    
    {/* Propeller Arms */}
    <line x1="100" y1="100" x2="50" y2="50" stroke="currentColor" strokeWidth="4" className="opacity-70" />
    <line x1="100" y1="100" x2="150" y2="50" stroke="currentColor" strokeWidth="4" className="opacity-70" />
    <line x1="100" y1="100" x2="50" y2="150" stroke="currentColor" strokeWidth="4" className="opacity-70" />
    <line x1="100" y1="100" x2="150" y2="150" stroke="currentColor" strokeWidth="4" className="opacity-70" />
    
    {/* Propellers */}
    <g className="animate-propeller-spin">
      <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-40" />
      <line x1="35" y1="50" x2="65" y2="50" stroke="currentColor" strokeWidth="1" className="opacity-60" />
      <line x1="50" y1="35" x2="50" y2="65" stroke="currentColor" strokeWidth="1" className="opacity-60" />
    </g>
    
    <g className="animate-propeller-spin" style={{ animationDelay: '0.05s' }}>
      <circle cx="150" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-40" />
      <line x1="135" y1="50" x2="165" y2="50" stroke="currentColor" strokeWidth="1" className="opacity-60" />
      <line x1="150" y1="35" x2="150" y2="65" stroke="currentColor" strokeWidth="1" className="opacity-60" />
    </g>
    
    <g className="animate-propeller-spin" style={{ animationDelay: '0.1s' }}>
      <circle cx="50" cy="150" r="15" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-40" />
      <line x1="35" y1="150" x2="65" y2="150" stroke="currentColor" strokeWidth="1" className="opacity-60" />
      <line x1="50" y1="135" x2="50" y2="165" stroke="currentColor" strokeWidth="1" className="opacity-60" />
    </g>
    
    <g className="animate-propeller-spin" style={{ animationDelay: '0.15s' }}>
      <circle cx="150" cy="150" r="15" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-40" />
      <line x1="135" y1="150" x2="165" y2="150" stroke="currentColor" strokeWidth="1" className="opacity-60" />
      <line x1="150" y1="135" x2="150" y2="165" stroke="currentColor" strokeWidth="1" className="opacity-60" />
    </g>
    
    {/* LED Indicators */}
    <circle cx="85" cy="90" r="2" fill="#34d399" className="animate-signal-pulse" />
    <circle cx="115" cy="90" r="2" fill="#fbbf24" className="animate-signal-pulse" style={{ animationDelay: '0.5s' }} />
    <circle cx="85" cy="110" r="2" fill="#f87171" className="animate-signal-pulse" style={{ animationDelay: '1s' }} />
    <circle cx="115" cy="110" r="2" fill="#0ea5e9" className="animate-signal-pulse" style={{ animationDelay: '1.5s' }} />
  </svg>
)

// Racing Drone Component
export const RacingDrone = ({ className = "", size = "w-12 h-12", color = "text-secondary-500" }) => (
  <svg className={`${size} ${color} ${className}`} viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Racing Frame */}
    <rect x="60" y="70" width="30" height="10" rx="5" fill="currentColor" className="opacity-90" />
    
    {/* Racing Arms */}
    <line x1="75" y1="75" x2="30" y2="30" stroke="currentColor" strokeWidth="3" />
    <line x1="75" y1="75" x2="120" y2="30" stroke="currentColor" strokeWidth="3" />
    <line x1="75" y1="75" x2="30" y2="120" stroke="currentColor" strokeWidth="3" />
    <line x1="75" y1="75" x2="120" y2="120" stroke="currentColor" strokeWidth="3" />
    
    {/* Racing Propellers */}
    <g className="animate-propeller-spin">
      <circle cx="30" cy="30" r="10" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-50" />
      <line x1="20" y1="30" x2="40" y2="30" stroke="currentColor" strokeWidth="1" />
    </g>
    <g className="animate-propeller-spin" style={{ animationDelay: '0.025s' }}>
      <circle cx="120" cy="30" r="10" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-50" />
      <line x1="110" y1="30" x2="130" y2="30" stroke="currentColor" strokeWidth="1" />
    </g>
    <g className="animate-propeller-spin" style={{ animationDelay: '0.05s' }}>
      <circle cx="30" cy="120" r="10" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-50" />
      <line x1="20" y1="120" x2="40" y2="120" stroke="currentColor" strokeWidth="1" />
    </g>
    <g className="animate-propeller-spin" style={{ animationDelay: '0.075s' }}>
      <circle cx="120" cy="120" r="10" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-50" />
      <line x1="110" y1="120" x2="130" y2="120" stroke="currentColor" strokeWidth="1" />
    </g>
    
    {/* Racing LEDs */}
    <circle cx="75" cy="75" r="3" fill="#f97316" className="animate-signal-pulse" />
  </svg>
)

// Tech Pattern Background
export const TechPattern = ({ className = "" }) => (
  <div className={`absolute inset-0 overflow-hidden ${className}`}>
    {/* Circuit lines */}
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M0 50h50v-20h20v20h30" stroke="#f97316" strokeWidth="0.5" fill="none" opacity="0.1" />
          <path d="M50 0v50h20v-20h20v50" stroke="#0ea5e9" strokeWidth="0.5" fill="none" opacity="0.1" />
          <circle cx="50" cy="50" r="2" fill="#34d399" opacity="0.2" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#circuit)" />
    </svg>
    
    {/* Data streams */}
    {[...Array(5)].map((_, i) => (
      <div
        key={i}
        className="absolute w-0.5 h-20 bg-gradient-to-b from-transparent via-primary-500 to-transparent animate-data-stream opacity-30"
        style={{
          left: `${20 + i * 20}%`,
          animationDelay: `${i * 2}s`,
          animationDuration: `${8 + i * 2}s`
        }}
      />
    ))}
  </div>
)

// Holographic Display
export const HolographicDisplay = ({ children, className = "" }) => (
  <div className={`relative ${className}`}>
    {/* Hologram effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-secondary-500/10 to-accent-500/10 animate-hologram" />
    <div className="absolute inset-0 bg-tech-grid opacity-20" />
    
    {/* Scanning line */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary-400 to-transparent animate-scanning" />
    </div>
    
    {/* Content */}
    <div className="relative z-10">
      {children}
    </div>
    
    {/* Glitch lines */}
    <div className="absolute inset-0">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="absolute w-full h-px bg-primary-400 opacity-20 animate-pulse"
          style={{
            top: `${30 + i * 20}%`,
            animationDelay: `${i * 0.5}s`
          }}
        />
      ))}
    </div>
  </div>
)

// Energy Orb
export const EnergyOrb = ({ className = "", color = "primary" }) => (
  <div className={`relative ${className}`}>
    <div className={`w-full h-full rounded-full bg-${color}-500/20 animate-energy-wave`} />
    <div className={`absolute inset-2 rounded-full bg-${color}-400/30 animate-energy-wave`} style={{ animationDelay: '0.5s' }} />
    <div className={`absolute inset-4 rounded-full bg-${color}-300/40 animate-energy-wave`} style={{ animationDelay: '1s' }} />
    <div className={`absolute inset-6 rounded-full bg-${color}-200/50`} />
  </div>
)

// Radar Component
export const RadarDisplay = ({ className = "" }) => (
  <div className={`relative ${className}`}>
    {/* Radar background */}
    <div className="absolute inset-0 rounded-full bg-gradient-radial from-secondary-500/5 to-transparent" />
    
    {/* Radar circles */}
    {[...Array(4)].map((_, i) => (
      <div
        key={i}
        className={`absolute inset-${i * 4} rounded-full border border-secondary-500/20`}
      />
    ))}
    
    {/* Radar sweep */}
    <div className="absolute inset-0 rounded-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-conic from-transparent via-secondary-500/30 to-transparent animate-radar-sweep" />
    </div>
    
    {/* Center dot */}
    <div className="absolute top-1/2 left-1/2 w-2 h-2 -mt-1 -ml-1 rounded-full bg-secondary-400 animate-signal-pulse" />
    
    {/* Radar blips */}
    {[...Array(3)].map((_, i) => (
      <div
        key={i}
        className={`absolute w-1 h-1 rounded-full bg-primary-400 animate-signal-pulse`}
        style={{
          top: `${30 + i * 20}%`,
          left: `${40 + i * 15}%`,
          animationDelay: `${i * 0.7}s`
        }}
      />
    ))}
  </div>
)

export default {
  ProfessionalDrone,
  RacingDrone,
  TechPattern,
  HolographicDisplay,
  EnergyOrb,
  RadarDisplay
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      // Touch device specific
      'touch': { 'raw': '(hover: none)' },
      'no-touch': { 'raw': '(hover: hover)' },
      // Mobile landscape
      'mobile-landscape': { 'raw': '(max-height: 500px) and (orientation: landscape)' },
    },
    extend: {
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        // Touch-friendly spacing
        'touch': '44px', // Minimum touch target size
        'touch-lg': '48px',
        'touch-xl': '52px',
      },
      colors: {
        // Professional GCOEJ Drone Club Brand Colors
        primary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316', // Main orange
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        secondary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9', // Cyan blue
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        accent: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef', // Purple
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        },
        drone: {
          // Professional drone colors
          carbon: {
            100: '#18181b',
            200: '#27272a',
            300: '#3f3f46',
            400: '#52525b',
            500: '#71717a',
            600: '#a1a1aa',
            700: '#d4d4d8',
            800: '#e4e4e7',
            900: '#f4f4f5',
          },
          metal: {
            100: '#1e293b',
            200: '#334155',
            300: '#475569',
            400: '#64748b',
            500: '#94a3b8',
            600: '#cbd5e1',
            700: '#e2e8f0',
            800: '#f1f5f9',
            900: '#f8fafc',
          },
          electric: {
            100: '#065f46',
            200: '#047857',
            300: '#059669',
            400: '#10b981',
            500: '#34d399', // Electric green
            600: '#6ee7b7',
            700: '#9deccd',
            800: '#c6f6e3',
            900: '#ecfdf5',
          },
          warning: {
            100: '#92400e',
            200: '#b45309',
            300: '#d97706',
            400: '#f59e0b',
            500: '#fbbf24', // Warning yellow
            600: '#fcd34d',
            700: '#fde68a',
            800: '#fef3c7',
            900: '#fffbeb',
          }
        },
        // Dark theme colors
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'fly-drone': 'flyDrone 20s linear infinite',
        'hover-drone': 'hoverDrone 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'matrix-rain': 'matrixRain 20s linear infinite',
        // New professional drone animations
        'drone-patrol': 'dronePatrol 15s ease-in-out infinite',
        'propeller-spin': 'propellerSpin 0.1s linear infinite',
        'signal-pulse': 'signalPulse 1.5s ease-in-out infinite',
        'scanning': 'scanning 3s ease-in-out infinite',
        'tech-glow': 'techGlow 2s ease-in-out infinite alternate',
        'circuit-flow': 'circuitFlow 4s linear infinite',
        'hologram': 'hologram 3s ease-in-out infinite',
        'energy-wave': 'energyWave 2s ease-out infinite',
        'data-stream': 'dataStream 8s linear infinite',
        'radar-sweep': 'radarSweep 4s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        flyDrone: {
          '0%': { transform: 'translateX(-100px) translateY(0px)' },
          '25%': { transform: 'translateX(25vw) translateY(-30px)' },
          '50%': { transform: 'translateX(50vw) translateY(20px)' },
          '75%': { transform: 'translateX(75vw) translateY(-10px)' },
          '100%': { transform: 'translateX(calc(100vw + 100px)) translateY(0px)' },
        },
        hoverDrone: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(5deg)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px #dc2626, 0 0 10px #dc2626, 0 0 15px #dc2626' },
          '50%': { boxShadow: '0 0 10px #dc2626, 0 0 20px #dc2626, 0 0 30px #dc2626' },
        },
        matrixRain: {
          '0%': { transform: 'translateY(-100vh)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        // New professional keyframes
        dronePatrol: {
          '0%': { transform: 'translateX(-50px) translateY(0px) rotate(0deg)' },
          '20%': { transform: 'translateX(20vw) translateY(-40px) rotate(10deg)' },
          '40%': { transform: 'translateX(40vw) translateY(20px) rotate(-5deg)' },
          '60%': { transform: 'translateX(60vw) translateY(-30px) rotate(15deg)' },
          '80%': { transform: 'translateX(80vw) translateY(10px) rotate(-8deg)' },
          '100%': { transform: 'translateX(calc(100vw + 50px)) translateY(0px) rotate(0deg)' },
        },
        propellerSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        signalPulse: {
          '0%': { 
            opacity: '0.5',
            transform: 'scale(0.8)',
            boxShadow: '0 0 0 0 rgba(249, 115, 22, 0.7)'
          },
          '50%': { 
            opacity: '1',
            transform: 'scale(1)',
            boxShadow: '0 0 0 20px rgba(249, 115, 22, 0)'
          },
          '100%': { 
            opacity: '0.5',
            transform: 'scale(0.8)',
            boxShadow: '0 0 0 0 rgba(249, 115, 22, 0)'
          },
        },
        scanning: {
          '0%': { 
            transform: 'translateX(-100%)',
            opacity: '0'
          },
          '50%': { 
            transform: 'translateX(0%)',
            opacity: '1'
          },
          '100%': { 
            transform: 'translateX(100%)',
            opacity: '0'
          },
        },
        techGlow: {
          '0%': { 
            textShadow: '0 0 5px #f97316, 0 0 10px #f97316, 0 0 15px #f97316',
            color: '#f97316'
          },
          '100%': { 
            textShadow: '0 0 10px #0ea5e9, 0 0 20px #0ea5e9, 0 0 30px #0ea5e9',
            color: '#0ea5e9'
          },
        },
        circuitFlow: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        hologram: {
          '0%, 100%': { 
            opacity: '0.8',
            transform: 'translateY(0px)',
            filter: 'hue-rotate(0deg)'
          },
          '50%': { 
            opacity: '1',
            transform: 'translateY(-10px)',
            filter: 'hue-rotate(90deg)'
          },
        },
        energyWave: {
          '0%': { 
            transform: 'scale(0) rotate(0deg)',
            opacity: '1'
          },
          '100%': { 
            transform: 'scale(2) rotate(180deg)',
            opacity: '0'
          },
        },
        dataStream: {
          '0%': { transform: 'translateY(-100%) rotate(0deg)' },
          '100%': { transform: 'translateY(100vh) rotate(360deg)' },
        },
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'drone-pattern': "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><circle cx=\"50\" cy=\"50\" r=\"2\" fill=\"%23f97316\" opacity=\"0.3\"/></svg>')",
        'circuit-pattern': "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><path d=\"M0 0h100v100H0z\" fill=\"none\"/><path d=\"M20 20h60M20 50h60M20 80h60M20 20v60M50 20v60M80 20v60\" stroke=\"%23f97316\" stroke-width=\"0.5\" opacity=\"0.2\"/></svg>')",
        'tech-grid': "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 50 50\"><defs><pattern id=\"grid\" width=\"50\" height=\"50\" patternUnits=\"userSpaceOnUse\"><path d=\"M 50 0 L 0 0 0 50\" fill=\"none\" stroke=\"%230ea5e9\" stroke-width=\"0.5\" opacity=\"0.1\"/></pattern></defs><rect width=\"100%\" height=\"100%\" fill=\"url(%23grid)\"/></svg>')",
        'drone-radar': "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 200 200\"><circle cx=\"100\" cy=\"100\" r=\"80\" fill=\"none\" stroke=\"%2334d399\" stroke-width=\"1\" opacity=\"0.2\"/><circle cx=\"100\" cy=\"100\" r=\"50\" fill=\"none\" stroke=\"%2334d399\" stroke-width=\"1\" opacity=\"0.3\"/><circle cx=\"100\" cy=\"100\" r=\"20\" fill=\"none\" stroke=\"%2334d399\" stroke-width=\"1\" opacity=\"0.4\"/></svg>')",
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'professional-gradient': 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)',
        'drone-gradient': 'linear-gradient(45deg, #f97316 0%, #0ea5e9 50%, #d946ef 100%)',
        'tech-pattern': "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 60 60\"><rect width=\"60\" height=\"60\" fill=\"%23020617\"/><g fill=\"%23f97316\" opacity=\"0.1\"><circle cx=\"30\" cy=\"30\" r=\"2\"/><circle cx=\"10\" cy=\"10\" r=\"1\"/><circle cx=\"50\" cy=\"10\" r=\"1\"/><circle cx=\"10\" cy=\"50\" r=\"1\"/><circle cx=\"50\" cy=\"50\" r=\"1\"/></g></svg>')"
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
}

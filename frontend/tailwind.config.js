/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        drone: {
          red: {
            100: '#fee2e2',
            200: '#fecaca',
            300: '#fca5a5',
            400: '#f87171',
            500: '#ef4444',
            600: '#dc2626',
            700: '#b91c1c',
            800: '#991b1b',
            900: '#7f1d1d',
          },
          black: {
            100: '#1a1a1a',
            200: '#171717',
            300: '#0a0a0a',
            400: '#050505',
            500: '#000000',
          },
        },
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
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'drone-pattern': "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><circle cx=\"50\" cy=\"50\" r=\"2\" fill=\"%23dc2626\" opacity=\"0.3\"/></svg>')",
        'circuit-pattern': "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><path d=\"M0 0h100v100H0z\" fill=\"none\"/><path d=\"M20 20h60M20 50h60M20 80h60M20 20v60M50 20v60M80 20v60\" stroke=\"%23dc2626\" stroke-width=\"0.5\" opacity=\"0.2\"/></svg>')",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
}

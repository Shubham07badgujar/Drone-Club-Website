import React, { useEffect, useState } from 'react';
import { Plane } from 'lucide-react';

const FloatingDrone = ({ index = 0 }) => {
  const [position, setPosition] = useState({ x: -100, y: 50 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Random delay for each drone
    const delay = index * 3000 + Math.random() * 2000;
    
    const timer = setTimeout(() => {
      setIsVisible(true);
      
      // Random starting position
      const startY = Math.random() * window.innerHeight * 0.8 + 50;
      setPosition({ x: -100, y: startY });

      // Animate across screen
      const animationTimer = setTimeout(() => {
        setPosition({ x: window.innerWidth + 100, y: startY });
      }, 100);

      // Reset after animation completes
      const resetTimer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          const newStartY = Math.random() * window.innerHeight * 0.8 + 50;
          setPosition({ x: -100, y: newStartY });
          setIsVisible(true);
          
          setTimeout(() => {
            setPosition({ x: window.innerWidth + 100, y: newStartY });
          }, 100);
        }, Math.random() * 5000 + 2000);
      }, 20000);

      return () => {
        clearTimeout(animationTimer);
        clearTimeout(resetTimer);
      };
    }, delay);

    return () => clearTimeout(timer);
  }, [index]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-10 transition-all ease-linear"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'rotate(-15deg)',
        transitionDuration: '20s',
      }}
    >
      <Plane 
        className="w-8 h-8 text-red-500 opacity-40 animate-bounce" 
        style={{
          filter: 'drop-shadow(0 0 8px rgba(220, 38, 38, 0.6))',
        }}
      />
    </div>
  );
};

const FloatingDroneBackground = () => {
  return (
    <>
      {[...Array(3)].map((_, index) => (
        <FloatingDrone key={index} index={index} />
      ))}
    </>
  );
};

export default FloatingDroneBackground;

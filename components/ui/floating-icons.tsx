"use client";

import { useState, useEffect } from 'react';
import { Activity, Heart, Leaf, Droplets, Brain, Moon, Utensils, Dumbbell } from 'lucide-react';

interface FloatingIconsProps {
  iconCount?: number;
}

export function FloatingIcons({ iconCount = 10 }: FloatingIconsProps) {
  const [icons, setIcons] = useState<React.ReactNode[]>([]);
  
  useEffect(() => {
    const iconOptions = [
      <Heart size={16} className="text-red-400 dark:text-red-500" />,
      <Leaf size={16} className="text-green-400 dark:text-green-500" />,
      <Droplets size={16} className="text-blue-400 dark:text-blue-500" />,
      <Brain size={16} className="text-purple-400 dark:text-purple-500" />,
      <Moon size={16} className="text-indigo-400 dark:text-indigo-500" />,
      <Utensils size={16} className="text-amber-400 dark:text-amber-500" />,
      <Activity size={16} className="text-pink-400 dark:text-pink-500" />,
      <Dumbbell size={16} className="text-teal-400 dark:text-teal-500" />,
    ];
    
    const newIcons = Array.from({ length: iconCount }).map((_, i) => {
      const randomIcon = iconOptions[Math.floor(Math.random() * iconOptions.length)];
      const size = Math.random() * 1.5 + 0.5; // Random size between 0.5 and 2
      const left = Math.random() * 100; // Random left position
      const top = Math.random() * 100; // Random top position
      const animationDuration = Math.random() * 20 + 10; // Random animation duration
      const animationDelay = Math.random() * 5; // Random animation delay
      
      return (
        <div
          key={i}
          className="absolute opacity-30 dark:opacity-20"
          style={{
            left: `${left}%`,
            top: `${top}%`,
            transform: `scale(${size})`,
            animation: `float ${animationDuration}s ease-in-out ${animationDelay}s infinite`,
          }}
        >
          {randomIcon}
        </div>
      );
    });
    
    setIcons(newIcons);
  }, [iconCount]);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {icons}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0) rotate(0);
          }
          33% {
            transform: translateY(-10px) translateX(10px) rotate(10deg);
          }
          66% {
            transform: translateY(10px) translateX(-10px) rotate(-10deg);
          }
          100% {
            transform: translateY(0) translateX(0) rotate(0);
          }
        }
      `}</style>
    </div>
  );
}
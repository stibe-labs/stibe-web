'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function AnimatedCard({ 
  children, 
  delay = 0,
  animationType = 'fade'
}: { 
  children: React.ReactNode; 
  delay?: number;
  animationType?: 'fade' | 'slide-up' | 'scale' | 'slide-left' | 'slide-right'
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (ref.current) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              observer.unobserve(entry.target);
            }
          },
          { threshold: 0.1 }
        );
        observer.observe(ref.current);
        return () => observer.disconnect();
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const animationClasses = {
    fade: 'opacity-100 translate-y-0',
    'slide-up': 'opacity-100 translate-y-0',
    scale: 'opacity-100 scale-100',
    'slide-left': 'opacity-100 translate-x-0',
    'slide-right': 'opacity-100 translate-x-0'
  };

  const inactiveClasses = {
    fade: 'opacity-0 translate-y-0',
    'slide-up': 'opacity-0 translate-y-8',
    scale: 'opacity-0 scale-95',
    'slide-left': 'opacity-0 -translate-x-8',
    'slide-right': 'opacity-0 translate-x-8'
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 transform ${
        isVisible
          ? animationClasses[animationType]
          : inactiveClasses[animationType]
      }`}
    >
      {children}
    </div>
  );
}

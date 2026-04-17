'use client';

import React, { useEffect, useState } from 'react';

export default function PageIntro({ title, subtitle }: { title: string; subtitle?: string }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-darkGray opacity-40" />
      
      {/* Animated circles background */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-black rounded-full opacity-5 blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-black rounded-full opacity-5 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <div
          className={`transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-black leading-tight">
            {title}
          </h1>
          
          {subtitle && (
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed">
              {subtitle}
            </p>
          )}

          {/* Animated underline */}
          <div className="mt-8 flex justify-center">
            <div className="h-1 bg-gradient-to-r from-transparent via-white to-transparent w-32 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-black opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
}

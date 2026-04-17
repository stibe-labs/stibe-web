'use client';

import React from 'react';
import AnimatedCard from './AnimatedCard';

export default function PlatformsSection() {
  const platforms = [
    {
      title: 'Stibe CRM',
      subtitle: 'Lead Lifecycle & Conversion System',
      description: 'Comprehensive customer relationship management platform designed to streamline lead tracking, nurture, and conversion. Automate sales workflows and maximize customer lifetime value.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Stibe LMS',
      subtitle: 'Learning & Academic Platform',
      description: 'Enterprise learning management system for educational institutions and corporate training programs. Deliver engaging content, track progress, and scale learning initiatives.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Stibe Salon Booking',
      subtitle: 'Appointment & Service Automation',
      description: 'Complete booking and service management platform for salons and personal care businesses. Reduce no-shows, optimize scheduling, and enhance customer experience.',
      color: 'from-pink-500 to-pink-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {platforms.map((platform, index) => (
        <AnimatedCard key={index} delay={index * 150} animationType="slide-up">
          <div
            className="group relative glass-card h-full cursor-pointer overflow-hidden p-8 flex flex-col"
          >
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
            
            {/* Content */}
            <div className="relative z-10 flex flex-col h-full">
              <div className="mb-2">
                <p className="text-black/60 text-sm font-semibold group-hover:text-black transition-colors duration-300">{platform.subtitle}</p>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-black group-hover:text-black transition-colors duration-300">{platform.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow group-hover:text-black transition-colors duration-300">{platform.description}</p>
              
              <button className="text-black hover:opacity-70 font-semibold text-sm flex items-center gap-2 transition-all duration-300 group-hover:translate-x-1">
                Learn More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </AnimatedCard>
      ))}
    </div>
  );
}

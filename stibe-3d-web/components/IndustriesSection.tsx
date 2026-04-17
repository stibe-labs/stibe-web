'use client';

import React from 'react';
import AnimatedCard from './AnimatedCard';

export default function IndustriesSection() {
  const industries = [
    'Education',
    'Salon & Personal Care',
    'Manufacturing',
    'Logistics',
    'Retail & E-commerce',
    'Healthcare',
    'Startups & SMEs'
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
      {industries.map((industry, index) => (
        <AnimatedCard key={index} delay={index * 80} animationType="scale">
          <div
            className="group relative glass-card p-4 transition-all duration-500 hover:transform h-full flex items-center justify-center cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 rounded-[1.5rem] transition-opacity duration-500" />
            <p className="relative z-10 text-center font-medium text-gray-600 group-hover:text-black transition-colors duration-300 text-sm">
              {industry}
            </p>
          </div>
        </AnimatedCard>
      ))}
    </div>
  );
}

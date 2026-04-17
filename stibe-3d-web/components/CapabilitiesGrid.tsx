'use client';

import React from 'react';
import AnimatedCard from './AnimatedCard';

const IconComponent = ({ type }: { type: string }) => {
  const icons: { [key: string]: JSX.Element } = {
    enterprise: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 21v-8H7v8M7 3v5h10V3" />
      </svg>
    ),
    mobile: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    cloud: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
    ),
    ai: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    analytics: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    design: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    )
  };
  
  return <div className="text-primary">{icons[type] || icons.enterprise}</div>;
};

export default function CapabilitiesGrid() {
  const capabilities = [
    {
      icon: 'enterprise',
      title: 'Enterprise Software & ERP',
      description: 'Robust, scalable enterprise solutions tailored for complex organizational needs.'
    },
    {
      icon: 'mobile',
      title: 'Mobile & App Development',
      description: 'High-performance mobile and native applications for seamless user experiences.'
    },
    {
      icon: 'cloud',
      title: 'Web & Cloud Infrastructure',
      description: 'Modern cloud-native architectures and cloud infrastructure optimization.'
    },
    {
      icon: 'ai',
      title: 'AI & Automation',
      description: 'Intelligent automation systems and AI-powered decision-making engines.'
    },
    {
      icon: 'analytics',
      title: 'Digital Growth Systems',
      description: 'Data-driven platforms for digital marketing and customer acquisition.'
    },
    {
      icon: 'design',
      title: 'Branding & Media',
      description: 'Strategic branding, design, and multimedia solutions for market presence.'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {capabilities.map((cap, index) => (
        <AnimatedCard key={index} delay={index * 100} animationType="slide-up">
          <div
            className="group relative glass-card p-6 cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 rounded-[1.5rem] transition-opacity duration-500" />
            
            <div className="relative z-10">
              <div className="mb-4 transform group-hover:scale-110 transition-transform duration-500">
                <IconComponent type={cap.icon} />
              </div>
              <h3 className="text-sm font-light mb-2 text-black transition-colors duration-300">{cap.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed group-hover:text-black transition-colors duration-300">{cap.description}</p>
            </div>
          </div>
        </AnimatedCard>
      ))}
    </div>
  );
}

'use client';

import React from 'react';
import AnimatedCard from './AnimatedCard';

const IconComponent = ({ type }: { type: string }) => {
  const icons: { [key: string]: JSX.Element } = {
    ai: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 00 13.146 12.6z" />
      </svg>
    ),
    integration: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    hybrid: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
    scale: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  };
  
  return <div className="text-primary">{icons[type] || icons.ai}</div>;
};

export default function WhyStibeSection() {
  const reasons = [
    {
      icon: 'ai',
      title: 'AI-First Architecture',
      description: 'Built on cutting-edge AI and machine learning for intelligent, adaptive systems.'
    },
    {
      icon: 'integration',
      title: 'Vertically Integrated',
      description: 'Complete ecosystem of solutions from infrastructure to application layer.'
    },
    {
      icon: 'hybrid',
      title: 'SaaS + Service Hybrid',
      description: 'Flexible model combining SaaS efficiency with personalized service excellence.'
    },
    {
      icon: 'scale',
      title: 'Enterprise Frameworks',
      description: 'Scalable, battle-tested frameworks designed for enterprise-grade reliability.'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {reasons.map((reason, index) => (
        <AnimatedCard key={index} delay={index * 120} animationType="slide-up">
          <div
            className="group relative glass-card h-full p-6 flex flex-col overflow-hidden"
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Content */}
            <div className="relative z-10 flex flex-col h-full">
              <div className="mb-4 transform group-hover:scale-110 transition-transform duration-500">
                <IconComponent type={reason.icon} />
              </div>
              <h3 className="text-lg font-bold mb-2 text-black transition-colors duration-300">{reason.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed group-hover:text-black transition-colors duration-300 flex-grow">{reason.description}</p>
            </div>
          </div>
        </AnimatedCard>
      ))}
    </div>
  );
}

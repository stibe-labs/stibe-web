'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-dark/80 backdrop-blur-lg border-b border-primary/10 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-black font-bold">S</span>
            </div>
            <span className="text-xl font-bold text-black hidden sm:inline">Stibe Labs</span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-400 hover:text-primary transition">
              Home
            </Link>
            <Link href="/about" className="text-gray-400 hover:text-primary transition">
              About
            </Link>
            <Link href="/solutions" className="text-gray-400 hover:text-primary transition">
              Solutions
            </Link>
            <Link href="/platforms" className="text-gray-400 hover:text-primary transition">
              Platforms
            </Link>
            <Link href="/industries" className="text-gray-400 hover:text-primary transition">
              Industries
            </Link>
            <Link href="/contact" className="px-6 py-2 bg-primary hover:bg-secondary text-black rounded-lg font-semibold transition">
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-primary/10 pt-4">
            <Link href="/" className="block text-gray-400 hover:text-primary transition py-2">
              Home
            </Link>
            <Link href="/about" className="block text-gray-400 hover:text-primary transition py-2">
              About
            </Link>
            <Link href="/solutions" className="block text-gray-400 hover:text-primary transition py-2">
              Solutions
            </Link>
            <Link href="/platforms" className="block text-gray-400 hover:text-primary transition py-2">
              Platforms
            </Link>
            <Link href="/industries" className="block text-gray-400 hover:text-primary transition py-2">
              Industries
            </Link>
            <Link href="/contact" className="block w-full px-6 py-2 bg-primary hover:bg-secondary text-black rounded-lg font-semibold transition text-center">
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

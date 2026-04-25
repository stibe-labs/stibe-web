'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Solutions', path: '/solutions' },
  { name: 'Platforms', path: '/platforms' },
  { name: 'Industries', path: '/industries' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navBarRef = useRef<HTMLDivElement | null>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

  // Measure active link position (x-axis only) whenever route changes
  useEffect(() => {
    const activeIdx = navLinks.findIndex((l) => l.path === pathname);
    const linkEl = linkRefs.current[activeIdx];
    const navEl = navBarRef.current;
    if (!linkEl || !navEl) return;

    const navRect = navEl.getBoundingClientRect();
    const linkRect = linkEl.getBoundingClientRect();
    setIndicatorStyle({
      left: linkRect.left - navRect.left,
      width: linkRect.width,
      opacity: 1,
    });
  }, [pathname]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300',
        scrolled
          ? 'bg-white/60 backdrop-blur-2xl border-b border-white/20 saturate-[1.8]'
          : 'bg-transparent border-b border-transparent'
      )}
    >
      <nav className="mx-auto px-2 h-20 flex items-center justify-between w-full">
        {/* Logo */}
        <Link href="/" className="relative z-50 flex items-center group ml-2 md:ml-8 pl-0">
          <Image src="/logo.png" alt="Stibe Labs Logo" width={280} height={70} className="w-auto h-14 md:h-[4.5rem] object-contain" priority />
        </Link>

        {/* Desktop Nav */}
        <div
          className="hidden md:flex items-center gap-1 bg-white/30 backdrop-blur-xl border border-white/40 p-1 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.04)] relative"
          ref={(el) => { navBarRef.current = el; }}
        >
          {/* Horizontal-only sliding indicator — single persistent element */}
          <motion.div
            className="absolute top-1 bottom-1 bg-black rounded-full pointer-events-none"
            animate={indicatorStyle}
            transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
          />
          {navLinks.map((link, i) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.name}
                href={link.path}
                ref={(el) => { linkRefs.current[i] = el; }}
                className="relative px-4 py-2 rounded-full text-sm font-medium transition-colors"
              >
                <span className={clsx(
                  'relative z-10 nav-link-premium',
                  isActive ? 'text-white' : 'text-neutral-500 group-hover:text-black'
                )}>
                  {link.name}
                </span>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="hidden md:block mr-8 pr-0">
          <Link
            href="/contact"
            className="glow-button px-5 py-2.5 rounded-full bg-accent text-white font-semibold text-sm hover:bg-accent/90 transition-all shadow-glow"
          >
            Request Demo
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden relative z-50 p-2 text-black"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-2xl border-b border-black/5 md:hidden"
          >
            <div className="flex flex-col px-6 py-8 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={clsx(
                    'text-lg font-medium py-3 px-4 rounded-xl transition-colors',
                    pathname === link.path
                      ? 'text-black bg-black/5'
                      : 'text-neutral-500 hover:text-black hover:bg-black/[0.03]'
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 px-6 py-3 rounded-xl bg-accent text-white text-center font-semibold"
              >
                Request Demo
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

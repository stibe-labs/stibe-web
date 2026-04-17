'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const iconSymbols = [
  '⚡', '◆', '⬡', '△', '○', '□', '✦', '⊕', '◈', '⟐',
  '⌘', '⟁', '◇', '⬢', '⊙', '✧', '⊞', '⊠', '⟡', '◎',
];

// Deterministic pseudo-random using a seeded LCG — no hydration mismatch
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

interface FloatingIcon {
  id: number;
  symbol: string;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

function buildIcons(count: number): FloatingIcon[] {
  const rand = seededRandom(42);
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    symbol: iconSymbols[i % iconSymbols.length],
    x: rand() * 100,
    y: rand() * 100,
    size: 14 + rand() * 20,
    duration: 8 + rand() * 12,
    delay: rand() * 5,
    opacity: 0.08 + rand() * 0.15,
  }));
}

export default function FloatingIcons({ count = 22 }: { count?: number }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const icons = buildIcons(count);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map((icon) => (
        <motion.div
          key={icon.id}
          className="absolute text-black/20 select-none"
          style={{
            left: `${icon.x}%`,
            top: `${icon.y}%`,
            fontSize: `${icon.size}px`,
            opacity: icon.opacity,
          }}
          animate={{
            y: [0, -30, -10, -40, -15, -35, -5, 0],
            x: [0, 15, -10, 5, -20, 10, -5, 0],
            rotate: [0, 5, -3, 8, -5, 3, -2, 0],
          }}
          transition={{
            duration: icon.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: icon.delay,
          }}
        >
          {icon.symbol}
        </motion.div>
      ))}
    </div>
  );
}

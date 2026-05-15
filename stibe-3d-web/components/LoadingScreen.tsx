'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Confirmed from qoynco.com DOM analysis:
// - Loading overlay: position fixed, z-index 9999, background: rgba(0,0,0,0) TRANSPARENT
// - Dark #121212 background is on the body, not the overlay
// - Text appear: {opacity: 0.001, y: 10} → {opacity: 1, y: 0}
// - Exit: text slides up + fades out cleanly
const APPEAR_EASE = [0.44, 0, 0.13, 0.96] as const;
const EXIT_EASE = [0.96, -0.02, 0.38, 1.01] as const;

const WORDS = ['Stibe', 'Labs'];

interface LoadingScreenProps {
  onExitStart?: () => void;
  onComplete: () => void;
}

function LetterReveal({ letter, delay }: { letter: string; delay: number }) {
  if (letter === ' ') return <span style={{ display: 'inline-block', width: '0.3em' }} />;
  return (
    <motion.span
      style={{ display: 'inline-block' }}
      initial={{ opacity: 0.001, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay,
        duration: 0.5,
        ease: APPEAR_EASE,
        type: 'tween',
      }}
    >
      {letter}
    </motion.span>
  );
}

export default function LoadingScreen({ onExitStart, onComplete }: LoadingScreenProps) {
  const [exit, setExit] = useState(false);
  const onCompleteRef = useRef(onComplete);
  const onExitStartRef = useRef(onExitStart);
  onCompleteRef.current = onComplete;
  onExitStartRef.current = onExitStart;

  // Counter: 0 → 100 in ~0.85s (8.5ms per step), then notify parent + trigger exit
  useEffect(() => {
    let current = 0;
    const timer = setInterval(() => {
      current += 1;
      if (current >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          onExitStartRef.current?.();
          setExit(true);
        }, 50);
      }
    }, 8.5);
    return () => clearInterval(timer);
  }, []);

  // Build letter list with per-letter stagger across both words
  const allLetters: { char: string; delay: number }[] = [];
  let letterIndex = 0;
  WORDS.forEach((word, wordIndex) => {
    word.split('').forEach((char) => {
      allLetters.push({ char, delay: 0.2 + letterIndex * 0.04 });
      letterIndex++;
    });
    if (wordIndex < WORDS.length - 1) {
      allLetters.push({ char: ' ', delay: 0 });
    }
  });

  return (
    <AnimatePresence onExitComplete={() => onCompleteRef.current()}>
      {!exit && (
        <motion.div
          key="loader"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            // TRANSPARENT — matches qoynco.com (background: rgba(0,0,0,0))
            // Dark background comes from the separate layer in LoadingWrapper
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          // Text slides up 30% and fades — clean, no dark-band gradient
          exit={{ y: '-30%', opacity: 0 }}
          transition={{ duration: 0.55, ease: EXIT_EASE }}
        >
          <div
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.75rem)',
              fontWeight: 600,
              color: '#ffffff',
              letterSpacing: '-0.06em',
              fontFamily: 'var(--font-sans, sans-serif)',
              lineHeight: 1.2,
              display: 'flex',
              alignItems: 'baseline',
              flexWrap: 'wrap',
              justifyContent: 'center',
              padding: '0 1.5rem',
            }}
          >
            {allLetters.map((item, i) => (
              <LetterReveal key={i} letter={item.char} delay={item.delay} />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onExitStart?: () => void;
  onComplete: () => void;
}

// Exact values extracted from qoynco.com Framer source (script_main.D52z8_p1.mjs):
// Text appear: {opacity: 0.001, y: 10} → opacity 1, y 0
// Transition: {delay: 0.3, duration: 0.9, ease: [0.44, 0, 0.13, 0.96], type: 'tween'}
// Page exit: {duration: 0.55, ease: [0.96, -0.02, 0.38, 1.01], y: '-30%'}
// Background: rgb(18, 18, 18) = #121212
// Font: Desktop 60px, Tablet 42px, Phone 32px, letter-spacing: -0.06em
const APPEAR_EASE = [0.44, 0, 0.13, 0.96] as const;
const EXIT_EASE = [0.96, -0.02, 0.38, 1.01] as const;

const WORDS = ['Stibe', 'Labs'];

// No overflow-clip needed — qoynco uses a subtle y:10 drift, not a full y:'100%' slide
function LetterReveal({ letter, delay }: { letter: string; delay: number }) {
  if (letter === ' ') return <span style={{ display: 'inline-block', width: '0.3em' }} />;
  return (
    <motion.span
      style={{ display: 'inline-block' }}
      initial={{ opacity: 0.001, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay,
        duration: 0.9,
        ease: APPEAR_EASE,
        type: 'tween',
      }}
    >
      {letter}
    </motion.span>
  );
}

export default function LoadingScreen({ onExitStart, onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0);
  const [exit, setExit] = useState(false);
  const onCompleteRef = useRef(onComplete);
  const onExitStartRef = useRef(onExitStart);
  onCompleteRef.current = onComplete;
  onExitStartRef.current = onExitStart;

  // Counter: 0 → 100 in ~0.6s (6ms per step), then trigger exit after 50ms
  useEffect(() => {
    let current = 0;
    const timer = setInterval(() => {
      current += 1;
      setCount(current);
      if (current >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          onExitStartRef.current?.(); // notify parent BEFORE the slide begins
          setExit(true);
        }, 50);
      }
    }, 6);
    return () => clearInterval(timer);
  }, []);

  // Build letter list with per-letter stagger across both words
  const allLetters: { char: string; delay: number }[] = [];
  let letterIndex = 0;
  WORDS.forEach((word, wordIndex) => {
    word.split('').forEach((char) => {
      allLetters.push({ char, delay: 0.3 + letterIndex * 0.06 });
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
            // qoynco exact background: rgb(18, 18, 18)
            backgroundColor: '#121212',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          // Clean full upward wipe — no opacity gradient
          exit={{ y: '-100%', opacity: 1 }}
          transition={{ duration: 0.55, ease: EXIT_EASE }}
        >
          {/* Centered name — letter-by-letter reveal matching qoynco timing */}
          {/* Font: Phone 32px / Tablet 42px / Desktop 60px with -0.06em spacing */}
          <div
            style={{
              textAlign: 'center',
              // clamp maps: 320px→32px, 840px→42px, 1200px→60px
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

          {/* Percentage counter — bottom right */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: APPEAR_EASE, delay: 0.2 }}
            style={{
              position: 'absolute',
              bottom: 'clamp(1.25rem, 3vw, 2.5rem)',
              right: 'clamp(1.25rem, 3vw, 2.5rem)',
            }}
          >
            <p
              style={{
                fontSize: 'clamp(0.65rem, 1vw, 0.875rem)',
                color: 'rgba(255,255,255,0.4)',
                fontFamily: 'var(--font-sans, sans-serif)',
                fontWeight: 400,
                letterSpacing: '0.06em',
                margin: 0,
              }}
            >
              {String(count).padStart(2, '0')}%
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


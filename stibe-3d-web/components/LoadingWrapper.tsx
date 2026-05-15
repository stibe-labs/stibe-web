'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

const LoadingScreen = dynamic(() => import('./LoadingScreen'), { ssr: false });

export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [loading, setLoading] = useState(true);
  const [showBg, setShowBg] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Called when the text overlay starts its exit animation
  // → fade content in and fade dark background out simultaneously
  const handleExitStart = () => {
    setShowContent(true);
    setShowBg(false);
  };

  // Called after exit animation fully completes → remove overlay from DOM
  const handleComplete = () => {
    setLoading(false);
  };

  if (!mounted) return <>{children}</>;
  if (!isHome) return <>{children}</>;

  return (
    <>
      {/* Dark background layer (z-9997) — stays in place while text slides up,
          fades out simultaneously with content fading in (cross-fade) */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9997,
          backgroundColor: '#121212',
          pointerEvents: 'none',
          opacity: showBg ? 1 : 0,
          transition: showBg ? 'none' : 'opacity 0.6s ease',
        }}
      />

      {/* Transparent text overlay (z-9999) — slides up 30% and fades on exit */}
      {loading && (
        <LoadingScreen
          onExitStart={handleExitStart}
          onComplete={handleComplete}
        />
      )}

      {/* Page content — fades in as the text slides away (simultaneous reveal) */}
      <div
        style={{
          opacity: showContent ? 1 : 0,
          transition: showContent ? 'opacity 0.6s ease' : 'none',
          pointerEvents: showContent ? 'auto' : 'none',
        }}
      >
        {children}
      </div>
    </>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

const LoadingScreen = dynamic(() => import('./LoadingScreen'), { ssr: false });

export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [loading, setLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fires the instant the slide-up begins — show content with zero lag
  const handleExitStart = () => {
    setContentVisible(true);
  };

  // Fires after slide fully completes — remove loader from DOM
  const handleComplete = () => {
    setLoading(false);
  };

  if (!mounted) return <>{children}</>;

  // Only show loader on home page
  if (!isHome) return <>{children}</>;

  return (
    <>
      {loading && (
        <LoadingScreen
          onExitStart={handleExitStart}
          onComplete={handleComplete}
        />
      )}
      {/* Content is hidden while loader is up, then instantly revealed as slide starts */}
      <div style={{ visibility: contentVisible ? 'visible' : 'hidden' }}>{children}</div>
    </>
  );
}

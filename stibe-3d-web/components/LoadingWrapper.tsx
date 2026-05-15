'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

const LoadingScreen = dynamic(() => import('./LoadingScreen'), { ssr: false });

export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleComplete = () => {
    setLoading(false);
  };

  if (!mounted) return <>{children}</>;

  // Only show loader on home page
  if (!isHome) return <>{children}</>;

  return (
    <>
      {loading && <LoadingScreen onComplete={handleComplete} />}
      <div style={{ visibility: loading ? 'hidden' : 'visible' }}>{children}</div>
    </>
  );
}

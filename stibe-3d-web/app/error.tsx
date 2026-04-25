'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-[#050505]">
      <div className="w-24 h-24 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-8">
        <span className="text-red-400 text-5xl">⚠</span>
      </div>
      <h1 className="text-3xl font-bold text-white mb-3">Something went wrong</h1>
      <p className="text-neutral-400 mb-8 max-w-sm">
        An unexpected error occurred. Please try again or return home.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={reset}
          className="px-8 py-3 rounded-full bg-white text-black font-semibold hover:bg-neutral-200 transition-colors"
        >
          Try again
        </button>
        <Link
          href="/"
          className="px-8 py-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}

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
      <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-8">
        <span className="text-red-400 text-2xl">⚠</span>
      </div>
      <h1 className="text-3xl font-bold text-black mb-3">Something went wrong</h1>
      <p className="text-neutral-500 mb-8 max-w-sm">
        An unexpected error occurred. Please try again or return home.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={reset}
          className="px-8 py-3 rounded-full bg-accent text-white font-semibold hover:shadow-glow transition-all"
        >
          Try again
        </button>
        <Link
          href="/"
          className="px-8 py-3 rounded-full bg-black/5 border border-black/[0.1] text-black hover:bg-black/10 transition-all"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}

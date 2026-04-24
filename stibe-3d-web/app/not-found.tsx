import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-[#050505]">
      <p className="text-white/40 font-mono text-sm mb-4 tracking-widest">404</p>
      <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-4">
        Page not found
      </h1>
      <p className="text-neutral-500 mb-10 max-w-sm">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-neutral-200 transition-colors"
      >
        Back to home
      </Link>
    </div>
  );
}

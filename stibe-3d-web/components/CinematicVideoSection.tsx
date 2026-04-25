'use client';

import { motion } from 'framer-motion';

export default function CinematicVideoSection() {
  return (
    <section className="py-14 md:py-20 px-0 overflow-x-clip bg-white flex justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-[95vw] aspect-[21/9] md:aspect-[16/7] rounded-[40px] bg-black overflow-hidden shadow-2xl border-[8px] md:border-[12px] border-black group"
      >
        {/* Main Cinematic Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        >
          <source src="/kling.mp4" type="video/mp4" />
        </video>

        {/* Premium Glass Overlays & Subtle Glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

        {/* Internal Bezel Reflection/Ring */}
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[28px] md:rounded-[28px]" />

        {/* Subtle Corner Glows */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-accent/20 rounded-full blur-[100px] pointer-events-none opacity-50" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none opacity-30" />
      </motion.div>
    </section>
  );
}

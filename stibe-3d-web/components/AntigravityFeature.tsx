'use client';

import { motion } from 'framer-motion';

interface AntigravityFeatureProps {
  title: string;
  description: string;
  videoSrc: string;
  reverse?: boolean;
}

export default function AntigravityFeature({ title, description, videoSrc, reverse = false }: AntigravityFeatureProps) {
  return (
    <section className="py-24 md:py-32 px-6 overflow-x-clip">
      <div className="container mx-auto max-w-7xl">
        <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16 lg:gap-24`}>
          {/* TEXT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: reverse ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 text-left"
          >
            <h2 className="heading-section mb-8">
              {title}
            </h2>
            <p className="text-body-premium text-neutral-600 max-w-xl">
              {description}
            </p>
          </motion.div>

          {/* VIDEO BEZEL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="flex-1 w-full"
          >
            <div className="relative aspect-video rounded-[32px] md:rounded-[48px] bg-black overflow-hidden shadow-2xl border-[12px] md:border-[16px] border-black group">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover grayscale brightness-90 contrast-110 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[20px] md:rounded-[32px]" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

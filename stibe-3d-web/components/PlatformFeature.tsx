'use client';

import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight, LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface Feature {
  name: string;
  desc: string;
}

interface PlatformFeatureProps {
  title: string;
  subtitle: string;
  overview: string;
  features: Feature[];
  videoSrc: string;
  reverse?: boolean;
  ctaText?: string;
  id?: string;
  icon: LucideIcon;
}

export default function PlatformFeature({
  title,
  subtitle,
  overview,
  features,
  videoSrc,
  reverse = false,
  ctaText = 'Get Started',
  id,
  icon: Icon
}: PlatformFeatureProps) {
  return (
    <section id={id} className="py-24 md:py-32 px-6 overflow-x-clip scroll-mt-32">
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
            <div className="w-16 h-16 rounded-2xl bg-black/5 border border-black/10 flex items-center justify-center mb-8 shadow-sm">
              <Icon size={28} className="text-black" />
            </div>
            
            <h2 className="heading-section mb-4 text-black tracking-tightest">
              {title}
            </h2>
            <p className="text-xl font-medium text-neutral-400 mb-6 tracking-tight">
              {subtitle}
            </p>
            <p className="text-body-premium text-neutral-600 mb-10 leading-relaxed max-w-xl">
              {overview}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-12">
              {features.map((feature, idx) => (
                <div key={idx} className="flex gap-3 group">
                  <div className="pt-1">
                    <ChevronRight size={16} className="text-black/20 group-hover:text-black transition-colors" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-base font-semibold text-black block tracking-tight">{feature.name}</span>
                    <span className="text-sm text-neutral-500 block leading-snug">{feature.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/contact" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-black text-white font-bold hover:bg-neutral-900 transition-all text-sm shadow-xl hover:shadow-black/20 group">
              {ctaText}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* VIDEO BEZEL (ANTIGRAVITY STYLE) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="flex-1 w-full"
          >
            <div className="relative aspect-video rounded-[48px] bg-black overflow-hidden shadow-2xl border-[12px] md:border-[16px] border-black group">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover brightness-95 transition-transform duration-1000 group-hover:scale-105"
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[36px]" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

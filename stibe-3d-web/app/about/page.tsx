'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Lightbulb, Rocket, Globe2, Zap, Layers } from 'lucide-react';
import Link from 'next/link';
import FloatingIcons from '../../components/FloatingIcons';

const fadeUp = { hidden: { y: 30, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.7 } } };

const missions = [
  'To design and deliver enterprise solutions that drive measurable business outcomes',
  'To integrate software, automation, and growth systems into unified digital infrastructures',
  'To enable organizations with AI-powered decision-making and operational efficiency',
  'To develop scalable SaaS platforms for industry-specific use cases',
  'To foster long-term partnerships through innovation, reliability, and performance',
  'To continuously evolve through research, technology advancement, and market adaptation',
];

const innovationFunctions = [
  'AI research and system architecture',
  'SaaS product development (CRM, LMS, vertical platforms)',
  'Automation frameworks and intelligent systems',
  'Technology standardization and scalability planning',
];

const executionFunctions = [
  'Client acquisition and relationship management',
  'Project planning, development, and deployment',
  'Digital marketing and branding services',
  'Platform implementation and integration',
  'Support, maintenance, and optimization',
];

export default function About() {
  const [flipped, setFlipped] = useState<{ [key: number]: boolean }>({});
  const [hovered, setHovered] = useState<{ [key: number]: boolean }>({});
  const toggleFlip = (i: number) => setFlipped(prev => ({ ...prev, [i]: !prev[i] }));

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative pt-24 pb-14 px-6 overflow-x-clip min-h-[60vh] flex items-center">
        <div className="absolute inset-0 hero-grid" />
        <div className="absolute inset-0 radial-fade" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent/8 rounded-full blur-[100px]" />
        <FloatingIcons count={12} />
        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }}>
            <motion.span variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 border border-black/[0.08] text-neutral-700 text-sm mb-6">
              <Globe2 size={14} /> Company
            </motion.span>
            <motion.h1 variants={fadeUp} className="heading-page mb-6 text-gradient">
              About Stibe Labs
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-neutral-600 max-w-3xl leading-relaxed">
              A next-generation digital transformation and intelligent automation company focused on building scalable, high-performance technology ecosystems for modern businesses.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-14 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={{ show: { transition: { staggerChildren: 0.15 } } }} className="space-y-8">
            <motion.h2 variants={fadeUp} className="heading-section text-gradient">Who We Are</motion.h2>
            <motion.p variants={fadeUp} className="text-body-premium text-neutral-700 leading-relaxed max-w-4xl">
              Stibe Labs Pvt Ltd operates at the intersection of software engineering, artificial intelligence, and digital growth systems, enabling organizations to transition into fully integrated, data-driven enterprises. With a strong foundation in research-backed innovation and practical execution, Stibe Labs delivers solutions that are not only technically robust but also commercially effective.
            </motion.p>
            <motion.p variants={fadeUp} className="text-body-premium text-neutral-700 leading-relaxed max-w-4xl">
              Stibe Labs is structured to support long-term digital evolution, helping clients move beyond fragmented tools toward unified digital infrastructures.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-14 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="space-y-[var(--element-gap)]">
            <h2 className="heading-section text-black mb-12">What We Do</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { icon: Layers, title: 'Enterprise Systems', items: ['ERP, CRM, HRMS', 'Admission CRM', 'LMS frameworks', 'SaaS platforms'] },
                { icon: Zap, title: 'AI & Automation', items: ['AI-powered automation tools', 'Decision-support systems', 'Chatbots & predictive analytics'] },
                { icon: Rocket, title: 'Digital Growth', items: ['Digital marketing systems', 'Branding & media solutions', 'Performance analytics'] },
                { icon: Target, title: 'SaaS Platforms', items: ['Stibe CRM', 'Stibe LMS', 'Stibe Salon Booking'] },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  onClick={() => toggleFlip(i)}
                  style={{ perspective: '1000px', cursor: 'pointer' }}
                  className="relative group h-full"
                >
                  <div
                    className="grid w-full h-full"
                    style={{
                      transformStyle: 'preserve-3d',
                      transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease',
                      transform: flipped[i] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    }}
                  >
                    {/* Front */}
                    <div
                      style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', gridArea: '1/1' }}
                      className="relative min-h-[260px] rounded-[2rem] bg-black border border-white/10 group-hover:border-white/30 transition-colors duration-500 p-6 md:p-10 flex flex-col items-center justify-center shadow-[0_20px_60px_rgba(0,0,0,0.15)] group-hover:shadow-[0_30px_80px_rgba(0,0,0,0.3)] overflow-hidden"
                    >
                      {/* Dark color grade matching Industries */}
                      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 to-black opacity-90 group-hover:from-neutral-800 transition-colors duration-500" />
                      <div className="absolute top-0 left-0 w-full h-[50%] bg-gradient-to-b from-white/[0.1] to-transparent pointer-events-none group-hover:from-white/[0.15] transition-colors duration-500" />
                      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-full h-[80%] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06)_0%,transparent_70%)] pointer-events-none group-hover:bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.12)_0%,transparent_70%)] transition-colors duration-500" />

                      <div className="relative z-10 w-20 h-20 rounded-2xl bg-white/5 border border-white/10 group-hover:border-white/20 group-hover:bg-white/10 transition-colors duration-300 flex items-center justify-center mb-6 shadow-2xl backdrop-blur-xl">
                        <item.icon size={36} className="text-white drop-shadow-md group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <h3 className="relative z-10 text-2xl font-bold text-white tracking-tight text-center drop-shadow-lg">{item.title}</h3>
                      <p className="relative z-10 text-xs text-neutral-400 mt-3 drop-shadow-sm group-hover:text-white transition-colors duration-300">Click to see details</p>
                    </div>
                    {/* Back */}
                    <div
                      style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)',
                        gridArea: '1/1',
                      }}
                      className="relative min-h-[260px] rounded-[2rem] bg-black border border-white/10 group-hover:border-white/30 transition-colors duration-500 p-6 md:p-10 flex flex-col justify-center shadow-[0_20px_60px_rgba(0,0,0,0.15)] group-hover:shadow-[0_30px_80px_rgba(0,0,0,0.3)] overflow-hidden"
                    >
                      {/* Dark color grade matching Industries */}
                      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 to-black opacity-90 group-hover:from-neutral-800 transition-colors duration-500" />
                      <div className="absolute top-0 left-0 w-full h-[50%] bg-gradient-to-b from-white/[0.1] to-transparent pointer-events-none" />
                      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-full h-[80%] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06)_0%,transparent_70%)] pointer-events-none" />

                      <div className="relative z-10 flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-md backdrop-blur-md">
                          <item.icon size={20} className="text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-white tracking-tight drop-shadow-lg">{item.title}</h3>
                      </div>
                      <ul className="relative z-10 space-y-3">
                        {item.items.map((it, j) => (
                          <li key={j} className="text-neutral-300 text-base flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-white/50 flex-shrink-0" />{it}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-14 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="space-y-8 mb-12">
            <h2 className="heading-section text-gradient">Vision &amp; Mission</h2>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -8, scale: 1.01, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl border border-black/[0.08] bg-white/70 backdrop-blur-sm shadow-sm overflow-hidden flex flex-col hover:border-black/20 hover:bg-white transition-colors duration-300 cursor-pointer"
            >
              {/* Video Preview */}
              <div className="relative w-full bg-neutral-100 overflow-hidden" style={{ aspectRatio: '16/9' }}>
                <video
                  src="/vision.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Content */}
              <div className="p-8 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-black/5 border border-black/10 flex items-center justify-center">
                    <Lightbulb size={20} className="text-black" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-black">Vision</h3>
                </div>
                <p className="text-neutral-600 leading-relaxed text-sm">
                  To become a globally recognized digital transformation and AI-driven automation company, delivering intelligent, scalable, and industry-specific technology ecosystems that redefine how businesses operate and grow.
                </p>
              </div>
            </motion.div>

            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -8, scale: 1.01, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="rounded-2xl border border-black/[0.08] bg-white/70 backdrop-blur-sm shadow-sm overflow-hidden flex flex-col hover:border-black/20 hover:bg-white transition-colors duration-300 cursor-pointer"
            >
              {/* Video Preview */}
              <div className="relative w-full bg-neutral-100 overflow-hidden" style={{ aspectRatio: '16/9' }}>
                <video
                  src="/mission.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Content */}
              <div className="p-8 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-black/5 border border-black/10 flex items-center justify-center">
                    <Target size={20} className="text-black" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-black">Mission</h3>
                </div>
                <ul className="space-y-2">
                  {missions.map((m, i) => (
                    <li key={i} className="text-neutral-600 flex items-start gap-3 text-sm leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-black/30 mt-2 flex-shrink-0" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Organizational Structure */}
      <section className="py-14 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="space-y-8 mb-12">
            <h2 className="heading-section text-gradient">Organizational Structure</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Lightbulb,
                title: 'Innovation Layer',
                subtitle: 'Long-term technological advancement and product development.',
                items: innovationFunctions,
                anim: { opacity: 0, x: -20 },
              },
              {
                icon: Rocket,
                title: 'Execution Layer',
                subtitle: 'Delivering solutions to clients and driving business growth.',
                items: executionFunctions,
                anim: { opacity: 0, x: 20 },
              },
            ].map((card, idx) => (
              <motion.div
                key={idx}
                initial={card.anim}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => toggleFlip(10 + idx)}
                onMouseEnter={() => setHovered(prev => ({ ...prev, [10 + idx]: true }))}
                onMouseLeave={() => setHovered(prev => ({ ...prev, [10 + idx]: false }))}
                style={{
                  perspective: '1000px',
                  cursor: 'pointer',
                  transform: hovered[10 + idx] ? 'translateY(-6px)' : 'translateY(0px)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  borderRadius: '1rem',
                  boxShadow: hovered[10 + idx] ? '0 20px 40px rgba(0,0,0,0.12)' : '0 1px 4px rgba(0,0,0,0.06)',
                }}
                className="relative h-full"
              >
                <div
                  className="grid w-full h-full"
                  style={{
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: flipped[10 + idx] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}
                >
                  {/* Front — icon + title + hint */}
                  <div
                    style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', gridArea: '1/1' }}
                    className="relative min-h-[320px] glass-panel p-6 md:p-10 flex flex-col items-center justify-center"
                  >
                    <div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-black/10 transition-all duration-400"
                      style={{
                        background: hovered[10 + idx] ? '#000' : 'rgba(0,0,0,0.04)',
                      }}
                    >
                      <card.icon size={36} style={{ color: hovered[10 + idx] ? '#fff' : '#000', transition: 'color 0.4s' }} />
                    </div>
                    <h3 className="text-2xl font-bold text-black tracking-tight text-center mb-2">{card.title}</h3>
                    <p className="text-sm text-neutral-400 text-center">{card.subtitle}</p>
                    <p className="text-xs text-neutral-300 mt-4">Click to see details</p>
                  </div>
                  {/* Back — full details */}
                  <div
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      gridArea: '1/1',
                    }}
                    className="relative min-h-[320px] glass-panel p-6 md:p-10 flex flex-col justify-center"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center shadow-sm">
                        <card.icon size={20} className="text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-black tracking-tight">{card.title}</h3>
                    </div>
                    <p className="text-neutral-400 text-sm mb-6">{card.subtitle}</p>
                    <ul className="space-y-3">
                      {card.items.map((f, i) => (
                        <li key={i} className="text-neutral-600 flex items-start gap-3 text-sm">
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0 transition-transform duration-300"
                            style={{ transform: hovered[10 + idx] ? 'scale(1.4)' : 'scale(1)' }}
                          />{f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Direction */}
      <section className="py-14 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="space-y-8 mb-12">
            <h2 className="heading-section text-gradient">Strategic Direction</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Rocket, title: 'SaaS Transformation', desc: 'Building subscription-based, cloud-native, industry-specific digital operating systems through platforms like Stibe CRM, LMS, and Salon Booking.', image: '/saas.webp' },
              { icon: Zap, title: 'AI Automation', desc: 'Integrating AI across all layers for business process automation, predictive analytics, and intelligent decision-support frameworks.', image: '/AI.webp' },
              { icon: Globe2, title: 'Global Expansion', desc: 'Expanding beyond domestic markets with globally scalable SaaS platforms, strategic partnerships, and cross-industry solutions.', image: '/global.webp' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-2xl border border-black/[0.08] bg-white/60 backdrop-blur-sm shadow-sm"
              >
                {/* Photo — 0 height by default, expands down on hover */}
                <div className="overflow-hidden h-0 group-hover:h-48 transition-all duration-500 ease-in-out">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
                {/* Content — slides down as photo expands */}
                <div className="p-8">
                  <div className="w-12 h-12 rounded-xl bg-black/5 border border-black/10 flex items-center justify-center mb-5 group-hover:bg-black transition-all duration-500 shadow-sm">
                    <item.icon size={22} className="text-black group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-black">{item.title}</h3>
                  <p className="text-neutral-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="py-20 px-6 relative overflow-x-clip">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px]" />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="text-body-premium text-neutral-700 leading-relaxed text-center mb-10 max-w-4xl mx-auto">
            Stibe Labs Pvt Ltd is building the future of intelligent enterprises through integrated technology ecosystems, AI-driven automation, and scalable SaaS platforms designed for multi-industry transformation.
          </motion.p>
          <Link href="/contact" className="inline-block px-8 py-4 rounded-full bg-accent text-white font-semibold hover:shadow-glow-lg transition-all">
            Get In Touch
          </Link>
        </div>
      </section>
    </div>
  );
}

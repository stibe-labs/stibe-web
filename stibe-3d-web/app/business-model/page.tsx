'use client';

import { motion } from 'framer-motion';
import { Briefcase, CreditCard, Clock, Lock, ArrowRight, BarChart3, Repeat, Settings } from 'lucide-react';
import Link from 'next/link';
import FloatingIcons from '../../components/FloatingIcons';

const fadeUp = { hidden: { y: 30, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.7 } } };

const streams = [
  {
    icon: Briefcase,
    title: 'Project-Based Services',
    items: ['Custom software and ERP development', 'Mobile and web applications', 'AI and automation systems'],
    revenue: 'One-time project-based revenue',
  },
  {
    icon: Repeat,
    title: 'SaaS Platforms',
    items: ['Stibe CRM', 'Stibe LMS', 'Stibe Salon Booking'],
    revenue: 'Monthly / yearly subscription revenue',
  },
  {
    icon: BarChart3,
    title: 'Digital Growth Services',
    items: ['SEO and performance marketing', 'Paid advertising', 'Marketing automation'],
    revenue: 'Monthly retainer-based revenue',
  },
  {
    icon: Settings,
    title: 'Consulting & Automation',
    items: ['Business process automation', 'Technology strategy and planning'],
    revenue: 'Consulting and implementation fees',
  },
  {
    icon: Lock,
    title: 'Enterprise Licensing',
    items: ['Custom deployments', 'White-label solutions'],
    revenue: 'Licensing + customization revenue',
  },
];

export default function BusinessModel() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative pt-24 pb-14 px-6 overflow-hidden min-h-[50vh] flex items-center">
        <div className="absolute inset-0 hero-grid" />
        <div className="absolute inset-0 radial-fade" />
        <div className="absolute top-1/3 right-1/3 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[100px]" />
        <FloatingIcons count={8} />
        <div className="container mx-auto max-w-5xl relative z-10">
          <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }}>
            <motion.span variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 border border-black/[0.08] text-neutral-700 text-sm mb-6">
              <CreditCard size={14} /> Revenue Model
            </motion.span>
            <motion.h1 variants={fadeUp} className="heading-page mb-6 text-gradient">
              Business Model
            </motion.h1>
            <motion.p variants={fadeUp} className="text-body-premium text-neutral-600 max-w-3xl leading-relaxed">
              A hybrid model combining services, SaaS platforms, and automation solutions for scalable, long-term value.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Revenue Streams */}
      <section className="py-[var(--section-padding)] px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="heading-section mb-16 text-center text-gradient">
            Revenue Streams
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {streams.map((stream, i) => (
              <motion.div
                key={stream.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="glass-card p-8 group flex flex-col"
              >
                <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:shadow-glow transition-all duration-500">
                  <stream.icon size={24} className="text-accent group-hover:text-black transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-black">{stream.title}</h3>
                <ul className="space-y-2 mb-6 flex-grow">
                  {stream.items.map((item, j) => (
                    <li key={j} className="text-neutral-500 text-sm flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-accent/50" />{item}
                    </li>
                  ))}
                </ul>
                <div className="px-4 py-2 rounded-lg bg-accent/5 border border-accent/10 text-accent/80 text-xs font-medium">
                  {stream.revenue}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Deliver Value */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="glass-panel p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-purple-500/5 pointer-events-none" />
            <h3 className="heading-section mb-8 text-black relative z-10 text-center">How We Deliver Value</h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 relative z-10 mb-8">
              {['Build', 'Automate', 'Scale'].map((step, i) => (
                <div key={step} className="flex items-center gap-4">
                  <div className="px-8 py-4 rounded-xl bg-accent/10 border border-accent/20 text-accent font-bold text-xl">
                    {step}
                  </div>
                  {i < 2 && <ArrowRight size={20} className="text-black/20 hidden md:block" />}
                </div>
              ))}
            </div>
            <ul className="space-y-3 max-w-md mx-auto relative z-10">
              {['Build digital systems', 'Automate business processes', 'Scale with SaaS platforms'].map((item, i) => (
                <li key={i} className="text-neutral-600 text-sm flex items-center gap-3 justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />{item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Focus + CTA */}
      <section className="py-[var(--section-padding)] px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px]" />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="heading-section mb-12 text-gradient">
            Our Focus
          </motion.h2>
          <div className="space-y-4 mb-12">
            {['Increase recurring SaaS revenue', 'Build industry-specific platforms', 'Deliver scalable digital ecosystems'].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="text-xl md:text-2xl text-neutral-700 font-normal tracking-tight">
                {item}
              </motion.div>
            ))}
          </div>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-white font-semibold hover:shadow-glow-lg transition-all">
            Partner With Us <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}

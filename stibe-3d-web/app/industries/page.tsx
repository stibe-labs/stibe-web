'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GraduationCap, Scissors, Factory, ShoppingCart, Truck, Activity, Building2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import FloatingIcons from '../../components/FloatingIcons';

const fadeUp = { hidden: { y: 30, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.7 } } };

const industries = [
  {
    icon: GraduationCap,
    title: 'Education',
    desc: 'Complete digital ecosystems for educational institutions combining CRM, LMS, and ERP into unified platforms.',
    tags: ['CRM + LMS + ERP', 'Admission Lifecycle', 'Academic Delivery'],
  },
  {
    icon: Scissors,
    title: 'Salon & Personal Care',
    desc: 'Smart booking systems, customer management, and operational automation for salons, spas, and beauty businesses.',
    tags: ['Booking Automation', 'CRM Integration', 'Multi-branch'],
  },
  {
    icon: Factory,
    title: 'Manufacturing',
    desc: 'Enterprise resource planning and operational automation systems for streamlined manufacturing workflows.',
    tags: ['ERP Systems', 'Process Automation', 'Analytics'],
  },
  {
    icon: Truck,
    title: 'Logistics',
    desc: 'Integrated ERP and automation solutions for efficient logistics operations, fleet management, and supply chain.',
    tags: ['ERP + Automation', 'Fleet Management', 'Tracking'],
  },
  {
    icon: ShoppingCart,
    title: 'Retail & E-commerce',
    desc: 'Scalable digital platforms and performance marketing systems for retail businesses and e-commerce operations.',
    tags: ['Platforms', 'Marketing Systems', 'Analytics'],
  },
  {
    icon: Activity,
    title: 'Healthcare',
    desc: 'Digital systems and intelligent automation for healthcare providers, clinics, and medical service organizations.',
    tags: ['Digital Systems', 'Automation', 'Patient Management'],
  },
  {
    icon: Building2,
    title: 'Startups & SMEs',
    desc: 'Scalable digital infrastructure and growth systems designed for startups and small-to-medium enterprises.',
    tags: ['Scalable Infrastructure', 'Growth Systems', 'SaaS'],
  },
];

function IndustryCard({ ind }: { ind: any }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["1%", "-1%"]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [14, 7, 1]);

  return (
    <div ref={ref} className="relative min-h-[80vh] sm:min-h-[110vh] w-full flex items-center justify-center px-4 sm:px-6">
      <div className="relative w-full max-w-5xl min-h-[62vh] sm:h-[75vh] flex flex-col items-center justify-center sm:justify-end pb-0 sm:pb-20 pt-6 sm:pt-0">
        
        {/* 3D Background Card Layer */}
        <motion.div style={{ perspective: '900px', y: bgY }} className="absolute inset-0 flex items-end justify-center z-0">
          <motion.div 
            style={{ rotateX, scale: 0.95 }}
            className="w-full h-full bg-black rounded-[1.5rem] sm:rounded-[4rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-white/10 origin-bottom"
          >
             {/* Card Material and Lighting */}
             <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 to-black opacity-90" />
             <div className="absolute top-0 left-0 w-full h-[50%] bg-gradient-to-b from-white/[0.1] to-transparent pointer-events-none" />
             <div className="absolute left-1/2 top-0 -translate-x-1/2 w-full h-[80%] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06)_0%,transparent_70%)] pointer-events-none" />
          </motion.div>
        </motion.div>

        {/* Flat Text Layer overlaying the 3D card */}
        <motion.div style={{ y: textY }} className="relative z-10 w-full px-8 sm:px-12 flex flex-col items-center text-center">
          <div className="w-12 h-12 sm:w-20 sm:h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl backdrop-blur-xl mb-3 sm:mb-6 flex-shrink-0">
            <ind.icon size={22} className="text-white drop-shadow-md sm:hidden" />
            <ind.icon size={36} className="text-white drop-shadow-md hidden sm:block" />
          </div>
          <h3 className="text-xl sm:text-4xl md:text-5xl font-black mb-2 sm:mb-6 text-white tracking-widest uppercase drop-shadow-2xl leading-tight">
            {ind.title}
          </h3>
          <p className="text-neutral-400 text-xs sm:text-xl leading-relaxed mb-4 sm:mb-10 font-medium max-w-2xl mx-auto drop-shadow-md">
            {ind.desc}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3">
            {ind.tags.map((tag: string) => (
              <span key={tag} className="px-2.5 py-1 sm:px-5 sm:py-2.5 rounded-full bg-white/10 border border-white/10 text-white text-[9px] sm:text-sm font-bold tracking-wider uppercase backdrop-blur-md shadow-lg whitespace-nowrap">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function Industries() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative pt-24 pb-14 px-6 overflow-x-clip min-h-[50vh] flex items-center">
        <div className="absolute inset-0 hero-grid" />
        <div className="absolute inset-0 radial-fade" />
        <div className="absolute bottom-1/3 left-1/3 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[100px]" />
        <FloatingIcons count={10} />
        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }}>
            <motion.span variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 border border-black/[0.08] text-neutral-700 text-sm mb-6">
              <Building2 size={14} /> Verticals
            </motion.span>
            <motion.h1 variants={fadeUp} className="heading-page mb-6 text-gradient">
              Industries
            </motion.h1>
            <motion.p variants={fadeUp} className="text-body-premium text-neutral-600 max-w-3xl leading-relaxed">
              Multi-vertical technology ecosystems tailored for specific industry requirements and growth patterns.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Industries Cards Scroll Section */}
      <section className="relative w-full pb-[10vh]">
        {/* Sticky Background Text */}
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-0 pointer-events-none">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1 }}
            className="text-[14vw] font-black uppercase text-black/[0.04] tracking-tighter whitespace-nowrap leading-none select-none"
          >
            INDUSTRIES
          </motion.h2>
        </div>

        {/* Cards Wrapper */}
        <div className="relative z-10 max-w-5xl mx-auto -mt-[100vh] px-6">
          {/* Initial padding so the text is visible initially before cards arrive */}
          <div className="h-[2vh] w-full" />
          
          {industries.map((ind, i) => (
            <IndustryCard key={ind.title} ind={ind} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-[var(--section-padding)] px-6 relative overflow-x-clip">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-black/5 rounded-full blur-[120px]" />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="heading-section mb-6 text-black">
            Your Industry, Our Expertise
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="text-body-premium text-neutral-600 mb-10 max-w-2xl mx-auto">
            Let us build the digital infrastructure your industry demands.
          </motion.p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-black text-white font-semibold hover:bg-neutral-800 transition-all shadow-lg hover:shadow-black/20">
            Discuss Your Project <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}

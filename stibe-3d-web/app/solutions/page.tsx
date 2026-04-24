'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Layers, Smartphone, Layout, Cpu, TrendingUp, MonitorPlay, ArrowRight, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import FloatingIcons from '../../components/FloatingIcons';

const solutionVideos = [
  { title: 'Enterprise Software & ERP', video: '/sol-erp.mp4', icon: Layers },
  { title: 'Mobile Applications',        video: '/sol-mobile.mp4', icon: Smartphone },
  { title: 'Web & Infrastructure',        video: '/sol-web.mp4', icon: Layout },
  { title: 'AI & Automation',             video: '/sol-ai.mp4', icon: Cpu },
  { title: 'Digital Growth',              video: '/sol-growth.mp4', icon: TrendingUp },
  { title: 'Branding & Media',            video: '/sol-branding.mp4', icon: MonitorPlay },
];

const fadeUp = { hidden: { y: 30, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.7 } } };

const cardVariants = {
  hidden: { opacity: 0, y: 56, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

const featureVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: (j: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: j * 0.06, duration: 0.4, ease: 'easeOut' as const },
  }),
};

const solutions = [
  {
    icon: Layers,
    title: 'Enterprise Software & ERP',
    desc: 'Robust, scalable, and fully integrated enterprise software systems designed to streamline business operations.',
    features: ['End-to-end ERP systems', 'CRM & HRMS platforms', 'Admission CRM systems', 'LMS frameworks', 'SaaS platform development'],
    cta: 'Build Your Enterprise System',
  },
  {
    icon: Smartphone,
    title: 'Mobile Applications',
    desc: 'Advanced mobile applications that enable businesses to deliver seamless digital experiences and optimize operations.',
    features: ['Native Android / iOS apps', 'Cross-platform solutions', 'Business automation apps', 'Enterprise mobility solutions', 'AI-integrated mobile apps'],
    cta: 'Build Your Mobile Solution',
  },
  {
    icon: Layout,
    title: 'Web & Infrastructure',
    desc: 'Enterprise-grade web platforms and digital infrastructure designed to support operations and scalable ecosystems.',
    features: ['Corporate & business websites', 'Custom SaaS platforms', 'Customer & client portals', 'Cloud-native frameworks', 'E-commerce platforms'],
    cta: 'Develop Your Digital Platform',
  },
  {
    icon: Cpu,
    title: 'AI & Automation',
    desc: 'Artificial intelligence and automation integrated into business processes for efficiency and intelligent decision-making.',
    features: ['AI chatbots & engagement bots', 'Predictive analytics', 'Decision support systems', 'Business process automation', 'Data-driven strategy tools'],
    cta: 'Automate Your Business with AI',
  },
  {
    icon: TrendingUp,
    title: 'Digital Growth',
    desc: 'Integrated digital growth solutions that help businesses acquire customers and drive measurable revenue growth.',
    features: ['SEO & technical optimization', 'Paid advertising campaigns', 'Marketing automation', 'Lead nurturing workflows', 'Funnel optimization'],
    cta: 'Scale Your Growth',
  },
  {
    icon: MonitorPlay,
    title: 'Branding & Media',
    desc: 'Comprehensive branding and media services designed to build strong brand identities and impactful communication.',
    features: ['Logo & brand identity systems', 'Content & creative design', 'Video production', 'Corporate profiles', 'Visual storytelling'],
    cta: 'Build Your Brand Presence',
  },
];

const makeSlug = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');



function SolutionVideoShowcase() {
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // cursor-following button
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const btnX = useSpring(rawX, { stiffness: 400, damping: 28 });
  const btnY = useSpring(rawY, { stiffness: 400, damping: 28 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    rawX.set(e.clientX - rect.left);
    rawY.set(e.clientY - rect.top);
  };

  useEffect(() => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [active]);

  const Icon = solutionVideos[active].icon;

  return (
    <section className="py-14 px-6 relative overflow-x-clip">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-accent/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          className="mb-14"
        >
          <p className="text-sm font-medium text-neutral-400 uppercase tracking-widest mb-3">Deep Dive</p>
          <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight">See each solution in action</h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Tab list */}
          <div className="relative w-full lg:w-72 flex-shrink-0">
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto no-scrollbar lg:overflow-visible pb-2 lg:pb-0">
              {solutionVideos.map((s, i) => {
                const TabIcon = s.icon;
                return (
                  <button
                    key={s.title}
                    onClick={() => setActive(i)}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-left transition-all duration-300 whitespace-nowrap lg:whitespace-normal flex-shrink-0 lg:w-full ${
                      active === i
                        ? 'bg-black text-white shadow-lg'
                        : 'bg-black/[0.04] text-neutral-500 hover:bg-black/[0.08] hover:text-black'
                    }`}
                  >
                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                      active === i ? 'bg-white/15' : 'bg-black/[0.06]'
                    }`}>
                      <TabIcon size={16} className={active === i ? 'text-white' : 'text-black/50'} />
                    </span>
                    <span className="text-sm font-semibold">{s.title}</span>
                    {active === i && (
                      <ChevronRight size={14} className="ml-auto flex-shrink-0 text-white/60" />
                    )}
                  </button>
                );
              })}
            </div>
            {/* Right fade hint – mobile only */}
            <div className="pointer-events-none absolute top-0 right-0 h-full w-10 bg-gradient-to-l from-white to-transparent lg:hidden" />
          </div>

          {/* Video panel */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.97, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: -16 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                ref={panelRef}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onMouseMove={handleMouseMove}
                className="relative rounded-3xl overflow-hidden bg-black shadow-2xl border border-black/10 cursor-none"
                style={{ aspectRatio: '16 / 9' }}
              >
                <video
                  ref={videoRef}
                  src={solutionVideos[active].video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
                {/* Cursor-following Details button */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      key="cursor-btn"
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.7 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        x: btnX,
                        y: btnY,
                        translateX: '-50%',
                        translateY: '-50%',
                        pointerEvents: 'auto',
                      }}
                    >
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          const el = document.getElementById(makeSlug(solutionVideos[active].title));
                          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }}
                        className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-black font-bold text-sm shadow-2xl border border-black/10 select-none whitespace-nowrap"
                      >
                        Details <ArrowRight size={14} />
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
                {/* Label badge */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10">
                  <Icon size={13} className="text-white/70" />
                  <span className="text-white/90 text-xs font-medium">{solutionVideos[active].title}</span>
                </div>
                <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-black/10 pointer-events-none" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Solutions() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative pt-24 pb-14 px-6 overflow-x-clip min-h-[50vh] flex items-center">
        <div className="absolute inset-0 hero-grid" />
        <div className="absolute inset-0 radial-fade" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[100px]" />
        <FloatingIcons count={10} />
        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }}>
            <motion.span variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 border border-black/[0.08] text-neutral-700 text-sm mb-6">
              <Layers size={14} /> What We Build
            </motion.span>
            <motion.h1 variants={fadeUp} className="heading-page mb-6 text-gradient">
              Solutions
            </motion.h1>
            <motion.p variants={fadeUp} className="text-body-premium text-neutral-600 max-w-3xl leading-relaxed">
              Technology, automation, growth, and branding integrated into a unified ecosystem for building, scaling, and optimizing your digital presence.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-14 px-6 relative overflow-x-clip">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/6 rounded-full blur-[140px] pointer-events-none" />
        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 32 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2, margin: '-60px' }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.1 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl border border-black/8 bg-black"
            style={{ aspectRatio: '16 / 9' }}
          >
            <video
              src="/solutions-hero.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
            {/* Subtle vignette overlay */}
            <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-black/10 pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-[var(--section-padding)] px-6">
        <div className="container mx-auto max-w-7xl space-y-8">
          {solutions.map((sol, i) => (
            <motion.div
              key={sol.title}
              id={makeSlug(sol.title)}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2, margin: '-80px' }}
              className="glass-card p-8 md:p-12 group"
            >
              <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
                <div className="flex-1">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: i * 0.08 + 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                    className="w-16 h-16 rounded-2xl bg-black/5 border border-black/10 flex items-center justify-center mb-8 group-hover:bg-black transition-all duration-500 shadow-sm"
                  >
                    <sol.icon size={28} className="text-black group-hover:text-white transition-colors duration-500" />
                  </motion.div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-5 text-black tracking-tight">{sol.title}</h3>
                  <p className="text-neutral-600 text-lg leading-relaxed mb-8 max-w-xl">{sol.desc}</p>
                  <Link href="/contact" className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-black text-white font-semibold hover:bg-neutral-800 transition-all text-sm shadow-lg hover:shadow-black/20">
                    {sol.cta} <ArrowRight size={18} />
                  </Link>
                </div>
                <div className="flex-1 lg:max-w-sm flex items-center">
                  <ul className="space-y-4 w-full">
                    {sol.features.map((f, j) => (
                      <motion.li
                        key={j}
                        custom={j}
                        variants={featureVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2, margin: '-40px' }}
                        className="text-neutral-500 text-base flex items-center gap-4 py-3 border-b border-black/[0.04] last:border-b-0 group-hover:text-black transition-colors"
                      >
                        <ChevronRight size={16} className="text-black/20 flex-shrink-0" />{f}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Solution Video Showcase */}
      <SolutionVideoShowcase />

      {/* Closing */}
      <section className="py-20 px-6 relative overflow-x-clip">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px]" />
        <div className="container mx-auto max-w-7xl text-center relative z-10">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} className="text-2xl md:text-3xl text-neutral-700 leading-relaxed font-medium tracking-tight mb-10">
            Stibe Labs integrates technology, automation, growth, and branding into a unified ecosystem.
          </motion.p>
          <Link href="/contact" className="inline-block px-8 py-4 rounded-full bg-accent text-white font-semibold hover:shadow-glow-lg transition-all">
            Start Building
          </Link>
        </div>
      </section>
    </div>
  );
}

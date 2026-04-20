'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, Layers, Box, Cpu, Network, Sparkles, Megaphone, ArrowRight, Zap, Globe, Shield, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import AntigravityFeature from '../components/AntigravityFeature';
import ParticlesBackground from '../components/ParticlesBackground';
import SymbolWaveSection from '../components/SymbolWaveSection';
import CinematicVideoSection from '../components/CinematicVideoSection';

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { y: 40, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.7 } },
};

const capabilities = [
  { icon: Layers, title: 'Enterprise Software & ERP', desc: 'Unified systems for total operational control across departments.' },
  { icon: Box, title: 'Mobile & App Development', desc: 'Scalable, high-performance apps for Android, iOS and cross-platform.' },
  { icon: Network, title: 'Web & Cloud Infrastructure', desc: 'Robust cloud-native foundations for modern digital ecosystems.' },
  { icon: Cpu, title: 'AI & Automation', desc: 'Intelligent systems for data-driven decisions and process automation.' },
  { icon: Sparkles, title: 'Digital Growth Systems', desc: 'Data-backed marketing pipelines for scalable customer acquisition.' },
  { icon: Megaphone, title: 'Branding & Media', desc: 'Strategic brand identity and impactful creative storytelling.' },
];

const platforms = [
  { 
    name: 'Stibe CRM', 
    subtitle: 'Lead lifecycle & conversion system', 
    category: 'CRM', 
    image: '/crm.webp', 
    link: '/platforms#crm' 
  },
  { 
    name: 'Enceladus AI', 
    subtitle: 'Real-Time Business Intelligence', 
    category: 'Analytics', 
    image: '/ai chat.webp', 
    link: '/platforms#enceladus' 
  },
  { 
    name: 'Stibe LMS', 
    subtitle: 'Learning & academic platform', 
    category: 'Education', 
    image: '/lms.webp', 
    link: '/platforms#lms' 
  },
  { 
    name: 'Stibe Salon Booking', 
    subtitle: 'Appointment & service automation', 
    category: 'Automation', 
    image: '/salon.webp', 
    link: '/platforms#salon' 
  },
];

const industries = ['Education', 'Salon & Personal Care', 'Manufacturing', 'Logistics', 'Retail & E-commerce', 'Healthcare', 'Startups & SMEs'];

const whyStibe = [
  { icon: Zap, label: 'AI-first architecture' },
  { icon: Globe, label: 'Vertically integrated ecosystem' },
  { icon: Shield, label: 'SaaS + Service hybrid model' },
  { icon: TrendingUp, label: 'Scalable enterprise frameworks' },
];

function HeroTyping() {
  const words = ['Intelligent', 'Scalable', 'Automated'];
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[idx];
    const timer = setTimeout(() => {
      if (!deleting) {
        setText(word.slice(0, text.length + 1));
        if (text.length + 1 === word.length) setTimeout(() => setDeleting(true), 1800);
      } else {
        setText(word.slice(0, text.length - 1));
        if (text.length - 1 === 0) {
          setDeleting(false);
          setIdx((idx + 1) % words.length);
        }
      }
    }, deleting ? 40 : 80);
    return () => clearTimeout(timer);
  }, [text, deleting, idx]);

  return (
    <span className="text-gradient-accent">{text}<span className="cursor-blink text-accent">|</span></span>
  );
}

function VideoZoomSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0.3, 0.6], [0.55, 0.95]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.3, 1], [0, 1, 1]);
  const rounded = useTransform(scrollYProgress, [0.3, 0.6], [40, 24]);

  return (
    <section ref={containerRef} className="relative h-[150vh] flex items-center justify-center -mt-32">
      <div className="sticky top-0 h-screen w-screen flex items-center justify-center overflow-hidden pointer-events-none">
        <motion.div
          style={{ scale, opacity, borderRadius: rounded }}
          className="relative w-[100%] max-w-[95vw] aspect-video bg-black overflow-hidden shadow-2xl border border-black/10"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/agy-logo.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}

function HorizontalCapabilities({ targetRef }: { targetRef: React.RefObject<HTMLElement> }) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  const x = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '-65%']);

  return (
    <div className="relative w-full overflow-visible">
      <motion.div
        style={{ x }}
        className="flex gap-8 px-6 md:px-[10%]"
      >
        {capabilities.map((cap, i) => (
          <motion.div
            key={cap.title}
            className="glass-card p-12 group cursor-default min-w-[85vw] md:min-w-[450px] lg:min-w-[550px] flex flex-col justify-center min-h-[300px]"
          >
            <div className="w-20 h-20 rounded-3xl bg-black/5 border border-black/10 flex items-center justify-center mb-10 group-hover:bg-black group-hover:border-black transition-all duration-500 shadow-sm group-hover:shadow-2xl">
              <cap.icon size={40} className="text-black group-hover:text-white transition-colors duration-500" />
            </div>
            <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-black tracking-tightest leading-[1.05]">{cap.title}</h3>
            <p className="text-body-premium text-neutral-500 max-w-md group-hover:text-black transition-colors duration-500">{cap.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Home() {
  const capabilitiesRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -450 : 450;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col">

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-x-clip bg-white">
        <ParticlesBackground />
        <div className="absolute inset-0 hero-grid opacity-70" />
        <div className="absolute inset-0 hero-particle-glow" />
        <div className="absolute inset-0 radial-fade" />

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="relative z-10 max-w-5xl mx-auto"
        >


          <motion.h1 variants={fadeUp} className="heading-hero mb-8">
            <span className="text-black">Engineering </span>
            <br className="hidden md:block" />
            <HeroTyping />
            <br className="hidden md:block" />
            <span className="text-black"> Digital Ecosystems</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-body-premium text-neutral-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            AI-powered software, automation platforms, and SaaS systems designed for scalable, performance-driven enterprises.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
            <Link href="/solutions" className="w-full sm:w-auto px-10 py-5 rounded-full bg-black text-white font-bold text-lg hover:bg-neutral-900 transition-all text-center shadow-xl hover:shadow-black/20">
              Get Started
            </Link>
            <Link href="/contact" className="group w-full sm:w-auto px-10 py-5 rounded-full bg-black/5 border border-black/10 hover:bg-black/10 transition-all flex items-center justify-center gap-3 font-semibold text-black text-lg backdrop-blur-sm">
              Book a Demo
              <ChevronRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-black/10 rounded-full flex items-start justify-center p-1.5">
            <div className="w-1.5 h-3 bg-black/40 rounded-full" />
          </div>
        </motion.div>
      </section>
      
      {/* VIDEO ZOOM SECTION */}
      <VideoZoomSection />

      {/* SYMBOL WAVE SECTION */}
      <SymbolWaveSection />

      {/* ANTIGRAVITY FEATURES */}
      <AntigravityFeature 
        title="Software Solutions"
        description="Robust, scalable, and fully integrated enterprise software systems designed to streamline business operations."
        videoSrc="/agy-logo.mp4"
      />
      
      <AntigravityFeature 
        title="Marketing Solutions"
        description="Integrated digital growth solutions that help businesses acquire customers and drive measurable revenue growth."
        videoSrc="/agy-logo.mp4"
        reverse={false}
      />

      {/* CORE CAPABILITIES - MOBILE SWIPE */}
      <section className="md:hidden py-20 relative overflow-x-clip" id="capabilities">
        <div className="px-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-left"
          >
            <h2 className="text-[36px] font-medium tracking-tightest leading-tight text-black mb-4">
              Core Capabilities
            </h2>
            <p className="text-body-premium text-neutral-500 max-w-xl">
              Building the digital backbone for modern organizations through integrated expertise and vertically integrated digital ecosystems.
            </p>
          </motion.div>
        </div>
        <div className="flex overflow-x-auto gap-4 pb-6 no-scrollbar snap-x snap-mandatory px-6">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-7 snap-center w-[calc(100vw-48px)] flex-shrink-0 flex flex-col justify-center min-h-[240px]"
            >
              <div className="w-12 h-12 rounded-2xl bg-black/5 border border-black/10 flex items-center justify-center mb-6">
                <cap.icon size={24} className="text-black" />
              </div>
              <h3 className="text-[19px] font-semibold mb-3 text-black tracking-tightest leading-tight">{cap.title}</h3>
              <p className="text-body-premium text-neutral-500 text-[14px] leading-relaxed">{cap.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center gap-1.5 mt-6">
          {capabilities.map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-black/20" />
          ))}
        </div>
      </section>

      {/* CORE CAPABILITIES - DESKTOP HORIZONTAL SCROLL */}
      <section ref={capabilitiesRef} className="relative h-[400vh] hidden md:block" id="capabilities-desktop">
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          <div className="container mx-auto max-w-7xl px-6 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-left"
            >
              <h2 className="text-[40px] md:text-[54px] font-medium tracking-tightest leading-tight text-black mb-4">
                Core Capabilities
              </h2>
              <p className="text-body-premium text-neutral-500 max-w-xl">
                Building the digital backbone for modern organizations through integrated expertise and vertically integrated digital ecosystems.
              </p>
            </motion.div>
          </div>

          <HorizontalCapabilities targetRef={capabilitiesRef} />
        </div>
      </section>

      {/* FEATURED PLATFORMS (ANTIGRAVITY STYLE) */}
      <section className="py-[120px] px-6 relative overflow-x-clip bg-white">
        <div className="container mx-auto max-w-7xl relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-left"
            >
              <h2 className="text-[40px] md:text-[54px] font-medium tracking-tightest leading-tight text-black mb-4">
                Featured Platforms
              </h2>
              <p className="text-body-premium text-neutral-500 max-w-xl">
                Industry-specific digital operating systems that combine acquisition, delivery, and analytics into a unified ecosystem.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Link href="/platforms" className="px-8 py-3.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-black font-semibold text-[15px] transition-all duration-300 flex items-center gap-2">
                View all platforms
              </Link>
            </motion.div>
          </div>

          <div className="relative group/carousel">
            <motion.div 
              ref={carouselRef as any}
              className="flex gap-6 overflow-x-auto pb-12 no-scrollbar snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none' }}
              drag="x"
              dragConstraints={{ right: 0, left: -400 }} // Simplified constraint
            >
              {platforms.map((p, i) => (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="min-w-[300px] md:min-w-[420px] snap-start"
                >
                  <Link href={p.link} className="block group">
                    <div className="relative aspect-square bg-black rounded-[40px] overflow-hidden mb-8 transition-all duration-700">
                      {(p as any).isVideo ? (
                        <video 
                          autoPlay 
                          muted 
                          loop 
                          playsInline 
                          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000"
                        >
                          <source src={p.image} type="video/mp4" />
                        </video>
                      ) : (
                        <img 
                          src={p.image} 
                          alt={p.name}
                          className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000"
                        />
                      )}
                      
                      <div className="absolute inset-0 flex items-center justify-center p-8">
                        <span className="text-3xl md:text-4xl font-semibold text-white text-center tracking-tightest leading-tight group-hover:scale-105 transition-transform duration-700">
                          {p.name}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3 px-2">
                      <h3 className="text-2xl md:text-[28px] font-semibold text-black tracking-tightest leading-tight group-hover:text-accent transition-colors">
                        {p.subtitle}
                      </h3>
                      <div className="flex items-center gap-2 text-[14.5px] text-neutral-400 font-medium">
                        <span>{p.category}</span>
                      </div>
                      <div className="pt-4 flex items-center gap-1.5 text-[15px] font-semibold text-black overflow-hidden">
                        <span className="relative">
                          Explore platform
                          <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-black group-hover:w-full transition-all duration-500" />
                        </span>
                        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Nav Arrows (Visual/Layout match) */}
            <div className="absolute -bottom-4 left-0 flex items-center gap-4">
              <button 
                onClick={() => scrollCarousel('left')}
                className="w-10 h-10 rounded-full border border-neutral-100 flex items-center justify-center hover:bg-neutral-50 transition-colors"
                aria-label="Previous platform"
              >
                <ChevronRight size={20} className="rotate-180 text-neutral-400" />
              </button>
              <button 
                onClick={() => scrollCarousel('right')}
                className="w-10 h-10 rounded-full border border-neutral-100 flex items-center justify-center hover:bg-neutral-50 transition-colors"
                aria-label="Next platform"
              >
                <ChevronRight size={20} className="text-black" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PLATFORM ECOSYSTEM */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-10 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-purple-500/5 pointer-events-none" />
            <h3 className="text-3xl md:text-4xl font-bold mb-8 text-black relative z-10">Platform Ecosystem</h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 relative z-10">
              {['Acquire', 'Convert', 'Deliver', 'Manage'].map((step, i) => (
                <div key={step} className="flex items-center gap-4">
                  <div className="px-6 py-3 rounded-xl bg-accent/10 border border-accent/20 text-accent font-semibold text-lg">
                    {step}
                  </div>
                  {i < 3 && <ArrowRight size={20} className="text-black/20 hidden md:block" />}
                </div>
              ))}
            </div>
            <p className="text-neutral-500 mt-8 max-w-2xl mx-auto relative z-10">
              All Stibe platforms operate as independent solutions or integrated ecosystems, enabling complete business automation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* WHY STIBE + INDUSTRIES */}
      <section className="py-[var(--section-padding)] px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="heading-section mb-12 text-gradient">
                Why Stibe
              </motion.h2>
              <div className="space-y-5">
                {whyStibe.map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center gap-5 py-5 border-b border-black/[0.06] last:border-b-0">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                      <item.icon size={20} className="text-accent" />
                    </div>
                    <span className="text-xl md:text-2xl text-neutral-700 font-normal tracking-tight">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="lg:pl-16 lg:border-l lg:border-black/[0.06]">
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="heading-section mb-12 text-gradient">
                Industries
              </motion.h2>
              <div className="space-y-4">
                {industries.map((ind, i) => (
                  <motion.div key={ind} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="py-4 border-b border-black/[0.06] last:border-b-0 text-xl md:text-2xl text-neutral-600 font-normal tracking-tight hover:text-black transition-colors cursor-default">
                    {ind}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CINEMATIC VIDEO SECTION */}
      <CinematicVideoSection />

      {/* CTA */}
      <section className="py-[var(--section-padding)] px-6 relative overflow-x-clip">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[150px]" />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="heading-hero mb-8 text-gradient">
            Let&apos;s Build Your Digital Infrastructure
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-body-premium text-neutral-600 mb-10 max-w-2xl mx-auto">
            Ready to transition from fragmented tools to a unified digital ecosystem?
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <Link href="/contact" className="inline-block px-10 py-5 rounded-full bg-accent text-white font-bold text-lg hover:shadow-glow-lg transition-all">
              Start the Transformation
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

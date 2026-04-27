'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { TrendingUp, MonitorPlay, Megaphone, Zap, BarChart2, ArrowRight, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import FloatingIcons from '../../../components/FloatingIcons';

const solutionVideos = [
  { title: 'Digital Growth Systems', video: '/sol-growth.mp4', icon: TrendingUp },
  { title: 'Branding & Media', video: '/sol-branding.mp4', icon: MonitorPlay },
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
    icon: TrendingUp,
    title: 'Digital Growth Systems',
    desc: 'Integrated digital growth strategies that help businesses acquire customers, build pipelines, and drive measurable revenue at scale.',
    features: [
      'SEO & technical optimization',
      'Paid advertising campaigns',
      'Marketing automation',
      'Lead nurturing workflows',
      'Funnel optimization',
    ],
    cta: 'Scale Your Growth',
  },
  {
    icon: MonitorPlay,
    title: 'Branding & Media',
    desc: 'Comprehensive branding and media services that build powerful brand identities and create impactful communications that resonate.',
    features: [
      'Logo & brand identity systems',
      'Content & creative design',
      'Video production',
      'Corporate profiles',
      'Visual storytelling',
    ],
    cta: 'Build Your Brand Presence',
  },
  {
    icon: Megaphone,
    title: 'Social Media Marketing',
    desc: 'Data-driven social media strategies that grow audiences, build community, and convert followers into loyal customers.',
    features: [
      'Platform management & strategy',
      'Content calendar & creation',
      'Community management',
      'Influencer partnerships',
      'Paid social campaigns',
    ],
    cta: 'Grow Your Social Presence',
  },
  {
    icon: Zap,
    title: 'Email & Marketing Automation',
    desc: 'Precision-targeted email campaigns and automated marketing workflows that nurture leads and retain customers at every stage.',
    features: [
      'Targeted email campaigns',
      'Automated drip sequences',
      'CRM & audience segmentation',
      'Re-engagement workflows',
      'A/B testing & optimization',
    ],
    cta: 'Automate Your Marketing',
  },
  {
    icon: BarChart2,
    title: 'Content & SEO Strategy',
    desc: 'Authority-building content strategies paired with technical SEO to drive organic traffic, qualified leads, and lasting visibility.',
    features: [
      'Technical SEO audits',
      'Content strategy & planning',
      'Blog & editorial management',
      'Keyword research & mapping',
      'Authority & backlink building',
    ],
    cta: 'Dominate Search & Content',
  },
];

const makeSlug = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

function SolutionVideoShowcase() {
  const [active, setActive] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

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
            <div className="pointer-events-none absolute top-0 right-0 h-full w-10 bg-gradient-to-l from-white to-transparent lg:hidden" />
          </div>

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

function WorksSection() {
  const WORK_VIDEOS = Array(5).fill('/kitkat.mp4');
  const WORK_PHOTOS = Array(5).fill('/post.jpg');

  // ---- Video row (scrolls rightward) ----
  const videoTrackRef = useRef<HTMLDivElement>(null);
  const videoOffsetRef = useRef<number | null>(null);
  const videoPausedRef = useRef(false);
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);
  const videoElemsRef = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    let raf: number;
    const tick = () => {
      const track = videoTrackRef.current;
      if (track) {
        const halfWidth = track.scrollWidth / 2;
        if (videoOffsetRef.current === null) {
          videoOffsetRef.current = -halfWidth;
        }
        if (!videoPausedRef.current) {
          videoOffsetRef.current! += 0.5;
          if (videoOffsetRef.current! > 0) {
            videoOffsetRef.current = -halfWidth;
          }
          track.style.transform = `translateX(${videoOffsetRef.current}px)`;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // ---- Photo row (scrolls leftward) ----
  const photoTrackRef = useRef<HTMLDivElement>(null);
  const photoOffsetRef = useRef(0);
  const photoPausedRef = useRef(false);
  const [hoveredPhoto, setHoveredPhoto] = useState<number | null>(null);

  useEffect(() => {
    let raf: number;
    const tick = () => {
      const track = photoTrackRef.current;
      if (track && !photoPausedRef.current) {
        const halfWidth = track.scrollWidth / 2;
        photoOffsetRef.current = (photoOffsetRef.current + 0.5) % halfWidth;
        track.style.transform = `translateX(-${photoOffsetRef.current}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Resume both rows when finger lifts anywhere on the document (mobile touch fix)
  useEffect(() => {
    const resume = () => {
      videoPausedRef.current = false;
      photoPausedRef.current = false;
      setHoveredVideo(null);
      setHoveredPhoto(null);
    };
    document.addEventListener('touchend', resume);
    document.addEventListener('touchcancel', resume);
    return () => {
      document.removeEventListener('touchend', resume);
      document.removeEventListener('touchcancel', resume);
    };
  }, []);

  // Play hovered video, pause others
  useEffect(() => {
    videoElemsRef.current.forEach((v, i) => {
      if (!v) return;
      if (i === hoveredVideo) {
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [hoveredVideo]);

  const allVideos = [...WORK_VIDEOS, ...WORK_VIDEOS];
  const allPhotos = [...WORK_PHOTOS, ...WORK_PHOTOS];

  return (
    <section className="py-20 overflow-hidden">
      {/* Header */}
      <div className="container mx-auto max-w-7xl px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-medium text-neutral-400 uppercase tracking-widest mb-3">Portfolio</p>
          <h2 className="text-3xl md:text-4xl font-bold text-black tracking-tight">Works</h2>
        </motion.div>
      </div>

      {/* Video Row – scrolls right, Instagram reel ratio (9:16) */}
      <div
        className="relative overflow-hidden mb-16 py-3"
        onMouseEnter={() => { videoPausedRef.current = true; }}
        onMouseLeave={() => { videoPausedRef.current = false; setHoveredVideo(null); }}
        onTouchStart={() => { videoPausedRef.current = true; }}
      >
        <div
          ref={videoTrackRef}
          className="flex gap-3 px-3 md:gap-4 md:px-4 will-change-transform"
          style={{ width: 'max-content' }}
        >
          {allVideos.map((src, i) => (
            <motion.div
              key={i}
              className="flex-shrink-0 relative overflow-hidden rounded-xl md:rounded-2xl bg-black cursor-pointer w-[130px] md:w-[260px]"
              style={{ aspectRatio: '9/16' }}
              animate={
                hoveredVideo === i
                  ? { y: -10, scale: 1.04, boxShadow: '0 28px 56px rgba(0,0,0,0.22)' }
                  : { y: 0, scale: 1, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }
              }
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              onMouseEnter={() => setHoveredVideo(i)}
              onMouseLeave={() => setHoveredVideo(null)}
            >
              <video
                ref={(el) => { videoElemsRef.current[i] = el; }}
                src={src}
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
                style={{ background: 'rgba(0,0,0,0.28)', opacity: hoveredVideo === i ? 0 : 1 }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Photo Row – scrolls left, Instagram post ratio (1:1) */}
      <div
        className="relative overflow-hidden py-3"
        onMouseEnter={() => { photoPausedRef.current = true; }}
        onMouseLeave={() => { photoPausedRef.current = false; setHoveredPhoto(null); }}
        onTouchStart={() => { photoPausedRef.current = true; }}
      >
        <div
          ref={photoTrackRef}
          className="flex gap-3 px-3 md:gap-4 md:px-4 will-change-transform"
          style={{ width: 'max-content' }}
        >
          {allPhotos.map((src, i) => (
            <motion.div
              key={i}
              className="flex-shrink-0 overflow-hidden rounded-xl md:rounded-2xl cursor-pointer w-[140px] md:w-[280px]"
              style={{ aspectRatio: '1/1' }}
              animate={
                hoveredPhoto === i
                  ? { y: -10, scale: 1.03, boxShadow: '0 28px 56px rgba(0,0,0,0.18)' }
                  : { y: 0, scale: 1, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }
              }
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              onMouseEnter={() => setHoveredPhoto(i)}
              onMouseLeave={() => setHoveredPhoto(null)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="Work" className="w-full h-full object-cover" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function DigitalMarketingSolutions() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative pt-24 pb-14 px-6 overflow-x-clip min-h-[50vh] flex items-center">
        <div className="absolute inset-0 hero-grid" />
        <div className="absolute inset-0 radial-fade" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[100px]" />
        <FloatingIcons count={10} />
        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }}>
            <motion.span variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 border border-black/[0.08] text-neutral-700 text-sm mb-6">
              <TrendingUp size={14} /> Digital Marketing Solutions
            </motion.span>
            <motion.h1 variants={fadeUp} className="heading-page mb-6 text-gradient">
              Digital Marketing Solutions
            </motion.h1>
            <motion.p variants={fadeUp} className="text-body-premium text-neutral-600 max-w-3xl leading-relaxed">
              Growth systems, branding, social media, email automation, and SEO — integrated into a unified marketing engine that acquires customers and builds lasting brand value.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Hero Video */}
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

      {/* Works – video & photo marquee */}
      <WorksSection />

      {/* Solution Video Showcase */}
      <SolutionVideoShowcase />

      {/* Closing CTA */}
      <section className="py-20 px-6 relative overflow-x-clip">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px]" />
        <div className="container mx-auto max-w-7xl text-center relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-2xl md:text-3xl text-neutral-700 leading-relaxed font-medium tracking-tight mb-10"
          >
            Stibe Labs integrates technology, automation, growth, and branding into a unified ecosystem.
          </motion.p>
          <Link href="/contact" className="inline-block px-8 py-4 rounded-full bg-accent text-white font-semibold hover:shadow-glow-lg transition-all">
            Start Your Campaign
          </Link>
        </div>
      </section>
    </div>
  );
}

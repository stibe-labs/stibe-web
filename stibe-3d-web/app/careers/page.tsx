'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Briefcase, Code2, Palette, ChevronDown, ArrowRight, Brain, PackageCheck, GraduationCap, Layers } from 'lucide-react';
import FloatingIcons from '../../components/FloatingIcons';

const fadeUp = { hidden: { y: 30, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.7 } } };

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const whyJoin = [
  {
    icon: Brain,
    title: 'Work on AI-Driven Systems',
    items: ['AI analytics', 'Automation systems', 'Intelligent decision platforms', 'AI-powered learning systems'],
    image: '/why-work-on-ai-systems.webp',
  },
  {
    icon: PackageCheck,
    title: 'Build Real Products',
    items: ['CRM, LMS & ERP automation platforms', 'AI systems used by real businesses'],
    image: '/why-build-real-products.webp',
  },
  {
    icon: GraduationCap,
    title: 'Learn Tech + AI + Growth',
    items: ['SaaS architecture', 'Artificial Intelligence systems', 'Automation workflows', 'Digital marketing & funnels', 'Data-driven decision making'],
    image: '/why-learn-tech-ai-growth.webp',
  },
  {
    icon: Layers,
    title: 'Ownership Over Systems',
    items: ["You won't just execute tasks — you'll design and build intelligent systems end-to-end."],
    image: '/why-ownership-over-systems.webp',
  },
];

const roles = [
  {
    id: 'software-developer',
    icon: Code2,
    title: 'Software Developer',
    about:
      'Join our engineering team to build intelligent, scalable digital products. You will work at the intersection of software, AI, and product thinking — crafting systems that power real businesses.',
    responsibilities: [
      'Design and develop SaaS platforms (CRM, LMS, ERP)',
      'Build and integrate AI & automation systems',
      'Develop full-stack web and mobile applications',
      'Architect scalable APIs and data pipelines',
      'Collaborate with product and design teams to ship features end-to-end',
    ],
    requirements: [
      'Proficiency in React / Next.js and Node.js (or equivalent stack)',
      'Understanding of databases (SQL / NoSQL)',
      'Experience with REST APIs or GraphQL',
      'Familiarity with AI/ML concepts is a plus',
      'Strong problem-solving mindset and ownership attitude',
    ],
  },
  {
    id: 'graphic-designer',
    icon: Palette,
    title: 'Graphic Designer',
    about:
      'Be the visual force behind Stibe Labs — crafting brand identities, marketing materials, and digital experiences that communicate intelligence and precision.',
    responsibilities: [
      'Create brand identities, visual systems, and marketing collateral',
      'Design UI/UX assets for digital products and platforms',
      'Produce motion graphics and short-form social content',
      'Collaborate with the marketing team on campaign creatives',
      'Maintain design consistency across all brand touchpoints',
    ],
    requirements: [
      'Strong portfolio demonstrating branding, digital, and visual design',
      'Proficiency in Figma, Adobe Illustrator, and Photoshop',
      'Understanding of typography, colour theory, and layout',
      'Experience with motion graphics (After Effects / similar) is a plus',
      'Attention to detail and the ability to translate briefs into visuals',
    ],
  },
];

function CareerVideoSection() {
  const panelRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
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

  return (
    <section className="py-10 md:py-14 px-6 relative overflow-x-clip">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        >
          <div
            ref={panelRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            className="relative rounded-3xl overflow-hidden bg-black shadow-2xl border border-black/10 cursor-none"
            style={{ aspectRatio: '16 / 9' }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/career-main-vid.mp4" type="video/mp4" />
            </video>

            {/* Cursor-following button */}
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
                  <button
                    onClick={() => {
                      document.getElementById('open-roles')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="flex items-center gap-2 px-5 py-3 rounded-full bg-white text-black font-bold text-sm shadow-2xl border border-black/10 select-none whitespace-nowrap hover:bg-neutral-100 transition-colors"
                  >
                    Join Us <ArrowRight size={14} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Label badge */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-white/10">
              <Briefcase size={13} className="text-white/70" />
              <span className="text-white/90 text-xs font-medium">Careers at Stibe Labs</span>
            </div>
            <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-black/10 pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function WhyJoinCard({ item, index }: { item: typeof whyJoin[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const rawRY = useMotionValue(0);
  const rawRX = useMotionValue(0);
  const rawY  = useMotionValue(0);

  const rotateY = useSpring(rawRY, { stiffness: 280, damping: 22, mass: 0.4 });
  const rotateX = useSpring(rawRX, { stiffness: 280, damping: 22, mass: 0.4 });
  const liftY   = useSpring(rawY,  { stiffness: 280, damping: 22, mass: 0.4 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width  - 0.5;
    const relY = (e.clientY - rect.top)  / rect.height - 0.5;
    rawRY.set( relX *  7);
    rawRX.set(-relY *  4);
    rawY.set(-10);
  };

  const handleMouseLeave = () => {
    rawRY.set(0);
    rawRX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        y: liftY,
        transformPerspective: 1100,
        transformStyle: 'preserve-3d',
      }}
      className="relative overflow-hidden flex flex-col md:flex-row md:h-[320px] bg-gradient-to-br from-white/70 to-white/30 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.06)] rounded-3xl hover:shadow-[0_32px_72px_rgba(0,0,0,0.13)] hover:border-white/90 transition-[box-shadow,border-color] duration-300 group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-3xl" />

      {/* Text side */}
      <div className="relative z-10 flex-1 p-8 md:p-10 flex flex-col justify-center">
        <div className="w-12 h-12 rounded-2xl bg-black/5 border border-black/[0.07] flex items-center justify-center mb-5 group-hover:bg-black group-hover:scale-105 transition-all duration-300">
          <item.icon size={20} className="text-black group-hover:text-white transition-colors duration-300" />
        </div>
        <h3 className="text-xl md:text-2xl font-semibold text-black mb-4 tracking-tight">{item.title}</h3>
        <ul className="space-y-2.5">
          {item.items.map((point, j) => (
            <li key={j} className="flex items-start gap-3 text-body-premium text-neutral-600 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 flex-shrink-0" />
              {point}
            </li>
          ))}
        </ul>
      </div>

      {/* Image side */}
      <div className="relative w-full md:w-[42%] h-52 md:h-full flex-shrink-0 overflow-hidden rounded-b-3xl md:rounded-b-none md:rounded-r-3xl">
        <img
          src={item.image}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-108"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
      </div>
    </motion.div>
  );
}

function RoleCard({ role, index }: { role: (typeof roles)[0]; index: number }) {
  const [open, setOpen] = useState(false);

  const handleApply = () => {
    const subject = encodeURIComponent(`Application — ${role.title} at Stibe Labs`);
    const body = encodeURIComponent(
      `Hi Stibe Labs,\n\nI am interested in the ${role.title} role.\n\n` +
        `Name: \nEmail: \nPortfolio / LinkedIn: \n\nBrief introduction:\n`
    );
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=Info@stibe.in&su=${subject}&body=${body}`,
      '_blank'
    );
  };

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="glass-panel overflow-hidden"
    >
      {/* Role header — always visible */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 p-7 md:p-9 text-left group"
      >
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-2xl bg-black/5 border border-black/[0.07] flex items-center justify-center flex-shrink-0 group-hover:bg-black group-hover:scale-105 transition-all duration-300 shadow-sm">
            <role.icon size={22} className="text-black group-hover:text-white transition-colors duration-300" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-1">Open Role</p>
            <h3 className="text-xl md:text-2xl font-semibold text-black tracking-tight">{role.title}</h3>
          </div>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="w-9 h-9 rounded-full bg-black/5 border border-black/[0.08] flex items-center justify-center flex-shrink-0"
        >
          <ChevronDown size={18} className="text-neutral-500" />
        </motion.div>
      </button>

      {/* Expandable body */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-7 md:px-9 pb-9 space-y-8 border-t border-black/[0.06] pt-7">
              {/* About */}
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-widest text-neutral-400 mb-3">About</h4>
                <p className="text-body-premium text-neutral-700 leading-relaxed">{role.about}</p>
              </div>

              {/* Responsibilities */}
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-widest text-neutral-400 mb-3">Responsibilities</h4>
                <ul className="space-y-2.5">
                  {role.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-3 text-body-premium text-neutral-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-black mt-2.5 flex-shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-widest text-neutral-400 mb-3">Requirements</h4>
                <ul className="space-y-2.5">
                  {role.requirements.map((r, i) => (
                    <li key={i} className="flex items-start gap-3 text-body-premium text-neutral-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-black mt-2.5 flex-shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Apply Now */}
              <button
                onClick={handleApply}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-black text-white font-semibold text-sm hover:bg-neutral-800 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 group"
              >
                Apply Now
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Careers() {
  return (
    <div className="flex flex-col">
      {/* ── Hero ── */}
      <section className="relative pt-24 pb-14 px-6 overflow-x-clip min-h-[55vh] flex items-center">
        <div className="absolute inset-0 hero-grid" />
        <div className="absolute inset-0 radial-fade" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent/8 rounded-full blur-[120px]" />
        <FloatingIcons count={10} />
        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }}>
            <motion.span variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 border border-black/[0.08] text-neutral-700 text-sm mb-6">
              <Briefcase size={14} /> We're Hiring
            </motion.span>
            <motion.h1 variants={fadeUp} className="heading-page mb-4 text-gradient">
              Careers at Stibe Labs
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-neutral-600 mb-6">
              Build Systems. Drive Growth.
            </motion.p>
            <motion.p variants={fadeUp} className="text-body-premium text-neutral-600 max-w-3xl leading-relaxed">
              At Stibe Labs, we build intelligent digital ecosystems powered by SaaS, AI, and data-driven growth. If you want to build real-world products with AI at the core — this is where you belong.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Career Video ── */}
      <CareerVideoSection />

      {/* ── Overview ── */}
      <section className="py-14 md:py-20 px-6 bg-black/[0.02]">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <h2 className="heading-section text-black mb-8">Overview</h2>
            <p className="text-body-premium text-neutral-600 leading-relaxed mb-8">
              At Stibe Labs, we don't just build software — we build intelligent digital ecosystems powered by:
            </p>
            <ul className="space-y-4">
              {[
                'SaaS platforms (CRM, LMS, ERP, automation)',
                'Artificial Intelligence systems (AI-driven insights & automation)',
                'Digital infrastructure',
                'Data-driven marketing & growth systems',
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="flex items-start gap-3 text-body-premium text-neutral-700 font-semibold"
                >
                  <span className="w-2 h-2 rounded-full bg-black mt-2.5 flex-shrink-0" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Banner — full container width, matching video width */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
            className="mt-12 relative overflow-hidden rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.18)] cursor-default group"
          >
            {/* Banner photo — scales gently on hover */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url('/career-banner.webp')" }}
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/55 group-hover:bg-black/45 transition-colors duration-500" />
            {/* Quote text */}
            <p className="relative z-10 px-8 py-12 md:px-16 md:py-16 text-white text-xl md:text-3xl font-semibold leading-snug tracking-tight text-center">
              "We believe the future belongs to companies that combine&nbsp;
              <span className="italic font-light">technology + AI + growth systems</span>
              &nbsp;into one unified engine."
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Why Join ── */}
      <section className="py-14 md:py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="heading-section text-black mb-12"
          >
            Why Join Stibe Labs
          </motion.h2>

          <div className="flex flex-col gap-6">
            {whyJoin.map((item, i) => (
              <WhyJoinCard key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Open Roles ── */}
      <section id="open-roles" className="py-14 md:py-20 px-6 bg-black/[0.02]">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <h2 className="heading-section text-black mb-3">Open Roles</h2>
            <p className="text-neutral-500 text-base md:text-lg font-medium">Click a role to explore details and apply.</p>
          </motion.div>

          <div className="space-y-5">
            {roles.map((role, i) => (
              <RoleCard key={role.id} role={role} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

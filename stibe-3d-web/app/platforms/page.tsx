'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, UserCheck, CalendarDays, ArrowRight, ChevronRight, BookOpen, BarChart3, MessageSquare, Users, Clock, Building2 } from 'lucide-react';
import Link from 'next/link';
import FloatingIcons from '../../components/FloatingIcons';
import PlatformFeature from '../../components/PlatformFeature';

const fadeUp = { hidden: { y: 30, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.7 } } };

const platforms = [
  {
    icon: Target,
    title: 'Stibe CRM',
    subtitle: 'Intelligent Lead & Conversion Engine',
    overview: 'Stibe CRM is a powerful, AI-enabled customer lifecycle management platform designed to handle high-volume lead environments with precision and automation. It transforms traditional CRM into a real-time conversion system with integrated telephony, WhatsApp, and AI-driven insights.',
    features: [
      { name: 'Lead Management', desc: 'Capture leads from 7 channels; smart duplicate detection; custom drag-and-drop pipelines' },
      { name: 'Communication', desc: 'Cloud telephony (click-to-call, IVR); WhatsApp automation; full conversation tracking' },
      { name: 'Sales & Deals', desc: 'Visual Kanban pipelines; probability forecasting; detailed activity timelines' },
      { name: 'Marketing Integration', desc: 'Real-time Meta Ads syncing (Facebook/Instagram); CPL, CTR, and CPM dashboards' },
    ],
    videoSrc: '/crm-feature.mp4',
    cta: 'Request a Demo',
    id: 'crm'
  },
  {
    icon: BarChart3,
    title: 'Enceladus AI',
    subtitle: 'Real-Time Business Intelligence',
    overview: 'Enceladus is the built-in AI business intelligence engine within Stibe CRM, designed to transform raw business data into actionable insights—instantly. It eliminates the need for manual reporting by acting as a live, intelligent decision-support system.',
    features: [
      { name: 'Natural Language Analytics', desc: 'Ask questions like "How many leads came from Facebook?" to receive instant responses' },
      { name: 'Sales Intelligence', desc: 'Real-time analysis of conversion rates, stage-wise drop-offs, and revenue forecasting' },
      { name: 'Marketing Insights', desc: 'Track CPL, CTR, CPC, and ROI at a campaign level with high-cost alerts' },
      { name: 'Call Analytics', desc: 'Monitor connected rates, duration trends, and WhatsApp engagement' },
    ],
    videoSrc: '/crm-feature.mp4',
    cta: 'See AI in Action',
    id: 'enceladus'
  },
  {
    icon: BookOpen,
    title: 'Stibe LMS',
    subtitle: 'Intelligent Learning & Academic System',
    overview: 'Stibe LMS is a next-generation learning platform designed to replace fragmented tools. It serves as a unified hub for classrooms, exams, and institutional operations, fully integrated with CRM.',
    features: [
      { name: 'Live Classroom System', desc: 'HD video classrooms via self-hosted WebRTC with screen sharing and attendance' },
      { name: 'AI-Powered Monitoring', desc: 'Real-time student attention tracking and behavior monitoring' },
      { name: 'Exams & Academics', desc: 'AI-generated question banks, live timed exams, instant grading, and reports' },
      { name: 'Institutional ERP', desc: 'Comprehensive fee management, HR/payroll systems, and automated timetable generation' },
      { name: 'Automated Notifications', desc: 'WhatsApp and email alerts for class updates and fee reminders' },
    ],
    videoSrc: '/lms-feature.mp4',
    cta: 'Explore the Platform',
    id: 'lms'
  },
  {
    icon: CalendarDays,
    title: 'Stibe Salon Booking',
    subtitle: 'Appointment & service automation',
    overview: 'A specialized platform for salons, spas, and service-based businesses to manage appointments, customers, and operations efficiently with real-time scheduling.',
    features: [
      { name: 'Online Appointment Scheduling', desc: 'Customers can book services in real-time based on availability' },
      { name: 'Calendar & Slot Management', desc: 'Dynamic scheduling for staff, services, and time slots' },
      { name: 'Customer Profile & History', desc: 'Maintain detailed customer records, preferences, and visit history' },
      { name: 'Automated Notifications', desc: 'WhatsApp and SMS alerts for bookings, confirmations, and reminders' },
      { name: 'Staff & Service Management', desc: 'Assign services, manage staff schedules, and track performance' },
      { name: 'Multi-Branch Management', desc: 'Centralized control across multiple locations' },
    ],
    videoSrc: '/salon-feature.mp4',
    cta: 'Book a Demo',
    id: 'salon'
  },
];

export default function Platforms() {
  const [flippedIdx, setFlippedIdx] = useState<number | null>(null);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative pt-24 pb-14 px-6 overflow-x-clip min-h-[50vh] flex items-center">
        <div className="absolute inset-0 hero-grid" />
        <div className="absolute inset-0 radial-fade" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[100px]" />
        <FloatingIcons count={10} />
        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }} className="text-left">
            <motion.span variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 border border-black/[0.08] text-neutral-700 text-sm mb-6">
              <Target size={14} /> Our Products
            </motion.span>
            <motion.h1 variants={fadeUp} className="heading-page mb-6 text-gradient">
              Platforms
            </motion.h1>
            <motion.p variants={fadeUp} className="text-body-premium text-neutral-600 max-w-3xl leading-relaxed">
              Industry-specific digital operating systems that combine acquisition, engagement, service delivery, and analytics into a single, scalable ecosystem.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Platform Showcase */}
      <section className="bg-white px-6">
        <div className="container mx-auto max-w-7xl pt-10 md:pt-14">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ show: { transition: { staggerChildren: 0.15 } } }}
            className="text-left"
          >
            <motion.h2 variants={fadeUp} className="heading-section text-black mb-4 md:mb-6">The Integrated Platform</motion.h2>
            <motion.p variants={fadeUp} className="text-body-premium text-neutral-600 max-w-3xl leading-relaxed mb-8 md:mb-12 text-base md:text-lg">
              Stibe Labs Pvt Ltd delivers a fully integrated platform ecosystem combining CRM, LMS, automation, and communication systems into a unified digital infrastructure. Unlike fragmented tools, the Stibe ecosystem ensures a seamless flow across the entire business and academic lifecycle.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="bg-black/5 border border-black/10 rounded-3xl p-6 md:p-10 mb-8 md:mb-12 transition-[transform,box-shadow,background-color,border-color] duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/5 hover:bg-white hover:border-transparent group cursor-default"
            >
              <h3 className="text-lg md:text-xl font-bold text-black mb-8 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-accent transition-[transform,background-color] duration-300">
                  <Target size={20} className="text-accent group-hover:text-white transition-colors duration-300" />
                </div>
                The Integrated Journey
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {[
                  { title: 'Lead Acquisition', desc: 'Multi-channel capture and tracking.' },
                  { title: 'Sales Pipeline', desc: 'Automated lead nurturing and management.' },
                  { title: 'Demo & Conversion', desc: 'Integrated scheduling and feedback loops.' },
                  { title: 'Learning Delivery', desc: 'Comprehensive academic tools.' },
                  { title: 'Student Lifecycle', desc: 'Long-term engagement and data tracking.' }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: 0.1 * i + 0.3, duration: 0.5, ease: 'easeOut' }}
                    className="flex gap-4 p-4 rounded-2xl hover:bg-black/5 transition-colors duration-300"
                  >
                    <ArrowRight size={18} className="text-accent shrink-0 mt-0.5 group-hover:translate-x-1 transition-transform duration-300" />
                    <div>
                      <div className="font-bold text-black text-sm md:text-base">{item.title}</div>
                      <div className="text-neutral-500 text-xs md:text-sm mt-1 leading-snug">{item.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="mt-8 pt-6 border-t border-black/10 flex items-center gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <p className="text-neutral-700 font-medium text-sm md:text-base"><span className="text-black font-bold">Core Value:</span> A complete Lead ➔ Student ➔ Growth journey powered by intelligent systems.</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <div className="divide-y divide-black/[0.03]">
          {platforms.map((platform, i) => (
            <PlatformFeature
              key={platform.title}
              id={platform.id}
              title={platform.title}
              subtitle={platform.subtitle}
              overview={platform.overview}
              features={platform.features}
              videoSrc={platform.videoSrc}
              ctaText={platform.cta}
              icon={platform.icon}
              reverse={i % 2 !== 0}
            />
          ))}
        </div>
      </section>

      {/* CRM + LMS Integration */}
      <section className="py-10 md:py-14 px-4 md:px-6 bg-white overflow-x-clip relative">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent font-bold text-xs md:text-sm mb-4 md:mb-6 border border-accent/20">
                <Target size={14} /> Ecosystem Sync
              </div>
              <h2 className="heading-section text-black mb-4 md:mb-6">CRM + LMS Integration</h2>
              <p className="text-lg md:text-xl font-medium text-neutral-400 mb-4 md:mb-6 tracking-tight">One Lead. One Journey. Seamless Experience.</p>
              <p className="text-base md:text-lg text-neutral-600 mb-8 md:mb-10 leading-relaxed max-w-xl">
                The core strength of the Stibe ecosystem lies in the seamless data sync between sales and operations. Stibe CRM and LMS work together to create an automated journey from Lead to Lifelong Learner.
              </p>
              
              <div className="flex flex-col gap-5 md:gap-6 mb-8 md:mb-10">
                {[
                  { title: 'Lead Generated', desc: 'Ads, WhatsApp, Call, Form, or Email.' },
                  { title: 'Demo Automation', desc: 'Students register & teachers conduct via LMS.' },
                  { title: 'Feedback & Conversion', desc: 'Agents capture instant feedback in CRM.' },
                  { title: 'Enrollment & Onboarding', desc: 'Student accounts provisioning upon payment.' },
                  { title: 'Learning Lifecycle', desc: 'Classes, attendance, exams, and reports.' }
                ].map((step, i) => (
                  <div key={i} className="flex gap-4 md:gap-5 items-start">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs md:text-sm shrink-0 shadow-lg relative z-10">
                      {i + 1}
                      {i < 4 && <div className="absolute w-[2px] h-[40px] md:h-[48px] bg-black/10 top-8 md:top-10 left-1/2 -translate-x-1/2 -z-10" />}
                    </div>
                    <div className="pt-1 md:pt-2">
                      <p className="text-black font-bold text-sm md:text-base">{step.title}</p>
                      <p className="text-neutral-500 text-xs md:text-sm mt-1">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="font-bold text-black border-l-4 border-accent pl-4 md:pl-5 py-2 text-base md:text-lg">One Platform. Connected Workflows. Better Conversions.</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} className="w-full mt-8 lg:mt-0">
              <div className="bg-[#F8F9FC] p-3 md:p-8 rounded-[32px] md:rounded-[40px] border border-black/5 shadow-2xl relative w-full aspect-square md:aspect-auto flex items-center justify-center group overflow-hidden">
                <img src="/integration-workflow.webp" alt="CRM and LMS Integration Flow" className="rounded-2xl md:rounded-3xl w-full h-auto object-cover max-h-[700px] transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-[32px] md:rounded-[40px] pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Unified Platform Advantage */}
      <section className="py-10 md:py-14 px-4 md:px-6 bg-[#F8F9FC] border-t border-black/5">
        <div className="container mx-auto max-w-7xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} className="text-center mb-12 md:mb-16">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 text-neutral-700 font-bold text-xs md:text-sm mb-4 md:mb-6 border border-black/10">
                Advantage
              </div>
            <h2 className="heading-section text-black mb-3 md:mb-4">Unified Platform Advantage</h2>
            <p className="text-neutral-500 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">One platform. Every role. Every workflow. Fully integrated digital infrastructure replacing fragmented tools.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: Building2, title: 'Infrastructure', old: 'Zoom + Sheets + CRM + WhatsApp', new: 'One unified platform seamlessly connecting everything.' },
              { icon: Target, title: 'Efficiency', old: 'Manual tracking and data entry', new: 'Fully automated workflows accelerating performance.' },
              { icon: BarChart3, title: 'Analytics', old: 'Static reports and manual exports', new: 'Enceladus AI delivering real-time actionable insights.' },
              { icon: Users, title: 'Scalability', old: 'High operational overhead', new: 'Scalable digital infrastructure built for rapid growth.' }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.1 }}
                className="w-full h-full cursor-pointer"
                style={{ perspective: '1000px' }}
                onMouseEnter={() => setFlippedIdx(i)}
                onMouseLeave={() => setFlippedIdx(null)}
              >
                <div 
                  className="w-full h-full grid transition-[transform] duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                  style={{ transformStyle: 'preserve-3d', transform: flippedIdx === i ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                >
                  {/* FRONT TEXT (White) */}
                  <div 
                    className="col-start-1 row-start-1 bg-white p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-sm border border-black/5 w-full h-full flex flex-col" 
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-black/5 rounded-xl md:rounded-2xl flex items-center justify-center mb-6 md:mb-8 border border-black/10 shrink-0">
                      <feature.icon size={24} className="text-black md:w-[26px] md:h-[26px]" />
                    </div>
                    <h3 className="font-bold text-black text-lg md:text-xl mb-3 md:mb-4">{feature.title}</h3>
                    
                    <div className="mb-3 md:mb-4 pt-3 md:pt-4 border-t border-black/5 flex-grow">
                      <div className="text-[10px] md:text-[11px] uppercase tracking-wider font-bold text-black/40 mb-1">Traditional</div>
                      <p className="text-black/40 text-xs md:text-sm line-through leading-tight">{feature.old}</p>
                    </div>
                    
                    <div className="mt-auto">
                      <div className="text-[10px] md:text-[11px] uppercase tracking-wider font-bold text-accent mb-1">Stibe Ecosystem</div>
                      <p className="text-neutral-800 text-sm md:text-base font-medium leading-tight">{feature.new}</p>
                    </div>
                  </div>

                  {/* BACK TEXT (Dark/Industries Gradient) */}
                  <div 
                    className="col-start-1 row-start-1 bg-gradient-to-b from-neutral-900 to-black p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-2xl border border-white/10 w-full h-full overflow-hidden flex flex-col" 
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    {/* Glowing effect inside the dark card */}
                    <div className="absolute left-1/2 top-0 -translate-x-1/2 w-full h-[80%] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06)_0%,transparent_70%)] pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-white/5 rounded-xl md:rounded-2xl flex items-center justify-center mb-6 md:mb-8 border border-white/10 shadow-inner shrink-0">
                        <feature.icon size={24} className="text-white drop-shadow-md md:w-[26px] md:h-[26px]" />
                      </div>
                      <h3 className="font-bold text-white text-lg md:text-xl mb-3 md:mb-4 drop-shadow-xl">{feature.title}</h3>
                      
                      <div className="mb-3 md:mb-4 pt-3 md:pt-4 border-t border-white/10 flex-grow">
                        <div className="text-[10px] md:text-[11px] uppercase tracking-wider font-bold text-white/40 mb-1">Traditional</div>
                        <p className="text-white/40 text-xs md:text-sm line-through leading-tight">{feature.old}</p>
                      </div>
                      
                      <div className="mt-auto">
                        <div className="text-[10px] md:text-[11px] uppercase tracking-wider font-bold text-accent mb-1">Stibe Ecosystem</div>
                        <p className="text-white text-sm md:text-base font-medium leading-tight drop-shadow-md">{feature.new}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

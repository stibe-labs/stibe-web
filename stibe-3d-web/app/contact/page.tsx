'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, ArrowRight } from 'lucide-react';
import { useState, FormEvent } from 'react';
import FloatingIcons from '../../components/FloatingIcons';

const fadeUp = { hidden: { y: 30, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.7 } } };

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [showPhoneOpts, setShowPhoneOpts] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const company = formData.get('company');
    const message = formData.get('message');

    const subject = encodeURIComponent(`New Inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Company: ${company}\n\n` +
      `Message:\n${message}`
    );

    window.location.href = `mailto:Info@stibe.in?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden min-h-[50vh] flex items-center">
        <div className="absolute inset-0 hero-grid" />
        <div className="absolute inset-0 radial-fade" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[100px]" />
        <FloatingIcons count={8} />
        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }}>
            <motion.span variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 border border-black/[0.08] text-neutral-700 text-sm mb-6">
              <Mail size={14} /> Reach Out
            </motion.span>
            <motion.h1 variants={fadeUp} className="heading-page mb-6 text-gradient">
              Contact Us
            </motion.h1>
            <motion.p variants={fadeUp} className="text-body-premium text-neutral-600 max-w-3xl leading-relaxed">
              Ready to build your digital infrastructure? Request a demo or consultation.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-24 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div className="space-y-10">
              <div>
                <h2 className="text-2xl md:text-4xl font-bold mb-8 text-black">Get in Touch</h2>
                <div className="space-y-6">
                  {[
                    { id: 'email', icon: Mail, label: 'Email', value: 'Info@stibe.in', href: 'mailto:Info@stibe.in' },
                    { id: 'phone', icon: Phone, label: 'Phone', value: '+91 73567 65036' },
                    { id: 'location', icon: MapPin, label: 'Location', value: 'palarivattom,Kochi,Kerala,India' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      {item.href ? (
                        <a href={item.href} className="flex items-center gap-5 p-4 -ml-4 rounded-2xl hover:bg-black/5 transition-colors duration-300 group cursor-pointer block">
                          <div className="flex items-center gap-5">
                            <div className="w-14 h-14 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:scale-105 transition-all duration-300 shadow-sm">
                              <item.icon size={22} className="text-accent group-hover:text-white transition-colors duration-300" />
                            </div>
                            <div>
                              <div className="text-neutral-500 text-sm font-medium mb-1">{item.label}</div>
                              <div className="text-black text-lg font-semibold tracking-tight">{item.value}</div>
                            </div>
                          </div>
                        </a>
                      ) : (
                        <div className="flex flex-col">
                          <div 
                            onClick={() => item.id === 'phone' && setShowPhoneOpts(!showPhoneOpts)}
                            className={`flex items-center gap-5 p-4 -ml-4 rounded-2xl hover:bg-black/5 transition-colors duration-300 group ${item.id === 'phone' ? 'cursor-pointer' : 'cursor-default'}`}
                          >
                            <div className="w-14 h-14 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent group-hover:scale-105 transition-all duration-300 shadow-sm">
                              <item.icon size={22} className="text-accent group-hover:text-white transition-colors duration-300" />
                            </div>
                            <div>
                              <div className="text-neutral-500 text-sm font-medium mb-1">{item.label}</div>
                              <div className="text-black text-lg font-semibold tracking-tight">{item.value}</div>
                            </div>
                          </div>
                          {item.id === 'phone' && showPhoneOpts && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="flex gap-3 pl-16 pr-4 pb-2 -mt-2 overflow-hidden">
                              <a href="tel:+917356765036" className="flex items-center justify-center flex-1 py-2.5 rounded-xl bg-black text-white text-sm font-semibold hover:bg-neutral-800 transition-all shadow-md">
                                Call
                              </a>
                              <a href="https://wa.me/917356765036" target="_blank" rel="noreferrer" className="flex items-center justify-center flex-1 py-2.5 rounded-xl bg-[#25D366] text-white text-sm font-semibold hover:bg-[#1ebd5a] transition-all shadow-md">
                                WhatsApp
                              </a>
                            </motion.div>
                          )}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="relative overflow-hidden p-8 md:p-10 group bg-gradient-to-br from-white/70 to-white/30 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.06)] rounded-3xl hover:border-white hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <h3 className="relative z-10 text-2xl font-bold mb-6 text-black tracking-tight">What to Expect</h3>
                <ul className="space-y-4">
                  {[
                    'Initial consultation to understand your requirements',
                    'Custom solution proposal and roadmap',
                    'Platform demo tailored to your industry',
                    'Transparent timeline and pricing',
                  ].map((item, i) => (
                    <li key={i} className="relative z-10 text-neutral-700 text-base flex items-start gap-3 group-hover:text-black transition-colors duration-300 font-medium">
                      <span className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0 shadow-[0_0_8px_rgba(var(--accent),0.5)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-8 md:p-10 hover:shadow-2xl hover:border-black/20 transition-all duration-500"
            >
              {submitted ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
                    <Send size={24} className="text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-black mb-3">Redirecting...</h3>
                  <p className="text-neutral-600">Your email client should open shortly with your message.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-2xl font-bold text-black mb-2">Request Demo</h3>
                  <p className="text-neutral-500 text-sm mb-6">Fill in the form and our team will reach out.</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-neutral-700 font-medium text-sm mb-2 block">Name</label>
                      <input name="name" type="text" required className="w-full bg-black/5 border border-black/[0.08] rounded-xl px-4 py-3.5 text-black placeholder-black/30 focus:outline-none focus:border-accent/50 focus:bg-white focus:ring-4 focus:ring-accent/10 transition-all" placeholder="Your name" />
                    </div>
                    <div>
                      <label className="text-neutral-700 font-medium text-sm mb-2 block">Email</label>
                      <input name="email" type="email" required className="w-full bg-black/5 border border-black/[0.08] rounded-xl px-4 py-3.5 text-black placeholder-black/30 focus:outline-none focus:border-accent/50 focus:bg-white focus:ring-4 focus:ring-accent/10 transition-all" placeholder="you@company.com" />
                    </div>
                  </div>
                  <div>
                    <label className="text-neutral-700 font-medium text-sm mb-2 block">Company</label>
                    <input name="company" type="text" className="w-full bg-black/5 border border-black/[0.08] rounded-xl px-4 py-3.5 text-black placeholder-black/30 focus:outline-none focus:border-accent/50 focus:bg-white focus:ring-4 focus:ring-accent/10 transition-all" placeholder="Company name" />
                  </div>
                  <div>
                    <label className="text-neutral-700 font-medium text-sm mb-2 block">Message</label>
                    <textarea name="message" rows={5} required className="w-full bg-black/5 border border-black/[0.08] rounded-xl px-4 py-3.5 text-black placeholder-black/30 focus:outline-none focus:border-accent/50 focus:bg-white focus:ring-4 focus:ring-accent/10 transition-all resize-none" placeholder="Tell us about your project..." />
                  </div>
                  <button type="submit" className="w-full py-4 rounded-xl bg-accent text-white font-semibold hover:bg-accent/90 shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group">
                    Send Message <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

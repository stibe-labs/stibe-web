'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const footerLinks = {
  Company: [
    { name: 'About Us', path: '/about' },
    { name: 'Business Model', path: '/business-model' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' },
  ],
  Solutions: [
    { name: 'Enterprise Software', path: '/solutions/software' },
    { name: 'AI & Automation', path: '/solutions' },
    { name: 'Digital Growth', path: '/solutions/digital-marketing' },
  ],
  Platforms: [
    { name: 'Stibe CRM', path: '/platforms' },
    { name: 'Stibe LMS', path: '/platforms' },
    { name: 'Salon Booking', path: '/platforms' },
  ],
  Industries: [
    { name: 'Education', path: '/industries' },
    { name: 'Manufacturing', path: '/industries' },
    { name: 'Retail', path: '/industries' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-[#fafafa] pt-20 pb-8">
      <div className="container mx-auto px-6">
        {/* Big CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-gradient">
            Experience Liftoff
          </h2>
          <p className="text-neutral-600 text-lg mb-8 max-w-xl mx-auto">
            Ready to build your intelligent digital ecosystem?
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 rounded-full bg-accent text-white font-semibold text-base hover:bg-accent/90 transition-all shadow-glow"
          >
            Get Started
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 mb-16 items-start">
          <div className="col-span-2 md:col-span-4 lg:col-span-2 flex flex-col">
            <Link href="/" className="block">
              <div className="overflow-hidden" style={{ marginLeft: '-12px', marginTop: '-14px', marginBottom: '-18px', marginRight: '-30px' }}>
                <Image
                  src="/logo.png"
                  alt="Stibe Labs Logo"
                  width={320}
                  height={90}
                  className="object-contain w-full max-w-[240px]"
                  priority
                />
              </div>
            </Link>
            <p className="text-neutral-500 text-sm leading-relaxed max-w-[360px] mt-5">
              Engineering Intelligent Digital Ecosystems. AI-powered software, automation platforms, and SaaS systems.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="flex flex-col gap-3">
              <h4 className="text-neutral-700 font-semibold text-sm mb-1">{title}</h4>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.path} className="text-neutral-500 hover:text-black transition-colors text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-black/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-black/30 text-sm">
            &copy; {new Date().getFullYear()} Stibe Labs Pvt Ltd. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-black/30 hover:text-neutral-700 transition-colors text-sm">Privacy</Link>
            <Link href="#" className="text-black/30 hover:text-neutral-700 transition-colors text-sm">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

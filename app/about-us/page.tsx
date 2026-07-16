'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  Star,
  Car as CarIcon,
  Users,
  Handshake,
  ShieldCheck,
  Building2,
  Sparkles,
  BriefcaseBusiness,
  BadgeCheck,
  FileSearch,
  MessageSquareHeart,
} from 'lucide-react';
import Reveal from '@/components/Reveal';

const stats = [
  { icon: Star, value: '35+', label: 'Years in Business' },
  { icon: CarIcon, value: '50,000+', label: 'Cars Sold' },
  { icon: Users, value: '20+', label: 'Expert Team' },
  { icon: Handshake, value: '1', label: 'Commitment to You' },
];

const journey = [
  {
    icon: ShieldCheck,
    year: '1990',
    title: 'Trust-led Foundation',
    desc: 'Gautam Modi Group was founded with a vision to serve customers with integrity, transparency and trust.',
    note: 'Legacy begins',
    image:
      'https://thinkarz.com/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-03-at-6.13.41-PM-1024x768.jpeg',
  },
  {
    icon: Building2,
    year: '2010',
    title: 'Retail Network Growth',
    desc: 'Expanded across automotive retail with multiple brands and a customer-first approach.',
    note: 'Multi-brand experience',
    image:
      'https://thinkarz.com/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-03-at-6.02.15-PM-1024x768.jpeg',
  },
  {
    icon: Sparkles,
    year: '2020',
    title: 'Thinkarz Launched',
    desc: 'Launched Thinkarz to revolutionize the pre-owned car experience with quality assurance and complete transparency.',
    note: 'Pre-owned focus',
    image:
      'https://thinkarz.com/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-03-at-6.04.01-PM-1-768x1024.jpeg',
  },
];

const leadership = [
  {
    icon: BriefcaseBusiness,
    area: 'Founder Office',
    role: 'Strategic Direction',
    desc: 'Sets the customer-first standards, pricing discipline, and long-term growth roadmap.',
  },
  {
    icon: BadgeCheck,
    area: 'Retail Operations',
    role: 'Inventory & Delivery',
    desc: 'Manages sourcing, showroom readiness, test drives, and vehicle handover quality.',
  },
  {
    icon: FileSearch,
    area: 'Quality Team',
    role: 'Inspection & Documents',
    desc: 'Owns verification, inspection checkpoints, service history, and paperwork accuracy.',
  },
  {
    icon: MessageSquareHeart,
    area: 'Customer Desk',
    role: 'Support & Experience',
    desc: 'Keeps buyers and sellers informed from first enquiry to post-delivery support.',
  },
];

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [lineTop, setLineTop] = useState(0);
  const [lineHeight, setLineHeight] = useState(0);
  const [activeDots, setActiveDots] = useState<boolean[]>([]);

  useEffect(() => {
    function handleScroll() {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      const dots = containerRef.current.querySelectorAll('.timeline-dot');
      if (dots.length >= 2) {
        const firstDotRect = dots[0].getBoundingClientRect();
        const lastDotRect = dots[dots.length - 1].getBoundingClientRect();
        
        const top = firstDotRect.top - rect.top + firstDotRect.height / 2;
        const bottom = lastDotRect.top - rect.top + lastDotRect.height / 2;
        
        setLineTop(top);
        setLineHeight(bottom - top);
        
        const triggerY = viewportHeight * 0.6; 
        
        const totalScrollDist = lastDotRect.top - firstDotRect.top;
        const currentScrollDist = triggerY - firstDotRect.top;
        
        const progress = totalScrollDist > 0 ? currentScrollDist / totalScrollDist : 0;
        setScrollProgress(Math.max(0, Math.min(1, progress)));

        const activeStates = Array.from(dots).map(dot => {
          const dotRect = dot.getBoundingClientRect();
          return dotRect.top <= triggerY;
        });
        setActiveDots(activeStates);
      }
    }

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    const timer = setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <section className="py-16 sm:py-20">
        <div className="container-page grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="section-eyebrow">About Thinkarz</span>
            <h1 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
              Driven by Trust.
              <br />
              Built for You.
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-slate-600">
              Thinkarz is the pre-owned car venture of Gautam Modi Group, built on decades of
              trust, customer first approach, and a passion for mobility.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              We are committed to delivering quality cars, transparent deals, and a seamless
              ownership experience.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="https://thinkarz.com/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-03-at-6.13.41-PM-1024x768.jpeg"
              alt="Thinkarz showroom"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="container-page">
          <h2 className="mb-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">Our Journey</h2>
          <span className="mb-16 block h-1 w-12 bg-brand-red" />
          <div ref={containerRef} className="relative mx-auto max-w-5xl">
            {/* Background Track Line */}
            <div 
              className="absolute left-0 w-px bg-slate-200 md:left-1/2 md:-translate-x-1/2" 
              style={{ top: `${lineTop}px`, height: `${lineHeight}px` }}
            />
            
            {/* Animated Active Red Line */}
            <div 
              className="absolute left-0 w-px bg-brand-red md:left-1/2 md:-translate-x-1/2 transition-all duration-100 ease-out" 
              style={{ top: `${lineTop}px`, height: `${scrollProgress * lineHeight}px` }}
            />

            {journey.map(({ icon: Icon, year, title, desc, note, image }, i) => (
              <Reveal
                key={year}
                delay={i * 150}
                className={`relative grid grid-cols-1 items-center gap-6 pl-10 md:grid-cols-2 md:gap-16 md:pl-0 ${
                  i === journey.length - 1 ? '' : 'pb-14 md:pb-20'
                }`}
              >
                {/* Timeline dot */}
                <span className={`timeline-dot absolute left-0 top-1/2 -translate-y-1/2 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white shadow ring-1 transition-all duration-300 md:left-1/2 ${
                  activeDots[i]
                    ? 'bg-brand-red ring-brand-red/30 scale-110'
                    : 'bg-slate-300 ring-slate-200/50'
                }`} />

                {i % 2 === 0 ? (
                  <>
                    <div>
                      <span className="block text-6xl font-extrabold leading-none text-slate-200 sm:text-7xl">
                        {year}
                      </span>
                      <span className="mb-3 mt-2 block h-1 w-10 bg-brand-red" />
                      <h3 className="text-xl font-extrabold text-slate-900">{title}</h3>
                      <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600">{desc}</p>
                      <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-brand-red">
                        <Icon size={16} />
                        {note}
                      </div>
                    </div>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md md:order-last">
                      <Image src={image} alt={title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 480px" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md md:order-first">
                      <Image src={image} alt={title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 480px" />
                    </div>
                    <div className="md:text-right">
                      <span className="block text-6xl font-extrabold leading-none text-slate-200 sm:text-7xl">
                        {year}
                      </span>
                      <span className="mb-3 mt-2 block h-1 w-10 bg-brand-red md:ml-auto" />
                      <h3 className="text-xl font-extrabold text-slate-900">{title}</h3>
                      <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600 md:ml-auto">{desc}</p>
                      <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-brand-red">
                        <Icon size={16} />
                        {note}
                      </div>
                    </div>
                  </>
                )}
              </Reveal>
            ))}
          </div>

          {/* Stats */}
          <Reveal className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:grid-cols-4">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
                  <Icon size={22} />
                </div>
                <p className="text-2xl font-extrabold text-slate-900">{value}</p>
                <p className="text-xs text-slate-500">{label}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="container-page">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="mb-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
                Our Leadership Team
              </h2>
              <span className="block h-1 w-12 bg-brand-red" />
            </div>
            <p className="max-w-lg text-sm leading-relaxed text-slate-600">
              The team is structured around the moments that matter most: trusted sourcing,
              careful inspection, clear paperwork, and responsive customer support.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {leadership.map(({ icon: Icon, area, role, desc }, i) => (
              <Reveal
                key={area}
                delay={i * 90}
                className="rounded-xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/30 hover:shadow-lg"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand-blueLight text-brand-blue">
                  <Icon size={24} />
                </div>
                <p className="text-xs font-bold uppercase tracking-wide text-brand-red">{area}</p>
                <h3 className="mt-1 text-base font-extrabold text-slate-900">{role}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

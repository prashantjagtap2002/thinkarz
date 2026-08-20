'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Facebook, Instagram, Youtube, Linkedin, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { contactInfo } from '@/lib/content';

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about-us' },
  { name: 'Pre Owned Cars', href: '/pre-owned-cars' },
  { name: 'Sell Your Car', href: '/sell-your-car' },
  { name: 'Book a Test Drive', href: '/book-a-test-drive' },
  { name: 'Contact Us', href: '/contact-us' },
];

const services = [
  { name: 'Buy a Car', href: '/pre-owned-cars' },
  { name: 'Sell Your Car', href: '/sell-your-car' },
];

const company = [
  { name: 'About Gautam Modi Group', href: '/about-us' },
  { name: 'Terms & Conditions', href: '/terms-and-conditions' },
  { name: 'Privacy Policy', href: '/privacy-policy' },
];

export default function Footer() {
  const pathname = usePathname();

  function handleHomeClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  return (
    <footer className="bg-brand-navy text-slate-300">

      <div className="container-page grid grid-cols-1 gap-y-10 py-14 text-center sm:text-left sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 sm:gap-x-6">
        <div className="lg:col-span-1 flex flex-col items-center sm:items-start">
          <Link href="/" className="inline-block">
            <span className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
              THIN<span className="text-brand-red text-[1.18em]">K</span>ARZ
            </span>
          </Link>
          <p className="mt-1 text-[11px] font-semibold tracking-wide text-slate-400">
            YOUR ULTIMATE CAR DESTINATION
          </p>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            THINKARZ is the pre-owned car venture of Gautam Modi Group, built on decades of trust,
            customer first approach, and a passion for mobility.
          </p>
          <div className="mt-5 flex justify-center sm:justify-start gap-3">
            {[
              { icon: Facebook, href: 'https://www.facebook.com/Thinkarz/', label: 'Facebook' },
              { icon: Instagram, href: 'https://www.instagram.com/thinkarz/reels/', label: 'Instagram' },
              { icon: Linkedin, href: 'https://www.linkedin.com/company/thinkarz/', label: 'LinkedIn' },
            ].map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-600 text-slate-300 transition-colors hover:border-brand-red hover:text-brand-red" aria-label={label}>
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold text-white sm:text-base">Quick Links</h4>
          <ul className="space-y-2.5">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={link.name === 'Home' ? handleHomeClick : undefined}
                  className="text-xs text-slate-400 hover:text-brand-red sm:text-sm"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold text-white sm:text-base">Our Services</h4>
          <ul className="space-y-2.5">
            {services.map((service) => (
              <li key={service.name}>
                <Link href={service.href} className="text-xs text-slate-400 hover:text-brand-red sm:text-sm">
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold text-white sm:text-base">Company</h4>
          <ul className="space-y-2.5">
            {company.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="text-xs text-slate-400 hover:text-brand-red sm:text-sm">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold text-white sm:text-base">Contact Us</h4>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex items-start justify-center sm:justify-start gap-2.5 text-left">
              <MapPin size={16} className="mt-1 shrink-0 text-brand-red" />
              <span className="min-w-0 break-words">{contactInfo.address.join(', ')}</span>
            </li>
            <li className="flex items-center justify-center sm:justify-start gap-2.5 text-left">
              <Phone size={16} className="shrink-0 text-brand-red" />
              <a href={`tel:${contactInfo.phone}`} className="min-w-0 break-words hover:text-white transition-colors">
                {contactInfo.phone}
              </a>
            </li>
            <li className="flex items-center justify-center sm:justify-start gap-2.5 text-left">
              <Mail size={16} className="shrink-0 text-brand-red" />
              <a href={`mailto:${contactInfo.email}`} className="min-w-0 break-words hover:text-white transition-colors">
                {contactInfo.email}
              </a>
            </li>
            <li className="flex items-start justify-center sm:justify-start gap-2.5 text-left">
              <Clock size={16} className="mt-1 shrink-0 text-brand-red" />
              <span className="min-w-0 break-words">
                {contactInfo.hours.map((item, idx) => (
                  <span key={idx} className="block">{item}</span>
                ))}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-700/60 py-5">
        <p className="container-page text-center text-xs text-slate-500">
          © 2026 THINKARZ. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

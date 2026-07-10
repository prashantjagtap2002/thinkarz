import Link from 'next/link';
import { Facebook, Instagram, Youtube, Linkedin, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { contactInfo } from '@/lib/content';

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about-us' },
  { name: 'Pre Owned Cars', href: '/pre-owned-cars' },
  { name: 'Sell Your Car', href: '/sell-your-car' },
  { name: 'Book a Test Drive', href: '/book-a-test-drive' },
  { name: 'Blogs', href: '/blogs' },
  { name: 'Contact Us', href: '/contact-us' },
];

const services = [
  'Buy a Car',
  'Sell Your Car',
  'Car Inspection',
  'Finance Options',
  'Extended Warranty',
  'Roadside Assistance',
];

const company = [
  { name: 'About Gautam Modi Group', href: '/about-us' },
  { name: 'Careers', href: '#' },
  { name: 'Terms & Conditions', href: '#' },
  { name: 'Privacy Policy', href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-slate-300">
      <div className="container-page grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-1 sm:col-span-2">
          <span className="text-2xl font-extrabold tracking-tight text-white">
            THIN<span className="text-brand-red">K</span>ARZ
          </span>
          <p className="mt-1 text-[10px] font-semibold tracking-wide text-slate-400">
            YOUR ULTIMATE CAR DESTINATION
          </p>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            ThinkArz is the pre-owned car venture of Gautam Modi Group, built on decades of
            trust, customer first approach, and a passion for mobility.
          </p>
          <div className="mt-5 flex gap-3">
            {[Facebook, Instagram, Youtube, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-600 text-slate-300 transition-colors hover:border-brand-red hover:text-brand-red"
                aria-label="social link"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold text-white">Quick Links</h4>
          <ul className="space-y-2.5">
            {quickLinks.map((l) => (
              <li key={l.name}>
                <Link href={l.href} className="text-sm text-slate-400 hover:text-brand-red">
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold text-white">Our Services</h4>
          <ul className="space-y-2.5">
            {services.map((s) => (
              <li key={s} className="text-sm text-slate-400">
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold text-white">Company</h4>
          <ul className="space-y-2.5">
            {company.map((c) => (
              <li key={c.name}>
                <Link href={c.href} className="text-sm text-slate-400 hover:text-brand-red">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold text-white">Contact Us</h4>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex gap-2.5">
              <MapPin size={16} className="mt-0.5 shrink-0 text-brand-red" />
              <span>{contactInfo.address.join(' ')}</span>
            </li>
            <li className="flex gap-2.5">
              <Phone size={16} className="mt-0.5 shrink-0 text-brand-red" />
              <span>{contactInfo.phone}</span>
            </li>
            <li className="flex gap-2.5">
              <Mail size={16} className="mt-0.5 shrink-0 text-brand-red" />
              <span>{contactInfo.email}</span>
            </li>
            <li className="flex gap-2.5">
              <Clock size={16} className="mt-0.5 shrink-0 text-brand-red" />
              <span>
                {contactInfo.hours[0]}
                <br />
                {contactInfo.hours[1]}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-700/60 py-5">
        <p className="container-page text-center text-xs text-slate-500">
          © 2024 ThinkArz. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

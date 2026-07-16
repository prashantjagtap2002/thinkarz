import Link from 'next/link';
import { Facebook, Instagram, Youtube, Linkedin, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { contactInfo } from '@/lib/content';
import NewsletterSignup from './NewsletterSignup';

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
  { name: 'Buy a Car', href: '/pre-owned-cars' },
  { name: 'Sell Your Car', href: '/sell-your-car' },
  { name: 'Car Inspection', href: '/sell-your-car' },
  { name: 'Finance Options', href: '/contact-us' },
];

const company = [
  { name: 'About Gautam Modi Group', href: '/about-us' },
  { name: 'Careers', href: '#' },
  { name: 'Terms & Conditions', href: '/terms-and-conditions' },
  { name: 'Privacy Policy', href: '/privacy-policy' },
];

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-slate-300">
      <div className="border-b border-slate-700/60 py-10">
        <div className="container-page flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div>
            <h3 className="text-lg font-bold text-white">Never Miss an Update</h3>
            <p className="mt-1 max-w-md text-sm text-slate-400">
              Get the latest car deals, tips and offers from Thinkarz straight to your inbox.
            </p>
          </div>
          <div className="w-full lg:w-80">
            <NewsletterSignup />
          </div>
        </div>
      </div>

      <div className="container-page grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="sm:col-span-2 lg:col-span-1">
          <span className="text-2xl font-extrabold tracking-tight text-white">
            Thin<span className="text-brand-red">k</span>arz
          </span>
          <p className="mt-1 text-[10px] font-semibold tracking-wide text-slate-400">
            YOUR ULTIMATE CAR DESTINATION
          </p>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            Thinkarz is the pre-owned car venture of Gautam Modi Group, built on decades of trust,
            customer first approach, and a passion for mobility.
          </p>
          <div className="mt-5 flex gap-3">
            {[Facebook, Instagram, Youtube, Linkedin].map((Icon, index) => (
              <a
                key={index}
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
            {quickLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-sm text-slate-400 hover:text-brand-red">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold text-white">Our Services</h4>
          <ul className="space-y-2.5">
            {services.map((service) => (
              <li key={service.name}>
                <Link href={service.href} className="text-sm text-slate-400 hover:text-brand-red">
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold text-white">Company</h4>
          <ul className="space-y-2.5">
            {company.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="text-sm text-slate-400 hover:text-brand-red">
                  {item.name}
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
          © 2024 Thinkarz. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

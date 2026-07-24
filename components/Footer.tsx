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
  { name: 'Buy a Car', href: '/pre-owned-cars' },
  { name: 'Sell Your Car', href: '/sell-your-car' },
  { name: 'Car Inspection', href: '/sell-your-car' },
  { name: 'Finance Options', href: '/contact-us' },
];

const company = [
  { name: 'About Gautam Modi Group', href: '/about-us' },
  { name: 'Terms & Conditions', href: '/terms-and-conditions' },
  { name: 'Privacy Policy', href: '/privacy-policy' },
];

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-slate-300">

      <div className="container-page grid grid-cols-2 gap-x-6 gap-y-10 py-14 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <div className="col-span-2 sm:col-span-2 md:col-span-3 lg:col-span-1">
          <span className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
            THIN<span className="text-brand-red text-[1.18em]">K</span>ARZ
          </span>
          <p className="mt-1 text-[11px] font-semibold tracking-wide text-slate-400">
            YOUR ULTIMATE CAR DESTINATION
          </p>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">
            Thinkarz is the pre-owned car venture of Gautam Modi Group, built on decades of trust,
            customer first approach, and a passion for mobility.
          </p>
          <div className="mt-5 flex gap-3">
            {[
              { icon: Facebook, href: '#', label: 'Facebook' },
              { icon: Instagram, href: '#', label: 'Instagram' },
              { icon: Youtube, href: '#', label: 'YouTube' },
              { icon: Linkedin, href: '#', label: 'LinkedIn' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-600 text-slate-300 transition-colors hover:border-brand-red hover:text-brand-red"
                aria-label={label}
              >
                <Icon size={16} />
              </a>
            ))}
            <a
              href={`https://wa.me/${contactInfo.whatsappPhone}?text=${encodeURIComponent('Hello.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-600 text-slate-300 transition-colors hover:border-green-500 hover:text-green-500"
              aria-label="Chat on WhatsApp"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 448"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path d="M380.9 65.1C339 23.1 282.9 0 224 0 101.7 0 1.9 99.8 1.9 222.1c0 39.1 10.2 77.3 29.6 111L0 448l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 222.1-99.8 222.1-222.1-.1-59-23.2-114.6-65.1-155.9zM224 408.1h-.1c-33.1 0-65.6-8.9-93.9-25.7l-6.7-4-69.8 18.3 18.6-68.1-4.4-7c-18.5-29.4-28.2-63.2-28.2-98.4 0-102 83.3-185.3 185.4-185.3 49.5 0 96 19.3 131 54.2s54.2 81.5 54.2 131c0 101.9-83.3 185-185.1 185zM308.9 269.2c-4.7-2.3-27.6-13.6-31.8-15.2s-7.4-2.3-10.5 2.3c-3.1 4.7-12.1 15.2-14.8 18.4-2.7 3.1-5.5 3.5-10.1 1.2s-19.8-7.3-37.7-23.3c-14-12.4-23.4-27.8-26.1-32.5s-.3-7.3 2.1-9.6c2.1-2.1 4.7-5.5 7-8.2 2.3-2.7 3.1-4.7 4.7-7.8s.8-5.8-.4-8.2c-1.2-2.3-10.5-25.3-14.4-34.6-3.8-9.1-7.6-7.9-10.5-8-2.7-.2-5.8-.2-8.9-.2-3.1 0-8.2 1.2-12.4 5.8-4.3 4.7-16.3 16-16.3 38.9s16.7 45.1 19.1 48.2c2.3 3.1 33 50.4 79.9 70.7 11.2 4.8 19.9 7.7 26.7 9.9 11.2 3.6 21.4 3.1 29.5 1.9 9-1.4 27.6-11.3 31.5-22.2s3.9-20.3 2.7-22.2c-1.1-2-4.4-3.1-9.1-5.5z" />
              </svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold text-white sm:text-base">Quick Links</h4>
          <ul className="space-y-2.5">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-xs text-slate-400 hover:text-brand-red sm:text-sm">
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
            <li className="flex gap-2.5">
              <MapPin size={16} className="mt-0.5 shrink-0 text-brand-red" />
              <span className="min-w-0 break-words">{contactInfo.address.join(', ')}</span>
            </li>
            <li className="flex gap-2.5">
              <Phone size={16} className="mt-0.5 shrink-0 text-brand-red" />
              <span className="min-w-0 break-words">{contactInfo.phone}</span>
            </li>
            <li className="flex gap-2.5">
              <Mail size={16} className="mt-0.5 shrink-0 text-brand-red" />
              <span className="min-w-0 break-words">{contactInfo.email}</span>
            </li>
            <li className="flex gap-2.5">
              <Clock size={16} className="mt-0.5 shrink-0 text-brand-red" />
              <span className="min-w-0 break-words">
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
          © 2026 Thinkarz. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

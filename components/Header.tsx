'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';
import Logo from './Logo';
import { navLinks, contactInfo } from '@/lib/content';

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4 sm:h-20">
        <Logo />

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => {
            const active = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  active
                    ? 'border-b-2 border-brand-red text-brand-red'
                    : 'text-slate-700 hover:text-brand-red'
                } pb-1`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${contactInfo.landlinePhone}`}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-red text-white transition-[transform,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-[#cc181f] hover:shadow-md sm:h-10 sm:w-10"
            aria-label="Call THINKARZ"
          >
            <Phone size={18} />
          </a>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-300 transition-[transform,border-color,background-color,color] duration-300 hover:-translate-y-0.5 hover:border-brand-red hover:text-brand-red lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <nav
            id="mobile-menu"
            className="relative z-10 flex h-full flex-col bg-white shadow-xl"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <span className="text-lg font-extrabold text-slate-900">Menu</span>
              <button
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>
            <div className="flex flex-1 flex-col justify-center px-6">
              {navLinks.map((link) => {
                const active = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-lg px-4 py-4 text-lg font-medium transition-colors ${
                      active
                        ? 'bg-brand-blueLight text-brand-red'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
            <div className="border-t border-slate-100 px-6 py-6">
              <a
                href={`tel:${contactInfo.landlinePhone}`}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-red py-3.5 text-sm font-semibold text-white"
              >
                <Phone size={16} />
                Call Us: {contactInfo.landlinePhone.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3')}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

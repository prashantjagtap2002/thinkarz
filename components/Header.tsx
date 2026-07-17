'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';
import Logo from './Logo';
import { navLinks } from '@/lib/content';

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4 sm:h-20">
        <Logo />

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => {
            const active = pathname === link.href;
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
            href="tel:02242125678"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-blue text-white transition-[transform,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-brand-red hover:shadow-md sm:h-10 sm:w-10"
            aria-label="Call Thinkarz"
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
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <nav
        id="mobile-menu"
        className={`menu-panel relative z-50 border-t border-slate-200 bg-white lg:hidden${open ? ' is-open' : ''}`}
      >
        <div>
          <div className="container-page flex flex-col gap-1 py-3">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-md px-3 py-2.5 text-sm font-medium transition-[transform,background-color,color] duration-300 hover:translate-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red ${
                    active ? 'bg-brand-blueLight text-brand-red' : 'text-slate-700'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </header>
  );
}

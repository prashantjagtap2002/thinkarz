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
      <div className="container-page flex h-20 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-6 xl:flex">
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
            className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-blue text-white transition-[transform,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-brand-red hover:shadow-md sm:flex"
            aria-label="Call ThinkArz"
          >
            <Phone size={18} />
          </a>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-300 transition-[transform,border-color,background-color,color] duration-300 hover:-translate-y-0.5 hover:border-brand-red hover:text-brand-red xl:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <nav
        className={`menu-panel border-t border-slate-200 bg-white xl:hidden${open ? ' is-open' : ''}`}
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
                  className={`rounded-md px-3 py-2.5 text-sm font-medium transition-[transform,background-color,color] duration-300 hover:translate-x-1 ${
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

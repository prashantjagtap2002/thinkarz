'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';
import Logo from './Logo';
import { navLinks, contactInfo } from '@/lib/content';

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

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

      {open && mounted && createPortal(
        <div className="fixed inset-0 z-[99999] lg:hidden animate-fade-in">
          {/* Backdrop Overlay */}
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Top-Aligned Mobile Menu Container */}
          <div className="relative z-10 w-full bg-white shadow-2xl border-b border-slate-200 max-h-[85vh] overflow-y-auto">
            {/* Top Header Bar */}
            <div className="flex h-16 sm:h-20 items-center justify-between px-6 border-b border-slate-100 bg-white">
              <Logo />
              <button
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-brand-red hover:text-white transition-colors"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Menu Nav Links Placed at the Top */}
            <nav id="mobile-menu" className="flex flex-col p-4 gap-1 text-center">
              {navLinks.map((link) => {
                const active = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-center rounded-xl px-4 py-3.5 text-center text-base font-bold transition-all ${
                      active
                        ? 'bg-red-50 text-brand-red font-extrabold'
                        : 'text-slate-800 hover:bg-slate-50 hover:text-brand-red'
                    }`}
                  >
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
}

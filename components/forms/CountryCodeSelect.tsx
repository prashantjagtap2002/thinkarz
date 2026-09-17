'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { countryCodes } from '@/lib/countryCodes';
import { ChevronDown } from 'lucide-react';

interface CountryCodeSelectProps {
  value: string;
  onChange: (dial: string) => void;
}

const DROPDOWN_WIDTH = 210;
const MAX_DROPDOWN_HEIGHT = 280;
const MIN_DROPDOWN_HEIGHT = 160;
const VIEWPORT_MARGIN = 8;

type Placement = {
  top: number;
  left: number;
  width: number;
  maxHeight: number;
};

export default function CountryCodeSelect({ value, onChange }: CountryCodeSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState<string>(() => {
    const match = countryCodes.find((c) => c.dial === value) || countryCodes.find((c) => c.code === 'IN')!;
    return match.code;
  });
  const [placement, setPlacement] = useState<Placement | null>(null);
  const [mounted, setMounted] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const match = countryCodes.find((c) => c.code === selectedCode && c.dial === value);
    if (!match) {
      const fallback = countryCodes.find((c) => c.dial === value) || countryCodes.find((c) => c.code === 'IN')!;
      setSelectedCode(fallback.code);
    }
  }, [value, selectedCode]);

  const currentCountry =
    countryCodes.find((c) => c.code === selectedCode && c.dial === value) ||
    countryCodes.find((c) => c.dial === value) ||
    countryCodes.find((c) => c.code === 'IN')!;

  const sortedCountries = [...countryCodes].sort((a, b) => a.code.localeCompare(b.code));

  /**
   * Viewport-relative placement for a `position: fixed` menu. Opens downward
   * when there is room and flips above the field when there is not: on a phone
   * the number field usually sits low enough that a downward-only menu landed
   * off-screen entirely.
   */
  const measure = useCallback((): Placement | null => {
    const button = buttonRef.current;
    if (!button) return null;

    const rect = button.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom - VIEWPORT_MARGIN;
    const spaceAbove = rect.top - VIEWPORT_MARGIN;
    const openUpward = spaceBelow < MIN_DROPDOWN_HEIGHT && spaceAbove > spaceBelow;

    const available = openUpward ? spaceAbove : spaceBelow;
    const maxHeight = Math.max(MIN_DROPDOWN_HEIGHT, Math.min(MAX_DROPDOWN_HEIGHT, available));

    const width = Math.min(DROPDOWN_WIDTH, window.innerWidth - VIEWPORT_MARGIN * 2);
    // Keep the menu inside the viewport on narrow screens.
    const left = Math.min(
      Math.max(VIEWPORT_MARGIN, rect.left),
      window.innerWidth - width - VIEWPORT_MARGIN,
    );

    return {
      top: openUpward ? Math.max(VIEWPORT_MARGIN, rect.top - maxHeight - 4) : rect.bottom + 4,
      left,
      width,
      maxHeight,
    };
  }, []);

  const openDropdown = useCallback(() => {
    const next = measure();
    if (!next) return;
    setPlacement(next);
    setIsOpen(true);
  }, [measure]);

  // Follow the field on scroll/resize rather than closing. Closing on scroll
  // made the menu unreachable on a phone: you had to scroll to see it, and
  // scrolling shut it.
  useEffect(() => {
    if (!isOpen) return;

    let frame = 0;
    const reposition = (event?: Event) => {
      if (event && dropdownMenuRef.current?.contains(event.target as Node)) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const next = measure();
        if (next) setPlacement(next);
      });
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('scroll', reposition, true);
    window.addEventListener('resize', reposition);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', reposition, true);
      window.removeEventListener('resize', reposition);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, measure]);

  return (
    <div className="relative shrink-0 border-r border-[#cbd5e1] bg-slate-50 transition-colors">
      {/* Trigger Button */}
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => (isOpen ? setIsOpen(false) : openDropdown())}
        className="flex h-full w-[96px] sm:w-[106px] items-center justify-between px-2 text-[12px] sm:text-[13px] font-semibold text-slate-700 outline-none hover:bg-slate-100 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-1 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://flagcdn.com/w40/${currentCountry.code.toLowerCase()}.png`}
            alt=""
            aria-hidden="true"
            width={18}
            height={13}
            className="h-[13px] w-[18px] block shrink-0 object-cover rounded-[2px] shadow-sm"
          />
          <span className="whitespace-nowrap font-bold text-slate-800 text-[12px] sm:text-[13px]">
            {currentCountry.code} {currentCountry.dial}
          </span>
        </div>
        <ChevronDown
          size={13}
          className={`shrink-0 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Portal dropdown — escapes overflow:hidden parents */}
      {mounted && isOpen && placement &&
        createPortal(
          <>
            <div className="fixed inset-0 z-[9998]" onClick={() => setIsOpen(false)} />
            <div
              ref={dropdownMenuRef}
              role="listbox"
              className="fixed z-[9999] flex flex-col overflow-y-auto overscroll-contain rounded-xl border border-slate-200 bg-white py-1.5 text-left shadow-2xl"
              style={{
                top: placement.top,
                left: placement.left,
                width: placement.width,
                maxHeight: placement.maxHeight,
              }}
            >
              {sortedCountries.map((c) => {
                const isSelected = c.code === currentCountry.code && c.dial === currentCountry.dial;
                return (
                  <button
                    key={`${c.code}-${c.dial}`}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => {
                      setSelectedCode(c.code);
                      onChange(c.dial);
                      setIsOpen(false);
                    }}
                    className={`flex w-full shrink-0 items-center gap-2.5 px-3 py-2.5 text-left text-[13px] transition-colors ${
                      isSelected
                        ? 'bg-red-50 text-red-600 font-bold'
                        : 'text-slate-700 font-medium hover:bg-slate-50'
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://flagcdn.com/w40/${c.code.toLowerCase()}.png`}
                      alt=""
                      aria-hidden="true"
                      width={20}
                      height={14}
                      // 240 countries: without lazy loading, opening this menu
                      // fired ~240 external requests at once on mobile data.
                      loading="lazy"
                      decoding="async"
                      className="h-[14px] w-[20px] block shrink-0 object-cover rounded-[2px] shadow-sm"
                    />
                    <span className="truncate">
                      {c.code} ({c.dial})
                    </span>
                  </button>
                );
              })}
            </div>
          </>,
          document.body,
        )}
    </div>
  );
}

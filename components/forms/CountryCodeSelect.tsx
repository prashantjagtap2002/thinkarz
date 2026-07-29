'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { countryCodes } from '@/lib/countryCodes';
import { ChevronDown } from 'lucide-react';

interface CountryCodeSelectProps {
  value: string;
  onChange: (dial: string) => void;
}

export default function CountryCodeSelect({ value, onChange }: CountryCodeSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState<string>(() => {
    const match = countryCodes.find((c) => c.dial === value) || countryCodes.find((c) => c.code === 'IN')!;
    return match.code;
  });
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });
  const [mounted, setMounted] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);

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

  const openDropdown = useCallback(() => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setDropdownPos({
      top: rect.bottom + window.scrollY + 4,
      left: rect.left + window.scrollX,
      width: 190,
    });
    setIsOpen(true);
  }, []);

  // Close only on external scroll (not when scrolling inside the dropdown itself)
  const dropdownMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleScroll = (e: Event) => {
      // If the scroll happened inside the dropdown menu, do NOT close
      if (dropdownMenuRef.current && dropdownMenuRef.current.contains(e.target as Node)) return;
      setIsOpen(false);
    };
    const handleResize = () => setIsOpen(false);
    window.addEventListener('scroll', handleScroll, true);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  return (
    <div className="relative shrink-0 border-r border-[#cbd5e1] bg-slate-50 transition-colors">
      {/* Trigger Button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => (isOpen ? setIsOpen(false) : openDropdown())}
        className="flex h-full w-[100px] items-center justify-between pl-2.5 pr-2 text-[14px] font-semibold text-slate-700 outline-none hover:bg-slate-100 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <img
            src={`https://flagcdn.com/w40/${currentCountry.code.toLowerCase()}.png`}
            alt={currentCountry.code}
            className="h-[15px] w-[22px] block shrink-0 object-cover rounded-[2px] shadow-sm"
          />
          <span className="truncate text-slate-800">
            {currentCountry.code} ({currentCountry.dial})
          </span>
        </div>
        <ChevronDown
          size={15}
          className={`shrink-0 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Portal Dropdown — escapes overflow:hidden parents */}
      {mounted && isOpen &&
        createPortal(
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-[9998]"
              onClick={() => setIsOpen(false)}
            />
            {/* Dropdown list */}
            <div
              ref={dropdownMenuRef}
              className="absolute z-[9999] max-h-[260px] overflow-y-auto flex flex-col rounded-xl border border-slate-200 bg-white shadow-2xl py-1.5 text-left"
              style={{
                top: dropdownPos.top,
                left: dropdownPos.left,
                width: dropdownPos.width,
              }}
            >
              {sortedCountries.map((c) => {
                const isSelected = c.code === currentCountry.code && c.dial === currentCountry.dial;
                return (
                  <button
                    key={`${c.code}-${c.dial}`}
                    type="button"
                    onClick={() => {
                      setSelectedCode(c.code);
                      onChange(c.dial);
                      setIsOpen(false);
                    }}
                    className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-[13px] transition-colors ${
                      isSelected
                        ? 'bg-red-50 text-red-600 font-bold'
                        : 'text-slate-700 font-medium hover:bg-slate-50'
                    }`}
                  >
                    <img
                      src={`https://flagcdn.com/w40/${c.code.toLowerCase()}.png`}
                      alt={c.code}
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
          document.body
        )}
    </div>
  );
}

"use client";

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getPageItems } from '@/lib/pagination';

export default function Pagination({
  page,
  totalPages,
  onChange,
  accent = 'red',
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  accent?: 'red' | 'blue';
}) {
  if (totalPages <= 1) return null;

  const items = getPageItems(page, totalPages);
  const activeClass = accent === 'blue' ? 'bg-brand-blue text-white' : 'bg-brand-red text-white';
  const hoverClass = accent === 'blue' ? 'hover:border-brand-blue' : 'hover:border-brand-red';

  // h-11 keeps every control at a 44px touch target.
  const stepClass =
    'flex h-11 w-11 items-center justify-center rounded-md border border-slate-300 text-slate-600 transition-colors disabled:cursor-not-allowed disabled:opacity-40 ' +
    hoverClass;

  return (
    <nav className="mt-10 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className={stepClass}
        aria-label="Previous page"
      >
        <ChevronLeft size={18} />
      </button>

      {items.map((item, index) =>
        item === 'gap' ? (
          <span
            key={`gap-${index}`}
            aria-hidden="true"
            className="flex h-11 w-6 items-center justify-center text-sm text-slate-400"
          >
            &hellip;
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            aria-current={page === item ? 'page' : undefined}
            aria-label={`Page ${item}`}
            className={`flex h-11 w-11 items-center justify-center rounded-md text-sm font-semibold transition-colors ${
              page === item ? activeClass : `border border-slate-300 text-slate-600 ${hoverClass}`
            }`}
          >
            {item}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className={stepClass}
        aria-label="Next page"
      >
        <ChevronRight size={18} />
      </button>
    </nav>
  );
}

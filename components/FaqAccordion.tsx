'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqs } from '@/lib/content';

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={faq.question} className="rounded-xl border border-slate-200 bg-white">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="text-sm font-semibold text-slate-900">{faq.question}</span>
              <ChevronDown
                size={18}
                className={`shrink-0 text-brand-red transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {isOpen && (
              <p className="px-5 pb-4 text-sm leading-relaxed text-slate-600">{faq.answer}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

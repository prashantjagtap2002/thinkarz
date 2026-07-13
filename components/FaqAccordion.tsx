'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqs as defaultFaqs } from '@/lib/content';

type Faq = { question: string; answer: string };

function FaqItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: Faq;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    if (!contentRef.current) {
      return;
    }

    setHeight(contentRef.current.scrollHeight);
  }, [faq.answer]);

  return (
    <div
      className={`group overflow-hidden rounded-2xl border bg-white transition-[border-color,box-shadow,transform] duration-300 ${
        isOpen
          ? 'border-brand-red/30 shadow-[0_18px_45px_-28px_rgba(227,30,36,0.42)]'
          : 'border-slate-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_14px_30px_-24px_rgba(15,23,42,0.28)]'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span
          className={`text-base font-semibold transition-colors duration-200 ${
            isOpen ? 'text-slate-950' : 'text-slate-900'
          }`}
        >
          {faq.question}
        </span>
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
            isOpen
              ? 'bg-brand-red text-white shadow-sm'
              : 'bg-slate-100 text-brand-red group-hover:bg-brand-red/10'
          }`}
        >
          <ChevronDown
            size={18}
            className={`transition-transform duration-300 ease-out ${isOpen ? 'rotate-180' : ''}`}
          />
        </span>
      </button>

      <div
        className="overflow-hidden transition-[height,opacity] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ height: isOpen ? `${height}px` : '0px', opacity: isOpen ? 1 : 0 }}
      >
        <div ref={contentRef} className="px-6 pb-5">
          <div className="mb-4 h-px bg-gradient-to-r from-brand-red/20 via-slate-200 to-transparent" />
          <p className="text-sm leading-7 text-slate-600">{faq.answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function FaqAccordion({ faqs = defaultFaqs }: { faqs?: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {faqs.map((faq, index) => {
        const isOpen = open === index;

        return (
          <FaqItem
            key={faq.question}
            faq={faq}
            isOpen={isOpen}
            onToggle={() => setOpen(isOpen ? null : index)}
          />
        );
      })}
    </div>
  );
}

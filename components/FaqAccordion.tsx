'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
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
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-6 py-5 text-left"
      >
        <span
          className={`text-base font-semibold transition-colors duration-300 sm:text-lg ${
            isOpen ? 'text-brand-red' : 'text-slate-900 hover:text-slate-700'
          }`}
        >
          {faq.question}
        </span>
        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center transition-all duration-300 ${
            isOpen ? 'text-brand-red' : 'text-slate-400'
          }`}
        >
          {isOpen ? <X size={18} strokeWidth={2} /> : <Plus size={18} strokeWidth={2} />}
        </span>
      </button>

      <div
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-5 pr-12 text-sm leading-relaxed text-slate-500 sm:text-[15px] sm:leading-7">
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FaqAccordion({ faqs = defaultFaqs }: { faqs?: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-slate-200">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <FaqItem
            key={faq.question}
            faq={faq}
            isOpen={isOpen}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          />
        );
      })}
    </div>
  );
}

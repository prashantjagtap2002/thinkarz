'use client';

import { useEffect, useRef, useState } from 'react';
import { Star } from 'lucide-react';

interface Testimonial {
  name: string;
  quote: string;
  rating: number;
}

export default function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [testimonials.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const children = el.children;
    if (children[activeIndex]) {
      el.scrollTo({
        left: (children[activeIndex] as HTMLElement).offsetLeft - el.offsetLeft,
        behavior: 'smooth',
      });
    }
  }, [activeIndex]);

  return (
    <>
      {/* Desktop grid */}
      <div className="hidden grid-cols-3 gap-6 sm:grid">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand-red/25 hover:shadow-md"
          >
            <p className="mb-4 text-sm leading-relaxed text-slate-600">{t.quote}</p>
            <div className="mb-2 flex gap-0.5 text-brand-red">
              {Array.from({ length: t.rating }).map((_, s) => (
                <Star key={s} size={14} fill="currentColor" />
              ))}
            </div>
            <p className="text-sm font-semibold text-slate-900">{t.name}</p>
          </div>
        ))}
      </div>

      {/* Mobile auto-scroll carousel */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide sm:hidden"
      >
        {testimonials.map((t, i) => (
          <div
            key={t.name}
            className="w-[85vw] shrink-0 snap-center rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p className="mb-4 text-sm leading-relaxed text-slate-600">{t.quote}</p>
            <div className="mb-2 flex gap-0.5 text-brand-red">
              {Array.from({ length: t.rating }).map((_, s) => (
                <Star key={s} size={14} fill="currentColor" />
              ))}
            </div>
            <p className="text-sm font-semibold text-slate-900">{t.name}</p>
          </div>
        ))}
      </div>

      {/* Mobile dots */}
      <div className="mt-4 flex justify-center gap-2 sm:hidden">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? 'bg-brand-red w-6'
                : 'bg-slate-300'
            }`}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </>
  );
}

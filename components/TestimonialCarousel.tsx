"use client";

import { useCallback, useEffect, useRef, useState } from 'react';
import { Star } from 'lucide-react';

interface Testimonial {
  name: string;
  quote: string;
  rating: number;
}

const AUTOPLAY_MS = 5000;

export default function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  // Auto-advance stops for good once the reader takes over. Previously it kept
  // yanking the card away mid-sentence every 4 seconds.
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = useRef(false);

  useEffect(() => {
    if (isPaused || testimonials.length < 2) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [isPaused, testimonials.length]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const child = el.children[activeIndex] as HTMLElement | undefined;
    if (!child) return;

    isProgrammaticScroll.current = true;
    el.scrollTo({ left: child.offsetLeft - el.offsetLeft, behavior: 'smooth' });
    const timer = setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 600);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  // Keep the dots honest when the reader swipes: without this they drifted out
  // of sync with whatever card was actually on screen.
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || isProgrammaticScroll.current) return;

    const center = el.scrollLeft + el.clientWidth / 2;
    let nearest = 0;
    let nearestDistance = Infinity;

    Array.from(el.children).forEach((node, index) => {
      const child = node as HTMLElement;
      const childCenter = child.offsetLeft - el.offsetLeft + child.clientWidth / 2;
      const distance = Math.abs(childCenter - center);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = index;
      }
    });

    setActiveIndex((prev) => (prev === nearest ? prev : nearest));
  }, []);

  const pause = useCallback(() => setIsPaused(true), []);

  return (
    <>
      {/* Desktop / tablet grid — two columns before three so 640px screens are
          not asked to fit three cards side by side. */}
      <div className="hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-brand-red/25 hover:shadow-md"
          >
            <p className="mb-4 text-sm leading-relaxed text-slate-600">{t.quote}</p>
            <div className="mt-auto">
              <div className="mb-2 flex gap-0.5 text-brand-red" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star key={s} size={14} fill="currentColor" />
                ))}
              </div>
              <p className="text-sm font-semibold text-slate-900">{t.name}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile carousel */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        onPointerDown={pause}
        onTouchStart={pause}
        className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide sm:hidden"
      >
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="w-[85vw] shrink-0 snap-center rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p className="mb-4 text-sm leading-relaxed text-slate-600">{t.quote}</p>
            <div className="mb-2 flex gap-0.5 text-brand-red" aria-label={`${t.rating} out of 5 stars`}>
              {Array.from({ length: t.rating }).map((_, s) => (
                <Star key={s} size={14} fill="currentColor" />
              ))}
            </div>
            <p className="text-sm font-semibold text-slate-900">{t.name}</p>
          </div>
        ))}
      </div>

      {/* Mobile dots — 10px visual marker inside a 44px touch target. */}
      <div className="mt-2 flex justify-center sm:hidden">
        {testimonials.map((t, i) => (
          <button
            key={t.name}
            onClick={() => {
              pause();
              setActiveIndex(i);
            }}
            className="flex h-11 w-8 items-center justify-center"
            aria-label={`Go to testimonial ${i + 1}`}
            aria-current={i === activeIndex}
          >
            <span
              className={`block h-2.5 rounded-full transition-all duration-300 ${
                i === activeIndex ? 'w-6 bg-brand-red' : 'w-2.5 bg-slate-300'
              }`}
            />
          </button>
        ))}
      </div>
    </>
  );
}

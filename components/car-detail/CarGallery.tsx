'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';

const SWIPE_THRESHOLD = 40;

export default function CarGallery({
  images,
  alt,
  certified,
}: {
  images: string[];
  alt: string;
  certified?: boolean;
}) {
  const [active, setActive] = useState(0);
  // Slides are stacked and cross-faded, so every one of them is technically in
  // the viewport and `loading="lazy"` would not hold any of them back. Mount
  // only the current slide and its two neighbours, which caps a 12-photo
  // listing at three concurrent downloads while keeping the fade instant.
  const [mounted, setMounted] = useState<number[]>([0, 1]);
  const touchStartX = useRef<number | null>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  const count = images.length;
  const hasMultiple = count > 1;

  const go = useCallback(
    (delta: number) => {
      setActive((prev) => (prev + delta + count) % count);
    },
    [count],
  );

  useEffect(() => {
    const neighbours = [active, (active + 1) % count, (active - 1 + count) % count];
    setMounted((prev) => {
      const next = new Set(prev);
      neighbours.forEach((i) => next.add(i));
      return next.size === prev.length ? prev : Array.from(next);
    });
  }, [active, count]);

  // Arrow keys work once the gallery has focus, which is what a keyboard user
  // will reach for after tabbing to it.
  useEffect(() => {
    const node = frameRef.current;
    if (!node || !hasMultiple) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        go(-1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        go(1);
      }
    };

    node.addEventListener('keydown', onKeyDown);
    return () => node.removeEventListener('keydown', onKeyDown);
  }, [go, hasMultiple]);

  if (count === 0) return null;

  return (
    <div>
      <div
        ref={frameRef}
        tabIndex={hasMultiple ? 0 : -1}
        role={hasMultiple ? 'group' : undefined}
        aria-roledescription={hasMultiple ? 'carousel' : undefined}
        aria-label={hasMultiple ? `${alt} photos` : undefined}
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null || !hasMultiple) return;
          const delta = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
          if (Math.abs(delta) > SWIPE_THRESHOLD) go(delta < 0 ? 1 : -1);
          touchStartX.current = null;
        }}
        className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2"
      >
        {images.map((img, i) =>
          mounted.includes(i) ? (
            <Image
              key={img + i}
              src={img}
              alt={count > 1 ? `${alt} — photo ${i + 1} of ${count}` : alt}
              title={alt}
              fill
              // Only the cover photo is eager; the neighbours would otherwise
              // compete with it for bandwidth on a phone.
              priority={i === 0}
              sizes="(max-width: 1024px) 100vw, 60vw"
              className={`object-cover transition-opacity duration-300 ${
                i === active ? 'opacity-100' : 'opacity-0'
              }`}
              aria-hidden={i !== active}
            />
          ) : null,
        )}

        {certified && (
          <span className="pointer-events-none absolute left-4 top-4 z-10 flex items-center gap-1 rounded-full bg-brand-red px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
            <ShieldCheck size={14} /> Certified
          </span>
        )}

        {hasMultiple && (
          <>
            {/* Always visible on touch, fade-in on hover for pointer devices. */}
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-md transition-opacity hover:bg-white sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow-md transition-opacity hover:bg-white sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
            >
              <ChevronRight size={20} />
            </button>

            <span className="absolute bottom-3 right-3 z-10 rounded-full bg-slate-900/70 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
              {active + 1} / {count}
            </span>
          </>
        )}
      </div>

      {hasMultiple && (
        <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-5 sm:gap-3 lg:grid-cols-6">
          {images.map((img, i) => (
            <button
              key={img + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show photo ${i + 1}`}
              aria-current={active === i}
              className={`relative aspect-[4/3] overflow-hidden rounded-lg border-2 transition-colors ${
                active === i ? 'border-brand-red' : 'border-transparent hover:border-slate-300'
              }`}
            >
              <Image
                src={img}
                alt=""
                aria-hidden="true"
                fill
                loading="lazy"
                sizes="(max-width: 640px) 25vw, 120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

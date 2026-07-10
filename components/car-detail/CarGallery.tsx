'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ShieldCheck } from 'lucide-react';

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

  return (
    <div>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-100">
        <Image src={images[active]} alt={alt} fill priority className="object-cover" />
        {certified && (
          <span className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-brand-red px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
            <ShieldCheck size={14} /> Certified
          </span>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-3">
          {images.map((img, i) => (
            <button
              key={img + i}
              onClick={() => setActive(i)}
              className={`relative aspect-[4/3] overflow-hidden rounded-lg border-2 ${
                active === i ? 'border-brand-red' : 'border-transparent'
              }`}
            >
              <Image src={img} alt={`${alt} thumbnail ${i + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

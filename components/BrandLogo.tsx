'use client';

import { useState } from 'react';

type BrandLogoAsset = {
  src: string;
  alt: string;
  widthRatio: number;
};

const brandLogos: Record<string, BrandLogoAsset> = {
  Honda: {
    src: '/images/brands/honda.svg',
    alt: 'Honda logo',
    widthRatio: 2.2,
  },
  Hyundai: {
    src: '/images/brands/hyundai.svg',
    alt: 'Hyundai logo',
    widthRatio: 2.15,
  },
  Kia: {
    src: '/images/brands/kia.svg',
    alt: 'Kia logo',
    widthRatio: 2.15,
  },
  MG: {
    src: '/images/brands/mg.svg',
    alt: 'MG logo',
    widthRatio: 1.15,
  },
  'Maruti Suzuki': {
    src: '/images/brands/maruti-suzuki.svg',
    alt: 'Maruti Suzuki logo',
    widthRatio: 2.55,
  },
  TATA: {
    src: '/images/brands/tata.svg',
    alt: 'Tata Motors logo',
    widthRatio: 2.05,
  },
  Tata: {
    src: '/images/brands/tata.svg',
    alt: 'Tata Motors logo',
    widthRatio: 2.05,
  },
};

export default function BrandLogo({ brand, size = 48 }: { brand: string; size?: number }) {
  const [failed, setFailed] = useState(false);
  const asset = brandLogos[brand];

  if (!asset || failed) {
    return (
      <span
        className="flex shrink-0 items-center justify-center rounded-lg bg-brand-blueLight px-2 text-[10px] font-extrabold uppercase tracking-[0.12em] text-brand-blue"
        style={{ minWidth: Math.round(size * 1.45), height: size }}
      >
        {brand.slice(0, 2).toUpperCase()}
      </span>
    );
  }

  return (
    <span
      className="flex items-center justify-center max-w-full"
      style={{ width: '100%', maxWidth: Math.round(size * asset.widthRatio), height: size }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset.src}
        alt={asset.alt}
        className="h-full w-full object-contain"
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
      />
    </span>
  );
}

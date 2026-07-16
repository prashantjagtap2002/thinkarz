'use client';

import { useState } from 'react';

type BrandLogoAsset = {
  src: string;
  alt: string;
  widthRatio: number;
};

const brandLogos: Record<string, BrandLogoAsset> = {
  Honda: {
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Honda%20logo.svg',
    alt: 'Honda logo',
    widthRatio: 2.2,
  },
  Hyundai: {
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Hyundai%20Motor%20Company%20logo.svg',
    alt: 'Hyundai logo',
    widthRatio: 2.15,
  },
  Kia: {
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/KIA%20logo3.svg',
    alt: 'Kia logo',
    widthRatio: 2.15,
  },
  MG: {
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/MG%20Motor%202021%20logo.svg',
    alt: 'MG logo',
    widthRatio: 1.15,
  },
  'Maruti Suzuki': {
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Maruti%20Suzuki%20logo.svg',
    alt: 'Maruti Suzuki logo',
    widthRatio: 2.55,
  },
  TATA: {
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Tata%20Motors%20Logo.svg',
    alt: 'Tata Motors logo',
    widthRatio: 2.05,
  },
  Tata: {
    src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Tata%20Motors%20Logo.svg',
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

'use client';

import { useState } from 'react';

// Maps inventory `make` values to their manufacturer domain, used to fetch a
// logo icon from Google's public favicon service. Falls back to initials if
// a brand has no mapping or the logo fails to load.
const brandDomains: Record<string, string> = {
  Honda: 'honda.com',
  Hyundai: 'hyundai.com',
  Kia: 'kia.com',
  MG: 'mgmotor.co.in',
  'Maruti Suzuki': 'marutisuzuki.com',
  TATA: 'tatamotors.com',
  Tata: 'tatamotors.com',
  Mahindra: 'mahindra.com',
  Toyota: 'toyota.com',
  Skoda: 'skoda-auto.com',
  BMW: 'bmw.com',
  Renault: 'renault.com',
  Volkswagen: 'vw.com',
  Nissan: 'nissan-global.com',
  Jeep: 'jeep.com',
  'Mercedes-Benz': 'mercedes-benz.com',
};

export default function BrandLogo({ brand, size = 48 }: { brand: string; size?: number }) {
  const [failed, setFailed] = useState(false);
  const domain = brandDomains[brand];

  if (!domain || failed) {
    return (
      <span
        className="flex shrink-0 items-center justify-center rounded-full bg-brand-blueLight text-xs font-extrabold text-brand-blue"
        style={{ width: size, height: size }}
      >
        {brand.slice(0, 2).toUpperCase()}
      </span>
    );
  }

  return (
    <span
      className="flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-slate-200"
      style={{ width: size, height: size }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`}
        alt={`${brand} logo`}
        width={size * 0.62}
        height={size * 0.62}
        className="object-contain"
        onError={() => setFailed(true)}
      />
    </span>
  );
}

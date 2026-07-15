'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Car as CarIcon, ChevronRight, X } from 'lucide-react';
import { cars, formatKms, formatPrice, type Car } from '@/lib/cars';
import Reveal from '@/components/Reveal';

const SLOTS = 4;

const popularPairs: [string, string][] = [
  ['kia-sonet-gtx-plus', 'hyundai-venue-turbo-sxo'],
  ['tata-nexon-ev-xz-plus', 'mg-zs-ev-exclusive'],
  ['maruti-ignis-zeta-ags', 'honda-amaze-v-cvt'],
];

type Row = {
  label: string;
  render: (car: Car) => string;
  lowerIsBetter?: boolean;
};

const rows: Row[] = [
  { label: 'Price', render: (c) => formatPrice(c.price) },
  { label: 'EMI / month', render: (c) => `Rs. ${c.emi.toLocaleString('en-IN')}` },
  { label: 'Year', render: (c) => String(c.year) },
  { label: 'Kilometers', render: (c) => formatKms(c.kms), lowerIsBetter: true },
  { label: 'Fuel', render: (c) => c.fuel },
  { label: 'Transmission', render: (c) => c.transmission },
  { label: 'Power', render: (c) => c.power },
  { label: 'Mileage', render: (c) => c.mileage },
  { label: 'Owners', render: (c) => `${c.owners} Owner${c.owners > 1 ? 's' : ''}`, lowerIsBetter: true },
];

function bestIndex(columns: Car[], row: Row): number {
  if (!row.lowerIsBetter) return -1;
  let bestIdx = 0;
  let bestVal = Infinity;
  columns.forEach((car, i) => {
    const num = Number(row.render(car).replace(/[^0-9.]/g, ''));
    if (!Number.isNaN(num) && num < bestVal) {
      bestVal = num;
      bestIdx = i;
    }
  });
  return bestIdx;
}

export default function CompareCarsPage() {
  const [slots, setSlots] = useState<(string | null)[]>(Array(SLOTS).fill(null));
  const [showResult, setShowResult] = useState(false);

  const selectedCars = useMemo(
    () => slots.map((id) => cars.find((c) => c.id === id)).filter((c): c is Car => Boolean(c)),
    [slots],
  );

  function setSlot(index: number, id: string) {
    setSlots((prev) => prev.map((v, i) => (i === index ? (id || null) : v)));
    setShowResult(false);
  }

  function loadPair(a: string, b: string) {
    setSlots([a, b, null, null]);
    setShowResult(true);
    requestAnimationFrame(() => {
      document.getElementById('compare-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  return (
    <>
      <section className="py-14 sm:py-20">
        <div className="container-page">
          <span className="section-eyebrow">Compare Cars</span>
          <h1 className="max-w-2xl text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
            Compare Cars Side by Side
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600">
            Important decisions like a car purchase are often confusing. Our Compare Cars tool
            helps you compare cars on the basis of price, mileage, power, performance and more
            &mdash; so you can choose with confidence.
          </p>

          {/* 4-slot selector */}
          <div className="mt-10 rounded-2xl border border-slate-200 p-6 sm:p-8">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
              {slots.map((slotId, i) => {
                const car = cars.find((c) => c.id === slotId);
                return (
                  <div key={i} className="contents">
                    <div className="flex flex-col items-center text-center">
                      {car ? (
                        <div className="relative w-full">
                          <button
                            onClick={() => setSlot(i, '')}
                            aria-label="Remove car"
                            className="absolute -right-1 -top-1 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white text-slate-400 shadow ring-1 ring-slate-200 hover:text-brand-red"
                          >
                            <X size={13} />
                          </button>
                          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-slate-100">
                            <Image src={car.image} alt={`${car.make} ${car.model}`} fill className="object-cover" />
                          </div>
                          <p className="mt-2 text-xs font-bold uppercase text-slate-900">
                            {car.make} {car.model}
                          </p>
                        </div>
                      ) : (
                        <div className="flex aspect-[4/3] w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-200 text-slate-300">
                          <CarIcon size={32} />
                        </div>
                      )}
                      <select
                        className="field-input mt-3 !py-2 text-xs"
                        value={slotId ?? ''}
                        onChange={(e) => setSlot(i, e.target.value)}
                      >
                        <option value="">Select Car</option>
                        {cars.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.make} {c.model}
                          </option>
                        ))}
                      </select>
                    </div>
                    {i < SLOTS - 1 && (
                      <span className="hidden h-7 w-7 shrink-0 items-center justify-center self-center rounded-full border border-slate-300 text-[11px] font-bold text-slate-400 lg:flex">
                        VS
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => {
                setShowResult(true);
                requestAnimationFrame(() =>
                  document.getElementById('compare-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
                );
              }}
              disabled={selectedCars.length < 2}
              className="btn btn-primary mt-8 w-full disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
            >
              Compare
            </button>
          </div>
        </div>
      </section>

      {/* Comparison result */}
      {showResult && selectedCars.length >= 2 && (
        <section id="compare-result" className="bg-slate-50 py-14 sm:py-20 scroll-mt-24">
          <div className="container-page">
            <h2 className="mb-6 text-xl font-extrabold text-slate-900 sm:text-2xl">
              Comparison Result
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="w-32 border-b border-slate-200 p-3 text-left align-bottom text-xs font-bold uppercase tracking-wide text-slate-400">
                      Specification
                    </th>
                    {selectedCars.map((car, i) => (
                      <th
                        key={car.id}
                        className={`border-b border-slate-200 p-3 text-left align-bottom ${
                          i === 0 ? 'rounded-t-xl bg-brand-blueLight' : ''
                        }`}
                      >
                        <span className="text-sm font-bold uppercase text-slate-900">
                          {car.make} {car.model}
                        </span>
                        <p className="mt-0.5 text-xs font-normal text-slate-500">{car.variant}</p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => {
                    const winnerIdx = bestIndex(selectedCars, row);
                    return (
                      <tr key={row.label}>
                        <td className="border-b border-slate-100 p-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                          {row.label}
                        </td>
                        {selectedCars.map((car, i) => (
                          <td
                            key={car.id}
                            className={`border-b border-slate-100 p-3 font-semibold text-slate-900 ${
                              i === 0 ? 'bg-brand-blueLight/60' : ''
                            } ${i === winnerIdx && winnerIdx !== 0 ? 'text-green-600' : ''}`}
                          >
                            <span className="flex items-center gap-1.5">
                              {row.render(car)}
                              {i === winnerIdx && row.lowerIsBetter && (
                                <span className="rounded bg-green-100 px-1.5 py-0.5 text-[10px] font-bold uppercase text-green-700">
                                  Best
                                </span>
                              )}
                            </span>
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                  <tr>
                    <td className="p-3" />
                    {selectedCars.map((car) => (
                      <td key={car.id} className="p-3">
                        <Link href={`/pre-owned-cars/${car.id}`} className="btn btn-outline !py-2 text-xs">
                          View Details
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Popular comparisons */}
      <section className="py-14 sm:py-20">
        <div className="container-page">
          <h2 className="mb-8 text-xl font-extrabold text-slate-900 sm:text-2xl">
            Popular Comparisons
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {popularPairs.map(([aId, bId], i) => {
              const a = cars.find((c) => c.id === aId);
              const b = cars.find((c) => c.id === bId);
              if (!a || !b) return null;
              return (
                <Reveal
                  key={aId + bId}
                  delay={i * 90}
                  className="rounded-xl border border-slate-200 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/30 hover:shadow-lg"
                >
                  <div className="mb-4 flex items-center gap-2">
                    <div className="relative aspect-[4/3] w-1/2 overflow-hidden rounded-lg bg-slate-100">
                      <Image src={a.image} alt={a.make} fill className="object-cover" />
                    </div>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-brand-red text-[11px] font-bold text-brand-red">
                      VS
                    </span>
                    <div className="relative aspect-[4/3] w-1/2 overflow-hidden rounded-lg bg-slate-100">
                      <Image src={b.image} alt={b.make} fill className="object-cover" />
                    </div>
                  </div>
                  <div className="mb-4 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold uppercase text-slate-900">{a.make} {a.model}</p>
                      <p className="mt-0.5 text-slate-500">{formatPrice(a.price)} onwards</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold uppercase text-slate-900">{b.make} {b.model}</p>
                      <p className="mt-0.5 text-slate-500">{formatPrice(b.price)} onwards</p>
                    </div>
                  </div>
                  <button onClick={() => loadPair(aId, bId)} className="btn btn-outline w-full !py-2 text-xs">
                    Compare Now
                  </button>
                </Reveal>
              );
            })}
          </div>

          <Link
            href="/pre-owned-cars"
            className="mt-8 flex items-center gap-1 text-sm font-semibold text-brand-red hover:underline"
          >
            Compare Cars of Your Choice <ChevronRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}

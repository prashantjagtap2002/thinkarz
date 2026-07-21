'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Car as CarIcon, ChevronRight, Trophy, X } from 'lucide-react';
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
  { label: 'Ex-Showroom Price', render: (c) => formatPrice(c.price) },
  { label: 'EMI / month', render: (c) => `Rs. ${c.emi.toLocaleString('en-IN')}` },
  { label: 'Year', render: (c) => String(c.year) },
  { label: 'Kilometers Driven', render: (c) => formatKms(c.kms), lowerIsBetter: true },
  { label: 'Fuel Type', render: (c) => c.fuel },
  { label: 'Transmission', render: (c) => c.transmission },
  { label: 'Power', render: (c) => c.power },
  { label: 'Mileage', render: (c) => c.mileage, lowerIsBetter: false },
  { label: 'Ownership', render: (c) => `${c.owners} Owner${c.owners > 1 ? 's' : ''}`, lowerIsBetter: true },
  { label: 'Insurance Valid Till', render: (c) => c.insuranceValidTill },
];

// Higher mileage (km/l or km/charge) is better — parsed from the leading number.
function higherIsBetterRow(label: string) {
  return label === 'Mileage';
}

function bestIndex(columns: Car[], row: Row): number {
  const wantsLower = row.lowerIsBetter;
  const wantsHigher = higherIsBetterRow(row.label);
  if (!wantsLower && !wantsHigher) return -1;

  let bestIdx = -1;
  let bestVal = wantsLower ? Infinity : -Infinity;
  columns.forEach((car, i) => {
    const num = Number(row.render(car).replace(/[^0-9.]/g, ''));
    if (Number.isNaN(num)) return;
    if ((wantsLower && num < bestVal) || (wantsHigher && num > bestVal)) {
      bestVal = num;
      bestIdx = i;
    }
  });

  // Only call it a "winner" if the values actually differ across columns.
  const values = columns.map((c) => Number(row.render(c).replace(/[^0-9.]/g, '')));
  const allEqual = values.every((v) => v === values[0]);
  return allEqual ? -1 : bestIdx;
}

function recommend(a: Car, b: Car): { winner: Car; reason: string } {
  let aScore = 0;
  let bScore = 0;
  rows.forEach((row) => {
    const idx = bestIndex([a, b], row);
    if (idx === 0) aScore += 1;
    if (idx === 1) bScore += 1;
  });
  if (aScore === bScore) {
    return a.price <= b.price
      ? { winner: a, reason: 'better overall value for the price' }
      : { winner: b, reason: 'better overall value for the price' };
  }
  return aScore > bScore
    ? { winner: a, reason: 'wins on more key specifications' }
    : { winner: b, reason: 'wins on more key specifications' };
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

  function runCompare() {
    setShowResult(true);
    requestAnimationFrame(() =>
      document.getElementById('compare-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
    );
  }

  const recommendation =
    showResult && selectedCars.length === 2 ? recommend(selectedCars[0], selectedCars[1]) : null;

  return (
    <>
      {/* Header banner */}
      <section className="relative overflow-hidden bg-brand-navy">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-banner.jpg"
            alt=""
            fill
            priority
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/85 to-brand-navy/40" />
        </div>
        <div className="container-page relative py-16 sm:py-20">
          <span className="section-eyebrow">Compare Cars</span>
          <h1 className="max-w-xl text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            Compare Specifications, Features &amp; Pricing
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-slate-300">
            Important decisions like a car purchase are often confusing. Compare price, mileage,
            power and performance side by side before you decide.
          </p>
        </div>
      </section>

      {/* Selector — floats up over the banner */}
      <section className="container-page">
        <div className="relative z-10 -mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl sm:-mt-14 sm:p-8">
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
            onClick={runCompare}
            disabled={selectedCars.length < 2}
            className="btn btn-primary mt-8 w-full disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
          >
            Compare
          </button>
        </div>
      </section>

      {/* Comparison result */}
      {showResult && selectedCars.length >= 2 && (
        <section id="compare-result" className="py-14 scroll-mt-24 sm:py-20">
          <div className="container-page">
            <h2 className="mb-6 text-xl font-extrabold text-slate-900 sm:text-2xl">
              Comparison Result
            </h2>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
              {/* Car photo + price + actions row */}
              <div className="mb-6 grid grid-cols-1 gap-6 border-b border-slate-100 pb-6 sm:grid-cols-2">
                {selectedCars.map((car) => (
                  <div key={car.id} className="text-center">
                    <div className="relative mx-auto aspect-[4/3] w-full max-w-[180px] overflow-hidden rounded-xl bg-slate-100 sm:max-w-[220px]">
                      <Image src={car.image} alt={`${car.make} ${car.model}`} fill className="object-cover" />
                    </div>
                    <p className="mt-3 text-sm font-bold uppercase text-slate-900">
                      {car.make} {car.model}
                    </p>
                    <p className="text-2xl font-extrabold text-slate-900">{formatPrice(car.price)}</p>
                    <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-center">
                      <Link href="/book-a-test-drive" className="btn btn-primary !px-4 !py-2 text-xs">
                        Book Test Drive
                      </Link>
                      <Link href={`/pre-owned-cars/${car.id}`} className="btn btn-outline !px-4 !py-2 text-xs">
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Spec table - desktop */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full min-w-0 border-collapse text-sm">
                  <tbody>
                    {rows.map((row) => {
                      const winnerIdx = bestIndex(selectedCars, row);
                      return (
                        <tr key={row.label} className="border-b border-slate-100 last:border-0">
                          <td className="w-32 p-3 text-xs font-semibold uppercase tracking-wide text-slate-500 lg:w-40">
                            {row.label}
                          </td>
                          {selectedCars.map((car, i) => (
                            <td
                              key={car.id}
                              className={`p-3 font-semibold text-slate-900 ${
                                i === winnerIdx ? 'text-green-600' : ''
                              }`}
                            >
                              <span className="flex items-center gap-1.5">
                                {row.render(car)}
                                {winnerIdx === -1 ? (
                                  <span className="text-xs font-normal text-slate-300">=</span>
                                ) : i === winnerIdx ? (
                                  <span className="text-green-600">&#10003;</span>
                                ) : null}
                              </span>
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Spec cards - mobile */}
              <div className="space-y-4 sm:hidden">
                {rows.map((row) => {
                  const winnerIdx = bestIndex(selectedCars, row);
                  return (
                    <div key={row.label} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                      <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                        {row.label}
                      </p>
                      <div className="space-y-2">
                        {selectedCars.map((car, i) => (
                          <div key={car.id} className="flex items-center justify-between">
                            <span className="text-xs font-medium text-slate-700">
                              {car.make} {car.model}
                            </span>
                            <span
                              className={`text-sm font-semibold ${
                                i === winnerIdx ? 'text-green-600' : 'text-slate-900'
                              }`}
                            >
                              {row.render(car)}
                              {winnerIdx !== -1 && i === winnerIdx && (
                                <span className="ml-1 text-green-600">&#10003;</span>
                              )}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recommendation */}
            {recommendation && (
              <Reveal className="mt-6 flex flex-col items-start gap-4 rounded-xl bg-brand-red/5 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                    <Trophy size={20} />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                      Our Recommendation
                    </p>
                    <p className="text-sm font-semibold text-slate-900">
                      {recommendation.winner.make} {recommendation.winner.model} offers{' '}
                      {recommendation.reason}.
                    </p>
                  </div>
                </div>
                <Link href="/book-a-test-drive" className="btn btn-primary shrink-0">
                  Book Test Drive
                </Link>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* Popular comparisons */}
      <section className="bg-slate-50 py-14 sm:py-20">
        <div className="container-page">
          <h2 className="mb-8 text-xl font-extrabold text-slate-900 sm:text-2xl">
            Popular Comparisons
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {popularPairs.map(([aId, bId], i) => {
              const a = cars.find((c) => c.id === aId);
              const b = cars.find((c) => c.id === bId);
              if (!a || !b) return null;
              return (
                <Reveal
                  key={aId + bId}
                  delay={i * 90}
                  className="rounded-xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/30 hover:shadow-lg"
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

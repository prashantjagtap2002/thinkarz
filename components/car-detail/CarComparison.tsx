'use client';

import { useState } from 'react';
import { Scale, Shuffle, X } from 'lucide-react';
import type { Car } from '@/lib/cars';
import { formatKms, formatPrice } from '@/lib/cars';

type Row = {
  label: string;
  // Returns the display value for a given car.
  render: (car: Car) => string;
  // Lower is better for these metrics, used to subtly flag the best option.
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
  { label: 'Insurance till', render: (c) => c.insuranceValidTill },
];

// Picks the index of the "best" value for a lower-is-better row by parsing the
// leading number out of the rendered string (e.g. "52,280 km" -> 52280).
function bestIndex(cars: Car[], row: Row): number {
  if (!row.lowerIsBetter) return -1;
  let bestIdx = 0;
  let bestVal = Infinity;
  cars.forEach((car, i) => {
    const num = Number(row.render(car).replace(/[^0-9.]/g, ''));
    if (!Number.isNaN(num) && num < bestVal) {
      bestVal = num;
      bestIdx = i;
    }
  });
  return bestIdx;
}

export default function CarComparison({
  current,
  similar,
  allCars,
}: {
  current: Car;
  similar: Car[];
  allCars: Car[];
}) {
  const [extraId, setExtraId] = useState<string | null>(similar[0]?.id ?? null);

  const extra = allCars.find((c) => c.id === extraId) ?? null;
  const columns = [current, ...(extra ? [extra] : [])];

  const pickable = allCars.filter((c) => c.id !== current.id);

  function pickRandom() {
    const others = pickable.filter((c) => c.id !== extraId);
    const pool = others.length > 0 ? others : pickable;
    const random = pool[Math.floor(Math.random() * pool.length)];
    if (random) setExtraId(random.id);
  }

  return (
    <div className="rounded-2xl border border-slate-200 p-6 sm:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Scale className="text-brand-red" size={22} />
          <h2 className="text-xl font-extrabold text-slate-900">Compare With Another Car</h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            className="field-input !w-full !py-2 text-xs sm:!w-auto"
            value={extraId ?? ''}
            onChange={(e) => setExtraId(e.target.value || null)}
          >
            <option value="">Choose a car to compare</option>
            {pickable.map((c) => (
              <option key={c.id} value={c.id}>
                {c.make} {c.model} - {c.variant}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={pickRandom}
            className="flex items-center gap-1.5 rounded-md border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-brand-red hover:text-brand-red"
          >
            <Shuffle size={14} />
            Surprise Me
          </button>
          {extraId && (
            <button
              type="button"
              onClick={() => setExtraId(null)}
              aria-label="Remove comparison car"
              className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-300 text-slate-500 transition-colors hover:border-brand-red hover:text-brand-red"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {!extra ? (
        <p className="rounded-xl bg-slate-50 p-6 text-center text-sm text-slate-500">
          Pick a car above (or hit &quot;Surprise Me&quot;) to compare it side-by-side with this one.
        </p>
      ) : (
      <>
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full min-w-0 border-collapse text-sm">
          <thead>
            <tr>
              <th className="w-32 border-b border-slate-200 p-3 text-left align-bottom text-xs font-bold uppercase tracking-wide text-slate-400">
                Specification
              </th>
              {columns.map((car, i) => (
                <th
                  key={car.id}
                  className={`border-b border-slate-200 p-3 text-left align-bottom ${
                    i === 0 ? 'rounded-t-xl bg-brand-blueLight' : ''
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold uppercase text-slate-900">
                      {car.make} {car.model}
                    </span>
                    {i === 0 && (
                      <span className="rounded-full bg-brand-red px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                        This Car
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-xs font-normal text-slate-500">{car.variant}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const winnerIdx = bestIndex(columns, row);
              return (
                <tr key={row.label} className="group">
                  <td className="border-b border-slate-100 p-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {row.label}
                  </td>
                  {columns.map((car, i) => (
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
          </tbody>
        </table>
      </div>

      {/* Mobile comparison cards */}
      <div className="space-y-4 sm:hidden">
        {rows.map((row) => {
          const winnerIdx = bestIndex(columns, row);
          return (
            <div key={row.label} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">
                {row.label}
              </p>
              <div className="space-y-1.5">
                {columns.map((car, i) => (
                  <div key={car.id} className="flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-600">
                      {car.make} {car.model}
                      {i === 0 && (
                        <span className="ml-1.5 rounded bg-brand-red px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">
                          This Car
                        </span>
                      )}
                    </span>
                    <span className={`text-sm font-semibold ${
                      i === winnerIdx && row.lowerIsBetter ? 'text-green-600' : 'text-slate-900'
                    }`}>
                      {row.render(car)}
                      {i === winnerIdx && row.lowerIsBetter && (
                        <span className="ml-1 rounded bg-green-100 px-1 py-0.5 text-[10px] font-bold text-green-700">
                          Best
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      </>
      )}
    </div>
  );
}

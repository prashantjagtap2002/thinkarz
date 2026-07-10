'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Car as CarIcon } from 'lucide-react';
import CarCard from './CarCard';
import { Car, cars } from '@/lib/cars';

function uniqueValues<K extends keyof Car>(key: K) {
  return Array.from(new Set(cars.map((c) => String(c[key])))).sort();
}

function countsFor<K extends keyof Car>(key: K) {
  const counts = new Map<string, number>();
  cars.forEach((c) => {
    const value = String(c[key]);
    counts.set(value, (counts.get(value) ?? 0) + 1);
  });
  return counts;
}

const PAGE_SIZE = 6;

export default function PreOwnedCarsBrowser() {
  const searchParams = useSearchParams();
  const bodyTypeOptions = useMemo(() => uniqueValues('bodyType'), []);
  const requestedBodyType = searchParams.get('bodyType');
  const initialBodyType: string[] =
    requestedBodyType && bodyTypeOptions.includes(requestedBodyType) ? [requestedBodyType] : [];

  const [make, setMake] = useState<string[]>([]);
  const [sellerType, setSellerType] = useState<string[]>([]);
  const [fuel, setFuel] = useState<string[]>([]);
  const [transmission, setTransmission] = useState<string[]>([]);
  const [bodyType, setBodyType] = useState<string[]>(initialBodyType);
  const [owners, setOwners] = useState<string[]>([]);
  const [certifiedOnly, setCertifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = cars.filter((c) => {
      if (make.length && !make.includes(c.make)) return false;
      if (sellerType.length && !sellerType.includes(c.sellerType)) return false;
      if (fuel.length && !fuel.includes(c.fuel)) return false;
      if (transmission.length && !transmission.includes(c.transmission)) return false;
      if (bodyType.length && !bodyType.includes(c.bodyType)) return false;
      if (owners.length && !owners.includes(String(c.owners))) return false;
      if (certifiedOnly && !c.certified) return false;
      return true;
    });

    result = [...result].sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'kms-low') return a.kms - b.kms;
      return b.year - a.year;
    });

    return result;
  }, [make, sellerType, fuel, transmission, bodyType, owners, certifiedOnly, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function resetFilters() {
    setMake([]);
    setSellerType([]);
    setFuel([]);
    setTransmission([]);
    setBodyType([]);
    setOwners([]);
    setCertifiedOnly(false);
    setPage(1);
  }

  function toggleValue(setter: (updater: (prev: string[]) => string[]) => void, value: string) {
    setter((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
    setPage(1);
  }

  return (
    <div className="container-page py-10 sm:py-14">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Pre Owned Cars</h1>
          <p className="mt-2 max-w-xl text-sm text-slate-600">
            Explore our wide range of quality pre-owned cars. Find the perfect car that fits your
            needs and budget.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-2 rounded-full bg-brand-blueLight px-4 py-2 text-sm font-semibold text-brand-blue">
            <CarIcon size={16} /> {filtered.length}+ Cars Available
          </span>
          <select
            className="field-input w-auto"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Sort By: Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="kms-low">Kilometers: Low to High</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
        {/* Filters */}
        <aside className="h-fit rounded-xl border border-slate-200 bg-white p-6">
          <MultiSelectFilter
            label="Make"
            selected={make}
            counts={countsFor('make')}
            onToggle={(v) => toggleValue(setMake, v)}
          />
          <MultiSelectFilter
            label="Seller Type"
            selected={sellerType}
            counts={countsFor('sellerType')}
            onToggle={(v) => toggleValue(setSellerType, v)}
          />
          <MultiSelectFilter
            label="Fuel"
            selected={fuel}
            counts={countsFor('fuel')}
            onToggle={(v) => toggleValue(setFuel, v)}
          />
          <MultiSelectFilter
            label="Transmission"
            selected={transmission}
            counts={countsFor('transmission')}
            onToggle={(v) => toggleValue(setTransmission, v)}
          />
          <MultiSelectFilter
            label="Body Type"
            selected={bodyType}
            counts={countsFor('bodyType')}
            onToggle={(v) => toggleValue(setBodyType, v)}
          />
          <MultiSelectFilter
            label="Owners"
            selected={owners}
            counts={countsFor('owners')}
            onToggle={(v) => toggleValue(setOwners, v)}
          />

          <div className="mb-5">
            <p className="field-label">Show Cars With</p>
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={certifiedOnly}
                onChange={(e) => {
                  setCertifiedOnly(e.target.checked);
                  setPage(1);
                }}
                className="h-4 w-4 rounded border-slate-300 text-brand-red focus:ring-brand-red"
                suppressHydrationWarning
              />
              Certified Cars
            </label>
          </div>

          <button
            onClick={resetFilters}
            className="text-sm font-semibold text-brand-blue hover:underline"
          >
            Reset Filters
          </button>
        </aside>

        {/* Results */}
        <div>
          {paginated.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 p-16 text-center text-sm text-slate-500">
              No cars match your filters. Try resetting them.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {paginated.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-10 flex justify-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`flex h-9 w-9 items-center justify-center rounded-md text-sm font-semibold ${
                    page === i + 1
                      ? 'bg-brand-blue text-white'
                      : 'border border-slate-300 text-slate-600 hover:border-brand-blue'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MultiSelectFilter({
  label,
  selected,
  counts,
  onToggle,
}: {
  label: string;
  selected: string[];
  counts: Map<string, number>;
  onToggle: (value: string) => void;
}) {
  const options = Array.from(counts.keys()).sort();

  return (
    <div className="mb-5 border-b border-slate-100 pb-5 last:border-0 last:pb-0">
      <p className="field-label">
        {label}
        {selected.length > 0 && (
          <span className="ml-1.5 font-normal text-brand-red">({selected.length})</span>
        )}
      </p>
      <div className="space-y-2">
        {options.map((opt) => (
          <label key={opt} className="flex items-center justify-between gap-2 text-sm text-slate-700">
            <span className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => onToggle(opt)}
                className="h-4 w-4 rounded border-slate-300 text-brand-red focus:ring-brand-red"
                suppressHydrationWarning
              />
              {opt}
            </span>
            <span className="text-xs text-slate-400">{counts.get(opt)}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

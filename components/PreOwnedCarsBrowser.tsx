'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Car as CarIcon } from 'lucide-react';
import CarCard from './CarCard';
import { Car, cars } from '@/lib/cars';

const ALL = 'All';

function uniqueValues<K extends keyof Car>(key: K) {
  return [ALL, ...Array.from(new Set(cars.map((c) => String(c[key]))))];
}

const PAGE_SIZE = 6;

export default function PreOwnedCarsBrowser() {
  const searchParams = useSearchParams();
  const bodyTypeOptions = uniqueValues('bodyType');
  const requestedBodyType = searchParams.get('bodyType');
  const initialBodyType =
    requestedBodyType && bodyTypeOptions.includes(requestedBodyType) ? requestedBodyType : ALL;

  const [make, setMake] = useState(ALL);
  const [sellerType, setSellerType] = useState(ALL);
  const [city, setCity] = useState(ALL);
  const [fuel, setFuel] = useState(ALL);
  const [transmission, setTransmission] = useState(ALL);
  const [bodyType, setBodyType] = useState(initialBodyType);
  const [owners, setOwners] = useState(ALL);
  const [certifiedOnly, setCertifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = cars.filter((c) => {
      if (make !== ALL && c.make !== make) return false;
      if (sellerType !== ALL && c.sellerType !== sellerType) return false;
      if (city !== ALL && c.city !== city) return false;
      if (fuel !== ALL && c.fuel !== fuel) return false;
      if (transmission !== ALL && c.transmission !== transmission) return false;
      if (bodyType !== ALL && c.bodyType !== bodyType) return false;
      if (owners !== ALL && String(c.owners) !== owners) return false;
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
  }, [make, sellerType, city, fuel, transmission, bodyType, owners, certifiedOnly, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function resetFilters() {
    setMake(ALL);
    setSellerType(ALL);
    setCity(ALL);
    setFuel(ALL);
    setTransmission(ALL);
    setBodyType(ALL);
    setOwners(ALL);
    setCertifiedOnly(false);
    setPage(1);
  }

  function updateAndReset(setter: (v: string) => void) {
    return (v: string) => {
      setter(v);
      setPage(1);
    };
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
          <FilterSelect
            label="Make / Model"
            value={make}
            options={uniqueValues('make')}
            onChange={updateAndReset(setMake)}
          />
          <FilterSelect
            label="Seller Type"
            value={sellerType}
            options={uniqueValues('sellerType')}
            onChange={updateAndReset(setSellerType)}
          />
          <FilterSelect
            label="City"
            value={city}
            options={uniqueValues('city')}
            onChange={updateAndReset(setCity)}
          />
          <FilterSelect
            label="Fuel"
            value={fuel}
            options={uniqueValues('fuel')}
            onChange={updateAndReset(setFuel)}
          />
          <FilterSelect
            label="Transmission"
            value={transmission}
            options={uniqueValues('transmission')}
            onChange={updateAndReset(setTransmission)}
          />
          <FilterSelect
            label="Body Type"
            value={bodyType}
            options={bodyTypeOptions}
            onChange={updateAndReset(setBodyType)}
          />
          <FilterSelect
            label="Owners"
            value={owners}
            options={uniqueValues('owners')}
            onChange={updateAndReset(setOwners)}
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

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="mb-5">
      <label className="field-label">{label}</label>
      <select className="field-input" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt === ALL ? `Select ${label}` : opt}
          </option>
        ))}
      </select>
    </div>
  );
}

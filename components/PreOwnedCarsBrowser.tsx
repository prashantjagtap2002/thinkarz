'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Car as CarIcon, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';
import CarCard from './CarCard';
import {
  Car,
  ageOptions,
  budgetOptions,
  cars,
  matchesAgeLabel,
  matchesBudgetLabel,
} from '@/lib/cars';

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

function countsForOptions(options: readonly string[], matcher: (car: Car, option: string) => boolean) {
  const counts = new Map<string, number>();
  options.forEach((option) => {
    counts.set(option, cars.filter((car) => matcher(car, option)).length);
  });
  return counts;
}

function initialSelection(value: string | null, options: readonly string[]) {
  return value && options.includes(value) ? [value] : [];
}

const PAGE_SIZE = 6;

export default function PreOwnedCarsBrowser() {
  const searchParams = useSearchParams();
  const bodyTypeOptions = useMemo(() => uniqueValues('bodyType'), []);
  const budgetLabels = useMemo(() => budgetOptions.map((option) => option.label), []);
  const ageLabels = useMemo(() => [...ageOptions], []);
  const initialBudget = initialSelection(searchParams.get('budget'), budgetLabels);
  const initialBodyType = initialSelection(searchParams.get('bodyType'), bodyTypeOptions);
  const initialAge = initialSelection(searchParams.get('age'), ageLabels);

  const [make, setMake] = useState<string[]>([]);
  const [budget, setBudget] = useState<string[]>(initialBudget);
  const [sellerType, setSellerType] = useState<string[]>([]);
  const [fuel, setFuel] = useState<string[]>([]);
  const [transmission, setTransmission] = useState<string[]>([]);
  const [bodyType, setBodyType] = useState<string[]>(initialBodyType);
  const [age, setAge] = useState<string[]>(initialAge);
  const [owners, setOwners] = useState<string[]>([]);
  const [certifiedOnly, setCertifiedOnly] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);
  const budgetCounts = useMemo(
    () => countsForOptions(budgetLabels, (car, option) => matchesBudgetLabel(car, option)),
    [budgetLabels],
  );
  const ageCounts = useMemo(
    () => countsForOptions(ageLabels, (car, option) => matchesAgeLabel(car, option)),
    [ageLabels],
  );

  const filtered = useMemo(() => {
    let result = cars.filter((c) => {
      if (make.length && !make.includes(c.make)) return false;
      if (budget.length && !budget.some((option) => matchesBudgetLabel(c, option))) return false;
      if (sellerType.length && !sellerType.includes(c.sellerType)) return false;
      if (fuel.length && !fuel.includes(c.fuel)) return false;
      if (transmission.length && !transmission.includes(c.transmission)) return false;
      if (bodyType.length && !bodyType.includes(c.bodyType)) return false;
      if (age.length && !age.some((option) => matchesAgeLabel(c, option))) return false;
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
  }, [make, budget, sellerType, fuel, transmission, bodyType, age, owners, certifiedOnly, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const activeFilters = [
    ...budget.map((value) => `Budget: ${value}`),
    ...bodyType.map((value) => `Type: ${value}`),
    ...age.map((value) => `Age: ${value}`),
  ];

  function resetFilters() {
    setMake([]);
    setBudget([]);
    setSellerType([]);
    setFuel([]);
    setTransmission([]);
    setBodyType([]);
    setAge([]);
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
          {activeFilters.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {activeFilters.map((filter) => (
                <span
                  key={filter}
                  className="rounded-full border border-brand-red/20 bg-brand-red/10 px-3 py-1 text-xs font-semibold text-brand-red"
                >
                  {filter}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-2 rounded-full bg-brand-blueLight px-4 py-2 text-sm font-semibold text-brand-blue">
            <CarIcon size={16} /> {filtered.length} Cars Available
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
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900">Filters</h2>
            {activeFilters.length > 0 && (
              <button onClick={resetFilters} className="text-sm font-semibold text-brand-red hover:underline">
                Clear all
              </button>
            )}
          </div>
          <MultiSelectFilter
            label="Brand"
            selected={make}
            counts={countsFor('make')}
            defaultOpen={true}
            onToggle={(v) => toggleValue(setMake, v)}
          />
          <MultiSelectFilter
            label="Budget"
            selected={budget}
            counts={budgetCounts}
            orderedOptions={budgetLabels}
            defaultOpen={true}
            onToggle={(v) => toggleValue(setBudget, v)}
          >
            <div className="mt-5 rounded-xl bg-slate-50 p-4 border border-slate-100">
              <div className="mb-4 flex items-center justify-between text-xs font-bold text-slate-800">
                <span>Rs. 0.00 Lakh</span>
                <span>Rs. 20.00 Lakh</span>
              </div>
              <div className="relative h-1 bg-brand-red rounded-full mx-2 mt-2">
                {/* Simulated Dual Range Slider without clipping */}
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full border-2 border-brand-red bg-white shadow-sm cursor-pointer hover:scale-110 transition-transform"></div>
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 h-4 w-4 rounded-full border-2 border-brand-red bg-white shadow-sm cursor-pointer hover:scale-110 transition-transform"></div>
              </div>
            </div>
          </MultiSelectFilter>
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
            label="Car Age"
            selected={age}
            counts={ageCounts}
            orderedOptions={ageLabels}
            onToggle={(v) => toggleValue(setAge, v)}
          />
          <MultiSelectFilter
            label="Owners"
            selected={owners}
            counts={countsFor('owners')}
            onToggle={(v) => toggleValue(setOwners, v)}
          />

          <div className="mb-6">
            <label className="flex items-center justify-between gap-2 text-sm font-bold text-slate-800 cursor-pointer">
              <span className="flex items-center gap-2">
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
                Certified Cars Only
              </span>
            </label>
          </div>

          <button
            onClick={resetFilters}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 py-3 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
          >
            <RotateCcw size={16} /> Reset Filters
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
  orderedOptions,
  defaultOpen = false,
  onToggle,
  children,
}: {
  label: string;
  selected: string[];
  counts: Map<string, number>;
  orderedOptions?: readonly string[];
  defaultOpen?: boolean;
  onToggle: (value: string) => void;
  children?: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const options = orderedOptions ?? Array.from(counts.keys()).sort();

  return (
    <div className="mb-5 border-b border-slate-100 pb-5 last:border-0 last:pb-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left focus:outline-none"
      >
        <p className="text-sm font-bold text-slate-800">
          {label}
          {selected.length > 0 && (
            <span className="ml-1.5 rounded-full bg-brand-red/10 px-2 py-0.5 text-[10px] text-brand-red">
              {selected.length}
            </span>
          )}
        </p>
        {isOpen ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
      </button>
      
      {isOpen && (
        <div className="mt-4 space-y-3">
          {options.map((opt) => (
            <label key={opt} className="group flex cursor-pointer items-center justify-between gap-2 text-sm text-slate-600 transition-colors hover:text-slate-900">
              <span className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={selected.includes(opt)}
                  onChange={() => onToggle(opt)}
                  className="h-4 w-4 rounded border-slate-300 text-brand-red transition-colors focus:ring-brand-red cursor-pointer"
                  suppressHydrationWarning
                />
                {opt}
              </span>
              <span className="text-xs font-medium text-slate-400 group-hover:text-slate-500">{counts.get(opt)}</span>
            </label>
          ))}
          {children}
        </div>
      )}
    </div>
  );
}

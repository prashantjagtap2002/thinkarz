'use client';

import { useEffect, useMemo, useRef, useState, useLayoutEffect as useIsomorphicLayoutEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Car as CarIcon,
  CarFront,
  Truck,
  Cog,
  Settings,
  Fuel as FuelIcon,
  Zap,
  SlidersHorizontal,
  RotateCcw,
  X,
  ChevronDown,
} from 'lucide-react';
import CarCard from './CarCard';
import BrandLogo from './BrandLogo';
import BodyTypeIcon from './BodyTypeIcon';
import FilterSidebar from './inventory/FilterSidebar';

const bodyTypeIcons: Record<string, typeof CarIcon> = {
  Hatchback: CarFront,
  Sedan: CarIcon,
  SUV: Truck,
  MUV: Truck,
};

const transmissionIcons: Record<string, typeof CarIcon> = {
  Automatic: Cog,
  Manual: Settings,
};

const fuelIcons: Record<string, typeof CarIcon> = {
  Petrol: FuelIcon,
  Diesel: FuelIcon,
  EV: Zap,
  Hybrid: Zap,
  CNG: FuelIcon,
};
import {
  Car,
  ageOptions,
  budgetOptions,
  cars,
  kmOptions,
  matchesAgeLabel,
  matchesBudgetLabel,
  matchesKmLabel,
  formatPrice,
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

function getBaseColor(color: string): string {
  const c = color.toLowerCase();
  if (c.includes('white') || c.includes('pearl')) return 'White';
  if (c.includes('grey') || c.includes('gray')) return 'Grey';
  if (c.includes('red')) return 'Red';
  if (c.includes('silver') || c.includes('steel')) return 'Silver';
  if (c.includes('black')) return 'Black';
  if (c.includes('blue')) return 'Blue';
  return 'Other';
}

const PAGE_SIZE = 8;

const colorLabels = ['White', 'Grey', 'Red', 'Silver', 'Black', 'Blue', 'Other'] as const;

const MIN_PRICE = 0;
const PRICE_STEP = 50000;


export default function PreOwnedCarsBrowser() {
  const searchParams = useSearchParams();
  const maxPrice = useMemo(() => Math.ceil(Math.max(...cars.map((c) => c.price), 0) / PRICE_STEP) * PRICE_STEP, []);
  const bodyTypeOptions = useMemo(() => uniqueValues('bodyType'), []);
  const makeOptions = useMemo(() => uniqueValues('make'), []);
  const budgetLabels = useMemo(() => budgetOptions.map((option) => option.label), []);
  const ageLabels = useMemo(() => [...ageOptions], []);
  const kmLabels = useMemo(() => [...kmOptions], []);
  const initialBudget = initialSelection(searchParams.get('budget'), budgetLabels);
  const initialBodyType = initialSelection(searchParams.get('bodyType'), bodyTypeOptions);
  const initialAge = initialSelection(searchParams.get('age'), ageLabels);
  const initialMake = initialSelection(searchParams.get('make'), makeOptions);

  const [make, setMake] = useState<string[]>(initialMake);
  const [budget, setBudget] = useState<string[]>(initialBudget);
  const [sellerType, setSellerType] = useState<string[]>([]);
  const [fuel, setFuel] = useState<string[]>([]);
  const [transmission, setTransmission] = useState<string[]>([]);
  const [bodyType, setBodyType] = useState<string[]>(initialBodyType);
  const [age, setAge] = useState<string[]>(initialAge);
  const [owners, setOwners] = useState<string[]>([]);
  const [kms, setKms] = useState<string[]>([]);
  const [color, setColor] = useState<string[]>([]);
  const [certifiedOnly, setCertifiedOnly] = useState(false);
  const [priceMin, setPriceMin] = useState(MIN_PRICE);
  const [priceMax, setPriceMax] = useState(maxPrice);
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filterVersion, setFilterVersion] = useState(0);
  const budgetCounts = useMemo(
    () => countsForOptions(budgetLabels, (car, option) => matchesBudgetLabel(car, option)),
    [budgetLabels],
  );
  const ageCounts = useMemo(
    () => countsForOptions(ageLabels, (car, option) => matchesAgeLabel(car, option)),
    [ageLabels],
  );
  const kmCounts = useMemo(
    () => countsForOptions(kmLabels, (car, option) => matchesKmLabel(car, option)),
    [kmLabels],
  );
  const colorCounts = useMemo(
    () => countsForOptions(colorLabels, (car, option) => getBaseColor(car.color) === option),
    [],
  );

  const priceSliderActive = priceMax !== maxPrice;

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
      if (kms.length && !kms.some((option) => matchesKmLabel(c, option))) return false;
      if (color.length && !color.includes(getBaseColor(c.color))) return false;
      if (certifiedOnly && !c.certified) return false;
      if (c.price < priceMin || c.price > priceMax) return false;
      return true;
    });

    result = [...result].sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'kms-low') return a.kms - b.kms;
      return b.year - a.year;
    });

    return result;
  }, [make, budget, sellerType, fuel, transmission, bodyType, age, owners, kms, color, certifiedOnly, priceMin, priceMax, sortBy]);

  const prevFilteredLength = useRef(filtered.length);
  const containerRef = useRef<HTMLDivElement>(null);

  function handlePageChange(newPage: number) {
    setPage(newPage);
    if (containerRef.current) {
      const topOffset = containerRef.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: Math.max(0, topOffset), behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const stringSetters: Record<string, React.Dispatch<React.SetStateAction<string[]>>> = {
    make: setMake,
    budget: setBudget,
    sellerType: setSellerType,
    fuel: setFuel,
    transmission: setTransmission,
    bodyType: setBodyType,
    age: setAge,
    owners: setOwners,
    kms: setKms,
    color: setColor,
  };

  function toggleValue(field: string, value: string) {
    const setter = stringSetters[field];
    if (!setter) return;
    setter((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
    setPage(1);
  }

  // Build the active filter chip list so each can be removed individually.
  const activeChips: { label: string; clear: () => void }[] = [];
  budget.forEach((value) =>
    activeChips.push({ label: `Budget: ${value}`, clear: () => toggleValue('budget', value) }),
  );
  bodyType.forEach((value) =>
    activeChips.push({ label: `Type: ${value}`, clear: () => toggleValue('bodyType', value) }),
  );
  age.forEach((value) =>
    activeChips.push({ label: `Age: ${value}`, clear: () => toggleValue('age', value) }),
  );
  kms.forEach((value) =>
    activeChips.push({ label: `KMs: ${value}`, clear: () => toggleValue('kms', value) }),
  );
  color.forEach((value) =>
    activeChips.push({ label: `Color: ${value}`, clear: () => toggleValue('color', value) }),
  );
  make.forEach((value) =>
    activeChips.push({ label: value, clear: () => toggleValue('make', value) }),
  );
  fuel.forEach((value) =>
    activeChips.push({ label: value, clear: () => toggleValue('fuel', value) }),
  );
  transmission.forEach((value) =>
    activeChips.push({ label: value, clear: () => toggleValue('transmission', value) }),
  );
  sellerType.forEach((value) =>
    activeChips.push({ label: value, clear: () => toggleValue('sellerType', value) }),
  );
  owners.forEach((value) =>
    activeChips.push({ label: `${value} Owner`, clear: () => toggleValue('owners', value) }),
  );
  if (certifiedOnly)
    activeChips.push({ label: 'Certified', clear: () => setCertifiedOnly(false) });
  if (priceSliderActive)
    activeChips.push({
      label: `${formatPrice(priceMin)} - ${formatPrice(priceMax)}`,
      clear: () => {
        setPriceMin(MIN_PRICE);
        setPriceMax(maxPrice);
      },
    });

  const hasActiveFilters = activeChips.length > 0;

  function resetFilters() {
    setMake([]);
    setBudget([]);
    setSellerType([]);
    setFuel([]);
    setTransmission([]);
    setBodyType([]);
    setAge([]);
    setOwners([]);
    setKms([]);
    setColor([]);
    setCertifiedOnly(false);
    setPriceMin(MIN_PRICE);
    setPriceMax(maxPrice);
    setPage(1);
  }

  function onPriceRangeChange(minVal: number, maxVal: number) {
    setPriceMin(minVal);
    setPriceMax(maxVal);
    setPage(1);
  }

  const sidebar = (
    <FilterSidebar
      state={{
        make,
        budget,
        sellerType,
        fuel,
        transmission,
        bodyType,
        age,
        owners,
        kms,
        certifiedOnly,
        priceMin,
        priceMax,
        color,
      }}
      counts={{ budgetCounts, ageCounts, kmCounts, colorCounts }}
      onToggle={toggleValue}
      onCertifiedChange={(v) => {
        setCertifiedOnly(v);
        setPage(1);
      }}
      onPriceRangeChange={onPriceRangeChange}
      onReset={resetFilters}
      hasActiveFilters={hasActiveFilters}
      maxPrice={maxPrice}
    />
  );

  return (
    <div ref={containerRef} className="container-page py-8 sm:py-14">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900">Pre Owned Cars</h1>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-blueLight px-3 py-1 text-xs font-bold text-brand-blue">
              <CarIcon size={14} /> {filtered.length} Cars
            </span>
          </div>
          <p className="mt-2 max-w-xl text-xs sm:text-sm text-slate-600">
            Explore our wide range of quality pre-owned cars. Find the perfect car that fits your
            needs and budget.
          </p>
        </div>

        {/* Desktop Sort Control */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="relative">
            <select
              className="field-input w-auto appearance-none pr-9 cursor-pointer text-xs font-semibold bg-white"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Sort By: Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="kms-low">Kilometers: Low to High</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
          </div>
        </div>
      </div>

      {/* Mobile Combined Controls Bar (Filters Button + Sort By Select side-by-side) */}
      <div className="mb-6 grid grid-cols-2 gap-3 lg:hidden">
        <button
          onClick={() => setShowMobileFilters(true)}
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-xs font-bold text-slate-800 shadow-sm transition-colors hover:border-brand-red"
        >
          <SlidersHorizontal size={15} className="text-brand-red" />
          <span>Filters</span>
          {hasActiveFilters && (
            <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-red px-1 text-[10px] text-white">
              {activeChips.length}
            </span>
          )}
        </button>

        <div className="relative w-full">
          <select
            className="w-full h-full rounded-xl border border-slate-200 bg-white py-2.5 pl-5 pr-7 text-xs font-bold text-slate-800 shadow-sm appearance-none cursor-pointer outline-none focus:border-brand-red text-center"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="kms-low">KMs: Low to High</option>
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={15} />
        </div>
      </div>

      {/* Active filter chips — shown above the grid, full width */}
      {hasActiveFilters && (
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Active:
          </span>
          {activeChips.map((chip) => (
            <button
              key={chip.label}
              onClick={chip.clear}
              className="flex items-center gap-1.5 rounded-full bg-brand-blueLight px-3 py-1.5 text-xs font-semibold text-brand-blue transition-colors hover:bg-brand-red/10 hover:text-brand-red"
            >
              {chip.label}
              <X size={12} strokeWidth={2.5} />
            </button>
          ))}
          <button onClick={resetFilters} className="ml-1 text-xs font-semibold text-brand-blue hover:underline">
            Clear all
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
        {/* Filters — desktop sticky sidebar */}
        <aside className="hidden lg:block">
          <div className="lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
            {sidebar}
          </div>
        </aside>

        {/* Results */}
        <div>
          {paginated.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 p-16 text-center text-sm text-slate-500">
              No cars match your filters. Try resetting them.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {paginated.map((car) => (
                <div key={car.id}>
                  <CarCard car={car} />
                </div>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-10 flex justify-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
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

      {/* Mobile filter drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-slate-900/50" onClick={() => setShowMobileFilters(false)} />
          <div className="absolute left-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-slate-900">Filters</h2>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="flex h-8 w-8 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100"
                aria-label="Close filters"
              >
                <X size={20} />
              </button>
            </div>
            {sidebar}
            <button onClick={() => setShowMobileFilters(false)} className="btn btn-primary mt-6 w-full">
              Show {filtered.length} Cars
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ----------------------------- Filter sidebar ----------------------------- */

type FilterState = {
  make: string[];
  budget: string[];
  sellerType: string[];
  fuel: string[];
  transmission: string[];
  bodyType: string[];
  age: string[];
  owners: string[];
  kms: string[];
  certifiedOnly: boolean;
  priceMin: number;
  priceMax: number;
  color: string[];
};



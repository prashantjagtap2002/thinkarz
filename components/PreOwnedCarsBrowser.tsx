'use client';

import { useMemo, useState } from 'react';
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

const PAGE_SIZE = 6;

// Price slider bounds derived from the inventory.
const MIN_PRICE = 0;
const MAX_PRICE = 2000000;
const PRICE_STEP = 50000;

export default function PreOwnedCarsBrowser() {
  const searchParams = useSearchParams();
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
  const [certifiedOnly, setCertifiedOnly] = useState(false);
  const [priceMax, setPriceMax] = useState(MAX_PRICE);
  const priceMin = MIN_PRICE;
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
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

  const priceSliderActive = priceMax !== MAX_PRICE;

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
  }, [make, budget, sellerType, fuel, transmission, bodyType, age, owners, kms, certifiedOnly, priceMin, priceMax, sortBy]);

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
      label: `Up to ${formatPrice(priceMax)}`,
      clear: () => setPriceMax(MAX_PRICE),
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
    setCertifiedOnly(false);
    setPriceMax(MAX_PRICE);
    setPage(1);
  }

  function onMaxChange(value: number) {
    setPriceMax(Math.max(value, MIN_PRICE + PRICE_STEP));
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
        priceMax,
      }}
      counts={{ budgetCounts, ageCounts, kmCounts }}
      onToggle={toggleValue}
      onCertifiedChange={(v) => {
        setCertifiedOnly(v);
        setPage(1);
      }}
      onMaxChange={onMaxChange}
      onReset={resetFilters}
      hasActiveFilters={hasActiveFilters}
    />
  );

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

      {/* Active filter chips — shown above the grid, full width */}
      {hasActiveFilters && (
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Active:
          </span>
          {activeChips.map((chip, i) => (
            <button
              key={i}
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
          {/* The filter card's own content (many sections) can be nearly as
              tall as the results column, which leaves position:sticky with
              no room to move within its containing block and makes it look
              broken. Capping the height and scrolling internally guarantees
              it's always shorter than the viewport, so it actually sticks. */}
          <div className="lg:sticky lg:top-24 lg:max-h-[65vh] lg:overflow-y-auto">
            {sidebar}
          </div>
        </aside>

        {/* Mobile filter trigger */}
        <button
          onClick={() => setShowMobileFilters(true)}
          className="flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 lg:hidden"
        >
          <SlidersHorizontal size={16} /> Filters
          {hasActiveFilters && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-red px-1 text-[10px] text-white">
              {activeChips.length}
            </span>
          )}
        </button>

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
  priceMax: number;
};

type SidebarProps = {
  state: FilterState;
  counts: {
    budgetCounts: Map<string, number>;
    ageCounts: Map<string, number>;
    kmCounts: Map<string, number>;
  };
  hasActiveFilters: boolean;
  onToggle: (field: string, value: string) => void;
  onCertifiedChange: (value: boolean) => void;
  onMaxChange: (value: number) => void;
  onReset: () => void;
};

function FilterSidebar(props: SidebarProps) {
  const { state, counts, hasActiveFilters, onToggle, onCertifiedChange, onMaxChange, onReset } = props;

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={18} className="text-brand-red" />
          <h2 className="text-sm font-extrabold uppercase tracking-wide text-slate-900">Filters</h2>
        </div>
        {hasActiveFilters && (
          <button onClick={onReset} className="text-xs font-semibold text-brand-red hover:underline">
            Clear all
          </button>
        )}
      </div>

      <div className="px-5 py-2">
        {/* Budget — quick buckets + range slider */}
        <FilterSection title="Budget" defaultOpen>
          <div className="space-y-2">
            {budgetOptions.map((option) => (
              <FilterCheckbox
                key={option.label}
                label={option.label}
                checked={state.budget.includes(option.label)}
                count={counts.budgetCounts.get(option.label) ?? 0}
                onToggle={() => onToggle('budget', option.label)}
              />
            ))}
          </div>
          <div className="mt-4 rounded-lg bg-slate-50 p-4">
            <p className="mb-3 text-center text-xs font-semibold text-slate-700">
              Up to {formatPrice(state.priceMax)}
            </p>
            <div className="px-2">
              <MaxRangeSlider
                min={MIN_PRICE}
                max={MAX_PRICE}
                step={PRICE_STEP}
                value={state.priceMax}
                onChange={onMaxChange}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
              <span>0</span>
              <span>20L+</span>
            </div>
          </div>
        </FilterSection>

        {/* Kilometers Driven */}
        <FilterSection title="Kilometers Driven">
          <div className="space-y-2">
            {kmOptions.map((option) => (
              <FilterCheckbox
                key={option}
                label={option}
                checked={state.kms.includes(option)}
                count={counts.kmCounts.get(option) ?? 0}
                onToggle={() => onToggle('kms', option)}
              />
            ))}
          </div>
        </FilterSection>

        {/* Body Type */}
        <FilterSection title="Body Type" defaultOpen>
          <FilterIconGrid
            options={uniqueValues('bodyType')}
            icons={bodyTypeIcons}
            fallbackIcon={CarIcon}
            selected={state.bodyType}
            counts={countsFor('bodyType')}
            onToggle={(option) => onToggle('bodyType', option)}
          />
        </FilterSection>

        {/* Make */}
        <FilterSection title="Brand">
          <div className="space-y-2">
            {uniqueValues('make').map((option) => (
              <FilterCheckbox
                key={option}
                label={option}
                icon={<BrandLogo brand={option} size={22} />}
                checked={state.make.includes(option)}
                count={countsFor('make').get(option) ?? 0}
                onToggle={() => onToggle('make', option)}
              />
            ))}
          </div>
        </FilterSection>

        {/* Fuel */}
        <FilterSection title="Fuel Type">
          <FilterIconGrid
            options={uniqueValues('fuel')}
            icons={fuelIcons}
            fallbackIcon={FuelIcon}
            selected={state.fuel}
            counts={countsFor('fuel')}
            onToggle={(option) => onToggle('fuel', option)}
          />
        </FilterSection>

        {/* Transmission */}
        <FilterSection title="Transmission Type">
          <FilterIconGrid
            options={uniqueValues('transmission')}
            icons={transmissionIcons}
            fallbackIcon={Cog}
            selected={state.transmission}
            counts={countsFor('transmission')}
            onToggle={(option) => onToggle('transmission', option)}
          />
        </FilterSection>

        {/* Car Age */}
        <FilterSection title="Car Age">
          <div className="space-y-2">
            {ageOptions.map((option) => (
              <FilterCheckbox
                key={option}
                label={option}
                checked={state.age.includes(option)}
                count={counts.ageCounts.get(option) ?? 0}
                onToggle={() => onToggle('age', option)}
              />
            ))}
          </div>
        </FilterSection>

        {/* Owners */}
        <FilterSection title="Owners">
          <div className="space-y-2">
            {uniqueValues('owners').map((option) => (
              <FilterCheckbox
                key={option}
                label={option}
                checked={state.owners.includes(option)}
                count={countsFor('owners').get(option) ?? 0}
                onToggle={() => onToggle('owners', option)}
              />
            ))}
          </div>
        </FilterSection>

        {/* Seller Type */}
        <FilterSection title="Seller Type">
          <div className="space-y-2">
            {uniqueValues('sellerType').map((option) => (
              <FilterCheckbox
                key={option}
                label={option}
                checked={state.sellerType.includes(option)}
                count={countsFor('sellerType').get(option) ?? 0}
                onToggle={() => onToggle('sellerType', option)}
              />
            ))}
          </div>
        </FilterSection>

        {/* Certification */}
        <FilterSection title="Certification">
          <label className="flex items-center gap-2 py-1.5 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={state.certifiedOnly}
              onChange={(e) => onCertifiedChange(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-brand-red focus:ring-brand-red"
              suppressHydrationWarning
            />
            Certified Cars
          </label>
        </FilterSection>
      </div>

      {/* Footer reset */}
      <div className="border-t border-slate-100 p-4">
        <button
          onClick={onReset}
          className="flex w-full items-center justify-center gap-2 rounded-md border border-slate-300 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-red hover:text-brand-red"
        >
          <RotateCcw size={15} /> Reset Filters
        </button>
      </div>
    </div>
  );
}

/* ------------------------------ Sub-components ----------------------------- */

function FilterSection({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-slate-100 py-4 last:border-0 last:pb-2">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="text-sm font-bold text-slate-900">{title}</span>
        <ChevronDown
          size={16}
          className={`text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-200 ${open ? 'mt-3 max-h-[600px]' : 'max-h-0'}`}>
        {children}
      </div>
    </div>
  );
}

function FilterCheckbox({
  label,
  icon,
  checked,
  count,
  onToggle,
}: {
  label: string;
  icon?: React.ReactNode;
  checked: boolean;
  count: number;
  onToggle: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-2 py-1 text-sm text-slate-700">
      <span className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={onToggle}
          className="h-4 w-4 shrink-0 rounded border-slate-300 text-brand-red focus:ring-brand-red"
          suppressHydrationWarning
        />
        {icon}
        {label}
      </span>
      <span className="text-xs text-slate-400">{count}</span>
    </label>
  );
}

function FilterIconGrid({
  options,
  icons,
  fallbackIcon,
  selected,
  counts,
  onToggle,
}: {
  options: string[];
  icons: Record<string, typeof CarIcon>;
  fallbackIcon: typeof CarIcon;
  selected: string[];
  counts: Map<string, number>;
  onToggle: (option: string) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {options.map((option) => {
        const Icon = icons[option] ?? fallbackIcon;
        const checked = selected.includes(option);
        return (
          <button
            key={option}
            type="button"
            onClick={() => onToggle(option)}
            className={`flex flex-col items-center gap-1.5 rounded-lg border p-3 text-center transition-colors ${
              checked
                ? 'border-brand-red bg-brand-red/5 text-brand-red'
                : 'border-slate-200 text-slate-600 hover:border-brand-red/40'
            }`}
          >
            <Icon size={22} className={checked ? 'text-brand-red' : 'text-slate-400'} />
            <span className="text-[11px] font-semibold leading-tight">{option}</span>
            <span className="text-[10px] text-slate-400">{counts.get(option) ?? 0}</span>
          </button>
        );
      })}
    </div>
  );
}

function MaxRangeSlider({
  min,
  max,
  step,
  value,
  onChange,
}: {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    // Horizontal padding equal to the thumb radius (9px) keeps the track's 0%/100%
    // marks aligned with where the native thumb actually travels to, since a
    // range input's thumb center never reaches the true edge of its own box.
    <div className="relative h-6 select-none px-[9px]">
      {/* Track */}
      <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-slate-200" />
      {/* Active range */}
      <div
        className="absolute left-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-brand-red"
        style={{ right: `${100 - pct}%` }}
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="range-thumb pointer-events-none absolute inset-x-0 top-0 z-20 h-6 w-full appearance-none bg-transparent"
        aria-label="Maximum price"
      />
    </div>
  );
}

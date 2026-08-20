'use client';

import { useState } from 'react';
import {
  Car as CarIcon,
  CarFront,
  Truck,
  Cog,
  Settings,
  Fuel as FuelIcon,
  Zap,
  RotateCcw,
  X,
  ChevronDown,
} from 'lucide-react';
import BrandLogo from '@/components/BrandLogo';
import BodyTypeIcon from '@/components/BodyTypeIcon';
import {
  Car,
  ageOptions,
  budgetOptions,
  cars,
  formatPrice,
} from '@/lib/cars';

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

export interface FilterSidebarState {
  make: string[];
  budget: string[];
  sellerType: string[];
  fuel: string[];
  transmission: string[];
  bodyType: string[];
  age: string[];
  owners: string[];
  kms: string[];
  color: string[];
  certifiedOnly: boolean;
  priceMin: number;
  priceMax: number;
}

export interface FilterSidebarCounts {
  budgetCounts: Map<string, number>;
  ageCounts: Map<string, number>;
  kmCounts: Map<string, number>;
  colorCounts: Map<string, number>;
}

export default function FilterSidebar({
  state,
  counts,
  maxPrice,
  minPrice = 0,
  priceStep = 50000,
  hasActiveFilters,
  onToggle,
  onReset,
  onCertifiedChange,
  onPriceRangeChange,
  onClose,
}: {
  state: FilterSidebarState;
  counts: FilterSidebarCounts;
  maxPrice: number;
  minPrice?: number;
  priceStep?: number;
  hasActiveFilters?: boolean;
  onToggle: (field: string, value: string) => void;
  onReset: () => void;
  onCertifiedChange: (checked: boolean) => void;
  onPriceRangeChange: (minVal: number, maxVal: number) => void;
  onClose?: () => void;
}) {
  return (
    <div className="flex h-full flex-col bg-white">
      {/* Header for mobile */}
      {onClose && (
        <div className="flex items-center justify-between border-b border-slate-100 p-4">
          <h2 className="text-base font-extrabold text-slate-900">Filter Cars</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Filter Sections */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        {/* Price Slider */}
        <FilterSection title="Price Range" defaultOpen={true}>
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span>{formatPrice(state.priceMin)}</span>
              <span>{formatPrice(state.priceMax)}</span>
            </div>
            <PriceRangeSlider
              min={minPrice}
              max={maxPrice}
              step={priceStep}
              minValue={state.priceMin}
              maxValue={state.priceMax}
              onChange={onPriceRangeChange}
            />
          </div>
        </FilterSection>

        {/* Budget options */}
        <FilterSection title="Budget">
          <div className="space-y-2">
            {budgetOptions.map((opt) => (
              <FilterCheckbox
                key={opt.label}
                label={opt.label}
                checked={state.budget.includes(opt.label)}
                count={counts.budgetCounts.get(opt.label) ?? 0}
                onToggle={() => onToggle('budget', opt.label)}
              />
            ))}
          </div>
        </FilterSection>

        {/* Body Type */}
        <FilterSection title="Body Type" defaultOpen={true}>
          <FilterIconGrid
            options={uniqueValues('bodyType')}
            icons={bodyTypeIcons}
            fallbackIcon={CarIcon}
            selected={state.bodyType}
            counts={countsFor('bodyType')}
            onToggle={(option) => onToggle('bodyType', option)}
            isBodyType={true}
          />
        </FilterSection>

        {/* Brand / Make */}
        <FilterSection title="Make / Brand" defaultOpen={true}>
          <div className="space-y-2">
            {uniqueValues('make').map((option) => (
              <FilterCheckbox
                key={option}
                label={option}
                icon={<BrandLogo brand={option} size={18} />}
                hideVisibleLabel
                checked={state.make.includes(option)}
                count={countsFor('make').get(option) ?? 0}
                onToggle={() => onToggle('make', option)}
              />
            ))}
          </div>
        </FilterSection>

        {/* Fuel Type */}
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
        <FilterSection title="Transmission">
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
      <div className={`overflow-hidden transition-all duration-200 overflow-y-auto ${open ? 'mt-3 max-h-[60vh]' : 'max-h-0'}`}>
        {children}
      </div>
    </div>
  );
}

function FilterCheckbox({
  label,
  icon,
  hideVisibleLabel = false,
  checked,
  count,
  onToggle,
}: {
  label: string;
  icon?: React.ReactNode;
  hideVisibleLabel?: boolean;
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
        {hideVisibleLabel ? <span className="sr-only">{label}</span> : label}
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
  isBodyType,
}: {
  options: string[];
  icons: Record<string, typeof CarIcon>;
  fallbackIcon: typeof CarIcon;
  selected: string[];
  counts: Map<string, number>;
  onToggle: (option: string) => void;
  isBodyType?: boolean;
}) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {options.map((option) => {
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
            {isBodyType ? (
              <BodyTypeIcon
                bodyType={option}
                size={22}
                className={checked ? 'text-brand-red' : 'text-slate-400'}
              />
            ) : (
              (() => {
                const Icon = icons[option] ?? fallbackIcon;
                return <Icon size={22} className={checked ? 'text-brand-red' : 'text-slate-400'} />;
              })()
            )}
            <span className="text-[11px] font-semibold leading-tight">{option}</span>
            <span className="text-[10px] text-slate-400">{counts.get(option) ?? 0}</span>
          </button>
        );
      })}
    </div>
  );
}

function PriceRangeSlider({
  min,
  max,
  step,
  minValue,
  maxValue,
  onChange,
}: {
  min: number;
  max: number;
  step: number;
  minValue: number;
  maxValue: number;
  onChange: (minVal: number, maxVal: number) => void;
}) {
  const minPct = ((minValue - min) / (max - min)) * 100;
  const maxPct = ((maxValue - min) / (max - min)) * 100;

  return (
    <div className="relative h-6 select-none px-[9px]">
      {/* Track */}
      <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-slate-200" />
      {/* Active range */}
      <div
        className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-brand-red"
        style={{ left: `${minPct}%`, right: `${100 - maxPct}%` }}
      />
      {/* Min input handle */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={minValue}
        onChange={(e) => {
          const val = Math.min(Number(e.target.value), maxValue - step);
          onChange(val, maxValue);
        }}
        className="range-thumb absolute inset-x-0 top-0 z-20 h-6 w-full appearance-none bg-transparent"
        aria-label="Minimum price"
      />
      {/* Max input handle */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={maxValue}
        onChange={(e) => {
          const val = Math.max(Number(e.target.value), minValue + step);
          onChange(minValue, val);
        }}
        className="range-thumb absolute inset-x-0 top-0 z-30 h-6 w-full appearance-none bg-transparent"
        aria-label="Maximum price"
      />
    </div>
  );
}

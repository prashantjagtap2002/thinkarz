'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ageOptions, bodyTypes, budgetOptions } from '@/lib/cars';
import { Calendar, ChevronDown, IndianRupee, Car, ArrowRight } from 'lucide-react';
import BodyTypeIcon from './BodyTypeIcon';

function CarTypeSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className={`field-input flex items-center justify-between gap-3 text-left w-full !rounded-lg !py-3 !border-slate-200 ${
          open ? '!border-brand-red !ring-1 !ring-brand-red' : 'hover:!border-slate-300'
        }`}
      >
        <span className="flex items-center gap-2.5">
          {value ? (
            <>
              <BodyTypeIcon bodyType={value} size={16} className="text-brand-red" />
              <span className="text-slate-800 font-medium">{value}</span>
            </>
          ) : (
            <>
              <Car size={16} className="text-slate-400" />
              <span className="text-slate-400">All Types</span>
            </>
          )}
        </span>
        <ChevronDown
          size={14}
          className={`shrink-0 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-30 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl max-h-[50vh] overflow-y-auto">
          <button
            type="button"
            onClick={() => {
              onChange('');
              setOpen(false);
            }}
            className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors ${
              value === ''
                ? 'bg-brand-red/8 font-semibold text-brand-red'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Car
              size={18}
              className={value === '' ? 'text-brand-red' : 'text-slate-400'}
            />
            <span>All Types</span>
          </button>
          {bodyTypes.map((type) => {
            const selected = value === type;

            return (
              <button
                key={type}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => {
                  onChange(type);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors ${
                  selected
                    ? 'bg-brand-red/8 font-semibold text-brand-red'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <BodyTypeIcon
                  bodyType={type}
                  size={18}
                  className={selected ? 'text-brand-red' : 'text-slate-400'}
                />
                <span>{type}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function BudgetSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const budgetSteps = ['Any Budget', 'Under 5 Lakh', '5 - 10 Lakh', '10 - 15 Lakh', '15 Lakh+'];
  const budgetIndex = value === '' ? 0 : budgetSteps.indexOf(value);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  const handleSliderChange = (val: number) => {
    if (val === 0) onChange('');
    else onChange(budgetSteps[val]);
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className={`field-input flex items-center justify-between gap-3 text-left w-full !rounded-lg !py-3 !border-slate-200 ${
          open ? '!border-brand-red !ring-1 !ring-brand-red' : 'hover:!border-slate-300'
        }`}
      >
        <span className="flex items-center gap-2.5">
          <IndianRupee size={16} className={value ? 'text-brand-red' : 'text-slate-400'} />
          <span className={value ? 'text-slate-800 font-medium' : 'text-slate-400'}>
            {value || 'Any Budget'}
          </span>
        </span>
        <ChevronDown
          size={14}
          className={`shrink-0 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 sm:right-auto sm:w-72 top-[calc(100%+4px)] z-30 rounded-xl border border-slate-200 bg-white p-4 shadow-xl animate-fade-up max-h-[60vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-semibold text-slate-500">Adjust Budget</span>
            <span className="text-xs font-bold text-brand-red bg-brand-red/5 px-2 py-0.5 rounded">
              {value || 'Any'}
            </span>
          </div>

          <div className="flex flex-col gap-1 py-1">
            <input
              type="range"
              min="0"
              max="4"
              step="1"
              value={budgetIndex}
              onChange={(e) => handleSliderChange(Number(e.target.value))}
              className="accent-brand-red w-full h-1.5 bg-slate-100 rounded-lg cursor-pointer appearance-none"
              aria-label="Adjust budget range"
            />
            <div className="flex justify-between text-[9px] font-semibold text-slate-400 mt-1 select-none">
              <span>Any</span>
              <span>5L</span>
              <span>10L</span>
              <span>15L</span>
              <span>15L+</span>
            </div>
          </div>

          <div className="my-3 h-px bg-slate-100" />

          <div className="flex flex-wrap gap-1.5">
            {budgetSteps.map((step, idx) => {
              if (idx === 0) return null;
              const label = step.replace(' Lakh', 'L').replace('Under ', '<');
              const active = value === step;

              return (
                <button
                  key={step}
                  type="button"
                  onClick={() => onChange(step)}
                  className={`px-2.5 py-1 text-xs rounded-full border transition-all ${
                    active
                      ? 'bg-brand-red border-brand-red text-white font-medium'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                  }`}
                >
                  {label}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => onChange('')}
              className="px-2.5 py-1 text-xs rounded-full border border-dashed border-slate-300 text-slate-500 hover:bg-slate-50"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function AgeSelect({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const ageSteps = ['Any Age', 'Under 1 Year', '1 - 3 Years', '3 - 5 Years', '5+ Years'];
  const ageIndex = value === '' ? 0 : ageSteps.indexOf(value);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, []);

  const handleSliderChange = (val: number) => {
    if (val === 0) onChange('');
    else onChange(ageSteps[val]);
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className={`field-input flex items-center justify-between gap-3 text-left w-full !rounded-lg !py-3 !border-slate-200 ${
          open ? '!border-brand-red !ring-1 !ring-brand-red' : 'hover:!border-slate-300'
        }`}
      >
        <span className="flex items-center gap-2.5">
          <Calendar size={16} className={value ? 'text-brand-red' : 'text-slate-400'} />
          <span className={value ? 'text-slate-800 font-medium' : 'text-slate-400'}>
            {value || 'Any Age'}
          </span>
        </span>
        <ChevronDown
          size={14}
          className={`shrink-0 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 sm:left-auto sm:right-0 sm:w-72 top-[calc(100%+4px)] z-30 rounded-xl border border-slate-200 bg-white p-4 shadow-xl animate-fade-up max-h-[60vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-semibold text-slate-500">Adjust Car Age</span>
            <span className="text-xs font-bold text-brand-red bg-brand-red/5 px-2 py-0.5 rounded">
              {value || 'Any'}
            </span>
          </div>

          <div className="flex flex-col gap-1 py-1">
            <input
              type="range"
              min="0"
              max="4"
              step="1"
              value={ageIndex}
              onChange={(e) => handleSliderChange(Number(e.target.value))}
              className="accent-brand-red w-full h-1.5 bg-slate-100 rounded-lg cursor-pointer appearance-none"
              aria-label="Adjust car age range"
            />
            <div className="flex justify-between text-[9px] font-semibold text-slate-400 mt-1 select-none">
              <span>Any</span>
              <span>1Y</span>
              <span>3Y</span>
              <span>5Y</span>
              <span>5Y+</span>
            </div>
          </div>

          <div className="my-3 h-px bg-slate-100" />

          <div className="flex flex-wrap gap-1.5">
            {ageSteps.map((step, idx) => {
              if (idx === 0) return null;
              const label = step.replace(' Years', 'Y').replace(' Year', 'Y').replace('Under ', '<');
              const active = value === step;

              return (
                <button
                  key={step}
                  type="button"
                  onClick={() => onChange(step)}
                  className={`px-2.5 py-1 text-xs rounded-full border transition-all ${
                    active
                      ? 'bg-brand-red border-brand-red text-white font-medium'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                  }`}
                >
                  {label}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => onChange('')}
              className="px-2.5 py-1 text-xs rounded-full border border-dashed border-slate-300 text-slate-500 hover:bg-slate-50"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function HeroSearchWidget() {
  const router = useRouter();
  const [budget, setBudget] = useState('');
  const [bodyType, setBodyType] = useState('');
  const [age, setAge] = useState('');

  function handleSearch() {
    const params = new URLSearchParams();
    if (bodyType) params.set('bodyType', bodyType);
    if (budget) params.set('budget', budget);
    if (age) params.set('age', age);
    router.push(`/pre-owned-cars${params.toString() ? `?${params.toString()}` : ''}`);
  }

  return (
    <div className="relative z-10 overflow-visible">
      <div className="flex flex-col gap-4">
        {/* Filter Fields */}
        <div className="flex flex-col gap-3">
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Budget
            </label>
            <BudgetSelect value={budget} onChange={setBudget} />
          </div>
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Car Type
            </label>
            <CarTypeSelect value={bodyType} onChange={setBodyType} />
          </div>
          <div>
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Car Age
            </label>
            <AgeSelect value={age} onChange={setAge} />
          </div>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-brand-red to-[#cc181f] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-red/20 transition-all duration-300 hover:shadow-xl hover:shadow-brand-red/30 hover:-translate-y-0.5 active:translate-y-0 w-full"
        >
          Search Cars
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

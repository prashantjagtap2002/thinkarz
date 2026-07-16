'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ageOptions, bodyTypes, budgetOptions } from '@/lib/cars';
import { Calendar, ChevronDown, IndianRupee, Car } from 'lucide-react';
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
        className={`field-input flex items-center justify-between gap-3 text-left ${
          open ? 'border-brand-red ring-1 ring-brand-red' : ''
        }`}
      >
        <span className="flex items-center gap-2.5">
          {value ? (
            <>
              <BodyTypeIcon bodyType={value} size={16} className="text-brand-red" />
              <span>{value}</span>
            </>
          ) : (
            <>
              <Car size={16} className="text-slate-400" />
              <span>Select Car Type</span>
            </>
          )}
        </span>
        <ChevronDown
          size={16}
          className={`shrink-0 text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
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
            <span>Select Car Type</span>
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

export default function HeroSearchWidget() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
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
    <div className="reveal-motion is-visible relative z-10 mt-8 overflow-visible rounded-2xl border border-white/20 bg-white/95 shadow-2xl backdrop-blur-md transition-all duration-500">
      <div className="flex border-b border-slate-200 rounded-t-2xl overflow-hidden">
        <button
          onClick={() => setActiveTab('buy')}
          className={`flex-1 py-4 text-sm font-bold transition-colors rounded-tl-2xl ${
            activeTab === 'buy'
              ? 'border-b-2 border-brand-red bg-white text-brand-red'
              : 'bg-slate-50 text-slate-500 hover:text-slate-800'
          }`}
        >
          Buy a Car
        </button>
        <button
          onClick={() => setActiveTab('sell')}
          className={`flex-1 py-4 text-sm font-bold transition-colors rounded-tr-2xl ${
            activeTab === 'sell'
              ? 'border-b-2 border-brand-red bg-white text-brand-red'
              : 'bg-slate-50 text-slate-500 hover:text-slate-800'
          }`}
        >
          Sell Your Car
        </button>
      </div>

      <div className="p-5 sm:p-6">
        {activeTab === 'buy' ? (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="relative">
                <label className="field-label flex items-center gap-1.5">
                  <IndianRupee size={14} /> Budget
                </label>
                <select
                  className="field-input"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                >
                  <option value="">Select Budget</option>
                  {budgetOptions.map((b) => (
                    <option key={b.label} value={b.label}>
                      {b.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative">
                <label className="field-label flex items-center gap-1.5">
                  <Car size={14} /> Car Type
                </label>
                <CarTypeSelect value={bodyType} onChange={setBodyType} />
              </div>
              <div className="relative">
                <label className="field-label flex items-center gap-1.5">
                  <Calendar size={14} /> Car Age
                </label>
                <select className="field-input" value={age} onChange={(e) => setAge(e.target.value)}>
                  <option value="">Select Year</option>
                  {ageOptions.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              onClick={handleSearch}
              className="btn btn-primary mt-6 w-full bg-gradient-to-r from-brand-red to-[#cc181f] py-3.5 text-base hover:shadow-brand-red/30"
            >
              Search Cars
            </button>
          </>
        ) : (
          <div className="py-6 text-center">
            <h3 className="mb-2 text-lg font-bold text-slate-900">Get the best price for your car</h3>
            <p className="mb-6 text-sm text-slate-600">
              Instant valuation, hassle-free paperwork, and payment in 24 hours.
            </p>
            <button
              onClick={() => router.push('/sell-your-car')}
              className="btn btn-primary w-full bg-gradient-to-r from-brand-red to-[#cc181f] py-3.5 text-base hover:shadow-brand-red/30"
            >
              Get Free Valuation
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

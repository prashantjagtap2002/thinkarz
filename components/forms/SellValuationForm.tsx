'use client';

import { useState } from 'react';
import { BadgeIndianRupee } from 'lucide-react';
import SubmittableForm, { FieldError } from '@/components/forms/SubmittableForm';

const BASE_VALUE: Record<string, number> = {
  Hatchback: 500000,
  Sedan: 700000,
  SUV: 1000000,
  Electric: 1200000,
};

const currentYear = new Date().getFullYear();

function estimatePrice(model: string, year: string, kms: string) {
  const base = BASE_VALUE[model];
  const yearNum = Number(year);
  const kmsNum = Number(kms);
  if (!base || !yearNum || !kmsNum) return null;

  const age = Math.max(0, currentYear - yearNum);
  const ageDepreciation = 1 - Math.min(age * 0.06, 0.6);
  const kmDepreciation = 1 - Math.min((kmsNum / 100000) * 0.1, 0.3);
  const estimate = base * ageDepreciation * kmDepreciation;

  return { low: Math.round((estimate * 0.9) / 5000) * 5000, high: Math.round((estimate * 1.05) / 5000) * 5000 };
}

function formatRupees(value: number) {
  return `Rs. ${(value / 100000).toFixed(2)} Lakh`;
}

export default function SellValuationForm() {
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [kms, setKms] = useState('');

  const estimate = estimatePrice(model, year, kms);

  function resetValuationFields() {
    setModel('');
    setYear('');
    setKms('');
  }

  return (
    <SubmittableForm
      formType="Sell Your Car / Valuation Form"
      submitLabel="Get Valuation"
      successTitle="Valuation Request Received!"
      successMessage="Our team will get back to you shortly to confirm your car's final value."
      className="space-y-5"
      onSubmit={resetValuationFields}
      validations={[
        { name: 'phone', pattern: '^[6-9]\\d{9}$', message: 'Enter a valid 10-digit mobile number' },
        { name: 'email', pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$', message: 'Enter a valid email address' },
      ]}
      successExtra={
        estimate && (
          <div className="mt-5 w-full rounded-xl bg-white p-4 text-left">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <BadgeIndianRupee size={16} className="text-brand-red" />
              Estimated Value
            </div>
            <p className="mt-1 text-xl font-extrabold text-slate-900">
              {formatRupees(estimate.low)} - {formatRupees(estimate.high)}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Final price may vary after physical inspection.
            </p>
          </div>
        )
      }
    >
      <div>
        <label htmlFor="regNumber" className="mb-1.5 block text-[13px] font-semibold text-[#334155]">Registration Number</label>
        <input id="regNumber" name="regNumber" required className="h-[42px] w-full rounded-[6px] border border-[#cbd5e1] bg-white px-3.5 text-[14px] text-[#334155] outline-none placeholder:font-normal placeholder:text-[#94a3b8] focus:border-[#e31e24] focus:ring-1 focus:ring-[#e31e24]" placeholder="e.g. MH01AB1234" />
        <FieldError name="regNumber" />
      </div>
      <div>
        <label htmlFor="carModel" className="mb-1.5 block text-[13px] font-semibold text-[#334155]">Car Model</label>
        <input
          id="carModel"
          name="carModel"
          required
          className="h-[42px] w-full rounded-[6px] border border-[#cbd5e1] bg-white px-3.5 text-[14px] text-[#334155] outline-none placeholder:font-normal placeholder:text-[#94a3b8] focus:border-[#e31e24] focus:ring-1 focus:ring-[#e31e24]"
          list="car-model-options"
          placeholder="Type or select your car model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
        <datalist id="car-model-options">
          <option value="Hatchback" />
          <option value="Sedan" />
          <option value="SUV" />
          <option value="Electric" />
        </datalist>
        <FieldError name="carModel" />
      </div>
      <div>
        <label htmlFor="year" className="mb-1.5 block text-[13px] font-semibold text-[#334155]">Manufacturing Year</label>
        <select
          id="year"
          name="year"
          required
          className="h-[42px] w-full rounded-[6px] border border-[#cbd5e1] bg-white px-3.5 text-[14px] text-[#334155] outline-none placeholder:font-normal placeholder:text-[#94a3b8] focus:border-[#e31e24] focus:ring-1 focus:ring-[#e31e24] appearance-none"
          value={year}
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'16\' height=\'16\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%2394a3b8\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'m6 9 6 6 6-6\'/%3E%3C/svg%3E")', backgroundPosition: 'right 12px center', backgroundRepeat: 'no-repeat' }}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="" disabled>
            Select Year
          </option>
          {Array.from({ length: 12 }).map((_, i) => (
            <option key={i}>{2024 - i}</option>
          ))}
        </select>
        <FieldError name="year" />
      </div>
      <div>
        <label htmlFor="kms" className="mb-1.5 block text-[13px] font-semibold text-[#334155]">Kilometer Driven</label>
        <input
          id="kms"
          name="kms"
          required
          type="number"
          min={0}
          step={1}
          className="h-[42px] w-full rounded-[6px] border border-[#cbd5e1] bg-white px-3.5 text-[14px] text-[#334155] outline-none placeholder:font-normal placeholder:text-[#94a3b8] focus:border-[#e31e24] focus:ring-1 focus:ring-[#e31e24]"
          placeholder="e.g. 20,000 km"
          value={kms}
          onChange={(e) => setKms(e.target.value)}
        />
        <FieldError name="kms" />
      </div>
      <div>
        <label htmlFor="phone" className="mb-1.5 block text-[13px] font-semibold text-[#334155]">Phone Number</label>
        <input
          id="phone"
          name="phone"
          required
          type="tel"
          className="h-[42px] w-full rounded-[6px] border border-[#cbd5e1] bg-white px-3.5 text-[14px] text-[#334155] outline-none placeholder:font-normal placeholder:text-[#94a3b8] focus:border-[#e31e24] focus:ring-1 focus:ring-[#e31e24]"
          placeholder="Enter your phone number"
        />
        <FieldError name="phone" />
      </div>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-[13px] font-semibold text-[#334155]">Email ID</label>
        <input
          id="email"
          name="email"
          required
          type="email"
          className="h-[42px] w-full rounded-[6px] border border-[#cbd5e1] bg-white px-3.5 text-[14px] text-[#334155] outline-none placeholder:font-normal placeholder:text-[#94a3b8] focus:border-[#e31e24] focus:ring-1 focus:ring-[#e31e24]"
          placeholder="Enter your email ID"
        />
        <FieldError name="email" />
      </div>
    </SubmittableForm>
  );
}

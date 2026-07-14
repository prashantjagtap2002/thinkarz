'use client';

import { useState } from 'react';
import { BadgeIndianRupee } from 'lucide-react';
import SubmittableForm from '@/components/forms/SubmittableForm';

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

  return (
    <SubmittableForm
      submitLabel="Get Valuation"
      successTitle="Valuation Request Received!"
      successMessage="Our team will get back to you shortly to confirm your car's final value."
      className="space-y-5"
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
        <label className="field-label">Registration Number</label>
        <input required className="field-input" placeholder="e.g. MH01AB1234" />
      </div>
      <div>
        <label className="field-label">Car Model</label>
        <select
          required
          className="field-input"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        >
          <option value="" disabled>
            Select Model
          </option>
          <option>Hatchback</option>
          <option>Sedan</option>
          <option>SUV</option>
          <option>Electric</option>
        </select>
      </div>
      <div>
        <label className="field-label">Manufacturing Year</label>
        <select
          required
          className="field-input"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="" disabled>
            Select Year
          </option>
          {Array.from({ length: 12 }).map((_, i) => (
            <option key={i}>{2024 - i}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="field-label">Kilometer Driven</label>
        <input
          required
          type="number"
          min={0}
          step={1}
          className="field-input"
          placeholder="e.g. 20,000 km"
          value={kms}
          onChange={(e) => setKms(e.target.value)}
        />
      </div>
      <div>
        <label className="field-label">Phone Number</label>
        <input
          required
          type="tel"
          className="field-input"
          placeholder="Enter your phone number"
        />
      </div>
      <div>
        <label className="field-label">Email ID</label>
        <input
          required
          type="email"
          className="field-input"
          placeholder="Enter your email ID"
        />
      </div>
    </SubmittableForm>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ageOptions, bodyTypes, budgetOptions } from '@/lib/cars';

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
    <div className="reveal-motion is-visible mt-8 rounded-xl bg-white p-5 shadow-xl transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-2xl sm:p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="field-label">Budget</label>
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
        <div>
          <label className="field-label">Car Type</label>
          <select
            className="field-input"
            value={bodyType}
            onChange={(e) => setBodyType(e.target.value)}
          >
            <option value="">Select Car Type</option>
            {bodyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="field-label">Car Age</label>
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
      <button onClick={handleSearch} className="btn btn-primary mt-4 w-full sm:w-auto">
        Search Cars
      </button>
    </div>
  );
}

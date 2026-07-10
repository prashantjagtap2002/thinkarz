'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { bodyTypes } from '@/lib/cars';

const budgetOptions = [
  { label: 'Under 5 Lakh', max: 500000 },
  { label: '5 - 10 Lakh', min: 500000, max: 1000000 },
  { label: '10 - 15 Lakh', min: 1000000, max: 1500000 },
  { label: '15 Lakh+', min: 1500000 },
];

const ageOptions = ['Under 1 Year', '1 - 3 Years', '3 - 5 Years', '5+ Years'];

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
    <div className="mt-8 rounded-xl bg-white p-5 shadow-xl sm:p-6">
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

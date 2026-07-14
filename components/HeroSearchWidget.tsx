'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ageOptions, bodyTypes, budgetOptions } from '@/lib/cars';
import { Car, IndianRupee, Calendar } from 'lucide-react';

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
    <div className="reveal-motion is-visible mt-8 rounded-2xl bg-white/95 backdrop-blur-md shadow-2xl transition-all duration-500 border border-white/20 overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab('buy')}
          className={`flex-1 py-4 text-sm font-bold transition-colors ${
            activeTab === 'buy' ? 'bg-white text-brand-red border-b-2 border-brand-red' : 'bg-slate-50 text-slate-500 hover:text-slate-800'
          }`}
        >
          Buy a Car
        </button>
        <button
          onClick={() => setActiveTab('sell')}
          className={`flex-1 py-4 text-sm font-bold transition-colors ${
            activeTab === 'sell' ? 'bg-white text-brand-red border-b-2 border-brand-red' : 'bg-slate-50 text-slate-500 hover:text-slate-800'
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
                <label className="field-label flex items-center gap-1.5"><IndianRupee size={14}/> Budget</label>
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
                <label className="field-label flex items-center gap-1.5"><Car size={14}/> Car Type</label>
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
              <div className="relative">
                <label className="field-label flex items-center gap-1.5"><Calendar size={14}/> Car Age</label>
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
            <button onClick={handleSearch} className="btn btn-primary mt-6 w-full text-base py-3.5 bg-gradient-to-r from-brand-red to-[#cc181f] hover:shadow-brand-red/30">
              Search Cars
            </button>
          </>
        ) : (
          <div className="text-center py-6">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Get the best price for your car</h3>
            <p className="text-sm text-slate-600 mb-6">Instant valuation, hassle-free paperwork, and payment in 24 hours.</p>
            <button onClick={() => router.push('/sell-your-car')} className="btn btn-primary w-full text-base py-3.5 bg-gradient-to-r from-brand-red to-[#cc181f] hover:shadow-brand-red/30">
              Get Free Valuation
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

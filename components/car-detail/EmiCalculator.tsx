'use client';

import { useMemo, useState } from 'react';

const tenureOptions = [12, 24, 36, 48, 60];

function formatRupees(n: number) {
  return `Rs. ${Math.round(n).toLocaleString('en-IN')}`;
}

export default function EmiCalculator({ price }: { price: number }) {
  const [downPayment, setDownPayment] = useState(Math.round(price * 0.2));
  const [tenure, setTenure] = useState(60);
  const [rate, setRate] = useState(9.5);

  const { emi, principal, totalInterest, totalPayment } = useMemo(() => {
    const p = Math.max(price - downPayment, 0);
    const monthlyRate = rate / 12 / 100;
    const factor = Math.pow(1 + monthlyRate, tenure);
    const monthlyEmi = monthlyRate === 0 ? p / tenure : (p * monthlyRate * factor) / (factor - 1);
    const total = monthlyEmi * tenure;
    return {
      emi: monthlyEmi,
      principal: p,
      totalInterest: total - p,
      totalPayment: total,
    };
  }, [price, downPayment, tenure, rate]);

  return (
    <div className="rounded-2xl border border-slate-200 p-6 sm:p-8">
      <h2 className="mb-1 text-xl font-extrabold text-slate-900">EMI Calculator</h2>
      <p className="mb-6 text-sm text-slate-500">Estimate your monthly installment for this car.</p>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_280px]">
        <div className="space-y-6">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-700">Down Payment</label>
              <span className="text-sm font-semibold text-slate-900">
                {formatRupees(downPayment)}
              </span>
            </div>
            <input
              type="range"
              min={Math.round(price * 0.1)}
              max={Math.round(price * 0.8)}
              step={5000}
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full accent-brand-red"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-semibold text-slate-700">Interest Rate (p.a.)</label>
              <span className="text-sm font-semibold text-slate-900">{rate.toFixed(1)}%</span>
            </div>
            <input
              type="range"
              min={7}
              max={14}
              step={0.1}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full accent-brand-red"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Loan Tenure</label>
            <div className="flex flex-wrap gap-2">
              {tenureOptions.map((t) => (
                <button
                  key={t}
                  onClick={() => setTenure(t)}
                  className={`rounded-md border px-4 py-2 text-sm font-semibold ${
                    tenure === t
                      ? 'border-brand-red bg-brand-red text-white'
                      : 'border-slate-300 text-slate-600 hover:border-brand-red'
                  }`}
                >
                  {t} mo
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-slate-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Monthly EMI
          </p>
          <p className="mb-4 text-3xl font-extrabold text-brand-red">{formatRupees(emi)}</p>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-500">Loan Amount</dt>
              <dd className="font-semibold text-slate-900">{formatRupees(principal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Total Interest</dt>
              <dd className="font-semibold text-slate-900">{formatRupees(totalInterest)}</dd>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-2">
              <dt className="text-slate-500">Total Payment</dt>
              <dd className="font-semibold text-slate-900">{formatRupees(totalPayment)}</dd>
            </div>
          </dl>
        </div>
      </div>
      <p className="mt-4 text-xs text-slate-400">
        Indicative EMI for illustration only. Actual rates depend on lender and eligibility.
      </p>
    </div>
  );
}

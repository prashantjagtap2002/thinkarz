'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { X, CheckCircle2 } from 'lucide-react';
import { Car, formatPrice } from '@/lib/cars';

interface MakeOfferModalProps {
  car: Car;
  onClose: () => void;
}

export default function MakeOfferModal({ car, onClose }: MakeOfferModalProps) {
  const [mounted, setMounted] = useState(false);
  const [offerValue, setOfferValue] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [selectedChipIndex, setSelectedChipIndex] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  // Calculate chip offers: 0%, 2%, 4%, 6%, 8%, 10% discount
  const discountSteps = [0, 0.02, 0.04, 0.06, 0.08, 0.10];
  const chips = discountSteps.map((discount) => {
    const discountedPrice = car.price * (1 - discount);
    const lakhs = discountedPrice / 100000;
    const formatted = `${lakhs.toFixed(2).replace(/\.00$/, '')} Lakh`;
    return {
      label: formatted,
      rawVal: discountedPrice,
    };
  });

  const handleChipClick = (index: number, val: number) => {
    setSelectedChipIndex(index);
    setOfferValue(`Rs. ${Math.round(val).toLocaleString('en-IN')}`);
  };

  const handleInputChange = (val: string) => {
    setSelectedChipIndex(null);
    setOfferValue(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!offerValue.trim()) return;
    setSubmitted(true);
  };

  return createPortal(
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
      <div 
        className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl p-6 overflow-hidden flex flex-col gap-5 border border-slate-100 transition-all duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
        >
          <X size={18} />
        </button>

        {submitted ? (
          <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 size={36} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Offer Submitted!</h3>
              <p className="mt-2 text-sm text-slate-500 max-w-sm">
                Thank you for your offer of <span className="font-semibold text-slate-900">{offerValue}</span>. Our representative will contact you shortly to discuss.
              </p>
            </div>
            <button 
              onClick={onClose}
              className="mt-4 btn btn-primary px-8"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex gap-4 items-center">
              <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border border-slate-100">
                <Image src={car.image} alt={`${car.make} ${car.model}`} fill className="object-cover" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-slate-900">Make Offer</h3>
                <p className="text-sm font-medium text-slate-500 leading-none mt-1">
                  {car.make} {car.model} {car.variant}
                </p>
              </div>
            </div>

            {/* Details Box */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Car Price</span>
                <span className="font-bold text-slate-900">{formatPrice(car.price)}</span>
              </div>
              <div className="border-t border-slate-200" />
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Total Interested Buyers</span>
                <span className="font-bold text-slate-900">-</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-slate-900 text-left">
                  How much do you want to offer?
                </h4>
                
                {/* Scrollable Chips */}
                <div className="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar scroll-smooth">
                  {chips.map((chip, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleChipClick(idx, chip.rawVal)}
                      className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium border transition-all ${
                        selectedChipIndex === idx
                          ? 'border-brand-red bg-brand-red/5 text-brand-red'
                          : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400'
                      }`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>

                {/* Custom Input */}
                <input
                  type="text"
                  required
                  value={offerValue}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder="Enter custom offer amount (e.g. Rs. 4,20,000)"
                  className="field-input w-full mt-2"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full rounded-xl bg-brand-red hover:bg-brand-red/90 text-white font-bold py-3 text-sm shadow-md transition-colors mt-2"
              >
                Submit
              </button>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}

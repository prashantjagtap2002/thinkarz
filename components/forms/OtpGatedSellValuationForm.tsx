'use client';

import { FormEvent, useEffect, useState } from 'react';
import { PhoneCall, ShieldCheck, X, CheckCircle2, BadgeIndianRupee } from 'lucide-react';
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

type PopupStep = 'otp' | 'form' | 'success';

export default function OtpGatedSellValuationForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<PopupStep>('otp');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [kms, setKms] = useState('');

  const estimate = estimatePrice(model, year, kms);

  function closePopup() {
    setIsOpen(false);
  }

  function validatePhone(value: string) {
    if (!value.trim()) {
      setPhoneError('Phone number is required');
      return false;
    }
    if (!/^[6-9]\d{9}$/.test(value.replace(/\s/g, ''))) {
      setPhoneError('Enter a valid 10-digit mobile number');
      return false;
    }
    setPhoneError('');
    return true;
  }

  function handleSendOtp(e: FormEvent) {
    e.preventDefault();
    const clean = phone.replace(/\s/g, '');
    if (!validatePhone(clean)) return;
    setIsLoading(true);
    setPhone(clean);
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
      setOtp('');
      setOtpError('');
      setIsOpen(true);
    }, 1200);
  }

  function handleVerifyOtp(e: FormEvent) {
    e.preventDefault();
    if (otp.length < 4) {
      setOtpError('Please enter the 4-digit OTP');
      return;
    }
    setIsLoading(true);
    setOtpError('');
    setTimeout(() => {
      setIsLoading(false);
      setStep('form');
    }, 800);
  }

  function handleFormSuccess() {
    setStep('success');
    setModel('');
    setYear('');
    setKms('');
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <div id="valuation-form" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-[22px] font-bold text-slate-900">Request a Free Valuation</h2>
        <p className="mb-6 text-[13px] text-slate-500 leading-relaxed mt-1">
          Enter your car details and our team will get back to you with an expert valuation estimate.
        </p>

        <form onSubmit={handleSendOtp}>
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fef2f2] text-[#e31e24]">
              <PhoneCall size={18} strokeWidth={2} />
            </div>
            <div>
              <p className="text-[14px] font-bold text-slate-900 leading-tight">Enter your number</p>
              <p className="text-[12px] text-slate-500 mt-0.5">We'll send a verification code</p>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="sell-phone" className="mb-1.5 block text-[13px] font-semibold text-slate-700">Mobile Number</label>
            <div className="flex h-[42px] overflow-hidden rounded-[6px] border border-[#cbd5e1] bg-white focus-within:border-[#e31e24] focus-within:ring-1 focus-within:ring-[#e31e24]">
              <div className="flex items-center justify-center border-r border-[#cbd5e1] bg-white px-3.5 text-[14px] text-slate-600">
                +91
              </div>
              <input
                id="sell-phone"
                type="tel"
                maxLength={10}
                placeholder="9876543210"
                value={phone}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                  setPhone(val);
                  if (phoneError) validatePhone(val);
                }}
                className="flex-1 bg-transparent px-3 text-[14px] text-slate-900 outline-none placeholder:text-[#94a3b8]"
              />
            </div>
            {phoneError && <p className="mt-1.5 text-[12px] text-red-600">{phoneError}</p>}
          </div>

          <button type="submit" disabled={isLoading} className="h-[42px] w-full rounded-[6px] bg-[#e31e24] text-[14px] font-semibold text-white transition-colors hover:bg-[#c81a20] disabled:opacity-70">
            {isLoading ? 'Sending...' : 'Send OTP'}
          </button>

          <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
            <ShieldCheck size={14} />
            <p>Your number is safe with us. No spam.</p>
          </div>
        </form>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closePopup} />

          <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl animate-fade-up">
            <button
              onClick={closePopup}
              className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-700"
              aria-label="Close"
            >
              <X size={16} />
            </button>

            {step !== 'success' && (
              <div className="p-6 sm:p-8">
                <h2 className="text-[22px] font-bold text-slate-900">Request a Free Valuation</h2>
                <p className="mb-6 text-[13px] text-slate-500 leading-relaxed mt-1">
                  Enter your car details and our team will get back to you with an expert valuation estimate.
                </p>

                {step === 'otp' && (
                  <form onSubmit={handleVerifyOtp}>
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#fef2f2] text-[#e31e24]">
                        <ShieldCheck size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">Verify OTP</p>
                        <p className="text-xs text-slate-500">
                          Sent to <span className="font-semibold text-slate-700">+91 {phone}</span>
                        </p>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="sell-otp" className="mb-1.5 block text-[13px] font-semibold text-[#334155]">One-Time Password</label>
                      <input
                        id="sell-otp"
                        type="text"
                        inputMode="numeric"
                        maxLength={4}
                        placeholder="0000"
                        value={otp}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                          setOtp(val);
                          if (otpError && val.length === 4) setOtpError('');
                        }}
                        className="h-[42px] w-full rounded-[6px] border border-[#cbd5e1] bg-white px-3.5 text-center text-lg font-bold tracking-[0.5em] outline-none focus:border-[#e31e24] focus:ring-1 focus:ring-[#e31e24]"
                        autoFocus
                      />
                      {otpError && <p className="mt-1 text-xs text-red-600">{otpError}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading || otp.length < 4}
                      className="mt-4 h-[42px] w-full rounded-[6px] bg-[#e31e24] text-[14px] font-semibold text-white transition-colors hover:bg-[#c81a20] disabled:opacity-50"
                    >
                      {isLoading ? 'Verifying...' : 'Verify OTP'}
                    </button>

                    <p className="mt-3 text-center text-[11px] text-slate-400">
                      Enter any 4-digit code to proceed.
                    </p>
                  </form>
                )}

                {step === 'form' && (
                  <SubmittableForm
                    formType="Sell Your Car / Valuation Form"
                    submitLabel="Get Valuation"
                    successTitle="Valuation Request Received!"
                    successMessage="Our team will get back to you shortly to confirm your car's final value."
                    className="space-y-4 max-h-[60vh] overflow-y-auto pr-2"
                    onSubmit={handleFormSuccess}
                    validations={[
                      { name: 'email', pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$', message: 'Enter a valid email address' },
                    ]}
                    successExtra={
                      estimate && (
                        <div className="mt-5 w-full rounded-xl bg-slate-50 p-4 text-left border border-slate-200">
                          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                            <BadgeIndianRupee size={16} className="text-[#e31e24]" />
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
                    <input type="hidden" name="mobile" value={phone} />
                    <input type="hidden" name="phone" value={phone} />

                    <div className="rounded-lg border border-[#cbd5e1] bg-slate-50 px-4 py-3 mb-2">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-[#e31e24]">Verified Number</p>
                      <p className="text-sm font-bold text-slate-900">+91 {phone}</p>
                    </div>

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
                )}
              </div>
            )}

            {step === 'success' && (
              <div className="flex flex-col items-center justify-center px-6 py-16 text-center sm:px-8">
                <CheckCircle2 className="mb-4 text-green-600" size={48} />
                <h3 className="text-xl font-extrabold text-slate-900">Valuation Request Received!</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600">
                  Our team will get back to you shortly to confirm your car's final value.
                </p>
                <button onClick={closePopup} className="btn btn-primary mt-8">
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

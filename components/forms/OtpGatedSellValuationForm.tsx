'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { PhoneCall, ShieldCheck, X, CheckCircle2, BadgeIndianRupee, ChevronDown, AlertCircle } from 'lucide-react';
import SubmittableForm, { FieldError } from '@/components/forms/SubmittableForm';
import CountryCodeSelect from '@/components/forms/CountryCodeSelect';
import { sendWhatsAppOtp, verifyWhatsAppOtp } from '@/app/actions/otp';
import { useVerifiedPhone } from '@/lib/verifiedPhone';

const currentYear = new Date().getFullYear();

function estimatePrice(brand: string, model: string, year: string, kms: string) {
  const yearNum = Number(year);
  const kmsNum = Number(kms);
  if (!yearNum || !kmsNum) return null;

  let base = 800000;
  const combined = `${brand} ${model}`.toLowerCase();

  if (combined.includes('ev') || combined.includes('electric')) {
    base = 1200000;
  } else if (
    combined.includes('bmw') ||
    combined.includes('mercedes') ||
    combined.includes('audi') ||
    combined.includes('jaguar') ||
    combined.includes('porsche')
  ) {
    base = 3500000;
  } else if (
    combined.includes('fortuner') ||
    combined.includes('endeavour') ||
    combined.includes('thar') ||
    combined.includes('xuv700') ||
    combined.includes('harrier') ||
    combined.includes('safari') ||
    combined.includes('suv')
  ) {
    base = 1500000;
  } else if (
    combined.includes('city') ||
    combined.includes('verna') ||
    combined.includes('ciaz') ||
    combined.includes('slavia') ||
    combined.includes('virtus') ||
    combined.includes('sedan')
  ) {
    base = 900000;
  } else if (
    combined.includes('swift') ||
    combined.includes('baleno') ||
    combined.includes('i20') ||
    combined.includes('altroz') ||
    combined.includes('wagon') ||
    combined.includes('hatchback')
  ) {
    base = 600000;
  }

  const age = Math.max(0, currentYear - yearNum);
  const ageDepreciation = 1 - Math.min(age * 0.06, 0.6);
  const kmDepreciation = 1 - Math.min((kmsNum / 100000) * 0.1, 0.3);
  const estimate = base * ageDepreciation * kmDepreciation;

  return { low: Math.round((estimate * 0.9) / 5000) * 5000, high: Math.round((estimate * 1.05) / 5000) * 5000 };
}

function formatRupees(value: number) {
  return `Rs. ${(value / 100000).toFixed(2)} Lakh`;
}

export default function OtpGatedSellValuationForm() {
  const { verifiedData, isVerified, saveVerification, resetVerification } = useVerifiedPhone();
  const [step, setStep] = useState<'phone' | 'form' | 'success'>('phone');
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [otp, setOtp] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [hasConsent, setHasConsent] = useState(false);
  const [consentError, setConsentError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [serverHash, setServerHash] = useState('');
  const isMountedRef = useRef(true);

  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [kms, setKms] = useState('');

  const estimate = estimatePrice(brand, model, year, kms);

  // Sync state with verified phone data if available
  useEffect(() => {
    if (verifiedData) {
      setPhone(verifiedData.phone);
      setCountryCode(verifiedData.countryCode);
      setStep('form');
    }
  }, [verifiedData]);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const [showReverifyModal, setShowReverifyModal] = useState(false);

  function handleReverify() {
    setShowReverifyModal(true);
  }

  function confirmReverify() {
    setShowReverifyModal(false);
    resetVerification();
    setPhone('');
    setOtp('');
    setStep('phone');
  }

  function validatePhone(value: string, code = countryCode) {
    if (!value.trim()) {
      setPhoneError('Phone number is required');
      return false;
    }
    if (code === '+91') {
      if (!/^[6-9]\d{9}$/.test(value.replace(/\s/g, ''))) {
        setPhoneError('Enter a valid 10-digit mobile number');
        return false;
      }
    } else {
      if (!/^\d{7,15}$/.test(value.replace(/\s/g, ''))) {
        setPhoneError('Enter a valid mobile number');
        return false;
      }
    }
    setPhoneError('');
    return true;
  }

  async function handleSendOtp(e: FormEvent) {
    e.preventDefault();
    const clean = phone.replace(/\s/g, '');
    if (!validatePhone(clean)) return;
    if (!hasConsent) {
      setConsentError('Please agree to the Terms & Conditions and Privacy Policy');
      return;
    }
    setIsLoading(true);
    setPhone(clean);

    try {
      const res = await sendWhatsAppOtp(countryCode, clean);
      if (!isMountedRef.current) return;
      setIsLoading(false);

      if (res.success && res.hash) {
        setServerHash(res.hash);
        setShowOtpPopup(true);
      } else {
        setPhoneError(res.error || 'Failed to send OTP');
      }
    } catch (err) {
      console.error('Client action error:', err);
      setIsLoading(false);
      setPhoneError('Server unreachable. Please try again.');
    }
  }

  async function handleVerifyOtp(e: FormEvent) {
    e.preventDefault();
    if (otp.length < 4) {
      setOtpError('Please enter the 4-digit OTP');
      return;
    }
    setIsLoading(true);
    setOtpError('');

    try {
      const res = await verifyWhatsAppOtp(countryCode, phone, otp, serverHash);
      if (!isMountedRef.current) return;
      setIsLoading(false);

      if (res.success) {
        saveVerification(phone, countryCode);
        setShowOtpPopup(false);
        setStep('form');
      } else {
        setOtpError(res.error || 'Invalid OTP');
      }
    } catch (err) {
      console.error('Client verify error:', err);
      setIsLoading(false);
      setOtpError('Server unreachable. Please try again.');
    }
  }

  function handleFormSuccess() {
    setStep('success');
  }

  function closeOtpPopup() {
    setShowOtpPopup(false);
    setOtp('');
    setOtpError('');
  }

  const selectStyle = {
    backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'16\' height=\'16\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%2394a3b8\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'m6 9 6 6 6-6\'/%3E%3C/svg%3E")',
    backgroundPosition: 'right 12px center',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div id="valuation-form" className="flex h-fit flex-col justify-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10 lg:p-12">
      <div className="mx-auto w-full">
        {step === 'phone' && (
          <form onSubmit={handleSendOtp} className="text-center sm:text-left">
            <h2 className="text-[22px] font-bold text-slate-900 text-center sm:text-left">Request a Free Valuation</h2>
            <p className="mb-8 text-[13px] text-slate-500 leading-relaxed mt-1 text-center sm:text-left">
              Enter your car details and our team will get back to you with an expert valuation estimate.
            </p>

            <div className="mb-6 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3 sm:gap-4 text-center sm:text-left">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fef2f2] text-[#e31e24] shrink-0">
                <PhoneCall size={20} strokeWidth={2} />
              </div>
              <div>
                <p className="text-[15px] font-bold text-slate-900 leading-tight">Enter your number</p>
                <p className="text-[13px] text-slate-500 mt-0.5">We&apos;ll send a verification code</p>
              </div>
            </div>

            <div className="mb-8 text-left">
              <label htmlFor="sell-phone" className="mb-2 block text-[14px] font-bold text-slate-700 text-center sm:text-left">Mobile Number</label>
              <div className="flex h-[52px] overflow-hidden rounded-[8px] border border-[#cbd5e1] bg-white focus-within:border-[#e31e24] focus-within:ring-1 focus-within:ring-[#e31e24]">
                <CountryCodeSelect
                  value={countryCode}
                  onChange={(val) => {
                    setCountryCode(val);
                    if (phoneError) validatePhone(phone, val);
                  }}
                />
                <input
                  id="sell-phone"
                  type="tel"
                  maxLength={countryCode === '+91' ? 10 : 15}
                  placeholder={countryCode === '+91' ? "9876543210" : "Enter phone number"}
                  value={phone}
                  onChange={(e) => {
                    const maxLen = countryCode === '+91' ? 10 : 15;
                    const val = e.target.value.replace(/\D/g, '').slice(0, maxLen);
                    setPhone(val);
                    if (phoneError) validatePhone(val);
                  }}
                  className="flex-1 bg-transparent px-4 text-[15px] font-medium text-slate-900 outline-none placeholder:text-[#94a3b8]"
                />
              </div>
              {phoneError && <p className="mt-1.5 text-[13px] text-red-600 text-center sm:text-left">{phoneError}</p>}
            </div>

            <label className="mb-6 flex cursor-pointer items-start justify-center sm:justify-start gap-2.5 text-center sm:text-left">
              <input
                type="checkbox"
                checked={hasConsent}
                onChange={(e) => {
                  setHasConsent(e.target.checked);
                  if (e.target.checked) setConsentError('');
                }}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-[#e31e24] focus:ring-[#e31e24]"
              />
              <span className="text-[12px] leading-relaxed text-slate-600">
                I agree to the{' '}
                <Link href="/terms-and-conditions" target="_blank" className="font-semibold text-slate-800 underline hover:text-[#e31e24]">
                  Terms &amp; Conditions
                </Link>{' '}
                and{' '}
                <Link href="/privacy-policy" target="_blank" className="font-semibold text-slate-800 underline hover:text-[#e31e24]">
                  Privacy Policy
                </Link>.
              </span>
            </label>
            {consentError && <p className="-mt-4 mb-4 text-[13px] text-red-600 text-center sm:text-left">{consentError}</p>}

            <button type="submit" disabled={!hasConsent || isLoading} className="h-[52px] w-full rounded-[8px] bg-[#e31e24] text-[15px] font-bold text-white transition-colors hover:bg-[#c81a20] disabled:opacity-50 disabled:cursor-not-allowed shadow-md">
              {isLoading ? 'Sending...' : 'Send OTP'}
            </button>

            <div className="mt-5 flex items-center justify-center gap-2 text-[12px] text-slate-400">
              <ShieldCheck size={16} />
              <p>Your number is safe with us. No spam.</p>
            </div>
          </form>
        )}

        {step === 'form' && (
          <div className="w-full text-left animate-fade-in">
            <h2 className="mb-1 text-2xl font-bold text-slate-900 text-left">Car &amp; Contact Details</h2>
            <p className="mb-6 text-sm text-slate-500 text-left">
              Fill in your car details to receive your expert valuation estimate.
            </p>

            <SubmittableForm
              formType="Sell Valuation Form"
              submitLabel="Get Valuation"
              successTitle="Valuation Request Received!"
              successMessage={`Our team will get back to you on ${countryCode} ${phone} shortly to confirm your car's final value.`}
              className="space-y-4 text-left"
              onSubmit={handleFormSuccess}
              validations={[
                { name: 'regNumber', pattern: '^[a-zA-Z0-9\\s\\-]{4,13}$', message: 'Enter a valid registration number (e.g. MH01AB1234)' },
                { name: 'brand', pattern: '^[a-zA-Z0-9\\s\\-\\.\\&]{2,30}$', message: 'Enter a valid car brand name (e.g. Maruti, Hyundai)' },
                { name: 'carModel', pattern: '^[a-zA-Z0-9\\s\\-\\.\\+\\/\\&]{2,30}$', message: 'Enter a valid car model name (e.g. Swift, Creta)' },
                { name: 'email', pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$', message: 'Enter a valid email address' },
              ]}
              successExtra={
                estimate && (
                  <div className="mt-5 w-full max-w-sm rounded-xl bg-slate-50 p-4 text-left border border-slate-200">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      <BadgeIndianRupee size={16} className="text-[#e31e24]" />
                      Estimated Value Range
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
              <input type="hidden" name="mobile" value={`${countryCode} ${phone}`} />
              <input type="hidden" name="phone" value={`${countryCode} ${phone}`} />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50/80 p-3.5 sm:p-4 mb-5 gap-2.5 text-left">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-emerald-700">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">Verified Number</span>
                      <span className="rounded bg-emerald-200/60 px-1.5 py-0.5 text-[9px] font-bold uppercase text-emerald-800">Locked</span>
                    </div>
                    <p className="text-sm font-extrabold text-slate-900">{countryCode} {phone}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleReverify}
                  className="text-xs font-bold text-[#e31e24] hover:underline shrink-0 text-left sm:text-right cursor-pointer"
                >
                  Change Number
                </button>
              </div>

              {/* 1. Registration Number */}
              <div className="text-left">
                <label htmlFor="regNumber" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700 text-left">
                  Registration Number
                </label>
                <input
                  id="regNumber"
                  name="regNumber"
                  required
                  className="h-[46px] w-full rounded-[8px] border border-[#cbd5e1] bg-white px-4 text-[15px] font-medium text-slate-900 outline-none placeholder:text-[#94a3b8] focus:border-[#e31e24] focus:ring-1 focus:ring-[#e31e24]"
                  placeholder="e.g. MH01AB1234"
                />
                <FieldError name="regNumber" />
              </div>

              {/* 2. Brand */}
              <div className="text-left">
                <label htmlFor="brand" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700 text-left">
                  Brand
                </label>
                <input
                  id="brand"
                  name="brand"
                  required
                  className="h-[46px] w-full rounded-[8px] border border-[#cbd5e1] bg-white px-4 text-[15px] font-medium text-slate-900 outline-none placeholder:text-[#94a3b8] focus:border-[#e31e24] focus:ring-1 focus:ring-[#e31e24]"
                  placeholder="e.g. Maruti Suzuki, Hyundai, Tata"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
                <FieldError name="brand" />
              </div>

              {/* 3. Model */}
              <div className="text-left">
                <label htmlFor="carModel" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700 text-left">
                  Model
                </label>
                <input
                  id="carModel"
                  name="carModel"
                  required
                  className="h-[46px] w-full rounded-[8px] border border-[#cbd5e1] bg-white px-4 text-[15px] font-medium text-slate-900 outline-none placeholder:text-[#94a3b8] focus:border-[#e31e24] focus:ring-1 focus:ring-[#e31e24]"
                  placeholder="e.g. Swift, Creta, Nexon, City"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                />
                <FieldError name="carModel" />
              </div>

              {/* 4. Manufacturing Year */}
              <div className="text-left">
                <label htmlFor="year" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700 text-left">
                  Manufacturing Year
                </label>
                <div className="relative">
                  <select
                    id="year"
                    name="year"
                    required
                    className="h-[46px] w-full rounded-[8px] border border-[#cbd5e1] bg-white pl-4 pr-10 text-[15px] font-medium text-slate-900 outline-none focus:border-[#e31e24] focus:ring-1 focus:ring-[#e31e24] appearance-none cursor-pointer"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  >
                    <option value="" disabled>
                      Select Year
                    </option>
                    {Array.from({ length: 12 }).map((_, i) => (
                      <option key={i} value={currentYear - i}>{currentYear - i}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                </div>
                <FieldError name="year" />
              </div>

              {/* 5. Kilometer Driven */}
              <div className="text-left">
                <label htmlFor="kms" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700 text-left">
                  Kilometer Driven
                </label>
                <input
                  id="kms"
                  name="kms"
                  required
                  type="number"
                  min={0}
                  step={1}
                  className="h-[46px] w-full rounded-[8px] border border-[#cbd5e1] bg-white px-4 text-[15px] font-medium text-slate-900 outline-none placeholder:text-[#94a3b8] focus:border-[#e31e24] focus:ring-1 focus:ring-[#e31e24]"
                  placeholder="e.g. 20,000 km"
                  value={kms}
                  onChange={(e) => setKms(e.target.value)}
                />
                <FieldError name="kms" />
              </div>

              {/* 6. Email ID */}
              <div className="text-left">
                <label htmlFor="email" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700 text-left">
                  Email ID
                </label>
                <input
                  id="email"
                  name="email"
                  required
                  type="email"
                  className="h-[46px] w-full rounded-[8px] border border-[#cbd5e1] bg-white px-4 text-[15px] font-medium text-slate-900 outline-none placeholder:text-[#94a3b8] focus:border-[#e31e24] focus:ring-1 focus:ring-[#e31e24]"
                  placeholder="Enter your email ID"
                />
                <FieldError name="email" />
              </div>
            </SubmittableForm>
          </div>
        )}

        {step === 'success' && (
          <div className="flex flex-col items-center justify-center py-10 text-center animate-fade-in">
            <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-500/10 shadow-sm">
              <CheckCircle2 size={44} className="stroke-[2.2]" />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight sm:text-3xl">Valuation Request Received!</h3>
            <p className="mt-3 max-w-md text-sm sm:text-base leading-relaxed text-slate-600 font-medium">
              Our team will get back to you on <span className="font-bold text-slate-900">{countryCode} {phone}</span> shortly to confirm your car&apos;s final value.
            </p>
            {estimate && (
              <div className="mt-5 w-full max-w-sm rounded-xl bg-slate-50 p-4 text-left border border-slate-200">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <BadgeIndianRupee size={16} className="text-[#e31e24]" />
                  Estimated Value Range
                </div>
                <p className="mt-1 text-xl font-extrabold text-slate-900">
                  {formatRupees(estimate.low)} - {formatRupees(estimate.high)}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Final price may vary after physical inspection.
                </p>
              </div>
            )}
            <button
              type="button"
              onClick={() => {
                setStep('form');
                setBrand('');
                setModel('');
                setYear('');
                setKms('');
              }}
              className="btn btn-primary mt-8 w-full max-w-xs py-3 text-sm font-bold shadow-lg shadow-brand-red/20 transition-all hover:shadow-xl"
            >
              Request Another Valuation
            </button>
          </div>
        )}
      </div>

      {/* OTP Popup */}
      {showOtpPopup && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeOtpPopup} />
          <div className="relative mx-4 w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl animate-fade-up sm:p-8">
            <button
              onClick={closeOtpPopup}
              className="absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            >
              <X size={18} />
            </button>

            <form onSubmit={handleVerifyOtp}>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#fef2f2] text-[#e31e24]">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Verify OTP</p>
                  <p className="text-xs text-slate-500">
                    Sent to <span className="font-semibold text-slate-700">{countryCode} {phone}</span>
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
          </div>
        </div>
      )}

      {/* Reverify Confirmation Modal */}
      {showReverifyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl text-center border border-slate-100">
            <button
              type="button"
              onClick={() => setShowReverifyModal(false)}
              className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-600">
              <AlertCircle size={28} />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900">Change Phone Number?</h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              If you change your phone number, you will need to re-verify the new number with a new OTP. Are you sure you want to proceed?
            </p>
            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowReverifyModal(false)}
                className="btn btn-outline flex-1 !py-2.5 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmReverify}
                className="btn btn-primary flex-1 !py-2.5 text-xs font-bold"
              >
                Yes, Change
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

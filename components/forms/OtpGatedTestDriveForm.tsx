'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { PhoneCall, ShieldCheck, X, CheckCircle2 } from 'lucide-react';
import SubmittableForm, { FieldError } from '@/components/forms/SubmittableForm';
import AppointmentFields from '@/components/forms/AppointmentFields';
import CountryCodeSelect from '@/components/forms/CountryCodeSelect';
import { cars } from '@/lib/cars';
import { countryCodes } from '@/lib/countryCodes';
import { sendWhatsAppOtp, verifyWhatsAppOtp } from '@/app/actions/otp';
import { useVerifiedPhone } from '@/lib/verifiedPhone';

const popularCars = cars.slice(0, 5);

export default function OtpGatedTestDriveForm() {
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

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Sync state with verified phone data if available
  useEffect(() => {
    if (verifiedData) {
      setPhone(verifiedData.phone);
      setCountryCode(verifiedData.countryCode);
      setStep('form');
    }
  }, [verifiedData]);

  function handleReverify() {
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

  function closeOtpPopup() {
    setShowOtpPopup(false);
    setOtp('');
    setOtpError('');
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm">
      {step === 'phone' && (
        <form onSubmit={handleSendOtp} className="w-full">
          <h2 className="text-[22px] font-bold text-slate-900">Book Your Test Drive</h2>
          <p className="mb-6 text-[13px] text-slate-500 leading-relaxed mt-1">
            Fill in your details and we&apos;ll get in touch to confirm.
          </p>

          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fef2f2] text-[#e31e24]">
              <PhoneCall size={18} strokeWidth={2} />
            </div>
            <div>
              <p className="text-[14px] font-bold text-slate-900 leading-tight">Enter your number</p>
              <p className="text-[12px] text-slate-500 mt-0.5">We&apos;ll send a verification code</p>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="td-phone" className="mb-2 block text-[14px] font-bold text-slate-700">Mobile Number</label>
            <div className="flex h-[52px] overflow-hidden rounded-[8px] border border-[#cbd5e1] bg-white focus-within:border-[#e31e24] focus-within:ring-1 focus-within:ring-[#e31e24]">
              <CountryCodeSelect
                value={countryCode}
                onChange={(val) => {
                  setCountryCode(val);
                  if (phoneError) validatePhone(phone, val);
                }}
              />
              <input
                id="td-phone"
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
            {phoneError && <p className="mt-1.5 text-[13px] text-red-600">{phoneError}</p>}
          </div>

          <label className="mb-6 flex cursor-pointer items-start gap-2.5 text-left">
            <input
              type="checkbox"
              checked={hasConsent}
              onChange={(e) => {
                setHasConsent(e.target.checked);
                if (e.target.checked) setConsentError('');
              }}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-brand-red focus:ring-brand-red"
            />
            <span className="text-[12px] leading-relaxed text-slate-600">
              I agree to the{' '}
              <Link href="/terms-and-conditions" target="_blank" className="font-semibold text-slate-800 underline hover:text-brand-red">
                Terms &amp; Conditions
              </Link>{' '}
              and{' '}
              <Link href="/privacy-policy" target="_blank" className="font-semibold text-slate-800 underline hover:text-brand-red">
                Privacy Policy
              </Link>.
            </span>
          </label>
          {consentError && <p className="-mt-4 mb-4 text-[13px] text-red-600">{consentError}</p>}

          <button type="submit" disabled={isLoading} className="h-[52px] w-full rounded-[8px] bg-[#e31e24] text-[15px] font-bold text-white transition-colors hover:bg-[#c81a20] disabled:opacity-70 shadow-md">
            {isLoading ? 'Sending...' : 'Send OTP'}
          </button>

          <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
            <ShieldCheck size={14} />
            <p>Your number is safe with us. No spam.</p>
          </div>
        </form>
      )}

      {step === 'form' && (
        <div className="w-full animate-fade-in">
          <h2 className="text-[22px] font-bold text-slate-900">Book Your Test Drive</h2>
          <p className="mb-6 text-[13px] text-slate-500 leading-relaxed mt-1">
            Fill in your details and we&apos;ll get in touch to confirm.
          </p>

          <SubmittableForm
            formType="Book a Test Drive Form"
            submitLabel="Book Test Drive"
            successTitle="Test Drive Booked!"
            successMessage="We'll call you shortly to confirm your slot at our Malad (West) showroom."
            className="space-y-4"
            validations={[
              { name: 'email', pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$', message: 'Enter a valid email address' },
            ]}
            onSubmit={() => setStep('success')}
          >
            <input type="hidden" name="mobile" value={`${countryCode} ${phone}`} />
            <input type="hidden" name="phone" value={`${countryCode} ${phone}`} />

            <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50/70 px-4 py-3 mb-4">
              <div>
                <div className="flex items-center gap-1.5 text-emerald-700">
                  <CheckCircle2 size={14} />
                  <p className="text-[11px] font-bold uppercase tracking-wider">Verified Number (Locked)</p>
                </div>
                <p className="text-sm font-bold text-slate-900 mt-0.5">{countryCode} {phone}</p>
              </div>
              <button
                type="button"
                onClick={handleReverify}
                className="text-xs font-semibold text-brand-red underline hover:text-brand-red/80"
              >
                Change Number / Re-verify
              </button>
            </div>

            <div>
              <label htmlFor="name" className="field-label">Full Name</label>
              <input id="name" name="name" required className="field-input" placeholder="Enter your name" />
              <FieldError name="name" />
            </div>
            <div>
              <label htmlFor="email" className="field-label">Email Address</label>
              <input id="email" name="email" required type="email" className="field-input" placeholder="Enter your email address" />
              <FieldError name="email" />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="car" className="field-label">Select Car</label>
                <select id="car" name="car" required className="field-input" defaultValue="">
                  <option value="" disabled>Select Car Model</option>
                  {popularCars.map((car) => (
                    <option key={car.id} value={`${car.make} ${car.model}`}>{car.make} {car.model}</option>
                  ))}
                </select>
                <FieldError name="car" />
              </div>
              <div>
                <label htmlFor="variant" className="field-label">Variant (Optional)</label>
                <select id="variant" name="variant" className="field-input" defaultValue="">
                  <option value="" disabled>Select Variant</option>
                  <option>Base</option>
                  <option>Mid</option>
                  <option>Top</option>
                </select>
              </div>
            </div>
            <AppointmentFields />
            <div>
              <label htmlFor="location" className="field-label">Preferred Location</label>
              <input id="location" name="location" className="field-input" defaultValue="Malad (West), Mumbai" readOnly />
            </div>
            <div>
              <label htmlFor="notes" className="field-label">Additional Notes (Optional)</label>
              <textarea id="notes" name="notes" className="field-input" rows={3} placeholder="Tell us anything we should know" />
            </div>
          </SubmittableForm>
        </div>
      )}

      {step === 'success' && (
        <div className="flex flex-col items-center justify-center py-10 text-center animate-fade-in">
          <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-500/10 shadow-sm">
            <CheckCircle2 size={44} className="stroke-[2.2]" />
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight sm:text-3xl">Test Drive Booked!</h3>
          <p className="mt-3 max-w-md text-sm sm:text-base leading-relaxed text-slate-600 font-medium">
            We&apos;ll call you on <span className="font-bold text-slate-900">{countryCode} {phone}</span> shortly to confirm your slot at our Malad (West) showroom.
          </p>
          <button
            type="button"
            onClick={() => setStep('form')}
            className="btn btn-primary mt-8 w-full max-w-xs py-3 text-sm font-bold shadow-lg shadow-brand-red/20 transition-all hover:shadow-xl"
          >
            Book Another Test Drive
          </button>
        </div>
      )}

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
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
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
                <label htmlFor="td-otp" className="field-label">One-Time Password</label>
                <input
                  id="td-otp"
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
                  className="field-input text-center text-lg font-bold tracking-[0.5em]"
                  autoFocus
                />
                {otpError && <p className="mt-1 text-xs text-red-600">{otpError}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading || otp.length < 4}
                className="btn btn-primary mt-4 w-full disabled:opacity-50"
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
    </div>
  );
}

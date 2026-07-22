'use client';

import { FormEvent, useState } from 'react';
import { CheckCircle2, PhoneCall, ShieldCheck, X } from 'lucide-react';
import { useUtmParams } from '@/hooks/useUtmParams';
import { submitToGoogleSheets } from '@/lib/googleSheets';

const carInterests = [
  'Hatchback',
  'Sedan',
  'SUV',
  'Electric',
  'Luxury',
  'Not sure yet',
];

export default function AboutLeadForm() {
  const [step, setStep] = useState<'phone' | 'form' | 'success'>('phone');
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const utm = useUtmParams();

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
      setShowOtpPopup(true);
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
      setShowOtpPopup(false);
      setStep('form');
    }, 800);
  }

  function closeOtpPopup() {
    setShowOtpPopup(false);
    setOtp('');
    setOtpError('');
  }

  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload: Record<string, any> = {
      form_type: 'General Submittable Form',
      phone,
      ...utm,
    };
    formData.forEach((val, key) => {
      payload[key] = val;
    });

    submitToGoogleSheets(payload);
    setStep('success');
    e.currentTarget.reset();
  }

  if (step === 'success') {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-green-200 bg-green-50 px-6 py-14 text-center">
        <CheckCircle2 className="mx-auto mb-4 text-green-600" size={48} />
        <h3 className="text-xl font-extrabold text-slate-900">Thank You!</h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          We have received your details. Our team will reach out to you shortly to help you
          find the perfect car.
        </p>
        <button
          onClick={() => {
            setStep('phone');
            setPhone('');
            setOtp('');
          }}
          className="mt-6 text-sm font-semibold text-brand-red hover:underline"
        >
          Submit another response
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        {step === 'phone' && (
          <form onSubmit={handleSendOtp}>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
                <PhoneCall size={18} />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Enter your number</h3>
                <p className="text-xs text-slate-500">We&apos;ll send you a verification code</p>
              </div>
            </div>

            <div>
              <label htmlFor="about-phone" className="field-label">
                Mobile Number
              </label>
              <div className="flex gap-2">
                <span className="flex items-center rounded-md border border-slate-300 bg-slate-50 px-3 text-sm font-semibold text-slate-500">
                  +91
                </span>
                <input
                  id="about-phone"
                  type="tel"
                  maxLength={10}
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                    setPhone(val);
                    if (phoneError) validatePhone(val);
                  }}
                  className="field-input flex-1"
                  autoFocus
                />
              </div>
              {phoneError && <p className="mt-1 text-xs text-red-600">{phoneError}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary mt-6 w-full"
            >
              {isLoading ? 'Sending OTP...' : 'Send OTP'}
            </button>

            <p className="mt-3 text-center text-[11px] text-slate-400">
              <ShieldCheck size={12} className="mr-1 inline -translate-y-px" />
              Your number is safe with us. No spam.
            </p>
          </form>
        )}

        {step === 'form' && (
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
                <PhoneCall size={18} />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Almost done!</h3>
                <p className="text-xs text-slate-500">Just a few more details</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg border border-blue-100 bg-blue-50/50 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-600">
                  Verified Number
                </p>
                <p className="text-sm font-bold text-slate-900">+91 {phone}</p>
              </div>

              <div>
                <label htmlFor="lead-name" className="field-label">
                  Full Name
                </label>
                <input
                  id="lead-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Enter your name"
                  className="field-input"
                  autoFocus
                />
              </div>

              <div>
                <label htmlFor="lead-email" className="field-label">
                  Email Address
                </label>
                <input
                  id="lead-email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="field-input"
                />
              </div>

              <div>
                <label htmlFor="lead-interest" className="field-label">
                  Interested In
                </label>
                <select
                  id="lead-interest"
                  name="interest"
                  required
                  className="field-input"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select car type
                  </option>
                  {carInterests.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="lead-message" className="field-label">
                  Message (optional)
                </label>
                <textarea
                  id="lead-message"
                  name="message"
                  rows={3}
                  placeholder="Tell us what you're looking for..."
                  className="field-input"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary mt-6 w-full">
              Get a Call Back
            </button>

            <p className="mt-3 text-center text-[11px] text-slate-400">
              <ShieldCheck size={12} className="mr-1 inline -translate-y-px" />
              We respect your privacy. No spam, ever.
            </p>
          </form>
        )}
      </div>

      {/* OTP Popup */}
      {showOtpPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeOtpPopup} />
          <div className="relative mx-4 w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
            <button
              onClick={closeOtpPopup}
              className="absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            >
              <X size={18} />
            </button>

            <form onSubmit={handleVerifyOtp}>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">Verify OTP</p>
                  <p className="text-xs text-slate-500">
                    Sent to <span className="font-semibold text-slate-700">+91 {phone}</span>
                  </p>
                </div>
              </div>

              <div>
                <label htmlFor="about-otp" className="field-label">
                  One-Time Password
                </label>
                <input
                  id="about-otp"
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

              <p className="mt-4 text-center text-[11px] text-slate-400">
                Enter any 4-digit code to proceed.
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

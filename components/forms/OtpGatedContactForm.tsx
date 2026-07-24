'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { PhoneCall, ShieldCheck, X } from 'lucide-react';
import SubmittableForm, { FieldError } from '@/components/forms/SubmittableForm';

export default function OtpGatedContactForm() {
  const [step, setStep] = useState<'phone' | 'form'>('phone');
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="relative flex h-full flex-col justify-center overflow-hidden rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-8 lg:p-10">
      <div className="pointer-events-none absolute inset-x-8 top-0 h-24 rounded-b-[40px] bg-[radial-gradient(circle_at_top,rgba(23,58,103,0.08),transparent_72%)]" />
      {step === 'phone' && (
        <div className="relative flex flex-col items-center text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-[26px] bg-[#edf3fb] text-[#173a67] shadow-inner">
            <PhoneCall size={28} />
          </div>
          <h2 className="mb-2 text-3xl font-extrabold tracking-tight text-slate-900">
            Verify to Send a Message
          </h2>
          <p className="mb-8 max-w-md text-sm text-slate-500 sm:text-base">
            Enter your phone number to unlock the contact form.
          </p>

          <form onSubmit={handleSendOtp} className="w-full text-left">
            <div className="mb-4 flex h-16 items-center overflow-hidden rounded-[22px] border border-slate-200 bg-[#f6f8fc] p-1.5 shadow-inner transition focus-within:border-[#173a67] focus-within:ring-2 focus-within:ring-[#173a67]/10">
              <div className="flex h-full items-center justify-center rounded-[18px] border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700">
                IN +91 <span className="ml-1 text-[10px]">▼</span>
              </div>
              <input
                id="gate-phone"
                type="tel"
                maxLength={10}
                placeholder="9876543210"
                value={phone}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                  setPhone(val);
                  if (phoneError) validatePhone(val);
                }}
                className="h-full flex-1 bg-transparent px-4 text-lg font-medium tracking-[0.02em] text-slate-800 outline-none placeholder:text-slate-400"
                autoFocus
              />
            </div>
            {phoneError && <p className="mb-4 mt-1 text-xs text-red-600">{phoneError}</p>}

            <div className="mb-6 flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-1 h-5 w-5 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
              />
              <label htmlFor="terms" className="text-xs leading-relaxed text-slate-500 sm:text-sm">
                I agree to Thinkarz&apos;s{' '}
                <Link href="/terms-and-conditions" className="font-semibold underline hover:text-slate-900">
                  T&C
                </Link>{' '}
                and{' '}
                <Link href="/privacy-policy" className="font-semibold underline hover:text-slate-900">
                  Privacy Policy
                </Link>
                . This consent overrides any DNC/NDNC registrations.
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-[20px] bg-[#123b73] px-4 py-4 text-base font-semibold text-white shadow-[0_14px_32px_rgba(18,59,115,0.22)] transition-all hover:bg-[#0f315f] active:scale-[0.98]"
            >
              {isLoading ? 'Sending...' : 'Send OTP'}
            </button>
          </form>
        </div>
      )}

      {step === 'form' && (
        <SubmittableForm
          formType="Contact Us Form"
          submitLabel="Send Message"
          successTitle="Message Sent!"
          successMessage="Thanks for reaching out. Our team will get back to you shortly."
          className="space-y-4"
          validations={[
            {
              name: 'email',
              pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
              message: 'Enter a valid email address',
            },
          ]}
        >
          <input type="hidden" name="mobile" value={phone} />
          <input type="hidden" name="phone" value={phone} />

          <div className="rounded-2xl border border-blue-100 bg-blue-50/60 px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-600">
              Verified Number
            </p>
            <p className="text-sm font-bold text-slate-900">+91 {phone}</p>
          </div>

          <div>
            <label htmlFor="name" className="field-label">
              Full Name
            </label>
            <input id="name" name="name" required className="field-input" placeholder="Enter your name" />
            <FieldError name="name" />
          </div>
          <div>
            <label htmlFor="email" className="field-label">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              required
              type="email"
              className="field-input"
              placeholder="Enter your email address"
            />
            <FieldError name="email" />
          </div>
          <div>
            <label htmlFor="subject" className="field-label">
              Subject
            </label>
            <select id="subject" name="subject" required className="field-input" defaultValue="">
              <option value="" disabled>
                Select a subject
              </option>
              <option>Buying a Car</option>
              <option>Selling a Car</option>
              <option>Service Appointment</option>
              <option>General Enquiry</option>
            </select>
            <FieldError name="subject" />
          </div>
          <div>
            <label htmlFor="message" className="field-label">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              className="field-input"
              rows={4}
              placeholder="Type your message here..."
            />
            <FieldError name="message" />
          </div>
        </SubmittableForm>
      )}

      {showOtpPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeOtpPopup} />
          <div className="relative mx-4 w-full max-w-sm animate-fade-up rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
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
                <label htmlFor="gate-otp" className="field-label">
                  One-Time Password
                </label>
                <input
                  id="gate-otp"
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
                  className="field-input rounded-2xl text-center text-lg font-bold tracking-[0.5em]"
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

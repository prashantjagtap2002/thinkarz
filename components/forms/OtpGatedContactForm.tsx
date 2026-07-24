'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { ChevronDown, PhoneCall, ShieldCheck, X } from 'lucide-react';
import SubmittableForm, { FieldError } from '@/components/forms/SubmittableForm';

export default function OtpGatedContactForm() {
  const [step, setStep] = useState<'phone' | 'form'>('phone');
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [hasConsent, setHasConsent] = useState(false);
  const [consentError, setConsentError] = useState('');
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
    if (!hasConsent) {
      setConsentError('Please accept the terms to continue');
      return;
    }
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
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_16px_45px_-28px_rgba(15,27,46,0.35)]">

      {step === 'phone' && (
        <form onSubmit={handleSendOtp} className="px-5 py-9 sm:px-10 sm:py-12">
          <div className="mx-auto max-w-md text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-blueLight text-brand-blue shadow-sm ring-1 ring-brand-blue/10">
              <PhoneCall size={29} strokeWidth={1.8} />
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Verify to Send a Message</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              Enter your mobile number to unlock the contact form.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-md">
            <label htmlFor="gate-phone" className="sr-only">Mobile number</label>
            <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-[0_0_0_4px_rgba(238,242,255,0.8)] transition-shadow focus-within:border-brand-blue/40 focus-within:shadow-[0_0_0_4px_rgba(41,82,204,0.12)]">
              <span className="flex items-center gap-1 border-r border-slate-200 bg-slate-100/80 px-4 text-sm font-bold text-slate-700">
                IN +91 <ChevronDown size={14} className="text-slate-400" />
              </span>
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
                className="min-w-0 flex-1 bg-transparent px-4 py-4 text-sm font-semibold text-slate-800 outline-none placeholder:font-normal placeholder:text-slate-400"
                autoFocus
              />
            </div>
            {phoneError && <p className="mt-2 text-xs text-red-600">{phoneError}</p>}
          </div>

          <label className="mx-auto mt-6 flex max-w-md cursor-pointer items-start gap-3 text-left text-xs leading-relaxed text-slate-500">
            <input
              type="checkbox"
              checked={hasConsent}
              onChange={(e) => {
                setHasConsent(e.target.checked);
                if (e.target.checked) setConsentError('');
              }}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-brand-red focus:ring-brand-red"
            />
            <span>
              I agree to Thinkarz&apos;s{' '}
              <Link href="/terms-and-conditions" className="font-semibold text-slate-700 underline underline-offset-2 hover:text-brand-red">Terms &amp; Conditions</Link>{' '}
              and{' '}
              <Link href="/privacy-policy" className="font-semibold text-slate-700 underline underline-offset-2 hover:text-brand-red">Privacy Policy</Link>.
            </span>
          </label>
          {consentError && <p className="mx-auto mt-2 max-w-md text-xs text-red-600">{consentError}</p>}

          <button type="submit" disabled={isLoading} className="btn btn-primary mx-auto mt-6 flex w-full max-w-md !rounded-xl !bg-brand-navy !py-3.5 hover:!bg-brand-navyLight disabled:cursor-not-allowed disabled:opacity-60">
            {isLoading ? 'Sending OTP...' : 'Send OTP'}
          </button>

          <p className="mt-4 text-center text-[11px] text-slate-400">
            <ShieldCheck size={12} className="mr-1 inline -translate-y-px text-brand-red" />
            Your number is protected. No spam, ever.
          </p>
        </form>
      )}

      {step === 'form' && (
        <SubmittableForm
          formType="Contact Us Form"
          submitLabel="Send Message"
          successTitle="Message Sent!"
          successMessage="Thanks for reaching out. Our team will get back to you shortly."
          className="space-y-4 p-6 sm:p-8"
          validations={[
            { name: 'email', pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$', message: 'Enter a valid email address' },
          ]}
        >
          <input type="hidden" name="mobile" value={phone} />
          <input type="hidden" name="phone" value={phone} />

          <div className="rounded-xl border border-brand-blue/10 bg-brand-blueLight/60 px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-blue">
              Verified Number
            </p>
            <p className="text-sm font-bold text-slate-900">+91 {phone}</p>
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
          <div>
            <label htmlFor="subject" className="field-label">Subject</label>
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
            <label htmlFor="message" className="field-label">Your Message</label>
            <textarea id="message" name="message" required className="field-input" rows={4} placeholder="Type your message here..." />
            <FieldError name="message" />
          </div>
        </SubmittableForm>
      )}

      {/* OTP Popup */}
      {showOtpPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeOtpPopup} />
          <div className="relative mx-4 w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl animate-fade-up sm:p-8">
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

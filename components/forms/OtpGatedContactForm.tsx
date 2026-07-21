'use client';

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
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-lg font-bold text-slate-900">Send Us a Message</h2>
      <p className="mb-6 text-sm text-slate-500">
        Fill in the details below and we&apos;ll get back to you shortly.
      </p>

      {step === 'phone' && (
        <form onSubmit={handleSendOtp}>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
              <PhoneCall size={16} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Enter your number</p>
              <p className="text-xs text-slate-500">We&apos;ll send a verification code</p>
            </div>
          </div>

          <div>
            <label htmlFor="gate-phone" className="field-label">
              Mobile Number
            </label>
            <div className="flex gap-2">
              <span className="flex items-center rounded-md border border-slate-300 bg-slate-50 px-3 text-sm font-semibold text-slate-500">
                +91
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
                className="field-input flex-1"
                autoFocus
              />
            </div>
            {phoneError && <p className="mt-1 text-xs text-red-600">{phoneError}</p>}
          </div>

          <button type="submit" disabled={isLoading} className="btn btn-primary mt-4 w-full">
            {isLoading ? 'Sending OTP...' : 'Send OTP'}
          </button>

          <p className="mt-3 text-center text-[11px] text-slate-400">
            <ShieldCheck size={12} className="mr-1 inline -translate-y-px" />
            Your number is safe with us. No spam.
          </p>
        </form>
      )}

      {step === 'form' && (
        <SubmittableForm
          submitLabel="Send Message"
          successTitle="Message Sent!"
          successMessage="Thanks for reaching out. Our team will get back to you shortly."
          className="space-y-4"
          validations={[
            { name: 'email', pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$', message: 'Enter a valid email address' },
          ]}
        >
          <input type="hidden" name="mobile" value={phone} />

          <div className="rounded-lg border border-blue-100 bg-blue-50/50 px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-600">
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

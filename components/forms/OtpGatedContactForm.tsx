'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { ChevronDown, PhoneCall, ShieldCheck, X } from 'lucide-react';
import SubmittableForm, { FieldError } from '@/components/forms/SubmittableForm';

export default function OtpGatedContactForm() {
  const [step, setStep] = useState<'phone' | 'form'>('phone');
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [otp, setOtp] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [hasConsent, setHasConsent] = useState(false);
  const [consentError, setConsentError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
    <div className="flex h-full flex-col justify-center rounded-2xl border border-slate-200 bg-white shadow-[0_4px_24px_-10px_rgba(0,0,0,0.05)] p-6 sm:p-12">
      {step === 'phone' && (
        <form onSubmit={handleSendOtp} className="w-full text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
            <PhoneCall size={26} strokeWidth={2} />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-slate-900">Verify to Send a Message</h2>
          <p className="mb-8 text-[15px] text-slate-500">
            Enter your phone number to unlock the contact form.
          </p>

          <div className="mx-auto mb-6 flex h-[46px] overflow-hidden rounded-[8px] border border-[#cbd5e1] bg-white transition-colors focus-within:border-[#e31e24] focus-within:ring-1 focus-within:ring-[#e31e24]">
            <select
              value={countryCode}
              onChange={(e) => {
                setCountryCode(e.target.value);
                if (phoneError) validatePhone(phone, e.target.value);
              }}
              className="w-[105px] shrink-0 border-r border-[#cbd5e1] bg-slate-50 pl-3 text-[14px] font-medium text-slate-600 outline-none appearance-none cursor-pointer hover:bg-slate-100 transition-colors"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'12\' height=\'12\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%2364748b\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'m6 9 6 6 6-6\'/%3E%3C/svg%3E")', backgroundPosition: 'right 8px center', backgroundRepeat: 'no-repeat', paddingRight: '24px' }}
            >
              <option value="+91">IN (+91)</option>
              <option value="+1">US (+1)</option>
              <option value="+44">UK (+44)</option>
              <option value="+971">UAE (+971)</option>
              <option value="+61">AU (+61)</option>
            </select>
            <input
              id="gate-phone"
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
              className="flex-1 bg-transparent px-4 text-[15px] font-medium text-slate-900 outline-none placeholder:font-normal placeholder:text-slate-400"
              autoFocus
            />
          </div>
          {phoneError && <p className="-mt-4 mb-4 text-left text-xs text-red-600">{phoneError}</p>}

          <label className="mb-8 flex cursor-pointer items-start gap-3 text-left">
            <input
              type="checkbox"
              checked={hasConsent}
              onChange={(e) => {
                setHasConsent(e.target.checked);
                if (e.target.checked) setConsentError('');
              }}
              className="mt-[3px] h-[18px] w-[18px] shrink-0 rounded border-slate-300 text-[#001D3D] focus:ring-[#001D3D]"
            />
            <span className="text-[13px] leading-[1.6] text-slate-500">
              I agree to Thinkarz's{' '}
              <Link href="/terms-and-conditions" className="font-semibold text-slate-800 underline hover:text-[#001D3D]">T&amp;C</Link>{' '}
              and{' '}
              <Link href="/privacy-policy" className="font-semibold text-slate-800 underline hover:text-[#001D3D]">Privacy Policy</Link>. 
              This consent overrides any DNC/NDNC registrations.
            </span>
          </label>
          {consentError && <p className="-mt-6 mb-4 text-left text-xs text-red-600">{consentError}</p>}

          <button type="submit" disabled={isLoading} className="h-[46px] w-full rounded-[8px] bg-[#e31e24] text-[15px] font-semibold text-white transition-colors hover:bg-[#c81a20] disabled:opacity-70">
            {isLoading ? 'Sending...' : 'Send OTP'}
          </button>
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
          <input type="hidden" name="mobile" value={`${countryCode} ${phone}`} />
          <input type="hidden" name="phone" value={`${countryCode} ${phone}`} />

          <div className="rounded-xl border border-brand-blue/10 bg-brand-blueLight/60 px-4 py-3">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-blue">
              Verified Number
            </p>
            <p className="text-sm font-bold text-slate-900">{countryCode} {phone}</p>
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
                    Sent to <span className="font-semibold text-slate-700">{countryCode} {phone}</span>
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

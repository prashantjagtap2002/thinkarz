'use client';

import { FormEvent, useEffect, useState } from 'react';
import { PhoneCall, ShieldCheck, X, CheckCircle2 } from 'lucide-react';
import SubmittableForm, { FieldError } from '@/components/forms/SubmittableForm';
import AppointmentFields from '@/components/forms/AppointmentFields';
import { cars } from '@/lib/cars';

const popularCars = cars.slice(0, 5);

type PopupStep = 'otp' | 'form' | 'success';

export default function OtpGatedTestDriveForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<PopupStep>('otp');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [otp, setOtp] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function closePopup() {
    setIsOpen(false);
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
      <div className="rounded-xl bg-white p-6 sm:p-8">
        <h2 className="text-[22px] font-bold text-slate-900">Book Your Test Drive</h2>
        <p className="mb-6 text-[13px] text-slate-500 leading-relaxed mt-1">
          Fill in your details and we'll get in touch to confirm.
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
            <label htmlFor="td-phone" className="mb-1.5 block text-[13px] font-semibold text-slate-700">Mobile Number</label>
            <div className="flex h-[42px] overflow-hidden rounded-[6px] border border-[#cbd5e1] bg-white focus-within:border-[#e31e24] focus-within:ring-1 focus-within:ring-[#e31e24]">
              <select
                value={countryCode}
                onChange={(e) => {
                  setCountryCode(e.target.value);
                  if (phoneError) validatePhone(phone, e.target.value);
                }}
                className="w-[105px] shrink-0 border-r border-[#cbd5e1] bg-slate-50 pl-3 text-[14px] text-slate-600 outline-none appearance-none cursor-pointer hover:bg-slate-100 transition-colors"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'12\' height=\'12\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23475569\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'m6 9 6 6 6-6\'/%3E%3C/svg%3E")', backgroundPosition: 'right 8px center', backgroundRepeat: 'no-repeat', paddingRight: '24px' }}
              >
                <option value="+91">IN (+91)</option>
                <option value="+1">US (+1)</option>
                <option value="+44">UK (+44)</option>
                <option value="+971">UAE (+971)</option>
                <option value="+61">AU (+61)</option>
              </select>
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
                <h2 className="text-lg font-bold text-slate-900">Book Your Test Drive</h2>
                <p className="mb-6 text-sm text-slate-500">
                  Fill in your details and we&apos;ll get in touch to confirm.
                </p>

                {step === 'otp' && (
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
                )}

                {step === 'form' && (
                  <SubmittableForm
                    formType="Book a Test Drive Form"
                    submitLabel="Book Test Drive"
                    successTitle="Test Drive Booked!"
                    successMessage="We'll call you shortly to confirm your slot at our Malad (West) showroom."
                    className="space-y-4"
                    validations={[
                      { name: 'email', pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$', message: 'Enter a valid email address' },
                    ]}
                    onSubmit={handleFormSuccess}
                  >
                    <input type="hidden" name="mobile" value={`${countryCode} ${phone}`} />
                    <input type="hidden" name="phone" value={`${countryCode} ${phone}`} />

                    <div className="rounded-lg border border-blue-100 bg-blue-50/50 px-4 py-3">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-600">Verified Number</p>
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
                )}
              </div>
            )}

            {step === 'success' && (
              <div className="flex flex-col items-center justify-center px-6 py-16 text-center sm:px-8">
                <CheckCircle2 className="mb-4 text-green-600" size={48} />
                <h3 className="text-xl font-extrabold text-slate-900">Test Drive Booked!</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600">
                  We&apos;ll call you shortly to confirm your slot at our Malad (West) showroom.
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

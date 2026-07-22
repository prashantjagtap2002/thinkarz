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
  const [otp, setOtp] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-lg font-bold text-slate-900">Book Your Test Drive</h2>
        <p className="mb-6 text-sm text-slate-500">
          Fill in your details and we&apos;ll get in touch to confirm.
        </p>

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
            <label htmlFor="td-phone" className="field-label">Mobile Number</label>
            <div className="flex gap-2">
              <span className="flex items-center rounded-md border border-slate-300 bg-slate-50 px-3 text-sm font-semibold text-slate-500">+91</span>
              <input
                id="td-phone"
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
                          Sent to <span className="font-semibold text-slate-700">+91 {phone}</span>
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
                    <input type="hidden" name="mobile" value={phone} />

                    <div className="rounded-lg border border-blue-100 bg-blue-50/50 px-4 py-3">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-blue-600">Verified Number</p>
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

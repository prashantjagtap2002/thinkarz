'use client';

import { FormEvent, useState } from 'react';
import { PhoneCall, ShieldCheck, X, CheckCircle2 } from 'lucide-react';
import SubmittableForm, { FieldError } from '@/components/forms/SubmittableForm';
import AppointmentFields from '@/components/forms/AppointmentFields';
import { cars } from '@/lib/cars';

const popularCars = cars.slice(0, 5);

type PopupStep = 'phone' | 'otp' | 'form' | 'success';

export default function OtpGatedTestDriveForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<PopupStep>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function openPopup() {
    setStep('phone');
    setPhone('');
    setOtp('');
    setPhoneError('');
    setOtpError('');
    setIsOpen(true);
  }

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

  return (
    <>
      <div className="flex justify-center">
        <button onClick={openPopup} className="btn btn-primary text-base px-8 py-3.5">
          Book Your Test Drive
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closePopup} />

          <div className="relative mx-4 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl animate-fade-up">
            <button
              onClick={closePopup}
              className="absolute right-4 top-4 z-10 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            >
              <X size={18} />
            </button>

            {step !== 'success' && (
              <div className="p-6 sm:p-8">
                <h2 className="text-lg font-bold text-slate-900">Book Your Test Drive</h2>
                <p className="mb-6 text-sm text-slate-500">
                  Fill in your details and we&apos;ll get in touch to confirm.
                </p>
              </div>
            )}

            {step === 'phone' && (
              <div className="px-6 pb-8 sm:px-8 sm:pb-8">
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
              </div>
            )}

            {step === 'otp' && (
              <div className="px-6 pb-8 sm:px-8 sm:pb-8">
                <button
                  type="button"
                  onClick={() => { setStep('phone'); setOtp(''); setOtpError(''); }}
                  className="mb-4 flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-700"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                  Back
                </button>

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
                  onClick={handleVerifyOtp}
                  disabled={isLoading || otp.length < 4}
                  className="btn btn-primary mt-4 w-full disabled:opacity-50"
                >
                  {isLoading ? 'Verifying...' : 'Verify OTP'}
                </button>

                <p className="mt-3 text-center text-[11px] text-slate-400">
                  Enter any 4-digit code to proceed.
                </p>
              </div>
            )}

            {step === 'form' && (
              <div className="px-6 pb-8 sm:px-8 sm:pb-8">
                <SubmittableForm
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
              </div>
            )}

            {step === 'success' && (
              <div className="flex flex-col items-center justify-center px-6 py-16 text-center sm:px-8">
                <CheckCircle2 className="mb-4 text-green-600" size={48} />
                <h3 className="text-xl font-extrabold text-slate-900">Test Drive Booked!</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600">
                  We&apos;ll call you shortly to confirm your slot at our Malad (West) showroom.
                </p>
                <button
                  onClick={closePopup}
                  className="btn btn-primary mt-8"
                >
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

'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { PhoneCall, ShieldCheck, X, CheckCircle2, ChevronDown, AlertCircle } from 'lucide-react';
import SubmittableForm, { FieldError } from '@/components/forms/SubmittableForm';
import CountryCodeSelect from '@/components/forms/CountryCodeSelect';
import { sendWhatsAppOtp, verifyWhatsAppOtp } from '@/app/actions/otp';
import { useVerifiedPhone } from '@/lib/verifiedPhone';

export default function OtpGatedContactForm() {
  const { verifiedData, saveVerification, resetVerification } = useVerifiedPhone();
  const [step, setStep] = useState<'phone' | 'form' | 'success'>('phone');
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [showReverifyModal, setShowReverifyModal] = useState(false);
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [otp, setOtp] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [hasConsent, setHasConsent] = useState(false);
  const [consentError, setConsentError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [serverHash, setServerHash] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [resendCount, setResendCount] = useState(0);
  const [isResending, setIsResending] = useState(false);
  const [resendSuccessMsg, setResendSuccessMsg] = useState('');
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Resend OTP Countdown Timer
  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (showOtpPopup && resendTimer > 0) {
      timerId = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [showOtpPopup, resendTimer]);

  // Sync state with verified phone data if available
  useEffect(() => {
    if (verifiedData) {
      setPhone(verifiedData.phone);
      setCountryCode(verifiedData.countryCode);
      setStep('form');
    }
  }, [verifiedData]);

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
      setConsentError('Please accept the terms to continue');
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
        setOtp('');
        setResendTimer(30);
        setResendSuccessMsg('');
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

  async function handleResendOtp() {
    if (resendTimer > 0 || isResending) return;
    if (resendCount >= 3) {
      setOtpError('Maximum resends reached (3 per session).');
      return;
    }
    setIsResending(true);
    setOtpError('');
    setResendSuccessMsg('');

    try {
      const res = await sendWhatsAppOtp(countryCode, phone);
      if (!isMountedRef.current) return;
      setIsResending(false);

      if (res.success && res.hash) {
        setServerHash(res.hash);
        setOtp('');
        setResendTimer(30);
        const newCount = resendCount + 1;
        setResendCount(newCount);
        setResendSuccessMsg(`New OTP sent via WhatsApp! (${newCount}/3 resends used)`);
        setTimeout(() => {
          if (isMountedRef.current) setResendSuccessMsg('');
        }, 5000);
      } else {
        setOtpError(res.error || 'Failed to resend OTP');
      }
    } catch (err) {
      console.error('Client resend action error:', err);
      setIsResending(false);
      setOtpError('Server unreachable. Please try again.');
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
    <div className="flex h-fit flex-col justify-center rounded-2xl border border-slate-200 bg-white shadow-[0_4px_24px_-10px_rgba(0,0,0,0.05)] p-6 sm:p-10 lg:p-12">
      {/* Phone verification step */}
      {step === 'phone' && (
        <form onSubmit={handleSendOtp} className="w-full text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
            <PhoneCall size={26} strokeWidth={2} />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-slate-900">Verify to Send a Message</h2>
          <p className="mb-8 text-[15px] text-slate-500">
            Enter your phone number to unlock the contact form.
          </p>

          <div className="mx-auto mb-6 flex h-[52px] overflow-hidden rounded-[8px] border border-[#cbd5e1] bg-white transition-colors focus-within:border-[#e31e24] focus-within:ring-1 focus-within:ring-[#e31e24]">
            <CountryCodeSelect
              value={countryCode}
              onChange={(val) => {
                setCountryCode(val);
                if (phoneError) validatePhone(phone, val);
              }}
            />
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
            />
          </div>
          {phoneError && <p className="-mt-4 mb-4 text-left text-xs text-red-600">{phoneError}</p>}

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
          {consentError && <p className="-mt-4 mb-4 text-left text-xs text-red-600">{consentError}</p>}

          <button type="submit" disabled={!hasConsent || isLoading} className="h-[52px] w-full rounded-[8px] bg-[#e31e24] text-[15px] font-bold text-white transition-colors hover:bg-[#c81a20] disabled:opacity-50 disabled:cursor-not-allowed shadow-md">
            {isLoading ? 'Sending...' : 'Send OTP'}
          </button>
        </form>
      )}

      {/* Main contact form rendered directly inside right column card */}
      {step === 'form' && (
        <div className="w-full animate-fade-in">
          <h2 className="mb-2 text-2xl font-bold text-slate-900">Send Us a Message</h2>
          <p className="mb-6 text-[14px] text-slate-500">
            Have a question or request? Fill in the details below and we&apos;ll get back to you.
          </p>

          <SubmittableForm
            formType="Contact Us Form"
            submitLabel="Send Message"
            successTitle="Message Sent!"
            successMessage="Thanks for reaching out. Our team will get back to you shortly."
            className="space-y-4"
            onSubmit={() => setStep('success')}
            validations={[
              { name: 'name', pattern: '^[a-zA-Z\\s\\.]{2,50}$', message: 'Enter a valid full name (letters only)' },
              { name: 'email', pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$', message: 'Enter a valid email address' },
              { name: 'pincode', pattern: '^[1-9][0-9]{5}$', message: 'Enter a valid 6-digit pincode' },
            ]}
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
              <div className="relative">
                <select id="subject" name="subject" required className="field-input appearance-none pr-10 cursor-pointer" defaultValue="">
                  <option value="" disabled>
                    Select a subject
                  </option>
                  <option>Buying a Car</option>
                  <option>Selling a Car</option>
                  <option>Service Appointment</option>
                  <option>General Enquiry</option>
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
              </div>
              <FieldError name="subject" />
            </div>
            <div>
              <label htmlFor="pincode" className="field-label">Pincode</label>
              <input id="pincode" name="pincode" required type="text" inputMode="numeric" maxLength={6} className="field-input" placeholder="Enter your 6-digit pincode" />
              <FieldError name="pincode" />
            </div>
            <div>
              <label htmlFor="message" className="field-label">Your Message</label>
              <textarea id="message" name="message" required className="field-input" rows={4} placeholder="Type your message here..." />
              <FieldError name="message" />
            </div>
          </SubmittableForm>
        </div>
      )}

      {/* Success step rendered directly inside right column card */}
      {step === 'success' && (
        <div className="flex flex-col items-center justify-center py-10 text-center animate-fade-in">
          <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-500/10 shadow-sm">
            <CheckCircle2 size={44} className="stroke-[2.2]" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight sm:text-3xl">Message Sent!</h2>
          <p className="mt-3 max-w-md text-sm sm:text-base leading-relaxed text-slate-600 font-medium">
            Thank you for reaching out! Our team will get back to you on <span className="font-bold text-slate-900">{countryCode} {phone}</span> shortly.
          </p>
          <button
            type="button"
            onClick={() => setStep('form')}
            className="btn btn-primary mt-8 w-full max-w-xs py-3 text-sm font-bold shadow-lg shadow-brand-red/20 transition-all hover:shadow-xl"
          >
            Send Another Message
          </button>
        </div>
      )}

      {/* OTP Popup */}
      {showOtpPopup && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeOtpPopup} />
          <div className="relative mx-4 w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl animate-fade-up sm:p-8">
            <button
              type="button"
              onClick={closeOtpPopup}
              aria-label="Close verification popup"
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

              <div className="mt-4 text-center">
                {resendSuccessMsg && (
                  <p className="mb-2 text-xs font-semibold text-emerald-600 animate-fade-in">
                    {resendSuccessMsg}
                  </p>
                )}
                <p className="text-xs text-slate-500">
                  Didn&apos;t receive the code?{' '}
                  {resendCount >= 3 ? (
                    <span className="text-slate-400 font-semibold">
                      Max resends reached (3/3)
                    </span>
                  ) : resendTimer > 0 ? (
                    <span className="font-semibold text-slate-700">
                      Resend in <span className="text-[#e31e24] font-bold">{resendTimer}s</span>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={isResending}
                      className="font-bold text-[#e31e24] hover:underline disabled:opacity-50 cursor-pointer"
                    >
                      {isResending ? 'Sending...' : 'Resend OTP'}
                    </button>
                  )}
                </p>
              </div>
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

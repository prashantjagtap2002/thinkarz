'use client';

import { createContext, FormEvent, ReactNode, Suspense, useContext, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { useUtmParams } from '@/hooks/useUtmParams';
import { submitToGoogleSheets } from '@/lib/googleSheets';
import { submitToSupabase } from '@/lib/supabaseSubmit';

function UtmHiddenFields() {
  const utm = useUtmParams();
  return (
    <>
      <input type="hidden" name="utm_source" value={utm.utm_source} />
      <input type="hidden" name="utm_medium" value={utm.utm_medium} />
      <input type="hidden" name="utm_campaign" value={utm.utm_campaign} />
      <input type="hidden" name="utm_term" value={utm.utm_term} />
      <input type="hidden" name="utm_content" value={utm.utm_content} />
      <input type="hidden" name="page_url" value={utm.page_url} />
    </>
  );
}

export interface FieldValidation {
  name: string;
  pattern?: string;
  message: string;
}

interface FormContextType {
  errors: Record<string, string>;
}

const FormContext = createContext<FormContextType>({ errors: {} });

export function FieldError({ name }: { name: string }) {
  const { errors } = useContext(FormContext);
  if (!errors[name]) return null;
  return <p className="mt-1 text-xs text-red-600">{errors[name]}</p>;
}

export default function SubmittableForm({
  children,
  submitLabel,
  successTitle,
  successMessage,
  successExtra,
  className = '',
  formType,
  validations,
  onSubmit,
  hideConsent = true,
}: {
  children: ReactNode;
  submitLabel: string;
  successTitle: string;
  successMessage: string;
  successExtra?: ReactNode;
  className?: string;
  formType?: string;
  validations?: FieldValidation[];
  onSubmit?: () => void;
  hideConsent?: boolean;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validate(form: HTMLFormElement): boolean {
    const newErrors: Record<string, string> = {};
    let firstInvalid: HTMLElement | null = null;

    for (const field of form.querySelectorAll('input, select, textarea')) {
      const el = field as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
      if (!el.name || el.disabled) continue;

      const isTickbox =
        el instanceof HTMLInputElement && (el.type === 'checkbox' || el.type === 'radio');

      if (el.hasAttribute('required')) {
        // A checkbox always reports value "on"; only `checked` means anything.
        const missing = isTickbox ? !(el as HTMLInputElement).checked : !el.value.trim();
        if (missing) {
          newErrors[el.name] = isTickbox ? 'Please tick this to continue' : 'This field is required';
          firstInvalid = firstInvalid ?? el;
          continue;
        }
      }

      if (isTickbox || !el.value.trim()) continue;

      const rule = validations?.find((v) => v.name === el.name);
      if (rule?.pattern && !new RegExp(rule.pattern).test(el.value)) {
        newErrors[el.name] = rule.message;
        firstInvalid = firstInvalid ?? el;
        continue;
      }

      // `noValidate` turns off the browser's own type=email check, so cover it
      // here for any email field without an explicit rule.
      if (!rule && el instanceof HTMLInputElement && el.type === 'email' && !EMAIL_PATTERN.test(el.value)) {
        newErrors[el.name] = 'Enter a valid email address';
        firstInvalid = firstInvalid ?? el;
      }
    }

    setErrors(newErrors);

    // On a phone the offending field is often well off-screen; bring it up.
    if (firstInvalid) {
      firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstInvalid.focus({ preventScroll: true });
    }

    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Guard against a second tap while the first request is still in flight —
    // on a slow mobile connection that was producing duplicate leads.
    if (isSubmitting) return;

    const formElement = e.currentTarget;
    if (!validate(formElement)) return;

    setIsSubmitting(true);
    setSubmitError('');

    // Collect all form data including UTMs and formType
    const formData = new FormData(formElement);
    const payload: Record<string, any> = {
      form_type: formType,
    };

    formData.forEach((value, key) => {
      payload[key] = value;
    });

    // Both sinks are attempted independently; one failing must not lose the lead.
    const [sheetsResult, supabaseResult] = await Promise.allSettled([
      submitToGoogleSheets(payload),
      submitToSupabase(payload),
    ]);

    const delivered = (result: PromiseSettledResult<boolean>) =>
      result.status === 'fulfilled' && result.value !== false;

    // Only claim success if the lead actually landed somewhere. Previously any
    // outcome showed the success screen, so failed submissions vanished
    // silently.
    if (!delivered(sheetsResult) && !delivered(supabaseResult)) {
      console.error('Lead dispatch failed', { sheetsResult, supabaseResult });
      setIsSubmitting(false);
      setSubmitError(
        "We couldn't send your details just now. Please check your connection and try again.",
      );
      return;
    }

    onSubmit?.();
    setSubmitted(true);
    formElement.reset();
    setErrors({});
    setIsSubmitting(false);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-10 px-4 text-center animate-fade-in">
        <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-500/10 shadow-sm">
          <CheckCircle2 size={44} className="stroke-[2.2]" />
        </div>
        <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight sm:text-3xl">{successTitle}</h3>
        <p className="mt-3 max-w-md text-sm sm:text-base leading-relaxed text-slate-600 font-medium">{successMessage}</p>
        {successExtra}
        <div className="mt-8 flex w-full max-w-xs flex-col items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              setSubmitError('');
            }}
            className="btn btn-primary w-full py-3 text-sm font-bold shadow-lg shadow-brand-red/20 transition-all hover:shadow-xl"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <FormContext.Provider value={{ errors }}>
      {/* noValidate hands validation to `validate()` below. Without it the
          browser's own bubbles fire first and the inline <FieldError> messages
          are never reachable. */}
      <form onSubmit={handleSubmit} className={className} noValidate>
        {children}
        <Suspense fallback={null}>
          <UtmHiddenFields />
        </Suspense>
        {!hideConsent && (
          <label className="my-3 flex cursor-pointer items-start gap-2.5 text-left">
            <input
              type="checkbox"
              required
              defaultChecked
              name="terms_consent"
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
        )}
        {submitError && (
          <p
            role="alert"
            className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-xs font-semibold text-red-700"
          >
            {submitError}
          </p>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="btn btn-primary mt-2 w-full disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Submitting...' : submitLabel}
        </button>
      </form>
    </FormContext.Provider>
  );
}

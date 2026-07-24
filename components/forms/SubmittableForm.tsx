'use client';

import { createContext, FormEvent, ReactNode, Suspense, useContext, useState } from 'react';
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
}) {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(form: HTMLFormElement): boolean {
    const newErrors: Record<string, string> = {};

    for (const field of form.querySelectorAll('input, select, textarea')) {
      const el = field as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
      if (!el.name) continue;

      if (el.hasAttribute('required') && !el.value.trim()) {
        newErrors[el.name] = 'This field is required';
        continue;
      }

      if (el.value.trim() && validations) {
        const rule = validations.find((v) => v.name === el.name);
        if (rule?.pattern && !new RegExp(rule.pattern).test(el.value)) {
          newErrors[el.name] = rule.message;
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formElement = e.currentTarget;
    if (!validate(formElement)) return;

    // Collect all form data including UTMs and formType
    const formData = new FormData(formElement);
    const payload: Record<string, any> = {
      form_type: formType,
    };

    formData.forEach((value, key) => {
      payload[key] = value;
    });

    // Send payload asynchronously to Google Sheets and Supabase
    submitToGoogleSheets(payload);
    submitToSupabase(payload);

    onSubmit?.();
    setSubmitted(true);
    formElement.reset();
    setErrors({});
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-green-200 bg-green-50 px-6 py-16 text-center">
        <CheckCircle2 className="mb-4 text-green-600" size={40} />
        <h3 className="text-lg font-bold text-slate-900">{successTitle}</h3>
        <p className="mt-2 max-w-sm text-sm text-slate-600">{successMessage}</p>
        {successExtra}
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm font-semibold text-brand-red hover:underline"
        >
          Submit another response
        </button>
      </div>
    );
  }

  return (
    <FormContext.Provider value={{ errors }}>
      <form onSubmit={handleSubmit} className={className}>
        {children}
        <Suspense fallback={null}>
          <UtmHiddenFields />
        </Suspense>
        <button type="submit" className="btn btn-primary mt-2 w-full">
          {submitLabel}
        </button>
      </form>
    </FormContext.Provider>
  );
}

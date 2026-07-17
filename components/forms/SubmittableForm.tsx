'use client';

import { createContext, FormEvent, ReactNode, useContext, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

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
  validations,
  onSubmit,
}: {
  children: ReactNode;
  submitLabel: string;
  successTitle: string;
  successMessage: string;
  successExtra?: ReactNode;
  className?: string;
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
    if (!validate(e.currentTarget)) return;
    onSubmit?.();
    setSubmitted(true);
    e.currentTarget.reset();
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
        <button type="submit" className="btn btn-primary mt-2 w-full">
          {submitLabel}
        </button>
      </form>
    </FormContext.Provider>
  );
}

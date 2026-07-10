'use client';

import { FormEvent, ReactNode, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function SubmittableForm({
  children,
  submitLabel,
  successTitle,
  successMessage,
  className = '',
}: {
  children: ReactNode;
  submitLabel: string;
  successTitle: string;
  successMessage: string;
  className?: string;
}) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    e.currentTarget.reset();
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-green-200 bg-green-50 px-6 py-16 text-center">
        <CheckCircle2 className="mb-4 text-green-600" size={40} />
        <h3 className="text-lg font-bold text-slate-900">{successTitle}</h3>
        <p className="mt-2 max-w-sm text-sm text-slate-600">{successMessage}</p>
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
    <form onSubmit={handleSubmit} className={className}>
      {children}
      <button type="submit" className="btn btn-primary mt-2 w-full">
        {submitLabel}
      </button>
    </form>
  );
}

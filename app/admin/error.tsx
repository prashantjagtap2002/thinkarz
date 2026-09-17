'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, LayoutDashboard } from 'lucide-react';

// Admin-scoped error boundary. The public one lives in app/(site)/error.tsx and
// no longer wraps this section, so without this an admin error would escalate
// all the way to global-error.
export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled admin route error:', error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xl">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-brand-red">
          <AlertTriangle size={28} />
        </div>
        <h1 className="text-lg font-extrabold text-slate-900">Something went wrong</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          The admin console hit an unexpected error. Try again, or head back to the dashboard.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            onClick={() => reset()}
            className="btn btn-primary inline-flex w-full items-center justify-center gap-2 sm:w-auto"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
          <Link
            href="/admin"
            className="btn btn-outline inline-flex w-full items-center justify-center gap-2 sm:w-auto"
          >
            <LayoutDashboard size={16} />
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

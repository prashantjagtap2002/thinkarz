'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home, PhoneCall } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled route error caught by error boundary:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4 sm:p-6 text-center">
      <div className="w-full max-w-md rounded-2xl bg-white border border-slate-200 p-8 shadow-xl">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-brand-red">
          <AlertTriangle size={32} />
        </div>
        
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
          Something went wrong
        </h1>
        
        <p className="mt-2 text-sm text-slate-500 leading-relaxed">
          We encountered an unexpected error while loading this page. Please try again or return home.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 items-center justify-center">
          <button
            onClick={() => reset()}
            className="btn btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
          
          <Link
            href="/"
            className="btn btn-outline w-full sm:w-auto inline-flex items-center justify-center gap-2"
          >
            <Home size={16} />
            Back to Home
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-100 text-xs text-slate-400 flex items-center justify-center gap-1.5">
          <PhoneCall size={13} />
          Need assistance? <Link href="/contact-us" className="text-brand-red font-semibold hover:underline">Contact Support</Link>
        </div>
      </div>
    </div>
  );
}

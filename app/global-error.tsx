'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled global application error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-slate-900">
        <div className="w-full max-w-md rounded-2xl bg-white border border-slate-200 p-8 shadow-xl text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-[#e31e24]">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          
          <h1 className="text-xl font-bold text-slate-900">Application Error</h1>
          <p className="mt-2 text-sm text-slate-500">
            A critical error occurred. Please refresh the page to reload the application.
          </p>

          <button
            onClick={() => reset()}
            className="mt-6 w-full rounded-xl bg-[#e31e24] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#c81a20]"
          >
            Reload Application
          </button>
        </div>
      </body>
    </html>
  );
}

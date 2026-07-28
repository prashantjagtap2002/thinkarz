import Link from 'next/link';
import type { Metadata } from 'next';
import { Home, Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Page Not Found | THINKARZ',
  robots: { index: false, follow: true },
};

export default function NotFoundPage() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-8xl font-extrabold text-slate-200">404</p>
      <h1 className="mt-6 text-2xl font-extrabold text-slate-900 sm:text-3xl">
        Page Not Found
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-500">
        The page you are looking for might have been removed, had its name changed, or is
        temporarily unavailable.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link href="/" className="btn btn-primary">
          <Home size={16} />
          Back to Home
        </Link>
        <Link href="/pre-owned-cars" className="btn btn-outline">
          <Search size={16} />
          Browse Cars
        </Link>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function BackButton({
  label = 'Back',
  fallbackHref = '/pre-owned-cars',
}: {
  label?: string;
  fallbackHref?: string;
}) {
  return (
    <Link
      href={fallbackHref}
      className="group inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-xs transition-all hover:border-brand-red hover:bg-brand-red/5 hover:text-brand-red"
    >
      <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-0.5" />
      <span>{label}</span>
    </Link>
  );
}

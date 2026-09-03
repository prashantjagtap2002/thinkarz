import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import CarForm from '@/components/admin/CarForm';

export default function NewCarPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-brand-red transition mb-3"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Inventory</span>
        </Link>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          Add New Vehicle
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Upload photo to Cloudflare R2, specify pricing and features, and publish directly to the live showroom.
        </p>
      </div>

      <CarForm />
    </div>
  );
}

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { getCarByIdAdmin } from '@/lib/carsStore';
import CarForm from '@/components/admin/CarForm';

export const dynamic = 'force-dynamic';

export default async function EditCarPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const car = await getCarByIdAdmin(id);

  if (!car) notFound();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-brand-red transition mb-3"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Inventory</span>
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Edit {car.make} {car.model}
            </h1>
            {car.regNumber && (
              <span className="font-mono text-xs font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                {car.regNumber}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-slate-500">
            {car.variant} ({car.year}) &bull; Changes will sync immediately to the database and live website.
          </p>
        </div>

        <Link
          href={`/pre-owned-cars/${car.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition self-start sm:self-auto"
        >
          <span>View on Live Site</span>
          <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
        </Link>
      </div>

      <CarForm car={car} />
    </div>
  );
}

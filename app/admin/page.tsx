import Link from 'next/link';
import { Car, TrendingUp, ShieldCheck, Zap, Plus, Star } from 'lucide-react';
import { getAllCarsAdmin } from '@/lib/carsStore';
import AdminCarTable from '@/components/admin/AdminCarTable';

export const dynamic = 'force-dynamic';

function formatLakhOrCr(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }
  return `₹${(amount / 100000).toFixed(2)} Lakh`;
}

export default async function AdminDashboardPage() {
  const cars = await getAllCarsAdmin();

  const totalCars = cars.length;
  const totalValuation = cars.reduce((sum, c) => sum + (c.price || 0), 0);
  const certifiedCount = cars.filter((c) => c.certified).length;
  const ecoCount = cars.filter((c) => c.fuel === 'EV' || c.fuel === 'Hybrid').length;
  const featuredCount = cars.filter((c) => c.featured).length;
  const certifiedPct = totalCars > 0 ? Math.round((certifiedCount / totalCars) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Inventory Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Real-time control over vehicles, pricing, photos, and showroom availability.
          </p>
        </div>
        <Link
          href="/admin/cars/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-red px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-brand-redDark hover:shadow-md active:translate-y-0"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Vehicle</span>
        </Link>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {/* Total Inventory */}
        <div className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition hover:border-slate-300 hover:shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Fleet</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
              <Car className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black tracking-tight text-slate-900">{totalCars}</div>
            <div className="mt-1 text-xs text-slate-500">Active showroom listings</div>
          </div>
        </div>

        {/* Fleet Valuation */}
        <div className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition hover:border-slate-300 hover:shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Fleet Valuation</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-600 group-hover:text-white">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black tracking-tight text-slate-900">
              {formatLakhOrCr(totalValuation)}
            </div>
            <div className="mt-1 text-xs text-slate-500">Total cumulative price</div>
          </div>
        </div>

        {/* Certified Vehicles */}
        <div className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition hover:border-slate-300 hover:shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Certified Quality</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600 transition group-hover:bg-amber-600 group-hover:text-white">
              <ShieldCheck className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black tracking-tight text-slate-900">
              {certifiedCount} <span className="text-sm font-semibold text-slate-400">({certifiedPct}%)</span>
            </div>
            <div className="mt-1 text-xs text-slate-500">140-point quality checked</div>
          </div>
        </div>

        {/* EV & Hybrids */}
        <div className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition hover:border-slate-300 hover:shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Eco Mobility</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600 transition group-hover:bg-purple-600 group-hover:text-white">
              <Zap className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black tracking-tight text-slate-900">{ecoCount}</div>
            <div className="mt-1 text-xs text-slate-500">Electric & Hybrid models</div>
          </div>
        </div>

        {/* Featured on Homepage */}
        <div className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition hover:border-slate-300 hover:shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Featured</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-500 transition group-hover:bg-amber-500 group-hover:text-white">
              <Star className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black tracking-tight text-slate-900">{featuredCount}</div>
            <div className="mt-1 text-xs text-slate-500">
              {featuredCount === 0
                ? 'Homepage shows latest 4'
                : `Shown on the homepage${featuredCount > 4 ? ' (top 4)' : ''}`}
            </div>
          </div>
        </div>
      </div>

      {/* Main Inventory Table with Filter/Search */}
      <div>
        <AdminCarTable cars={cars} />
      </div>
    </div>
  );
}

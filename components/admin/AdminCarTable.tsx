'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Search,
  X,
  Pencil,
  Trash2,
  ExternalLink,
  ShieldCheck,
  Zap,
  Fuel,
  SlidersHorizontal,
  Car as CarIcon,
  AlertTriangle,
  Star,
} from 'lucide-react';
import type { Car } from '@/lib/cars';
import { formatPrice } from '@/lib/cars';

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'year-desc' | 'kms-asc';

export default function AdminCarTable({ cars: initialCars }: { cars: Car[] }) {
  const router = useRouter();
  const [cars, setCars] = useState<Car[]>(initialCars);
  const [lastServerCars, setLastServerCars] = useState<Car[]>(initialCars);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFuel, setSelectedFuel] = useState<string>('All');
  const [onlyCertified, setOnlyCertified] = useState(false);
  const [onlyFeatured, setOnlyFeatured] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [togglingId, setTogglingId] = useState<string | null>(null);

  // Delete modal state
  const [deleteCar, setDeleteCar] = useState<Car | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');

  // Re-sync when the server sends a fresh list (after router.refresh()).
  if (lastServerCars !== initialCars) {
    setLastServerCars(initialCars);
    setCars(initialCars);
  }

  // Fuel options
  const fuelOptions = useMemo(() => {
    const set = new Set(cars.map((c) => c.fuel));
    return ['All', ...Array.from(set)];
  }, [cars]);

  // Filtered and sorted cars
  const filteredCars = useMemo(() => {
    return cars
      .filter((car) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = `${car.make} ${car.model} ${car.variant}`.toLowerCase().includes(q);
          const matchReg = car.regNumber?.toLowerCase().includes(q);
          const matchCity = car.city?.toLowerCase().includes(q);
          if (!matchName && !matchReg && !matchCity) return false;
        }
        // Fuel filter
        if (selectedFuel !== 'All' && car.fuel !== selectedFuel) {
          return false;
        }
        // Certified filter
        if (onlyCertified && !car.certified) {
          return false;
        }
        // Featured filter
        if (onlyFeatured && !car.featured) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'year-desc') return b.year - a.year;
        if (sortBy === 'kms-asc') return a.kms - b.kms;
        return 0; // default order
      });
  }, [cars, searchQuery, selectedFuel, onlyCertified, onlyFeatured, sortBy]);

  // Inline homepage-feature toggle, so the "Featured Cars" strip can be curated
  // without opening each vehicle's edit form.
  async function toggleFeatured(car: Car) {
    setError('');
    setTogglingId(car.id);
    try {
      const res = await fetch(`/api/admin/cars/${car.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !car.featured }),
      });
      const data = await res.json();
      setTogglingId(null);

      if (!res.ok) {
        setError(data.error || 'Could not update the featured status.');
        return;
      }

      setCars((prev) => prev.map((c) => (c.id === car.id ? data.car : c)));
      router.refresh();
    } catch {
      setTogglingId(null);
      setError('Network error while updating the featured status.');
    }
  }

  async function confirmDelete() {
    if (!deleteCar) return;

    setError('');
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/cars/${deleteCar.id}`, { method: 'DELETE' });
      setIsDeleting(false);

      if (!res.ok) {
        setError('Failed to delete car from database.');
        return;
      }

      setCars((prev) => prev.filter((c) => c.id !== deleteCar.id));
      setDeleteCar(null);
      router.refresh();
    } catch {
      setIsDeleting(false);
      setError('An unexpected error occurred while deleting.');
    }
  }

  function getFuelBadgeColor(fuel: string) {
    switch (fuel) {
      case 'EV':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Petrol':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'Diesel':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Hybrid':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  }

  return (
    <div className="space-y-4">
      {/* Search, Filter, and Sort Controls Bar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs lg:flex-row lg:items-center lg:justify-between">
        {/* Search Bar */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by make, model, variant, or plate number…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-9 text-sm text-slate-800 placeholder:text-slate-400 transition focus:border-brand-red focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-red"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Filters & Sorting */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Fuel pills */}
          <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50/70 p-1 text-xs font-semibold">
            {fuelOptions.map((f) => (
              <button
                key={f}
                onClick={() => setSelectedFuel(f)}
                className={`rounded-lg px-2.5 py-1 transition ${
                  selectedFuel === f
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Certified Only Toggle */}
          <button
            onClick={() => setOnlyCertified(!onlyCertified)}
            className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition ${
              onlyCertified
                ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                : 'border-slate-200 bg-slate-50/70 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Certified</span>
          </button>

          {/* Featured Only Toggle */}
          <button
            onClick={() => setOnlyFeatured(!onlyFeatured)}
            className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition ${
              onlyFeatured
                ? 'border-amber-300 bg-amber-50 text-amber-800'
                : 'border-slate-200 bg-slate-50/70 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Star className={`h-3.5 w-3.5 ${onlyFeatured ? 'fill-current' : ''}`} />
            <span>Featured</span>
          </button>

          {/* Sort Dropdown */}
          <div className="relative inline-flex items-center">
            <SlidersHorizontal className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="appearance-none rounded-xl border border-slate-200 bg-slate-50/70 py-2 pl-8 pr-7 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 focus:border-brand-red focus:bg-white focus:outline-none"
            >
              <option value="newest">Sort: Default</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="year-desc">Year: Newest First</option>
              <option value="kms-asc">Lowest Mileage (KM)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Error Banner if any */}
      {error && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm font-medium text-rose-700 flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError('')} className="text-rose-500 hover:text-rose-700">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Vehicle Inventory Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs">
        {filteredCars.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <CarIcon className="h-7 w-7" />
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-900">No vehicles found</h3>
            <p className="mt-1 text-sm text-slate-500 max-w-sm">
              {searchQuery || selectedFuel !== 'All' || onlyCertified || onlyFeatured
                ? 'No cars match your current search or filter criteria. Try resetting them.'
                : 'No cars in inventory yet. Click "Add New Vehicle" to get started.'}
            </p>
            {(searchQuery || selectedFuel !== 'All' || onlyCertified || onlyFeatured) && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedFuel('All');
                  setOnlyCertified(false);
                  setOnlyFeatured(false);
                }}
                className="mt-4 text-xs font-bold text-brand-red hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200/80 bg-slate-50/70 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-3.5">Vehicle</th>
                  <th className="px-4 py-3.5">Year & Usage</th>
                  <th className="px-4 py-3.5">Price</th>
                  <th className="px-4 py-3.5">Fuel & Transmission</th>
                  <th className="px-4 py-3.5">Quality</th>
                  <th className="px-4 py-3.5">Homepage</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCars.map((car) => (
                  <tr key={car.id} className="transition-colors hover:bg-slate-50/60">
                    {/* Vehicle Identity & Photo */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3.5">
                        <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-xl border border-slate-200/80 bg-slate-100">
                          {car.image ? (
                            <Image
                              src={car.image}
                              alt={`${car.make} ${car.model}`}
                              fill
                              sizes="80px"
                              className="object-cover transition-transform duration-300 hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-slate-400">
                              <CarIcon className="h-5 w-5" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 hover:text-brand-red transition">
                              {car.make} {car.model}
                            </span>
                            {car.regNumber && (
                              <span className="font-mono text-[10px] font-semibold tracking-wider text-slate-500 bg-slate-100 border border-slate-200/70 px-1.5 py-0.5 rounded">
                                {car.regNumber}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 truncate max-w-[200px] sm:max-w-xs">
                            {car.variant}
                          </p>
                          <p className="text-[11px] text-slate-400">{car.city}</p>
                        </div>
                      </div>
                    </td>

                    {/* Year & Mileage */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="font-semibold text-slate-800">{car.year}</div>
                      <div className="text-xs text-slate-500">
                        {car.kms.toLocaleString('en-IN')} km
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {car.owners} {car.owners === 1 ? 'Owner' : 'Owners'}
                      </div>
                    </td>

                    {/* Price */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="font-extrabold text-slate-900 text-base">
                        {formatPrice(car.price)}
                      </div>
                      <div className="text-[11px] text-slate-400">Fixed & Verified</div>
                    </td>

                    {/* Fuel & Transmission */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex flex-col gap-1.5 items-start">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-bold ${getFuelBadgeColor(
                            car.fuel
                          )}`}
                        >
                          {car.fuel === 'EV' ? (
                            <Zap className="h-3 w-3 text-emerald-600" />
                          ) : (
                            <Fuel className="h-3 w-3" />
                          )}
                          <span>{car.fuel}</span>
                        </span>
                        <span className="inline-block text-xs font-medium text-slate-600">
                          {car.transmission}
                        </span>
                      </div>
                    </td>

                    {/* Quality & Certification */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      {car.certified ? (
                        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                          <span>140-Pt Certified</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs text-slate-500">
                          Inspected
                        </span>
                      )}
                    </td>

                    {/* Featured on homepage */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleFeatured(car)}
                        disabled={togglingId === car.id}
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold transition disabled:opacity-50 ${
                          car.featured
                            ? 'border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100'
                            : 'border-slate-200 bg-slate-50 text-slate-500 hover:border-amber-200 hover:bg-amber-50 hover:text-amber-700'
                        }`}
                        title={
                          car.featured
                            ? 'Remove from the homepage Featured Cars strip'
                            : 'Show in the homepage Featured Cars strip'
                        }
                      >
                        <Star className={`h-3.5 w-3.5 ${car.featured ? 'fill-current' : ''}`} />
                        <span>{car.featured ? 'Featured' : 'Not featured'}</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* View Live */}
                        <Link
                          href={`/pre-owned-cars/${car.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                          title="View on live website"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Link>

                        {/* Edit Car */}
                        <Link
                          href={`/admin/cars/${car.id}/edit`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-blue-600 transition hover:border-blue-200 hover:bg-blue-50"
                          title="Edit vehicle details"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Link>

                        {/* Delete Car */}
                        <button
                          onClick={() => setDeleteCar(car)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-rose-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
                          title="Delete vehicle"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Confirmation Modal for Delete */}
      {deleteCar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl animate-scale-up">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-50">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Delete Vehicle</h3>
                <p className="text-xs text-slate-500">This action cannot be undone</p>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-3 flex items-center gap-3">
              <div className="relative h-12 w-16 overflow-hidden rounded-lg bg-slate-200 shrink-0">
                {deleteCar.image && (
                  <Image
                    src={deleteCar.image}
                    alt={deleteCar.model}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="truncate">
                <p className="text-sm font-bold text-slate-900 truncate">
                  {deleteCar.make} {deleteCar.model}
                </p>
                <p className="text-xs text-slate-500 truncate">{deleteCar.variant} ({deleteCar.year})</p>
              </div>
            </div>

            <p className="mt-4 text-xs text-slate-500 leading-relaxed">
              Are you sure you want to permanently remove this vehicle from the database and showroom listings?
            </p>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteCar(null)}
                disabled={isDeleting}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={isDeleting}
                className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-rose-700 disabled:opacity-50 transition"
              >
                {isDeleting ? 'Deleting…' : 'Yes, Delete Vehicle'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

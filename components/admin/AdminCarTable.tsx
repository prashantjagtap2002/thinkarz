'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Car } from '@/lib/cars';
import { formatPrice } from '@/lib/cars';

export default function AdminCarTable({ cars }: { cars: Car[] }) {
  const router = useRouter();
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState('');

  async function handleDelete(id: string, label: string) {
    if (!window.confirm(`Delete ${label}? This cannot be undone.`)) return;

    setError('');
    setPendingId(id);
    const res = await fetch(`/api/admin/cars/${id}`, { method: 'DELETE' });
    setPendingId(null);

    if (!res.ok) {
      setError('Failed to delete car.');
      return;
    }
    router.refresh();
  }

  if (cars.length === 0) {
    return <p className="text-sm text-slate-500">No cars yet. Add your first one.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      {error && <p className="p-3 text-sm text-brand-red">{error}</p>}
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase text-slate-500">
          <tr>
            <th className="p-3">Car</th>
            <th className="p-3">Year</th>
            <th className="p-3">Price</th>
            <th className="p-3">City</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.id} className="border-b border-slate-100 last:border-0">
              <td className="p-3 font-semibold text-slate-900">
                {car.make} {car.model} <span className="text-slate-400">{car.variant}</span>
              </td>
              <td className="p-3">{car.year}</td>
              <td className="p-3">{formatPrice(car.price)}</td>
              <td className="p-3">{car.city}</td>
              <td className="p-3">
                <div className="flex justify-end gap-3">
                  <Link href={`/admin/cars/${car.id}/edit`} className="font-semibold text-brand-blue hover:underline">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(car.id, `${car.make} ${car.model}`)}
                    disabled={pendingId === car.id}
                    className="font-semibold text-brand-red hover:underline disabled:opacity-50"
                  >
                    {pendingId === car.id ? 'Deleting…' : 'Delete'}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

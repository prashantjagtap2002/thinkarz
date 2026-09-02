import Link from 'next/link';
import { getAllCarsAdmin } from '@/lib/carsStore';
import AdminCarTable from '@/components/admin/AdminCarTable';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const cars = await getAllCarsAdmin();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-extrabold uppercase text-slate-900">Cars ({cars.length})</h1>
        <Link href="/admin/cars/new" className="btn btn-primary">
          Add Car
        </Link>
      </div>
      <div className="mt-6">
        <AdminCarTable cars={cars} />
      </div>
    </div>
  );
}

import { notFound } from 'next/navigation';
import { getCarByIdAdmin } from '@/lib/carsStore';
import CarForm from '@/components/admin/CarForm';

export const dynamic = 'force-dynamic';

export default async function EditCarPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const car = await getCarByIdAdmin(id);

  if (!car) notFound();

  return (
    <div>
      <h1 className="mb-6 text-xl font-extrabold uppercase text-slate-900">
        Edit {car.make} {car.model}
      </h1>
      <CarForm car={car} />
    </div>
  );
}

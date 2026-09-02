import { Suspense } from 'react';
import PreOwnedCarsBrowser from '@/components/PreOwnedCarsBrowser';
import { getCars } from '@/lib/carsData';

export const metadata = {
  title: 'Pre Owned Cars in Mumbai',
  description: 'Browse quality certified pre-owned cars in Mumbai. Filter by budget, body type, age and more to find your perfect car.',
  alternates: { canonical: '/pre-owned-cars' },
};

export const revalidate = 60;

export default async function PreOwnedCarsPage() {
  const cars = await getCars();

  return (
    <Suspense fallback={
      <div className="container-page py-20 text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-brand-red" />
        <p className="mt-4 text-sm text-slate-500">Loading cars...</p>
      </div>
    }>
      <PreOwnedCarsBrowser cars={cars} />
    </Suspense>
  );
}

import { Suspense } from 'react';
import PreOwnedCarsBrowser from '@/components/PreOwnedCarsBrowser';

export const metadata = {
  title: 'Pre Owned Cars | Thinkarz',
  description: 'Browse quality certified pre-owned cars in Mumbai. Filter by budget, body type, age and more to find your perfect car.',
};

export default function PreOwnedCarsPage() {
  return (
    <Suspense fallback={
      <div className="container-page py-20 text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-brand-red" />
        <p className="mt-4 text-sm text-slate-500">Loading cars...</p>
      </div>
    }>
      <PreOwnedCarsBrowser />
    </Suspense>
  );
}

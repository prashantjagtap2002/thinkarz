import { Suspense } from 'react';
import PreOwnedCarsBrowser from '@/components/PreOwnedCarsBrowser';

export const metadata = { title: 'Pre Owned Cars | Thinkarz' };

export default function PreOwnedCarsPage() {
  return (
    <Suspense>
      <PreOwnedCarsBrowser />
    </Suspense>
  );
}

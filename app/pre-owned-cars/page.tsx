import { Suspense } from 'react';
import PreOwnedCarsBrowser from '@/components/PreOwnedCarsBrowser';

export const metadata = { title: 'Pre Owned Cars | ThinkArz' };

export default function PreOwnedCarsPage() {
  return (
    <Suspense>
      <PreOwnedCarsBrowser />
    </Suspense>
  );
}

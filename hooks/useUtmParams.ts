'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

export function useUtmParams() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return useMemo(() => ({
    utm_source: searchParams.get('utm_source') || '',
    utm_medium: searchParams.get('utm_medium') || '',
    utm_campaign: searchParams.get('utm_campaign') || '',
    utm_term: searchParams.get('utm_term') || '',
    utm_content: searchParams.get('utm_content') || '',
    page_url: pathname,
  }), [pathname, searchParams]);
}

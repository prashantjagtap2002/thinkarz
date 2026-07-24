'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export interface UtmParams {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  page_url: string;
}

const STORAGE_KEY = 'thinkarz_utm_params';

export function useUtmParams(): UtmParams {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [storedUtm, setStoredUtm] = useState<Partial<UtmParams>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const urlSource = searchParams.get('utm_source');
    const urlMedium = searchParams.get('utm_medium');
    const urlCampaign = searchParams.get('utm_campaign');
    const urlTerm = searchParams.get('utm_term');
    const urlContent = searchParams.get('utm_content');

    const hasNewUrlUtms = Boolean(urlSource || urlMedium || urlCampaign || urlTerm || urlContent);

    let existingUtm: Partial<UtmParams> = {};
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) existingUtm = JSON.parse(stored);
    } catch {}

    if (hasNewUrlUtms) {
      const newUtmObj: Partial<UtmParams> = {
        utm_source: urlSource || existingUtm.utm_source || '',
        utm_medium: urlMedium || existingUtm.utm_medium || '',
        utm_campaign: urlCampaign || existingUtm.utm_campaign || '',
        utm_term: urlTerm || existingUtm.utm_term || '',
        utm_content: urlContent || existingUtm.utm_content || '',
      };
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newUtmObj));
      } catch {}
      setStoredUtm(newUtmObj);
    } else {
      setStoredUtm(existingUtm);
    }
  }, [pathname, searchParams]);

  // Use URL params directly if present, otherwise fall back to session storage
  const currentUtmSource = searchParams.get('utm_source') || storedUtm.utm_source || '';
  const currentUtmMedium = searchParams.get('utm_medium') || storedUtm.utm_medium || '';
  const currentUtmCampaign = searchParams.get('utm_campaign') || storedUtm.utm_campaign || '';
  const currentUtmTerm = searchParams.get('utm_term') || storedUtm.utm_term || '';
  const currentUtmContent = searchParams.get('utm_content') || storedUtm.utm_content || '';

  // Return empty strings during SSR to prevent hydration mismatch, rely on client-side values once mounted
  return {
    utm_source: mounted ? currentUtmSource : '',
    utm_medium: mounted ? currentUtmMedium : '',
    utm_campaign: mounted ? currentUtmCampaign : '',
    utm_term: mounted ? currentUtmTerm : '',
    utm_content: mounted ? currentUtmContent : '',
    page_url: mounted ? pathname || '' : '',
  };
}

'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

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
  const [storedUtm, setStoredUtm] = useState<Partial<UtmParams>>({});

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const searchParams = new URLSearchParams(window.location.search);
      const urlSource = searchParams.get('utm_source');
      const urlMedium = searchParams.get('utm_medium');
      const urlCampaign = searchParams.get('utm_campaign');
      const urlTerm = searchParams.get('utm_term');
      const urlContent = searchParams.get('utm_content');

      const hasNewUrlUtms = Boolean(urlSource || urlMedium || urlCampaign || urlTerm || urlContent);

      let existingUtm: Partial<UtmParams> = {};
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        existingUtm = JSON.parse(stored);
      }

      if (hasNewUrlUtms) {
        const newUtmObj: Partial<UtmParams> = {
          utm_source: urlSource || existingUtm.utm_source || '',
          utm_medium: urlMedium || existingUtm.utm_medium || '',
          utm_campaign: urlCampaign || existingUtm.utm_campaign || '',
          utm_term: urlTerm || existingUtm.utm_term || '',
          utm_content: urlContent || existingUtm.utm_content || '',
        };
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newUtmObj));
        setStoredUtm(newUtmObj);
      } else {
        setStoredUtm(existingUtm);
      }
    } catch {
      // Ignore storage errors
    }
  }, [pathname]);

  return useMemo(() => {
    let urlSource = '';
    let urlMedium = '';
    let urlCampaign = '';
    let urlTerm = '';
    let urlContent = '';

    if (typeof window !== 'undefined') {
      try {
        const searchParams = new URLSearchParams(window.location.search);
        urlSource = searchParams.get('utm_source') || '';
        urlMedium = searchParams.get('utm_medium') || '';
        urlCampaign = searchParams.get('utm_campaign') || '';
        urlTerm = searchParams.get('utm_term') || '';
        urlContent = searchParams.get('utm_content') || '';
      } catch {
        // Fallback
      }
    }

    return {
      utm_source: urlSource || storedUtm.utm_source || '',
      utm_medium: urlMedium || storedUtm.utm_medium || '',
      utm_campaign: urlCampaign || storedUtm.utm_campaign || '',
      utm_term: urlTerm || storedUtm.utm_term || '',
      utm_content: urlContent || storedUtm.utm_content || '',
      page_url: pathname || '',
    };
  }, [pathname, storedUtm]);
}

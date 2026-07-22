'use client';

import { usePathname, useSearchParams } from 'next/navigation';
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
  const searchParams = useSearchParams();

  const [storedUtm, setStoredUtm] = useState<Partial<UtmParams>>({});

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if new UTM params are present in the current URL
    const urlSource = searchParams.get('utm_source');
    const urlMedium = searchParams.get('utm_medium');
    const urlCampaign = searchParams.get('utm_campaign');
    const urlTerm = searchParams.get('utm_term');
    const urlContent = searchParams.get('utm_content');

    const hasNewUrlUtms = Boolean(urlSource || urlMedium || urlCampaign || urlTerm || urlContent);

    // Retrieve existing stored UTM params if available
    let existingUtm: Partial<UtmParams> = {};
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        existingUtm = JSON.parse(stored);
      }
    } catch {
      // Ignore storage read errors
    }

    if (hasNewUrlUtms) {
      // Overwrite/update storage if URL contains new UTM parameters
      const newUtmObj: Partial<UtmParams> = {
        utm_source: urlSource || existingUtm.utm_source || '',
        utm_medium: urlMedium || existingUtm.utm_medium || '',
        utm_campaign: urlCampaign || existingUtm.utm_campaign || '',
        utm_term: urlTerm || existingUtm.utm_term || '',
        utm_content: urlContent || existingUtm.utm_content || '',
      };

      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newUtmObj));
      } catch {
        // Ignore storage write errors
      }

      setStoredUtm(newUtmObj);
    } else {
      // Use existing stored UTM parameters
      setStoredUtm(existingUtm);
    }
  }, [searchParams]);

  return useMemo(() => {
    // Current URL UTM params take immediate precedence, fallback to stored session UTMs
    const source = searchParams.get('utm_source') || storedUtm.utm_source || '';
    const medium = searchParams.get('utm_medium') || storedUtm.utm_medium || '';
    const campaign = searchParams.get('utm_campaign') || storedUtm.utm_campaign || '';
    const term = searchParams.get('utm_term') || storedUtm.utm_term || '';
    const content = searchParams.get('utm_content') || storedUtm.utm_content || '';

    return {
      utm_source: source,
      utm_medium: medium,
      utm_campaign: campaign,
      utm_term: term,
      utm_content: content,
      page_url: pathname,
    };
  }, [pathname, searchParams, storedUtm]);
}

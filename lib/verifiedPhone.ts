'use client';

import { useEffect, useState } from 'react';

const PHONE_KEY = 'thinkarz_verified_phone';
const CODE_KEY = 'thinkarz_verified_country_code';

export interface VerifiedPhoneData {
  phone: string;
  countryCode: string;
}

export function getVerifiedPhone(): VerifiedPhoneData | null {
  if (typeof window === 'undefined') return null;
  try {
    const phone = localStorage.getItem(PHONE_KEY);
    const countryCode = localStorage.getItem(CODE_KEY) || '+91';
    if (phone) return { phone, countryCode };
  } catch (e) {
    console.error('Error reading verified phone:', e);
  }
  return null;
}

export function setVerifiedPhone(phone: string, countryCode: string = '+91'): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PHONE_KEY, phone);
    localStorage.setItem(CODE_KEY, countryCode);
    window.dispatchEvent(new Event('thinkarz_verified_phone_changed'));
  } catch (e) {
    console.error('Error saving verified phone:', e);
  }
}

export function clearVerifiedPhone(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(PHONE_KEY);
    localStorage.removeItem(CODE_KEY);
    window.dispatchEvent(new Event('thinkarz_verified_phone_changed'));
  } catch (e) {
    console.error('Error clearing verified phone:', e);
  }
}

export function useVerifiedPhone() {
  const [verifiedData, setVerifiedDataState] = useState<VerifiedPhoneData | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setVerifiedDataState(getVerifiedPhone());
    setIsLoaded(true);

    const handleStorageChange = () => {
      setVerifiedDataState(getVerifiedPhone());
    };

    window.addEventListener('thinkarz_verified_phone_changed', handleStorageChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('thinkarz_verified_phone_changed', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const saveVerification = (phone: string, countryCode: string) => {
    setVerifiedPhone(phone, countryCode);
    setVerifiedDataState({ phone, countryCode });
  };

  const resetVerification = () => {
    clearVerifiedPhone();
    setVerifiedDataState(null);
  };

  return {
    verifiedData,
    isVerified: !!verifiedData,
    isLoaded,
    saveVerification,
    resetVerification,
  };
}

'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'thinkarz_v_session';
const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 Hours

export interface VerifiedPhoneData {
  phone: string;
  countryCode: string;
  expiresAt: number;
}

function obfuscateData(data: VerifiedPhoneData): string {
  try {
    return btoa(JSON.stringify(data));
  } catch {
    return '';
  }
}

function deobfuscateData(token: string): VerifiedPhoneData | null {
  try {
    const json = atob(token);
    const parsed = JSON.parse(json);
    if (parsed && typeof parsed.phone === 'string' && typeof parsed.expiresAt === 'number') {
      if (Date.now() < parsed.expiresAt) {
        return parsed;
      }
    }
  } catch {
    // Malformed or expired
  }
  return null;
}

export function getVerifiedPhone(): VerifiedPhoneData | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = deobfuscateData(raw);
    if (!data) {
      clearVerifiedPhone();
      return null;
    }
    return data;
  } catch (e) {
    return null;
  }
}

export function setVerifiedPhone(phone: string, countryCode: string = '+91'): void {
  if (typeof window === 'undefined') return;
  try {
    const sessionData: VerifiedPhoneData = {
      phone,
      countryCode,
      expiresAt: Date.now() + SESSION_TTL_MS,
    };
    const token = obfuscateData(sessionData);
    localStorage.setItem(STORAGE_KEY, token);
    window.dispatchEvent(new Event('thinkarz_verified_phone_changed'));
  } catch (e) {
    // Error writing verification
  }
}

export function clearVerifiedPhone(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    // Remove legacy keys if present
    localStorage.removeItem('thinkarz_verified_phone');
    localStorage.removeItem('thinkarz_verified_country_code');
    window.dispatchEvent(new Event('thinkarz_verified_phone_changed'));
  } catch (e) {
    // Error clearing verification
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
    setVerifiedDataState({ phone, countryCode, expiresAt: Date.now() + SESSION_TTL_MS });
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

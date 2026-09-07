import { cookies } from 'next/headers';
import { ADMIN_SESSION_COOKIE, type AdminSession, readSessionToken } from '@/lib/adminAuth';

// Reads the signed session cookie in server components and route handlers.
// proxy.ts has already rejected unauthenticated requests to /admin and
// /api/admin, so a null here means the cookie expired mid-request.
export async function getAdminSession(): Promise<AdminSession | null> {
  const store = await cookies();
  return readSessionToken(store.get(ADMIN_SESSION_COOKIE)?.value);
}

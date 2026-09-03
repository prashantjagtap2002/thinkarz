import { createHmac, timingSafeEqual } from 'crypto';

export const ADMIN_SESSION_COOKIE = 'thinkarz_admin_session';
const SESSION_VALUE = 'admin-authenticated';

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error('ADMIN_SESSION_SECRET is not set. Add it to .env.local.');
  }
  return secret;
}

export function checkAdminCredentials(username: string, password: string): boolean {
  const expectedUser = process.env.ADMIN_USERNAME || 'admin';
  const expectedPass = process.env.ADMIN_PASSWORD || 'thinkarz-admin-2026';
  
  if (username.trim() !== expectedUser.trim()) return false;

  const a = Buffer.from(password);
  const b = Buffer.from(expectedPass);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function createSessionToken(): string {
  const signature = createHmac('sha256', getSecret()).update(SESSION_VALUE).digest('hex');
  return `${SESSION_VALUE}.${signature}`;
}

export function isValidSessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const [value, signature] = token.split('.');
  if (value !== SESSION_VALUE || !signature) return false;
  const expected = createHmac('sha256', getSecret()).update(SESSION_VALUE).digest('hex');
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

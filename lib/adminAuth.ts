import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'crypto';

export const ADMIN_SESSION_COOKIE = 'thinkarz_admin_session';

export type AdminRole = 'admin' | 'editor';

export type AdminSession = {
  username: string;
  name: string;
  role: AdminRole;
  exp: number;
};

export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error('ADMIN_SESSION_SECRET is not set. Add it to .env.local.');
  }
  return secret;
}

/* -------------------------------------------------------------------------- */
/* Password hashing                                                            */
/* -------------------------------------------------------------------------- */

const SCRYPT_KEYLEN = 64;

// Stored as `scrypt$<salt-hex>$<hash-hex>` so the scheme can be swapped later
// without a migration guessing game.
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(password, salt, SCRYPT_KEYLEN).toString('hex');
  return `scrypt$${salt}$${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [scheme, salt, hash] = (stored || '').split('$');
  if (scheme !== 'scrypt' || !salt || !hash) return false;

  const expected = Buffer.from(hash, 'hex');
  const actual = scryptSync(password, salt, SCRYPT_KEYLEN);
  if (expected.length !== actual.length) return false;
  return timingSafeEqual(expected, actual);
}

export function validatePasswordStrength(password: string): string | null {
  if (typeof password !== 'string' || password.length < 8) {
    return 'Password must be at least 8 characters long.';
  }
  if (password.length > 200) {
    return 'Password must be under 200 characters.';
  }
  if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
    return 'Password must contain at least one letter and one number.';
  }
  return null;
}

export function validateUsername(username: string): string | null {
  if (typeof username !== 'string' || username.trim().length < 3) {
    return 'Username must be at least 3 characters long.';
  }
  if (!/^[a-zA-Z0-9._-]+$/.test(username.trim())) {
    return 'Username may only contain letters, numbers, dots, hyphens and underscores.';
  }
  if (username.trim().length > 40) {
    return 'Username must be under 40 characters.';
  }
  return null;
}

export function normalizeUsername(username: string): string {
  return username.trim().toLowerCase();
}

/* -------------------------------------------------------------------------- */
/* Environment-backed root admin                                               */
/* -------------------------------------------------------------------------- */

// The root admin from .env.local always works, so the console can never be
// locked out even if every database user is deleted or the table is missing.
export function checkRootAdminCredentials(username: string, password: string): boolean {
  const expectedUser = process.env.ADMIN_USERNAME || 'admin';
  const expectedPass = process.env.ADMIN_PASSWORD || 'thinkarz-admin-2026';

  if (normalizeUsername(username) !== normalizeUsername(expectedUser)) return false;

  const a = Buffer.from(password);
  const b = Buffer.from(expectedPass);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function getRootAdminUsername(): string {
  return normalizeUsername(process.env.ADMIN_USERNAME || 'admin');
}

/* -------------------------------------------------------------------------- */
/* Session tokens                                                              */
/* -------------------------------------------------------------------------- */

function base64UrlEncode(value: string): string {
  return Buffer.from(value, 'utf8').toString('base64url');
}

function base64UrlDecode(value: string): string {
  return Buffer.from(value, 'base64url').toString('utf8');
}

function sign(payload: string): string {
  return createHmac('sha256', getSecret()).update(payload).digest('hex');
}

export function createSessionToken(session: Omit<AdminSession, 'exp'>): string {
  const payload: AdminSession = {
    ...session,
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS,
  };
  const encoded = base64UrlEncode(JSON.stringify(payload));
  return `${encoded}.${sign(encoded)}`;
}

export function readSessionToken(token: string | undefined | null): AdminSession | null {
  if (!token) return null;

  const [encoded, signature] = token.split('.');
  if (!encoded || !signature) return null;

  const expected = sign(encoded);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  try {
    const session = JSON.parse(base64UrlDecode(encoded)) as AdminSession;
    if (typeof session.exp !== 'number' || session.exp * 1000 < Date.now()) return null;
    if (typeof session.username !== 'string' || !session.username) return null;
    if (session.role !== 'admin' && session.role !== 'editor') return null;
    return session;
  } catch {
    return null;
  }
}

export function isValidSessionToken(token: string | undefined | null): boolean {
  return readSessionToken(token) !== null;
}

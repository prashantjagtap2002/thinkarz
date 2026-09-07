import { NextRequest, NextResponse } from 'next/server';
import {
  ADMIN_SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  checkRootAdminCredentials,
  createSessionToken,
  getRootAdminUsername,
} from '@/lib/adminAuth';
import { authenticateAdminUser } from '@/lib/adminUsers';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  if (typeof username !== 'string' || typeof password !== 'string') {
    return NextResponse.json({ error: 'Incorrect username or password' }, { status: 401 });
  }

  // The .env root admin wins first so the console is never locked out.
  let session: Parameters<typeof createSessionToken>[0] | null = null;

  if (checkRootAdminCredentials(username, password)) {
    session = { username: getRootAdminUsername(), name: 'Root Administrator', role: 'admin' };
  } else {
    const user = await authenticateAdminUser(username, password);
    if (user) {
      session = { username: user.username, name: user.name || user.username, role: user.role };
    }
  }

  if (!session) {
    return NextResponse.json({ error: 'Incorrect username or password' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true, user: session });
  response.cookies.set(ADMIN_SESSION_COOKIE, createSessionToken(session), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  return response;
}

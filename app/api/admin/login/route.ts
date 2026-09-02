import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_SESSION_COOKIE, checkAdminCredentials, createSessionToken } from '@/lib/adminAuth';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const { username, password } = await request.json();

  if (
    typeof username !== 'string' ||
    typeof password !== 'string' ||
    !checkAdminCredentials(username, password)
  ) {
    return NextResponse.json({ error: 'Incorrect username or password' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 8,
  });
  return response;
}

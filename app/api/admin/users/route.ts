import { NextRequest, NextResponse } from 'next/server';
import {
  type AdminRole,
  normalizeUsername,
  validatePasswordStrength,
  validateUsername,
  getRootAdminUsername,
} from '@/lib/adminAuth';
import { getAdminSession } from '@/lib/adminSession';
import {
  AdminUsersTableMissingError,
  adminUsernameExists,
  createAdminUser,
  listAdminUsers,
} from '@/lib/adminUsers';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SETUP_HINT =
  'The admin_users table does not exist yet. Run supabase/add_featured_and_admin_users.sql in the Supabase SQL editor.';

async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) {
    return { error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) };
  }
  if (session.role !== 'admin') {
    return {
      error: NextResponse.json(
        { error: 'Only administrators can manage console users.' },
        { status: 403 },
      ),
    };
  }
  return { session };
}

export async function GET() {
  const guard = await requireAdmin();
  if (guard.error) return guard.error;

  try {
    const users = await listAdminUsers();
    return NextResponse.json({ users });
  } catch (err) {
    if (err instanceof AdminUsersTableMissingError) {
      return NextResponse.json({ users: [], setupRequired: true, error: SETUP_HINT });
    }
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const guard = await requireAdmin();
  if (guard.error) return guard.error;

  const body = await request.json();
  const { username, password, name, email, role } = body ?? {};

  const errors: string[] = [];

  const usernameError = validateUsername(String(username ?? ''));
  if (usernameError) errors.push(usernameError);

  const passwordError = validatePasswordStrength(String(password ?? ''));
  if (passwordError) errors.push(passwordError);

  if (typeof name !== 'string' || name.trim().length < 2) {
    errors.push('Full name must be at least 2 characters long.');
  }

  if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(email).trim())) {
    errors.push('Please enter a valid email address.');
  }

  if (role !== 'admin' && role !== 'editor') {
    errors.push('Role must be either "admin" or "editor".');
  }

  if (errors.length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  const normalized = normalizeUsername(String(username));

  // The .env root admin is not a database row; blocking the name keeps login
  // unambiguous, since root credentials are checked first.
  if (normalized === getRootAdminUsername()) {
    return NextResponse.json(
      { errors: [`"${normalized}" is reserved for the root administrator account.`] },
      { status: 400 },
    );
  }

  try {
    if (await adminUsernameExists(normalized)) {
      return NextResponse.json(
        { errors: [`A user with the username "${normalized}" already exists.`] },
        { status: 409 },
      );
    }

    const user = await createAdminUser({
      username: normalized,
      password: String(password),
      name: String(name),
      email: email ? String(email) : null,
      role: role as AdminRole,
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (err) {
    if (err instanceof AdminUsersTableMissingError) {
      return NextResponse.json({ errors: [SETUP_HINT], setupRequired: true }, { status: 503 });
    }
    return NextResponse.json({ errors: [(err as Error).message] }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { validatePasswordStrength } from '@/lib/adminAuth';
import { getAdminSession } from '@/lib/adminSession';
import { deleteAdminUser, getAdminUserById, updateAdminUser } from '@/lib/adminUsers';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

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

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin();
  if (guard.error) return guard.error;

  const { id } = await params;
  const existing = await getAdminUserById(id);
  if (!existing) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const body = await request.json();
  const { name, email, role, active, password } = body ?? {};
  const errors: string[] = [];

  if (password !== undefined) {
    const passwordError = validatePasswordStrength(String(password));
    if (passwordError) errors.push(passwordError);
  }

  if (name !== undefined && (typeof name !== 'string' || name.trim().length < 2)) {
    errors.push('Full name must be at least 2 characters long.');
  }

  if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(email).trim())) {
    errors.push('Please enter a valid email address.');
  }

  if (role !== undefined && role !== 'admin' && role !== 'editor') {
    errors.push('Role must be either "admin" or "editor".');
  }

  // Guard against an admin demoting or disabling their own account and losing
  // access to this screen.
  const isSelf = guard.session!.username === existing.username;
  if (isSelf && role !== undefined && role !== 'admin') {
    errors.push('You cannot change your own role.');
  }
  if (isSelf && active === false) {
    errors.push('You cannot deactivate your own account.');
  }

  if (errors.length > 0) {
    return NextResponse.json({ errors }, { status: 400 });
  }

  try {
    const user = await updateAdminUser(id, {
      name: name === undefined ? undefined : String(name),
      email: email === undefined ? undefined : email ? String(email) : null,
      role: role === undefined ? undefined : role,
      active: active === undefined ? undefined : Boolean(active),
      password: password === undefined ? undefined : String(password),
    });
    return NextResponse.json({ user });
  } catch (err) {
    return NextResponse.json({ errors: [(err as Error).message] }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin();
  if (guard.error) return guard.error;

  const { id } = await params;
  const existing = await getAdminUserById(id);
  if (!existing) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  if (guard.session!.username === existing.username) {
    return NextResponse.json({ error: 'You cannot delete your own account.' }, { status: 400 });
  }

  await deleteAdminUser(id);
  return NextResponse.json({ ok: true });
}

import { createAdminClient } from '@/lib/supabaseAdmin';
import {
  type AdminRole,
  hashPassword,
  normalizeUsername,
  verifyPassword,
} from '@/lib/adminAuth';

// What the browser is allowed to see — never the password hash.
export type AdminUser = {
  id: string;
  username: string;
  name: string;
  email: string | null;
  role: AdminRole;
  active: boolean;
  lastLoginAt: string | null;
  createdAt: string;
};

type AdminUserRow = {
  id: string;
  username: string;
  name: string | null;
  email: string | null;
  role: AdminRole;
  active: boolean;
  password_hash: string;
  last_login_at: string | null;
  created_at: string;
};

function mapRowToUser(row: AdminUserRow): AdminUser {
  return {
    id: row.id,
    username: row.username,
    name: row.name || '',
    email: row.email,
    role: row.role,
    active: row.active,
    lastLoginAt: row.last_login_at,
    createdAt: row.created_at,
  };
}

// Thrown when the admin_users table has not been created yet, so callers can
// degrade gracefully instead of crashing the whole console.
export class AdminUsersTableMissingError extends Error {}

function isMissingTable(message: string): boolean {
  return /relation .*admin_users.* does not exist|could not find the table/i.test(message);
}

export async function listAdminUsers(): Promise<AdminUser[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('admin_users')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    if (isMissingTable(error.message)) throw new AdminUsersTableMissingError(error.message);
    throw new Error(error.message);
  }
  return (data ?? []).map((row) => mapRowToUser(row as AdminUserRow));
}

export async function getAdminUserById(id: string): Promise<AdminUser | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase.from('admin_users').select('*').eq('id', id).maybeSingle();
  if (error) throw new Error(error.message);
  return data ? mapRowToUser(data as AdminUserRow) : null;
}

export async function adminUsernameExists(username: string): Promise<boolean> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('admin_users')
    .select('id')
    .eq('username', normalizeUsername(username))
    .maybeSingle();

  if (error) {
    if (isMissingTable(error.message)) throw new AdminUsersTableMissingError(error.message);
    throw new Error(error.message);
  }
  return Boolean(data);
}

export async function createAdminUser(input: {
  username: string;
  password: string;
  name: string;
  email?: string | null;
  role: AdminRole;
}): Promise<AdminUser> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('admin_users')
    .insert({
      username: normalizeUsername(input.username),
      name: input.name.trim(),
      email: input.email?.trim() || null,
      role: input.role,
      password_hash: hashPassword(input.password),
      active: true,
    })
    .select('*')
    .single();

  if (error) {
    if (isMissingTable(error.message)) throw new AdminUsersTableMissingError(error.message);
    throw new Error(error.message);
  }
  return mapRowToUser(data as AdminUserRow);
}

export async function updateAdminUser(
  id: string,
  updates: { name?: string; email?: string | null; role?: AdminRole; active?: boolean; password?: string },
): Promise<AdminUser> {
  const supabase = createAdminClient();

  const row: Record<string, unknown> = {};
  if (updates.name !== undefined) row.name = updates.name.trim();
  if (updates.email !== undefined) row.email = updates.email?.trim() || null;
  if (updates.role !== undefined) row.role = updates.role;
  if (updates.active !== undefined) row.active = updates.active;
  if (updates.password) row.password_hash = hashPassword(updates.password);

  const { data, error } = await supabase
    .from('admin_users')
    .update(row)
    .eq('id', id)
    .select('*')
    .single();

  if (error) throw new Error(error.message);
  return mapRowToUser(data as AdminUserRow);
}

export async function deleteAdminUser(id: string): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase.from('admin_users').delete().eq('id', id);
  if (error) throw new Error(error.message);
}

// Returns the user when the password matches and the account is active.
// A missing admin_users table is treated as "no database users", so the
// environment-backed root admin still gets in.
export async function authenticateAdminUser(
  username: string,
  password: string,
): Promise<AdminUser | null> {
  let row: AdminUserRow | null = null;

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('username', normalizeUsername(username))
      .maybeSingle();

    if (error) {
      if (isMissingTable(error.message)) return null;
      throw new Error(error.message);
    }
    row = (data as AdminUserRow) ?? null;
  } catch {
    return null;
  }

  if (!row || !row.active) return null;
  if (!verifyPassword(password, row.password_hash)) return null;

  await touchLastLogin(row.id);
  return mapRowToUser(row);
}

async function touchLastLogin(id: string): Promise<void> {
  try {
    const supabase = createAdminClient();
    await supabase.from('admin_users').update({ last_login_at: new Date().toISOString() }).eq('id', id);
  } catch {
    // A failed timestamp update must never block a valid login.
  }
}

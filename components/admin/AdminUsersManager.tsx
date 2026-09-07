'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  AlertTriangle,
  CheckCircle2,
  Database,
  Eye,
  EyeOff,
  KeyRound,
  Mail,
  Plus,
  Power,
  RefreshCw,
  ShieldCheck,
  Trash2,
  UserPlus,
  Users as UsersIcon,
  X,
} from 'lucide-react';
import type { AdminUser } from '@/lib/adminUsers';

type Role = 'admin' | 'editor';

type NewUserForm = {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: Role;
};

const EMPTY_FORM: NewUserForm = {
  name: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'editor',
};

function generatePassword(): string {
  const letters = 'abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ';
  const digits = '23456789';
  const symbols = '!@#$%&*';
  const all = letters + digits + symbols;

  const bytes = new Uint32Array(14);
  crypto.getRandomValues(bytes);

  // Guarantee the mix the server-side strength check asks for.
  const chars = [
    letters[bytes[0] % letters.length],
    digits[bytes[1] % digits.length],
    symbols[bytes[2] % symbols.length],
  ];
  for (let i = 3; i < bytes.length; i += 1) {
    chars.push(all[bytes[i] % all.length]);
  }
  return chars.join('');
}

function formatDate(value: string | null): string {
  if (!value) return '—';
  return new Date(value).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export default function AdminUsersManager({
  initialUsers,
  currentUsername,
  setupRequired,
}: {
  initialUsers: AdminUser[];
  currentUsername: string;
  setupRequired: boolean;
}) {
  const router = useRouter();
  const [users, setUsers] = useState<AdminUser[]>(initialUsers);
  const [showAddForm, setShowAddForm] = useState(initialUsers.length === 0 && !setupRequired);
  const [form, setForm] = useState<NewUserForm>(EMPTY_FORM);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [notice, setNotice] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<AdminUser | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [resetTarget, setResetTarget] = useState<AdminUser | null>(null);
  const [resetPassword, setResetPassword] = useState('');
  const [isResetting, setIsResetting] = useState(false);

  function set<K extends keyof NewUserForm>(key: K, value: NewUserForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    setErrors([]);
    setNotice('');

    const clientErrors: string[] = [];
    if (form.name.trim().length < 2) clientErrors.push('Full name must be at least 2 characters long.');
    if (form.username.trim().length < 3) clientErrors.push('Username must be at least 3 characters long.');
    if (!/^[a-zA-Z0-9._-]*$/.test(form.username.trim())) {
      clientErrors.push('Username may only contain letters, numbers, dots, hyphens and underscores.');
    }
    if (form.password.length < 8) clientErrors.push('Password must be at least 8 characters long.');
    if (!/[a-zA-Z]/.test(form.password) || !/[0-9]/.test(form.password)) {
      clientErrors.push('Password must contain at least one letter and one number.');
    }
    if (form.password !== form.confirmPassword) clientErrors.push('The two passwords do not match.');

    if (clientErrors.length > 0) {
      setErrors(clientErrors);
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          username: form.username.trim(),
          email: form.email.trim() || null,
          password: form.password,
          role: form.role,
        }),
      });
      const data = await res.json();
      setIsSaving(false);

      if (!res.ok) {
        setErrors(data.errors || [data.error || 'Could not create this user.']);
        return;
      }

      setUsers((prev) => [...prev, data.user]);
      setNotice(`User "${data.user.username}" created. Share the password with them securely.`);
      setForm(EMPTY_FORM);
      setShowAddForm(false);
      router.refresh();
    } catch {
      setIsSaving(false);
      setErrors(['Network error while creating the user.']);
    }
  }

  async function toggleActive(user: AdminUser) {
    setErrors([]);
    setNotice('');
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !user.active }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrors(data.errors || [data.error || 'Could not update this user.']);
        return;
      }

      setUsers((prev) => prev.map((u) => (u.id === user.id ? data.user : u)));
      setNotice(`"${user.username}" is now ${data.user.active ? 'active' : 'suspended'}.`);
    } catch {
      setErrors(['Network error while updating the user.']);
    }
  }

  async function changeRole(user: AdminUser, role: Role) {
    setErrors([]);
    setNotice('');
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrors(data.errors || [data.error || 'Could not update this user.']);
        return;
      }

      setUsers((prev) => prev.map((u) => (u.id === user.id ? data.user : u)));
      setNotice(`"${user.username}" is now ${role === 'admin' ? 'an Administrator' : 'an Editor'}.`);
    } catch {
      setErrors(['Network error while updating the user.']);
    }
  }

  async function confirmReset() {
    if (!resetTarget) return;
    setErrors([]);

    setIsResetting(true);
    try {
      const res = await fetch(`/api/admin/users/${resetTarget.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: resetPassword }),
      });
      const data = await res.json();
      setIsResetting(false);

      if (!res.ok) {
        setErrors(data.errors || [data.error || 'Could not reset the password.']);
        return;
      }

      setNotice(`Password updated for "${resetTarget.username}".`);
      setResetTarget(null);
      setResetPassword('');
    } catch {
      setIsResetting(false);
      setErrors(['Network error while resetting the password.']);
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;
    setErrors([]);

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/users/${deleteTarget.id}`, { method: 'DELETE' });
      const data = await res.json().catch(() => ({}));
      setIsDeleting(false);

      if (!res.ok) {
        setErrors([data.error || 'Could not delete this user.']);
        setDeleteTarget(null);
        return;
      }

      setUsers((prev) => prev.filter((u) => u.id !== deleteTarget.id));
      setNotice(`User "${deleteTarget.username}" removed.`);
      setDeleteTarget(null);
      router.refresh();
    } catch {
      setIsDeleting(false);
      setErrors(['Network error while deleting the user.']);
    }
  }

  if (setupRequired) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
            <Database className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">One-time database setup needed</h3>
            <p className="mt-1 text-sm text-slate-600">
              The <code className="rounded bg-white px-1 py-0.5 text-xs">admin_users</code> table
              has not been created yet. Open the Supabase dashboard, go to{' '}
              <strong>SQL Editor &rsaquo; New Query</strong>, paste the contents of{' '}
              <code className="rounded bg-white px-1 py-0.5 text-xs">
                supabase/add_featured_and_admin_users.sql
              </code>{' '}
              and run it. Then reload this page.
            </p>
            <p className="mt-2 text-xs text-slate-500">
              Until then you can still sign in with the root administrator credentials from your
              environment configuration.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Feedback banners */}
      {errors.length > 0 && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50/80 p-5 shadow-xs">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h4 className="text-sm font-bold text-rose-800">Please review the following:</h4>
              <ul className="mt-2 list-inside list-disc space-y-1 text-xs font-medium text-rose-700">
                {errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
            <button onClick={() => setErrors([])} className="text-rose-500 hover:text-rose-700">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {notice && (
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4 text-sm font-medium text-emerald-800">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            {notice}
          </span>
          <button onClick={() => setNotice('')} className="text-emerald-600 hover:text-emerald-800">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Add user panel */}
      <section className="rounded-2xl border border-slate-200/80 bg-white shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-5">
          <div className="flex items-center gap-2 text-base font-bold text-slate-900">
            <UserPlus className="h-5 w-5 text-brand-red" />
            <h2>Add a new user</h2>
          </div>
          <button
            type="button"
            onClick={() => {
              setShowAddForm((prev) => !prev);
              setErrors([]);
            }}
            className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition ${
              showAddForm
                ? 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                : 'bg-brand-red text-white shadow-sm hover:bg-brand-redDark'
            }`}
          >
            {showAddForm ? (
              <>
                <X className="h-3.5 w-3.5" />
                <span>Cancel</span>
              </>
            ) : (
              <>
                <Plus className="h-3.5 w-3.5" />
                <span>New User</span>
              </>
            )}
          </button>
        </div>

        {showAddForm && (
          <form onSubmit={handleCreate} className="space-y-4 p-5">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col">
                <label className="field-label">Full Name *</label>
                <input
                  className="field-input"
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="field-label">Username *</label>
                <input
                  className="field-input lowercase"
                  value={form.username}
                  onChange={(e) => set('username', e.target.value.replace(/\s/g, '').toLowerCase())}
                  placeholder="e.g. rahul.sharma"
                  required
                />
                <span className="mt-1 text-xs text-slate-400">Used to sign in. Letters, numbers, . _ - only.</span>
              </div>

              <div className="flex flex-col">
                <label className="field-label">Email (optional)</label>
                <input
                  type="email"
                  className="field-input"
                  value={form.email}
                  onChange={(e) => set('email', e.target.value)}
                  placeholder="rahul@thinkarz.com"
                />
              </div>

              <div className="flex flex-col">
                <label className="field-label">Password *</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="field-input pr-10"
                    value={form.password}
                    onChange={(e) => set('password', e.target.value)}
                    placeholder="Minimum 8 characters"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const generated = generatePassword();
                    setForm((prev) => ({
                      ...prev,
                      password: generated,
                      confirmPassword: generated,
                    }));
                    setShowPassword(true);
                  }}
                  className="mt-1 self-start text-xs font-semibold text-brand-red hover:underline"
                >
                  Generate a strong password
                </button>
              </div>

              <div className="flex flex-col">
                <label className="field-label">Confirm Password *</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="field-input"
                  value={form.confirmPassword}
                  onChange={(e) => set('confirmPassword', e.target.value)}
                  placeholder="Re-enter the password"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="field-label">Role *</label>
                <select
                  className="field-input"
                  value={form.role}
                  onChange={(e) => set('role', e.target.value as Role)}
                >
                  <option value="editor">Editor — manage vehicles only</option>
                  <option value="admin">Administrator — full access incl. users</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => {
                  setForm(EMPTY_FORM);
                  setShowAddForm(false);
                  setErrors([]);
                }}
                className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center gap-2 rounded-xl bg-brand-red px-6 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-redDark disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Creating…</span>
                  </>
                ) : (
                  <span>Create User</span>
                )}
              </button>
            </div>
          </form>
        )}
      </section>

      {/* Users table */}
      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs">
        <div className="flex items-center gap-2 border-b border-slate-100 p-5 text-base font-bold text-slate-900">
          <UsersIcon className="h-5 w-5 text-brand-red" />
          <h2>Existing users</h2>
          <span className="ml-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600">
            {users.length}
          </span>
        </div>

        {users.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-14 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <UsersIcon className="h-7 w-7" />
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-900">No additional users yet</h3>
            <p className="mt-1 max-w-sm text-sm text-slate-500">
              You are signed in as the root administrator. Create a user above to give a colleague
              their own login.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200/80 bg-slate-50/70 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-3.5">User</th>
                  <th className="px-4 py-3.5">Role</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5">Last Sign-in</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((user) => {
                  const isSelf = user.username === currentUsername;
                  return (
                    <tr key={user.id} className="transition-colors hover:bg-slate-50/60">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-navy text-xs font-bold uppercase text-white">
                            {(user.name || user.username).slice(0, 2)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900">{user.name || user.username}</span>
                              {isSelf && (
                                <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                  You
                                </span>
                              )}
                            </div>
                            <p className="font-mono text-xs text-slate-500">@{user.username}</p>
                            {user.email && (
                              <p className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-400">
                                <Mail className="h-3 w-3" />
                                {user.email}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        <select
                          value={user.role}
                          disabled={isSelf}
                          onChange={(e) => changeRole(user, e.target.value as Role)}
                          className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700 transition focus:border-brand-red focus:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                          title={isSelf ? 'You cannot change your own role' : 'Change role'}
                        >
                          <option value="editor">Editor</option>
                          <option value="admin">Administrator</option>
                        </select>
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        {user.active ? (
                          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                            <ShieldCheck className="h-3.5 w-3.5" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-500">
                            Suspended
                          </span>
                        )}
                      </td>

                      <td className="whitespace-nowrap px-4 py-4">
                        <div className="text-xs font-medium text-slate-700">
                          {formatDate(user.lastLoginAt)}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Added {formatDate(user.createdAt)}
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setResetTarget(user);
                              setResetPassword('');
                            }}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                            title="Reset password"
                          >
                            <KeyRound className="h-3.5 w-3.5" />
                          </button>

                          <button
                            onClick={() => toggleActive(user)}
                            disabled={isSelf}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-blue-600 transition hover:border-blue-200 hover:bg-blue-50 disabled:cursor-not-allowed disabled:text-slate-300 disabled:hover:border-slate-200 disabled:hover:bg-white"
                            title={isSelf ? 'You cannot suspend yourself' : user.active ? 'Suspend access' : 'Restore access'}
                          >
                            <Power className="h-3.5 w-3.5" />
                          </button>

                          <button
                            onClick={() => setDeleteTarget(user)}
                            disabled={isSelf}
                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-rose-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 disabled:cursor-not-allowed disabled:text-slate-300 disabled:hover:border-slate-200 disabled:hover:bg-white"
                            title={isSelf ? 'You cannot delete your own account' : 'Delete user'}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Reset password modal */}
      {resetTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700">
                <KeyRound className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Reset password</h3>
                <p className="text-xs text-slate-500">
                  For <span className="font-mono">@{resetTarget.username}</span>
                </p>
              </div>
            </div>

            <div className="mt-5">
              <label className="field-label">New password</label>
              <input
                type="text"
                className="field-input font-mono"
                value={resetPassword}
                onChange={(e) => setResetPassword(e.target.value)}
                placeholder="Minimum 8 characters, with a letter and a number"
              />
              <button
                type="button"
                onClick={() => setResetPassword(generatePassword())}
                className="mt-2 text-xs font-semibold text-brand-red hover:underline"
              >
                Generate a strong password
              </button>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setResetTarget(null)}
                disabled={isResetting}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmReset}
                disabled={isResetting || resetPassword.length < 8}
                className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:opacity-50"
              >
                {isResetting ? 'Saving…' : 'Update Password'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-50">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Delete user</h3>
                <p className="text-xs text-slate-500">This action cannot be undone</p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              <strong>{deleteTarget.name || deleteTarget.username}</strong> (
              <span className="font-mono">@{deleteTarget.username}</span>) will lose access to the
              admin console immediately.
            </p>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={isDeleting}
                className="inline-flex items-center gap-1.5 rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-rose-700 disabled:opacity-50"
              >
                {isDeleting ? 'Deleting…' : 'Yes, Delete User'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

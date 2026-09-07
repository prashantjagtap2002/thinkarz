import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowLeft, ShieldAlert } from 'lucide-react';
import { getAdminSession } from '@/lib/adminSession';
import { AdminUsersTableMissingError, listAdminUsers, type AdminUser } from '@/lib/adminUsers';
import AdminUsersManager from '@/components/admin/AdminUsersManager';

export const dynamic = 'force-dynamic';

export default async function AdminUsersPage() {
  const session = await getAdminSession();
  if (!session) redirect('/admin/login?next=/admin/users');

  // Editors can manage inventory but not other people's access.
  if (session.role !== 'admin') {
    return (
      <div className="mx-auto max-w-lg rounded-2xl border border-amber-200 bg-amber-50/70 p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
          <ShieldAlert className="h-6 w-6" />
        </div>
        <h1 className="mt-4 text-lg font-bold text-slate-900">Administrator access required</h1>
        <p className="mt-2 text-sm text-slate-600">
          Your account has the <strong>Editor</strong> role, which can manage vehicles but not
          console users. Ask an administrator if you need access.
        </p>
        <Link
          href="/admin"
          className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white transition hover:bg-slate-800"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Inventory</span>
        </Link>
      </div>
    );
  }

  let users: AdminUser[] = [];
  let setupRequired = false;

  try {
    users = await listAdminUsers();
  } catch (err) {
    if (err instanceof AdminUsersTableMissingError) {
      setupRequired = true;
    } else {
      throw err;
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin"
          className="mb-3 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-brand-red"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to Inventory</span>
        </Link>
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          Console Users
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Create logins for your team, set what they are allowed to do, and revoke access when
          someone leaves.
        </p>
      </div>

      <AdminUsersManager
        initialUsers={users}
        currentUsername={session.username}
        setupRequired={setupRequired}
      />
    </div>
  );
}

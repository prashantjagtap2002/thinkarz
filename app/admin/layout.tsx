import type { Metadata } from 'next';
import Link from 'next/link';
import AdminHeaderActions from '@/components/admin/AdminHeaderActions';

export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="container-page flex items-center justify-between py-4">
          <Link href="/admin" className="text-sm font-extrabold uppercase tracking-wide text-slate-900">
            THINKARZ Admin
          </Link>
          <AdminHeaderActions />
        </div>
      </header>
      <main className="container-page py-8">{children}</main>
    </div>
  );
}

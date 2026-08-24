import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blogs',
  description:
    'Read expert car buying guides, maintenance tips, insurance advice and the latest automotive news from THINKARZ.',
  alternates: {
    canonical: '/blogs',
  },
};

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

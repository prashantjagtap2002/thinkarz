import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Thinkarz',
};

export default function AboutUsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

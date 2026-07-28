import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | THINKARZ',
};

export default function AboutUsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

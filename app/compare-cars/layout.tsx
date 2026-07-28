import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compare Cars | THINKARZ',
  description:
    'Compare specifications, price, mileage, power and features of pre-owned cars side by side to make an informed decision.',
  alternates: {
    canonical: '/compare-cars',
  },
};

export default function CompareCarsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

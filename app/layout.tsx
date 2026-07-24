import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });

export const metadata: Metadata = {
  title: {
    default: 'Thinkarz | Your Ultimate Car Destination',
    template: '%s | Thinkarz',
  },
  description:
    'Thinkarz - trusted pre-owned cars, transparent deals. Buy, sell, service and test drive quality used cars in Mumbai.',
  keywords: ['used cars', 'pre-owned cars', 'buy used cars Mumbai', 'sell car', 'car inspection', 'test drive'],
  openGraph: {
    type: 'website',
    siteName: 'Thinkarz',
    title: 'Thinkarz | Your Ultimate Car Destination',
    description: 'Trusted pre-owned cars, transparent deals. Buy, sell, service and test drive quality used cars in Mumbai.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thinkarz | Your Ultimate Car Destination',
    description: 'Trusted pre-owned cars, transparent deals. Buy, sell, service and test drive quality used cars in Mumbai.',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0F1B2E',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`} suppressHydrationWarning>
        <Header />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
        <Suspense fallback={null}>
          <FloatingWhatsAppButton />
        </Suspense>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton';
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/structuredData';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://thinkarz.com'),
  title: {
    default: 'THINKARZ | Your Ultimate Car Destination',
    template: '%s | THINKARZ',
  },
  description:
    'THINKARZ - trusted pre-owned cars, transparent deals. Buy, sell, service and test drive quality used cars in Mumbai.',
  keywords: ['used cars', 'pre-owned cars', 'buy used cars Mumbai', 'sell car', 'car inspection', 'test drive'],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    siteName: 'THINKARZ',
    title: 'THINKARZ | Your Ultimate Car Destination',
    description: 'Trusted pre-owned cars, transparent deals. Buy, sell, service and test drive quality used cars in Mumbai.',
    images: [
      {
        url: '/icon.png',
        width: 512,
        height: 512,
        alt: 'THINKARZ Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'THINKARZ | Your Ultimate Car Destination',
    description: 'Trusted pre-owned cars, transparent deals. Buy, sell, service and test drive quality used cars in Mumbai.',
    images: ['/icon.png'],
  },
  manifest: '/manifest.webmanifest',
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  },
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    shortcut: '/icon.png',
    apple: [
      { url: '/icon.png', sizes: '180x180', type: 'image/png' },
    ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateOrganizationSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateWebSiteSchema()) }}
        />
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

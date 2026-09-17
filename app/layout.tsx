import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

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
      { url: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
      { url: '/favicon.png', sizes: '96x96', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      // Genuinely 180x180 now; this previously served the full-size icon.
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0F1B2E',
};

// Document shell only. Public-site chrome lives in app/(site)/layout.tsx so it
// does not leak into the admin console.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

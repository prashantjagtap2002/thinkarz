import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'THINKARZ - Certified Pre-Owned Cars',
    short_name: 'THINKARZ',
    description: 'Trusted pre-owned cars, transparent deals by Gautam Modi Group.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#0F1B2E',
    icons: [
      // Each entry points at an asset that is actually that size; both used to
      // reference the same 1254px, 692KB file.
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}

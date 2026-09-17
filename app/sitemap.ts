import type { MetadataRoute } from 'next';
import { getCars } from '@/lib/carsData';
import { blogs } from '@/lib/blogs';

const SITE_LAST_UPDATED = new Date('2026-07-30T00:00:00.000Z');

export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://thinkarz.com';
  const cars = await getCars();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: SITE_LAST_UPDATED, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/about-us`, lastModified: new Date('2026-07-01'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/pre-owned-cars`, lastModified: SITE_LAST_UPDATED, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/sell-your-car`, lastModified: SITE_LAST_UPDATED, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/book-a-test-drive`, lastModified: SITE_LAST_UPDATED, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/contact-us`, lastModified: new Date('2026-07-01'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blogs`, lastModified: SITE_LAST_UPDATED, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date('2026-01-01'), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms-and-conditions`, lastModified: new Date('2026-01-01'), changeFrequency: 'yearly', priority: 0.3 },
  ];

  const carRoutes: MetadataRoute.Sitemap = cars.map((car) => ({
    url: `${baseUrl}/pre-owned-cars/${car.id}`,
    // Previously derived from the model year, which told Google a 2019 car's
    // page had not changed since 2019. Use the row's real timestamp.
    lastModified: car.updatedAt ? new Date(car.updatedAt) : SITE_LAST_UPDATED,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogs.map((post) => ({
    url: `${baseUrl}/blogs/${post.slug}`,
    lastModified: SITE_LAST_UPDATED,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...carRoutes, ...blogRoutes];
}

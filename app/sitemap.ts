import type { MetadataRoute } from 'next';
import { cars } from '@/lib/cars';
import { blogs } from '@/lib/blogs';

const SITE_LAST_UPDATED = new Date('2026-07-30T00:00:00.000Z');

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://thinkarz.com';

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: SITE_LAST_UPDATED, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/about-us`, lastModified: new Date('2026-07-01'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/pre-owned-cars`, lastModified: SITE_LAST_UPDATED, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/compare-cars`, lastModified: SITE_LAST_UPDATED, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/sell-your-car`, lastModified: SITE_LAST_UPDATED, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/book-a-test-drive`, lastModified: SITE_LAST_UPDATED, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/blogs`, lastModified: SITE_LAST_UPDATED, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/contact-us`, lastModified: new Date('2026-07-01'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/privacy-policy`, lastModified: new Date('2026-01-01'), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms-and-conditions`, lastModified: new Date('2026-01-01'), changeFrequency: 'yearly', priority: 0.3 },
  ];

  const carRoutes: MetadataRoute.Sitemap = cars.map((car) => ({
    url: `${baseUrl}/pre-owned-cars/${car.id}`,
    lastModified: new Date(`${car.year}-01-01`),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: blog.date ? new Date(blog.date) : SITE_LAST_UPDATED,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...carRoutes, ...blogRoutes];
}

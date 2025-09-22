import { MetadataRoute } from 'next';
import { Locale } from '@/types';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://thegreatbeans.com';
const locales: Locale[] = ['en', 'vi'];

// Static pages that exist in both languages
const staticPages = [
  '',
  '/about-us',
  '/our-process',
  '/sustainability',
  '/contact',
  '/products',
  '/insights',
];

// Dynamic product slugs (this would typically come from a database or CMS)
const productSlugs = [
  'lam-dong-arabica',
  'dak-lak-robusta',
  'specialty-blend',
];

// Dynamic insight/blog slugs
const insightSlugs = [
  'vietnamese-coffee-export-trends-2024',
  'sustainable-coffee-farming-practices',
  'robusta-vs-arabica-guide',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemap: MetadataRoute.Sitemap = [];

  // Add static pages for each locale
  locales.forEach((locale) => {
    staticPages.forEach((page) => {
      sitemap.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1 : 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en${page}`,
            vi: `${baseUrl}/vi${page}`,
            'x-default': `${baseUrl}/en${page}`,
          },
        },
      });
    });
  });

  // Add product pages for each locale
  locales.forEach((locale) => {
    productSlugs.forEach((slug) => {
      sitemap.push({
        url: `${baseUrl}/${locale}/products/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.9,
        alternates: {
          languages: {
            en: `${baseUrl}/en/products/${slug}`,
            vi: `${baseUrl}/vi/products/${slug}`,
            'x-default': `${baseUrl}/en/products/${slug}`,
          },
        },
      });
    });
  });

  // Add insight/blog pages for each locale
  locales.forEach((locale) => {
    insightSlugs.forEach((slug) => {
      sitemap.push({
        url: `${baseUrl}/${locale}/insights/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: {
            en: `${baseUrl}/en/insights/${slug}`,
            vi: `${baseUrl}/vi/insights/${slug}`,
            'x-default': `${baseUrl}/en/insights/${slug}`,
          },
        },
      });
    });
  });

  return sitemap;
}

// Helper function to generate sitemap for dynamic content
export function generateDynamicSitemap(
  contentType: 'products' | 'insights',
  slugs: string[]
): MetadataRoute.Sitemap {
  const sitemap: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    slugs.forEach((slug) => {
      sitemap.push({
        url: `${baseUrl}/${locale}/${contentType}/${slug}`,
        lastModified: new Date(),
        changeFrequency: contentType === 'products' ? 'monthly' : 'weekly',
        priority: contentType === 'products' ? 0.9 : 0.7,
        alternates: {
          languages: {
            en: `${baseUrl}/en/${contentType}/${slug}`,
            vi: `${baseUrl}/vi/${contentType}/${slug}`,
            'x-default': `${baseUrl}/en/${contentType}/${slug}`,
          },
        },
      });
    });
  });

  return sitemap;
}
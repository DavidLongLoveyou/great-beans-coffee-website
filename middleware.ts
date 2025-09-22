import { NextRequest, NextResponse } from 'next/server';
import { Locale } from '@/types';

// Supported locales
const locales: Locale[] = ['en', 'vi'];
const defaultLocale: Locale = 'en';

// Get locale from request
function getLocale(request: NextRequest): Locale {
  // Check if locale is in pathname
  const pathname = request.nextUrl.pathname;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return pathname.split('/')[1] as Locale;
  }

  // Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    // Parse accept-language header and find best match
    const preferredLocales = acceptLanguage
      .split(',')
      .map((lang) => {
        const [locale, quality = '1'] = lang.trim().split(';q=');
        return {
          locale: locale.toLowerCase(),
          quality: parseFloat(quality),
        };
      })
      .sort((a, b) => b.quality - a.quality);

    for (const { locale } of preferredLocales) {
      // Check for exact match
      if (locales.includes(locale as Locale)) {
        return locale as Locale;
      }
      // Check for language match (e.g., 'vi-VN' -> 'vi')
      const lang = locale.split('-')[0];
      if (locales.includes(lang as Locale)) {
        return lang as Locale;
      }
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for API routes, static files, and Next.js internals
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/robots.txt') ||
    pathname.startsWith('/sitemap.xml') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If no locale in pathname, redirect to localized version
  if (!pathnameHasLocale) {
    const locale = getLocale(request);
    const newUrl = new URL(`/${locale}${pathname}`, request.url);
    
    // Preserve search params
    newUrl.search = request.nextUrl.search;
    
    return NextResponse.redirect(newUrl);
  }

  // Add locale to headers for use in components
  const response = NextResponse.next();
  const currentLocale = pathname.split('/')[1] as Locale;
  response.headers.set('x-locale', currentLocale);
  
  return response;
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - api routes
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    // - public files (public folder)
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.).*)',
  ],
};

// Helper functions for use in components
export function getLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split('/');
  const potentialLocale = segments[1];
  return locales.includes(potentialLocale as Locale) ? (potentialLocale as Locale) : defaultLocale;
}

export function removeLocaleFromPathname(pathname: string): string {
  const segments = pathname.split('/');
  if (locales.includes(segments[1] as Locale)) {
    return '/' + segments.slice(2).join('/');
  }
  return pathname;
}

export function addLocaleToPathname(pathname: string, locale: Locale): string {
  const cleanPathname = removeLocaleFromPathname(pathname);
  return `/${locale}${cleanPathname === '/' ? '' : cleanPathname}`;
}
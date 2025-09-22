import { Locale } from '@/types';

export interface LocaleInfo {
  code: Locale;
  name: string;
  nativeName: string;
  flag: string;
}

export const locales: LocaleInfo[] = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸'
  },
  {
    code: 'vi',
    name: 'Vietnamese',
    nativeName: 'Tiếng Việt',
    flag: '🇻🇳'
  }
];

export const defaultLocale: Locale = 'en';

export function getCurrentLocale(locale: string): LocaleInfo {
  const found = locales.find(l => l.code === locale);
  return found || locales.find(l => l.code === defaultLocale)!;
}

export function getAlternateLocale(currentLocale: string): LocaleInfo {
  return locales.find(l => l.code !== currentLocale) || locales[0];
}

export function isValidLocale(locale: string): locale is Locale {
  return locales.some(l => l.code === locale);
}

export function getLocalizedPath(path: string, locale: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // If path already starts with locale, return as is
  if (cleanPath.startsWith(`${locale}/`)) {
    return `/${cleanPath}`;
  }
  
  // Add locale prefix
  return `/${locale}/${cleanPath}`;
}

export function removeLocaleFromPath(path: string): string {
  const segments = path.split('/').filter(Boolean);
  
  // If first segment is a locale, remove it
  if (segments.length > 0 && isValidLocale(segments[0])) {
    segments.shift();
  }
  
  return '/' + segments.join('/');
}
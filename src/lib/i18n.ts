import { Locale } from '@/types';
import { headers } from 'next/headers';

// Import locale files
import enLocale from '@/locales/en.json';
import viLocale from '@/locales/vi.json';

const locales = {
  en: enLocale,
  vi: viLocale,
} as const;

// Get current locale from headers (set by middleware)
export async function getCurrentLocale(): Promise<Locale> {
  const headersList = await headers();
  const locale = headersList.get('x-locale') as Locale;
  return locale || 'en';
}

// Get translations for current locale
export function getTranslations(locale: Locale) {
  return locales[locale] || locales.en;
}

// Get nested translation by key path
export async function t(key: string, locale?: Locale): Promise<string> {
  const currentLocale = locale || (await getCurrentLocale());
  const translations = getTranslations(currentLocale);
  const keys = key.split('.');
  
  let result: Record<string, unknown> | string = translations;
  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = (result as Record<string, unknown>)[k] as Record<string, unknown> | string;
    } else {
      console.warn(`Translation key not found: ${key}`);
      return key; // Return key if translation not found
    }
  }
  
  return typeof result === 'string' ? result : key;
}

// Get all available locales
export function getAvailableLocales(): Locale[] {
  return Object.keys(locales) as Locale[];
}

// Check if locale is supported
export function isValidLocale(locale: string): locale is Locale {
  return locale in locales;
}

// Get locale display name
export function getLocaleDisplayName(locale: Locale): string {
  const displayNames: Record<Locale, string> = {
    en: 'English',
    vi: 'Tiếng Việt',
  };
  return displayNames[locale] || locale;
}

// Get opposite locale (for language switcher)
export function getAlternateLocale(currentLocale: Locale): Locale {
  return currentLocale === 'en' ? 'vi' : 'en';
}

// Format number according to locale
export async function formatNumber(number: number, locale?: Locale): Promise<string> {
  const currentLocale = locale || (await getCurrentLocale());
  const localeMap: Record<Locale, string> = {
    en: 'en-US',
    vi: 'vi-VN',
  };
  
  return new Intl.NumberFormat(localeMap[currentLocale]).format(number);
}

// Format date according to locale
export async function formatDate(date: Date | string, locale?: Locale): Promise<string> {
  const currentLocale = locale || (await getCurrentLocale());
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const localeMap: Record<Locale, string> = {
    en: 'en-US',
    vi: 'vi-VN',
  };
  
  return new Intl.DateTimeFormat(localeMap[currentLocale], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj);
}

// Get direction for locale (for RTL support if needed in future)
export function getLocaleDirection(): 'ltr' | 'rtl' {
  // Vietnamese and English are both LTR
  return 'ltr';
}

// Hook for client components
export async function useTranslations() {
  const currentLocale = await getCurrentLocale();
  const translations = getTranslations(currentLocale);
  
  return {
    t: (key: string) => t(key, currentLocale),
    translations,
    locale: currentLocale,
  };
}
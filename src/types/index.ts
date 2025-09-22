// TypeScript interfaces for B2B Coffee Export Business

// Coffee Product Types
export type CoffeeType = 'Arabica' | 'Robusta' | 'Specialty Blend';
export type ProcessingMethod = 'Washed' | 'Natural' | 'Honey';

// Translation Interfaces
export interface TranslationSection {
  badge?: string;
  title?: string;
  titleHighlight?: string;
  subtitle?: string;
  description?: string;
  viewDetails?: string;
  viewAll?: string;
  filters?: {
    all?: string;
    featured?: string;
    premium?: string;
    organic?: string;
  };
}

export interface Translations {
  hero?: TranslationSection;
  features?: TranslationSection;
  products?: TranslationSection;
  testimonials?: TranslationSection;
  cta?: TranslationSection;
}

// Main Coffee Product Interface
export interface CoffeeProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  origin: string;
  processing: string;
  variety: string;
  grade: string;
  cupping_score: number;
  aroma: string;
  flavor: string;
  acidity: string;
  body: string;
  certifications: string[];
  harvest_season: string;
  moisture_content: string;
  defect_rate: string;
  minimum_order: string;
  price_per_kg: number;
  specifications: Record<string, string>;
  created_at: string;
  updated_at: string;
  images: string[];
  available?: boolean;
  featured?: boolean;
}

// Blog Post Interface
export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  category: string;
  tags?: string[];
  author: string;
  published_at: string;
  updated_at: string;
  reading_time: number;
  featured?: boolean;
  published?: boolean;
}

// Certification Interface
export interface Certification {
  id: string;
  name: string;
  issuer: string;
  description: string;
  logo: string;
  valid_until: string;
  certificate_number: string;
}

// Company Information Interface
export interface CompanyInfo {
  name: string;
  legal_name: string;
  founded: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  employees: string;
  annual_revenue: string;
  export_countries: string[];
  certifications: string[];
  production_capacity: {
    daily_cherry: string;
    daily_beans: string;
    annual_export: string;
  };
  social_media: {
    linkedin?: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
}

// Quote Request Form Interface
export interface QuoteRequest {
  companyName: string;
  contactPerson: string;
  email: string;
  country: string;
  interestedProducts: string[]; // array of product slugs or names
  quantityInTons: number;
  packagingRequirements?: string;
  message?: string;
  phoneNumber?: string;
  deliveryLocation?: string;
  preferredDeliveryDate?: string;
}

// Navigation and SEO Types
export interface NavItem {
  title: string;
  href: string;
  description?: string;
  items?: NavItem[];
}

export interface SeoMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
  hreflang?: {
    lang: string;
    url: string;
  }[];
}

// Internationalization Types
export type Locale = 'en' | 'vi';

export interface LocaleContent {
  common: Record<string, string>;
  navigation: Record<string, string>;
  hero: Record<string, string>;
  company: Record<string, string>;
  stats: Record<string, string>;
  products: Record<string, string>;
  process: Record<string, string | Record<string, string>>;
  sustainability: Record<string, string | Record<string, string>>;
  quote: Record<string, string | Record<string, string>>;
  contact: Record<string, string>;
  insights: Record<string, string>;
  footer: Record<string, string>;
  seo: Record<string, string | Record<string, string>>;
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Statistics and Metrics
export interface CompanyStats {
  yearsInBusiness: number;
  countriesExported: number;
  totalCustomers: number;
  dailyProductionTons: number;
  certifications: number;
}

// Product Specification Table
export interface ProductSpec {
  label: string;
  value: string;
  category?: 'basic' | 'quality' | 'processing' | 'certification';
}

export interface ProductSpecTable {
  [category: string]: ProductSpec[];
}
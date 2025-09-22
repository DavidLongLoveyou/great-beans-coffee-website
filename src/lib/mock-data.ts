import { CoffeeProduct, Post, Certification, CompanyInfo } from '@/types';

// Mock Coffee Products
export const mockCoffeeProducts: CoffeeProduct[] = [
  {
    id: 'robusta-premium-grade-1',
    name: 'Premium Robusta Grade 1',
    slug: 'premium-robusta-grade-1',
    description: 'Premium Vietnamese Robusta coffee beans with exceptional quality and rich, bold flavor profile. Sourced from the Central Highlands of Vietnam, these beans offer excellent crema and are perfect for espresso blends.',
    origin: 'Dak Lak Province, Vietnam',
    processing: 'washed',
    variety: 'Robusta',
    grade: 'Grade 1',
    cupping_score: 82,
    aroma: 'Earthy, nutty with hints of chocolate',
    flavor: 'Bold, full-bodied with low acidity and bitter-sweet notes',
    acidity: 'Low',
    body: 'Full',
    certifications: ['Organic', 'Fair Trade', 'Rainforest Alliance'],
    harvest_season: 'October - February',
    moisture_content: '12.5%',
    defect_rate: '<3%',
    minimum_order: '1 container (19.2 tons)',
    price_per_kg: 3.85,
    images: [
      '/images/products/robusta-premium-1.jpg',
      '/images/products/robusta-premium-2.jpg',
      '/images/products/robusta-premium-3.jpg',
    ],
    specifications: {
      'Screen Size': '18+ (75%), 16+ (20%), Below 16 (5%)',
      'Moisture': '12.5% max',
      'Foreign Matter': '0.1% max',
      'Black/Broken': '2% max',
      'Immature': '2% max',
      'Packaging': '60kg jute bags or 1000kg big bags',
      'Container Load': '19.2 tons (320 bags of 60kg)',
      'Shelf Life': '12 months in proper storage',
    },
    featured: true,
    available: true,
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
  },
  {
    id: 'arabica-honey-processed',
    name: 'Arabica Honey Processed',
    slug: 'arabica-honey-processed',
    description: 'Exceptional honey-processed Arabica coffee from the mountainous regions of Vietnam. This unique processing method creates a sweet, complex flavor profile with bright acidity and floral notes.',
    origin: 'Lam Dong Province, Vietnam',
    processing: 'honey',
    variety: 'Arabica Catimor',
    grade: 'Specialty Grade',
    cupping_score: 86,
    aroma: 'Floral, fruity with honey sweetness',
    flavor: 'Complex, sweet with bright acidity and citrus notes',
    acidity: 'Bright',
    body: 'Medium',
    certifications: ['Organic', 'Specialty Coffee Association'],
    harvest_season: 'November - March',
    moisture_content: '11.5%',
    defect_rate: '<2%',
    minimum_order: '5 tons',
    price_per_kg: 6.50,
    images: [
      '/images/products/arabica-honey-1.jpg',
      '/images/products/arabica-honey-2.jpg',
      '/images/products/arabica-honey-3.jpg',
    ],
    specifications: {
      'Screen Size': '17+ (80%), 16+ (15%), Below 16 (5%)',
      'Moisture': '11.5% max',
      'Foreign Matter': '0.05% max',
      'Defects': 'Max 5 defects per 300g sample',
      'Altitude': '1200-1600m above sea level',
      'Packaging': '60kg jute bags with GrainPro liner',
      'Container Load': '19.2 tons (320 bags of 60kg)',
      'Shelf Life': '18 months in proper storage',
    },
    featured: true,
    available: true,
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
  },
  {
    id: 'robusta-natural-processed',
    name: 'Robusta Natural Processed',
    slug: 'robusta-natural-processed',
    description: 'Sun-dried natural processed Robusta coffee beans with intense flavor and full body. Perfect for espresso blends and instant coffee production.',
    origin: 'Gia Lai Province, Vietnam',
    processing: 'natural',
    variety: 'Robusta',
    grade: 'Grade 2',
    cupping_score: 79,
    aroma: 'Earthy, woody with chocolate undertones',
    flavor: 'Bold, intense with low acidity and bitter notes',
    acidity: 'Very Low',
    body: 'Full',
    certifications: ['UTZ Certified', 'HACCP'],
    harvest_season: 'October - January',
    moisture_content: '13%',
    defect_rate: '<5%',
    minimum_order: '1 container (19.2 tons)',
    price_per_kg: 3.20,
    images: [
      '/images/products/robusta-natural-1.jpg',
      '/images/products/robusta-natural-2.jpg',
    ],
    specifications: {
      'Screen Size': '16+ (70%), 14+ (25%), Below 14 (5%)',
      'Moisture': '13% max',
      'Foreign Matter': '0.2% max',
      'Black/Broken': '5% max',
      'Packaging': '60kg jute bags',
      'Container Load': '19.2 tons (320 bags of 60kg)',
      'Shelf Life': '12 months in proper storage',
    },
    featured: false,
    available: true,
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
  },
  {
    id: 'specialty-geisha-arabica',
    name: 'Specialty Geisha Arabica',
    slug: 'specialty-geisha-arabica',
    description: 'Rare and exceptional Geisha variety Arabica coffee from high-altitude farms in Vietnam. Known for its distinctive floral aroma, tea-like body, and complex flavor profile that has won international cupping competitions.',
    origin: 'Da Lat, Lam Dong Province, Vietnam',
    processing: 'washed',
    variety: 'Geisha',
    grade: 'Specialty Grade',
    cupping_score: 92,
    aroma: 'Intense floral, jasmine, bergamot',
    flavor: 'Complex, tea-like, bright acidity with tropical fruit notes',
    acidity: 'Bright',
    body: 'Light to Medium',
    certifications: ['Specialty Coffee Association', 'Organic', 'Single Origin'],
    harvest_season: 'December - February',
    moisture_content: '10.5%',
    defect_rate: '<1%',
    minimum_order: '1 ton',
    price_per_kg: 25.00,
    images: [
      '/images/products/specialty-geisha-1.jpg',
      '/images/products/specialty-geisha-2.jpg',
      '/images/products/specialty-geisha-3.jpg',
    ],
    specifications: {
      'Screen Size': '18+ (90%), 17+ (8%), Below 17 (2%)',
      'Moisture': '10.5% max',
      'Foreign Matter': '0.01% max',
      'Defects': 'Max 2 defects per 300g sample',
      'Altitude': '1500-1800m above sea level',
      'Packaging': '30kg vacuum-sealed bags with valve',
      'Container Load': 'Custom packaging available',
      'Shelf Life': '24 months in proper storage',
    },
    featured: true,
    available: true,
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
  },
];

// Mock Blog Posts
export const mockPosts: Post[] = [
  {
    id: 'vietnam-coffee-export-trends-2024',
    title: 'Vietnam Coffee Export Trends 2024: Market Insights and Opportunities',
    slug: 'vietnam-coffee-export-trends-2024',
    excerpt: 'Explore the latest trends in Vietnam coffee exports, market opportunities, and what global buyers should know about sourcing premium Vietnamese coffee in 2024.',
    content: 'Full article content would go here...',
    featured_image: '/images/blog/vietnam-coffee-trends-2024.jpg',
    category: 'Market Analysis',
    tags: ['Vietnam Coffee', 'Export Trends', 'Market Analysis', 'Coffee Trade'],
    author: 'The Great Beans Team',
    published_at: '2024-01-20T00:00:00Z',
    updated_at: '2024-01-20T00:00:00Z',
    reading_time: 8,
    featured: true,
    published: true,
  },
  {
    id: 'sustainable-coffee-farming-practices',
    title: 'Sustainable Coffee Farming: Our Commitment to Environmental Excellence',
    slug: 'sustainable-coffee-farming-practices',
    excerpt: 'Learn about our sustainable farming practices and how we are contributing to environmental conservation while producing premium coffee.',
    content: 'Full article content would go here...',
    featured_image: '/images/blog/sustainable-farming.jpg',
    category: 'Sustainability',
    tags: ['Sustainable Farming', 'Environment', 'Coffee Production', 'Organic'],
    author: 'The Great Beans Team',
    published_at: '2024-01-18T00:00:00Z',
    updated_at: '2024-01-18T00:00:00Z',
    reading_time: 6,
    featured: true,
    published: true,
  },
];

// Mock Certifications
export const mockCertifications: Certification[] = [
  {
    id: 'organic-certification',
    name: 'Organic Certification',
    issuer: 'USDA Organic',
    description: 'Certified organic coffee production without synthetic pesticides or fertilizers',
    logo: '/images/certifications/usda-organic.png',
    valid_until: '2025-12-31',
    certificate_number: 'ORG-2024-001',
  },
  {
    id: 'fair-trade',
    name: 'Fair Trade Certified',
    issuer: 'Fair Trade USA',
    description: 'Ensuring fair wages and working conditions for coffee farmers',
    logo: '/images/certifications/fair-trade.png',
    valid_until: '2025-06-30',
    certificate_number: 'FT-2024-002',
  },
  {
    id: 'rainforest-alliance',
    name: 'Rainforest Alliance Certified',
    issuer: 'Rainforest Alliance',
    description: 'Promoting sustainable agriculture and forest conservation',
    logo: '/images/certifications/rainforest-alliance.png',
    valid_until: '2025-09-15',
    certificate_number: 'RA-2024-003',
  },
];

// Mock Company Information
export const mockCompanyInfo: CompanyInfo = {
  name: 'The Great Beans',
  legal_name: 'The Great Beans Coffee Export Co., Ltd.',
  founded: '2018',
  description: 'Premium Vietnamese coffee exporter specializing in high-quality green and roasted Robusta and Arabica coffee beans for global markets.',
  address: 'Central Highlands, Vietnam',
  phone: '+84-xxx-xxx-xxx',
  email: 'info@thegreatbeans.vn',
  website: 'https://thegreatbeans.vn',
  employees: '50-100',
  annual_revenue: '$5-10 million',
  export_countries: [
    'United States', 'Germany', 'Italy', 'Japan', 'South Korea',
    'Singapore', 'Australia', 'Canada', 'Netherlands', 'Belgium'
  ],
  certifications: ['Organic', 'Fair Trade', 'Rainforest Alliance', 'UTZ Certified'],
  production_capacity: {
    daily_cherry: '120+ tons',
    daily_beans: '96+ tons',
    annual_export: '2000+ tons',
  },
  social_media: {
    linkedin: 'https://www.linkedin.com/company/thegreatbeans',
    facebook: 'https://www.facebook.com/thegreatbeans',
    twitter: 'https://twitter.com/thegreatbeans',
  },
};

// Helper functions to get mock data
export const getFeaturedProducts = (): CoffeeProduct[] => {
  return mockCoffeeProducts.filter(product => product.featured);
};

export const getProductBySlug = (slug: string): CoffeeProduct | undefined => {
  return mockCoffeeProducts.find(product => product.slug === slug);
};

export const getFeaturedPosts = (): Post[] => {
  return mockPosts.filter(post => post.featured && post.published);
};

export const getPostBySlug = (slug: string): Post | undefined => {
  return mockPosts.find(post => post.slug === slug && post.published);
};

export const getAllProducts = (): CoffeeProduct[] => {
  return mockCoffeeProducts.filter(product => product.available);
};

export const getAllPosts = (): Post[] => {
  return mockPosts.filter(post => post.published);
};
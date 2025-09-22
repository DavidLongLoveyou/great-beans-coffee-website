import { CoffeeProduct, Post, CompanyInfo } from '@/types';

interface SchemaGeneratorProps {
  type: 'product' | 'organization' | 'blogPosting' | 'breadcrumbList';
  data?: {
    product?: CoffeeProduct;
    post?: Post;
    company?: CompanyInfo;
    breadcrumbs?: Array<{ name: string; url: string }>;
  };
}

export default function SchemaGenerator({ type, data }: SchemaGeneratorProps) {
  const generateProductSchema = (product: CoffeeProduct) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description,
      sku: product.id,
      brand: {
        '@type': 'Brand',
        name: 'The Great Beans',
      },
      manufacturer: {
        '@type': 'Organization',
        name: 'The Great Beans',
        url: 'https://thegreatbeans.vn',
      },
      image: product.images.map(img => ({
        '@type': 'ImageObject',
        url: img,
        caption: product.name,
      })),
      offers: {
        '@type': 'Offer',
        availability: product.available ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        priceCurrency: 'USD',
        price: product.price_per_kg || 0,
        priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
        seller: {
          '@type': 'Organization',
          name: 'The Great Beans',
        },
      },
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          name: 'Origin',
          value: product.origin,
        },
        {
          '@type': 'PropertyValue',
          name: 'Processing Method',
          value: product.processing,
        },
        {
          '@type': 'PropertyValue',
          name: 'Grade',
          value: product.grade,
        },
        {
          '@type': 'PropertyValue',
          name: 'Variety',
          value: product.variety,
        },
        {
          '@type': 'PropertyValue',
          name: 'Moisture Content',
          value: product.moisture_content,
        },
        {
          '@type': 'PropertyValue',
          name: 'Defect Rate',
          value: product.defect_rate,
        },
        {
          '@type': 'PropertyValue',
          name: 'Minimum Order',
          value: product.minimum_order,
        },
      ],
      category: 'Coffee Beans',
      aggregateRating: product.cupping_score ? {
        '@type': 'AggregateRating',
        ratingValue: product.cupping_score / 10, // Convert to 5-star scale
        bestRating: 5,
        worstRating: 1,
        ratingCount: 1,
      } : undefined,
    };
  };

  const generateOrganizationSchema = (company?: CompanyInfo) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'The Great Beans',
      alternateName: 'TGB',
      url: 'https://thegreatbeans.vn',
      logo: 'https://thegreatbeans.vn/logo.png',
      description: 'Premium Vietnamese coffee exporter specializing in high-quality green and roasted Robusta and Arabica coffee beans for global markets.',
      foundingDate: '2018-01-01',
      address: {
        '@type': 'PostalAddress',
        streetAddress: company?.address || 'Vietnam Coffee Growing Regions',
        addressCountry: 'VN',
        addressRegion: 'Central Highlands',
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: company?.phone || '+84-xxx-xxx-xxx',
          contactType: 'Sales',
          email: company?.email || 'sales@thegreatbeans.vn',
          availableLanguage: ['English', 'Vietnamese'],
        },
        {
          '@type': 'ContactPoint',
          telephone: company?.phone || '+84-xxx-xxx-xxx',
          contactType: 'Customer Service',
          email: company?.email || 'info@thegreatbeans.vn',
          availableLanguage: ['English', 'Vietnamese'],
        },
      ],
      sameAs: [
        'https://www.linkedin.com/company/thegreatbeans',
        'https://www.facebook.com/thegreatbeans',
        'https://twitter.com/thegreatbeans',
      ],
      industry: 'Coffee Export',
      numberOfEmployees: {
        '@type': 'QuantitativeValue',
        value: '50-100',
      },
      areaServed: {
        '@type': 'Place',
        name: 'Worldwide',
      },
      makesOffer: {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'Premium Vietnamese Coffee Beans',
          category: 'Coffee Export',
        },
      },
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'Organic Certification',
        },
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'Fair Trade Certification',
        },
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'Rainforest Alliance Certification',
        },
      ],
    };
  };

  const generateBlogPostingSchema = (post: Post) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      image: post.featured_image,
      author: {
        '@type': 'Organization',
        name: 'The Great Beans',
        url: 'https://thegreatbeans.vn',
      },
      publisher: {
        '@type': 'Organization',
        name: 'The Great Beans',
        logo: {
          '@type': 'ImageObject',
          url: 'https://thegreatbeans.vn/logo.png',
        },
      },
      datePublished: post.published_at,
      dateModified: post.updated_at,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://thegreatbeans.vn/insights/${post.slug}`,
      },
      articleSection: post.category,
      keywords: post.tags?.join(', ') || '',
      wordCount: post.reading_time * 200, // Estimate based on reading time
      inLanguage: 'en-US',
    };
  };

  const generateBreadcrumbListSchema = (breadcrumbs: Array<{ name: string; url: string }>) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url,
      })),
    };
  };

  const getSchema = () => {
    switch (type) {
      case 'product':
        return data?.product ? generateProductSchema(data.product) : null;
      case 'organization':
        return generateOrganizationSchema(data?.company);
      case 'blogPosting':
        return data?.post ? generateBlogPostingSchema(data.post) : null;
      case 'breadcrumbList':
        return data?.breadcrumbs ? generateBreadcrumbListSchema(data.breadcrumbs) : null;
      default:
        return null;
    }
  };

  const schema = getSchema();

  if (!schema) {
    return null;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema, null, 2),
      }}
    />
  );
}
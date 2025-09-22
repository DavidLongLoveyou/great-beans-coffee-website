import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCurrentLocale, t } from '@/lib/i18n';
import { mockCoffeeProducts } from '@/lib/mock-data';
import { ProductCard } from '@/components/ProductCard';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getCurrentLocale();
  
  return {
    title: `Specialty Coffee - ${await t('company.name', locale)}`,
    description: 'Premium specialty Vietnamese coffee beans for export. Unique processing methods and exceptional quality for discerning coffee enthusiasts.',
    openGraph: {
      title: `Specialty Coffee - ${await t('company.name', locale)}`,
      description: 'Premium specialty Vietnamese coffee beans for export. Unique processing methods and exceptional quality for discerning coffee enthusiasts.',
      type: 'website',
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
    },
    alternates: {
      canonical: `/${locale}/products/specialty`,
      languages: {
        'en': '/en/products/specialty',
        'vi': '/vi/products/specialty',
      },
    },
  };
}

export default async function SpecialtyProductsPage() {
  const locale = await getCurrentLocale();
  
  // Filter products by specialty processing (honey, natural, or unique varieties)
  const specialtyProducts = mockCoffeeProducts.filter(product => 
    product.processing.toLowerCase().includes('honey') ||
    product.processing.toLowerCase().includes('natural') ||
    product.processing.toLowerCase().includes('anaerobic') ||
    product.variety.toLowerCase().includes('catimor') ||
    product.variety.toLowerCase().includes('bourbon')
  );
  
  if (specialtyProducts.length === 0) {
    notFound();
  }
  
  const breadcrumbs = [
    { name: await t('navigation.home', locale), url: `/${locale}` },
    { name: await t('navigation.products', locale), url: `/${locale}/products` },
    { name: 'Specialty', url: `/${locale}/products/specialty` },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-coffee-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-coffee-900 mb-6">
              Specialty Coffee Collection
            </h1>
            <p className="text-xl text-coffee-700 mb-8 max-w-3xl mx-auto">
              Discover our most exceptional Vietnamese coffee beans, featuring unique processing methods 
              and rare varieties that showcase the pinnacle of Vietnamese coffee craftsmanship.
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <section className="px-4 sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              {breadcrumbs.map((item, index) => (
                <li key={index}>
                  <div className="flex items-center">
                    {index > 0 && (
                      <svg className="flex-shrink-0 h-5 w-5 text-coffee-400 mr-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                    <a href={item.url} className="text-coffee-600 hover:text-coffee-800 transition-colors">
                      {item.name}
                    </a>
                  </div>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-coffee-900 mb-4">
              Our Specialty Collection ({specialtyProducts.length} {specialtyProducts.length === 1 ? 'Product' : 'Products'})
            </h2>
            <p className="text-coffee-700">
              Each specialty coffee is meticulously processed using innovative techniques to create unique flavor profiles 
              that represent the finest of Vietnamese coffee excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {specialtyProducts.map((product) => (
              <ProductCard key={product.id} product={product} locale={locale} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCurrentLocale, t } from '@/lib/i18n';
import { mockCoffeeProducts } from '@/lib/mock-data';
import { ProductCard } from '@/components/ProductCard';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getCurrentLocale();
  
  return {
    title: `Arabica Coffee - ${await t('company.name', locale)}`,
    description: 'Premium Vietnamese Arabica coffee beans for export. High-quality specialty grade Arabica with complex flavor profiles.',
    openGraph: {
      title: `Arabica Coffee - ${await t('company.name', locale)}`,
      description: 'Premium Vietnamese Arabica coffee beans for export. High-quality specialty grade Arabica with complex flavor profiles.',
      type: 'website',
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
    },
    alternates: {
      canonical: `/${locale}/products/arabica`,
      languages: {
        'en': '/en/products/arabica',
        'vi': '/vi/products/arabica',
      },
    },
  };
}

export default async function ArabicaProductsPage() {
  const locale = await getCurrentLocale();
  
  // Filter products by Arabica variety
  const arabicaProducts = mockCoffeeProducts.filter(product => 
    product.variety.toLowerCase().includes('arabica')
  );
  
  if (arabicaProducts.length === 0) {
    notFound();
  }
  
  const breadcrumbs = [
    { name: await t('navigation.home', locale), url: `/${locale}` },
    { name: await t('navigation.products', locale), url: `/${locale}/products` },
    { name: 'Arabica', url: `/${locale}/products/arabica` },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-coffee-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-coffee-900 mb-6">
              Premium Arabica Coffee
            </h1>
            <p className="text-xl text-coffee-700 mb-8 max-w-3xl mx-auto">
              Discover our exceptional Vietnamese Arabica coffee beans, grown in the highlands 
              and processed with care to deliver complex, nuanced flavors that coffee connoisseurs love.
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
              Our Arabica Collection ({arabicaProducts.length} {arabicaProducts.length === 1 ? 'Product' : 'Products'})
            </h2>
            <p className="text-coffee-700">
              Each Arabica variety is carefully selected and processed to highlight its unique characteristics.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {arabicaProducts.map((product) => (
              <ProductCard key={product.id} product={product} locale={locale} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCurrentLocale, t } from '@/lib/i18n';
import { mockCoffeeProducts } from '@/lib/mock-data';
import { ProductCard } from '@/components/ProductCard';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getCurrentLocale();
  
  return {
    title: `Robusta Coffee - ${await t('company.name', locale)}`,
    description: 'Premium Vietnamese Robusta coffee beans for export. Strong, bold flavor with high caffeine content, perfect for espresso blends.',
    openGraph: {
      title: `Robusta Coffee - ${await t('company.name', locale)}`,
      description: 'Premium Vietnamese Robusta coffee beans for export. Strong, bold flavor with high caffeine content, perfect for espresso blends.',
      type: 'website',
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
    },
    alternates: {
      canonical: `/${locale}/products/robusta`,
      languages: {
        'en': '/en/products/robusta',
        'vi': '/vi/products/robusta',
      },
    },
  };
}

export default async function RobustaProductsPage() {
  const locale = await getCurrentLocale();
  
  // Filter products by Robusta variety
  const robustaProducts = mockCoffeeProducts.filter(product => 
    product.variety.toLowerCase().includes('robusta')
  );
  
  if (robustaProducts.length === 0) {
    notFound();
  }
  
  const breadcrumbs = [
    { name: await t('navigation.home', locale), url: `/${locale}` },
    { name: await t('navigation.products', locale), url: `/${locale}/products` },
    { name: 'Robusta', url: `/${locale}/products/robusta` },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-coffee-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-coffee-900 mb-6">
              Premium Robusta Coffee
            </h1>
            <p className="text-xl text-coffee-700 mb-8 max-w-3xl mx-auto">
              Experience the bold, intense flavor of Vietnamese Robusta coffee beans. 
              Known for their strength and high caffeine content, perfect for espresso and strong coffee blends.
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
              Our Robusta Collection ({robustaProducts.length} {robustaProducts.length === 1 ? 'Product' : 'Products'})
            </h2>
            <p className="text-coffee-700">
              Each Robusta variety is carefully selected and processed to deliver maximum strength and flavor intensity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {robustaProducts.map((product) => (
              <ProductCard key={product.id} product={product} locale={locale} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
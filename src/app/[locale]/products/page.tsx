import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCurrentLocale, t } from '@/lib/i18n';
import { ProductCard } from '@/components/ProductCard';
import { mockCoffeeProducts } from '@/lib/mock-data';
import { Locale } from '@/types';

interface ProductsPageProps {
  params: Promise<{
    locale: Locale;
  }>;
  searchParams: Promise<{
    category?: string;
  }>;
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getCurrentLocale();

  return {
    title: await t('navigation.products', locale) + ' - ' + await t('company.name', locale),
    description: 'Premium Vietnamese coffee beans - Robusta and Arabica varieties for export',
    openGraph: {
      title: await t('navigation.products', locale) + ' - ' + await t('company.name', locale),
      description: 'Premium Vietnamese coffee beans - Robusta and Arabica varieties for export',
      type: 'website',
    },
  };
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const locale = await getCurrentLocale();
  const { category } = await searchParams;
  
  // Filter products by category
  const filteredProducts = category
    ? mockCoffeeProducts.filter(product => {
        if (category === 'specialty') {
          return product.grade.toLowerCase().includes('specialty') || 
                 product.variety.toLowerCase() === 'geisha';
        }
        return product.variety.toLowerCase().includes(category.toLowerCase());
      })
    : mockCoffeeProducts;

  if (category && filteredProducts.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-coffee-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-coffee-900 mb-6">
            {category ? t(`categories.${category}`) : t('products.title')}
          </h1>
          <p className="text-xl text-coffee-700 max-w-3xl mx-auto mb-8">
            {category ? t(`categories.${category}Description`) : t('products.description')}
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link
              href={`/${locale}/products`}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                !category
                  ? 'bg-coffee-600 text-white'
                  : 'bg-white text-coffee-600 hover:bg-coffee-50'
              }`}
            >
              {t('filters.all')}
            </Link>
            <Link
              href={`/${locale}/products?category=arabica`}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                category === 'arabica'
                  ? 'bg-coffee-600 text-white'
                  : 'bg-white text-coffee-600 hover:bg-coffee-50'
              }`}
            >
              {t('filters.arabica')}
            </Link>
            <Link
              href={`/${locale}/products?category=robusta`}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                category === 'robusta'
                  ? 'bg-coffee-600 text-white'
                  : 'bg-white text-coffee-600 hover:bg-coffee-50'
              }`}
            >
              {t('filters.robusta')}
            </Link>
            <Link
              href={`/${locale}/products?category=specialty`}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                category === 'specialty'
                  ? 'bg-coffee-600 text-white'
                  : 'bg-white text-coffee-600 hover:bg-coffee-50'
              }`}
            >
              {t('filters.specialty')}
            </Link>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                locale={locale}
              />
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-coffee-600 text-lg">
                {t('noProducts')}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
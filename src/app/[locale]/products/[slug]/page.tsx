import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getCurrentLocale, t } from '@/lib/i18n';
import SchemaGenerator from '@/components/seo/SchemaGenerator';
import { getProductBySlug, getFeaturedProducts } from '@/lib/mock-data';

interface ProductPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  const locale = await getCurrentLocale();
  
  return {
    title: `${product.name} - ${await t('company.name', locale)}`,
    description: product.description,
    openGraph: {
      title: `${product.name} - ${await t('company.name', locale)}`,
      description: product.description,
      type: 'website',
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
      images: [
        {
          url: product.images[0],
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    alternates: {
      canonical: `/${locale}/products/${params.slug}`,
      languages: {
        'en': `/en/products/${params.slug}`,
        'vi': `/vi/products/${params.slug}`,
      },
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);
  const locale = await getCurrentLocale();
  
  if (!product) {
    notFound();
  }

  const breadcrumbs = [
    { name: await t('navigation.home', locale), url: `/${locale}` },
    { name: await t('navigation.products', locale), url: `/${locale}/products` },
    { name: product.name, url: `/${locale}/products/${params.slug}` },
  ];

  const relatedProducts = getFeaturedProducts().filter(p => p.slug !== params.slug).slice(0, 3);

  const specifications = [
    { label: 'Origin', value: product.origin },
    { label: 'Processing Method', value: product.processing },
    { label: 'Grade', value: product.grade },
    { label: 'Variety', value: product.variety },
    { label: 'Moisture Content', value: product.moisture_content },
    { label: 'Defect Rate', value: product.defect_rate },
  ];

  const qualityFeatures = [
    {
      icon: '🌱',
      title: 'Sustainable Sourcing',
      description: 'Ethically sourced from certified sustainable farms',
    },
    {
      icon: '🔬',
      title: 'Quality Tested',
      description: 'Rigorous quality control at every processing stage',
    },
    {
      icon: '📦',
      title: 'Fresh Packaging',
      description: 'Vacuum-sealed packaging to preserve freshness',
    },
    {
      icon: '🚚',
      title: 'Fast Delivery',
      description: 'Efficient logistics for timely delivery worldwide',
    },
  ];

  return (
    <>
      <SchemaGenerator type="product" data={{ product }} />
      <SchemaGenerator type="breadcrumbList" data={{ breadcrumbs }} />
      
      <div className="min-h-screen bg-white">
        {/* Product Hero */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Product Images */}
                <div className="space-y-4">
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <Image 
                      src={product.images[0]} 
                      alt={product.name}
                      width={600}
                      height={600}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    {product.images.slice(1, 5).map((image, index) => (
                      <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <Image 
                          src={image} 
                          alt={`${product.name} ${index + 2}`}
                          width={150}
                          height={150}
                          className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                      {product.name}
                    </h1>
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Certifications */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Certifications</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.certifications.map((cert, index) => (
                        <span 
                          key={index}
                          className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Flavor Notes */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Flavor Profile</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.flavor.split(',').map((note: string, index: number) => (
                        <span 
                          key={index}
                          className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm"
                        >
                          {note.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Price Range</h3>
                    <p className="text-2xl font-bold text-green-600 mb-2">
                      ${product.price_per_kg}/kg
                    </p>
                    <p className="text-sm text-gray-600">Per ton (FOB Vietnam)</p>
                    <p className="text-xs text-gray-500 mt-1">*Prices may vary based on quantity and specifications</p>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a 
                      href={`/${locale}/contact`}
                      className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors text-center"
                    >
                      Request Quote for This Product
                    </a>
                    <button className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition-colors">
                      Download Specification Sheet
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Specifications */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Technical Specifications</h2>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-green-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Specification</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Value</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {specifications.map((spec, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">{spec.label}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quality Features */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose Our Coffee</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {qualityFeatures.map((feature, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">{feature.icon}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Processing Journey */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">From Farm to Export</h2>
              <div className="grid md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Cultivation</h3>
                  <p className="text-gray-600 text-sm">Grown at optimal altitude with sustainable practices</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Processing</h3>
                  <p className="text-gray-600 text-sm">Carefully processed using traditional and modern methods</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Quality Control</h3>
                  <p className="text-gray-600 text-sm">Rigorous testing and grading for consistent quality</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Export</h3>
                  <p className="text-gray-600 text-sm">Proper packaging and logistics for global delivery</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Related Products</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {relatedProducts.map((relatedProduct) => (
                    <div key={relatedProduct.slug} className="bg-white rounded-lg shadow-lg overflow-hidden">
                      <Image 
                        src={relatedProduct.images[0]} 
                        alt={relatedProduct.name}
                        width={400}
                        height={192}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{relatedProduct.name}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{relatedProduct.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-green-600 font-semibold">
                            ${relatedProduct.price_per_kg}/kg
                          </span>
                          <a 
                            href={`/${locale}/products/${relatedProduct.slug}`}
                            className="text-green-600 hover:text-green-700 font-medium text-sm"
                          >
                            View Details →
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 bg-green-600">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Order {product.name}?
              </h2>
              <p className="text-green-100 mb-8 text-lg">
                Get a personalized quote and start your coffee import journey with us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href={`/${locale}/contact`}
                  className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Request Quote Now
                </a>
                <a 
                  href={`/${locale}/products`}
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
                >
                  View All Products
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
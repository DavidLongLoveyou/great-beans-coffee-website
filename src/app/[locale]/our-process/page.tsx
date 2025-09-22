import { Metadata } from 'next';
import Image from 'next/image';
import { getCurrentLocale, t } from '@/lib/i18n';
import SchemaGenerator from '@/components/seo/SchemaGenerator';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getCurrentLocale();
  
  return {
    title: `${await t('process.title', locale)} - ${await t('company.name', locale)}`,
    description: await t('process.subtitle', locale),
    openGraph: {
      title: `${await t('process.title', locale)} - ${await t('company.name', locale)}`,
      description: await t('process.subtitle', locale),
      type: 'website',
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
    },
    alternates: {
      canonical: `/${locale}/our-process`,
      languages: {
        'en': '/en/our-process',
        'vi': '/vi/our-process',
      },
    },
  };
}

export default async function OurProcessPage() {
  const locale = await getCurrentLocale();
  
  const breadcrumbs = [
    { name: await t('navigation.home', locale), url: `/${locale}` },
    { name: await t('navigation.process', locale), url: `/${locale}/our-process` },
  ];

  const processSteps = [
    {
      id: 'cultivation',
      title: await t('process.cultivation.title', locale),
      description: await t('process.cultivation.description', locale),
      image: '/images/process/cultivation.jpg',
      details: [
        'Optimal altitude: 800-1,600m above sea level',
        'Rich volcanic soil in Central Highlands',
        'Sustainable farming practices',
        'Organic fertilizers and pest control',
      ],
    },
    {
      id: 'harvesting',
      title: await t('process.harvesting.title', locale),
      description: await t('process.harvesting.description', locale),
      image: '/images/process/harvesting.jpg',
      details: [
        'Hand-picking only ripe cherries',
        'Multiple harvest rounds for quality',
        'Immediate processing to preserve freshness',
        'Experienced local farmers',
      ],
    },
    {
      id: 'processing',
      title: await t('process.processing.title', locale),
      description: await t('process.processing.description', locale),
      image: '/images/process/processing.jpg',
      details: [
        'Wet and dry processing methods',
        'Controlled fermentation',
        'Solar and mechanical drying',
        'Moisture content monitoring',
      ],
    },
    {
      id: 'grading',
      title: await t('process.grading.title', locale),
      description: await t('process.grading.description', locale),
      image: '/images/process/grading.jpg',
      details: [
        'Size grading by screen size',
        'Density separation',
        'Color sorting technology',
        'Manual defect removal',
      ],
    },
    {
      id: 'packaging',
      title: await t('process.packaging.title', locale),
      description: await t('process.packaging.description', locale),
      image: '/images/process/packaging.jpg',
      details: [
        'Food-grade jute bags',
        'Moisture barrier liners',
        'Proper labeling and documentation',
        'Climate-controlled storage',
      ],
    },
    {
      id: 'export',
      title: await t('process.export.title', locale),
      description: await t('process.export.description', locale),
      image: '/images/process/export.jpg',
      details: [
        'Container loading supervision',
        'Complete export documentation',
        'Quality certificates',
        'Tracking and logistics support',
      ],
    },
  ];

  return (
    <>
      <SchemaGenerator type="breadcrumbList" data={{ breadcrumbs }} />
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-green-50 to-emerald-50 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {await t('process.title', locale)}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {await t('process.subtitle', locale)}
              </p>
              <div className="w-24 h-1 bg-green-600 mx-auto"></div>
            </div>
          </div>
        </section>

        {/* Process Timeline */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-green-200 hidden lg:block"></div>
                
                {processSteps.map((step, index) => (
                  <div key={step.id} className={`relative mb-16 lg:mb-24 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex flex-col lg:flex items-center`}>
                    {/* Timeline Dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-600 rounded-full border-4 border-white shadow-lg z-10 hidden lg:block"></div>
                    
                    {/* Content */}
                    <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <Image 
                          src={step.image} 
                          alt={step.title}
                          width={600}
                          height={256}
                          className="w-full h-64 object-cover"
                        />
                        <div className="p-6">
                          <div className="flex items-center mb-4">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                              <span className="text-green-600 font-bold text-sm">{index + 1}</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                          </div>
                          <p className="text-gray-600 mb-6">{step.description}</p>
                          <ul className="space-y-2">
                            {step.details.map((detail, detailIndex) => (
                              <li key={detailIndex} className="flex items-start">
                                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span className="text-gray-600 text-sm">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    {/* Spacer for opposite side */}
                    <div className="lg:w-1/2 hidden lg:block"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Quality Standards */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Quality Standards</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Every step of our process is governed by strict quality standards and international certifications.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">ISO 22000</h3>
                  <p className="text-gray-600 text-sm">Food Safety Management System</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Organic</h3>
                  <p className="text-gray-600 text-sm">USDA & EU Organic Certified</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Fair Trade</h3>
                  <p className="text-gray-600 text-sm">Fair Trade USA Certified</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Rainforest Alliance</h3>
                  <p className="text-gray-600 text-sm">Sustainable Agriculture Certified</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Production Capacity */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Production Capacity</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Our state-of-the-art facilities ensure consistent quality and reliable supply.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-8 rounded-lg text-white text-center">
                  <div className="text-4xl font-bold mb-2">120+</div>
                  <div className="text-green-100 mb-2">Tons per Day</div>
                  <div className="text-sm text-green-200">Cherry Processing Capacity</div>
                </div>
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-8 rounded-lg text-white text-center">
                  <div className="text-4xl font-bold mb-2">96+</div>
                  <div className="text-amber-100 mb-2">Tons per Day</div>
                  <div className="text-sm text-amber-200">Green Bean Production</div>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-8 rounded-lg text-white text-center">
                  <div className="text-4xl font-bold mb-2">2000+</div>
                  <div className="text-blue-100 mb-2">Tons per Year</div>
                  <div className="text-sm text-blue-200">Annual Export Volume</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-green-600">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Experience Our Quality Process
              </h2>
              <p className="text-green-100 mb-8 text-lg">
                From farm to port, every step is carefully monitored to ensure 
                you receive the finest Vietnamese coffee beans.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href={`/${locale}/contact`}
                  className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  {await t('quote.form.submit', locale)}
                </a>
                <a 
                  href={`/${locale}/products`}
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
                >
                  {await t('products.viewAll', locale)}
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
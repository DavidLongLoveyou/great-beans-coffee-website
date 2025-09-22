import { Metadata } from 'next';
import Image from 'next/image';
import { getCurrentLocale, t } from '@/lib/i18n';
import { mockCompanyInfo } from '@/lib/mock-data';
import SchemaGenerator from '@/components/seo/SchemaGenerator';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getCurrentLocale();
  
  return {
    title: await t('seo.about.title', locale),
    description: await t('seo.about.description', locale),
    openGraph: {
      title: await t('seo.about.title', locale),
      description: await t('seo.about.description', locale),
      type: 'website',
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
    },
    alternates: {
      canonical: `/${locale}/about-us`,
      languages: {
        'en': '/en/about-us',
        'vi': '/vi/about-us',
      },
    },
  };
}

export default async function AboutUsPage() {
  const locale = await getCurrentLocale();
  
  const breadcrumbs = [
    { name: await t('navigation.home', locale), url: `/${locale}` },
    { name: await t('navigation.about', locale), url: `/${locale}/about-us` },
  ];

  return (
    <>
      <SchemaGenerator type="organization" data={{ company: mockCompanyInfo }} />
      <SchemaGenerator type="breadcrumbList" data={{ breadcrumbs }} />
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-amber-50 to-orange-50 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {await t('company.name', locale)}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {await t('company.tagline', locale)}
              </p>
              <div className="w-24 h-1 bg-amber-600 mx-auto"></div>
            </div>
          </div>
        </section>

        {/* Company Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Our Story
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {await t('company.description', locale)}
                  </p>
                  <p className="text-gray-600 mb-6">
                    Since our establishment in 2018, we have grown from a small local operation 
                    to a trusted partner for coffee roasters and importers across more than 10 countries. 
                    Our commitment to quality, sustainability, and ethical business practices has earned 
                    us the trust of over 500 satisfied customers worldwide.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="text-center p-4 bg-amber-50 rounded-lg">
                      <div className="text-2xl font-bold text-amber-600">2018</div>
                      <div className="text-sm text-gray-600">Founded</div>
                    </div>
                    <div className="text-center p-4 bg-amber-50 rounded-lg">
                      <div className="text-2xl font-bold text-amber-600">10+</div>
                      <div className="text-sm text-gray-600">Countries</div>
                    </div>
                    <div className="text-center p-4 bg-amber-50 rounded-lg">
                      <div className="text-2xl font-bold text-amber-600">500+</div>
                      <div className="text-sm text-gray-600">Customers</div>
                    </div>
                    <div className="text-center p-4 bg-amber-50 rounded-lg">
                      <div className="text-2xl font-bold text-amber-600">120+</div>
                      <div className="text-sm text-gray-600">Tons/Day</div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <Image 
                    src="/images/about/coffee-farm.jpg" 
                    alt="Coffee farm in Vietnam"
                    width={600}
                    height={384}
                    className="rounded-lg shadow-lg w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12">
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                  <p className="text-gray-600">
                    {await t('company.mission', locale)}
                  </p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                  <p className="text-gray-600">
                    {await t('company.vision', locale)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  These core values guide everything we do, from sourcing to delivery.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Quality Excellence</h3>
                  <p className="text-gray-600">
                    We maintain the highest standards in every step of our process, 
                    from farm to export.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Sustainability</h3>
                  <p className="text-gray-600">
                    Environmental responsibility and social impact are at the heart 
                    of our operations.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Partnership</h3>
                  <p className="text-gray-600">
                    We build long-term relationships based on trust, transparency, 
                    and mutual success.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Meet the passionate professionals behind The Great Beans.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <Image 
                    src="/images/team/ceo.jpg" 
                    alt="CEO"
                    width={96}
                    height={96}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Nguyen Van A</h3>
                  <p className="text-amber-600 mb-3">Chief Executive Officer</p>
                  <p className="text-gray-600 text-sm">
                    20+ years experience in coffee industry and international trade.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <Image 
                    src="/images/team/quality-manager.jpg" 
                    alt="Quality Manager"
                    width={96}
                    height={96}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Tran Thi B</h3>
                  <p className="text-amber-600 mb-3">Quality Control Manager</p>
                  <p className="text-gray-600 text-sm">
                    Expert in coffee grading and quality assurance with international certifications.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                  <Image 
                    src="/images/team/export-manager.jpg" 
                    alt="Export Manager"
                    width={96}
                    height={96}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Le Van C</h3>
                  <p className="text-amber-600 mb-3">Export Manager</p>
                  <p className="text-gray-600 text-sm">
                    Specialized in global logistics and international market development.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-amber-600">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Partner with Us?
              </h2>
              <p className="text-amber-100 mb-8 text-lg">
                Join hundreds of satisfied customers worldwide who trust The Great Beans 
                for their premium Vietnamese coffee needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href={`/${locale}/contact`}
                  className="bg-white text-amber-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  {await t('quote.form.submit', locale)}
                </a>
                <a 
                  href={`/${locale}/products`}
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-amber-600 transition-colors"
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
import { Metadata } from 'next';
import Image from 'next/image';
import { getCurrentLocale, t } from '@/lib/i18n';
import SchemaGenerator from '@/components/seo/SchemaGenerator';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getCurrentLocale();
  
  return {
    title: `${await t('sustainability.title', locale)} - ${await t('company.name', locale)}`,
    description: await t('sustainability.subtitle', locale),
    openGraph: {
      title: `${await t('sustainability.title', locale)} - ${await t('company.name', locale)}`,
      description: await t('sustainability.subtitle', locale),
      type: 'website',
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
    },
    alternates: {
      canonical: `/${locale}/sustainability`,
      languages: {
        'en': '/en/sustainability',
        'vi': '/vi/sustainability',
      },
    },
  };
}

export default async function SustainabilityPage() {
  const locale = await getCurrentLocale();
  
  const breadcrumbs = [
    { name: await t('navigation.home', locale), url: `/${locale}` },
    { name: await t('navigation.sustainability', locale), url: `/${locale}/sustainability` },
  ];

  const sustainabilityPillars = [
    {
      id: 'environmental',
      title: 'Environmental Stewardship',
      description: 'Protecting our planet through sustainable farming practices and carbon-neutral operations.',
      icon: '🌱',
      initiatives: [
        'Zero-waste processing facilities',
        'Renewable energy adoption',
        'Water conservation systems',
        'Biodiversity preservation',
        'Carbon footprint reduction',
      ],
    },
    {
      id: 'social',
      title: 'Social Responsibility',
      description: 'Empowering farming communities and ensuring fair working conditions throughout our supply chain.',
      icon: '🤝',
      initiatives: [
        'Fair wages for all farmers',
        'Education programs for children',
        'Healthcare support for workers',
        'Gender equality initiatives',
        'Community development projects',
      ],
    },
    {
      id: 'economic',
      title: 'Economic Sustainability',
      description: 'Building long-term prosperity for farmers and communities while maintaining business viability.',
      icon: '💰',
      initiatives: [
        'Premium pricing for quality',
        'Long-term farmer contracts',
        'Microfinance programs',
        'Crop diversification support',
        'Market access facilitation',
      ],
    },
  ];

  const certifications = [
    {
      name: 'Rainforest Alliance',
      description: 'Certified sustainable agriculture practices that protect ecosystems and improve livelihoods.',
      logo: '/images/certifications/rainforest-alliance.png',
      year: '2019',
    },
    {
      name: 'Fair Trade USA',
      description: 'Ensuring fair wages and working conditions for farmers and workers.',
      logo: '/images/certifications/fair-trade.png',
      year: '2020',
    },
    {
      name: 'USDA Organic',
      description: 'Certified organic farming without synthetic pesticides or fertilizers.',
      logo: '/images/certifications/usda-organic.png',
      year: '2021',
    },
    {
      name: 'UTZ Certified',
      description: 'Sustainable farming program focused on better farming, better future.',
      logo: '/images/certifications/utz.png',
      year: '2022',
    },
  ];

  const impactStats = [
    {
      number: '1,200+',
      label: 'Farmers Supported',
      description: 'Direct partnerships with coffee farming families',
    },
    {
      number: '85%',
      label: 'Renewable Energy',
      description: 'Of our processing facilities powered by clean energy',
    },
    {
      number: '40%',
      label: 'Carbon Reduction',
      description: 'Decrease in carbon footprint since 2020',
    },
    {
      number: '15',
      label: 'Community Projects',
      description: 'Schools, clinics, and infrastructure built',
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
                {await t('sustainability.title', locale)}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {await t('sustainability.subtitle', locale)}
              </p>
              <div className="w-24 h-1 bg-green-600 mx-auto"></div>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Commitment</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                We believe that great coffee should not come at the expense of our planet or people. 
                Our sustainability commitment goes beyond compliance – it&apos;s about creating positive 
                impact that lasts for generations. From the farmers who grow our beans to the 
                communities that depend on coffee, we&apos;re building a more sustainable future together.
              </p>
            </div>
          </div>
        </section>

        {/* Sustainability Pillars */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Three Pillars of Sustainability</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Our approach to sustainability is built on three fundamental pillars that guide every decision we make.
                </p>
              </div>
              <div className="grid lg:grid-cols-3 gap-8">
                {sustainabilityPillars.map((pillar) => (
                  <div key={pillar.id} className="bg-white rounded-lg shadow-lg p-8">
                    <div className="text-4xl mb-4">{pillar.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{pillar.title}</h3>
                    <p className="text-gray-600 mb-6">{pillar.description}</p>
                    <ul className="space-y-3">
                      {pillar.initiatives.map((initiative, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700">{initiative}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Impact Statistics */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact by Numbers</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Measurable results from our sustainability initiatives across environmental, social, and economic dimensions.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {impactStats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-green-600">{stat.number}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{stat.label}</h3>
                    <p className="text-gray-600 text-sm">{stat.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Certifications</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Third-party certifications that validate our commitment to sustainable and ethical practices.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {certifications.map((cert, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm p-6 text-center">
                    <Image 
                      src={cert.logo} 
                      alt={cert.name}
                      width={64}
                      height={64}
                      className="mx-auto mb-4 object-contain"
                    />
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{cert.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{cert.description}</p>
                    <div className="text-xs text-green-600 font-semibold">Certified since {cert.year}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Climate Action */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Climate Action Initiative</h2>
                  <p className="text-gray-600 mb-6">
                    Coffee farming is particularly vulnerable to climate change. We&apos;re taking proactive 
                    steps to build resilience and reduce our environmental impact.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                        <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Carbon Neutral by 2025</h3>
                        <p className="text-gray-600 text-sm">Achieving net-zero emissions across our entire supply chain</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Renewable Energy</h3>
                        <p className="text-gray-600 text-sm">Solar and biomass energy powering our processing facilities</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center mr-4 mt-1">
                        <svg className="w-4 h-4 text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 3.636a1 1 0 010 1.414 7 7 0 000 9.9 1 1 0 11-1.414 1.414 9 9 0 010-12.728 1 1 0 011.414 0zm9.9 0a1 1 0 011.414 0 9 9 0 010 12.728 1 1 0 11-1.414-1.414 7 7 0 000-9.9 1 1 0 010-1.414zM7.879 6.464a1 1 0 010 1.414 3 3 0 000 4.243 1 1 0 11-1.415 1.415 5 5 0 010-7.071 1 1 0 011.415 0zm4.242 0a1 1 0 011.415 0 5 5 0 010 7.072 1 1 0 01-1.415-1.415 3 3 0 000-4.242 1 1 0 010-1.415zM10 8a2 2 0 100 4 2 2 0 000-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Water Conservation</h3>
                        <p className="text-gray-600 text-sm">Advanced water recycling and efficient irrigation systems</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <Image 
                    src="/images/sustainability/climate-action.jpg" 
                    alt="Climate Action"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community Impact */}
        <section className="py-16 bg-green-600">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="relative">
                  <Image 
                    src="/images/sustainability/community.jpg" 
                    alt="Community Impact"
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg"
                  />
                </div>
                <div className="text-white">
                  <h2 className="text-3xl font-bold mb-6">Empowering Communities</h2>
                  <p className="text-green-100 mb-6">
                    Our success is deeply connected to the wellbeing of the farming communities 
                    we work with. We invest in education, healthcare, and infrastructure to 
                    create lasting positive change.
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-2xl font-bold mb-1">5</div>
                      <div className="text-green-200 text-sm">Schools Built</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold mb-1">3</div>
                      <div className="text-green-200 text-sm">Health Clinics</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold mb-1">450+</div>
                      <div className="text-green-200 text-sm">Children Educated</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold mb-1">25km</div>
                      <div className="text-green-200 text-sm">Roads Improved</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Partner with Us for Sustainable Coffee
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                Join us in creating a more sustainable coffee industry. 
                Together, we can make a positive impact on people and planet.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href={`/${locale}/contact`}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  {await t('quote.form.submit', locale)}
                </a>
                <a 
                  href={`/${locale}/insights`}
                  className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition-colors"
                >
                  Read Our Impact Reports
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
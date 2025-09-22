import { Metadata } from 'next';
import { getCurrentLocale, t } from '@/lib/i18n';
import SchemaGenerator from '@/components/seo/SchemaGenerator';
import { mockCompanyInfo } from '@/lib/mock-data';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getCurrentLocale();
  
  return {
    title: `${await t('contact.title', locale)} - ${await t('company.name', locale)}`,
    description: await t('contact.subtitle', locale),
    openGraph: {
      title: `${await t('contact.title', locale)} - ${await t('company.name', locale)}`,
      description: await t('contact.subtitle', locale),
      type: 'website',
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
    },
    alternates: {
      canonical: `/${locale}/contact`,
      languages: {
        'en': '/en/contact',
        'vi': '/vi/contact',
      },
    },
  };
}

export default async function ContactPage() {
  const locale = await getCurrentLocale();
  
  const breadcrumbs = [
    { name: await t('navigation.home', locale), url: `/${locale}` },
    { name: await t('navigation.contact', locale), url: `/${locale}/contact` },
  ];

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email',
      value: mockCompanyInfo.email,
      description: 'Send us an email anytime',
      action: `mailto:${mockCompanyInfo.email}`,
    },
    {
      icon: '📞',
      title: 'Phone',
      value: mockCompanyInfo.phone,
      description: 'Call us during business hours',
      action: `tel:${mockCompanyInfo.phone}`,
    },
    {
      icon: '📍',
      title: 'Address',
      value: mockCompanyInfo.address,
      description: 'Visit our headquarters',
      action: '#',
    },
    {
      icon: '🕒',
      title: 'Business Hours',
      value: 'Mon - Fri: 8:00 AM - 6:00 PM',
      description: 'Vietnam Time (GMT+7)',
      action: '#',
    },
  ];

  const offices = [
    {
      name: 'Head Office',
      address: 'Ho Chi Minh City, Vietnam',
      phone: '+84 28 1234 5678',
      email: 'hcmc@thegreatbeans.com',
      description: 'Main operations and export coordination',
    },
    {
      name: 'Processing Facility',
      address: 'Dak Lak Province, Vietnam',
      phone: '+84 262 123 456',
      email: 'daklak@thegreatbeans.com',
      description: 'Coffee processing and quality control',
    },
    {
      name: 'Farm Operations',
      address: 'Gia Lai Province, Vietnam',
      phone: '+84 269 123 456',
      email: 'gialai@thegreatbeans.com',
      description: 'Agricultural operations and farmer relations',
    },
  ];

  return (
    <>
      <SchemaGenerator type="breadcrumbList" data={{ breadcrumbs }} />
      <SchemaGenerator type="organization" data={{ company: mockCompanyInfo }} />
      
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-green-50 to-emerald-50 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {await t('contact.title', locale)}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {await t('contact.subtitle', locale)}
              </p>
              <div className="w-24 h-1 bg-green-600 mx-auto"></div>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {contactMethods.map((method, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">{method.icon}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{method.title}</h3>
                    <p className="text-gray-600 mb-2">{method.value}</p>
                    <p className="text-gray-500 text-sm">{method.description}</p>
                    {method.action !== '#' && (
                      <a 
                        href={method.action}
                        className="inline-block mt-3 text-green-600 hover:text-green-700 font-medium"
                      >
                        Contact Now
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Quote Form Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Request a Quote</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Get a personalized quote for your coffee requirements. Our team will respond within 24 hours.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-8">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Your company name"
                      />
                    </div>
                    <div>
                      <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Person *
                      </label>
                      <input
                        type="text"
                        id="contactPerson"
                        name="contactPerson"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Your full name"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="your.email@company.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                        Country *
                      </label>
                      <select
                        id="country"
                        name="country"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="">Select your country</option>
                        <option value="US">United States</option>
                        <option value="DE">Germany</option>
                        <option value="JP">Japan</option>
                        <option value="KR">South Korea</option>
                        <option value="AU">Australia</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        <option value="FR">France</option>
                        <option value="IT">Italy</option>
                        <option value="NL">Netherlands</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="interestedProducts" className="block text-sm font-medium text-gray-700 mb-2">
                      Interested Products
                    </label>
                    <div className="grid md:grid-cols-3 gap-4">
                      <label className="flex items-center">
                        <input type="checkbox" name="interestedProducts" value="arabica" className="mr-2" />
                        <span className="text-sm">Arabica Beans</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" name="interestedProducts" value="robusta" className="mr-2" />
                        <span className="text-sm">Robusta Beans</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" name="interestedProducts" value="specialty" className="mr-2" />
                        <span className="text-sm">Specialty Coffee</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" name="interestedProducts" value="organic" className="mr-2" />
                        <span className="text-sm">Organic Coffee</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" name="interestedProducts" value="instant" className="mr-2" />
                        <span className="text-sm">Instant Coffee</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" name="interestedProducts" value="custom" className="mr-2" />
                        <span className="text-sm">Custom Blend</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="quantityInTons" className="block text-sm font-medium text-gray-700 mb-2">
                        Quantity Required (Tons) *
                      </label>
                      <input
                        type="number"
                        id="quantityInTons"
                        name="quantityInTons"
                        required
                        min="1"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="e.g., 20"
                      />
                    </div>
                    <div>
                      <label htmlFor="packagingRequirements" className="block text-sm font-medium text-gray-700 mb-2">
                        Packaging Requirements
                      </label>
                      <select
                        id="packagingRequirements"
                        name="packagingRequirements"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="">Select packaging</option>
                        <option value="jute-60kg">Jute Bags (60kg)</option>
                        <option value="jute-69kg">Jute Bags (69kg)</option>
                        <option value="pp-60kg">PP Bags (60kg)</option>
                        <option value="bulk">Bulk Container</option>
                        <option value="custom">Custom Packaging</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Requirements
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Please provide any additional details about your requirements, delivery timeline, quality specifications, etc."
                    ></textarea>
                  </div>
                  
                  <div className="text-center">
                    <button
                      type="submit"
                      className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Send Quote Request
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Office Locations */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Locations</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  We have offices and facilities across Vietnam to serve you better.
                </p>
              </div>
              <div className="grid lg:grid-cols-3 gap-8">
                {offices.map((office, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{office.name}</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <svg className="w-5 h-5 text-gray-400 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-600">{office.address}</span>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-gray-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        <a href={`tel:${office.phone}`} className="text-green-600 hover:text-green-700">{office.phone}</a>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-gray-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        <a href={`mailto:${office.email}`} className="text-green-600 hover:text-green-700">{office.email}</a>
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm mt-4">{office.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Us</h2>
                <p className="text-gray-600">Located in the heart of Vietnam&apos;s coffee region</p>
              </div>
              <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-gray-500">Interactive map will be integrated here</p>
                  <p className="text-gray-400 text-sm mt-2">Google Maps or similar mapping service</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                <p className="text-gray-600">Common questions about our products and services</p>
              </div>
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">What is your minimum order quantity?</h3>
                  <p className="text-gray-600">Our minimum order quantity is 1 container (approximately 18-20 tons), but we can accommodate smaller orders for sample purposes or trial shipments.</p>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does delivery take?</h3>
                  <p className="text-gray-600">Delivery time depends on your location and shipping method. Typically, sea freight takes 15-30 days, while air freight takes 3-7 days from Vietnam.</p>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you provide samples?</h3>
                  <p className="text-gray-600">Yes, we provide free samples (up to 1kg) for quality evaluation. Shipping costs for samples are borne by the customer.</p>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">What certifications do you have?</h3>
                  <p className="text-gray-600">We hold multiple certifications including Rainforest Alliance, Fair Trade USA, USDA Organic, UTZ, and ISO 22000 for food safety management.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
import { Metadata } from 'next';
import { Locale } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Truck, Plane, Ship, Package, Clock, MapPin } from 'lucide-react';

interface ShippingPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Shipping Information - The Great Beans',
    description: 'Learn about our shipping options, delivery times, and logistics services for coffee exports worldwide.',
    openGraph: {
      title: 'Shipping Information - The Great Beans',
      description: 'Learn about our shipping options, delivery times, and logistics services for coffee exports worldwide.',
      type: 'website',
    },
  };
}

const shippingOptions = [
  {
    icon: Ship,
    name: 'Sea Freight',
    description: 'Most economical option for large orders',
    deliveryTime: '15-30 days',
    minOrder: '1 container (18-20 tons)',
    features: ['Cost-effective for bulk orders', 'Full container loads (FCL)', 'Less than container loads (LCL)', 'Door-to-port or door-to-door'],
  },
  {
    icon: Plane,
    name: 'Air Freight',
    description: 'Faster delivery for urgent orders',
    deliveryTime: '3-7 days',
    minOrder: '100 kg',
    features: ['Fast delivery', 'Suitable for smaller quantities', 'Temperature-controlled options', 'Express handling available'],
  },
  {
    icon: Truck,
    name: 'Express Courier',
    description: 'For samples and small orders',
    deliveryTime: '2-5 days',
    minOrder: '1 kg',
    features: ['Door-to-door delivery', 'Tracking included', 'Perfect for samples', 'Insurance coverage'],
  },
];

const regions = [
  {
    name: 'Asia Pacific',
    countries: ['Japan', 'South Korea', 'Australia', 'Singapore', 'Thailand', 'Malaysia'],
    seaFreight: '7-15 days',
    airFreight: '2-4 days',
  },
  {
    name: 'Europe',
    countries: ['Germany', 'Netherlands', 'Italy', 'France', 'UK', 'Spain'],
    seaFreight: '20-30 days',
    airFreight: '3-5 days',
  },
  {
    name: 'North America',
    countries: ['USA', 'Canada', 'Mexico'],
    seaFreight: '18-25 days',
    airFreight: '3-6 days',
  },
  {
    name: 'Middle East & Africa',
    countries: ['UAE', 'Saudi Arabia', 'South Africa', 'Egypt'],
    seaFreight: '15-25 days',
    airFreight: '4-7 days',
  },
];

export default async function ShippingPage({
  params,
}: ShippingPageProps) {
  const { locale } = await params;
  return (
    <div className="min-h-screen bg-gradient-to-b from-coffee-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-coffee-900 mb-6">
            Shipping Information
          </h1>
          <p className="text-xl text-coffee-700 max-w-3xl mx-auto mb-8">
            We deliver premium Vietnamese coffee beans worldwide with reliable shipping options 
            tailored to your needs. From samples to full container loads.
          </p>
        </div>
      </section>

      {/* Shipping Options */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-coffee-900 text-center mb-12">
            Shipping Options
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {shippingOptions.map((option) => {
              const Icon = option.icon;
              return (
                <Card key={option.name} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <div className="bg-coffee-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-coffee-600" />
                    </div>
                    <CardTitle className="text-coffee-900">{option.name}</CardTitle>
                    <CardDescription>{option.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-coffee-700">Delivery Time:</span>
                        <Badge variant="secondary">
                          <Clock className="w-3 h-3 mr-1" />
                          {option.deliveryTime}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-coffee-700">Min Order:</span>
                        <Badge variant="outline">
                          <Package className="w-3 h-3 mr-1" />
                          {option.minOrder}
                        </Badge>
                      </div>
                      <div>
                        <h4 className="font-semibold text-coffee-900 mb-2">Features:</h4>
                        <ul className="text-sm text-coffee-700 space-y-1">
                          {option.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-coffee-400 mr-2">•</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Delivery Times by Region */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-coffee-900 text-center mb-12">
            Delivery Times by Region
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {regions.map((region) => (
              <Card key={region.name} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center text-coffee-900">
                    <MapPin className="w-5 h-5 mr-2 text-coffee-600" />
                    {region.name}
                  </CardTitle>
                  <CardDescription>
                    {region.countries.join(', ')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-coffee-700">Sea Freight:</span>
                      <Badge variant="secondary">{region.seaFreight}</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-coffee-700">Air Freight:</span>
                      <Badge variant="outline">{region.airFreight}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-coffee-900 text-center mb-12">
            Important Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-coffee-900">Packaging & Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-coffee-700 space-y-2">
                  <li>• Professional export packaging</li>
                  <li>• Complete export documentation</li>
                  <li>• Certificate of Origin</li>
                  <li>• Quality certificates</li>
                  <li>• Phytosanitary certificates</li>
                  <li>• Insurance coverage available</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-coffee-900">Customs & Duties</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-coffee-700 space-y-2">
                  <li>• Export clearance included</li>
                  <li>• Import duties buyer&apos;s responsibility</li>
                  <li>• Customs broker assistance available</li>
                  <li>• HS code: 0901 (Coffee)</li>
                  <li>• Proper labeling and marking</li>
                  <li>• Compliance with destination regulations</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-coffee-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-coffee-900 mb-6">
            Need Custom Shipping Solutions?
          </h2>
          <p className="text-xl text-coffee-700 mb-8">
            Our logistics team can create tailored shipping solutions for your specific requirements. 
            Contact us to discuss your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center px-6 py-3 bg-coffee-600 text-white font-medium rounded-lg hover:bg-coffee-700 transition-colors"
            >
              Contact Our Team
            </a>
            <a
              href="mailto:logistics@thegreatbeans.com"
              className="inline-flex items-center justify-center px-6 py-3 border border-coffee-600 text-coffee-600 font-medium rounded-lg hover:bg-coffee-50 transition-colors"
            >
              Email Logistics Team
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
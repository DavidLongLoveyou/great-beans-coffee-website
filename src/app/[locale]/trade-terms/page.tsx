import { Metadata } from 'next';
import { Locale } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Truck, DollarSign, Shield, Globe, Clock, Scale, Handshake } from 'lucide-react';

interface TradeTermsPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Trade Terms & Conditions - The Great Beans',
    description: 'Our comprehensive trade terms and conditions for coffee export business. Learn about payment terms, delivery, and commercial agreements.',
    openGraph: {
      title: 'Trade Terms & Conditions - The Great Beans',
      description: 'Our comprehensive trade terms and conditions for coffee export business. Learn about payment terms, delivery, and commercial agreements.',
      type: 'website',
    },
  };
}

const tradeTerms = [
  {
    icon: DollarSign,
    title: 'Payment Terms',
    description: 'Flexible payment options for international trade',
    details: [
      'Letter of Credit (L/C) at sight or 30/60/90 days',
      'Telegraphic Transfer (T/T) - 30% advance, 70% against documents',
      'Documents Against Payment (D/P)',
      'Documents Against Acceptance (D/A) for established customers',
      'Cash Against Documents (CAD) for smaller orders',
    ],
  },
  {
    icon: Truck,
    title: 'Delivery Terms',
    description: 'International commercial terms (Incoterms 2020)',
    details: [
      'FOB (Free On Board) - Ho Chi Minh Port',
      'CIF (Cost, Insurance, Freight) - Destination port',
      'CFR (Cost and Freight) - Destination port',
      'EXW (Ex Works) - Our warehouse in Vietnam',
      'FCA (Free Carrier) - Nominated place in Vietnam',
    ],
  },
  {
    icon: FileText,
    title: 'Documentation',
    description: 'Required export and trade documentation',
    details: [
      'Commercial Invoice',
      'Packing List',
      'Bill of Lading (B/L) or Airway Bill',
      'Certificate of Origin (Form CO or EUR.1)',
      'Phytosanitary Certificate',
      'Quality Certificate and Analysis Report',
    ],
  },
  {
    icon: Shield,
    title: 'Quality Assurance',
    description: 'Quality standards and inspection procedures',
    details: [
      'Pre-shipment inspection available',
      'Third-party quality certification',
      'Moisture content: Max 12.5%',
      'Defect rate: As per agreed specifications',
      'Sample approval before shipment',
      'Quality guarantee and claims procedure',
    ],
  },
];

const contractTerms = [
  {
    category: 'Minimum Order Quantities',
    icon: Scale,
    terms: [
      'Sea freight: 1 x 20ft container (18-20 MT)',
      'Air freight: 100 kg minimum',
      'Sample orders: 1 kg minimum',
      'LCL (Less than Container Load): 5 MT minimum',
    ],
  },
  {
    category: 'Pricing & Validity',
    icon: DollarSign,
    terms: [
      'Prices quoted in USD per MT',
      'Price validity: 7-14 days from quotation date',
      'Subject to final confirmation and contract signing',
      'Prices exclude destination charges and duties',
    ],
  },
  {
    category: 'Delivery Schedule',
    icon: Clock,
    terms: [
      'Production lead time: 7-14 days after order confirmation',
      'Sea freight: 15-30 days transit time',
      'Air freight: 3-7 days transit time',
      'Delivery schedule subject to vessel/flight availability',
    ],
  },
  {
    category: 'Force Majeure',
    icon: Shield,
    terms: [
      'Natural disasters and weather conditions',
      'Government regulations and policy changes',
      'Port strikes and transportation disruptions',
      'Pandemic or health emergency restrictions',
    ],
  },
];

const disputeResolution = [
  {
    step: 1,
    title: 'Direct Negotiation',
    description: 'Parties attempt to resolve disputes through direct communication and negotiation.',
    timeframe: '30 days',
  },
  {
    step: 2,
    title: 'Mediation',
    description: 'If direct negotiation fails, disputes will be referred to mediation by a neutral third party.',
    timeframe: '60 days',
  },
  {
    step: 3,
    title: 'Arbitration',
    description: 'Final disputes will be settled through arbitration under ICC Rules in Singapore.',
    timeframe: 'As per ICC procedures',
  },
];

export default async function TradeTermsPage({
  params,
}: TradeTermsPageProps) {
  const { locale } = await params;
  return (
    <div className="min-h-screen bg-gradient-to-b from-coffee-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Handshake className="w-16 h-16 text-coffee-600 mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold text-coffee-900 mb-6">
            Trade Terms & Conditions
          </h1>
          <p className="text-xl text-coffee-700 max-w-3xl mx-auto mb-8">
            Comprehensive terms and conditions for international coffee trade. 
            Professional, transparent, and compliant with global trade standards.
          </p>
          <Badge variant="secondary" className="text-sm">
            Effective Date: January 1, 2024
          </Badge>
        </div>
      </section>

      {/* Main Trade Terms */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-coffee-900 text-center mb-12">
            Key Trade Terms
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tradeTerms.map((term) => {
              const Icon = term.icon;
              return (
                <Card key={term.title} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div className="bg-coffee-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                        <Icon className="w-6 h-6 text-coffee-600" />
                      </div>
                      <div>
                        <CardTitle className="text-coffee-900">{term.title}</CardTitle>
                        <CardDescription>{term.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-coffee-700 space-y-2">
                      {term.details.map((detail, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-coffee-400 mr-2 mt-1">•</span>
                          <span className="text-sm">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contract Terms */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-coffee-900 text-center mb-12">
            Contract Terms & Conditions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {contractTerms.map((section) => {
              const Icon = section.icon;
              return (
                <Card key={section.category} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-coffee-900 flex items-center">
                      <Icon className="w-5 h-5 mr-2 text-coffee-600" />
                      {section.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-coffee-700 space-y-2">
                      {section.terms.map((term, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-coffee-400 mr-2 mt-1">•</span>
                          <span className="text-sm">{term}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dispute Resolution */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-coffee-900 text-center mb-12">
            Dispute Resolution Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {disputeResolution.map((step) => (
              <div key={step.step} className="text-center">
                <div className="bg-coffee-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  {step.step}
                </div>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-coffee-900">{step.title}</CardTitle>
                    <Badge variant="outline">{step.timeframe}</Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-coffee-700 text-sm">{step.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Framework */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-coffee-900 text-center mb-12">
            Legal Framework
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-coffee-900 flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-coffee-600" />
                  Governing Law
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-coffee-700 space-y-2 text-sm">
                  <li>• Contracts governed by Vietnamese law</li>
                  <li>• International trade terms per Incoterms 2020</li>
                  <li>• UN Convention on Contracts (CISG) applicable</li>
                  <li>• Local regulations and export requirements</li>
                  <li>• Destination country import regulations</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-coffee-900 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-coffee-600" />
                  Compliance & Certifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-coffee-700 space-y-2 text-sm">
                  <li>• ISO 22000 Food Safety Management</li>
                  <li>• HACCP certification</li>
                  <li>• Organic certification (where applicable)</li>
                  <li>• Fair Trade certification (selected products)</li>
                  <li>• Rainforest Alliance certification</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-coffee-900 text-center mb-12">
            Important Notes
          </h2>
          <Card className="bg-coffee-50 border-coffee-200">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-coffee-900 mb-2">
                    Contract Modifications
                  </h3>
                  <p className="text-coffee-700">
                    Any modifications to these terms must be agreed upon in writing by both parties. 
                    Verbal agreements or modifications are not binding.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-coffee-900 mb-2">
                    Risk Management
                  </h3>
                  <p className="text-coffee-700">
                    We recommend appropriate insurance coverage for international shipments. 
                    Marine cargo insurance can be arranged upon request.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-coffee-900 mb-2">
                    Currency Fluctuation
                  </h3>
                  <p className="text-coffee-700">
                    Prices are quoted in USD. Currency fluctuation risks are borne by the buyer 
                    unless otherwise specified in the contract.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-coffee-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-coffee-900 mb-6">
            Questions About Trade Terms?
          </h2>
          <p className="text-xl text-coffee-700 mb-8">
            Our trade specialists are available to discuss terms and customize agreements 
            to meet your specific requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <a href={`/${locale}/contact`}>
                Contact Trade Team
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="mailto:trade@thegreatbeans.com">
                Email Trade Department
              </a>
            </Button>
          </div>
          <div className="mt-8 p-6 bg-white rounded-lg">
            <h3 className="text-lg font-semibold text-coffee-900 mb-2">
              Trade Department
            </h3>
            <p className="text-coffee-700">
              Email: trade@thegreatbeans.com<br />
              Phone: +84 (0) 123 456 789<br />
              Address: 123 Coffee Street, Ho Chi Minh City, Vietnam<br />
              Business Hours: Monday - Friday, 8:00 AM - 6:00 PM (GMT+7)
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
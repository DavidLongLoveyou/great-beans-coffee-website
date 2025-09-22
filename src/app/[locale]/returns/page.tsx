import { Metadata } from 'next';
import { Locale } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RotateCcw, Package, Clock, CheckCircle, AlertCircle, Mail } from 'lucide-react';

interface ReturnsPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Returns & Refunds Policy - The Great Beans',
    description: 'Learn about our returns and refunds policy for coffee products. Quality guarantee and customer satisfaction.',
    openGraph: {
      title: 'Returns & Refunds Policy - The Great Beans',
      description: 'Learn about our returns and refunds policy for coffee products. Quality guarantee and customer satisfaction.',
      type: 'website',
    },
  };
}

const returnReasons = [
  {
    icon: AlertCircle,
    title: 'Quality Issues',
    description: 'Product doesn&apos;t meet our quality standards',
    eligible: true,
    timeframe: '30 days',
  },
  {
    icon: Package,
    title: 'Damaged in Transit',
    description: 'Product arrived damaged or contaminated',
    eligible: true,
    timeframe: '7 days',
  },
  {
    icon: RotateCcw,
    title: 'Wrong Product',
    description: 'Received different product than ordered',
    eligible: true,
    timeframe: '14 days',
  },
  {
    icon: CheckCircle,
    title: 'Change of Mind',
    description: 'Customer preference change',
    eligible: false,
    timeframe: 'Not eligible',
  },
];

const returnProcess = [
  {
    step: 1,
    title: 'Contact Us',
    description: 'Email us with your order number and reason for return within the specified timeframe.',
    icon: Mail,
  },
  {
    step: 2,
    title: 'Return Authorization',
    description: 'We&apos;ll review your request and provide a Return Authorization (RA) number if approved.',
    icon: CheckCircle,
  },
  {
    step: 3,
    title: 'Package & Ship',
    description: 'Package the product securely with the RA number and ship using our provided label.',
    icon: Package,
  },
  {
    step: 4,
    title: 'Inspection & Refund',
    description: 'Once received, we&apos;ll inspect the product and process your refund within 5-7 business days.',
    icon: RotateCcw,
  },
];

export default async function ReturnsPage({
  params,
}: ReturnsPageProps) {
  const { locale } = await params;
  return (
    <div className="min-h-screen bg-gradient-to-b from-coffee-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-coffee-900 mb-6">
            Returns & Refunds
          </h1>
          <p className="text-xl text-coffee-700 max-w-3xl mx-auto mb-8">
            We stand behind the quality of our coffee. If you&apos;re not completely satisfied, 
            we&apos;ll make it right with our comprehensive returns policy.
          </p>
        </div>
      </section>

      {/* Quality Guarantee */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-coffee-100 rounded-2xl p-8 mb-12">
            <CheckCircle className="w-16 h-16 text-coffee-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-coffee-900 mb-4">
              100% Quality Guarantee
            </h2>
            <p className="text-lg text-coffee-700">
              Every bag of coffee we ship meets our strict quality standards. If your coffee 
              doesn&apos;t meet your expectations due to quality issues, we&apos;ll replace it or provide 
              a full refund.
            </p>
          </div>
        </div>
      </section>

      {/* Return Eligibility */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-coffee-900 text-center mb-12">
            Return Eligibility
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {returnReasons.map((reason) => {
              const Icon = reason.icon;
              return (
                <Card key={reason.title} className={`hover:shadow-lg transition-shadow ${
                  reason.eligible ? 'border-green-200' : 'border-red-200'
                }`}>
                  <CardHeader className="text-center">
                    <div className={`rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 ${
                      reason.eligible ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      <Icon className={`w-8 h-8 ${
                        reason.eligible ? 'text-green-600' : 'text-red-600'
                      }`} />
                    </div>
                    <CardTitle className="text-coffee-900">{reason.title}</CardTitle>
                    <CardDescription>{reason.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Badge variant={reason.eligible ? 'default' : 'destructive'}>
                      {reason.eligible ? 'Eligible' : 'Not Eligible'}
                    </Badge>
                    <p className="text-sm text-coffee-600 mt-2">
                      <Clock className="w-4 h-4 inline mr-1" />
                      {reason.timeframe}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Return Process */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-coffee-900 text-center mb-12">
            How to Return Your Order
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {returnProcess.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="text-center">
                  <div className="bg-coffee-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                    {step.step}
                  </div>
                  <div className="bg-coffee-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-coffee-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-coffee-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-coffee-700">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Return Conditions */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-coffee-900 text-center mb-12">
            Return Conditions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-coffee-900 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                  Acceptable Returns
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-coffee-700 space-y-2">
                  <li>• Products in original packaging</li>
                  <li>• Unopened bags (for quality issues)</li>
                  <li>• Products within return timeframe</li>
                  <li>• Valid Return Authorization number</li>
                  <li>• Original purchase receipt</li>
                  <li>• Products not contaminated by customer</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-coffee-900 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
                  Non-Returnable Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-coffee-700 space-y-2">
                  <li>• Opened bags (except quality issues)</li>
                  <li>• Products past return deadline</li>
                  <li>• Custom blends or special orders</li>
                  <li>• Products damaged by customer</li>
                  <li>• Items without Return Authorization</li>
                  <li>• Products contaminated or mixed</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Refund Information */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-coffee-900 text-center mb-12">
            Refund Information
          </h2>
          <Card>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <Clock className="w-12 h-12 text-coffee-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-coffee-900 mb-2">
                    Processing Time
                  </h3>
                  <p className="text-coffee-700">
                    5-7 business days after we receive your return
                  </p>
                </div>
                <div>
                  <RotateCcw className="w-12 h-12 text-coffee-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-coffee-900 mb-2">
                    Refund Method
                  </h3>
                  <p className="text-coffee-700">
                    Original payment method or store credit
                  </p>
                </div>
                <div>
                  <Package className="w-12 h-12 text-coffee-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-coffee-900 mb-2">
                    Shipping Costs
                  </h3>
                  <p className="text-coffee-700">
                    We cover return shipping for quality issues
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
            Need Help with a Return?
          </h2>
          <p className="text-xl text-coffee-700 mb-8">
            Our customer service team is here to help you with any return questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <a href={`/${locale}/contact`}>
                Contact Customer Service
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="mailto:returns@thegreatbeans.com">
                Email Returns Team
              </a>
            </Button>
          </div>
          <div className="mt-8 p-6 bg-white rounded-lg">
            <h3 className="text-lg font-semibold text-coffee-900 mb-2">
              Returns Department
            </h3>
            <p className="text-coffee-700">
              Email: returns@thegreatbeans.com<br />
              Phone: +84 (0) 123 456 789<br />
              Hours: Monday - Friday, 8:00 AM - 6:00 PM (GMT+7)
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
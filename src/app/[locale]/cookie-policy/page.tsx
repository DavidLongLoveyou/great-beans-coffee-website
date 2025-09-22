import { Metadata } from 'next';


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Cookie, Shield, Settings, BarChart3, Users, Globe } from 'lucide-react';



export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Cookie Policy - The Great Beans',
    description: 'Learn about how we use cookies on our website to improve your experience and provide better services.',
    openGraph: {
      title: 'Cookie Policy - The Great Beans',
      description: 'Learn about how we use cookies on our website to improve your experience and provide better services.',
      type: 'website',
    },
  };
}

const cookieTypes = [
  {
    icon: Shield,
    name: 'Essential Cookies',
    description: 'Required for basic website functionality',
    purpose: 'These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.',
    examples: ['Session management', 'Security tokens', 'Load balancing', 'CSRF protection'],
    canDisable: false,
    duration: 'Session or up to 1 year',
  },
  {
    icon: BarChart3,
    name: 'Analytics Cookies',
    description: 'Help us understand how visitors use our site',
    purpose: 'These cookies collect information about how you use our website, such as which pages you visit most often and if you get error messages.',
    examples: ['Google Analytics', 'Page views', 'User behavior', 'Performance metrics'],
    canDisable: true,
    duration: 'Up to 2 years',
  },
  {
    icon: Settings,
    name: 'Functional Cookies',
    description: 'Remember your preferences and settings',
    purpose: 'These cookies allow the website to remember choices you make and provide enhanced, more personal features.',
    examples: ['Language preferences', 'Region settings', 'Theme preferences', 'Form data'],
    canDisable: true,
    duration: 'Up to 1 year',
  },
  {
    icon: Users,
    name: 'Marketing Cookies',
    description: 'Used to deliver relevant advertisements',
    purpose: 'These cookies are used to make advertising messages more relevant to you and your interests.',
    examples: ['Ad targeting', 'Social media integration', 'Remarketing', 'Conversion tracking'],
    canDisable: true,
    duration: 'Up to 1 year',
  },
];

const thirdPartyServices = [
  {
    name: 'Google Analytics',
    purpose: 'Website analytics and performance monitoring',
    cookies: ['_ga', '_ga_*', '_gid', '_gat'],
    privacy: 'https://policies.google.com/privacy',
  },
  {
    name: 'Google Ads',
    purpose: 'Advertising and conversion tracking',
    cookies: ['_gcl_*', 'IDE', 'test_cookie'],
    privacy: 'https://policies.google.com/privacy',
  },
  {
    name: 'Facebook Pixel',
    purpose: 'Social media integration and advertising',
    cookies: ['_fbp', '_fbc', 'fr'],
    privacy: 'https://www.facebook.com/privacy/explanation',
  },
  {
    name: 'YouTube',
    purpose: 'Video content embedding',
    cookies: ['VISITOR_INFO1_LIVE', 'YSC', 'PREF'],
    privacy: 'https://policies.google.com/privacy',
  },
];

export default async function CookiePolicyPage() {
  const locale = 'en';
  return (
    <div className="min-h-screen bg-gradient-to-b from-coffee-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Cookie className="w-16 h-16 text-coffee-600 mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold text-coffee-900 mb-6">
            Cookie Policy
          </h1>
          <p className="text-xl text-coffee-700 max-w-3xl mx-auto mb-8">
            This policy explains how The Great Beans uses cookies and similar technologies 
            to recognize you when you visit our website.
          </p>
          <Badge variant="secondary" className="text-sm">
            Last updated: December 2024
          </Badge>
        </div>
      </section>

      {/* What are Cookies */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-coffee-900 mb-8">
            What are Cookies?
          </h2>
          <Card>
            <CardContent className="p-8">
              <p className="text-lg text-coffee-700 mb-6">
                Cookies are small data files that are placed on your computer or mobile device when you visit a website. 
                Cookies are widely used by website owners to make their websites work, or to work more efficiently, 
                as well as to provide reporting information.
              </p>
              <p className="text-lg text-coffee-700">
                Cookies set by the website owner (in this case, The Great Beans) are called &quot;first party cookies&quot;. 
                Cookies set by parties other than the website owner are called &quot;third party cookies&quot;. 
                Third party cookies enable third party features or functionality to be provided on or through the website.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Types of Cookies */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-coffee-900 text-center mb-12">
            Types of Cookies We Use
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cookieTypes.map((cookie) => {
              const Icon = cookie.icon;
              return (
                <Card key={cookie.name} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      <div className="bg-coffee-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                        <Icon className="w-6 h-6 text-coffee-600" />
                      </div>
                      <div>
                        <CardTitle className="text-coffee-900">{cookie.name}</CardTitle>
                        <CardDescription>{cookie.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={cookie.canDisable ? 'secondary' : 'default'}>
                        {cookie.canDisable ? 'Optional' : 'Required'}
                      </Badge>
                      <Badge variant="outline">{cookie.duration}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-coffee-900 mb-2">Purpose:</h4>
                        <p className="text-coffee-700 text-sm">{cookie.purpose}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-coffee-900 mb-2">Examples:</h4>
                        <ul className="text-sm text-coffee-700 space-y-1">
                          {cookie.examples.map((example, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-coffee-400 mr-2">•</span>
                              {example}
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

      {/* Third Party Services */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-coffee-900 text-center mb-12">
            Third Party Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {thirdPartyServices.map((service) => (
              <Card key={service.name} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-coffee-900 flex items-center">
                    <Globe className="w-5 h-5 mr-2 text-coffee-600" />
                    {service.name}
                  </CardTitle>
                  <CardDescription>{service.purpose}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-coffee-900 mb-2">Cookies:</h4>
                      <div className="flex flex-wrap gap-1">
                        {service.cookies.map((cookie, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {cookie}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <a
                        href={service.privacy}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-coffee-600 hover:text-coffee-700 text-sm underline"
                      >
                        View Privacy Policy →
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Managing Cookies */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-coffee-900 text-center mb-12">
            Managing Your Cookie Preferences
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-coffee-900">Browser Settings</CardTitle>
                <CardDescription>
                  You can control cookies through your browser settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-coffee-700 space-y-2 text-sm">
                  <li>• Block all cookies</li>
                  <li>• Block third-party cookies only</li>
                  <li>• Delete cookies when you close your browser</li>
                  <li>• Allow cookies from specific sites</li>
                  <li>• Get notified when cookies are set</li>
                </ul>
                <p className="text-xs text-coffee-600 mt-4">
                  Note: Blocking cookies may affect website functionality
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-coffee-900">Opt-Out Links</CardTitle>
                <CardDescription>
                  Direct links to opt out of specific services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <a
                    href="https://tools.google.com/dlpage/gaoptout"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-coffee-600 hover:text-coffee-700 underline"
                  >
                    Google Analytics Opt-out →
                  </a>
                  <a
                    href="https://www.google.com/settings/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-coffee-600 hover:text-coffee-700 underline"
                  >
                    Google Ads Settings →
                  </a>
                  <a
                    href="https://www.facebook.com/ads/preferences"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-coffee-600 hover:text-coffee-700 underline"
                  >
                    Facebook Ad Preferences →
                  </a>
                  <a
                    href="http://www.aboutads.info/choices/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-coffee-600 hover:text-coffee-700 underline"
                  >
                    Digital Advertising Alliance →
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Updates and Contact */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-coffee-900 text-center mb-12">
            Updates to This Policy
          </h2>
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-lg text-coffee-700 mb-6">
                We may update this Cookie Policy from time to time to reflect changes in our practices 
                or for other operational, legal, or regulatory reasons. We will notify you of any material 
                changes by posting the updated policy on our website.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <a href={`/${locale}/contact`}>
                    Contact Us About Cookies
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href={`/${locale}/privacy-policy`}>
                    View Privacy Policy
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4 bg-coffee-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-coffee-900 mb-6">
            Questions About Cookies?
          </h2>
          <p className="text-xl text-coffee-700 mb-8">
            If you have any questions about our use of cookies or this Cookie Policy, 
            please contact our privacy team.
          </p>
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-lg font-semibold text-coffee-900 mb-2">
              Privacy Team
            </h3>
            <p className="text-coffee-700">
              Email: privacy@thegreatbeans.com<br />
              Address: 123 Coffee Street, Ho Chi Minh City, Vietnam<br />
              Phone: +84 (0) 123 456 789
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
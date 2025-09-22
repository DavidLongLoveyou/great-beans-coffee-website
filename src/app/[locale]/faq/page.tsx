import { Metadata } from 'next';
import { getCurrentLocale, t } from '@/lib/i18n';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MessageCircle } from 'lucide-react';



export async function generateMetadata(): Promise<Metadata> {
  const locale = await getCurrentLocale();

  return {
    title: await t('meta.title', locale),
    description: await t('meta.description', locale),
    openGraph: {
      title: await t('meta.title', locale),
      description: await t('meta.description', locale),
      type: 'website',
    },
  };
}

const faqData = [
  {
    category: 'General',
    questions: [
      {
        question: 'What types of coffee do you offer?',
        answer: 'We specialize in premium Vietnamese coffee beans, including Arabica, Robusta, and specialty blends. All our beans are sourced directly from certified farms in Vietnam&apos;s premier coffee-growing regions.',
      },
      {
        question: 'Are your coffee beans certified?',
        answer: 'Yes, we offer various certifications including Organic, Fair Trade, Rainforest Alliance, and UTZ. Each product page clearly indicates which certifications apply to that specific coffee.',
      },
      {
        question: 'What is your minimum order quantity?',
        answer: 'Our minimum order quantity varies by product and destination. For most products, the MOQ is 1 container (approximately 18-20 tons). Please contact us for specific requirements.',
      },
    ],
  },
  {
    category: 'Ordering & Payment',
    questions: [
      {
        question: 'How do I place an order?',
        answer: 'You can place an order by contacting our sales team directly through email or phone. We&apos;ll provide you with a detailed quotation and guide you through the ordering process.',
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept various payment methods including Letter of Credit (L/C), Telegraphic Transfer (T/T), and other internationally recognized payment instruments. Payment terms are negotiable based on order size and customer relationship.',
      },
      {
        question: 'Can I get samples before placing a large order?',
        answer: 'Absolutely! We provide samples for quality evaluation. Sample costs and shipping fees apply, but these can be deducted from your first commercial order.',
      },
    ],
  },
  {
    category: 'Shipping & Delivery',
    questions: [
      {
        question: 'What are your shipping options?',
        answer: 'We offer various shipping options including sea freight (most economical for large orders), air freight (faster delivery), and express courier for samples. We work with reliable logistics partners worldwide.',
      },
      {
        question: 'How long does delivery take?',
        answer: 'Delivery times vary by destination and shipping method. Sea freight typically takes 15-30 days, air freight 3-7 days, and express courier 2-5 days. We&apos;ll provide accurate timelines with your quotation.',
      },
      {
        question: 'Do you handle customs clearance?',
        answer: 'We can arrange export clearance from Vietnam. For import clearance at destination, we work with trusted partners or you can use your preferred customs broker.',
      },
    ],
  },
  {
    category: 'Quality & Sustainability',
    questions: [
      {
        question: 'How do you ensure coffee quality?',
        answer: 'We have a comprehensive quality control system including farm-level monitoring, processing oversight, laboratory testing, and pre-shipment inspection. Each batch comes with detailed quality certificates.',
      },
      {
        question: 'What sustainability practices do you follow?',
        answer: 'We&apos;re committed to sustainable coffee production through direct farmer partnerships, environmental conservation programs, fair pricing, and community development initiatives in coffee-growing regions.',
      },
      {
        question: 'Can you provide traceability information?',
        answer: 'Yes, we provide full traceability for our coffee beans, including farm origin, processing methods, quality scores, and certification details. This information is available with each shipment.',
      },
    ],
  },
];
export default async function FAQPage() {

  return (
    <div className="min-h-screen bg-gradient-to-b from-coffee-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-coffee-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-coffee-700 max-w-3xl mx-auto mb-8">
            Find answers to common questions about our coffee products, ordering process, 
            shipping, and more. Can&apos;t find what you&apos;re looking for? Contact us directly.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {faqData.map((category, categoryIndex) => (
            <div key={category.category} className="mb-12">
              <h2 className="text-2xl font-bold text-coffee-900 mb-6">
                {category.category}
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                {category.questions.map((faq, questionIndex) => (
                  <AccordionItem
                    key={`${categoryIndex}-${questionIndex}`}
                    value={`${categoryIndex}-${questionIndex}`}
                    className="bg-white rounded-lg border border-coffee-200 px-6"
                  >
                    <AccordionTrigger className="text-left font-semibold text-coffee-900 hover:text-coffee-700">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-coffee-700 pt-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-coffee-900 mb-4">
              Still Have Questions?
            </h2>
            <p className="text-xl text-coffee-700">
              Our team is here to help. Reach out to us through any of these channels.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-coffee-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-coffee-600" />
                </div>
                <CardTitle className="text-coffee-900">Email Us</CardTitle>
                <CardDescription>Get detailed answers to your questions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-coffee-700 mb-4">info@thegreatbeans.com</p>
                <Button variant="outline" className="border-coffee-600 text-coffee-600 hover:bg-coffee-50">
                  Send Email
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-coffee-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-coffee-600" />
                </div>
                <CardTitle className="text-coffee-900">Call Us</CardTitle>
                <CardDescription>Speak directly with our team</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-coffee-700 mb-4">+84 123 456 789</p>
                <Button variant="outline" className="border-coffee-600 text-coffee-600 hover:bg-coffee-50">
                  Call Now
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="bg-coffee-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-coffee-600" />
                </div>
                <CardTitle className="text-coffee-900">Live Chat</CardTitle>
                <CardDescription>Get instant support online</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-coffee-700 mb-4">Available 9 AM - 6 PM (GMT+7)</p>
                <Button className="bg-coffee-600 hover:bg-coffee-700">
                  Start Chat
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
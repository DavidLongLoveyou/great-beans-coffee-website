import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  const baseUrl = 'https://thegreatbeans.com';
  const currentPath = '';
  
  return {
    title: 'The Great Beans - Premium Coffee Trading',
    description: 'Premium Vietnamese coffee beans for global markets. Sustainable sourcing, quality assurance, and direct trade partnerships.',
    alternates: {
      canonical: `${baseUrl}/${locale}${currentPath}`,
      languages: {
        'en': `${baseUrl}/en${currentPath}`,
        'vi': `${baseUrl}/vi${currentPath}`,
        'x-default': `${baseUrl}/en${currentPath}`,
      },
    },
    openGraph: {
      url: `${baseUrl}/${locale}${currentPath}`,
      locale: locale,
      alternateLocale: locale === 'en' ? 'vi' : 'en',
    },
  };
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  
  return (
    <html lang={locale} className={inter.className}>
      <body className="antialiased bg-white text-gray-900">
        <div className="min-h-screen flex flex-col">
          <Header locale={locale} />
          <main className="flex-1">
            {children}
          </main>
          <Footer locale={locale} />
        </div>
      </body>
    </html>
  );
}
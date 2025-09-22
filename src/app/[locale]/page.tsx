import { Metadata } from 'next';
import Link from 'next/link';
import SchemaGenerator from '@/components/seo/SchemaGenerator';
import { mockPosts, mockCompanyInfo } from '@/lib/mock-data';
import { Locale } from '@/types';

import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import ProductsSection from '@/components/sections/ProductsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CTASection from '@/components/sections/CTASection';

interface HomePageProps {
  params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  
  return {
    title: locale === 'vi' ? 'The Great Beans - Xuất Khẩu Cà Phê Chất Lượng Cao' : 'The Great Beans - Premium Coffee Export',
    description: locale === 'vi' 
      ? 'Chuyên xuất khẩu cà phê Arabica và Robusta chất lượng cao từ Việt Nam. Cam kết bền vững và chất lượng tuyệt vời.'
      : 'Premium Arabica and Robusta coffee export from Vietnam. Committed to sustainability and exceptional quality.',
    keywords: locale === 'vi'
      ? 'xuất khẩu cà phê, cà phê Việt Nam, Arabica, Robusta, cà phê chất lượng cao'
      : 'coffee export, Vietnam coffee, Arabica, Robusta, premium coffee',
    openGraph: {
      title: locale === 'vi' ? 'The Great Beans - Xuất Khẩu Cà Phê Chất Lượng Cao' : 'The Great Beans - Premium Coffee Export',
      description: locale === 'vi'
        ? 'Chuyên xuất khẩu cà phê Arabica và Robusta chất lượng cao từ Việt Nam'
        : 'Premium Arabica and Robusta coffee export from Vietnam',
      type: 'website',
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en': '/en',
        'vi': '/vi',
      },
    },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const isVietnamese = locale === 'vi';

  const latestPosts = mockPosts.slice(0, 3);

  return (
    <>
      <SchemaGenerator
        type="organization"
        data={{
          company: {
             name: "The Great Beans",
             legal_name: "The Great Beans Co., Ltd",
             founded: "2020",
             description: isVietnamese 
               ? "Chuyên xuất khẩu cà phê chất lượng cao từ Việt Nam"
               : "Premium coffee export from Vietnam",
             website: `https://thegreatbeans.com/${locale}`,
             email: mockCompanyInfo.email,
             phone: mockCompanyInfo.phone,
             address: mockCompanyInfo.address + ", Ho Chi Minh City, Vietnam",
             employees: "50-100",
             annual_revenue: "$5-10M",
             export_countries: ["USA", "Europe", "Asia"],
             certifications: ["ISO 9001", "HACCP", "Organic"],
             production_capacity: {
               daily_cherry: "50 tons",
               daily_beans: "10 tons",
               annual_export: "2000 tons"
             },
             social_media: {
               linkedin: "https://linkedin.com/company/thegreatbeans",
               facebook: "https://facebook.com/thegreatbeans"
             }
           }
        }}
      />
      <main>
        <HeroSection locale={locale} />
        <FeaturesSection locale={locale} />
        <ProductsSection locale={locale} />
        <TestimonialsSection locale={locale} />
        <CTASection locale={locale} />

        
        {/* Legacy sections for reference - will be replaced by components */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {isVietnamese ? 'Tin tức & Insights' : 'Latest Insights'}
              </h2>
              <p className="text-lg text-gray-600">
                {isVietnamese
                  ? 'Cập nhật những thông tin mới nhất về thị trường cà phê'
                  : 'Stay updated with the latest coffee market insights'
                }
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {latestPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-green-200 to-green-400"></div>
                  <div className="p-6">
                    <div className="text-sm text-gray-500 mb-2">
                      {new Date(post.published_at).toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US')}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    <Link
                      href={`/${locale}/insights/${post.slug}`}
                      className="text-amber-600 font-semibold hover:text-amber-700 transition-colors">
                      {isVietnamese ? 'Đọc thêm →' : 'Read More →'}
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href={`/${locale}/insights/coffee-market-trends-2024`}
                className="inline-block bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors">
                {isVietnamese ? 'Xem tất cả bài viết' : 'View All Articles'}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
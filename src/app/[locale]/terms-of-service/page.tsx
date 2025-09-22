import { Metadata } from 'next';
import { getCurrentLocale, t } from '@/lib/i18n';
import SchemaGenerator from '@/components/seo/SchemaGenerator';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getCurrentLocale();
  
  return {
    title: `${await t('terms.title', locale)} - ${await t('company.name', locale)}`,
    description: await t('terms.description', locale),
    alternates: {
      canonical: `/${locale}/terms-of-service`,
      languages: {
        'en': '/en/terms-of-service',
        'vi': '/vi/terms-of-service',
      },
    },
  };
}

export default async function TermsOfServicePage() {
  const locale = await getCurrentLocale();
  const isVietnamese = locale === 'vi';

  const breadcrumbs = [
    { name: await t('navigation.home', locale), url: `/${locale}` },
    { name: await t('terms.title', locale), url: `/${locale}/terms-of-service` },
  ];

  return (
    <>
      <SchemaGenerator type="breadcrumbList" data={{ breadcrumbs }} />
      
      <div className="min-h-screen bg-white">
        {/* Header */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumbs */}
              <nav className="mb-8">
                <ol className="flex items-center space-x-2 text-sm text-gray-600">
                  {breadcrumbs.map((crumb, index) => (
                    <li key={index} className="flex items-center">
                      {index > 0 && <span className="mx-2">/</span>}
                      {index === breadcrumbs.length - 1 ? (
                        <span className="text-gray-900 font-medium">{crumb.name}</span>
                      ) : (
                        <a href={crumb.url} className="hover:text-green-600 transition-colors">
                          {crumb.name}
                        </a>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>

              <h1 className="text-4xl font-bold text-gray-900 mb-6">
                {isVietnamese ? 'Điều Khoản Dịch Vụ' : 'Terms of Service'}
              </h1>
              <p className="text-lg text-gray-600">
                {isVietnamese 
                  ? 'Cập nhật lần cuối: 15 tháng 1, 2024'
                  : 'Last updated: January 15, 2024'
                }
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-lg">
              {isVietnamese ? (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Chấp Nhận Điều Khoản</h2>
                    <p className="text-gray-700 leading-relaxed">
                      Bằng cách truy cập và sử dụng trang web này, bạn chấp nhận và đồng ý bị ràng buộc 
                      bởi các điều khoản và điều kiện của thỏa thuận này.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Sử Dụng Trang Web</h2>
                    <p className="text-gray-700 leading-relaxed">
                      Bạn có thể sử dụng trang web của chúng tôi cho mục đích hợp pháp và theo cách 
                      không vi phạm quyền của bất kỳ bên thứ ba nào.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Sở Hữu Trí Tuệ</h2>
                    <p className="text-gray-700 leading-relaxed">
                      Tất cả nội dung trên trang web này, bao gồm văn bản, hình ảnh, logo và thiết kế, 
                      đều thuộc sở hữu của The Great Beans và được bảo vệ bởi luật bản quyền.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Giới Hạn Trách Nhiệm</h2>
                    <p className="text-gray-700 leading-relaxed">
                      The Great Beans sẽ không chịu trách nhiệm cho bất kỳ thiệt hại trực tiếp, 
                      gián tiếp, ngẫu nhiên hoặc hậu quả nào phát sinh từ việc sử dụng trang web này.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Thay Đổi Điều Khoản</h2>
                    <p className="text-gray-700 leading-relaxed">
                      Chúng tôi có quyền sửa đổi các điều khoản này bất cứ lúc nào. 
                      Việc tiếp tục sử dụng trang web sau khi thay đổi có nghĩa là bạn chấp nhận các điều khoản mới.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Liên Hệ</h2>
                    <p className="text-gray-700 leading-relaxed">
                      Nếu bạn có bất kỳ câu hỏi nào về các điều khoản này, 
                      vui lòng liên hệ với chúng tôi qua email: legal@thegreatbeans.vn
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                    <p className="text-gray-700 leading-relaxed">
                      By accessing and using this website, you accept and agree to be bound by 
                      the terms and conditions of this agreement.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Use of Website</h2>
                    <p className="text-gray-700 leading-relaxed">
                      You may use our website for lawful purposes only and in a way that does not 
                      infringe the rights of any third party.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Intellectual Property</h2>
                    <p className="text-gray-700 leading-relaxed">
                      All content on this website, including text, images, logos, and design, 
                      is owned by The Great Beans and protected by copyright law.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Limitation of Liability</h2>
                    <p className="text-gray-700 leading-relaxed">
                      The Great Beans shall not be liable for any direct, indirect, incidental, 
                      or consequential damages arising from the use of this website.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Changes to Terms</h2>
                    <p className="text-gray-700 leading-relaxed">
                      We reserve the right to modify these terms at any time. 
                      Continued use of the website after changes constitutes acceptance of the new terms.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Contact Us</h2>
                    <p className="text-gray-700 leading-relaxed">
                      If you have any questions about these terms, 
                      please contact us at: legal@thegreatbeans.vn
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
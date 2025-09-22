import { Metadata } from 'next';
import { getCurrentLocale, t } from '@/lib/i18n';
import SchemaGenerator from '@/components/seo/SchemaGenerator';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getCurrentLocale();
  
  return {
    title: `${await t('privacy.title', locale)} - ${await t('company.name', locale)}`,
    description: await t('privacy.description', locale),
    alternates: {
      canonical: `/${locale}/privacy-policy`,
      languages: {
        'en': '/en/privacy-policy',
        'vi': '/vi/privacy-policy',
      },
    },
  };
}

export default async function PrivacyPolicyPage() {
  const locale = await getCurrentLocale();
  const isVietnamese = locale === 'vi';

  const breadcrumbs = [
    { name: await t('navigation.home', locale), url: `/${locale}` },
    { name: await t('privacy.title', locale), url: `/${locale}/privacy-policy` },
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
                {isVietnamese ? 'Chính Sách Bảo Mật' : 'Privacy Policy'}
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
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Thông Tin Chúng Tôi Thu Thập</h2>
                    <p className="text-gray-700 leading-relaxed">
                      Chúng tôi thu thập thông tin bạn cung cấp trực tiếp cho chúng tôi, chẳng hạn như khi bạn tạo tài khoản, 
                      liên hệ với chúng tôi, hoặc sử dụng dịch vụ của chúng tôi.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Cách Chúng Tôi Sử Dụng Thông Tin</h2>
                    <p className="text-gray-700 leading-relaxed">
                      Chúng tôi sử dụng thông tin để cung cấp, duy trì và cải thiện dịch vụ của mình, 
                      xử lý giao dịch và liên lạc với bạn.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Chia Sẻ Thông Tin</h2>
                    <p className="text-gray-700 leading-relaxed">
                      Chúng tôi không bán, trao đổi hoặc cho thuê thông tin cá nhân của bạn cho bên thứ ba 
                      mà không có sự đồng ý của bạn.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Bảo Mật Dữ Liệu</h2>
                    <p className="text-gray-700 leading-relaxed">
                      Chúng tôi thực hiện các biện pháp bảo mật thích hợp để bảo vệ thông tin cá nhân của bạn 
                      khỏi việc truy cập, sử dụng hoặc tiết lộ trái phép.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Liên Hệ</h2>
                    <p className="text-gray-700 leading-relaxed">
                      Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật này, 
                      vui lòng liên hệ với chúng tôi qua email: privacy@thegreatbeans.vn
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
                    <p className="text-gray-700 leading-relaxed">
                      We collect information you provide directly to us, such as when you create an account, 
                      contact us, or use our services.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Information</h2>
                    <p className="text-gray-700 leading-relaxed">
                      We use information to provide, maintain, and improve our services, 
                      process transactions, and communicate with you.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Information Sharing</h2>
                    <p className="text-gray-700 leading-relaxed">
                      We do not sell, trade, or rent your personal information to third parties 
                      without your consent.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
                    <p className="text-gray-700 leading-relaxed">
                      We implement appropriate security measures to protect your personal information 
                      against unauthorized access, use, or disclosure.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Contact Us</h2>
                    <p className="text-gray-700 leading-relaxed">
                      If you have any questions about this privacy policy, 
                      please contact us at: privacy@thegreatbeans.vn
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
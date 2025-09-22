import { Metadata } from 'next';
import { getCurrentLocale, t } from '@/lib/i18n';
import Link from 'next/link';
import Image from 'next/image';
import { mockPosts } from '@/lib/mock-data';




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

export default async function InsightsPage() {
  const locale = await getCurrentLocale();

  return (
    <div className="min-h-screen bg-gradient-to-b from-coffee-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-coffee-900 mb-6">
            {t('insights.title')}
          </h1>
          <p className="text-xl text-coffee-700 max-w-3xl mx-auto mb-8">
            {t('insights.description')}
          </p>
        </div>
      </section>

      {/* Featured Article */}
      {mockPosts.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-coffee-900 mb-4">
                {t('featured')}
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={mockPosts[0].featured_image}
                  alt={mockPosts[0].title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-coffee-100 text-coffee-800 px-3 py-1 rounded-full text-sm font-medium">
                    {mockPosts[0].category}
                  </span>
                  <span className="text-coffee-600 text-sm">
                    {new Date(mockPosts[0].published_at).toLocaleDateString(locale)}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-coffee-900 mb-4">
                  {mockPosts[0].title}
                </h3>
                <p className="text-coffee-700 mb-6 line-clamp-3">
                  {mockPosts[0].excerpt}
                </p>
                <Link
                  href={`/${locale}/insights/${mockPosts[0].slug}`}
                  className="inline-flex items-center text-coffee-600 hover:text-coffee-800 font-medium transition-colors"
                >
                  {t('readMore')}
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-coffee-900 mb-4">
              {t('allArticles')}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockPosts.slice(1).map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-video">
                  <Image
                    src={post.featured_image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="bg-coffee-100 text-coffee-800 px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                    <span className="text-coffee-600 text-sm">
                      {new Date(post.published_at).toLocaleDateString(locale)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-coffee-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-coffee-700 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/${locale}/insights/${post.slug}`}
                    className="inline-flex items-center text-coffee-600 hover:text-coffee-800 font-medium transition-colors"
                  >
                    {t('readMore')}
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
          
          {mockPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-coffee-600 text-lg">
                {t('noArticles')}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
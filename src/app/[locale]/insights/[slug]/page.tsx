import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getCurrentLocale, t } from '@/lib/i18n';
import SchemaGenerator from '@/components/seo/SchemaGenerator';
import { getPostBySlug, getAllPosts } from '@/lib/mock-data';

interface InsightPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Article Not Found',
    };
  }

  const locale = await getCurrentLocale();
  
  return {
    title: `${post.title} - ${await t('company.name', locale)}`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} - ${await t('company.name', locale)}`,
      description: post.excerpt,
      type: 'article',
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
      publishedTime: post.published_at,
      authors: [post.author],
      images: [
        {
          url: post.featured_image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    alternates: {
      canonical: `/${locale}/insights/${params.slug}`,
      languages: {
        'en': `/en/insights/${params.slug}`,
        'vi': `/vi/insights/${params.slug}`,
      },
    },
  };
}

export default async function InsightPage({ params }: InsightPageProps) {
  const post = getPostBySlug(params.slug);
  const locale = await getCurrentLocale();
  
  if (!post) {
    notFound();
  }

  const breadcrumbs = [
    { name: await t('navigation.home', locale), url: `/${locale}` },
    { name: await t('navigation.insights', locale), url: `/${locale}/insights` },
    { name: post.title, url: `/${locale}/insights/${params.slug}` },
  ];

  const relatedPosts = getAllPosts()
    .filter(p => p.slug !== params.slug && p.category === post.category)
    .slice(0, 3);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'vi' ? 'vi-VN' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const estimatedReadTime = Math.ceil(post.content.split(' ').length / 200);

  return (
    <>
      <SchemaGenerator type="blogPosting" data={{ post }} />
      <SchemaGenerator type="breadcrumbList" data={{ breadcrumbs }} />
      
      <div className="min-h-screen bg-white">
        {/* Article Header */}
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

              {/* Article Meta */}
              <div className="mb-6">
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
                    {post.category}
                  </span>
                  <span>{formatDate(post.published_at)}</span>
                  <span>{estimatedReadTime} min read</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {post.excerpt}
              </p>

              {/* Author */}
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-600 font-semibold">{post.author.charAt(0).toUpperCase()}</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{post.author}</p>
                  <p className="text-gray-600 text-sm">Author</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="mb-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <Image 
                  src={post.featured_image} 
                  alt={post.title}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                {/* Content would be rendered from markdown or rich text */}
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  {post.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-lg">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Share Section */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this article</h3>
                <div className="flex space-x-4">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Share on LinkedIn
                  </button>
                  <button className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors">
                    Share on Twitter
                  </button>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                    Share via Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Related Articles</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {relatedPosts.map((relatedPost) => (
                    <article key={relatedPost.slug} className="bg-white rounded-lg shadow-lg overflow-hidden">
                      <Image 
                        src={relatedPost.featured_image} 
                        alt={relatedPost.title}
                        width={400}
                        height={192}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                            {relatedPost.category}
                          </span>
                          <span>{formatDate(relatedPost.published_at)}</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {relatedPost.excerpt}
                        </p>
                        <a 
                          href={`/${locale}/insights/${relatedPost.slug}`}
                          className="text-green-600 hover:text-green-700 font-medium text-sm inline-flex items-center"
                        >
                          Read More 
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Newsletter Signup */}
        <section className="py-16 bg-green-600">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Stay Updated with Coffee Market Insights
              </h2>
              <p className="text-green-100 mb-8 text-lg">
                Get the latest market trends, industry news, and expert analysis delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:outline-none"
                />
                <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to Start Your Coffee Import Journey?
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                Connect with our experts to discuss your coffee sourcing needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href={`/${locale}/contact`}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Get in Touch
                </a>
                <a 
                  href={`/${locale}/products`}
                  className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition-colors"
                >
                  View Our Products
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
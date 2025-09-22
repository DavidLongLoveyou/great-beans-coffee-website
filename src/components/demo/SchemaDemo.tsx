'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, Eye, FileText, Package } from 'lucide-react';
import SchemaGenerator from '@/components/seo/SchemaGenerator';
import { mockCoffeeProducts, mockPosts } from '@/lib/mock-data';

/**
 * Demo component để minh họa cách JSON-LD Schema tự động hoạt động
 * Component này cho phép xem preview schema được tạo cho các loại content khác nhau
 */
export default function SchemaDemo() {
  const [selectedProduct, setSelectedProduct] = useState(mockCoffeeProducts[0]);
  const [selectedPost, setSelectedPost] = useState(mockPosts[0]);
  const [activeTab, setActiveTab] = useState('product');

  const breadcrumbsProduct = [
    { name: 'Home', url: '/en' },
    { name: 'Products', url: '/en/products' },
    { name: selectedProduct.name, url: `/en/products/${selectedProduct.slug}` },
  ];

  const breadcrumbsPost = [
    { name: 'Home', url: '/en' },
    { name: 'Insights', url: '/en/insights' },
    { name: selectedPost.title, url: `/en/insights/${selectedPost.slug}` },
  ];

  const generateSchemaPreview = (type: string, data: any) => {
    let schema;
    switch (type) {
      case 'product':
        schema = {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: data.name,
          description: data.description,
          sku: data.id,
          brand: {
            '@type': 'Brand',
            name: 'The Great Beans',
          },
          offers: {
            '@type': 'Offer',
            availability: data.available ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
            priceCurrency: 'USD',
            price: data.price_per_kg || 0,
          },
          additionalProperty: [
            { '@type': 'PropertyValue', name: 'Origin', value: data.origin },
            { '@type': 'PropertyValue', name: 'Processing Method', value: data.processing },
            { '@type': 'PropertyValue', name: 'Grade', value: data.grade },
          ],
        };
        break;
      case 'blogPosting':
        schema = {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: data.title,
          description: data.excerpt,
          image: data.featured_image,
          author: {
            '@type': 'Organization',
            name: 'The Great Beans',
          },
          datePublished: data.published_at,
          dateModified: data.updated_at,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://thegreatbeans.vn/insights/${data.slug}`,
          },
          articleSection: data.category,
          keywords: data.tags?.join(', ') || '',
        };
        break;
      case 'breadcrumbList':
        schema = {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: data.map((crumb: any, index: number) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: crumb.name,
            item: crumb.url,
          })),
        };
        break;
      default:
        return null;
    }
    return JSON.stringify(schema, null, 2);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">JSON-LD Schema Integration Demo</h1>
        <p className="text-gray-600">
          Minh họa cách hệ thống tự động tạo structured data cho các trang động
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="product" className="flex items-center gap-2">
            <Package className="w-4 h-4" />
            Product Schema
          </TabsTrigger>
          <TabsTrigger value="blog" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Blog Schema
          </TabsTrigger>
          <TabsTrigger value="breadcrumb" className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Breadcrumb Schema
          </TabsTrigger>
        </TabsList>

        <TabsContent value="product" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Product Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Chọn sản phẩm
                </CardTitle>
                <CardDescription>
                  Chọn một sản phẩm để xem schema được tạo tự động
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockCoffeeProducts.slice(0, 3).map((product) => (
                  <div
                    key={product.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedProduct.id === product.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {product.description.substring(0, 80)}...
                        </p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="secondary">{product.origin}</Badge>
                          <Badge variant="outline">{product.grade}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Generated Schema */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Schema được tạo tự động
                </CardTitle>
                <CardDescription>
                  JSON-LD schema cho sản phẩm đã chọn
                </CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 p-4 rounded-lg text-xs overflow-auto max-h-96">
                  {generateSchemaPreview('product', selectedProduct)}
                </pre>
              </CardContent>
            </Card>
          </div>

          {/* How it works */}
          <Card>
            <CardHeader>
              <CardTitle>Cách thức hoạt động</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <h4 className="font-semibold mb-1">URL Request</h4>
                  <p className="text-sm text-gray-600">
                    User truy cập /products/{selectedProduct.slug}
                  </p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <h4 className="font-semibold mb-1">Data Fetch</h4>
                  <p className="text-sm text-gray-600">
                    getProductBySlug() lấy dữ liệu sản phẩm
                  </p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">3</span>
                  </div>
                  <h4 className="font-semibold mb-1">Schema Generation</h4>
                  <p className="text-sm text-gray-600">
                    SchemaGenerator tạo JSON-LD
                  </p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">4</span>
                  </div>
                  <h4 className="font-semibold mb-1">Injection</h4>
                  <p className="text-sm text-gray-600">
                    Schema được inject vào &lt;head&gt;
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blog" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Blog Post Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Chọn bài viết
                </CardTitle>
                <CardDescription>
                  Chọn một bài viết để xem schema được tạo tự động
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockPosts.slice(0, 3).map((post) => (
                  <div
                    key={post.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedPost.id === post.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedPost(post)}
                  >
                    <div>
                      <h3 className="font-semibold">{post.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {post.excerpt.substring(0, 80)}...
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="secondary">{post.category}</Badge>
                        <Badge variant="outline">{post.reading_time} min read</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Generated Schema */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Schema được tạo tự động
                </CardTitle>
                <CardDescription>
                  JSON-LD schema cho bài viết đã chọn
                </CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 p-4 rounded-lg text-xs overflow-auto max-h-96">
                  {generateSchemaPreview('blogPosting', selectedPost)}
                </pre>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="breadcrumb" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Breadcrumb Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Breadcrumb Navigation
                </CardTitle>
                <CardDescription>
                  Breadcrumbs được tạo tự động cho từng trang
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Product Page Breadcrumbs:</h4>
                  <nav className="text-sm text-gray-600">
                    {breadcrumbsProduct.map((crumb, index) => (
                      <span key={index}>
                        {index > 0 && ' / '}
                        <span className={index === breadcrumbsProduct.length - 1 ? 'text-gray-900 font-medium' : 'text-blue-600'}>
                          {crumb.name}
                        </span>
                      </span>
                    ))}
                  </nav>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Blog Page Breadcrumbs:</h4>
                  <nav className="text-sm text-gray-600">
                    {breadcrumbsPost.map((crumb, index) => (
                      <span key={index}>
                        {index > 0 && ' / '}
                        <span className={index === breadcrumbsPost.length - 1 ? 'text-gray-900 font-medium' : 'text-blue-600'}>
                          {crumb.name}
                        </span>
                      </span>
                    ))}
                  </nav>
                </div>
              </CardContent>
            </Card>

            {/* Generated Schema */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  BreadcrumbList Schema
                </CardTitle>
                <CardDescription>
                  JSON-LD schema cho breadcrumb navigation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 p-4 rounded-lg text-xs overflow-auto max-h-96">
                  {generateSchemaPreview('breadcrumbList', activeTab === 'product' ? breadcrumbsProduct : breadcrumbsPost)}
                </pre>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>Lợi ích của hệ thống tự động</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 text-xl">⚡</span>
              </div>
              <h4 className="font-semibold mb-2">Tự động hoàn toàn</h4>
              <p className="text-sm text-gray-600">
                Không cần can thiệp thủ công cho từng trang mới
              </p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 text-xl">🎯</span>
              </div>
              <h4 className="font-semibold mb-2">SEO tối ưu</h4>
              <p className="text-sm text-gray-600">
                Rich snippets và better search engine understanding
              </p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-600 text-xl">🔧</span>
              </div>
              <h4 className="font-semibold mb-2">Dễ maintain</h4>
              <p className="text-sm text-gray-600">
                Centralized logic và type-safe với TypeScript
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
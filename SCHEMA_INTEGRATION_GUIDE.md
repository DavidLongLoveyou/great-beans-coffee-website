# JSON-LD Schema Integration Guide

## Tổng quan

Website The Great Beans đã được tích hợp hoàn chỉnh hệ thống JSON-LD Schema tự động cho các trang động. Hệ thống này đảm bảo mỗi trang sản phẩm và bài viết blog đều có structured data phù hợp để tối ưu SEO.

## Cách thức hoạt động

### 1. SchemaGenerator Component

Component `SchemaGenerator` tại `src/components/seo/SchemaGenerator.tsx` là trung tâm của hệ thống:

```typescript
interface SchemaGeneratorProps {
  type: 'product' | 'organization' | 'blogPosting' | 'breadcrumbList';
  data?: {
    product?: CoffeeProduct;
    post?: Post;
    company?: CompanyInfo;
    breadcrumbs?: Array<{ name: string; url: string }>;
  };
}
```

### 2. Tích hợp tự động cho Product Pages

**File:** `src/app/[locale]/products/[slug]/page.tsx`

```typescript
export default async function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);
  
  if (!product) {
    notFound();
  }

  const breadcrumbs = [
    { name: await t('navigation.home', locale), url: `/${locale}` },
    { name: await t('navigation.products', locale), url: `/${locale}/products` },
    { name: product.name, url: `/${locale}/products/${params.slug}` },
  ];

  return (
    <>
      <SchemaGenerator type="product" data={{ product }} />
      <SchemaGenerator type="breadcrumbList" data={{ breadcrumbs }} />
      {/* Rest of component */}
    </>
  );
}
```

**Quy trình tự động:**
1. User truy cập URL: `yourwebsite.com/en/products/lam-dong-arabica`
2. Next.js sử dụng file `[slug]/page.tsx` làm template
3. Function `getProductBySlug(params.slug)` lấy dữ liệu sản phẩm
4. Component tự động tạo breadcrumbs
5. `SchemaGenerator` nhận data và tạo JSON-LD schema
6. Schema được inject vào `<head>` của trang

### 3. Tích hợp tự động cho Blog Posts

**File:** `src/app/[locale]/insights/[slug]/page.tsx`

```typescript
export default async function InsightPage({ params }: InsightPageProps) {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    notFound();
  }

  const breadcrumbs = [
    { name: await t('navigation.home', locale), url: `/${locale}` },
    { name: await t('navigation.insights', locale), url: `/${locale}/insights` },
    { name: post.title, url: `/${locale}/insights/${params.slug}` },
  ];

  return (
    <>
      <SchemaGenerator type="blogPosting" data={{ post }} />
      <SchemaGenerator type="breadcrumbList" data={{ breadcrumbs }} />
      {/* Rest of component */}
    </>
  );
}
```

**Quy trình tự động:**
1. User truy cập URL: `yourwebsite.com/vi/insights/vietnamese-coffee-trends`
2. Next.js sử dụng file `insights/[slug]/page.tsx` làm template
3. Function `getPostBySlug(params.slug)` lấy dữ liệu bài viết
4. Component tự động tạo breadcrumbs
5. `SchemaGenerator` nhận data và tạo JSON-LD schema cho BlogPosting
6. Schema được inject vào `<head>` của trang

## Các loại Schema được hỗ trợ

### 1. Product Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Lam Dong Arabica",
  "description": "Premium Arabica coffee beans from Lam Dong province",
  "sku": "product-id",
  "brand": {
    "@type": "Brand",
    "name": "The Great Beans"
  },
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "priceCurrency": "USD",
    "price": 12.50
  }
}
```

### 2. BlogPosting Schema

```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Vietnamese Coffee Export Trends 2024",
  "description": "Analysis of current trends in Vietnamese coffee exports",
  "author": {
    "@type": "Organization",
    "name": "The Great Beans"
  },
  "datePublished": "2024-01-15",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://thegreatbeans.vn/insights/vietnamese-coffee-trends"
  }
}
```

### 3. BreadcrumbList Schema

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "/en"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Products",
      "item": "/en/products"
    }
  ]
}
```

## Lợi ích của hệ thống

### 1. Tự động hóa hoàn toàn
- Không cần can thiệp thủ công cho từng trang
- Schema được tạo tự động dựa trên dữ liệu thực
- Đảm bảo consistency across toàn bộ website

### 2. SEO tối ưu
- Rich snippets trong search results
- Better search engine understanding
- Improved click-through rates

### 3. Maintainability
- Centralized schema logic trong SchemaGenerator
- Easy to update schema formats
- Type-safe với TypeScript

### 4. Đa ngôn ngữ
- Hỗ trợ cả tiếng Anh và tiếng Việt
- Breadcrumbs tự động dịch theo locale
- Schema URLs phù hợp với locale

## Cách mở rộng

### Thêm schema type mới:

1. Cập nhật interface `SchemaGeneratorProps`:
```typescript
type: 'product' | 'organization' | 'blogPosting' | 'breadcrumbList' | 'newType';
```

2. Thêm function generator:
```typescript
const generateNewTypeSchema = (data: NewTypeData) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewType',
    // schema properties
  };
};
```

3. Cập nhật switch case trong `getSchema()`:
```typescript
case 'newType':
  return data?.newTypeData ? generateNewTypeSchema(data.newTypeData) : null;
```

## Kết luận

Hệ thống JSON-LD Schema của The Great Beans đã được tích hợp hoàn chỉnh và hoạt động tự động cho tất cả các trang động. Mỗi khi có sản phẩm mới hoặc bài viết mới, schema sẽ được tạo tự động mà không cần can thiệp thủ công, đảm bảo SEO tối ưu và trải nghiệm người dùng tốt nhất.
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Coffee, 
  Star, 
  MapPin, 
  Leaf, 
  Award, 
  ArrowRight,
  Eye,
  ShoppingCart
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Locale, TranslationSection } from '@/types';
import enLocale from '@/locales/en.json';
import viLocale from '@/locales/vi.json';

interface ProductsSectionProps {
  locale: string;
}

const products = [
  {
    id: 1,
    name: 'Arabica Highland Premium',
    description: 'Single-origin beans from Da Lat highlands with notes of chocolate and caramel.',
    price: '$24.99',
    originalPrice: '$29.99',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjNkY0RTM3Ii8+CjxlbGxpcHNlIGN4PSIyMDAiIGN5PSIxNTAiIHJ4PSI4MCIgcnk9IjEwMCIgZmlsbD0iIzU0M0EyRiIvPgo8ZWxsaXBzZSBjeD0iMjAwIiBjeT0iMTUwIiByeD0iNjAiIHJ5PSI4MCIgZmlsbD0iIzNFMkYyMyIvPgo8cGF0aCBkPSJNMTcwIDEyMEMxNzAgMTEwIDIwMCAxMDAgMjMwIDEyMCIgc3Ryb2tlPSIjOEQ2RTYzIiBzdHJva2Utd2lkdGg9IjIiLz4KPHN2Zz4K',
    rating: 4.9,
    reviews: 156,
    origin: 'Da Lat, Vietnam',
    altitude: '1,500m',
    processing: 'Washed',
    roast: 'Medium',
    badges: ['Premium', 'Single Origin'],
    featured: true,
    discount: 17,
  },
  {
    id: 2,
    name: 'Robusta Bold Blend',
    description: 'Strong and full-bodied blend perfect for espresso with intense flavor profile.',
    price: '$19.99',
    originalPrice: '$22.99',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjNDQ0MDNDIi8+CjxlbGxpcHNlIGN4PSIyMDAiIGN5PSIxNTAiIHJ4PSI4MCIgcnk9IjEwMCIgZmlsbD0iIzJEMkEyNiIvPgo8ZWxsaXBzZSBjeD0iMjAwIiBjeT0iMTUwIiByeD0iNjAiIHJ5PSI4MCIgZmlsbD0iIzFBMTkxNyIvPgo8cGF0aCBkPSJNMTcwIDEyMEMxNzAgMTEwIDIwMCAxMDAgMjMwIDEyMCIgc3Ryb2tlPSIjNkE2NTVGIiBzdHJva2Utd2lkdGg9IjIiLz4KPHN2Zz4K',
    rating: 4.7,
    reviews: 203,
    origin: 'Dak Lak, Vietnam',
    altitude: '800m',
    processing: 'Natural',
    roast: 'Dark',
    badges: ['Bold', 'Espresso'],
    featured: false,
    discount: 13,
  },
  {
    id: 3,
    name: 'Specialty Peaberry',
    description: 'Rare peaberry beans with exceptional sweetness and complex flavor notes.',
    price: '$34.99',
    originalPrice: '$39.99',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRkZGN0VEIi8+CjxlbGxpcHNlIGN4PSIyMDAiIGN5PSIxNTAiIHJ4PSI4MCIgcnk9IjEwMCIgZmlsbD0iI0Y1OTI0NSIvPgo8ZWxsaXBzZSBjeD0iMjAwIiBjeT0iMTUwIiByeD0iNjAiIHJ5PSI4MCIgZmlsbD0iI0VBNzMxNyIvPgo8cGF0aCBkPSJNMTcwIDEyMEMxNzAgMTEwIDIwMCAxMDAgMjMwIDEyMCIgc3Ryb2tlPSIjRkJCRjc3IiBzdHJva2Utd2lkdGg9IjIiLz4KPHN2Zz4K',
    rating: 5.0,
    reviews: 89,
    origin: 'Son La, Vietnam',
    altitude: '1,200m',
    processing: 'Honey',
    roast: 'Light',
    badges: ['Rare', 'Limited'],
    featured: true,
    discount: 12,
  },
  {
    id: 4,
    name: 'Organic Fair Trade',
    description: 'Certified organic beans supporting sustainable farming communities.',
    price: '$27.99',
    originalPrice: '$31.99',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMTY1MzNEIi8+CjxlbGxpcHNlIGN4PSIyMDAiIGN5PSIxNTAiIHJ4PSI4MCIgcnk9IjEwMCIgZmlsbD0iIzBGMzkyNyIvPgo8ZWxsaXBzZSBjeD0iMjAwIiBjeT0iMTUwIiByeD0iNjAiIHJ5PSI4MCIgZmlsbD0iIzA5MjUxOCIvPgo8cGF0aCBkPSJNMTcwIDEyMEMxNzAgMTEwIDIwMCAxMDAgMjMwIDEyMCIgc3Ryb2tlPSIjMjI3NzUzIiBzdHJva2Utd2lkdGg9IjIiLz4KPHN2Zz4K',
    rating: 4.8,
    reviews: 134,
    origin: 'Gia Lai, Vietnam',
    altitude: '1,000m',
    processing: 'Washed',
    roast: 'Medium',
    badges: ['Organic', 'Fair Trade'],
    featured: false,
    discount: 12,
  },
  {
    id: 5,
    name: 'Monsoon Malabar',
    description: 'Unique monsoon-processed beans with low acidity and earthy undertones.',
    price: '$29.99',
    originalPrice: '$34.99',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjOTI0MDBEIi8+CjxlbGxpcHNlIGN4PSIyMDAiIGN5PSIxNTAiIHJ4PSI4MCIgcnk9IjEwMCIgZmlsbD0iIzZCMjkwOSIvPgo8ZWxsaXBzZSBjeD0iMjAwIiBjeT0iMTUwIiByeD0iNjAiIHJ5PSI4MCIgZmlsbD0iIzQ0MjAwNyIvPgo8cGF0aCBkPSJNMTcwIDEyMEMxNzAgMTEwIDIwMCAxMDAgMjMwIDEyMCIgc3Ryb2tlPSIjQjQ1MzA5IiBzdHJva2Utd2lkdGg9IjIiLz4KPHN2Zz4K',
    rating: 4.6,
    reviews: 97,
    origin: 'Lam Dong, Vietnam',
    altitude: '1,300m',
    processing: 'Monsoon',
    roast: 'Medium-Dark',
    badges: ['Unique', 'Specialty'],
    featured: false,
    discount: 14,
  },
  {
    id: 6,
    name: 'Excelsa Rare Variety',
    description: 'Exotic excelsa variety with fruity and wine-like characteristics.',
    price: '$42.99',
    originalPrice: '$49.99',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjNzMxODQzIi8+CjxlbGxpcHNlIGN4PSIyMDAiIGN5PSIxNTAiIHJ4PSI4MCIgcnk9IjEwMCIgZmlsbD0iIzUwMTEyOSIvPgo8ZWxsaXBzZSBjeD0iMjAwIiBjeT0iMTUwIiByeD0iNjAiIHJ5PSI4MCIgZmlsbD0iIzMzMDcxOCIvPgo8cGF0aCBkPSJNMTcwIDEyMEMxNzAgMTEwIDIwMCAxMDAgMjMwIDEyMCIgc3Ryb2tlPSIjOTMzNDU5IiBzdHJva2Utd2lkdGg9IjIiLz4KPHN2Zz4K',
    rating: 4.9,
    reviews: 67,
    origin: 'Kon Tum, Vietnam',
    altitude: '1,400m',
    processing: 'Natural',
    roast: 'Light-Medium',
    badges: ['Exotic', 'Premium'],
    featured: true,
    discount: 14,
  },
];

export default function ProductsSection({ locale }: ProductsSectionProps) {
  const [mounted, setMounted] = useState(false);
  const [, setHoveredProduct] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');
  const [translations, setTranslations] = useState<TranslationSection>({});

  useEffect(() => {
    setMounted(true);
    const locales = {
      en: enLocale,
      vi: viLocale,
    }
    const currentLocale = locales[locale as Locale] || locales.en
    setTranslations(currentLocale.products || {})
  }, [locale]);

  const getLocalizedHref = (href: string) => {
    return `/${locale}${href}`;
  };

  const filteredProducts = filter === 'all' 
    ? products 
    : filter === 'featured' 
    ? products.filter(p => p.featured)
    : products.filter(p => p.badges.some(badge => badge.toLowerCase().includes(filter)));

  const filters = [
    { id: 'all', label: translations.filters?.all || 'All Products', count: products.length },
    { id: 'featured', label: translations.filters?.featured || 'Featured', count: products.filter(p => p.featured).length },
    { id: 'premium', label: translations.filters?.premium || 'Premium', count: products.filter(p => p.badges.some(b => b.toLowerCase().includes('premium'))).length },
    { id: 'organic', label: translations.filters?.organic || 'Organic', count: products.filter(p => p.badges.some(b => b.toLowerCase().includes('organic'))).length },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className={cn(
            "mb-4 transition-all duration-1000 opacity-0 translate-y-4",
            mounted && "opacity-100 translate-y-0"
          )}>
            <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-200 px-4 py-2">
              <Coffee className="w-4 h-4 mr-2" />
              {translations.badge || 'Our Products'}
            </Badge>
          </div>
          
          <h2 className={cn(
            "text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 transition-all duration-1000 opacity-0 translate-y-4",
            mounted && "opacity-100 translate-y-0 delay-200"
          )}>
            {translations.title || 'Premium Vietnamese'}
            <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent"> {translations.titleHighlight || 'Coffee Collection'}</span>
          </h2>
          
          <p className={cn(
            "text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 opacity-0 translate-y-4",
            mounted && "opacity-100 translate-y-0 delay-500"
          )}>
            {translations.subtitle || 'Discover our carefully curated selection of premium Vietnamese coffee beans, each with unique characteristics and exceptional quality standards.'}
          </p>
        </div>

        {/* Filters */}
        <div className={cn(
          "flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 opacity-0 translate-y-4",
          mounted && "opacity-100 translate-y-0 delay-700"
        )}>
          {filters.map((filterItem) => (
            <button
              key={filterItem.id}
              onClick={() => setFilter(filterItem.id)}
              className={cn(
                "px-6 py-3 rounded-full font-medium transition-all duration-300 hover:-translate-y-1",
                filter === filterItem.id
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-amber-300 hover:text-amber-600 shadow-sm hover:shadow-md"
              )}
            >
              {filterItem.label}
              <span className={cn(
                "ml-2 px-2 py-1 rounded-full text-xs",
                filter === filterItem.id
                  ? "bg-white/20 text-white"
                  : "bg-slate-100 text-slate-500"
              )}>
                {filterItem.count}
              </span>
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProducts.map((product, index) => (
            <Card
              key={product.id}
              className={cn(
                "group cursor-pointer border-0 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden opacity-0 translate-y-4",
                "hover:-translate-y-3 hover:scale-105",
                mounted && "opacity-100 translate-y-0",
                product.featured && "ring-2 ring-amber-200"
              )}
              style={{
                animationDelay: `${800 + index * 100}ms`,
              }}
              onMouseEnter={() => setHoveredProduct(product.id.toString())}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                {product.discount > 0 && (
                  <Badge className="absolute top-4 left-4 z-10 bg-red-500 text-white border-0">
                    -{product.discount}%
                  </Badge>
                )}
                
                {product.featured && (
                  <Badge className="absolute top-4 right-4 z-10 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
                    <Award className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                )}

                <div className="relative h-64 bg-gradient-to-br from-amber-50 to-orange-50">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className={cn(
                    "absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300",
                    "flex items-center justify-center opacity-0 group-hover:opacity-100"
                  )}>
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" className="bg-amber-500 hover:bg-amber-600">
                        <ShoppingCart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex flex-wrap gap-1">
                    {product.badges.slice(0, 2).map((badge, badgeIndex) => (
                      <Badge
                        key={badgeIndex}
                        variant="secondary"
                        className="text-xs bg-slate-100 text-slate-600"
                      >
                        {badge}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-medium text-slate-700">{product.rating}</span>
                    <span className="text-xs text-slate-500">({product.reviews})</span>
                  </div>
                </div>
                
                <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                  {product.name}
                </CardTitle>
                
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <MapPin className="w-4 h-4" />
                  <span>{product.origin}</span>
                  <span>•</span>
                  <span>{product.altitude}</span>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <CardDescription className="text-slate-600 leading-relaxed mb-4">
                  {product.description}
                </CardDescription>
                
                <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                  <div className="flex items-center gap-1">
                    <Leaf className="w-3 h-3 text-green-500" />
                    <span className="text-slate-600">{product.processing}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Coffee className="w-3 h-3 text-amber-500" />
                    <span className="text-slate-600">{product.roast}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-slate-900">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-slate-500 line-through">{product.originalPrice}</span>
                    )}
                  </div>
                  
                  <Link href={getLocalizedHref(`/products/${product.id}`)}>
                    <Button
                        size="sm"
                        className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white group/btn w-full"
                      >
                        {translations.viewDetails || 'View Details'}
                        <ArrowRight className="ml-1 w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={cn(
          "text-center transition-all duration-1000 opacity-0 translate-y-4",
          mounted && "opacity-100 translate-y-0 delay-1000"
        )}>
          <Link href={getLocalizedHref('/products')}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              {translations.viewAll || 'View All Products'}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
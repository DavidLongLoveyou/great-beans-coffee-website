'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Star, 
  MapPin, 
  Eye,
  ShoppingCart,
  Award
} from 'lucide-react';
import { CoffeeProduct } from '@/types';

interface ProductCardProps {
  product: CoffeeProduct;
  locale: string;
}

export function ProductCard({ product, locale }: ProductCardProps) {
  // Calculate discount percentage if there's a price difference
  const hasDiscount = product.featured;
  const discountPercentage = hasDiscount ? 15 : 0;
  const originalPrice = hasDiscount ? (product.price_per_kg * 1.15).toFixed(2) : null;

  return (
    <Card className="group cursor-pointer border-0 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-3 hover:scale-105">
      {/* Image Container */}
      <div className="relative overflow-hidden h-48">
        {hasDiscount && (
          <Badge className="absolute top-4 left-4 z-10 bg-red-500 text-white border-0">
            -{discountPercentage}%
          </Badge>
        )}
        
        {product.featured && (
          <Badge className="absolute top-4 right-4 z-10 bg-amber-500 text-white border-0">
            <Award className="w-3 h-3 mr-1" />
            Featured
          </Badge>
        )}
        
        <Image
          src={product.images[0] || '/images/placeholder-coffee.jpg'}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
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

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-2">
          <div className="flex flex-wrap gap-1">
            <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-600">
              {product.variety}
            </Badge>
            <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-600">
              {product.grade}
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium text-slate-700">
              {(product.cupping_score / 20).toFixed(1)}
            </span>
          </div>
        </div>
        
        <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
          {product.name}
        </CardTitle>
        
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <MapPin className="w-4 h-4" />
          <span>{product.origin}</span>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <CardDescription className="text-slate-600 leading-relaxed mb-4 line-clamp-2">
          {product.description}
        </CardDescription>
        
        <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-500">Processing:</span>
            <span className="font-medium text-slate-700">{product.processing}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Body:</span>
            <span className="font-medium text-slate-700">{product.body}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Acidity:</span>
            <span className="font-medium text-slate-700">{product.acidity}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Min Order:</span>
            <span className="font-medium text-slate-700">{product.minimum_order}</span>
          </div>
        </div>
        
        {/* Certifications */}
        {product.certifications.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {product.certifications.slice(0, 3).map((cert, index) => (
              <Badge key={index} variant="outline" className="text-xs text-green-600 border-green-200">
                {cert}
              </Badge>
            ))}
            {product.certifications.length > 3 && (
              <Badge variant="outline" className="text-xs text-slate-500">
                +{product.certifications.length - 3}
              </Badge>
            )}
          </div>
        )}
        
        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-slate-900">
              ${product.price_per_kg.toFixed(2)}
            </span>
            {originalPrice && (
              <span className="text-sm text-slate-500 line-through">
                ${originalPrice}
              </span>
            )}
            <span className="text-sm text-slate-500">/kg</span>
          </div>
          
          <Link href={`/${locale}/products/${product.slug}`}>
            <Button size="sm" className="bg-amber-500 hover:bg-amber-600">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
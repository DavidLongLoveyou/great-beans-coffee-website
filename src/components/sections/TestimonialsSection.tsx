'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Star, 
  Quote, 
  ChevronLeft, 
  ChevronRight,
  Users,
  Building,
  MapPin
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { TranslationSection } from '@/types';
import enLocale from '@/locales/en.json';
import viLocale from '@/locales/vi.json';

interface TestimonialsSectionProps {
  locale?: string;
}

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    title: 'Head of Procurement',
    company: 'Premium Coffee Co.',
    location: 'New York, USA',
    avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiNGM0Y0RjYiLz4KPGNpcmNsZSBjeD0iNDAiIGN5PSIzMiIgcj0iMTIiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTIwIDY4QzIwIDU2IDI4IDQ4IDQwIDQ4UzYwIDU2IDYwIDY4IiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPgo=',
    rating: 5,
    quote: 'The Great Beans has been our trusted partner for 3 years. Their Arabica beans are consistently excellent, and their service is unmatched.',
    highlight: 'Exceptional quality and reliability',
    orderVolume: '500kg/month',
    partnership: '3+ years',
  },
  {
    id: 2,
    name: 'Marco Rossi',
    title: 'Coffee Master',
    company: 'Artisan Roasters',
    location: 'Milan, Italy',
    avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiNGRUY3RkYiLz4KPGNpcmNsZSBjeD0iNDAiIGN5PSIzMiIgcj0iMTIiIGZpbGw9IiM2MzY2RjEiLz4KPHBhdGggZD0iTTIwIDY4QzIwIDU2IDI4IDQ4IDQwIDQ4UzYwIDU2IDYwIDY4IiBmaWxsPSIjNjM2NkYxIi8+Cjwvc3ZnPgo=',
    rating: 5,
    quote: 'As a coffee master, I demand perfection in every bean. The Great Beans delivers exactly that - premium Vietnamese coffee with unique flavor profiles that our customers absolutely love.',
    highlight: 'Perfect for artisan roasting',
    orderVolume: '200kg/month',
    partnership: '2+ years',
  },
  {
    id: 3,
    name: 'Hiroshi Tanaka',
    title: 'Import Manager',
    company: 'Tokyo Coffee Trading',
    location: 'Tokyo, Japan',
    avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiNGRUY3RkYiLz4KPGNpcmNsZSBjeD0iNDAiIGN5PSIzMiIgcj0iMTIiIGZpbGw9IiNFRjQ0NDQiLz4KPHBhdGggZD0iTTIwIDY4QzIwIDU2IDI4IDQ4IDQwIDQ4UzYwIDU2IDYwIDY4IiBmaWxsPSIjRUY0NDQ0Ii8+Cjwvc3ZnPgo=',
    rating: 5,
    quote: 'Working with The Great Beans has transformed our business. Their sustainable sourcing practices align perfectly with our values, and the quality is consistently outstanding.',
    highlight: 'Sustainable and outstanding quality',
    orderVolume: '1000kg/month',
    partnership: '4+ years',
  },
  {
    id: 4,
    name: 'Emma Thompson',
    title: 'Café Owner',
    company: 'The Daily Grind',
    location: 'London, UK',
    avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiNGRUY3RkYiLz4KPGNpcmNsZSBjeD0iNDAiIGN5PSIzMiIgcj0iMTIiIGZpbGw9IiMxMEI5ODEiLz4KPHBhdGggZD0iTTIwIDY4QzIwIDU2IDI4IDQ4IDQwIDQ4UzYwIDU2IDYwIDY4IiBmaWxsPSIjMTBCOTgxIi8+Cjwvc3ZnPgo=',
    rating: 5,
    quote: 'Our customers notice the difference immediately. The rich, complex flavors of Vietnamese coffee from The Great Beans have become our signature offering.',
    highlight: 'Customers love the rich flavors',
    orderVolume: '150kg/month',
    partnership: '1+ year',
  },
  {
    id: 5,
    name: 'Carlos Rodriguez',
    title: 'Supply Chain Director',
    company: 'Global Coffee Solutions',
    location: 'São Paulo, Brazil',
    avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiNGRUY3RkYiLz4KPGNpcmNsZSBjeD0iNDAiIGN5PSIzMiIgcj0iMTIiIGZpbGw9IiNGNTlFMEIiLz4KPHBhdGggZD0iTTIwIDY4QzIwIDU2IDI4IDQ4IDQwIDQ4UzYwIDU2IDYwIDY4IiBmaWxsPSIjRjU5RTBCIi8+Cjwvc3ZnPgo=',
    rating: 5,
    quote: 'The Great Beans understands the global coffee market like no other. Their expertise in Vietnamese coffee varieties has opened new opportunities for our business.',
    highlight: 'Expert knowledge and market insight',
    orderVolume: '2000kg/month',
    partnership: '5+ years',
  },
  {
    id: 6,
    name: 'Sophie Martin',
    title: 'Quality Manager',
    company: 'European Coffee Imports',
    location: 'Paris, France',
    avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiNGRUY3RkYiLz4KPGNpcmNsZSBjeD0iNDAiIGN5PSIzMiIgcj0iMTIiIGZpbGw9IiM4QjVDRjYiLz4KPHBhdGggZD0iTTIwIDY4QzIwIDU2IDI4IDQ4IDQwIDQ4UzYwIDU2IDYwIDY4IiBmaWxsPSIjOEI1Q0Y2Ii8+Cjwvc3ZnPgo=',
    rating: 5,
    quote: 'Every shipment meets our strict quality standards. The Great Beans has never disappointed us, and their customer service is exceptional.',
    highlight: 'Strict quality standards always met',
    orderVolume: '800kg/month',
    partnership: '3+ years',
  },
];

export default function TestimonialsSection({ locale }: TestimonialsSectionProps) {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [translations, setTranslations] = useState<TranslationSection>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const locales = {
      en: enLocale,
      vi: viLocale,
    };
    const currentLocale = locales[locale as keyof typeof locales] || locales.en;
    setTranslations(currentLocale.testimonials || {});
  }, [locale]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const visibleTestimonials = [
    testimonials[currentIndex],
    testimonials[(currentIndex + 1) % testimonials.length],
    testimonials[(currentIndex + 2) % testimonials.length],
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white via-amber-50/30 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className={cn(
            "mb-4 opacity-0 translate-y-4",
            mounted && "animate-in fade-in slide-in-from-bottom-4 duration-1000"
          )}>
            <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-200 px-4 py-2">
              <Users className="w-4 h-4 mr-2" />
              {translations.badge || 'Customer Stories'}
            </Badge>
          </div>
          
          <h2 className={cn(
            "text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 transition-all duration-1000 opacity-0 translate-y-4",
            mounted && "opacity-100 translate-y-0 delay-200"
          )}>
            {translations.title || 'Trusted by Coffee'}
            <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent"> {translations.titleHighlight || 'Professionals'}</span>
          </h2>
          
          <p className={cn(
            "text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 opacity-0 translate-y-4",
            mounted && "opacity-100 translate-y-0 delay-500"
          )}>
            {translations.subtitle || 'Hear from our valued partners around the world who have experienced the exceptional quality and service that defines The Great Beans.'}
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Buttons */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 -ml-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="bg-white/90 hover:bg-white border-amber-200 hover:border-amber-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <ChevronLeft className="w-5 h-5 text-amber-600" />
            </Button>
          </div>
          
          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 -mr-4">
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="bg-white/90 hover:bg-white border-amber-200 hover:border-amber-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <ChevronRight className="w-5 h-5 text-amber-600" />
            </Button>
          </div>

          {/* Testimonials Grid */}
          <div className={cn(
            "grid md:grid-cols-3 gap-8 transition-all duration-1000 opacity-0 translate-y-4",
            mounted && "opacity-100 translate-y-0 delay-700"
          )}>
            {visibleTestimonials.map((testimonial, index) => (
              <Card
                key={`${testimonial.id}-${currentIndex}`}
                className={cn(
                  "group cursor-pointer border-0 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden",
                  "hover:-translate-y-2",
                  index === 0 && "md:scale-105 ring-2 ring-amber-200"
                )}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 opacity-10">
                  <Quote className="w-12 h-12 text-amber-500" />
                </div>

                <CardContent className="p-6">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="ml-2 text-sm font-medium text-slate-700">
                      {testimonial.rating}.0
                    </span>
                  </div>

                  {/* Quote */}
                  <blockquote className="text-slate-700 leading-relaxed mb-6 italic">
                    &quot;{testimonial.quote}&quot;
                  </blockquote>

                  {/* Highlight */}
                  <div className="mb-6">
                    <Badge 
                      variant="secondary" 
                      className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border-amber-200"
                    >
                      {testimonial.highlight}
                    </Badge>
                  </div>

                  {/* Customer Info */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="rounded-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="font-semibold text-slate-900">{testimonial.name}</div>
                      <div className="text-sm text-slate-600">{testimonial.title}</div>
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Building className="w-3 h-3" />
                        <span>{testimonial.company}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <MapPin className="w-3 h-3" />
                        <span>{testimonial.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-lg font-bold text-amber-600">{testimonial.orderVolume}</div>
                        <div className="text-xs text-slate-500">Monthly Volume</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-amber-600">{testimonial.partnership}</div>
                        <div className="text-xs text-slate-500">Partnership</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  index === currentIndex
                    ? "bg-amber-500 scale-125"
                    : "bg-slate-300 hover:bg-amber-300"
                )}
              />
            ))}
          </div>
        </div>

        {/* Bottom Stats */}
        <div className={cn(
          "grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 transition-all duration-1000 opacity-0 translate-y-4",
          mounted && "opacity-100 translate-y-0 delay-1000"
        )}>
          {[
            { number: '500+', label: 'Happy Customers', icon: Users },
            { number: '50+', label: 'Countries Served', icon: MapPin },
            { number: '4.9/5', label: 'Average Rating', icon: Star },
            { number: '99%', label: 'Satisfaction Rate', icon: Quote },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center group">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <Icon className="w-8 h-8 mx-auto mb-3 text-amber-600" />
                  <div className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
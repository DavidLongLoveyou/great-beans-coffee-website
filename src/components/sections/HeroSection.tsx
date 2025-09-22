'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Coffee, Leaf, Globe, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Locale } from '@/types';
import enLocale from '@/locales/en.json';
import viLocale from '@/locales/vi.json';

interface HeroSectionProps {
  locale: Locale;
}

interface HeroTranslations {
  title?: string;
  subtitle?: string;
  cta?: string;
  learnMore?: string;
}

const floatingElements = [
  { icon: Coffee, delay: 0, x: '10%', y: '20%' },
  { icon: Leaf, delay: 1, x: '80%', y: '30%' },
  { icon: Globe, delay: 2, x: '15%', y: '70%' },
  { icon: Award, delay: 3, x: '85%', y: '80%' },
];

// Deterministic particle positions to avoid hydration mismatch
const particlePositions = Array.from({ length: 50 }, (_, i) => ({
  left: ((i * 17 + 23) % 100),
  top: ((i * 13 + 37) % 100),
  delay: (i * 0.1) % 3,
  duration: 2 + ((i * 0.05) % 3),
}));

export default function HeroSection({ locale }: HeroSectionProps) {
  const [mounted, setMounted] = useState(false);
  const [translations, setTranslations] = useState<HeroTranslations>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const locales = {
      en: enLocale,
      vi: viLocale
    };
    
    const currentLocale = locales[locale as keyof typeof locales];
    if (currentLocale?.hero) {
      setTranslations(currentLocale.hero);
    }
  }, [locale]);

  const getLocalizedHref = (path: string) => {
    return `/${locale}${path}`;
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30" />
        
        {/* Animated Particles */}
        <div className="absolute inset-0">
          {particlePositions.map((particle, i) => (
            <div
              key={i}
              className={cn(
                "absolute w-1 h-1 bg-amber-400/30 rounded-full animate-pulse",
                mounted && "animate-bounce"
              )}
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
              }}
            />
          ))}
        </div>

        {/* Floating Icons */}
        {floatingElements.map((element, index) => {
          const Icon = element.icon;
          return (
            <div
              key={index}
              className={cn(
                "absolute opacity-10 text-amber-400",
                mounted && "animate-bounce"
              )}
              style={{
                left: element.x,
                top: element.y,
                animationDelay: `${element.delay}s`,
                animationDuration: '3s',
              }}
            >
              <Icon className="w-8 h-8" />
            </div>
          );
        })}

        {/* Coffee Bean Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-amber-400 blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-amber-600 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-24 h-24 rounded-full bg-amber-500 blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
      </div>
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className={cn(
            "mb-6 transition-all duration-1000 ease-out",
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}>
            <Badge variant="secondary" className="bg-amber-500/20 text-amber-300 border-amber-500/30 px-4 py-2">
              <Coffee className="w-4 h-4 mr-2" />
              Premium Vietnamese Coffee Trading
            </Badge>
          </div>

          {/* Main Heading */}
          <h1 className={cn(
            "text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 transition-all duration-1000 ease-out",
            mounted ? "opacity-100 translate-y-0 delay-200" : "opacity-0 translate-y-4"
          )}>
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
              The Great Beans
            </span>
            <br />
            <span className="text-slate-200 text-3xl md:text-4xl lg:text-5xl">
              {translations.title || 'Premium Vietnamese Coffee for Global Markets'}
            </span>
          </h1>

          {/* Subtitle */}
          <p className={cn(
            "text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 ease-out",
            mounted ? "opacity-100 translate-y-0 delay-500" : "opacity-0 translate-y-4"
          )}>
            {translations.subtitle || 'Connecting roasters and importers worldwide with the finest Vietnamese Arabica and Robusta coffee beans'}
          </p>

          {/* Stats */}
          <div className={cn(
            "grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 transition-all duration-1000 ease-out",
            mounted ? "opacity-100 translate-y-0 delay-700" : "opacity-0 translate-y-4"
          )}>
            {[
              { number: '500+', label: 'Partner Farms' },
              { number: '50+', label: 'Countries Served' },
              { number: '10M+', label: 'Kg Exported' },
              { number: '15+', label: 'Years Experience' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-amber-400 mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className={cn(
            "flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-1000 ease-out",
            mounted ? "opacity-100 translate-y-0 delay-1000" : "opacity-0 translate-y-4"
          )}>
            <Link href={getLocalizedHref('/products')}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white border-0 px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                {translations.learnMore || 'Explore Our Coffee'}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <Link href={getLocalizedHref('/contact')}>
              <Button
                size="lg"
                variant="outline"
                className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-slate-900 px-8 py-3 text-lg font-semibold transition-all duration-300"
              >
                {translations.cta || 'Get Quote'}
              </Button>
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div className={cn(
            "absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-1000 ease-out",
            mounted ? "opacity-100 delay-1000" : "opacity-0"
          )}>
            <div className="flex flex-col items-center text-slate-400">
              <span className="text-sm mb-2">Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-slate-400 rounded-full mt-2 animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Coffee, 
  Phone, 
  Mail, 
  MessageCircle,
  Star,
  Globe,
  Award
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { TranslationSection } from '@/types';
import enLocale from '@/locales/en.json';
import viLocale from '@/locales/vi.json';

interface CTASectionProps {
  locale?: string;
}

const floatingElements = [
  { icon: Coffee, delay: 0, x: '5%', y: '20%', size: 'w-6 h-6' },
  { icon: Star, delay: 1, x: '90%', y: '15%', size: 'w-4 h-4' },
  { icon: Globe, delay: 2, x: '10%', y: '80%', size: 'w-5 h-5' },
  { icon: Award, delay: 3, x: '85%', y: '75%', size: 'w-6 h-6' },
  { icon: Coffee, delay: 4, x: '15%', y: '40%', size: 'w-4 h-4' },
  { icon: Star, delay: 5, x: '80%', y: '50%', size: 'w-5 h-5' },
];

export default function CTASection({ locale }: CTASectionProps) {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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
    setTranslations(currentLocale.cta || {});
  }, [locale]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getLocalizedHref = (href: string) => {
    return `/${locale}${href}`;
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900" />
        
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 animate-pulse" />
        
        {/* Moving Gradient Orbs */}
        <div className="absolute inset-0">
          <div 
            className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-amber-400/30 to-orange-500/30 blur-3xl animate-pulse"
            style={{
              left: '25%',
              top: '35%',
            }}
          />
          <div 
            className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-orange-400/20 to-red-500/20 blur-3xl animate-pulse"
            style={{
              right: '20%',
              bottom: '30%',
              animationDelay: '1s',
            }}
          />
          <div 
            className="absolute w-64 h-64 rounded-full bg-gradient-to-r from-yellow-400/25 to-amber-500/25 blur-2xl animate-pulse"
            style={{
              left: '65%',
              top: '45%',
              animationDelay: '2s',
            }}
          />
        </div>

        {/* Floating Elements */}
        {mounted && floatingElements.map((element, index) => {
          const Icon = element.icon;
          const durations = [4.2, 3.8, 4.5, 3.3, 4.1, 3.9]; // Fixed durations
          return (
            <div
              key={index}
              className="absolute opacity-10 text-amber-300 animate-bounce"
              style={{
                left: element.x,
                top: element.y,
                animationDelay: `${element.delay}s`,
                animationDuration: `${durations[index]}s`,
              }}
            >
              <Icon className={element.size} />
            </div>
          );
        })}

        {/* Particle System */}
        {mounted && (
          <div className="absolute inset-0">
            {Array.from({ length: 30 }).map((_, i) => {
              // Fixed positions and durations for consistent rendering
              const positions = [
                { left: '7.5%', top: '28%', delay: '0.3s', duration: '3.7s' },
                { left: '17%', top: '25%', delay: '1.5s', duration: '2.2s' },
                { left: '54%', top: '79%', delay: '1.0s', duration: '2.1s' },
                { left: '2%', top: '79%', delay: '2.0s', duration: '3.0s' },
                { left: '55%', top: '30%', delay: '0.1s', duration: '3.6s' },
                { left: '91%', top: '70%', delay: '0.9s', duration: '3.9s' },
                { left: '96%', top: '39%', delay: '1.2s', duration: '4.2s' },
                { left: '73%', top: '85%', delay: '0.8s', duration: '2.9s' },
                { left: '93%', top: '10%', delay: '1.5s', duration: '2.1s' },
                { left: '87%', top: '72%', delay: '0.9s', duration: '3.8s' },
                { left: '21%', top: '95%', delay: '1.9s', duration: '3.1s' },
                { left: '65%', top: '9%', delay: '0.2s', duration: '4.4s' },
                { left: '32%', top: '16%', delay: '1.6s', duration: '3.3s' },
                { left: '45%', top: '24%', delay: '1.3s', duration: '4.5s' },
                { left: '47%', top: '60%', delay: '0.7s', duration: '2.5s' },
                { left: '18%', top: '35%', delay: '2.0s', duration: '4.0s' },
                { left: '12%', top: '23%', delay: '1.1s', duration: '3.9s' },
                { left: '75%', top: '45%', delay: '0.5s', duration: '3.2s' },
                { left: '88%', top: '20%', delay: '1.8s', duration: '2.8s' },
                { left: '35%', top: '67%', delay: '0.4s', duration: '3.5s' },
                { left: '62%', top: '82%', delay: '1.4s', duration: '2.7s' },
                { left: '8%', top: '55%', delay: '0.6s', duration: '4.1s' },
                { left: '78%', top: '33%', delay: '2.2s', duration: '3.4s' },
                { left: '25%', top: '88%', delay: '0.3s', duration: '2.6s' },
                { left: '58%', top: '12%', delay: '1.7s', duration: '3.7s' },
                { left: '42%', top: '76%', delay: '1.0s', duration: '2.9s' },
                { left: '83%', top: '58%', delay: '0.8s', duration: '4.3s' },
                { left: '15%', top: '92%', delay: '2.1s', duration: '3.0s' },
                { left: '68%', top: '41%', delay: '0.9s', duration: '3.8s' },
                { left: '29%', top: '18%', delay: '1.6s', duration: '2.4s' }
              ];
              const particle = positions[i] || positions[i % positions.length];
              return (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-amber-400/40 rounded-full animate-pulse"
                  style={{
                    left: particle.left,
                    top: particle.top,
                    animationDelay: particle.delay,
                    animationDuration: particle.duration,
                  }}
                />
              );
            })}
          </div>
        )}

        {/* Interactive Mouse Effect */}
        {mounted && (
          <div
            className="absolute w-32 h-32 rounded-full bg-gradient-to-r from-amber-400/10 to-orange-400/10 blur-xl pointer-events-none transition-all duration-300"
            style={{
              left: mousePosition.x - 64,
              top: mousePosition.y - 64,
            }}
          />
        )}

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }} />
        </div>
      </div>
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className={cn(
            "mb-6 opacity-0 translate-y-4",
            mounted && "animate-in fade-in slide-in-from-bottom-4 duration-1000"
          )}>
            <Badge variant="secondary" className="bg-amber-500/20 text-amber-300 border-amber-500/30 px-6 py-3 text-lg">
              <MessageCircle className="w-5 h-5 mr-2" />
              {translations.badge || 'Ready to Start Your Coffee Journey?'}
            </Badge>
          </div>

          {/* Main Heading */}
          <h2 className={cn(
            "text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 transition-all duration-1000 opacity-0 translate-y-4",
            mounted && "opacity-100 translate-y-0 delay-200"
          )}>
            {translations.title || "Let's Brew Something"}
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent block">
              {translations.titleHighlight || 'Amazing Together'}
            </span>
          </h2>

          {/* Subtitle */}
          <p className={cn(
            "text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 opacity-0 translate-y-4",
            mounted && "opacity-100 translate-y-0 delay-500"
          )}>
            {translations.subtitle || 'Join thousands of satisfied customers worldwide who trust The Great Beans for premium Vietnamese coffee. Get started with a personalized quote today.'}
          </p>

          {/* CTA Buttons */}
          <div className={cn(
            "flex flex-col sm:flex-row gap-6 justify-center items-center mb-12 transition-all duration-1000 opacity-0 translate-y-4",
            mounted && "opacity-100 translate-y-0 delay-700"
          )}>
            <Link href={getLocalizedHref('/contact')}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0 px-10 py-4 text-xl font-bold shadow-2xl hover:shadow-amber-500/25 transition-all duration-300 group hover:-translate-y-1 hover:scale-105"
              >
                Get Your Quote Now
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
            
            <Link href={getLocalizedHref('/products')}>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-slate-900 px-10 py-4 text-xl font-bold transition-all duration-300 hover:-translate-y-1 hover:scale-105 bg-white/5 backdrop-blur-sm"
              >
                Browse Products
              </Button>
            </Link>
          </div>

          {/* Contact Options */}
          <div className={cn(
            "grid md:grid-cols-3 gap-6 max-w-3xl mx-auto transition-all duration-1000 opacity-0 translate-y-4",
            mounted && "opacity-100 translate-y-0 delay-1000"
          )}>
            {[
              {
                icon: Phone,
                title: 'Call Us',
                description: '+84 123 456 789',
                action: 'tel:+84123456789',
                color: 'from-green-500 to-emerald-600',
              },
              {
                icon: Mail,
                title: 'Email Us',
                description: 'hello@thegreatbeans.com',
                action: 'mailto:hello@thegreatbeans.com',
                color: 'from-blue-500 to-cyan-600',
              },
              {
                icon: MessageCircle,
                title: 'Live Chat',
                description: 'Available 24/7',
                action: getLocalizedHref('/contact'),
                color: 'from-purple-500 to-violet-600',
              },
            ].map((contact, index) => {
              const Icon = contact.icon;
              return (
                <Link key={index} href={contact.action} className="group block">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2 hover:scale-105">
                    <div className={cn(
                      "w-12 h-12 rounded-xl bg-gradient-to-r flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform",
                      contact.color
                    )}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{contact.title}</h3>
                    <p className="text-slate-300 group-hover:text-white transition-colors">
                      {contact.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Trust Indicators */}
          <div className={cn(
            "flex flex-wrap justify-center items-center gap-8 mt-12 transition-all duration-1000 opacity-0 translate-y-4",
            mounted && "opacity-100 translate-y-0 delay-1000"
          )}>
            <div className="flex items-center gap-2 text-slate-300">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              <span className="font-semibold">4.9/5 Customer Rating</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Award className="w-5 h-5 text-amber-400" />
              <span className="font-semibold">ISO Certified Quality</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Globe className="w-5 h-5 text-amber-400" />
              <span className="font-semibold">50+ Countries Served</span>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
import Link from 'next/link';
import { Coffee, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface FooterProps {
  locale: string;
}

const footerLinks = {
  company: [
    { name: 'About Us', href: '/about-us' },
    { name: 'Our Process', href: '/our-process' },
    { name: 'Sustainability', href: '/sustainability' },
    { name: 'Careers', href: '/careers' },
  ],
  products: [
    { name: 'All Products', href: '/products' },
    { name: 'Arabica Coffee', href: '/products?category=arabica' },
    { name: 'Robusta Coffee', href: '/products?category=robusta' },
    { name: 'Specialty Blends', href: '/products?category=specialty' },
  ],
  support: [
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Shipping Info', href: '/shipping' },
    { name: 'Returns', href: '/returns' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms-of-service' },
    { name: 'Cookie Policy', href: '/cookie-policy' },
    { name: 'Trade Terms', href: '/trade-terms' },
  ],
};

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/thegreatbeans' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/thegreatbeans' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/thegreatbeans' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/thegreatbeans' },
];

export default function Footer({ locale }: FooterProps) {
  const getLocalizedHref = (href: string) => {
    return `/${locale}${href}`;
  };

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link
              href={getLocalizedHref('/')}
              className="flex items-center space-x-2 mb-4">
              <Coffee className="h-8 w-8 text-amber-500" />
              <span className="text-xl font-bold text-white">The Great Beans</span>
            </Link>
            <p className="text-sm mb-6 max-w-md">
              Premium Vietnamese coffee beans for global markets. We connect coffee farmers 
              with international buyers through sustainable sourcing and quality assurance.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-amber-500" />
                <span>info@thegreatbeans.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-amber-500" />
                <span>+84 123 456 789</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-amber-500" />
                <span>Ho Chi Minh City, Vietnam</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={getLocalizedHref(link.href)}
                    className="hover:text-amber-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Products</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    href={getLocalizedHref(link.href)}
                    className="hover:text-amber-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={getLocalizedHref(link.href)}
                    className="hover:text-amber-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-slate-700" />

        {/* Bottom Section */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          {/* Legal Links */}
          <div className="flex flex-wrap gap-4 text-sm">
            {footerLinks.legal.map((link, index) => (
              <span key={link.name} className="flex items-center">
                <Link
                  href={getLocalizedHref(link.href)}
                  className="hover:text-amber-400 transition-colors">
                  {link.name}
                </Link>
                {index < footerLinks.legal.length - 1 && (
                  <span className="ml-4 text-slate-600">|</span>
                )}
              </span>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <Button
                  key={social.name}
                  variant="ghost"
                  size="sm"
                  className="h-9 w-9 p-0 text-slate-400 hover:text-amber-400 hover:bg-slate-800"
                  asChild
                >
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-slate-700 text-center text-sm text-slate-400">
          <p>
            © {new Date().getFullYear()} The Great Beans. All rights reserved. |
            Connecting Vietnamese coffee with the world.
          </p>
        </div>
      </div>
    </footer>
  );
}
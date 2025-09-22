'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Globe, Coffee } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  locale: string;
}

const navigation = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'Products',
    href: '/products',
    children: [
      { name: 'Arabica Coffee', href: '/products?category=arabica' },
      { name: 'Robusta Coffee', href: '/products?category=robusta' },
      { name: 'Specialty Blends', href: '/products?category=specialty' },
    ],
  },
  {
    name: 'About',
    href: '/about-us',
    children: [
      { name: 'Our Story', href: '/about-us' },
      { name: 'Our Process', href: '/our-process' },
      { name: 'Sustainability', href: '/sustainability' },
    ],
  },
  {
    name: 'Insights',
    href: '/insights',
  },
  {
    name: 'Contact',
    href: '/contact',
  },
];

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
];

export default function Header({ locale }: HeaderProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const getLocalizedHref = (href: string) => {
    return `/${locale}${href}`;
  };

  const switchLanguage = (newLocale: string) => {
    const currentPath = pathname.replace(`/${locale}`, '') || '/';
    return `/${newLocale}${currentPath}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
          href={getLocalizedHref('/')}
          className="flex items-center space-x-2">
          <Coffee className="h-8 w-8 text-amber-600" />
          <span className="text-xl font-bold text-foreground">The Great Beans</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {navigation.map((item) => (
              <NavigationMenuItem key={item.name}>
                {item.children ? (
                  <>
                    <NavigationMenuTrigger className="text-sm font-medium">
                      {item.name}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {item.children.map((child) => (
                          <li key={child.name}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={getLocalizedHref(child.href)}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                <div className="text-sm font-medium leading-none">
                                  {child.name}
                                </div>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink asChild>
                    <Link 
                      href={getLocalizedHref(item.href)}
                      className={cn(
                        "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                        pathname === getLocalizedHref(item.href) && "bg-accent text-accent-foreground"
                      )}
                    >
                      {item.name}
                    </Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Language Switcher & Mobile Menu */}
        <div className="flex items-center space-x-2">
          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-9 w-9 px-0">
                <Globe className="h-4 w-4" />
                <span className="sr-only">Switch language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem key={lang.code} asChild>
                  <Link
                    href={switchLanguage(lang.code)}
                    className={cn(
                      "flex items-center space-x-2",
                      locale === lang.code && "bg-accent"
                    )}>
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="h-9 w-9 px-0 md:hidden">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Navigation Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={getLocalizedHref(item.href)}
                      className="block px-2 py-1 text-lg font-medium"
                      onClick={() => setIsOpen(false)}>
                      {item.name}
                    </Link>
                    {item.children && (
                      <div className="ml-4 mt-2 space-y-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={getLocalizedHref(child.href)}
                            className="block px-2 py-1 text-sm text-muted-foreground"
                            onClick={() => setIsOpen(false)}>
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Leaf, Award, Globe, Heart, Truck, Star } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Locale } from '@/types'
import enLocale from '@/locales/en.json'
import viLocale from '@/locales/vi.json'

interface FeatureItem {
  icon: React.ComponentType<{ className?: string }>
  key: string
  color: string
}

interface FeatureTranslation {
  title: string
  description: string
}

interface FeaturesTranslations {
  badge?: string
  title?: string
  description?: string
  certification?: string
  [key: string]: FeatureTranslation | string | undefined
}

const featureItems: FeatureItem[] = [
  {
    icon: Star,
    key: 'premium_quality',
    color: 'text-amber-600'
  },
  {
    icon: Leaf,
    key: 'sustainable',
    color: 'text-green-600'
  },
  {
    icon: Award,
    key: 'award_winning',
    color: 'text-blue-600'
  },
  {
    icon: Globe,
    key: 'global_sourcing',
    color: 'text-purple-600'
  },
  {
    icon: Heart,
    key: 'ethically_sourced',
    color: 'text-red-600'
  },
  {
    icon: Truck,
    key: 'fast_delivery',
    color: 'text-orange-600'
  }
]

export default function Features({ locale }: { locale: Locale }) {
  const [translations, setTranslations] = useState<FeaturesTranslations>({})

  useEffect(() => {
    const locales = {
      en: enLocale,
      vi: viLocale
    }
    
    const currentLocale = locales[locale as keyof typeof locales]
    if (currentLocale?.features) {
      setTranslations(currentLocale.features)
    }
  }, [locale])

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-sm font-medium">
            {translations.badge || 'Premium Coffee Features'}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {translations.title || 'Why Choose Our Coffee'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {translations.description || 'Discover what makes our coffee exceptional'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureItems.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.key}
                className="group"
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="text-center pb-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                      <Icon className={`w-8 h-8 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                      {(translations[feature.key] as FeatureTranslation)?.title || feature.key}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 leading-relaxed text-center">
                      {(translations[feature.key] as FeatureTranslation)?.description || 'Feature description'}
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-16">
          <Badge variant="secondary" className="text-sm font-medium px-4 py-2">
            {translations.certification || 'Certified Quality'}
          </Badge>
        </div>
      </div>
    </section>
  )
}
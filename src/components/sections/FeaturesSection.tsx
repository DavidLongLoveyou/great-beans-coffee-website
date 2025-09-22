'use client';

import Features from '@/components/Features';
import { Locale } from '@/types';

interface FeaturesSectionProps {
  locale: Locale;
}

export default function FeaturesSection({ locale }: FeaturesSectionProps) {
  return <Features locale={locale} />;
}
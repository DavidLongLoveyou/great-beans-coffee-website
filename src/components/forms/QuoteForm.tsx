'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getCurrentLocale } from '@/lib/i18n';
import { getAllProducts } from '@/lib/mock-data';

// Zod validation schema
const quoteFormSchema = z.object({
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  contactPerson: z.string().min(2, 'Contact person name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  country: z.string().min(2, 'Please select your country'),
  interestedProducts: z.array(z.string()).min(1, 'Please select at least one product'),
  quantityInTons: z.number().min(1, 'Quantity must be at least 1 ton').max(10000, 'Maximum quantity is 10,000 tons'),
  packagingRequirements: z.string().optional(),
  deliveryTimeline: z.string().optional(),
  message: z.string().optional(),
});

type QuoteFormData = z.infer<typeof quoteFormSchema>;

interface QuoteFormProps {
  className?: string;
  onSuccess?: () => void;
}

export default function QuoteForm({ className = '', onSuccess }: QuoteFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const locale = getCurrentLocale();
  const products = getAllProducts();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      interestedProducts: [],
      quantityInTons: 1,
    },
  });



  const countries = [
    'United States', 'Germany', 'Japan', 'South Korea', 'Italy', 'France',
    'United Kingdom', 'Netherlands', 'Belgium', 'Canada', 'Australia',
    'Singapore', 'Malaysia', 'Thailand', 'Philippines', 'Indonesia',
    'Other'
  ];

  const packagingOptions = [
    '60kg Jute Bags',
    '69kg Jute Bags', 
    '1000kg Big Bags (FIBC)',
    '500kg Big Bags (FIBC)',
    'Custom Packaging',
  ];

  const deliveryOptions = [
    'ASAP',
    'Within 30 days',
    'Within 60 days',
    'Within 90 days',
    'Flexible timing',
  ];

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          locale,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit quote request');
      }

      setSubmitStatus('success');
      reset();
      onSuccess?.();
    } catch (error) {
      console.error('Quote submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg p-8 ${className}`}>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Request a Quote
        </h2>
        <p className="text-gray-600">
          Fill out the form below and we&apos;ll get back to you with a personalized quote within 24 hours.
        </p>
      </div>

      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-green-800 font-medium">
              Thank you! Your quote request has been submitted successfully. We&apos;ll contact you within 24 hours.
            </p>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            <p className="text-red-800 font-medium">
              Sorry, there was an error submitting your request. Please try again or contact us directly.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Company Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
              Company Name *
            </label>
            <input
              type="text"
              id="companyName"
              {...register('companyName')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              placeholder="Your company name"
            />
            {errors.companyName && (
              <p className="mt-1 text-sm text-red-600">{errors.companyName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 mb-2">
              Contact Person *
            </label>
            <input
              type="text"
              id="contactPerson"
              {...register('contactPerson')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              placeholder="Your full name"
            />
            {errors.contactPerson && (
              <p className="mt-1 text-sm text-red-600">{errors.contactPerson.message}</p>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              placeholder="your.email@company.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              {...register('phone')}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        {/* Country */}
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
            Country *
          </label>
          <select
            id="country"
            {...register('country')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
          >
            <option value="">Select your country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.country && (
            <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
          )}
        </div>

        {/* Interested Products */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Interested Products *
          </label>
          <div className="grid md:grid-cols-2 gap-3">
            {products.map((product) => (
              <label key={product.slug} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  value={product.slug}
                  {...register('interestedProducts')}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-600">{product.origin}</p>
                </div>
              </label>
            ))}
          </div>
          {errors.interestedProducts && (
            <p className="mt-1 text-sm text-red-600">{errors.interestedProducts.message}</p>
          )}
        </div>

        {/* Quantity */}
        <div>
          <label htmlFor="quantityInTons" className="block text-sm font-medium text-gray-700 mb-2">
            Quantity (in tons) *
          </label>
          <input
            type="number"
            id="quantityInTons"
            min="1"
            max="10000"
            {...register('quantityInTons', { valueAsNumber: true })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
            placeholder="Enter quantity in tons"
          />
          {errors.quantityInTons && (
            <p className="mt-1 text-sm text-red-600">{errors.quantityInTons.message}</p>
          )}
        </div>

        {/* Packaging Requirements */}
        <div>
          <label htmlFor="packagingRequirements" className="block text-sm font-medium text-gray-700 mb-2">
            Packaging Requirements
          </label>
          <select
            id="packagingRequirements"
            {...register('packagingRequirements')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
          >
            <option value="">Select packaging option</option>
            {packagingOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Delivery Timeline */}
        <div>
          <label htmlFor="deliveryTimeline" className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Delivery Timeline
          </label>
          <select
            id="deliveryTimeline"
            {...register('deliveryTimeline')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
          >
            <option value="">Select delivery timeline</option>
            {deliveryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Additional Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Additional Requirements or Message
          </label>
          <textarea
            id="message"
            rows={4}
            {...register('message')}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-vertical"
            placeholder="Please share any specific requirements, quality standards, or questions you have..."
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting Request...
              </div>
            ) : (
              'Submit Quote Request'
            )}
          </button>
        </div>

        {/* Privacy Notice */}
        <div className="text-sm text-gray-600 text-center">
          <p>
            By submitting this form, you agree to our{' '}
            <a href={`/${locale}/privacy-policy`} className="text-green-600 hover:text-green-700 underline">
              Privacy Policy
            </a>
            {' '}and{' '}
            <a href={`/${locale}/terms-of-service`} className="text-green-600 hover:text-green-700 underline">
              Terms of Service
            </a>
            .
          </p>
        </div>
      </form>
    </div>
  );
}
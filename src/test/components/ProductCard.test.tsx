import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProductCard } from '@/components/ProductCard';
import type { CoffeeProduct } from '@/types';

const mockProduct: CoffeeProduct = {
  id: '1',
  name: 'Test Coffee',
  slug: 'test-coffee',
  description: 'A delicious test coffee',
  origin: 'Test Origin',
  processing: 'Washed',
  variety: 'Typica',
  grade: 'AA',
  cupping_score: 85,
  aroma: 'Floral',
  flavor: 'Chocolate, Nutty',
  acidity: 'Bright',
  body: 'Medium',
  certifications: ['Organic'],
  harvest_season: 'October-December',
  moisture_content: '12%',
  defect_rate: '0.5%',
  minimum_order: '60kg',
  price_per_kg: 25.99,
  specifications: {},
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
  images: ['/test-image.jpg'],
  available: true,
  featured: false,
};

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} locale="en" />);
    
    expect(screen.getByText('Test Coffee')).toBeInTheDocument();
    expect(screen.getByText('A delicious test coffee')).toBeInTheDocument();
    expect(screen.getByText('$25.99')).toBeInTheDocument();
    expect(screen.getByText('Test Origin')).toBeInTheDocument();
  });

  it('renders product image with correct alt text', () => {
    render(<ProductCard product={mockProduct} locale="en" />);
    
    const image = screen.getByAltText('Test Coffee');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', expect.stringContaining('test-image.jpg'));
  });

  it('displays product variety and certifications', () => {
    render(<ProductCard product={mockProduct} locale="en" />);
    
    expect(screen.getByText('Typica')).toBeInTheDocument();
    expect(screen.getByText('Organic')).toBeInTheDocument();
  });

  it('displays view details button with correct link', () => {
    render(<ProductCard product={mockProduct} locale="en" />);
    
    const viewDetailsButton = screen.getByText('View Details');
    expect(viewDetailsButton).toBeInTheDocument();
    expect(viewDetailsButton.closest('a')).toHaveAttribute('href', '/en/products/test-coffee');
  });
});
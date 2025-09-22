import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Great Beans - Premium Coffee Trading',
  description: 'Premium Vietnamese coffee beans for global markets. Sustainable sourcing, quality assurance, and direct trade partnerships.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

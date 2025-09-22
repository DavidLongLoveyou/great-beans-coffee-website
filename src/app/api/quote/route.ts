import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Validation schema for the quote request
const quoteRequestSchema = z.object({
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
  locale: z.string().optional(),
  submittedAt: z.string().optional(),
});

type QuoteRequest = z.infer<typeof quoteRequestSchema>;

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Validate the request data
    const validationResult = quoteRequestSchema.safeParse(body);
    
    if (!validationResult.success) {
      console.error('Validation errors:', validationResult.error.issues);
      return NextResponse.json(
        { 
          error: 'Invalid request data', 
          details: validationResult.error.issues 
        },
        { status: 400 }
      );
    }

    const quoteData: QuoteRequest = validationResult.data;

    // Log the quote request for debugging (in production, you'd save to database)
    console.log('=== NEW QUOTE REQUEST ===');
    console.log('Timestamp:', new Date().toISOString());
    console.log('Company:', quoteData.companyName);
    console.log('Contact Person:', quoteData.contactPerson);
    console.log('Email:', quoteData.email);
    console.log('Phone:', quoteData.phone || 'Not provided');
    console.log('Country:', quoteData.country);
    console.log('Interested Products:', quoteData.interestedProducts.join(', '));
    console.log('Quantity (tons):', quoteData.quantityInTons);
    console.log('Packaging:', quoteData.packagingRequirements || 'Not specified');
    console.log('Delivery Timeline:', quoteData.deliveryTimeline || 'Not specified');
    console.log('Message:', quoteData.message || 'No additional message');
    console.log('Locale:', quoteData.locale || 'Not specified');
    console.log('========================');

    // In a real application, you would:
    // 1. Save the quote request to a database
    // 2. Send notification emails to the sales team
    // 3. Send confirmation email to the customer
    // 4. Integrate with CRM system
    // 5. Generate a quote ID for tracking

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500));

    // Generate a mock quote ID
    const quoteId = `QT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Quote request submitted successfully',
        quoteId,
        data: {
          companyName: quoteData.companyName,
          contactPerson: quoteData.contactPerson,
          email: quoteData.email,
          submittedAt: quoteData.submittedAt || new Date().toISOString(),
        },
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Quote API Error:', error);
    
    // Handle different types of errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON format' },
        { status: 400 }
      );
    }

    // Generic server error
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'An unexpected error occurred while processing your request. Please try again later.' 
      },
      { status: 500 }
    );
  }
}

// Handle unsupported HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to submit quote requests.' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to submit quote requests.' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to submit quote requests.' },
    { status: 405 }
  );
}

export async function PATCH() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to submit quote requests.' },
    { status: 405 }
  );
}
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Get the order ID from the URL if available
    const url = new URL(request.url);
    const orderId = url.searchParams.get('token');
    
    console.log(`Payment cancelled for order: ${orderId || 'Unknown'}`);
    
    // Redirect to the payment page with a cancelled status
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/payment?status=cancelled${orderId ? `&orderId=${orderId}` : ''}`);
  } catch (error) {
    console.error('Error in cancel route:', error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/payment?status=cancelled`);
  }
}
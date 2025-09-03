import { capturePayment } from '@/lib/paypal';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Get the order ID from the URL
    const url = new URL(request.url);
    const orderId = url.searchParams.get('token');

    if (!orderId) {
      console.error('Missing order ID in capture request');
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/payment?status=error&message=Missing order ID`);
    }

    console.log(`Attempting to capture payment for order: ${orderId}`);
    
    // Capture the payment
    const captureData = await capturePayment(orderId);
    
    console.log('PayPal capture response:', JSON.stringify(captureData, null, 2));

    // Check if the capture was successful
    if (captureData.status === 'COMPLETED' || captureData.status === 'APPROVED' || 
        (captureData.purchase_units && captureData.purchase_units[0]?.payments?.captures?.[0]?.status === 'COMPLETED')) {
      // In a real application, you would update your database here
      // For example, update the order status, create an invoice, etc.
      
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/payment?status=success&orderId=${orderId}`);
    } else {
      const errorMessage = captureData.message || 'Payment capture failed';
      console.error('Payment capture failed:', errorMessage);
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/payment?status=error&message=${encodeURIComponent(errorMessage)}`);
    }
  } catch (error) {
    console.error('Failed to capture PayPal payment:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/payment?status=error&message=${encodeURIComponent(errorMessage)}`);
  }
}
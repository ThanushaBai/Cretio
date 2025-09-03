import { createOrder } from '@/lib/paypal';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Get items from request body
    const { items } = await request.json();

    // Validate items
    if (!items || !Array.isArray(items) || items.length === 0) {
      console.error('Invalid items provided:', items);
      return NextResponse.json(
        { error: 'Invalid items provided' },
        { status: 400 }
      );
    }

    // Validate each item has required properties
    const validItems = items.map(item => ({
      name: item.name || 'Product',
      price: typeof item.price === 'number' ? item.price : 0,
      quantity: typeof item.quantity === 'number' ? item.quantity : 1
    }));

    // Check if any item has a price of 0 (which might indicate an error)
    const hasZeroPriceItems = validItems.some(item => item.price === 0);
    if (hasZeroPriceItems) {
      console.warn('Warning: Some items have a price of 0', validItems);
    }

    console.log('Creating PayPal order with items:', JSON.stringify(validItems, null, 2));

    // Create PayPal order
    const order = await createOrder(validItems);
    
    console.log('PayPal order created:', JSON.stringify(order, null, 2));
    
    if (!order.id) {
      console.error('PayPal order creation failed:', order);
      return NextResponse.json(
        { error: 'Failed to create PayPal order', details: order },
        { status: 500 }
      );
    }
    
    return NextResponse.json(order);
  } catch (error) {
    console.error('Failed to create PayPal order:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Internal server error', message: errorMessage },
      { status: 500 }
    );
  }
}
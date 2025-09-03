import { Invoice, User } from '@/models';
import type { IInvoice } from '@/models';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { userId, ...invoiceData } = await request.json();
    
    // Generate unique invoice number
    const invoiceNumber = `INV-${Date.now()}`;

    const invoice = await Invoice.create({
      ...invoiceData,
      user: userId,
      invoiceNumber,
    });

    const populatedInvoice = await invoice.populate('user');
    return NextResponse.json(populatedInvoice);
  } catch (error) {
    console.error('Error creating invoice:', error);
    return NextResponse.json(
      { error: 'Failed to create invoice' },
      { status: 500 }
    );
  }
}
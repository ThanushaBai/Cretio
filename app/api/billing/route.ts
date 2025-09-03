import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import mongoose from 'mongoose';

// Define a simple invoice schema if it doesn't exist
let Invoice;
try {
  Invoice = mongoose.model('Invoice');
} catch {
  const invoiceSchema = new mongoose.Schema(
    {
      invoiceNumber: {
        type: String,
        required: [true, 'Please provide an invoice number'],
        unique: true,
      },
      customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      items: [{
        description: String,
        quantity: Number,
        price: Number,
        total: Number,
      }],
      subtotal: {
        type: Number,
        required: true,
      },
      tax: {
        type: Number,
        default: 0,
      },
      total: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        enum: ['Draft', 'Sent', 'Paid', 'Overdue', 'Cancelled'],
        default: 'Draft',
      },
      dueDate: {
        type: Date,
        required: true,
      },
      notes: String,
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    },
    { timestamps: true }
  );
  
  Invoice = mongoose.model('Invoice', invoiceSchema);
}

// GET /api/billing - Get all invoices
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');
    
    // Build query
    const query: any = {};
    if (userId) {
      query.userId = userId;
    }
    if (status) {
      query.status = status;
    }
    
    // Get invoices
    const invoices = await Invoice.find(query)
      .populate('customer', 'name email')
      .sort({ createdAt: -1 });
    
    return NextResponse.json({ invoices });
  } catch (error: any) {
    console.error('Error fetching invoices:', error);
    return NextResponse.json(
      { error: 'Failed to fetch invoices', message: error.message },
      { status: 500 }
    );
  }
}

// POST /api/billing - Create a new invoice
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    // Parse request body
    const body = await request.json();
    
    // Generate invoice number if not provided
    if (!body.invoiceNumber) {
      const count = await Invoice.countDocuments();
      body.invoiceNumber = `INV-${Date.now()}-${count + 1}`;
    }
    
    // Create new invoice
    const newInvoice = new Invoice(body);
    await newInvoice.save();
    
    return NextResponse.json({ invoice: newInvoice }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating invoice:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { error: 'Validation error', messages: validationErrors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create invoice', message: error.message },
      { status: 500 }
    );
  }
}import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import mongoose from 'mongoose';

// Define a simple invoice schema if it doesn't exist
let Invoice;
try {
  Invoice = mongoose.model('Invoice');
} catch {
  const invoiceSchema = new mongoose.Schema(
    {
      invoiceNumber: {
        type: String,
        required: [true, 'Please provide an invoice number'],
        unique: true,
      },
      customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      items: [{
        description: String,
        quantity: Number,
        price: Number,
        total: Number,
      }],
      subtotal: {
        type: Number,
        required: true,
      },
      tax: {
        type: Number,
        default: 0,
      },
      total: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        enum: ['Draft', 'Sent', 'Paid', 'Overdue', 'Cancelled'],
        default: 'Draft',
      },
      dueDate: {
        type: Date,
        required: true,
      },
      notes: String,
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    },
    { timestamps: true }
  );
  
  Invoice = mongoose.model('Invoice', invoiceSchema);
}

// GET /api/billing - Get all invoices
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');
    
    // Build query
    const query: any = {};
    if (userId) {
      query.userId = userId;
    }
    if (status) {
      query.status = status;
    }
    
    // Get invoices
    const invoices = await Invoice.find(query)
      .populate('customer', 'name email')
      .sort({ createdAt: -1 });
    
    return NextResponse.json({ invoices });
  } catch (error: any) {
    console.error('Error fetching invoices:', error);
    return NextResponse.json(
      { error: 'Failed to fetch invoices', message: error.message },
      { status: 500 }
    );
  }
}

// POST /api/billing - Create a new invoice
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    // Parse request body
    const body = await request.json();
    
    // Generate invoice number if not provided
    if (!body.invoiceNumber) {
      const count = await Invoice.countDocuments();
      body.invoiceNumber = `INV-${Date.now()}-${count + 1}`;
    }
    
    // Create new invoice
    const newInvoice = new Invoice(body);
    await newInvoice.save();
    
    return NextResponse.json({ invoice: newInvoice }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating invoice:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { error: 'Validation error', messages: validationErrors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create invoice', message: error.message },
      { status: 500 }
    );
  }
}
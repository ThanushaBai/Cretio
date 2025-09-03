import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import mongoose from 'mongoose';

// Define a simple contact schema if it doesn't exist
let Contact;
try {
  Contact = mongoose.model('Contact');
} catch {
  const contactSchema = new mongoose.Schema(
    {
      firstName: {
        type: String,
        required: [true, 'Please provide a first name'],
        trim: true,
      },
      lastName: {
        type: String,
        required: [true, 'Please provide a last name'],
        trim: true,
      },
      email: {
        type: String,
        required: [true, 'Please provide an email'],
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
      },
      phone: {
        type: String,
        trim: true,
      },
      company: {
        type: String,
        trim: true,
      },
      status: {
        type: String,
        enum: ['Lead', 'Customer', 'Opportunity', 'Lost'],
        default: 'Lead',
      },
      source: {
        type: String,
        trim: true,
      },
      notes: {
        type: String,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    },
    { timestamps: true }
  );
  
  Contact = mongoose.model('Contact', contactSchema);
}

// GET /api/crm - Get all contacts
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
    
    // Get contacts
    const contacts = await Contact.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json({ contacts });
  } catch (error: any) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contacts', message: error.message },
      { status: 500 }
    );
  }
}

// POST /api/crm - Create a new contact
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    // Parse request body
    const body = await request.json();
    
    // Create new contact
    const newContact = new Contact(body);
    await newContact.save();
    
    return NextResponse.json({ contact: newContact }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating contact:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { error: 'Validation error', messages: validationErrors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create contact', message: error.message },
      { status: 500 }
    );
  }
}import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import mongoose from 'mongoose';

// Define a simple contact schema if it doesn't exist
let Contact;
try {
  Contact = mongoose.model('Contact');
} catch {
  const contactSchema = new mongoose.Schema(
    {
      firstName: {
        type: String,
        required: [true, 'Please provide a first name'],
        trim: true,
      },
      lastName: {
        type: String,
        required: [true, 'Please provide a last name'],
        trim: true,
      },
      email: {
        type: String,
        required: [true, 'Please provide an email'],
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
      },
      phone: {
        type: String,
        trim: true,
      },
      company: {
        type: String,
        trim: true,
      },
      status: {
        type: String,
        enum: ['Lead', 'Customer', 'Opportunity', 'Lost'],
        default: 'Lead',
      },
      source: {
        type: String,
        trim: true,
      },
      notes: {
        type: String,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    },
    { timestamps: true }
  );
  
  Contact = mongoose.model('Contact', contactSchema);
}

// GET /api/crm - Get all contacts
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
    
    // Get contacts
    const contacts = await Contact.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json({ contacts });
  } catch (error: any) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contacts', message: error.message },
      { status: 500 }
    );
  }
}

// POST /api/crm - Create a new contact
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    // Parse request body
    const body = await request.json();
    
    // Create new contact
    const newContact = new Contact(body);
    await newContact.save();
    
    return NextResponse.json({ contact: newContact }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating contact:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { error: 'Validation error', messages: validationErrors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create contact', message: error.message },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import mongoose from 'mongoose';

// Define a simple funnel schema if it doesn't exist
let Funnel;
try {
  Funnel = mongoose.model('Funnel');
} catch {
  const funnelSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, 'Please provide a funnel name'],
        trim: true,
      },
      type: {
        type: String,
        required: [true, 'Please provide a funnel type'],
        trim: true,
      },
      pages: {
        type: Number,
        default: 1,
      },
      status: {
        type: String,
        enum: ['Draft', 'Published', 'Archived'],
        default: 'Draft',
      },
      visitors: {
        type: Number,
        default: 0,
      },
      conversions: {
        type: Number,
        default: 0,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    },
    { timestamps: true }
  );
  
  Funnel = mongoose.model('Funnel', funnelSchema);
}

// GET /api/funnels - Get all funnels
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    // Build query
    const query: any = {};
    if (userId) {
      query.userId = userId;
    }
    
    // Get funnels
    const funnels = await Funnel.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json({ funnels });
  } catch (error: any) {
    console.error('Error fetching funnels:', error);
    return NextResponse.json(
      { error: 'Failed to fetch funnels', message: error.message },
      { status: 500 }
    );
  }
}

// POST /api/funnels - Create a new funnel
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    // Parse request body
    const body = await request.json();
    
    // Create new funnel
    const newFunnel = new Funnel(body);
    await newFunnel.save();
    
    return NextResponse.json({ funnel: newFunnel }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating funnel:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { error: 'Validation error', messages: validationErrors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create funnel', message: error.message },
      { status: 500 }
    );
  }
}import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import mongoose from 'mongoose';

// Define a simple funnel schema if it doesn't exist
let Funnel;
try {
  Funnel = mongoose.model('Funnel');
} catch {
  const funnelSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: [true, 'Please provide a funnel name'],
        trim: true,
      },
      type: {
        type: String,
        required: [true, 'Please provide a funnel type'],
        trim: true,
      },
      pages: {
        type: Number,
        default: 1,
      },
      status: {
        type: String,
        enum: ['Draft', 'Published', 'Archived'],
        default: 'Draft',
      },
      visitors: {
        type: Number,
        default: 0,
      },
      conversions: {
        type: Number,
        default: 0,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    },
    { timestamps: true }
  );
  
  Funnel = mongoose.model('Funnel', funnelSchema);
}

// GET /api/funnels - Get all funnels
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    // Build query
    const query: any = {};
    if (userId) {
      query.userId = userId;
    }
    
    // Get funnels
    const funnels = await Funnel.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json({ funnels });
  } catch (error: any) {
    console.error('Error fetching funnels:', error);
    return NextResponse.json(
      { error: 'Failed to fetch funnels', message: error.message },
      { status: 500 }
    );
  }
}

// POST /api/funnels - Create a new funnel
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    // Parse request body
    const body = await request.json();
    
    // Create new funnel
    const newFunnel = new Funnel(body);
    await newFunnel.save();
    
    return NextResponse.json({ funnel: newFunnel }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating funnel:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { error: 'Validation error', messages: validationErrors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create funnel', message: error.message },
      { status: 500 }
    );
  }
}
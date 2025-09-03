import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import mongoose from 'mongoose';

// Define a simple task schema if it doesn't exist
let Task;
try {
  Task = mongoose.model('Task');
} catch {
  const taskSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: [true, 'Please provide a task title'],
        trim: true,
      },
      description: {
        type: String,
        trim: true,
      },
      status: {
        type: String,
        enum: ['To Do', 'In Progress', 'Done', 'Blocked'],
        default: 'To Do',
      },
      priority: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Urgent'],
        default: 'Medium',
      },
      dueDate: {
        type: Date,
      },
      assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      tags: [{
        type: String,
        trim: true,
      }],
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    },
    { timestamps: true }
  );
  
  Task = mongoose.model('Task', taskSchema);
}

// GET /api/productivity - Get all tasks
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    
    // Build query
    const query: any = {};
    if (userId) {
      query.userId = userId;
    }
    if (status) {
      query.status = status;
    }
    if (priority) {
      query.priority = priority;
    }
    
    // Get tasks
    const tasks = await Task.find(query)
      .populate('assignedTo', 'name email')
      .sort({ dueDate: 1, priority: -1 });
    
    return NextResponse.json({ tasks });
  } catch (error: any) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tasks', message: error.message },
      { status: 500 }
    );
  }
}

// POST /api/productivity - Create a new task
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    // Parse request body
    const body = await request.json();
    
    // Create new task
    const newTask = new Task(body);
    await newTask.save();
    
    return NextResponse.json({ task: newTask }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating task:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { error: 'Validation error', messages: validationErrors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create task', message: error.message },
      { status: 500 }
    );
  }
}import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import mongoose from 'mongoose';

// Define a simple task schema if it doesn't exist
let Task;
try {
  Task = mongoose.model('Task');
} catch {
  const taskSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: [true, 'Please provide a task title'],
        trim: true,
      },
      description: {
        type: String,
        trim: true,
      },
      status: {
        type: String,
        enum: ['To Do', 'In Progress', 'Done', 'Blocked'],
        default: 'To Do',
      },
      priority: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Urgent'],
        default: 'Medium',
      },
      dueDate: {
        type: Date,
      },
      assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      tags: [{
        type: String,
        trim: true,
      }],
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    },
    { timestamps: true }
  );
  
  Task = mongoose.model('Task', taskSchema);
}

// GET /api/productivity - Get all tasks
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    
    // Build query
    const query: any = {};
    if (userId) {
      query.userId = userId;
    }
    if (status) {
      query.status = status;
    }
    if (priority) {
      query.priority = priority;
    }
    
    // Get tasks
    const tasks = await Task.find(query)
      .populate('assignedTo', 'name email')
      .sort({ dueDate: 1, priority: -1 });
    
    return NextResponse.json({ tasks });
  } catch (error: any) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tasks', message: error.message },
      { status: 500 }
    );
  }
}

// POST /api/productivity - Create a new task
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    
    // Parse request body
    const body = await request.json();
    
    // Create new task
    const newTask = new Task(body);
    await newTask.save();
    
    return NextResponse.json({ task: newTask }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating task:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { error: 'Validation error', messages: validationErrors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create task', message: error.message },
      { status: 500 }
    );
  }
}
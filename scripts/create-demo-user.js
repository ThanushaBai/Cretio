// This script creates a demo user if it doesn't exist
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// Connect to MongoDB
const connectToDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
};

// Define User schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
  companyName: {
    type: String,
    required: [true, 'Please provide a company name'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  subscription: {
    plan: {
      type: String,
      enum: ['free', 'basic', 'professional', 'enterprise'],
      default: 'free',
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'cancelled'],
      default: 'inactive',
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
  },
  billingAddress: {
    name: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create User model
const User = mongoose.models.User || mongoose.model('User', UserSchema);

// Create demo user
const createDemoUser = async () => {
  try {
    // Check if demo user already exists
    const existingUser = await User.findOne({ email: 'demo@cretio.com' });
    
    if (existingUser) {
      console.log('Demo user already exists');
      return;
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('demo123456', salt);
    
    // Create new user
    const newUser = new User({
      name: 'Demo User',
      email: 'demo@cretio.com',
      password: hashedPassword,
      companyName: 'Cretio Demo',
      role: 'admin',
      subscription: {
        plan: 'professional',
        status: 'active',
        startDate: new Date(),
      },
      createdAt: new Date()
    });
    
    await newUser.save();
    console.log('Demo user created successfully');
  } catch (error) {
    console.error('Failed to create demo user:', error);
  }
};

// Main function
const main = async () => {
  await connectToDatabase();
  await createDemoUser();
  mongoose.disconnect();
  console.log('Disconnected from MongoDB');
};

main();
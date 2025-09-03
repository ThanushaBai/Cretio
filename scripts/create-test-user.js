// This script creates a test user in the database
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Define User schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please provide a username'],
      unique: true,
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
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    companyName: {
      type: String,
      default: '',
    },
    agencyName: {
      type: String,
      default: '',
    },
    subscription: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

async function createTestUser() {
  try {
    // Check if test user already exists
    const existingUser = await User.findOne({ email: 'test@example.com' });
    
    if (existingUser) {
      console.log('Test user already exists');
      mongoose.disconnect();
      return;
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);
    
    // Create test user
    const user = new User({
      username: 'testuser',
      email: 'test@example.com',
      password: hashedPassword,
      role: 'user',
      companyName: 'Test Company',
    });
    
    await user.save();
    console.log('Test user created successfully');
    
    // Create demo user
    const demoUser = new User({
      username: 'demo',
      email: 'demo@cretio.com',
      password: await bcrypt.hash('demo123456', salt),
      role: 'user',
      companyName: 'Demo Company',
    });
    
    await demoUser.save();
    console.log('Demo user created successfully');
    
    mongoose.disconnect();
  } catch (error) {
    console.error('Error creating test user:', error);
    mongoose.disconnect();
  }
}

createTestUser();
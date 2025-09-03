const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function setupTestUser() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected successfully!');

    // Create a test user in the database
    const userSchema = new mongoose.Schema({
      username: String,
      email: String,
      password: String,
      role: String,
      companyName: String,
    });

    const User = mongoose.models.User || mongoose.model('User', userSchema);

    // Create test user
    const testUser = new User({
      username: 'testuser',
      email: 'thanushabai12@gmail.com',
      password: 'test12345', // In production, this should be hashed
      role: 'user',
      companyName: 'Test Company'
    });

    await testUser.save();
    console.log('Test user created successfully!');
    
    // Try to find the user
    const foundUser = await User.findOne({ email: 'thanushabai12@gmail.com' });
    console.log('Found user:', foundUser);

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed.');
  }
}

setupTestUser();

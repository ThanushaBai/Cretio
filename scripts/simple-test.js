require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

async function testConnection() {
  try {
    console.log('Testing MongoDB connection...');
    console.log('Using URI:', process.env.MONGODB_URI);
    
    // Set mongoose options
    mongoose.set('strictQuery', false);
    
    // Connect with timeout option
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000
    });
    
    console.log('✅ Successfully connected to MongoDB!');
    
    // Try to list databases to verify permissions
    const admin = mongoose.connection.db.admin();
    const dbs = await admin.listDatabases();
    console.log('✅ Available databases:', dbs.databases.map(db => db.name).join(', '));
    
    await mongoose.connection.close();
    console.log('Connection closed successfully.');
    
  } catch (error) {
    console.error('❌ Connection error:', error.message);
    if (error.name === 'MongoServerError') {
      console.log('\n🔧 Troubleshooting steps:');
      console.log('1. Verify your IP is whitelisted in MongoDB Atlas Network Access');
      console.log('2. Check if the username and password are correct');
      console.log('3. Make sure the user has the correct permissions');
      console.log('\nError code:', error.code);
      console.log('Error name:', error.name);
    }
    process.exit(1);
  }
}

testConnection();

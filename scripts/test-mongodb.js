require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

async function testConnection() {
  try {
    console.log('Testing MongoDB connection...')
    console.log('URI:', process.env.MONGODB_URI)
    
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ Connected to MongoDB successfully!')

    // Create a test user
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash('test123', salt)

    const UserSchema = new mongoose.Schema({
      name: String,
      username: {
        type: String,
        unique: true
      },
      email: {
        type: String,
        unique: true
      },
      password: String,
      role: String,
      companyName: String
    })

    const User = mongoose.models.User || mongoose.model('User', UserSchema)

    // Generate unique username and email using timestamp
    const timestamp = new Date().getTime()
    const testUser = new User({
      name: 'Test User',
      username: `testuser_${timestamp}`,
      email: `test_${timestamp}@example.com`,
      password: hashedPassword,
      role: 'user',
      companyName: 'Test Company'
    })

    await testUser.save()
    console.log('✅ Test user created successfully!')

    // Try to find the user
    const foundUser = await User.findOne({ email: testUser.email })
    console.log('✅ Test user found:', foundUser ? 'Yes' : 'No')

    await mongoose.connection.close()
    console.log('Connection closed.')

  } catch (error) {
    console.error('❌ Error:', error.message)
    if (error.name === 'MongoServerError' && error.code === 8000) {
      console.log('\n🔧 SOLUTION:')
      console.log('1. Go to MongoDB Atlas')
      console.log('2. Click Database Access')
      console.log('3. Edit your database user')
      console.log('4. Reset the password')
      console.log('5. Update your .env.local file with the new connection string')
    }
    process.exit(1)
  }
}

testConnection()
